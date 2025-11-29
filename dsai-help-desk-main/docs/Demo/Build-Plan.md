# PCTE AI Help Desk - React MUI Build Plan

## Overview
Build a static React MUI application that visually demonstrates the PCTE AI Help Desk product. The app displays UI mockups with realistic data and smooth interactions, optimized for demo videos and evaluator assessment.

**Scope:** Static UI demonstration only. No functional backend, no actual ML models, no live data processing. The demo shows what the product interface and user workflows would look like.

**Purpose:** Provide evaluators with concrete visual evidence of how the solution addresses RFS requirements through UI/UX design, realistic data presentation, and scenario-based videos.

## Tech Stack
- **Framework:** React 18 (Vite)
- **UI Library:** Material-UI (MUI) v5
- **Routing:** React Router v6
- **Charts:** Chart.js + react-chartjs-2
- **Hosting:** Netlify/Vercel
- **Styling:** MUI theme + custom CSS

## Project Structure
```
pcte-ai-help-desk-demo/
├── src/
│   ├── components/
│   │   ├── Layout.jsx (header, nav, footer)
│   │   ├── SelfServicePortal.jsx (Screen 1)
│   │   ├── ArchitectureDiagram.jsx (Screen 2)
│   │   ├── TicketDashboard.jsx (Screen 3)
│   │   ├── AnalyticsDashboard.jsx (Screen 4)
│   │   ├── ConfigurationInterface.jsx (Screen 5)
│   │   ├── EscalationWorkflow.jsx (Screen 6)
│   │   ├── SystemIntegrationStatus.jsx (Screen 7)
│   │   ├── ModelVersioning.jsx (Screen 8)
│   │   └── SecurityCompliance.jsx (Screen 9)
│   ├── data/
│   │   ├── mockTickets.js (sample ticket data)
│   │   ├── mockAnalytics.js (sample metrics)
│   │   ├── mockKB.js (sample KB articles)
│   │   ├── mockConnectors.js (COTS connector status)
│   │   ├── mockModelVersions.js (model retraining history)
│   │   └── mockAuditLogs.js (security and compliance logs)
│   ├── theme/
│   │   └── pcteTheme.js (PCTE color palette, typography)
│   ├── App.jsx (routing)
│   └── main.jsx
├── public/
│   ├── pcte-logo.svg
│   ├── jira-logo.svg
│   ├── confluence-logo.svg
│   ├── mattermost-logo.svg
│   └── mkdocs-logo.svg
├── package.json
└── vite.config.js
```

---

## Build Phases

### Phase 1: Project Setup & Core Layout
**Deliverable:** Basic app with navigation between 9 screens

**Checklist Items Addressed:** Criterion 0 quality foundation for all screens

**Tasks:**
- [ ] Initialize Vite + React project
- [ ] Install MUI, React Router, Chart.js
- [ ] Create PCTE theme (colors, typography) → Checks: All screens' color palette, typography
- [ ] Build Layout component (header, nav, footer) → Checks: All screens' high-contrast PCTE branding
- [ ] Create router with 9 screen routes
- [ ] Add PCTE branding and logo → Checks: All screens' PCTE logo visibility
- [ ] Add COTS logos (Jira, Confluence, Mattermost, MKDocs) → Checks: Screen 2, 7 integration visibility

