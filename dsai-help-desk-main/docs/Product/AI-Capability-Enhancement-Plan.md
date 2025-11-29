# AI Capability Enhancement Plan
## Transforming Self-Service Portal into Interactive AI Demo

### Overview
Enhance the Self-Service Portal (Screen 1) with an interactive AI chat simulation that demonstrates the power of AI-powered help desk capabilities. This will transform the static demo into an engaging, "show-stealing" experience similar to ServiceNow's demo.

---

## Key Features to Implement (Inspired by ServiceNow)

### 1. **Interactive Chat Interface**
- **Replaces:** Static "Start AI Chat Session" button
- **Features:**
  - Real-time chat panel that slides in/opens
  - Message bubbles with typing indicators
  - Multi-turn conversation capability
  - Chat history persistence during session
  - Smooth animations and transitions

### 2. **AI-Powered Search with Contextual Answers**
- **Enhancement:** Transform search bar into intelligent search
- **Features:**
  - Real-time search suggestions as user types
  - Contextual answers displayed inline (not just links)
  - Source attribution (KB-XXXX-XXX, Confluence, MKDocs)
  - External content indexing simulation (PCTE-specific docs)

### 3. **Disambiguation & Clarifying Questions**
- **New Feature:** AI asks clarifying questions
- **Examples:**
  - "Do you need Windows or Linux environment?"
  - "Are you a trainee or instructor?"
  - "Is this for lab access or training portal?"
  - "Which version of PCTE are you using?"

### 4. **Multi-Turn Conversations**
- **New Feature:** Conversational flow with context retention
- **Flow:**
  1. User asks initial question
  2. AI responds with answer or clarifying question
  3. User provides additional context
  4. AI provides refined answer
  5. Optional: Continue conversation or escalate

### 5. **Sentiment Analysis & Auto-Escalation**
- **New Feature:** Detect frustrated users and auto-escalate
- **Implementation:**
  - Analyze message sentiment (frustrated, neutral, satisfied)
  - Display sentiment indicator
  - Auto-escalate to live agent if sentiment is high
  - Show escalation banner/notification

### 6. **Auto-Ticket Creation**
- **New Feature:** AI creates tickets when issue can't be resolved
- **Flow:**
  1. User indicates issue isn't resolved
  2. AI agent collects information (already has context)
  3. AI creates ticket automatically
  4. Shows ticket number and link
  5. Ticket appears in Ticket Dashboard (Screen 3)

### 7. **Source Attribution & Confidence Scores**
- **Enhancement:** Show where answers come from
- **Display:**
  - KB article ID (KB-2024-001)
  - Source system (Confluence, MKDocs)
  - Confidence percentage (92%)
  - Links to full articles

### 8. **Natural Language Understanding**
- **New Feature:** Handle various phrasings of same question
- **Examples:**
  - "Can't access lab" = "I need lab access" = "Lab environment not working"
  - "Password reset" = "Forgot password" = "Can't log in"

---

## Technical Implementation Plan

### Phase 1: Data Layer (Foundation)
**Files to Create/Modify:**
- `src/data/mockKB.js` - Knowledge base articles with full content
- `src/data/mockConversations.js` - Pre-defined conversation flows
- `src/data/mockTickets.js` - Ticket creation templates

**Knowledge Base Structure:**
```javascript
{
  id: 'KB-2024-001',
  title: 'Lab Access Troubleshooting',
  content: 'Full article content...',
  source: 'Confluence',
  keywords: ['lab', 'access', 'environment', 'troubleshoot'],
  category: 'Technical',
  relatedArticles: ['KB-2024-002', 'KB-2024-015'],
  confidence: 0.92
}
```

**Conversation Flows:**
- Pre-defined scenarios (lab access, password reset, training portal)
- Intent recognition patterns
- Response templates with placeholders
- Disambiguation questions mapping

### Phase 2: Chat Component (Core UI)
**Files to Create:**
- `src/components/AIChatPanel.jsx` - Main chat interface component
- `src/components/ChatMessage.jsx` - Individual message bubble
- `src/components/ChatInput.jsx` - Input field with send button
- `src/components/SourceAttribution.jsx` - KB source display component

**Features:**
- Slide-in panel animation
- Message list with scroll
- Typing indicator
- Send button with loading state
- Auto-scroll to latest message

### Phase 3: AI Simulation Engine (Brain)
**Files to Create:**
- `src/utils/aiSimulator.js` - Main AI logic
- `src/utils/intentMatcher.js` - Intent detection
- `src/utils/sentimentAnalyzer.js` - Sentiment detection
- `src/utils/disambiguationHandler.js` - Clarifying question logic

**AI Simulator Logic:**
1. Parse user message
2. Extract intent (lab access, password, training, etc.)
3. Check for disambiguation needs
4. Search KB for relevant articles
5. Generate response
6. Calculate confidence score
7. Detect sentiment
8. Determine if escalation needed

### Phase 4: Integration Features
**Features:**
- Connect to Ticket Dashboard (create tickets)
- Show ticket creation in real-time
- Link to created tickets
- Escalation flow visualization

### Phase 5: Enhanced Search Bar
**Modifications:**
- Real-time search suggestions
- Click to open chat with pre-filled query
- Inline answer preview
- Source attribution chips

---

## Demo Scenarios (Pre-Scripted Flows)

### Scenario 1: Lab Access Issue (Happy Path)
**User:** "I can't access the lab environment"
**AI:** "I can help with lab access. Are you a trainee or instructor?"
**User:** "Trainee"
**AI:** "Which training module are you trying to access?"
**User:** "Module 3"
**AI:** [Provides step-by-step guide with KB-2024-001]
**Confidence:** 92%
**Source:** KB-2024-001 (Confluence)

