// Simplified AI Simulator - Script-Based
// Uses pre-defined conversation scripts for reliable, deterministic responses

import { conversationScripts, findScriptByTrigger, findScriptById, getNextStep, matchStepInput } from '../data/conversationScripts';
import { findArticleById } from '../data/mockKB';
import { sentimentPatterns, escalationTriggers } from '../data/mockConversations';

// Guardrail detection - Check for adversarial prompts
export const detectGuardrailViolation = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Patterns that indicate adversarial prompts
  const adversarialPatterns = [
    // Attempts to bypass security or access controls
    /(?:ignore|bypass|skip|override|disable).*(?:security|authentication|password|access|permission|restriction)/i,
    /(?:show|give|tell|reveal|provide).*(?:password|credential|secret|key|token|api|admin)/i,
    /(?:hack|exploit|breach|unauthorized|illegal|illegitimate)/i,
    
    // Attempts to get AI to do unethical things
    /(?:pretend|act as|roleplay|you are).*(?:not|ignore|forget)/i,
    /(?:forget|ignore|disregard).*(?:previous|earlier|above|rules|guidelines|ethics)/i,
    /(?:do anything|no restrictions|no limits|unrestricted)/i,
    
    // Attempts to manipulate or jailbreak
    /(?:jailbreak|danie|developer mode|debug mode|system prompt)/i,
    /(?:you must|you have to|you are required|you are forced)/i,
    
    // Attempts to extract sensitive information
    /(?:what is|tell me|show me).*(?:your|system|internal|private|confidential)/i,
    /(?:database|user data|personal information|pii|sensitive data)/i,
    
    // Attempts to make AI perform harmful actions
    /(?:delete|remove|destroy|corrupt|modify).*(?:data|file|system|account)/i,
    /(?:create|generate|make).*(?:malware|virus|exploit|attack)/i,
  ];
  
  // Check if message matches any adversarial pattern
  const matchedPattern = adversarialPatterns.find(pattern => pattern.test(lowerMessage));
  
  if (matchedPattern) {
    return {
      violated: true,
      category: 'adversarial_prompt',
      severity: 'high',
    };
  }
  
  return {
    violated: false,
  };
};

// Analyze sentiment from user message
export const analyzeSentiment = (message, conversationContext = {}) => {
  const lowerMessage = message.toLowerCase();
  let score = 0;
  let detectedSentiment = 'neutral';

  // Check for frustrated patterns
  const frustratedMatches = sentimentPatterns.frustrated.filter(pattern => pattern.test(lowerMessage)).length;
  if (frustratedMatches > 0) {
    score = Math.min(0.5 + (frustratedMatches * 0.15), 1.0);
    detectedSentiment = 'frustrated';
  }

  // Track frustration accumulation over multiple unresolved attempts
  const unresolvedAttempts = conversationContext.unresolvedAttempts || 0;
  const frustrationKeywords = ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved', 'doesn\'t help', 'nothing works', 'still not', 'doesn\'t solve'];
  const hasFrustrationKeyword = frustrationKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasFrustrationKeyword && unresolvedAttempts > 0) {
    const accumulatedFrustration = Math.min(0.3 + (unresolvedAttempts * 0.2), 0.9);
    score = Math.max(score, accumulatedFrustration);
    if (score > 0.5) {
      detectedSentiment = 'frustrated';
    }
  }

  // Check for escalating frustration phrases after multiple attempts
  if (unresolvedAttempts >= 2 && (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('now'))) {
    score = Math.max(score, 0.8);
    detectedSentiment = 'frustrated';
  }

  return {
    sentiment: detectedSentiment,
    score: score,
    shouldEscalate: score >= escalationTriggers.sentiment.threshold,
  };
};

