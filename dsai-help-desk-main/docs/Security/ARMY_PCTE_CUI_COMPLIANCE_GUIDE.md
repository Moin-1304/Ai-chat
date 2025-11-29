# CUI Compliance for Army PCTE Demo: CTO Technical Briefing

As CTO demonstrating to Army PCTE, you need to understand that **Controlled Unclassified Information (CUI)** represents a significant security obligation requiring specific technical controls. Here's what matters for your demo:

## Critical Security Requirements

## Data Encryption Standards

**At Rest:**

* Implement **AES-256 encryption** for all stored data including user queries, chatbot responses, and RAG pipeline outputs
* Use FIPS 140-2 validated cryptographic modules (required for DoD CUI compliance)
* Maintain secure key management with role-based access controls

**In Transit:**

* All network communications must use **TLS 1.3** protocols minimum
* Encrypt data flowing between RAG components (retrieval systems, vector databases, LLM endpoints)
* Ensure API calls to external LLM providers use encrypted channels

## Access Control Implementation

**NIST SP 800-171 Rev. 3 Requirements:**

Your system must implement the **110 security controls** from NIST SP 800-171, which is the foundation for **CMMC Level 2** (required for DoD contractors handling CUI). Key controls include:

* **Role-Based Access Control (RBAC):** Implement least-privilege access where users only see queries/responses relevant to their role
* **Multi-Factor Authentication (MFA):** Mandatory for all system access
* **Session management:** Automated logout, secure session tokens

## Audit Logging and Monitoring

**Comprehensive Audit Trails:**

* Log **every user query, chatbot response, document retrieval, and system access attempt** with timestamps and user identifiers
* Logs must be **tamper-evident** using cryptographic techniques
* Retain logs according to DoD requirements (typically 3+ years)
* Implement **real-time monitoring** with automated alerts for suspicious activities

**SIEM Integration:**

* Integrate logs into Security Information and Event Management (SIEM) systems
* Enable correlation with other security events
* Support incident response and forensic analysis

## Architecture Considerations for Demo

**Data Isolation:**

Based on Strative's architecture (from your white papers), highlight:

* **Container deployment in customer VPC:** Your RAG pipeline runs in a dedicated enterprise container within the Army's Virtual Private Cloud, ensuring CUI never leaves their controlled environment
* **Metadata-only transmission:** Your SaaS monitoring components (Strative Connect, Insights, Fusion) receive only operational metadata—NOT the actual CUI data
* **No external data storage:** Emphasize that sensitive queries and responses remain within the Army's infrastructure

## What to Demonstrate

**For the Stage 2 RFS Demo:**

1. **Show encryption in action:**
   * Display how queries are encrypted before transmission
   * Demonstrate secure storage of conversation history
   * Show certificates/validation for cryptographic modules
2. **Access control demonstration:**
   * Log in with different user roles showing differential access
   * Demonstrate MFA workflow
   * Show session timeout and re-authentication
3. **Audit trail walkthrough:**
   * Pull up audit logs showing query/response tracking
   * Demonstrate tamper-evidence features
   * Show how logs integrate with monitoring systems
4. **Data flow diagram:**
   * Clearly illustrate where CUI resides (always in Army VPC)
   * Show what crosses network boundaries (only encrypted metadata)
   * Prove no CUI exposure to external systems

## Technical Gaps to Address Before Demo

**From your Strative white papers:**

While your RAG Enablement platform emphasizes "data security, privacy, and regulatory compliance" with "built-in access controls, data encryption, and auditing mechanisms," you need to explicitly validate:

1. **FIPS 140-2 compliance:** Confirm your cryptographic implementations use validated modules
2. **NIST SP 800-171 control mapping:** Document which of the 110 controls your system satisfies
3. **Audit log retention:** Ensure logs meet DoD retention requirements with tamper-proof storage
4. **Incident response:** Demonstrate breach notification and containment procedures

## Key Talking Points for Army Audience

**Compliance-First Architecture:**

"Our RAG pipeline deploys entirely within your VPC, ensuring CUI never transits to external systems. We've architected for CMMC Level 2 compliance from day one."

**Defense-in-Depth:**

"We implement multiple security layers—encryption at rest and in transit, RBAC with MFA, comprehensive audit logging, and real-time monitoring—to exceed NIST SP 800-171 requirements."

**Operational Transparency:**

"Every query and response generates an immutable audit trail. Your security team maintains complete visibility while our platform handles the heavy lifting of RAG optimization."

## Regulatory Context

The Army PCTE environment **already handles CUI** (confirmed in official documentation), so they expect:

* **FedRAMP Moderate or High baseline** as minimum (PCTE operates at these levels)
* **Impact Level 5 (IL5) considerations** for higher-sensitivity CUI
* **CMMC 2.0 readiness** as DoD phases in contractor cybersecurity requirements

## Red Flags to Avoid

**Never state:**

