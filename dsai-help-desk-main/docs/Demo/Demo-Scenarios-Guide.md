# Demo Scenarios Guide
## Exact Messages for Reliable Demo Flows

**📌 IMPORTANT:** The authoritative source for demo scripts is `src/data/demoScriptParts.json`. This file should be kept in sync with that JSON file. The Demo Script Navigator (DSN) component reads from that file, so any updates should be made there first.

These are the exact copy-paste phrases to use for each demo scenario. Follow them step-by-step.

---

## ✅ Scenario 0: AI-Powered Search (NEW)

**Purpose:** Demonstrate intelligent search across KB and external systems

**Copy-Paste These Exact Search Terms:**

### Search 1: Password Reset
**Type in search bar:** `password reset`
- **Expected:** Shows 2-3 KB articles (Password Reset Procedures, SSO Configuration) and 2 external results (Jira ticket, Confluence article)
- **Key Points:** 
  - KB articles show: ID, source (Confluence), confidence match %, views, last updated
  - External results show: Jira ticket "Password Reset Request - Account Locked", Confluence article "Password Policy Update"
  - Each result has "Chat about this" button to transition to chat

### Search 2: Lab Access
**Type in search bar:** `lab access`
- **Expected:** Shows KB articles (Lab Access Troubleshooting Guide, Network Configuration) and external results (Jira ticket, Confluence maintenance schedule)
- **Key Points:**
  - Demonstrates search across multiple sources (KB, Jira, Confluence)
  - Results show relevance scores
  - External system integration visible

### Search 3: Training Portal
**Type in search bar:** `training portal`
- **Expected:** Shows KB articles (Training Portal Access Guide) and external results (MKDocs API docs, Confluence tracking guide)
- **Key Points:**
  - Shows MKDocs integration
  - Demonstrates different source types (Technical Docs, Guide)

### Search 4: Error Codes
**Type in search bar:** `error code`
- **Expected:** Shows KB article (Common Error Codes Reference) and external results (Jira ticket for ACC-001, Confluence error reference)
- **Key Points:**
  - Shows reference materials
  - Demonstrates historical ticket resolution

**What You'll See:**
- ✅ AI search animation: "AI is searching knowledge base and external systems..."
- ✅ Results count: "Found X results for 'search term'"
- ✅ Two sections: Knowledge Base Articles (golden) and External Systems (blue)
- ✅ Each result shows: ID, source, match percentage, title, summary
- ✅ "Chat about this" button on KB results
- ✅ "View in [Source] →" link on external results
- ✅ Source-specific colors (Jira blue, Confluence dark blue, MKDocs light blue)

**Demo Script:**
1. **Say:** "First, let me show you our AI-powered search. Unlike traditional search, this searches across both our knowledge base and connected external systems like Jira and Confluence."
2. **Type:** `password reset` → **Press Enter**
3. **Say:** "Notice how it finds relevant articles from our KB with confidence scores, plus related tickets and documentation from Jira and Confluence. This gives users comprehensive results in one place."
4. **Say:** "If a user wants more personalized help, they can click 'Chat about this' to continue with the AI assistant."
5. **Type:** `lab access` → **Press Enter**
6. **Say:** "Here you can see how it finds both troubleshooting guides and related tickets from our ticketing system, showing users how similar issues were resolved."

---

## ✅ Scenario 1: Lab Access (Disambiguation)

**Purpose:** Show multi-turn conversation with disambiguation questions

**Steps:**

1. Click the "Lab Access" Quick Action (no typing needed)
   - **Expected:** "I can help with lab access. Are you a trainee or instructor?"

2. Click: `trainee` (no typing needed)
   - **Expected:** "Which training module are you trying to access?"

3. Click: `Module 3` (no typing needed)
   - **Expected:** "Based on your needs as a trainee for Module 3, here's a step-by-step guide: [Full troubleshooting guide]"
   - **Shows:** KB-2024-001, 95% confidence, Confluence source

**What You'll See:**
- ✅ Rotating typing messages: "Understanding request...", "Analyzing...", "Processing..."
- ✅ Disambiguation questions with clickable chips
- ✅ Typing effect on AI responses
- ✅ Source attribution (KB-2024-001)
- ✅ Confidence score (95%)

---

## ✅ Scenario 2: Password Reset (Direct)

**Purpose:** Show instant resolution without disambiguation

**Copy-Paste This Exact Message:**

1. `I forgot my password`
   - **Expected:** "I can help you reset your password. Here's the quick process: [5-step password reset guide]"
   - **Shows:** KB-2024-002, 95% confidence, Confluence source

**What You'll See:**
- ✅ Rotating typing messages before response
- ✅ Immediate solution (no questions asked)
- ✅ Typing effect on response
- ✅ Source attribution (KB-2024-002)
- ✅ Confidence score (95%)

