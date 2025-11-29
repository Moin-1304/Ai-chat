# Defense-in-Depth Security Architecture

Diagram showing PCTE CP and EP, and exactly where your AI Help Desk runs (in CP only), plus data flows to Jira/Confluence/MKDocs/Mattermost.

* Explicitly demonstrate no dependency on external cloud or public APIs; all inference is local.
* Show how you enforce:
  * RBAC tied to Red Hat SSO/IDM roles
  * Encryption in transit/at rest, monitoring, and anomaly detection
  * Audit logs per interaction and escalation (who asked, what was answered, what sources used).
  * Native integration with existing PCTE tools and tiered support automation
* Briefly map these controls to RMF/NIST families (AC, AU, SC, SI) and DoD AI Ethical Principles.

Secure on-prem architecture, CUI protection, and RMF-ready controls
Why it matters: This is the price of admission. If reviewers doubt security or compliance, nothing else matters.