* "We'll work on compliance later"
* "Our cloud provider handles security" (you own CUI protection)
* "Logs are optional" (they're mandatory for CUI)
* Anything suggesting CUI data leaves Army infrastructure

**Critical Success Factor:**

The Army evaluators will specifically probe whether your system can handle CUI without creating spillage risks. Your demo must prove that user queries about sensitive cyber training scenarios and AI-generated responses remain within their security boundary at all times.

Given Strative's architecture with enterprise containers in customer VPCs and metadata-only transmission to your SaaS components, you're well-positioned—but you must explicitly validate the encryption, access controls, and audit logging meet DoD standards during your demo.

Add to follow-up

Check sources

1. [https://www.titania.com/resources/guides/nist-800-171](https://www.titania.com/resources/guides/nist-800-171)
2. [https://csrc.nist.gov/pubs/sp/800/171/r3/final](https://csrc.nist.gov/pubs/sp/800/171/r3/final)
3. [https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final](https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final)
4. [https://www.kiteworks.com/risk-compliance-glossary/protect-cui-with-nist-800-171-compliance/](https://www.kiteworks.com/risk-compliance-glossary/protect-cui-with-nist-800-171-compliance/)
5. [https://hyperproof.io/nist-sp-800-171/](https://hyperproof.io/nist-sp-800-171/)
6. [https://www.cooley.com/news/insight/2025/2025-10-21-ai-chatbots-at-the-crossroads-navigating-new-laws-and-compliance-risks](https://www.cooley.com/news/insight/2025/2025-10-21-ai-chatbots-at-the-crossroads-navigating-new-laws-and-compliance-risks)
7. [https://www.ispartnersllc.com/blog/what-is-cui-in-the-context-of-cmmc-a-guide-for-dod-contractors/](https://www.ispartnersllc.com/blog/what-is-cui-in-the-context-of-cmmc-a-guide-for-dod-contractors/)
8. [https://www.totalassure.com/blog/nist-sp-800-171-security-cui-on-digital-non-digital-media](https://www.totalassure.com/blog/nist-sp-800-171-security-cui-on-digital-non-digital-media)
9. [https://www.crowell.com/en/insights/client-alerts/federal-and-state-regulators-target-ai-chatbots-and-intimate-imagery](https://www.crowell.com/en/insights/client-alerts/federal-and-state-regulators-target-ai-chatbots-and-intimate-imagery)
10. [https://csiac.dtic.mil/articles/the-cmmc-transition-and-its-cybersecurity-implications/](https://csiac.dtic.mil/articles/the-cmmc-transition-and-its-cybersecurity-implications/)
11. [https://sam.gov/opp/95d519f07202403a9ef477dc34a0d59f/view](https://sam.gov/opp/95d519f07202403a9ef477dc34a0d59f/view)
12. [https://www.cybercom.mil/Media/Images/igphoto/2002319626/](https://www.cybercom.mil/Media/Images/igphoto/2002319626/)
13. [https://www.peostri.army.mil/Project-Offices/PM-CT2/PdM-CRT/PCTE/](https://www.peostri.army.mil/Project-Offices/PM-CT2/PdM-CRT/PCTE/)
14. [https://comptroller.war.gov/Portals/45/Documents/defbudget/FY2025/budget_justification/pdfs/03_RDT_and_E/RDTE_CYBERCOM_PB_2025.pdf](https://comptroller.war.gov/Portals/45/Documents/defbudget/FY2025/budget_justification/pdfs/03_RDT_and_E/RDTE_CYBERCOM_PB_2025.pdf)
15. [https://www.youtube.com/watch?v=EIhpF6r0aHE](https://www.youtube.com/watch?v=EIhpF6r0aHE)
16. [https://learn.microsoft.com/en-us/compliance/regulatory/offering-dod-il5](https://learn.microsoft.com/en-us/compliance/regulatory/offering-dod-il5)
17. [https://avahi.ai/blog/ai-chatbots-for-pci-dss-compliance/](https://avahi.ai/blog/ai-chatbots-for-pci-dss-compliance/)
18. [https://www.netc.navy.mil/NETSAFA/Article/3587074/iwtc-corry-station-sailors-help-install-first-pcte-node-on-navy-training-instal/](https://www.netc.navy.mil/NETSAFA/Article/3587074/iwtc-corry-station-sailors-help-install-first-pcte-node-on-navy-training-instal/)
19. [https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-dod-il5](https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-dod-il5)
20. [https://www.youtube.com/watch?v=5OV_reeVLcg](https://www.youtube.com/watch?v=5OV_reeVLcg)
21. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/847c7705-e2f3-4848-84fe-de37720d8199/Strative-RAG-Enablement-White-Paper.pdf](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/847c7705-e2f3-4848-84fe-de37720d8199/Strative-RAG-Enablement-White-Paper.pdf)
22. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/33925dd5-4daa-4fb5-b77f-83d79c97844c/Strative-Accuracy-Evaluation-White-Paper.pdf](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/33925dd5-4daa-4fb5-b77f-83d79c97844c/Strative-Accuracy-Evaluation-White-Paper.pdf)
23. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/120486de-f0bc-4d97-b2a8-b28e8b2a20a2/Strative-Reading-Materials-Google-Docs.pdf](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/120486de-f0bc-4d97-b2a8-b28e8b2a20a2/Strative-Reading-Materials-Google-Docs.pdf)
24. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/a65f2cfe-725d-454a-94f4-7f895771bba9/Strative.ai_-Intelligent-Document-Processing-for-Insurance-Underwriting-Google-Docs.pdf](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/a65f2cfe-725d-454a-94f4-7f895771bba9/Strative.ai_-Intelligent-Document-Processing-for-Insurance-Underwriting-Google-Docs.pdf)
25. [https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/38693557-91cf-4da1-b588-9c37b2fd5b60/Strative-Prompt-Google-Docs.pdf](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_6731e60e-81bb-454d-b581-68839e78fb74/38693557-91cf-4da1-b588-9c37b2fd5b60/Strative-Prompt-Google-Docs.pdf)