---

## ✅ Scenario 3: Lab Crash → Ticket Creation → Escalation

**Purpose:** Show AI-powered ticket creation and escalation to human agent

**Copy-Paste These Exact Messages:**

1. `My lab crashed`
   - **Expected:** "I understand your lab environment has crashed. This is a critical issue... [5 troubleshooting steps]"
   - **Shows:** KB-2024-001, 92% confidence

2. `That didn't work`
   - **Expected:** "I understand. Let me provide some additional troubleshooting steps: [4 more steps]"

3. `Still doesn't work`
   - **Expected:** "I see the issue persists. Let me try one more troubleshooting approach: [4 more steps]"

4. `Not resolved`
   - **Expected:** "I understand this hasn't been resolved yet. Could you please provide more details about what happened? For example:
     - What were you doing when the lab crashed?
     - What error messages did you see?
     - Have you tried any troubleshooting steps?
     This will help me create a more detailed support ticket for you."

5. `I was running Module 3 training exercise when the lab environment suddenly crashed. I lost all my progress and can't access it anymore.`
   - **Expected Sequence:**
     - 🔍 "Analyzing request..."
     - 🤖 "AI Agent Processing Ticket Creation..."
       - 📋 Analyzing details...
       - 🔍 Classifying priority...
       - 📝 Generating ticket...
     - ✅ "Support ticket INC-XXXX has been created successfully!"
     - **Ticket Details:** ID, Priority, Status, Description
     - **View Ticket:** Link to ticket

6. `I need help NOW! This is urgent!`
   - **Expected Sequence:**
     - 🔍 "Analyzing escalation request..."
     - AI: "I understand this is urgent. Let me connect you with a live human agent immediately."
     - 🔍 "Finding available agent..."
     - 📞 "Connecting to live agent..."
     - "Agent will message you when online"
     - After 3 seconds → Sarah (Tier 2) message appears

