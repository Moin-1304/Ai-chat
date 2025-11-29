// Conversation Scripts - Pre-defined flows for reliable demos
// Each script defines exact conversation flow with user inputs and AI responses

export const conversationScripts = {
  // Scenario 1: Lab Access (Disambiguation Flow)
  lab_access_trainee: {
    id: 'lab_access_trainee',
    name: 'Lab Access - Trainee Flow',
    trigger: 'I can\'t access the lab',
    steps: [
      {
        userInput: 'I can\'t access the lab',
        aiResponse: 'I can help with lab access. Are you a trainee or instructor?',
        type: 'disambiguation',
        options: ['trainee', 'instructor'],
      },
      {
        userInput: 'trainee',
        aiResponse: 'Which training module are you trying to access?',
        type: 'disambiguation',
        options: ['Module 1', 'Module 2', 'Module 3', 'Other'],
      },
      {
        userInput: 'Module 3',
        aiResponse: 'Based on your needs as a trainee for Module 3, here\'s a step-by-step guide:\n\nComplete troubleshooting guide for lab access issues including account verification, browser requirements, and common error resolutions.\n\nWould you like me to walk you through the troubleshooting steps?',
        type: 'answer',
        source: 'KB-2024-001',
        sourceName: 'Confluence',
        confidence: 0.95,
        end: true,
      },
    ],
  },

  // Scenario 2: Password Reset (Direct)
  password_reset: {
    id: 'password_reset',
    name: 'Password Reset',
    trigger: 'I forgot my password',
    steps: [
      {
        userInput: 'I forgot my password',
        aiResponse: 'I can help you reset your password. Here\'s the quick process:\n\n1. Navigate to the PCTE login page\n2. Click "Forgot Password" link\n3. Enter your username or email\n4. Follow verification steps sent to your email\n5. Create a new password (minimum 12 characters)\n\nWould you like detailed instructions?',
        type: 'answer',
        source: 'KB-2024-002',
        sourceName: 'Confluence',
        confidence: 0.97,
        end: true,
      },
    ],
  },

  // Training Portal Access
  training_portal: {
    id: 'training_portal',
    name: 'Training Portal Access',
    trigger: 'I need help accessing training materials',
    steps: [
      {
        userInput: 'I need help accessing training materials',
        aiResponse: 'I can help you access the Training Portal and course materials. Here\'s how to get started:\n\n1. **Login to Training Portal** - Use your PCTE credentials at training.pcte.mil\n2. **Browse Courses** - Navigate to the course catalog to find available modules\n3. **Enroll in Modules** - Select the training modules you need (Module 1, 2, or 3)\n4. **Access Lab Environments** - Once enrolled, you can access associated lab environments\n5. **Download Materials** - Course materials and guides are available in each module\n\n**Common Issues:**\n- If you can\'t access the portal, check your account permissions\n- Ensure you\'re using the correct VPN connection\n- Contact your training administrator if modules aren\'t visible\n\nWould you like help with a specific module or are you encountering an error?',
        type: 'answer',
        source: 'KB-2024-015',
        sourceName: 'Confluence',
        confidence: 0.94,
        end: true,
      },
    ],
  },

  // Report Issue Flow
  report_issue: {
    id: 'report_issue',
    name: 'Report Issue',
    trigger: 'I want to report an issue',
    steps: [
      {
        userInput: 'I want to report an issue',
        aiResponse: 'Alright, tell me the issue you are facing.',
        type: 'ticket_details_request',
      },
    ],
  },

  // Scenario 3: Lab Crash (Combined Ticket Creation + Escalation)
  lab_crash_combined: {
    id: 'lab_crash_combined',
    name: 'Lab Crash - Ticket Creation & Escalation',
    trigger: 'My lab crashed',
    steps: [
      {
        userInput: 'My lab crashed',
        aiResponse: 'I understand your lab environment has crashed. This is a critical issue that needs immediate attention. Here are some immediate steps:\n\n1. **Save your work** - If possible, try to save any work before the crash\n2. **Check lab status** - Verify if the lab environment is still accessible\n3. **Restart attempt** - Try restarting the lab environment\n4. **Document the issue** - Note what you were doing when it crashed\n5. **Contact support** - If the lab doesn\'t recover, we\'ll need to escalate this\n\nLet me know if the lab recovers or if you need immediate assistance.',
        type: 'answer',
        source: 'KB-2024-001',
        sourceName: 'Confluence',
        confidence: 0.92,
        unresolvedKeywords: ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved'],
      },
      {
        userInput: 'That didn\'t work',
        aiResponse: 'I understand. Let me provide some additional troubleshooting steps:\n\n1. Clear your browser cache and cookies\n2. Try accessing from a different browser\n3. Check if other lab environments are accessible\n4. Verify your network connection\n\nTry these steps and let me know if the issue persists.',
        type: 'answer',
        unresolvedKeywords: ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved'],
      },
      {
        userInput: 'Still doesn\'t work',
        aiResponse: 'I see the issue persists. Let me try one more troubleshooting approach:\n\n1. Check if there are scheduled maintenance windows\n2. Verify your account permissions\n3. Try accessing from a different network\n4. Contact your training administrator\n\nIf none of these work, we may need to escalate this to our support team.',
        type: 'answer',
        unresolvedKeywords: ['didn\'t work', 'not working', 'still doesn\'t', 'not resolved'],
      },
      {
        userInput: 'Not resolved',
        aiResponse: 'I understand this hasn\'t been resolved yet. Could you please provide more details about what happened? For example:\n\n- What were you doing when the lab crashed?\n- What error messages did you see?\n- Have you tried any troubleshooting steps?\n\nThis will help me create a more detailed support ticket for you.',
        type: 'ticket_details_request',
      },
      {
        userInput: 'detailed_message', // This will be replaced with actual user input
        aiResponse: 'Thank you for the details. Let me create a support ticket for you...',
        type: 'ticket_creation',
      },
    ],
  },

  // Scenario 5: Error Code - ACC-001
  error_code_acc001: {
    id: 'error_code_acc001',
    name: 'Error Code ACC-001',
    trigger: 'I\'m getting error code ACC-001',
    steps: [
      {
        userInput: 'I\'m getting error code ACC-001',
        aiResponse: '**ACC-001: Access Denied - Insufficient Permissions**\n\nThis error indicates your account doesn\'t have the required permissions for this resource.\n\n**Solution:**\n1. Contact your training administrator\n2. Verify your role assignments (Trainee/Instructor)\n3. Ensure you\'ve completed required training modules\n4. Check if the resource requires special access\n\nYour administrator can grant the necessary permissions.',
        type: 'answer',
        source: 'KB-2024-030',
        sourceName: 'MKDocs',
        confidence: 0.88,
        end: true,
      },
    ],
  },

  // Scenario 6: Error Code Disambiguation
  error_code_general: {
    id: 'error_code_general',
    name: 'Error Code - General',
    trigger: 'I\'m seeing an error code',
    steps: [
      {
        userInput: 'I\'m seeing an error code',
        aiResponse: 'What error code are you seeing?',
        type: 'disambiguation',
        options: ['ACC-001', 'LAB-404', 'NET-503', 'AUTH-401', 'Other'],
        nextStep: {
          'ACC-001': 'error_code_acc001',
          'LAB-404': 'error_code_lab404',
          'NET-503': 'error_code_net503',
          'AUTH-401': 'error_code_auth401',
        },
      },
    ],
  },

  // Error code solutions
  error_code_lab404: {
    id: 'error_code_lab404',
    name: 'Error Code LAB-404',
    trigger: 'LAB-404',
    steps: [
      {
        userInput: 'LAB-404',
        aiResponse: '**LAB-404: Lab Environment Not Found**\n\nThis error means the lab environment you\'re trying to access doesn\'t exist or is unavailable.\n\n**Solution:**\n1. Verify the correct lab ID\n2. Check lab availability in Training Portal\n3. Ensure you\'re enrolled in the correct training module\n4. Verify there are no scheduled maintenance windows\n5. Try accessing from a different browser\n\nIf the issue persists, contact support with the lab ID.',
        type: 'answer',
        source: 'KB-2024-030',
        sourceName: 'MKDocs',
        confidence: 0.88,
        end: true,
      },
    ],
  },

  error_code_net503: {
    id: 'error_code_net503',
    name: 'Error Code NET-503',
    trigger: 'NET-503',
    steps: [
      {
        userInput: 'NET-503',
        aiResponse: '**NET-503: Network Connection Timeout**\n\nThis indicates a network connectivity issue preventing access to PCTE services.\n\n**Solution:**\n1. Check your VPN connection (use PCTE VPN client v2.3+)\n2. Verify firewall rules allow ports 443, 8080, 8443\n3. Check DNS settings (10.0.0.1)\n4. Connect to nearest regional endpoint\n5. Try accessing from a different network\n6. Clear browser cache and cookies\n\nIf remote, ensure VPN is properly configured.',
        type: 'answer',
        source: 'KB-2024-030',
        sourceName: 'MKDocs',
        confidence: 0.88,
        end: true,
      },
    ],
  },

  error_code_auth401: {
    id: 'error_code_auth401',
    name: 'Error Code AUTH-401',
    trigger: 'AUTH-401',
    steps: [
      {
        userInput: 'AUTH-401',
        aiResponse: '**AUTH-401: Authentication Failed**\n\nYour credentials could not be verified. This could be due to incorrect password, expired account, or SSO issues.\n\n**Solution:**\n1. Verify your username and password\n2. Try password reset if forgotten\n3. Check if account is locked (wait 15 minutes)\n4. Verify SSO status at sso.pcte.mil\n5. Clear browser cookies and cache\n6. Check time synchronization on device\n\nIf issues persist, contact Help Desk for account verification.',
        type: 'answer',
        source: 'KB-2024-030',
        sourceName: 'MKDocs',
        confidence: 0.88,
        end: true,
      },
    ],
  },
};

