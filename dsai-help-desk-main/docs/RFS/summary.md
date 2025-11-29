# Summary: AI-Enabled Help Desk RFS for PCTE

## Overview
Request for Solutions (RFS) for developing an automated, AI-enabled Help Desk for the Persistent Cyber Training Environment (PCTE). Part of Cyber Innovation Challenge (CIC) #5 Assessment Event.

**Submission Deadline:** 26 September 2025, 11:59 PM ET  
**Eligibility:** U.S. Citizens Only

## PCTE Platform
DoD cyber training platform providing secure, configurable virtual environments for Cyberspace Workforce and Allied partners across all classification levels. Operates on geographically dispersed data centers with COTS software and bespoke hardware.

**Architecture:**
- **Control Plane (CP):** Security-hardened applications (training portal, Help Desk ticketing, chat, monitoring)
- **Event Plane (EP):** Unaccredited cluster for dynamic cyber training ranges with total flexibility

**Current Tools:**
- Atlassian Confluence (wiki/documentation)
- Jira Service Management (54,000+ historical tickets)
- MKDocs (user documentation)
- Mattermost Chat

**Key Technologies:** VMware TKG, Red Hat IDM/SSO, VMware vSphere, VMware NSX-T, F5 firewalls

## Problem Statement
Current Help Desk system is manually intensive with limited personnel capacity. Users struggle to locate relevant documentation and troubleshooting resources, increasing resolution time and user frustration.

## Solution Requirements

### Core Requirements
1. **AI-Enabled Help Desk:** Mature AI/ML integration tailored to PCTE
2. **Self-Service Assistant:** AI chatbot for Tier 0 support
3. **Natural Language Processing:** Conversational prompting with contextual understanding
4. **Tiered Support:** Auto-classification and routing to appropriate tier (0-4)
5. **Escalation Logic:** Precision escalation based on severity, SLA, context, mission criticality
6. **Accuracy Controls:** Prevent hallucinations, ensure PCTE-relevant responses
7. **Ticket Enrichment:** Context-relevant tags, KB article links
8. **Knowledge Base:** AI-augmented interactive self-service portal
9. **Management Dashboard:** Configuration, monitoring, performance tracking
10. **Analytics:** Trend analysis, predictive insights, metric reporting
11. **Continuous Learning:** Retraining from tickets, KB updates, feedback loops
12. **Data Security:** CUI-compliant environment with security controls

### Integration Requirements
- Integration with PCTE enterprise and existing ITSM/CRM tools (ServiceNow, Jira)
- Data ingestion capabilities
- Agile scrum integration with iterative delivery
- Work with other companies under Stakeholder oversight

### Operations Requirements
- Available within Help Desk interface
- User-friendly UI/UX
- Configurable without detailed technical knowledge
- Scalable to 250-1,000 simultaneous users

## Constraints
- Closed restricted network (no commercial cloud connectivity)
- NIST, ISO 27001, FedRAMP compliance
- No dedicated AI/ML GPUs in current infrastructure

## Support Tiers
- **Tier 0:** Self-service via knowledge base, FAQs, chatbot
- **Tier 1:** Password resets, onboarding, simple troubleshooting
- **Tier 2:** Technical fixes, network issues, complex software failovers
- **Tier 3:** Specialist support, in-depth debugging
- **Tier 4:** Vendor/escalation support

## Deliverables
1. Incremental functional prototype
2. Documentation (user manual, installation/configuration guides, API/architectural docs)
3. Detailed report on AI algorithms and ML methodology (RAG, Vector Search, etc.)
4. Periodic demonstrations
5. Security controls documentation for RMF compliance
6. Software licensing cost estimate
7. Data rights and lifecycle sustainment terms

## Assessment Criteria
Scored 0-5 (Excellent to Unsatisfactory):
- General submission quality
- Operational relevancy
- Technical approach
- Development and integration
- Operations and maintenance
- Schedule and price

## Timeline
- **Phase 1:** 04 June 2025 - Collaboration event (completed)
- **Phase 2:** 18 August - 26 September 2025 - Submission window/Q&A
- **Phase 3:** 29 September - 14 October 2025 - Review and downselect
- **Phase 4:** 03 November - 06 November 2025 - Virtual demonstrations
- **Phase 5:** Selection, award, and execution

## Submission Details
- Maximum 8-page white paper via Vulcan portal
- Q&A form open until 08 September 2025, 3:00 PM ET
- Responses distributed by 12 September 2025
- Virtual demonstrations via MS Teams (1-hour timeslots)

## Contact
Brandon Sizemore: bsizemore@cyberfic.org  
Amanda Green: agreen@cyberfic.org

## Additional Information
- Website: http://www.cyberfic.org/events/pcteaihelpdeskae
- Vulcan info: https://www.cyberfic.org/joinvulcan
- Teaming form deadline: 29 August 2025, 5:00 PM ET

## Analysis and Technical Considerations

### Data Volume Assessment
**Known quantities:**
- 54,000+ historical support tickets in Jira Service Management
- Export formats: RSS, CSV, HTML, XML, or API access
- Multiple documentation sources (Confluence, MKDocs, Mattermost chat logs)
- Note: Confluence contains outdated content requiring curation

**Scale requirements:**
- 250-1,000 simultaneous users/requests

### Technical Approach
**This is a classic RAG (Retrieval Augmented Generation) use case** with the following characteristics:

**Explicitly mentioned technologies:**
- Retrieval Augmenting Generation (RAG)
- Natural Language Processing (NLP)
- Agentic AI
- Machine Learning
- Vector Search
- Conventional indexed search

**RAG implementation requirements:**
- Knowledge base ingestion from multiple sources (Confluence, MKDocs, Jira tickets)
- Retrieval of relevant context before response generation
- Hallucination prevention controls
- Continuous learning from new tickets and KB updates
- Ability to "forget" obsolete information for deprecated platform capabilities
- Data ingestion pipeline for heterogeneous sources

**Hybrid approach needed:**
- RAG for knowledge retrieval and response generation
- ML for ticket classification, trend analysis, and routing logic
- Agentic AI for multi-step problem resolution

### Key Implementation Challenges
1. **Data curation:** Filtering outdated Confluence content from current documentation
2. **Multi-source ingestion:** Combining structured (Jira) and unstructured (Confluence, chat) data
3. **Air-gapped deployment:** No commercial cloud connectivity, must run on-premises
4. **No GPU resources:** Current infrastructure lacks dedicated AI/ML GPUs (may be adjusted)
5. **Security compliance:** CUI-compliant environment with RMF controls
6. **Continuous learning:** Balancing model updates with stability and accuracy