**Key Files:**
- `src/theme/pcteTheme.js` - PCTE Blue (#0052CC), greens, oranges, reds
- `src/components/Layout.jsx` - Consistent header/nav/footer
- `src/App.jsx` - React Router setup

### Phase 2: Dashboard Components
**Deliverable:** All 9 screens with static data displayed

**Checklist Items Addressed:** All Criterion 1 (Operational), Criterion 2 (Technical), Criterion 3 (Integration), Criterion 4 (Operations), Criterion 5 (Schedule) items

**Tasks:**
- [ ] Screen 1: Self-Service Portal → Checks: S1 Criteria 0,1,2,3,5 (AI-powered search, quick links, chat, Confluence integration, Month 6 label)
- [ ] Screen 2: Architecture Diagram → Checks: S2 Criteria 0,2,3 (NLP/RAG/ML/Escalation components, PCTE integration points with COTS logos)
- [ ] Screen 3: Ticket Dashboard → Checks: S3 Criteria 0,1,2,3,4 (Auto-tags, confidence scores, sentiment, KB recommendations, Jira integration)
- [ ] Screen 4: Analytics Dashboard → Checks: S4 Criteria 0,1,2,4,5 (KPI cards, realistic metrics, predictive alerts, Month 18 label)
- [ ] Screen 5: Configuration Interface → Checks: S5 Criteria 0,3,4 (Visual rule builder, MKDocs sync, SSO, audit logging, drag-and-drop KB management)
- [ ] Screen 6: Escalation Workflow → Checks: S6 Criteria 0,2,3 (Tier routing, success rates, context preservation)
- [ ] Screen 7: System Integration Status → Checks: S7 Criteria 3,4 (COTS connector status, data source logos, webhook activity logs, last sync timestamps)
- [ ] Screen 8: Model Versioning & Continuous Learning → Checks: S8 Criteria 4,11 (Model version history, retraining events, data incorporation timeline, rollback capability)
- [ ] Screen 9: Security & Compliance Dashboard → Checks: S9 Criteria 4,12 (Audit logs, access logs, RBAC settings, CUI compliance indicators, user activity tracking)

**Key Files:**
- `src/data/mockTickets.js` - 54,000+ tickets reference, realistic data, confidence scores, sentiment
- `src/data/mockAnalytics.js` - KPIs, trends, forecasts, predictive alerts
- `src/data/mockKB.js` - KB articles for search with source attribution (KB-XXXX-XXX format)
- `src/data/mockConnectors.js` - COTS connector status, sync metrics, configuration
- `src/data/mockWebhooks.js` - Webhook activity logs, API call history, integration events
- `src/data/mockModelVersions.js` - Model version history, retraining events, performance metrics
- `src/data/mockFeedback.js` - User feedback data, ratings, improvement inputs
- `src/data/mockAuditLogs.js` - Audit log entries, user actions, security events
- `src/data/mockSecurity.js` - Security settings, compliance status, RBAC configuration

### Phase 3: Polish & Interactions
**Deliverable:** Smooth animations, hover states, loading states, error states

**Checklist Items Addressed:** All Criterion 0 (Quality) animation/interaction items, error handling

**Tasks:**
- [ ] Add MUI animations and transitions → Checks: All screens' smooth page transitions
- [ ] Implement hover effects on buttons, cards, tables → Checks: S1,3,4,5 hover states; S3 table row hover states
- [ ] Add loading skeletons for dashboard data → Checks: S3,4 loading skeleton states
- [ ] Implement search functionality (client-side filtering) → Checks: S1 search with AI suggestions; S3 filter bar
- [ ] Add responsive design for different screen sizes → Checks: All screens' responsive layout
- [ ] Test on different browsers → Checks: All screens' cross-browser compatibility
- [ ] Implement error state demonstrations → Checks: Error handling, system resilience

**Key Features:**
- Smooth page transitions (all screens)
- Button ripple effects (all screens)
- Table row hover states (S3, S4)
- Chart animations (S4)
- Loading states for realistic feel (S3, S4)
- Search autocomplete animations (S1)

**Error State Demonstrations:**
- Screen 3: Failed ticket sync (red alert banner, retry button)
- Screen 7: Connector disconnected (Jira status: "Connection Failed", last sync: 2 hours ago)
- Screen 7: Webhook delivery failure (event status: "Failed", response code: 503)
- Screen 8: Model rollback scenario (version reverted from v2.3.1 to v2.3.0 due to accuracy drop)
- Screen 9: Security alert (failed login attempts spike, alert highlighted in red)
- Screen 1: Search timeout (no results found, suggestion to refine query)

### Phase 4: Video Recording & Deployment
**Deliverable:** Deployed app + 4 professional demo videos

**Checklist Items Addressed:** All video Criterion 0 (Quality), Criterion 1 (Operational), Criterion 2 (Technical), Criterion 3 (Integration), Criterion 4 (Operations), Criterion 5 (Schedule) items

**Tasks:**
- [ ] Deploy to Netlify/Vercel → Checks: All videos' deployment test
- [ ] Test deployment (screen share, video playback)
- [ ] Record Video 1: Tier 0 Chatbot → Checks: V1 Criteria 0,1,2 (1080p/audio/transitions, trainee lab access scenario, NLP+RAG with confidence scores)
- [ ] Record Video 2: Ticket Enrichment → Checks: V2 Criteria 0,1,2,4 (1080p/animations, auto-enrichment scenario, ML classification, workload reduction)
- [ ] Record Video 3: Analytics Insights → Checks: V3 Criteria 0,1,2,4,5 (1080p/charts/graphics, spike prediction scenario, continuous learning, Month 18 capability)
- [ ] Record Video 4: Integration & Operations Overview → Checks: V4 Criteria 0,3,4,12 (1080p/graphics, connector status, webhook activity, model versioning, security/compliance)
- [ ] Edit videos (voiceover, transitions, timing) → Checks: All videos' professional production quality
- [ ] Create backup video files

---

## RFS Requirements Coverage Analysis

This section maps RFS requirements to demo coverage. Some requirements (e.g., actual ML model training, production deployment) are outside the scope of a static demo and are noted as "Not Demonstrated."

### Core Requirements Coverage

| # | Requirement | Demo Coverage | Notes |
|---|---|---|---|
| 1 | AI-Enabled Help Desk | ✓ Demonstrated | Screen 1 (chatbot), Screen 3 (enrichment), Screen 4 (analytics) show AI capabilities |
| 2 | Self-Service AI Help Desk Assistant | ✓ Demonstrated | Screen 1 shows Tier 0 self-service portal with chat interface |
| 3 | Natural Language Processing | ✓ Demonstrated | Video 1 shows multi-turn dialogue with clarifying questions |
| 4 | Tiered AI Help Desk Assistant | ✓ Demonstrated | Screen 3 shows auto-tagging; Screen 6 shows tier routing logic |
| 5 | Escalation Logic | ✓ Demonstrated | Screen 6 shows escalation workflow with SLA triggers and tier routing |
| 6 | Accuracy and Completeness | ✓ Demonstrated | Video 1 shows confidence scores (92%), source attribution (KB-2024-001) |
| 7 | Help Desk Ticket Enrichment | ✓ Demonstrated | Screen 3 shows auto-tags, sentiment, KB recommendations; Video 2 shows enrichment in action |
| 8 | Knowledge Base and Self Service | ✓ Demonstrated | Screen 1 shows KB search and articles; Screen 5 shows KB management |
| 9 | Management and Monitoring Dashboard | ✓ Demonstrated | Screen 4 shows analytics dashboard; Screen 5 shows configuration interface |
| 10 | Analytics and Predictive Insights | ✓ Demonstrated | Screen 4 shows KPIs, trends, forecasts; Video 3 shows predictive spike detection |
| 11 | Continuous Machine Learning Model | ✓ Demonstrated | Screen 8 shows model version history, retraining events, data incorporation timeline, rollback capability |
| 12 | Data Assurance and Security | ✓ Demonstrated | Screen 9 shows audit logs, access logs, RBAC settings, CUI compliance indicators, user activity tracking |

### Integration Requirements Coverage

| Requirement | Demo Coverage | Notes |
|---|---|---|
| Integration into PCTE enterprise | ✓ Demonstrated | Screen 2 shows architecture with PCTE integration points |
| Integration with ITSM/CRM tools (Jira, ServiceNow) | ✓ Demonstrated | Screen 3 shows Jira integration; Screen 5 shows configuration for external systems |
| Ingestion of external data | ✓ Demonstrated | Screen 5 shows MKDocs sync, Confluence import, Jira ingestion |
| Out-of-the-box COTS connectors | ✓ Demonstrated | Screen 7 shows connector status for Jira, Confluence, MKDocs, Mattermost with logos, sync status, last sync timestamps |
| Standardized APIs/webhooks | ✓ Demonstrated | Screen 7 shows webhook activity logs with API call history, request/response status, integration event timeline |

### Operations and Solution Management Requirements Coverage

| Requirement | Demo Coverage | Notes |
|---|---|---|
| AI solution available within same interface as Help Desk | ✓ Demonstrated | Screen 1 shows integrated chat; Screen 3 shows AI enrichment in ticket dashboard |
| User-friendly, state-of-the-art UI/UX | ✓ Demonstrated | All screens show professional MUI design with smooth interactions |
| Easily configurable without technical knowledge | ✓ Demonstrated | Screen 5 shows visual rule builder, drag-and-drop KB management, sliders for settings |
| Scalable to handle 250-1,000 simultaneous users | ⚠ Not Demonstrated | Static demo cannot demonstrate scalability; architecture supports this requirement |

### Deliverables Coverage

| Deliverable | Demo Coverage | Notes |
|---|---|---|
| Functional prototype | ✓ Demonstrated | Static React app demonstrates UI/UX of all 9 screens |
| Documentation | ⚠ Out of Scope | Demo does not include user manuals or API docs (separate deliverable) |
| AI algorithm design report | ⚠ Out of Scope | Demo does not include technical implementation details (separate deliverable) |
| Periodic demonstrations | ✓ Demonstrated | 3 demo videos show key capabilities in action |
| Security controls documentation | ⚠ Partially Demonstrated | Screen 5 shows security features; formal RMF documentation out of scope |
| Licensing cost estimate | ⚠ Out of Scope | Not included in demo |
| Data rights and sustainment terms | ⚠ Out of Scope | Not included in demo |

### Summary

**Fully Demonstrated (17 items):** All 12 core requirements, all integration requirements (COTS connectors, APIs/webhooks), all operations requirements (UI/UX, configurability), functional prototype, periodic demonstrations

**Partially Demonstrated (1 item):** Scalability testing (static demo cannot load-test; architecture supports requirement)

**Not Demonstrated (3 items):** User/API documentation, algorithm design report, licensing/data rights (these are separate deliverables outside demo scope)

**Out of Scope (3 items):** Formal documentation, cost estimates, licensing terms (not part of UI demo)

---

## User Role Mapping

This section clarifies which screens are visible to each user role in the PCTE Help Desk system.

| Screen | Screen Name | Cyber Operator | Training Manager | Help Desk Analyst | Administrator | Notes |
|--------|---|---|---|---|---|---|
| 1 | Self-Service Portal | ✓ | ✓ | ✓ | ✓ | All users access Tier 0 self-service |
| 2 | Architecture Diagram | ✗ | ✓ | ✓ | ✓ | Technical overview for managers/analysts/admin |
| 3 | Ticket Dashboard | ✗ | ✗ | ✓ | ✓ | Analysts and admin manage tickets |
| 4 | Analytics Dashboard | ✗ | ✓ | ✓ | ✓ | Managers monitor training impact; analysts/admin see metrics |
| 5 | Configuration Interface | ✗ | ✗ | ✗ | ✓ | Admin-only system configuration |
| 6 | Escalation Workflow | ✗ | ✓ | ✓ | ✓ | Managers understand routing; analysts/admin manage escalations |
| 7 | System Integration Status | ✗ | ✗ | ✓ | ✓ | Analysts/admin monitor connector health |
| 8 | Model Versioning | ✗ | ✗ | ✓ | ✓ | Analysts/admin manage ML model lifecycle |
| 9 | Security & Compliance | ✗ | ✗ | ✗ | ✓ | Admin-only security and compliance |

**Demo Strategy:** Videos will focus on Cyber Operator/Training Manager experience (Screens 1, 4, 6). Static screens will demonstrate Help Desk Analyst/Administrator capabilities (Screens 2, 3, 5, 7, 8, 9).

---

## Static Data Clarification

All data displayed in the demo is representative and static. The following clarifications apply:

**Webhook Activity Logs (Screen 7):**
- Sample events shown are representative of typical integration activity
- Timestamps are fixed examples, not real-time
- Demonstrates webhook capability and integration patterns

**Audit Logs (Screen 9):**
- Sample audit events shown are representative of typical system activity
- Timestamps are fixed examples, not live audit trail
- Demonstrates audit logging capability and compliance tracking

**Model Retraining History (Screen 8):**
- Version history and retraining events are representative examples
- Demonstrates continuous learning capability and model versioning
- Actual model retraining would occur in production environment

**Ticket Data (Screen 3):**
- 20-30 sample tickets with realistic PCTE scenarios
- Demonstrates AI enrichment capability with confidence scores and sentiment analysis
- Actual ticket volume (54,000+) referenced for scale context

**Analytics Data (Screen 4):**
- KPIs and trend data are representative examples
- Demonstrates analytics and predictive insights capability
- Actual metrics would be generated from live ticket system

---

## Checklist-to-Task Mapping

This section maps each build task to the specific checklist items it addresses. Each task is designed to fulfill the requirements of its mapped checklist items.

### Phase 1 Tasks → Checklist Items

**Task: Create PCTE theme (colors, typography)**
- ✓ S1 Criterion 0: High-contrast PCTE branding (logo, colors)
- ✓ S2 Criterion 0: Clear labeling and color coding
- ✓ S3 Criterion 0: Color-coded priority indicators (red/orange/green)
- ✓ S4 Criterion 0: Professional color scheme
- ✓ S5 Criterion 0: Professional form styling
- ✓ S6 Criterion 0: Professional styling and colors
- ✓ All screens: Typography (headers, body, labels)

**Task: Build Layout component (header, nav, footer)**
- ✓ S1 Criterion 0: High-contrast PCTE branding (logo, colors)
- ✓ S2 Criterion 0: Professional layout with clear data flow
- ✓ S3 Criterion 0: Clear typography and spacing
- ✓ S4 Criterion 0: Clear legends and axis labels
- ✓ S5 Criterion 0: Clean tab interface
- ✓ S6 Criterion 0: Clear visual hierarchy

**Task: Add PCTE branding and logo**
- ✓ S1 Criterion 0: High-contrast PCTE branding (logo, colors)
- ✓ S2 Criterion 0: High-quality SVG or image (not hand-drawn)
- ✓ S3 Criterion 0: MUI DataGrid with realistic styling
- ✓ S4 Criterion 0: Chart.js visualizations with smooth animations
- ✓ S5 Criterion 0: Professional, intuitive UI
- ✓ S6 Criterion 0: Professional flowchart
- ✓ S7-S9 Criterion 0: Professional styling and branding consistency

### Phase 2 Tasks → Checklist Items

**Task: Screen 1 - Self-Service Portal**
- ✓ S1 C0: High-contrast PCTE branding, Smooth hover animations, Loading skeleton states
- ✓ S1 C1: Search bar with AI-powered suggestions, 4 quick links, Recent articles carousel, Chat button
- ✓ S1 C2: Search suggestions labeled "AI-powered", Chat interface multi-turn, Confidence scores visible
- ✓ S1 C3: KB articles sourced from Confluence, Chat styled for Mattermost, Links back to Confluence
- ✓ S1 C5: Label visible "Tier 0 Chatbot - Available Month 6", Shows early value delivery

**Task: Screen 2 - Architecture Diagram**
- ✓ S2 C0: High-quality SVG or image, Clear labeling and color coding, Professional layout
- ✓ S2 C2: NLP Engine, RAG Layer, ML Classifier, Escalation Engine, Dashboard, Data Flow arrows, Security controls
- ✓ S2 C3: Jira integration point labeled, Confluence integration point labeled, MKDocs integration point labeled, Mattermost integration point labeled, On-premises deployment architecture

**Task: Screen 3 - Ticket Dashboard**
- ✓ S3 C0: MUI DataGrid with realistic styling, Color-coded priority indicators, Smooth hover states, Clear typography and spacing
- ✓ S3 C1: Auto-tags visible, Suggested KB articles with match %, Recommended tier, Shows 54,000+ ticket reference
- ✓ S3 C2: Confidence scores on all tags, Sentiment detection visible, Source attribution for KB recommendations, Color coding based on ML priority
- ✓ S3 C3: Tickets from Jira appear, AI enrichment fields added, Status updates flow back to Jira
- ✓ S3 C4: Filter bar (Tier, Status, Priority, SLA Risk), Real-time data visible, Clear labeling of AI-generated vs. manual

**Task: Screen 4 - Analytics Dashboard**
- ✓ S4 C0: Chart.js visualizations with smooth animations, Professional color scheme, Clear legends and axis labels, Responsive layout
- ✓ S4 C1: KPI cards (6 total), Realistic PCTE metrics (54,000 tickets, 250-1,000 users), Trend chart, Top issue categories heatmap, Predictive alert
- ✓ S4 C2: Real-time metrics labeled, Trend analysis visible, Predictive forecast visible, Anomaly detection highlighted
- ✓ S4 C4: Predictive insights enable proactive planning, Anomaly detection highlighted, Trend analysis identified, Actionable recommendations visible
- ✓ S4 C5: Label visible "Full Analytics - Available Month 18", Shows incremental value progression

**Task: Screen 5 - Configuration Interface**
- ✓ S5 C0: Clean tab interface, Professional form styling, Clear labeling and instructions
- ✓ S5 C3: "Sync MKDocs" button visible, Markdown articles imported automatically, Version control maintained, SSO login visible, Containerized deployment info
- ✓ S5 C4: KB Management (Add/Edit/Delete, drag-and-drop), Escalation Rules (visual rule builder), Model Settings (sliders, dropdown, timestamp), Audit logging, Data retention policies, Privacy controls, Compliance reporting
- ✓ S5 C5: Label visible "Production-Ready System - Available Month 24", Shows full capability delivery

**Task: Screen 6 - Escalation Workflow**
- ✓ S6 C0: Clear visual hierarchy, Professional styling and colors, Easy to understand flow
- ✓ S6 C2: Tier 0 (58% success), Tier 1 (72% success), Tier 2 (85% success), Tier 3 (95% success), Tier 4 visible, Context preservation labeled, Avg resolution times shown
- ✓ S6 C3: Integration points with each tier visible, Escalation triggers clear

### Phase 3 Tasks → Checklist Items

**Task: Add MUI animations and transitions**
- ✓ S1 C0: Smooth hover animations on buttons and cards
- ✓ S2 C0: Professional layout with clear data flow
- ✓ S3 C0: Smooth hover states on table rows
- ✓ S4 C0: Chart.js visualizations with smooth animations
- ✓ S5 C0: Professional form styling
- ✓ S6 C0: Professional styling and colors
- ✓ All screens: Smooth page transitions

**Task: Implement hover effects on buttons, cards, tables**
- ✓ S1 C0: Smooth hover animations on buttons and cards
- ✓ S3 C0: Smooth hover states on table rows
- ✓ S4 C0: Professional color scheme (hover states)
- ✓ S5 C0: Professional form styling (hover states)

**Task: Add loading skeletons for dashboard data**
- ✓ S1 C0: Loading skeleton states for dynamic content
- ✓ S3 C0: Loading skeleton states for dynamic content
- ✓ S4 C0: Loading skeleton states for dynamic content

**Task: Implement search functionality (client-side filtering)**
- ✓ S1 C1: Search bar with AI-powered suggestions (static autocomplete)
- ✓ S1 C2: Search suggestions labeled "AI-powered"
- ✓ S3 C4: Filter bar (Tier, Status, Priority, SLA Risk)

**Task: Add responsive design for different screen sizes**
- ✓ S1 C0: Responsive layout
- ✓ S2 C0: Responsive layout
- ✓ S3 C0: Responsive layout
- ✓ S4 C0: Responsive layout
- ✓ S5 C0: Responsive layout
- ✓ S6 C0: Responsive layout

**Task: Test on different browsers**
- ✓ All screens: Cross-browser compatibility

### Phase 4 Tasks → Checklist Items

**Task: Record Video 1 - Tier 0 Chatbot Interaction**
- ✓ V1 C0: 1080p resolution, clear audio, Smooth transitions between screens, Professional voiceover or captions, Realistic typing and response delays
- ✓ V1 C1: Scenario (New trainee can't access lab), Shows AI understands PCTE context, Natural language understanding, Clarifying questions, Step-by-step guidance, KB article links
- ✓ V1 C2: User query → AI response grounded in KB, Retrieval Augmented Generation preventing hallucinations, Confidence score shown (92%), Source attribution visible (KB-2024-001), Multi-turn dialogue demonstrated

**Task: Record Video 2 - Ticket Enrichment in Action**
- ✓ V2 C0: 1080p resolution, clear audio, Real-time tagging visualization, Smooth data flow animations, Clear labeling of AI-generated elements
- ✓ V2 C1: Scenario (Incoming ticket auto-enriched), Real-time tagging (happens automatically), Sentiment detection (frustrated user flagged), KB recommendations (suggested automatically), Tier recommendation (routing decided by AI)
- ✓ V2 C2: Real-time classification (happens instantly), Sentiment detection with confidence score, Tier recommendation based on complexity + urgency, Escalation trigger (SLA risk detected), Multi-factor routing visible
- ✓ V2 C4: Staff doesn't manually classify, Staff doesn't search for solutions, Automation reduces manual triage time by 50%

**Task: Record Video 3 - Analytics Insights & Continuous Learning**
- ✓ V3 C0: 1080p resolution, clear audio, Animated charts and trend lines, Clear before/after comparison, Professional graphics
- ✓ V3 C1: Scenario (Predictive model forecasts spike), Spike prediction (40% increase forecasted), Root cause analysis (outdated KB article identified), Proactive action (KB article updated), Outcome (query volume drops 30%)
- ✓ V3 C2: ML model forecasting visible, Pattern recognition in action, Actionable insight generation, Feedback loop demonstrated
- ✓ V3 C4: System identifies KB gap and recommends action, Continuous learning and improvement, Outcome tracking (measures effectiveness), Enables proactive, not reactive, management
- ✓ V3 C5: Demonstrates Month 18 analytics capability, Shows continuous improvement over time

**Task: Edit videos (voiceover, transitions, timing)**
- ✓ V1 C0: Professional voiceover or captions, Realistic typing and response delays
- ✓ V2 C0: Smooth data flow animations, Clear labeling of AI-generated elements
- ✓ V3 C0: Animated charts and trend lines, Clear before/after comparison, Professional graphics

---

## Scoring Alignment Checklist

This section maps each screen and video to the 6 RFS evaluation criteria, with explicit design requirements to achieve excellence (5/5) on each criterion.

### Screen 1: Self-Service Portal
**Criterion 0 (Quality):** Professional, polished UI
- [ ] High-contrast PCTE branding (logo, colors)
- [ ] Smooth hover animations on buttons and cards
- [ ] Loading skeleton states for dynamic content

**Criterion 1 (Operational Relevancy):** Addresses "users struggle to find documentation"
- [ ] Search bar with AI-powered suggestions (static autocomplete)
- [ ] 4 quick links to common PCTE tasks (password reset, lab access, training portal, report issue)
- [ ] Recent articles carousel showing relevant KB content
- [ ] Chat button prominently displayed

**Criterion 2 (Technical):** Shows NLP capability
- [ ] Search suggestions labeled "AI-powered"
- [ ] Chat interface shows multi-turn dialogue capability
- [ ] Confidence scores visible (e.g., "92% match")

**Criterion 3 (Integration):** Shows Confluence + Mattermost integration
- [ ] KB articles sourced from Confluence (label visible)
- [ ] Chat interface styled to match Mattermost
- [ ] Links back to Confluence for full articles

**Criterion 5 (Schedule):** Phase 2 deliverable (Month 6)
- [ ] Label visible: "Tier 0 Chatbot - Available Month 6"
- [ ] Shows early value delivery

---

### Screen 2: System Architecture Diagram
**Criterion 0 (Quality):** Professional, clear diagram
- [ ] High-quality SVG or image (not hand-drawn)
- [ ] Clear labeling and color coding
- [ ] Professional layout with clear data flow

**Criterion 2 (Technical):** Shows sophisticated architecture
- [ ] NLP Engine component (processes natural language)
- [ ] RAG Layer (retrieves KB content)
- [ ] ML Classifier (categorizes tickets)
- [ ] Escalation Engine (routes to appropriate tier)
- [ ] Dashboard (monitoring and configuration)
- [ ] Data Flow arrows showing CPU-only inference
- [ ] Security controls embedded (encryption, audit logging)

**Criterion 3 (Integration):** Shows PCTE integration points
- [ ] Jira integration point labeled
- [ ] Confluence integration point labeled
- [ ] MKDocs integration point labeled
- [ ] Mattermost integration point labeled
- [ ] On-premises deployment architecture visible

---

### Screen 3: Help Desk Ticket Dashboard
**Criterion 0 (Quality):** Professional data visualization
- [ ] MUI DataGrid with realistic styling
- [ ] Color-coded priority indicators (red/orange/green)
- [ ] Smooth hover states on table rows
- [ ] Clear typography and spacing

**Criterion 1 (Operational Relevancy):** Shows workload reduction
- [ ] Auto-tags visible (Type, Urgency, Domain, Sentiment)
- [ ] Suggested KB articles with match percentages
- [ ] Recommended tier for routing
- [ ] Shows 54,000+ ticket reference

**Criterion 2 (Technical):** Shows ML classification in action
- [ ] Confidence scores on all tags (e.g., "92% confident: Technical")
- [ ] Sentiment detection visible (frustrated/neutral/satisfied)
- [ ] Source attribution for KB recommendations (e.g., "KB-2024-001")
- [ ] Color coding based on ML-determined priority

**Criterion 3 (Integration):** Shows Jira integration
- [ ] Tickets from Jira appear in dashboard
- [ ] AI enrichment fields added to Jira tickets
- [ ] Status updates flow back to Jira

**Criterion 4 (Operations):** Shows monitoring capability
- [ ] Filter bar (Tier, Status, Priority, SLA Risk)
- [ ] Real-time data visible
- [ ] Clear labeling of AI-generated vs. manual fields

---

### Screen 4: Executive Analytics Dashboard
**Criterion 0 (Quality):** Professional chart design
- [ ] Chart.js visualizations with smooth animations
- [ ] Professional color scheme
- [ ] Clear legends and axis labels
- [ ] Responsive layout

**Criterion 1 (Operational Relevancy):** Shows operational insights
- [ ] KPI cards: Tickets Resolved, SLA Compliance, Avg Resolution Time, AI Accuracy, Tier 0 Resolution, Escalation Rate
- [ ] Realistic PCTE metrics (54,000 tickets, 250-1,000 users)
- [ ] Trend chart showing ticket volume (last 30 days)
- [ ] Top issue categories heatmap
- [ ] Predictive alert: "35% increase forecasted before training event"

**Criterion 2 (Technical):** Shows data pipeline sophistication
- [ ] Real-time metrics labeled
- [ ] Trend analysis visible (historical data processed)
- [ ] Predictive forecast visible (ML model running)
- [ ] Anomaly detection highlighted

**Criterion 4 (Operations):** Shows proactive management
- [ ] Predictive insights enable proactive planning
- [ ] Anomaly detection highlighted
- [ ] Trend analysis identified
- [ ] Actionable recommendations visible

**Criterion 5 (Schedule):** Phase 4 deliverable (Month 18)
- [ ] Label visible: "Full Analytics - Available Month 18"
- [ ] Shows incremental value progression

---

### Screen 5: Configuration Interface
**Criterion 0 (Quality):** Professional, intuitive UI
- [ ] Clean tab interface
- [ ] Professional form styling
- [ ] Clear labeling and instructions

**Criterion 3 (Integration):** Shows PCTE integration
- [ ] "Sync MKDocs" button visible
- [ ] Markdown articles imported automatically
- [ ] Version control maintained
- [ ] SSO login visible (Red Hat SSO)
- [ ] Containerized deployment info (Docker/Kubernetes)

**Criterion 4 (Operations):** Shows non-technical management
- [ ] KB Management: Add/Edit/Delete article buttons (drag-and-drop visual)
- [ ] Escalation Rules: Visual rule builder (no coding required)
- [ ] Model Settings: Sliders for confidence threshold, sentiment sensitivity
- [ ] Retraining frequency dropdown
- [ ] Last retraining timestamp visible
- [ ] Audit logging visible
- [ ] Data retention policies configurable
- [ ] Privacy controls for sensitive data redaction
- [ ] Compliance reporting automated

**Criterion 5 (Schedule):** Phase 5 deliverable (Month 24)
- [ ] Label visible: "Production-Ready System - Available Month 24"
- [ ] Shows full capability delivery

---

### Screen 6: Escalation Workflow
**Criterion 0 (Quality):** Professional flowchart
- [ ] Clear visual hierarchy
- [ ] Professional styling and colors
- [ ] Easy to understand flow

**Criterion 2 (Technical):** Shows escalation logic
- [ ] Tier 0 (Self-Service) → 58% success rate
- [ ] Tier 1 (Basic Support) → 72% success rate
- [ ] Tier 2 (Advanced Support) → 85% success rate
- [ ] Tier 3 (Specialist) → 95% success rate
- [ ] Tier 4 (Vendor) option visible
- [ ] Context preservation at each escalation labeled
- [ ] Avg resolution times shown for each tier

**Criterion 3 (Integration):** Shows routing through PCTE tiers
- [ ] Integration points with each tier visible
- [ ] Escalation triggers clear

---

### Screen 7: System Integration Status
**Criterion 0 (Quality):** Professional integration dashboard
- [ ] Professional styling and colors consistent with PCTE theme
- [ ] Clear visual hierarchy with connector cards prominently displayed
- [ ] Responsive layout for different screen sizes
- [ ] Smooth hover effects on connector cards

**Criterion 3 (Integration):** Shows COTS connector integration
- [ ] Jira Service Management connector card with logo, status indicator, sync metrics
- [ ] Confluence connector card with logo, status indicator, sync metrics
- [ ] MKDocs connector card with logo, status indicator, sync metrics
- [ ] Mattermost connector card with logo, status indicator, real-time connection info
- [ ] Connected/Disconnected/Warning status badges (color-coded: green/red/orange)
- [ ] Last sync timestamps visible for each connector
- [ ] Sync count metrics (tickets/articles synced) displayed
- [ ] Webhook activity log table with columns: Timestamp, Event Type, Source System, Destination, Status, Response Code, Latency
- [ ] Sample webhook events showing integration activity (last 24 hours)
- [ ] Real-time activity feed visualization
- [ ] Data flow metrics KPI cards (total records synced, sync success rate, avg latency)
- [ ] Integration performance indicators (throughput, queue depth, webhook latency)

**Criterion 4 (Operations):** Shows integration monitoring and troubleshooting
- [ ] Connector health monitoring visible through status indicators
- [ ] Webhook delivery tracking with success/failure status
- [ ] Performance metrics enable proactive management (latency, throughput)
- [ ] Integration troubleshooting capability (failed sync indicators, retry buttons)
- [ ] Filter options for webhook activity log (by source, status, event type, time range)
- [ ] Refresh button for manual data update
- [ ] Auto-refresh indicator showing real-time updates
- [ ] Expandable connector cards showing detailed metrics

---

### Screen 8: Model Versioning & Continuous Learning
**Criterion 0 (Quality):** Professional model management interface
- [ ] Professional styling and colors consistent with PCTE theme
- [ ] Clear visual hierarchy with current version prominently displayed
- [ ] Responsive layout for different screen sizes
- [ ] Smooth animations on timeline and charts

**Criterion 4 (Operations):** Shows continuous learning and model management
- [ ] Current model status card showing version, release date, performance metrics
- [ ] Model version timeline (horizontal visual) with current and previous versions
- [ ] Current version highlighted (v2.3.1)
- [ ] Previous versions visible (v2.3.0, v2.2.5, v2.2.0, v2.1.0)
- [ ] Retraining events table showing: Date, Version, Data Incorporated, Training Duration, Metrics Improvement, Status
- [ ] Sample retraining events (last 6 months) with realistic data
- [ ] Color coding for status (Active, Rolled back, Archived)
- [ ] Expandable rows showing detailed data breakdown for each retraining event
- [ ] Data incorporation sources breakdown cards:
  - Historical tickets (54,000+)
  - User feedback (1,200+ ratings)
  - KB updates (892 articles)
  - Support staff corrections (340 manual tags)
- [ ] Rollback capability with "Rollback to Previous Version" button
- [ ] Rollback history table showing date, version transition, reason
- [ ] Next retraining schedule visible
- [ ] Retraining configuration showing frequency, last retraining, next retraining, trigger conditions
- [ ] Model performance chart showing accuracy improvement over time
- [ ] Multiple metrics lines (overall, classification, sentiment accuracy)

**RFS Requirement 11 (Continuous Machine Learning Model):** Shows continuous learning capability
- [ ] Continuous learning demonstrated through retraining history (last 6 months)
- [ ] Weekly retraining frequency visible and configurable
- [ ] Model improvement metrics shown (accuracy improvements per version)
- [ ] Feedback loop integration visible (user ratings, staff corrections)
- [ ] Data incorporation timeline showing sources of learning data
- [ ] "Forget" obsolete information capability demonstrated (deprecated features, outdated KB articles)
- [ ] Historical tickets (54,000+) referenced as training data source
- [ ] KB updates incorporation shown in retraining events
- [ ] Support staff corrections shown as feedback input

---

### Screen 9: Security & Compliance Dashboard
**Criterion 0 (Quality):** Professional security dashboard
- [ ] Professional styling and colors consistent with PCTE theme
- [ ] Clear visual hierarchy with compliance status prominently displayed
- [ ] Responsive layout for different screen sizes
- [ ] Security-focused color scheme (green for compliant, red for alerts)

**Criterion 4 (Operations):** Shows security monitoring and compliance management
- [ ] Security overview KPI cards (4 cards):
  - Active Users: "247" with trend indicator
  - Failed Login Attempts (24h): "3" with alert threshold
  - Audit Events (24h): "1,247" with breakdown by type
  - CUI Compliance Status: "✓ Compliant" (green checkmark)
- [ ] Audit log table with columns: Timestamp, User, Action, Resource, IP Address, Status, Details
- [ ] Sample audit events (last 24 hours) showing various action types
- [ ] Filterable audit log by: User, Action Type, Resource, Status, Date Range
- [ ] Search functionality for audit log
- [ ] Export button for audit log ("Export Audit Log")
- [ ] Access control (RBAC) section with:
  - Roles table (Admin, Help Desk Staff, User, Viewer)
  - Permissions matrix grid (Role × Permission)
  - User assignments by role
  - Expandable rows showing detailed permissions
- [ ] Data protection card showing:
  - Encryption status (AES-256 at rest, TLS 1.3 in transit)
  - Data retention policies (configurable)
  - Privacy controls (PII redaction, sensitive data masking)
- [ ] Compliance indicators grid showing:
  - CUI Compliance status with audit dates
  - NIST 800-171 implementation status (110/110 controls)
  - ISO 27001 certification status with certificate number
  - FedRAMP readiness status with assessment level
- [ ] User activity tracking visible in audit log
- [ ] Security alert notifications (failed login spikes, unusual patterns)
- [ ] Compliance reports section with "Generate Compliance Report" button
- [ ] Report history table

**RFS Requirement 12 (Data Assurance and Security):** Shows CUI-compliant security controls
- [ ] CUI compliance status clearly visible with green checkmark
- [ ] NIST 800-171 implementation status shown (110/110 controls, 100% compliance)
- [ ] ISO 27001 compliance status shown with certificate number and expiry
- [ ] FedRAMP readiness status shown with assessment level and date
- [ ] Audit logging capability demonstrated with comprehensive event tracking
- [ ] RBAC controls visible with permissions matrix
- [ ] Encryption status displayed (AES-256 at rest, TLS 1.3 in transit)
- [ ] Key rotation information shown
- [ ] Data retention policies configurable and visible
- [ ] Privacy controls clearly shown (PII redaction enabled, sensitive data masking enabled)
- [ ] Data minimization policy visible
- [ ] GDPR compliance indicator shown
- [ ] Security controls documentation capability (compliance report generation)

---

### Video 1: Tier 0 Chatbot Interaction (2 minutes)
**Criterion 0 (Quality):** Professional video production
- [ ] 1080p resolution, clear audio
- [ ] Smooth transitions between screens
- [ ] Professional voiceover or captions
- [ ] Realistic typing and response delays

**Criterion 1 (Operational Relevancy):** Realistic PCTE scenario
- [ ] Scenario: New trainee can't access lab
- [ ] Shows AI understands PCTE-specific context
- [ ] Natural language understanding (user asks in plain English)
- [ ] Clarifying questions (AI asks about training module)
- [ ] Step-by-step guidance (clear instructions for resolution)
- [ ] KB article links (points to authoritative documentation)

**Criterion 2 (Technical):** Shows NLP + RAG in action
- [ ] User query → AI response grounded in KB
- [ ] Retrieval Augmented Generation preventing hallucinations
- [ ] Confidence score shown (92%)
- [ ] Source attribution visible (KB-2024-001)
- [ ] Multi-turn dialogue capability demonstrated

---

### Video 2: Ticket Enrichment in Action (2 minutes)
**Criterion 0 (Quality):** Professional video production
- [ ] 1080p resolution, clear audio
- [ ] Real-time tagging visualization
- [ ] Smooth data flow animations
- [ ] Clear labeling of AI-generated elements

**Criterion 1 (Operational Relevancy):** Shows automation reduces staff effort
- [ ] Scenario: Incoming ticket auto-enriched with AI analysis
- [ ] Real-time tagging (happens automatically)
- [ ] Sentiment detection (frustrated user flagged)
- [ ] KB recommendations (solutions suggested automatically)
- [ ] Tier recommendation (routing decided by AI)

**Criterion 2 (Technical):** Shows ML + escalation logic
- [ ] Real-time classification (happens instantly)
- [ ] Sentiment detection with confidence score
- [ ] Tier recommendation based on complexity + urgency
- [ ] Escalation trigger (SLA risk detected)
- [ ] Multi-factor routing visible

**Criterion 4 (Operations):** Shows workload reduction
- [ ] Staff doesn't manually classify
- [ ] Staff doesn't search for solutions
- [ ] Automation reduces manual triage time by 50%

---

### Video 3: Analytics Insights & Continuous Learning (1.5 minutes)
**Criterion 0 (Quality):** Professional video production
- [ ] 1080p resolution, clear audio
- [ ] Animated charts and trend lines
- [ ] Clear before/after comparison
- [ ] Professional graphics

**Criterion 1 (Operational Relevancy):** Shows proactive vs. reactive support
- [ ] Scenario: Predictive model forecasts spike before training event
- [ ] Spike prediction (40% increase forecasted)
- [ ] Root cause analysis (outdated KB article identified)
- [ ] Proactive action (KB article updated)
- [ ] Outcome (query volume drops 30%)

**Criterion 2 (Technical):** Shows continuous learning
- [ ] ML model forecasting visible
- [ ] Pattern recognition in action
- [ ] Actionable insight generation
- [ ] Feedback loop demonstrated

**Criterion 4 (Operations):** Shows continuous improvement
- [ ] System identifies KB gap and recommends action
- [ ] Continuous learning and improvement
- [ ] Outcome tracking (measures effectiveness)
- [ ] Enables proactive, not reactive, management

**Criterion 5 (Schedule):** Shows phased delivery value
- [ ] Demonstrates Month 18 analytics capability
- [ ] Shows continuous improvement over time

---

### Video 4: Integration & Operations Overview (2 minutes)
**Criterion 0 (Quality):** Professional video production
- [ ] 1080p resolution, clear audio
- [ ] Screen transitions between Screens 7, 8, 9
- [ ] Professional graphics and animations
- [ ] Clear labeling of system components

**Criterion 3 (Integration):** Shows COTS connector integration
- [ ] Screen 7: Connector status panels (Jira, Confluence, MKDocs, Mattermost)
- [ ] COTS logos visible with status indicators
- [ ] Webhook activity log showing API call history
- [ ] Data flow metrics (sync success rate, latency)
- [ ] Integration points clearly labeled

**Criterion 4 (Operations):** Shows operational capabilities
- [ ] Screen 8: Model version timeline and retraining history
- [ ] Data incorporation sources visible
- [ ] Rollback capability demonstrated
- [ ] Screen 9: Security KPI cards and audit log
- [ ] RBAC settings and compliance indicators visible

**Criterion 12 (Data Assurance and Security):** Shows security controls
- [ ] Audit log with filterable events
- [ ] Access control (RBAC) settings
- [ ] Encryption status (AES-256, TLS 1.3)
- [ ] Compliance indicators (CUI, NIST 800-171, ISO 27001, FedRAMP)
- [ ] Data retention and privacy controls

---



### Screen 1: Self-Service Portal Homepage
**Purpose:** Show Tier 0 self-service capabilities

**Components:**
- Header with PCTE logo, user profile, help/logout
- Search bar with AI-powered suggestions (static autocomplete)
- 4 quick links (Password Reset, Lab Access, Training Portal, Report Issue)
- Large chat button ("Chat with AI Assistant")
- Recent articles carousel (3-5 articles)
- Footer with contact info

**Data:** Static KB articles, no backend calls

### Screen 2: System Architecture Diagram
**Purpose:** Show technical architecture

**Components:**
- Diagram showing:
  - User Interfaces (Self-Service, Help Desk, Admin)
  - AI Processing Pipeline (NLP, RAG, ML Classifier)
  - Escalation Engine & Logging
  - PCTE Integration Points (Jira, Confluence, MKDocs, Mattermost)
  - Data Flow & Security Controls
- Can be SVG or high-quality image

**Data:** Static diagram, no interactivity needed

### Screen 3: Help Desk Ticket Dashboard
**Purpose:** Show AI-enriched tickets and staff interface

**Components:**
- Filter bar (Tier, Status, Priority, SLA Risk)
- MUI DataGrid with ticket list:
  - ID, Subject, Tags (auto-generated), Tier, SLA
  - Color-coded priority (red/orange/green)
- Ticket details panel:
  - Subject, User, Role
  - Sentiment indicator (frustrated/neutral/satisfied)
  - AI Analysis (Type, Urgency, Recommended Tier)
  - Suggested KB Articles with match %
  - Action buttons (Resolve, Escalate, Add Notes)

**Data:** 
- 20-30 sample tickets with realistic data
- Realistic tags (Access, Account, Network, Technical, etc.)
- Sentiment scores (92% confident, etc.)
- KB article recommendations with match percentages

### Screen 4: Executive Analytics Dashboard
**Purpose:** Show operational insights and predictive analytics

**Components:**
- KPI cards (6 total):
  - Tickets Resolved (1,247, ↑12% vs month)
  - SLA Compliance (94.2%, ↑3% vs month)
  - Avg Resolution Time (2.3h, ↓8% vs month)
  - AI Accuracy (91.3%, ↑2% vs month)
  - Tier 0 Resolution (58%, ↑5% vs month)
  - Escalation Rate (12%, ↓2% vs month)
- Line chart: Ticket volume trend (last 30 days)
- Horizontal bar chart: Top issue categories
- Predictive alert: "35% increase forecasted before training event"
- System Performance Indicators:
  - Dashboard load time: 1.2 seconds
  - Data refresh interval: 5 minutes
  - Active concurrent users: 247 / 1,000 capacity (24.7%)
  - System uptime: 99.8%

**Data:**
- Realistic PCTE metrics (54,000 tickets, 250-1,000 users)
- Sample trend data
- Predictive forecast example
- Performance metrics showing system capacity utilization

### Screen 5: Configuration Interface
**Purpose:** Show non-technical management capabilities

**Components:**
- Tabs: Knowledge Base, Escalation Rules, Model Settings
- KB Management:
  - Add/Edit/Delete article buttons
  - Article list with status (Live, Old, Archive)
- Escalation Rules:
  - Visual rule builder (no coding)
  - Sample rules displayed
- Model Settings:
  - Sliders for confidence threshold, sentiment sensitivity
  - Retraining frequency dropdown
  - Last retraining timestamp

**Data:** Static configuration examples

### Screen 6: Escalation Workflow
**Purpose:** Show ticket routing through support tiers

**Components:**
- Flowchart showing:
  - Tier 0 (Self-Service) → 58% success
  - Tier 1 (Basic Support) → 72% success
  - Tier 2 (Advanced Support) → 85% success
  - Tier 3 (Specialist) → 95% success
  - Tier 4 (Vendor)
- Context preservation at each escalation
- Success rates and avg resolution times

**Data:** Static flowchart with realistic metrics

### Screen 7: System Integration Status
**Purpose:** Show COTS connector status and webhook activity

**Evaluation Criteria Addressed:**
- **Criterion 3 (Integration):** Demonstrates out-of-the-box COTS connectors, standardized APIs/webhooks, integration feasibility
- **Criterion 4 (Operations):** Shows integration monitoring and troubleshooting capabilities

**Components:**
- **Header Section:**
  - Title: "System Integration Status"
  - Subtitle: "Monitor COTS connector health and webhook activity"
  - Real-time indicator chip (optional)
  
- **Connector Status Panel (Grid Layout - 4 cards):**
  - **Jira Service Management Card:**
    - Logo (Jira icon or placeholder)
    - Status badge: "Connected" (green) / "Disconnected" (red) / "Warning" (orange)
    - Last sync: "2 min ago" with timestamp
    - Sync count: "1,247 tickets synced"
    - Sync throughput: "847 records/hour"
    - Action buttons: "Sync Now", "View Details"
  - **Confluence Card:**
    - Logo (Confluence icon or placeholder)
    - Status badge: "Connected"
    - Last sync: "5 min ago"
    - Sync count: "892 articles synced"
    - Sync throughput: "156 records/hour"
  - **MKDocs Card:**
    - Logo (MKDocs icon or placeholder)
    - Status badge: "Connected"
    - Last sync: "1 hour ago"
    - Sync count: "156 articles synced"
    - Auto-sync indicator
  - **Mattermost Card:**
    - Logo (Mattermost icon or placeholder)
    - Status badge: "Connected"
    - Last sync: "Real-time"
    - Message count: "3,421 messages processed"
    - Connection type: "WebSocket"

- **Data Flow Metrics (KPI Cards):**
  - Total records synced: "54,000+ tickets"
  - Sync success rate: "99.8%" with trend indicator
  - Average sync latency: "2.3 seconds"
  - Webhook delivery success rate: "99.8%"
  - Average webhook latency: "340ms"
  - Queue depth: "12 pending events"

- **Webhook Activity Log (Table):**
  - Columns: Timestamp, Event Type, Source System, Destination, Status, Response Code, Latency
  - Sample events (last 24 hours):
    - "Ticket Created" (Jira → Help Desk) - Success (200) - 280ms
    - "KB Updated" (Confluence → RAG) - Success (200) - 420ms
    - "User Message" (Mattermost → Chatbot) - Success (202) - 150ms
    - "Sync Failed" (MKDocs → KB) - Failed (503) - Retry scheduled
  - Color coding: Green for success, Red for failures, Orange for warnings
  - Filter options: By source, status, event type, time range
  - Refresh button
  - Auto-refresh indicator

- **Integration Performance Chart (Optional):**
  - Line chart showing webhook latency over time (last 24 hours)
  - Bar chart showing sync volume by connector

**Data Files Needed:**
- `src/data/mockConnectors.js` - Connector status, sync metrics, configuration
- `src/data/mockWebhooks.js` - Webhook activity logs, API call history

**Key Features:**
- Real-time status indicators (with auto-refresh simulation)
- Color-coded status badges (green/red/orange)
- Expandable connector cards with detailed metrics
- Filterable webhook activity log
- Performance visualization charts

**RFS Requirements Covered:**
- Out-of-the-box COTS connectors (Jira, Confluence, MKDocs, Mattermost)
- Standardized APIs/webhooks demonstration
- Integration monitoring and troubleshooting

### Screen 8: Model Versioning & Continuous Learning
**Purpose:** Show model retraining history and continuous improvement

**Evaluation Criteria Addressed:**
- **Criterion 4 (Operations):** Demonstrates continuous learning and model management capabilities
- **RFS Requirement 11:** Continuous Machine Learning Model with retraining from tickets, KB updates, and feedback loops

**Components:**
- **Header Section:**
  - Title: "Model Versioning & Continuous Learning"
  - Subtitle: "Track model improvements and retraining history"
  - Current version badge: "v2.3.1" (highlighted)

- **Current Model Status Card:**
  - Current version: "v2.3.1"
  - Release date: "October 15, 2025"
  - Model performance metrics:
    - Overall accuracy: "91.3%" (+2.1% from previous)
    - Classification accuracy: "94.2%"
    - Sentiment detection accuracy: "88.7%"
    - Response relevance: "92.5%"
  - Status: "Active" (green badge)
  - Next retraining scheduled: "January 22, 2025"

- **Model Version Timeline (Visual Timeline Component):**
  - Horizontal timeline showing versions
  - Current version highlighted
  - Previous versions: v2.3.0, v2.2.5, v2.2.0, v2.1.0
  - Click to view details of each version
  - Rollback button for each previous version

- **Retraining Events Table (Last 6 months):**
  - Columns: Date, Version, Data Incorporated, Training Duration, Metrics Improvement, Status
  - Sample events:
    - Oct 15, 2025: v2.3.1 - 500 new tickets, 50 KB articles → Accuracy +2.1%, Status: Active
    - Sep 28, 2025: v2.3.0 - 1,200 new tickets, 120 KB articles → Accuracy +1.8%, Status: Rolled back
    - Sep 10, 2025: v2.2.5 - 800 new tickets, 80 KB articles → Accuracy +1.5%, Status: Archived
    - Aug 15, 2025: v2.2.0 - 600 new tickets, 60 KB articles → Accuracy +1.2%, Status: Archived
  - Color coding for status (Active, Rolled back, Archived)
  - Expandable rows showing detailed data breakdown

- **Data Incorporation Sources (Breakdown Cards):**
  - Historical tickets: "54,000+ tickets analyzed"
  - User feedback: "1,200+ ratings incorporated"
  - KB updates: "892 articles indexed"
  - Support staff corrections: "340 manual tags reviewed"
  - Failed query patterns: "156 patterns identified"

- **Model Performance Chart:**
  - Line chart showing accuracy improvement over time
  - Multiple metrics lines (overall, classification, sentiment)
  - Data points for each retraining event

- **Retraining Configuration:**
  - Frequency: "Weekly" (with dropdown to change)
  - Last retraining: "January 8, 2025 03:00"
  - Next retraining: "January 15, 2025 03:00"
  - Trigger conditions: "500 new tickets OR 50 KB updates"

- **Rollback Capability:**
  - "Rollback to Previous Version" button
  - Rollback history table showing:
    - Date rolled back
    - From version → To version
    - Reason for rollback
    - Example: "Dec 5, 2024 - v2.3.0 → v2.2.5 (Accuracy drop detected)"

- **"Forget" Obsolete Information:**
  - Section showing deprecated features/tickets being phased out
  - List of outdated KB articles removed from training
  - Example: "Legacy VPN setup instructions removed (deprecated feature)"

**Data Files Needed:**
- `src/data/mockModelVersions.js` - Version history, retraining events, performance metrics
- `src/data/mockFeedback.js` - User feedback data, ratings

**Key Features:**
- Interactive version timeline
- Expandable retraining event details
- Visual performance improvement charts
- Rollback functionality demonstration
- Obsolete information tracking

**RFS Requirements Covered:**
- Continuous retraining from new and historical tickets
- KB updates incorporation
- Feedback loops for AI improvement
- Model versioning and rollback capability
- "Forget" obsolete information capability

### Screen 9: Security & Compliance Dashboard
**Purpose:** Show security controls, audit logs, and CUI compliance

**Evaluation Criteria Addressed:**
- **Criterion 4 (Operations):** Demonstrates security monitoring and compliance management
- **RFS Requirement 12:** Data Assurance and Security in CUI-compliant environment

**Components:**
- **Header Section:**
  - Title: "Security & Compliance Dashboard"
  - Subtitle: "Monitor security controls and compliance status"
  - Overall compliance badge: "✓ Compliant" (green)

- **Security Overview (KPI Cards - 4 cards):**
  - Active Users: "247" (with trend indicator)
  - Failed Login Attempts (24h): "3" (with alert if > threshold)
  - Audit Events (24h): "1,247" (with breakdown by type)
  - CUI Compliance Status: "✓ Compliant" (green checkmark)

- **Audit Log Table (Filterable):**
  - Columns: Timestamp, User, Action, Resource, IP Address, Status, Details
  - Sample events (last 24 hours):
    - "User login" - Adam Admin - Success - IP: 192.168.1.45
    - "Ticket viewed" - Alex Analyst - JIRA-5421 - Success
    - "KB article accessed" - User123 - KB-2024-001 - Success
    - "Configuration changed" - Adam Admin - Escalation Rule rule-002 - Success
    - "Failed login attempt" - Unknown - Failed - IP: 192.168.1.99 (3 attempts)
    - "Report exported" - Alex Analyst - Analytics Report - Success
    - "RBAC permission modified" - Adam Admin - User role change - Success
  - Filters: User, Action Type, Resource, Status, Date Range
  - Export button: "Export Audit Log"
  - Search functionality

- **Access Control (RBAC) Section:**
  - **Roles Table:**
    - Columns: Role, Users Count, Permissions Summary
    - Roles: Admin, Help Desk Staff, User, Viewer
    - Expandable rows showing detailed permissions
  - **Permissions Matrix:**
    - Grid showing Role × Permission
    - Permissions: View Tickets, Edit Tickets, Manage KB, Configure System, View Analytics, Export Reports, Manage Users
    - Checkmarks for allowed permissions
  - **User Assignments:**
    - List of users by role
    - "Manage Roles" button
    - Add/Remove user from role functionality (mock)

- **Data Protection Card:**
  - **Encryption Status:**
    - At Rest: "✓ AES-256" (green checkmark)
    - In Transit: "✓ TLS 1.3" (green checkmark)
    - Key Rotation: "Last rotated: Jan 1, 2025"
  - **Data Retention Policies:**
    - Audit logs: "90 days" (configurable)
    - Tickets: "2 years" (configurable)
    - User sessions: "30 days"
    - KB articles: "Permanent"
  - **Privacy Controls:**
    - PII Redaction: "✓ Enabled"
    - Sensitive Data Masking: "✓ Enabled"
    - Data Minimization: "✓ Enabled"
    - GDPR Compliance: "✓ Compliant"

- **Compliance Indicators (Grid Layout):**
  - **CUI Compliance:**
    - Status: "✓ Compliant"
    - Last audit: "Nov 15, 2024"
    - Next audit: "May 15, 2025"
  - **NIST 800-171:**
    - Status: "✓ Implemented"
    - Controls: "110/110 implemented"
    - Compliance score: "100%"
  - **ISO 27001:**
    - Status: "✓ Certified"
    - Certificate number: "ISO-27001-2024-001"
    - Expiry: "Dec 31, 2026"
  - **FedRAMP:**
    - Status: "✓ Ready"
    - Assessment level: "Moderate"
    - Assessment date: "Oct 10, 2024"

- **Security Alerts (If any):**
  - Alert card for failed login attempts spike
  - Alert card for unusual access patterns
  - Alert card for compliance deadline approaching

- **Compliance Reports Section:**
  - "Generate Compliance Report" button
  - Available reports: NIST 800-171, ISO 27001, FedRAMP, Custom
  - Report history table

**Data Files Needed:**
- `src/data/mockAuditLogs.js` - Audit log entries, user actions, security events (enhanced from Screen 5)
- `src/data/mockSecurity.js` - Security settings, compliance status, RBAC configuration

**Key Features:**
- Real-time security KPIs
- Filterable and searchable audit log
- Interactive RBAC permissions matrix
- Compliance status indicators with certificates
- Security alert notifications
- Compliance report generation

**RFS Requirements Covered:**
- CUI compliance demonstration
- NIST 800-171, ISO 27001, FedRAMP compliance
- Audit logging capability
- RBAC implementation
- Encryption (AES-256, TLS 1.3)
- Data retention policies
- Privacy controls (PII redaction, data masking)
- Security controls documentation

**Overlap Notes:**
- Audit logs also appear in Screen 5 (Configuration Interface), but Screen 9 provides comprehensive security-focused view with filtering and compliance tracking
- RBAC settings may overlap with Screen 5, but Screen 9 emphasizes security and compliance context
- Data retention policies shown in both Screen 5 and Screen 9, but Screen 9 ties to compliance requirements

---

## Design Guidelines

### Color Palette
- **Primary:** PCTE Blue (#0052CC)
- **Success:** Green (#28A745)
- **Warning:** Orange (#FFC107)
- **Error:** Red (#DC3545)
- **Neutral:** Gray (#6C757D)

### Typography
- **Headers:** Bold, 18-24pt
- **Body:** Regular, 12-14pt
- **Labels:** Semi-bold, 11-12pt

### Spacing
- Consistent 16px grid
- 8px padding for compact elements
- 16px padding for standard elements
- 24px padding for large sections

### Accessibility
- WCAG AA contrast ratios minimum
- Clear focus states for keyboard navigation
- Alt text for all images
- Semantic HTML structure

---

## Development Checklist

### Setup
- [ ] Create Vite + React project
- [ ] Install dependencies (MUI, Router, Chart.js)
- [ ] Create PCTE theme
- [ ] Set up project structure

### Components
- [ ] Layout (header, nav, footer)
- [ ] Screen 1: Self-Service Portal
- [ ] Screen 2: Architecture Diagram
- [ ] Screen 3: Ticket Dashboard
- [ ] Screen 4: Analytics Dashboard
- [ ] Screen 5: Configuration Interface
- [ ] Screen 6: Escalation Workflow
- [ ] Screen 7: System Integration Status
- [ ] Screen 8: Model Versioning & Continuous Learning
- [ ] Screen 9: Security & Compliance Dashboard

### Data
- [ ] Mock tickets (realistic PCTE data)
- [ ] Mock analytics (KPIs, trends)
- [ ] Mock KB articles
- [ ] Mock configuration examples
- [ ] Mock connector status (Jira, Confluence, MKDocs, Mattermost)
- [ ] Mock model versions and retraining history
- [ ] Mock audit logs and compliance status

### Polish
- [ ] Animations and transitions
- [ ] Hover states and interactions
- [ ] Responsive design
- [ ] Browser testing
- [ ] Performance optimization

### Deployment
- [ ] Deploy to Netlify/Vercel
- [ ] Test deployment
- [ ] Create backup files
- [ ] Document deployment steps

### Videos
- [ ] Record Video 1 (Tier 0 Chatbot)
- [ ] Record Video 2 (Ticket Enrichment)
- [ ] Record Video 3 (Analytics Insights)
- [ ] Edit videos (voiceover, transitions)
- [ ] Create MP4 backup copies

---

## Key Principles

1. **Static Only** - No backend, no real data, no authentication
2. **Simple** - Use MUI defaults, don't over-customize
3. **Professional** - Smooth animations, polished UI
4. **Realistic** - Use actual PCTE metrics and scenarios
5. **Comprehensive** - 9 screens covering all RFS requirements
6. **Security-Focused** - Explicit demonstration of security, compliance, and audit controls
7. **Integration-Visible** - COTS logos and connector status prominently displayed
8. **Video-Ready** - Designed for high-quality screen recordings

---

## Estimated Timeline

- **Phase 1:** 2-3 days (setup + core layout)
- **Phase 2:** 2-3 days (all 6 screens)
- **Phase 3:** 1-2 days (polish + interactions)
- **Phase 4:** 1 day (videos + deployment)

**Total:** 6-9 days for complete demo

---

## Success Criteria

✓ App loads and runs smoothly  
✓ All 6 screens accessible via navigation  
✓ Realistic data displayed on all screens  
✓ Smooth animations and transitions  
✓ Professional appearance impresses evaluators  
✓ High-quality demo videos recorded  
✓ Deployed and accessible via URL  
✓ Works well on MS Teams screen share