// Helper to find script by trigger phrase
export const findScriptByTrigger = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Priority order for matching (more specific patterns first)
  const priorityPatterns = [
    { pattern: /lab.*environment.*crashed/i, scriptId: 'lab_crash_combined' },
    { pattern: /lab.*crashed/i, scriptId: 'lab_crash_combined' },
    { pattern: /i can'?t access.*lab/i, scriptId: 'lab_access_trainee' },
    { pattern: /can'?t access lab/i, scriptId: 'lab_access_trainee' },
    { pattern: /forgot.*password/i, scriptId: 'password_reset' },
    { pattern: /password.*reset/i, scriptId: 'password_reset' },
    { pattern: /want to report.*issue/i, scriptId: 'report_issue' },
    { pattern: /report.*issue/i, scriptId: 'report_issue' },
    { pattern: /need help.*training/i, scriptId: 'training_portal' },
    { pattern: /training.*portal/i, scriptId: 'training_portal' },
    { pattern: /training.*materials/i, scriptId: 'training_portal' },
    { pattern: /error code.*acc-001/i, scriptId: 'error_code_acc001' },
    { pattern: /getting.*error code/i, scriptId: 'error_code_general' },
    { pattern: /seeing.*error code/i, scriptId: 'error_code_general' },
  ];
  
  // Check priority patterns first
  for (const { pattern, scriptId } of priorityPatterns) {
    if (pattern.test(lowerMessage)) {
      return findScriptById(scriptId);
    }
  }
  
  // Fallback to general trigger matching
  for (const [key, script] of Object.entries(conversationScripts)) {
    if (lowerMessage.includes(script.trigger.toLowerCase())) {
      return script;
    }
  }
  
  return null;
};

// Helper to find script by ID
export const findScriptById = (scriptId) => {
  return conversationScripts[scriptId] || null;
};

// Helper to get next step in script
export const getNextStep = (script, currentStepIndex, userInput) => {
  if (!script || !script.steps || currentStepIndex >= script.steps.length) {
    return null;
  }
  
  const currentStep = script.steps[currentStepIndex];
  const lowerInput = userInput.toLowerCase().trim();
  
  // Check if current step has nextStep defined
  if (currentStep.nextStep) {
    if (typeof currentStep.nextStep === 'string') {
      // Next step is another script ID
      return { scriptId: currentStep.nextStep, stepIndex: 0 };
    } else if (typeof currentStep.nextStep === 'object') {
      // Next step depends on user choice
      for (const [option, targetScript] of Object.entries(currentStep.nextStep)) {
        if (lowerInput.includes(option.toLowerCase())) {
          return { scriptId: targetScript, stepIndex: 0 };
        }
      }
    }
  }
  
  // Check unresolved keywords to continue flow
  if (currentStep.unresolvedKeywords) {
    const matchesKeyword = currentStep.unresolvedKeywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    );
    if (matchesKeyword && currentStep.nextStep) {
      if (typeof currentStep.nextStep === 'string') {
        return { scriptId: currentStep.nextStep, stepIndex: 0 };
      }
    }
  }
  
  // Move to next step in same script (if not ending)
  if (!currentStep.end && currentStepIndex + 1 < script.steps.length) {
    return { scriptId: script.id, stepIndex: currentStepIndex + 1 };
  }
  
  return null;
};

// Helper to match user input to script step
export const matchStepInput = (step, userInput) => {
  const lowerInput = userInput.toLowerCase().trim();
  
  // Check exact userInput match
  if (step.userInput) {
    const lowerStepInput = step.userInput.toLowerCase();
    
    // Exact match
    if (lowerInput === lowerStepInput) {
      return true;
    }
    
    // Contains match
    if (lowerInput.includes(lowerStepInput) || lowerStepInput.includes(lowerInput)) {
      return true;
    }
  }
  
  // Check unresolved keywords (for continuation)
  if (step.unresolvedKeywords) {
    return step.unresolvedKeywords.some(keyword => lowerInput.includes(keyword.toLowerCase()));
  }
  
  // Check options for disambiguation
  if (step.options) {
    return step.options.some(option => {
      const optStr = typeof option === 'string' ? option : option.value || option;
      return lowerInput.includes(optStr.toLowerCase()) || optStr.toLowerCase().includes(lowerInput);
    });
  }
  
  return false;
};