**What You'll See:**
- ✅ Rotating typing messages throughout
- ✅ AI processing animation for ticket creation
- ✅ Ticket details with link
- ✅ Chat stays open (doesn't close)
- ✅ Escalation animation sequence
- ✅ Sarah (Tier 2) agent message
- ✅ No "AI is typing" during escalation

---

## Quick Reference: All Scenarios

### Scenario 1: Lab Access
```
I can't access the lab → trainee → Module 3
```

### Scenario 2: Password Reset
```
I forgot my password
```

### Scenario 3: Lab Crash (Full Flow)
```
My lab crashed → That didn't work → Still doesn't work → Not resolved → [Your detailed message] → I need help NOW! This is urgent!
```

---

## 🎯 Complete 20-Minute Demo Script & Flow

### Overview (2 minutes)
"Today I'll demonstrate our comprehensive AI Help Desk solution for PCTE environments. We'll walk through 8 integrated screens that show how AI transforms support from reactive ticket queues to proactive, intelligent assistance. This covers everything from end-user self-service to administrator oversight."

### Screen 1: Self-Service Portal (8 minutes)
**Navigate**: Login as Cyber Operator → Self-Service Portal
**Say**: "This is where your users start - the AI-powered self-service portal. Notice it's not just a static FAQ, but an intelligent conversational interface with powerful search capabilities."

**Scenario 1A: AI-Powered Search (2 minutes)**
**Type**: `password reset` → **Press Enter**
**Say**: "First, let me show you our AI-powered search. Unlike traditional search, this searches across both our knowledge base and connected external systems like Jira and Confluence in real-time."

**Point to results**: "Notice how it finds relevant articles from our KB with confidence scores, plus related tickets and documentation from Jira and Confluence. This gives users comprehensive results in one place."

**Type**: `lab access` → **Press Enter**
**Say**: "Here you can see how it finds both troubleshooting guides and related tickets from our ticketing system, showing users how similar issues were resolved."

**Scenario 1B: Smart Disambiguation (2 minutes)**
**Type**: `I can't access the lab`
**Say**: "Notice the AI doesn't just give generic answers - it asks clarifying questions to understand the user's specific context."

**Type**: `trainee` → **Type**: `Module 3`
**Say**: "Now watch how it provides a targeted solution with 95% confidence, citing the exact knowledge base article. This shows our AI understands PCTE's training structure."

**Scenario 1B: Instant Resolution (1 minute)**
**Restart chat** → **Type**: `I forgot my password`
**Say**: "For common issues, our AI provides immediate solutions. No wait times, no ticket creation needed - just instant help with 95% confidence."

**Scenario 1C: Critical Issue Escalation (3 minutes)**
**Type**: `My lab crashed` → **Type**: `That didn't work` → **Type**: `Still doesn't work` → **Type**: `Not resolved`
**Say**: "The AI recognizes when automated solutions aren't working and seamlessly transitions to ticket creation."

**Type**: `I was running Module 3 training exercise when the lab environment suddenly crashed...`
**Say**: "Watch the AI agent autonomously create a detailed ticket - analyzing, classifying priority, and generating the ticket automatically."

**Wait for ticket creation**, then **Type**: `I need help NOW! This is urgent!`
**Say**: "Our AI detects urgency through sentiment analysis and immediately escalates to Tier 2 support. Sarah is now connected with full context."

### Screen 2: Architecture Diagram (2 minutes)
**Navigate**: Architecture Diagram
**Say**: "Let me show you how this all works under the hood. Our architecture integrates with your existing PCTE infrastructure - Confluence for knowledge, Jira for tickets, and your COTS systems. The AI engine processes requests through multiple layers: intent recognition, sentiment analysis, and smart routing."

### Screen 3: Ticket Dashboard (3 minutes)
**Navigate**: Ticket Dashboard (as Help Desk Analyst)
**Say**: "Here's where your support team manages escalated tickets. Notice the ticket we just created appears automatically with full context. The dashboard shows priority levels, status, and AI-generated summaries that save agents 40% time on documentation."

**Point to features**: "You can see AI confidence scores, suggested resolutions, and escalation paths. The system learns from every interaction to improve future responses."

### Screen 4: Analytics Dashboard (2 minutes)
**Navigate**: Analytics Dashboard
**Say**: "This is your command center for performance insights. We track resolution times, user satisfaction, and AI accuracy rates. Notice how 74% of issues are resolved instantly by AI, while the remaining 26% get intelligent escalation."

**Highlight metrics**: "Our customers see 30% faster response times and 25% improvement in user retention. The system continuously monitors for patterns and suggests knowledge base improvements."

### Screen 5: Configuration Interface (2 minutes)
**Navigate**: Configuration Interface (as Administrator)
**Say**: "Administrators can easily configure AI behavior, knowledge sources, and escalation rules. You control confidence thresholds, response templates, and integration settings without any coding."

**Show settings**: "Notice how you can adjust sentiment sensitivity, customize disambiguation flows, and manage role-based access - all while maintaining CUI compliance."

### Screen 6: Escalation Workflow (1 minute)
**Navigate**: Escalation Workflow
**Say**: "This shows the intelligent escalation paths we just saw in action. Tickets flow from AI to Tier 1 to Tier 2 based on complexity and urgency. Each step maintains full conversation context."

### Screen 7: System Integration Status (1 minute)
**Navigate**: System Integration Status
**Say**: "Real-time monitoring of all connected systems. We integrate with Confluence, Jira, your authentication systems, and external knowledge bases. Health checks ensure everything is working smoothly."

### Screen 8: Model Versioning & Security (1 minute)
**Navigate**: Model Versioning → Security Dashboard
**Say**: "Finally, our continuous learning system and security compliance. The AI improves over time through retraining on new data, while maintaining full audit trails and CUI protection."

### Closing (1 minute)
"What you've seen is a complete transformation of help desk experience - from instant self-service to intelligent escalation, all while maintaining security compliance and integrating with your existing PCTE infrastructure. This reduces resolution time by over 70% while improving user satisfaction."

**Total Time**: ~20 minutes
**Key Differentiators**: PCTE-specific context, security-first design, and measurable ROI

---

## Key Features Demonstrated

- ✅ Rotating typing messages ("Understanding request...", "Analyzing...", etc.)
- ✅ Multi-turn conversations with context retention
- ✅ Disambiguation questions with clickable chips
- ✅ AI-powered autonomous ticket creation
- ✅ Markdown rendering (bold, bullets, links)
- ✅ Source attribution with confidence scores
- ✅ Sentiment detection
- ✅ Auto-escalation to human agent (Sarah - Tier 2)
- ✅ Typing effects on all AI responses
- ✅ No typing indicator during escalation

---

## 💡 Demo Strategy Notes

**Our Competitive Edge:**
- **PCTE-Specific Context**: Lab environments, training modules, cyber scenarios
- **Security-First**: CUI compliance, audit trails, controlled access
- **Story-Driven**: Each scenario tells a complete problem-to-resolution narrative
- **Technical Rigor**: Real KB integration, ticket systems, escalation paths

**From Competitors:**
- ServiceNow's proactive ticket creation → Enhanced with PCTE context
- Zendesk's instant self-service → Added security compliance features

---

## Notes

- **Scripts are deterministic:** Same input = same output
- **Each scenario is independent:** Restart chat to try different scenarios
- **Use exact phrases:** Copy-paste for best results
- **Wait for responses:** Don't send next message until AI responds
- **Chat stays open:** Won't close after ticket creation

---

## Troubleshooting

- If a scenario doesn't work, restart the chat session
- Use exact phrases as shown above
- Wait for AI to finish typing before sending next message
- Check browser console for any errors
