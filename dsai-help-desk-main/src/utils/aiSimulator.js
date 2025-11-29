// AI Simulator - Core logic for chat responses
import { conversationIntents, sentimentPatterns, greetingPatterns, farewellPatterns, escalationTriggers } from '../data/mockConversations';
import { searchArticles, findArticleById } from '../data/mockKB';

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

  // Check for satisfied patterns
  const satisfiedMatches = sentimentPatterns.satisfied.filter(pattern => pattern.test(lowerMessage)).length;
  if (satisfiedMatches > 0 && score < 0.3) {
    score = 0.2;
    detectedSentiment = 'satisfied';
  }

  // Track frustration accumulation over multiple unresolved attempts
  const unresolvedAttempts = conversationContext.unresolvedAttempts || 0;
  const frustrationKeywords = ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved', 'doesn\'t help', 'nothing works', 'still not', 'doesn\'t solve'];
  const hasFrustrationKeyword = frustrationKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasFrustrationKeyword && unresolvedAttempts > 0) {
    // Accumulate frustration based on number of unresolved attempts
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

// Match user intent from message
export const matchIntent = (message, conversationContext = {}) => {
  const lowerMessage = message.toLowerCase();

  // Check for greeting
  if (greetingPatterns.some(pattern => pattern.test(lowerMessage))) {
    return {
      intent: 'greeting',
      confidence: 0.95,
      needsDisambiguation: false,
    };
  }

  // Check for farewell
  if (farewellPatterns.some(pattern => pattern.test(lowerMessage))) {
    return {
      intent: 'farewell',
      confidence: 0.95,
      needsDisambiguation: false,
    };
  }

  // Check conversation intents
  let bestMatch = null;
  let bestScore = 0;

  for (const intent of conversationIntents) {
    let score = 0;
    let matches = 0;

    // Check pattern matches
    for (const pattern of intent.patterns) {
      if (pattern.test(lowerMessage)) {
        matches++;
        score += 0.3;
      }
    }

    // Check keyword matches
    const keywordMatches = intent.keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    ).length;
    score += keywordMatches * 0.1;

    // Boost score for critical issues (lab_crash) - they should take priority
    if (intent.intent === 'lab_crash' && matches > 0) {
      score += 0.5; // Boost critical issues
    }

    // Boost score if we're in a disambiguation flow for this intent
    if (conversationContext.pendingIntent === intent.intent) {
      score += 0.4;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = {
        intent: intent.intent,
        intentData: intent,
        confidence: Math.min(score, 0.95),
        needsDisambiguation: intent.disambiguation?.needed || false,
      };
    }
  }

  // Default to general help if no good match
  if (!bestMatch || bestScore < 0.2) {
    const generalHelp = conversationIntents.find(i => i.intent === 'general_help');
    return {
      intent: 'general_help',
      intentData: generalHelp,
      confidence: 0.70,
      needsDisambiguation: true,
    };
  }

  return bestMatch;
};

// Handle disambiguation questions
export const handleDisambiguation = (intentData, conversationContext, userResponse) => {
  if (!intentData.disambiguation?.needed) {
    return null;
  }

  const lowerResponse = userResponse.toLowerCase();
  const currentContext = conversationContext.disambiguationContext || {};

  // Handle initial disambiguation question
  if (!currentContext.step) {
    const option = intentData.disambiguation.options.find(opt => 
      opt.keywords.some(kw => lowerResponse.includes(kw.toLowerCase())) ||
      lowerResponse.includes(opt.value.toLowerCase())
    );

    if (option && intentData.disambiguation.followUp) {
      const followUp = intentData.disambiguation.followUp[option.value];
      if (followUp) {
        return {
          question: followUp.question,
          options: followUp.options,
          resolved: false,
          context: { step: 1, selectedOption: option.value },
        };
      }
    }

    // If no follow-up, return resolved
    return {
      resolved: true,
      context: { selectedOption: option?.value || 'other' },
    };
  }

  // Handle follow-up question (step 1 means we're in follow-up)
  const selectedOption = currentContext.selectedOption;
  if (intentData.disambiguation.followUp && intentData.disambiguation.followUp[selectedOption]) {
    const followUpData = intentData.disambiguation.followUp[selectedOption];
    const followUpOptions = followUpData.options || [];
    
    // Check if user response matches any of the options (case-insensitive)
    const matchedOption = followUpOptions.find(opt => 
      userResponse.toLowerCase().includes(opt.toLowerCase()) ||
      opt.toLowerCase().includes(userResponse.toLowerCase())
    );
    
    // If matched or if they typed something, resolve it
    return {
      resolved: true,
      context: { 
        ...currentContext, 
        followUpAnswer: matchedOption || userResponse 
      },
    };
  }
  
  // Default: resolve with user response
  return {
    resolved: true,
    context: { ...currentContext, followUpAnswer: userResponse },
  };
};