// Generate AI response using script-based system
export const generateResponse = (userMessage, conversationContext = {}) => {
  // Check for guardrail violations FIRST - before any other processing
  const guardrailCheck = detectGuardrailViolation(userMessage);
  if (guardrailCheck.violated) {
    return {
      message: "I understand you're looking for help, but I can't assist with requests that involve bypassing security measures, accessing unauthorized information, or performing actions that could compromise system integrity.\n\nI'm designed to help with legitimate PCTE support questions like:\n- Password resets\n- Lab access issues\n- Training portal assistance\n- Error troubleshooting\n- Account setup\n\nHow can I help you with a legitimate PCTE support request?",
      type: 'guardrail',
      sentiment: { sentiment: 'neutral', score: 0 },
      confidence: 1.0,
      source: null,
      sourceName: null,
      guardrail: {
        violated: true,
        category: guardrailCheck.category,
        severity: guardrailCheck.severity,
      },
      context: {
        ...conversationContext,
      },
    };
  }

  // Track unresolved attempts
  const unresolvedKeywords = ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved', 'doesn\'t help', 'nothing works', 'still not', 'doesn\'t solve'];
  const isUnresolvedAttempt = unresolvedKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  
  const updatedContext = {
    ...conversationContext,
    unresolvedAttempts: isUnresolvedAttempt 
      ? (conversationContext.unresolvedAttempts || 0) + 1 
      : conversationContext.unresolvedAttempts || 0,
  };

  const sentiment = analyzeSentiment(userMessage, updatedContext);
  
  // Handle escalation ONLY if ticket was already created
  // Do NOT escalate before ticket creation - let script handle it
  if (sentiment.shouldEscalate && conversationContext.ticketCreated) {
    return {
      message: escalationTriggers.sentiment.message,
      type: 'escalation',
      sentiment: sentiment,
      confidence: 0.95,
      source: null,
      sourceName: null,
    };
  }

  // Special handling: If we're in report_issue script waiting for details,
  // check if user's description matches any other script first
  if (conversationContext.activeScriptId === 'report_issue' && 
      conversationContext.waitingForTicketDetails) {
    const matchedScript = findScriptByTrigger(userMessage);
    // If it matches a different script (and not report_issue itself), route to it
    if (matchedScript && matchedScript.id !== 'report_issue') {
      return {
        message: matchedScript.steps[0].aiResponse,
        type: matchedScript.steps[0].type || 'answer',
        options: matchedScript.steps[0].options,
        sentiment: sentiment,
        confidence: matchedScript.steps[0].confidence || 0.85,
        source: matchedScript.steps[0].source,
        sourceName: matchedScript.steps[0].sourceName,
        context: {
          activeScriptId: matchedScript.id,
          currentStepIndex: 0,
          unresolvedAttempts: updatedContext.unresolvedAttempts,
          waitingForTicketDetails: false,
        },
      };
    }
    // If no script matches, keep waitingForTicketDetails true so ticket creation proceeds
    // The AIChatPanel will handle ticket creation when waitingForTicketDetails is true
  }

  // Check if we're in an active script
  if (conversationContext.activeScriptId && conversationContext.currentStepIndex !== undefined) {
    const activeScript = findScriptById(conversationContext.activeScriptId);
    if (activeScript && activeScript.steps) {
      const currentStep = activeScript.steps[conversationContext.currentStepIndex];
      
      if (currentStep) {
        // First check if next step matches user input (prioritize progression)
        const nextStepIndex = conversationContext.currentStepIndex + 1;
        if (nextStepIndex < activeScript.steps.length) {
          const nextStep = activeScript.steps[nextStepIndex];
          if (nextStep.userInput && matchStepInput(nextStep, userMessage)) {
            // Next step matches - use it
            if (nextStep.type === 'ticket_details_request') {
              return {
                message: nextStep.aiResponse,
                type: 'ticket_details_request',
                sentiment: sentiment,
                confidence: nextStep.confidence || 0.85,
                source: nextStep.source,
                sourceName: nextStep.sourceName,
                context: {
                  activeScriptId: activeScript.id,
                  currentStepIndex: nextStepIndex,
                  unresolvedAttempts: updatedContext.unresolvedAttempts,
                },
              };
            }
            
            if (nextStep.type === 'ticket_creation') {
              return {
                message: nextStep.aiResponse,
                type: 'ticket_creation',
                sentiment: sentiment,
                confidence: nextStep.confidence || 0.95,
                source: nextStep.source,
                sourceName: nextStep.sourceName,
              };
            }
            
            return {
              message: nextStep.aiResponse,
              type: nextStep.type || 'answer',
              options: nextStep.options,
              sentiment: sentiment,
              confidence: nextStep.confidence || 0.85,
              source: nextStep.source,
              sourceName: nextStep.sourceName,
              context: {
                activeScriptId: nextStep.end ? null : activeScript.id,
                currentStepIndex: nextStep.end ? null : nextStepIndex,
                unresolvedAttempts: updatedContext.unresolvedAttempts,
              },
            };
          }
        }
        
        // Check if user input matches this step OR matches any option in current step
        const matchesStep = matchStepInput(currentStep, userMessage);
        
        // Also check if input matches options in current step (for disambiguation)
        let matchesOption = false;
        if (currentStep.options) {
          matchesOption = currentStep.options.some(option => {
            const optStr = typeof option === 'string' ? option : option.value || option;
            return userMessage.toLowerCase().includes(optStr.toLowerCase()) || optStr.toLowerCase().includes(userMessage.toLowerCase());
          });
        }
        
        if (matchesStep || matchesOption) {
          // Check for escalation in this step
          if (currentStep.type === 'escalation') {
            return {
              message: currentStep.aiResponse,
              type: 'escalation',
              sentiment: sentiment,
              confidence: currentStep.confidence || 0.95,
              source: currentStep.source,
              sourceName: currentStep.sourceName,
            };
          }
          
          // Check for ticket creation
          if (currentStep.type === 'ticket_creation') {
            return {
              message: currentStep.aiResponse,
              type: 'ticket_creation',
              sentiment: sentiment,
              confidence: currentStep.confidence || 0.95,
              source: currentStep.source,
              sourceName: currentStep.sourceName,
            };
          }
          
          // Handle ticket details request
          if (currentStep.type === 'ticket_details_request') {
            return {
              message: currentStep.aiResponse,
              type: 'ticket_details_request',
              sentiment: sentiment,
              confidence: currentStep.confidence || 0.85,
              source: currentStep.source,
              sourceName: currentStep.sourceName,
              context: {
                activeScriptId: activeScript.id,
                currentStepIndex: conversationContext.currentStepIndex,
                unresolvedAttempts: updatedContext.unresolvedAttempts,
              },
            };
          }
          
          // Move to next step if available
          const nextStepIndex = conversationContext.currentStepIndex + 1;
          if (nextStepIndex < activeScript.steps.length) {
            const nextStep = activeScript.steps[nextStepIndex];
            
            // If next step's userInput matches what user typed, use that step
            // Otherwise, use the next step anyway (for sequential flow)
            if (nextStep.userInput && matchStepInput(nextStep, userMessage)) {
              // Check if next step has special type
              if (nextStep.type === 'ticket_details_request') {
                return {
                  message: nextStep.aiResponse,
                  type: 'ticket_details_request',
                  sentiment: sentiment,
                  confidence: nextStep.confidence || 0.85,
                  source: nextStep.source,
                  sourceName: nextStep.sourceName,
                  context: {
                    activeScriptId: activeScript.id,
                    currentStepIndex: nextStepIndex,
                    unresolvedAttempts: updatedContext.unresolvedAttempts,
                  },
                };
              }
              
              return {
                message: nextStep.aiResponse,
                type: nextStep.type || 'answer',
                options: nextStep.options,
                sentiment: sentiment,
                confidence: nextStep.confidence || 0.85,
                source: nextStep.source,
                sourceName: nextStep.sourceName,
                context: {
                  activeScriptId: nextStep.end ? null : activeScript.id,
                  currentStepIndex: nextStep.end ? null : nextStepIndex,
                  unresolvedAttempts: updatedContext.unresolvedAttempts,
                },
              };
            }
            
            // Move to next step (sequential flow)
            // Check if next step has special type first
            if (nextStep.type === 'ticket_details_request') {
              return {
                message: nextStep.aiResponse,
                type: 'ticket_details_request',
                sentiment: sentiment,
                confidence: nextStep.confidence || 0.85,
                source: nextStep.source,
                sourceName: nextStep.sourceName,
                context: {
                  activeScriptId: activeScript.id,
                  currentStepIndex: nextStepIndex,
                  unresolvedAttempts: updatedContext.unresolvedAttempts,
                },
              };
            }
            
            if (nextStep.type === 'ticket_creation') {
              return {
                message: nextStep.aiResponse,
                type: 'ticket_creation',
                sentiment: sentiment,
                confidence: nextStep.confidence || 0.95,
                source: nextStep.source,
                sourceName: nextStep.sourceName,
              };
            }
            
            return {
              message: nextStep.aiResponse,
              type: nextStep.type || 'answer',
              options: nextStep.options,
              sentiment: sentiment,
              confidence: nextStep.confidence || 0.85,
              source: nextStep.source,
              sourceName: nextStep.sourceName,
              context: {
                activeScriptId: nextStep.end ? null : activeScript.id,
                currentStepIndex: nextStep.end ? null : nextStepIndex,
                unresolvedAttempts: updatedContext.unresolvedAttempts,
              },
            };
          }
          
          // No more steps - end script
          return {
            message: currentStep.aiResponse,
            type: currentStep.type || 'answer',
            options: currentStep.options,
            sentiment: sentiment,
            confidence: currentStep.confidence || 0.85,
            source: currentStep.source,
            sourceName: currentStep.sourceName,
            context: {
              activeScriptId: currentStep.end ? null : conversationContext.activeScriptId,
              currentStepIndex: currentStep.end ? null : conversationContext.currentStepIndex,
              unresolvedAttempts: updatedContext.unresolvedAttempts,
            },
          };
        }
      }
    }
  }

  // No active script - try to find a matching script
  const matchedScript = findScriptByTrigger(userMessage);
  if (matchedScript && matchedScript.steps && matchedScript.steps.length > 0) {
    const firstStep = matchedScript.steps[0];
    
    return {
      message: firstStep.aiResponse,
      type: firstStep.type || 'answer',
      options: firstStep.options,
      sentiment: sentiment,
      confidence: firstStep.confidence || 0.85,
      source: firstStep.source,
      sourceName: firstStep.sourceName,
      context: {
        activeScriptId: matchedScript.id,
        currentStepIndex: 0,
        unresolvedAttempts: updatedContext.unresolvedAttempts,
      },
    };
  }

  // Fallback response
  return {
    message: "I'm here to help with PCTE-related questions. Could you tell me more about what you're trying to do?",
    type: 'clarification',
    sentiment: sentiment,
    confidence: 0.60,
    source: null,
    sourceName: null,
    context: {
      unresolvedAttempts: updatedContext.unresolvedAttempts,
    },
  };
};

