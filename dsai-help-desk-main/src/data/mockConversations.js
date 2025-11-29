// Mock Conversation Flows and Intent Patterns
// Used by AI simulator to match user intents and generate responses

export const conversationIntents = [
  {
    intent: 'lab_crash',
    patterns: [
      /lab.*crashed/i,
      /lab.*crash/i,
      /lab.*environment.*crashed/i,
      /lab.*down/i,
      /lab.*stopped.*work/i,
      /lab.*not.*responding/i,
      /lab.*frozen/i,
      /lab.*critical/i,
      /lab.*emergency/i,
      /lab.*failed/i,
    ],
    keywords: ['lab', 'crashed', 'crash', 'down', 'critical', 'emergency', 'failed', 'frozen'],
    kbArticle: 'KB-2024-001',
    disambiguation: {
      needed: false,
    },
  },
  {
    intent: 'lab_access',
    patterns: [
      /can'?t access lab/i,
      /lab.*not.*work/i,
      /lab.*environment/i,
      /access.*lab/i,
      /lab.*trouble/i,
      /lab.*error/i,
      /cannot.*lab/i,
      /lab.*available/i,
    ],
    keywords: ['lab', 'access', 'environment', 'module', 'training'],
    kbArticle: 'KB-2024-001',
    disambiguation: {
      needed: true,
      question: 'I can help with lab access. Are you a trainee or instructor?',
      options: [
        { value: 'trainee', keywords: ['trainee', 'student', 'learner'] },
        { value: 'instructor', keywords: ['instructor', 'teacher', 'admin'] },
      ],
      followUp: {
        trainee: {
          question: 'Which training module are you trying to access?',
          options: ['Module 1', 'Module 2', 'Module 3', 'Other'],
        },
        instructor: {
          question: 'Are you trying to access a student lab environment or create a new lab?',
          options: ['Access student lab', 'Create new lab', 'Other'],
        },
      },
    },
  },
  {
    intent: 'password_reset',
    patterns: [
      /forgot.*password/i,
      /password.*reset/i,
      /can'?t.*log.*in/i,
      /locked.*account/i,
      /reset.*password/i,
      /password.*expired/i,
      /change.*password/i,
      /credential/i,
    ],
    keywords: ['password', 'reset', 'forgot', 'locked', 'login', 'credentials'],
    kbArticle: 'KB-2024-002',
    disambiguation: {
      needed: false,
    },
  },
  {
    intent: 'training_portal',
    patterns: [
      /training.*portal/i,
      /portal.*access/i,
      /course.*materials/i,
      /enrollment/i,
      /training.*course/i,
      /portal.*not.*work/i,
    ],
    keywords: ['training', 'portal', 'course', 'enrollment', 'materials'],
    kbArticle: 'KB-2024-003',
    disambiguation: {
      needed: false,
    },
  },
  {
    intent: 'sso_login',
    patterns: [
      /sso/i,
      /single.*sign/i,
      /login.*problem/i,
      /authentication/i,
      /red.*hat.*sso/i,
      /can'?t.*authenticate/i,
    ],
    keywords: ['sso', 'single sign-on', 'authentication', 'login', 'red hat'],
    kbArticle: 'KB-2024-015',
    disambiguation: {
      needed: false,
    },
  },
  {
    intent: 'network_connectivity',
    patterns: [
      /network/i,
      /vpn/i,
      /firewall/i,
      /connection.*problem/i,
      /can'?t.*connect/i,
      /network.*error/i,
      /connectivity/i,
    ],
    keywords: ['network', 'vpn', 'firewall', 'connection', 'connectivity'],
    kbArticle: 'KB-2024-025',
    disambiguation: {
      needed: false,
    },
  },
  {
    intent: 'error_code',
    patterns: [
      /error.*code/i,
      /acc-001/i,
      /lab-404/i,
      /net-503/i,
      /auth-401/i,
      /error.*message/i,
    ],
    keywords: ['error', 'code', 'message', 'troubleshoot'],
    kbArticle: 'KB-2024-030',
    disambiguation: {
      needed: true,
      question: 'What error code are you seeing?',
      options: ['ACC-001', 'LAB-404', 'NET-503', 'AUTH-401', 'Other'],
    },
  },
  {
    intent: 'general_help',
    patterns: [
      /help/i,
      /how.*do/i,
      /what.*is/i,
      /guide/i,
      /tutorial/i,
      /getting.*started/i,
    ],
    keywords: ['help', 'guide', 'how', 'what', 'tutorial'],
    kbArticle: 'KB-2024-001',
    disambiguation: {
      needed: true,
      question: 'What do you need help with?',
      options: ['Lab Access', 'Password Reset', 'Training Portal', 'Something Else'],
    },
  },
];

// Sentiment patterns for detection
export const sentimentPatterns = {
  frustrated: [
    /ridiculous/i,
    /unbelievable/i,
    /terrible/i,
    /awful/i,
    /horrible/i,
    /worst/i,
    /hate/i,
    /frustrated/i,
    /annoying/i,
    /urgent/i,
    /asap/i,
    /immediately/i,
    /need.*help.*now/i,
    /can'?t.*believe/i,
    /so.*urgent/i,
  ],
  satisfied: [
    /thanks/i,
    /thank.*you/i,
    /great/i,
    /perfect/i,
    /excellent/i,
    /awesome/i,
    /helpful/i,
    /solved/i,
    /fixed/i,
    /worked/i,
    /appreciate/i,
  ],
};

// Greeting patterns
export const greetingPatterns = [
  /hello/i,
  /hi/i,
  /hey/i,
  /good morning/i,
  /good afternoon/i,
  /good evening/i,
  /greetings/i,
];

// Farewell patterns
export const farewellPatterns = [
  /thanks.*bye/i,
  /thank.*you.*bye/i,
  /goodbye/i,
  /bye/i,
  /see.*you/i,
  /later/i,
  /that.*all/i,
  /nothing.*else/i,
];

// Escalation triggers
export const escalationTriggers = {
  sentiment: {
    threshold: 0.75,
    message: "I understand this is urgent. Let me connect you with a live agent immediately.",
  },
  unresolved: {
    attempts: 3,
    message: "I see we haven't resolved this yet. Let me create a support ticket for you so our team can help.",
  },
};