// Generate AI response
export const generateResponse = (userMessage, conversationContext = {}) => {
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
  
  // Handle escalation
  if (sentiment.shouldEscalate) {
    return {
      message: escalationTriggers.sentiment.message,
      type: 'escalation',
      sentiment: sentiment,
      confidence: 0.95,
      source: null,
      sourceName: null,
    };
  }

  // Handle disambiguation flow
  if (conversationContext.pendingDisambiguation) {
    const intentData = conversationIntents.find(i => i.intent === conversationContext.pendingIntent);
    if (intentData) {
      // Ensure we have the disambiguation context
      const contextForDisambiguation = {
        ...conversationContext,
        disambiguationContext: conversationContext.disambiguationContext || {},
      };
      const disambiguationResult = handleDisambiguation(intentData, contextForDisambiguation, userMessage);
      
      // If no result, something went wrong - fall through to normal intent matching
      if (!disambiguationResult) {
        // Fall through to normal intent matching
      } else if (!disambiguationResult.resolved) {
        // Still in disambiguation - ask follow-up question
        return {
          message: disambiguationResult.question,
          type: 'disambiguation',
          options: disambiguationResult.options,
          sentiment: sentiment,
          confidence: 0.90,
          source: null,
          sourceName: null,
          context: {
            pendingIntent: conversationContext.pendingIntent || intentData.intent,
            pendingDisambiguation: true,
            disambiguationContext: disambiguationResult.context, // Merge with existing context
          },
        };
      } else if (disambiguationResult.resolved) {
        // Get KB article and generate response
        const article = intentData.kbArticle ? findArticleById(intentData.kbArticle) : null;
        
        let response;
        if (intentData.intent === 'lab_access' && article) {
          response = {
            message: `Based on your needs as a ${disambiguationResult.context.selectedOption} for ${disambiguationResult.context.followUpAnswer || 'your training module'}, here's a step-by-step guide:\n\n${article.summary}\n\nWould you like me to walk you through the troubleshooting steps?`,
            confidence: article.confidence,
            source: article.id,
            sourceName: article.source,
          };
        } else if (article) {
          response = {
            message: article.summary,
            confidence: article.confidence,
            source: article.id,
            sourceName: article.source,
          };
        } else {
          response = {
            message: "I can help with that. Let me provide you with some guidance.",
            confidence: 0.75,
            source: null,
            sourceName: null,
          };
        }
        
        return {
          ...response,
          type: 'answer',
          sentiment: sentiment,
          context: {
            pendingDisambiguation: false,
            disambiguationContext: null,
            unresolvedAttempts: updatedContext.unresolvedAttempts,
          },
        };
      }
    }
  }

  // Match intent
  const intentMatch = matchIntent(userMessage, conversationContext);

  // Handle greeting
  if (intentMatch.intent === 'greeting') {
    return {
      message: "Hello! I'm your AI assistant for PCTE Help Desk. How can I help you today?",
      type: 'greeting',
      sentiment: sentiment,
      confidence: 0.95,
      source: null,
      sourceName: null,
    };
  }

  // Handle farewell
  if (intentMatch.intent === 'farewell') {
    return {
      message: "You're welcome! If you need anything else, feel free to ask. Have a great day!",
      type: 'farewell',
      sentiment: sentiment,
      confidence: 0.95,
      source: null,
      sourceName: null,
    };
  }

  // Generate response based on intent
  if (intentMatch.intentData) {
    // Get KB article if available
    let article = null;
    if (intentMatch.intentData.kbArticle) {
      article = findArticleById(intentMatch.intentData.kbArticle);
    }

    // Check if disambiguation is needed
    if (intentMatch.needsDisambiguation && !conversationContext.disambiguationContext) {
      const disambiguation = intentMatch.intentData.disambiguation;
      return {
        message: disambiguation.question,
        type: 'disambiguation',
        options: disambiguation.options?.map(opt => typeof opt === 'string' ? opt : opt.value || opt) || [],
        sentiment: sentiment,
        confidence: intentMatch.confidence,
        source: null,
        sourceName: null,
        context: {
          pendingIntent: intentMatch.intent,
          pendingDisambiguation: true,
          disambiguationContext: {}, // Initialize empty disambiguation context
        },
      };
    }

    // Generate response based on intent
    let response;
    if (intentMatch.intent === 'lab_crash' && article) {
      response = {
        message: `I understand your lab environment has crashed. This is a critical issue that needs immediate attention. Here are some immediate steps:\n\n1. **Save your work** - If possible, try to save any work before the crash\n2. **Check lab status** - Verify if the lab environment is still accessible\n3. **Restart attempt** - Try restarting the lab environment\n4. **Document the issue** - Note what you were doing when it crashed\n5. **Contact support** - If the lab doesn't recover, we'll need to escalate this\n\nLet me know if the lab recovers or if you need immediate assistance.`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'lab_access' && article) {
      response = {
        message: `Based on your needs, here's a step-by-step guide:\n\n${article.summary}\n\nWould you like me to walk you through the troubleshooting steps?`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'password_reset' && article) {
      response = {
        message: `I can help you reset your password. Here's the quick process:\n\n1. Navigate to the PCTE login page\n2. Click "Forgot Password" link\n3. Enter your username or email\n4. Follow verification steps sent to your email\n5. Create a new password (minimum 12 characters)\n\nWould you like detailed instructions?`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'training_portal' && article) {
      response = {
        message: `Here's how to access the Training Portal:\n\n1. Navigate to training.pcte.mil\n2. Log in with your PCTE credentials\n3. Your dashboard will show enrolled courses\n\nCommon issues include browser compatibility and enrollment status. Need help with a specific issue?`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'sso_login' && article) {
      response = {
        message: `For SSO issues, try these steps:\n\n1. Clear browser cookies and cache\n2. Verify time synchronization on your device\n3. Check VPN connection if accessing remotely\n4. Access SSO portal at sso.pcte.mil\n\nIs this a first-time SSO setup or a login issue?`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'network_connectivity' && article) {
      response = {
        message: `Network configuration issues? Here's what to check:\n\n1. Verify VPN connection (use PCTE VPN client v2.3+)\n2. Check firewall rules (ports 443, 8080, 8443)\n3. Verify DNS settings\n4. Connect to nearest regional endpoint\n\nAre you accessing from on-site or remotely?`,
        confidence: article.confidence,
        source: article.id,
        sourceName: article.source,
      };
    } else if (intentMatch.intent === 'error_code' && article) {
      // Check if user mentioned a specific error code
      const errorCodeMatch = userMessage.match(/(ACC-001|LAB-404|NET-503|AUTH-401)/i);
      
      if (errorCodeMatch) {
        const code = errorCodeMatch[1].toUpperCase();
        let specificResponse = '';
        
        switch(code) {
          case 'ACC-001':
            specificResponse = `**ACC-001: Access Denied - Insufficient Permissions**\n\nThis error indicates your account doesn't have the required permissions for this resource.\n\n**Solution:**\n1. Contact your training administrator\n2. Verify your role assignments (Trainee/Instructor)\n3. Ensure you've completed required training modules\n4. Check if the resource requires special access\n\nYour administrator can grant the necessary permissions.`;
            break;
          case 'LAB-404':
            specificResponse = `**LAB-404: Lab Environment Not Found**\n\nThis error means the lab environment you're trying to access doesn't exist or is unavailable.\n\n**Solution:**\n1. Verify the correct lab ID\n2. Check lab availability in Training Portal\n3. Ensure you're enrolled in the correct training module\n4. Verify there are no scheduled maintenance windows\n5. Try accessing from a different browser\n\nIf the issue persists, contact support with the lab ID.`;
            break;
          case 'NET-503':
            specificResponse = `**NET-503: Network Connection Timeout**\n\nThis indicates a network connectivity issue preventing access to PCTE services.\n\n**Solution:**\n1. Check your VPN connection (use PCTE VPN client v2.3+)\n2. Verify firewall rules allow ports 443, 8080, 8443\n3. Check DNS settings (10.0.0.1)\n4. Connect to nearest regional endpoint\n5. Try accessing from a different network\n6. Clear browser cache and cookies\n\nIf remote, ensure VPN is properly configured.`;
            break;
          case 'AUTH-401':
            specificResponse = `**AUTH-401: Authentication Failed**\n\nYour credentials could not be verified. This could be due to incorrect password, expired account, or SSO issues.\n\n**Solution:**\n1. Verify your username and password\n2. Try password reset if forgotten\n3. Check if account is locked (wait 15 minutes)\n4. Verify SSO status at sso.pcte.mil\n5. Clear browser cookies and cache\n6. Check time synchronization on device\n\nIf issues persist, contact Help Desk for account verification.`;
            break;
          default:
            specificResponse = `Here's information about error code ${code}:\n\n- ACC-001: Access Denied - Contact administrator\n- LAB-404: Lab Not Found - Verify lab ID\n- NET-503: Network Timeout - Check VPN/firewall\n- AUTH-401: Authentication Failed - Verify credentials`;
        }
        
        response = {
          message: specificResponse,
          confidence: article.confidence,
          source: article.id,
          sourceName: article.source,
        };
      } else {
        // General error code reference
        response = {
          message: `Here's a reference for common error codes:\n\n- ACC-001: Access Denied - Contact administrator\n- LAB-404: Lab Not Found - Verify lab ID\n- NET-503: Network Timeout - Check VPN/firewall\n- AUTH-401: Authentication Failed - Verify credentials\n\nWhich specific error code are you seeing?`,
          confidence: article.confidence,
          source: article.id,
          sourceName: article.source,
        };
      }
    } else {
      // Fallback response
      response = {
        message: article ? article.summary : "I can help with that. Let me provide you with some guidance.",
        confidence: article ? article.confidence : 0.75,
        source: article ? article.id : null,
        sourceName: article ? article.source : null,
      };
    }

    return {
      ...response,
      type: 'answer',
      sentiment: sentiment,
      context: {
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
  };
};

// Simulate typing delay
export const simulateTypingDelay = (messageLength) => {
  // Base delay + character-based delay (max 2 seconds)
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