### Scenario 2: Password Reset (Simple)
**User:** "Forgot my password"
**AI:** [Immediate solution with KB-2024-003]
**Confidence:** 97%
**Source:** KB-2024-003 (Confluence)

### Scenario 3: Frustrated User (Sentiment Escalation)
**User:** "I can't believe this! I need help NOW! This is urgent!"
**AI:** [Detects high sentiment]
**AI:** "I understand this is urgent. Let me connect you with a live agent immediately."
**System:** [Auto-escalates to Tier 1]

### Scenario 4: Complex Issue (Ticket Creation)
**User:** "My lab environment crashed during training exercise"
**AI:** "I'm sorry to hear that. Let me help troubleshoot..."
**AI:** [Provides initial troubleshooting]
**User:** "This didn't solve it"
**AI:** "I understand. Let me create a support ticket for you."
**System:** [Creates ticket INC-5421]
**AI:** "Ticket INC-5421 has been created. Our team will investigate immediately."

### Scenario 5: Disambiguation
**User:** "How do I reset my credentials?"
**AI:** "I can help with credentials. Do you need to reset your password or recover your username?"
**User:** "Password"
**AI:** [Provides password reset guide]

---

## UI/UX Design Specifications

### Chat Panel Layout
- **Position:** Slide-in from right OR overlay modal
- **Size:** 400px wide, 600px tall (responsive)
- **Animation:** Smooth slide-in (300ms ease-out)
- **Background:** Dark theme (#1a1a1a) with PCTE colors
- **Header:** "AI Assistant" with close button
- **Footer:** Input area with send button

### Message Bubbles
- **User Messages:** Right-aligned, PCTE gold (#D4AF37)
- **AI Messages:** Left-aligned, dark gray (#333333)
- **Typing Indicator:** Three animated dots
- **Timestamps:** Small, muted text
- **Source Attribution:** Chip below AI message

### Search Bar Enhancement
- **Suggestions:** Dropdown with clickable items
- **AI Badge:** "AI-powered" indicator
- **Quick Actions:** Click to open chat with query

### Visual Indicators
- **Confidence Score:** Progress bar or badge
- **Source:** Chip with KB ID and source icon
- **Sentiment:** Color-coded indicator (green/yellow/red)
- **Escalation:** Banner notification

---

## File Structure Changes

```
src/
├── components/
│   ├── SelfServicePortal.jsx (MODIFIED - add chat integration)
│   ├── AIChatPanel.jsx (NEW)
│   ├── ChatMessage.jsx (NEW)
│   ├── ChatInput.jsx (NEW)
│   ├── SourceAttribution.jsx (NEW)
│   └── SentimentIndicator.jsx (NEW)
├── data/
│   ├── mockKB.js (NEW - full KB content)
│   ├── mockConversations.js (NEW - conversation flows)
│   └── mockTickets.js (MODIFIED - add created tickets)
├── utils/
│   ├── aiSimulator.js (NEW - main AI logic)
│   ├── intentMatcher.js (NEW - intent detection)
│   ├── sentimentAnalyzer.js (NEW - sentiment analysis)
│   └── disambiguationHandler.js (NEW - clarifying questions)
└── hooks/
    └── useChat.js (NEW - chat state management)
```

---

## Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Create mockKB.js with realistic PCTE articles
- [ ] Create mockConversations.js with conversation flows
- [ ] Build basic AIChatPanel component
- [ ] Implement chat message display

### Phase 2: Core AI Logic (Day 2)
- [ ] Build aiSimulator.js with intent matching
- [ ] Implement disambiguation logic
- [ ] Add sentiment analysis
- [ ] Create response generation

### Phase 3: Advanced Features (Day 3)
- [ ] Add source attribution display
- [ ] Implement confidence scoring
- [ ] Build ticket creation flow
- [ ] Add auto-escalation

### Phase 4: Polish & Integration (Day 4)
- [ ] Enhance search bar with inline results
- [ ] Add smooth animations
- [ ] Connect to Ticket Dashboard
- [ ] Add typing indicators
- [ ] Implement chat history

### Phase 5: Demo Scenarios (Day 5)
- [ ] Pre-script all demo scenarios
- [ ] Test conversation flows
- [ ] Add visual polish
- [ ] Create demo script guide

---

## Success Criteria

✅ **Interactive Chat:** Users can have multi-turn conversations  
✅ **Intelligent Responses:** AI provides contextual, relevant answers  
✅ **Source Attribution:** All answers show KB source and confidence  
✅ **Sentiment Detection:** Frustrated users auto-escalate  
✅ **Ticket Creation:** AI creates tickets seamlessly  
✅ **Disambiguation:** AI asks clarifying questions when needed  
✅ **Professional UI:** Smooth animations, polished design  
✅ **Demo-Ready:** Pre-scripted scenarios work flawlessly  

---

## Key Differentiators from ServiceNow

1. **PCTE-Specific Context:** All scenarios tailored to PCTE (lab access, training portal, cyber training)
2. **Security-Focused:** CUI compliance indicators visible
3. **Multi-Tier Integration:** Shows escalation to Tier 1-3
4. **Continuous Learning:** References model versioning and retraining
5. **COTS Integration:** Shows Confluence, MKDocs, Jira integration explicitly

---

## Next Steps

1. Review and approve this plan
2. Start Phase 1 implementation
3. Iterate based on feedback
4. Test all demo scenarios
5. Record demo video

---

## Notes

- **Static Demo:** All AI responses are pre-scripted but feel natural
- **Realistic Timing:** Add delays to simulate AI processing
- **Fallback Handling:** Graceful handling of unexpected inputs
- **Accessibility:** Ensure keyboard navigation and screen reader support
- **Mobile Responsive:** Chat panel adapts to smaller screens