// Simulate typing delay
export const simulateTypingDelay = (messageLength) => {
  const baseDelay = 500;
  const charDelay = Math.min(messageLength * 10, 1500);
  return baseDelay + charDelay;
};

// Check if ticket creation is needed
export const shouldCreateTicket = (conversationHistory) => {
  const unresolvedAttempts = conversationHistory.filter(msg => 
    msg.type === 'user' && 
    (msg.content.toLowerCase().includes("didn't work") ||
     msg.content.toLowerCase().includes("not resolved") ||
     msg.content.toLowerCase().includes("still doesn't") ||
     msg.content.toLowerCase().includes("that didn't help"))
  ).length;

  return unresolvedAttempts >= escalationTriggers.unresolved.attempts;
};

// Generate ticket data
export const generateTicketData = (conversationHistory, userMessage) => {
  const summary = conversationHistory
    .filter(msg => msg.type === 'user')
    .slice(-3)
    .map(msg => msg.content)
    .join('; ');

  const ticketId = `INC-${Math.floor(Math.random() * 9000) + 1000}`;
  
  return {
    id: ticketId,
    subject: summary.substring(0, 100),
    description: `Conversation summary:\n${conversationHistory.map(msg => `${msg.type === 'user' ? 'User' : 'AI'}: ${msg.content}`).join('\n')}`,
    priority: 'High',
    status: 'New',
    created: new Date().toISOString(),
  };
};

