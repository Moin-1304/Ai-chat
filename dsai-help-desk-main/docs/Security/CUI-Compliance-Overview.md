# CUI (Controlled Unclassified Information) - Overview & Requirements

## What is CUI?

**CUI** stands for **Controlled Unclassified Information** - a U.S. government classification for information that is:
- **Not classified** (not Top Secret, Secret, or Confidential)
- **Still requires safeguarding** due to its sensitive nature
- **Subject to specific handling and dissemination controls** per federal laws and regulations

## Key Characteristics

CUI includes information that:
- Requires protection under federal law, regulation, or government-wide policy
- Is not classified but could cause harm if disclosed improperly
- Includes categories like:
  - Controlled Technical Information (CTI)
  - Critical Infrastructure Information
  - Privacy Information
  - Financial Information
  - Export Control Information
  - And many other categories defined by the National Archives

## Why CUI Matters for PCTE AI Help Desk

### 1. **DoD/Air Force Requirement**
- The PCTE (Persistent Cyber Training Environment) is a **Department of Defense** system
- DoD systems handling sensitive training data, user information, and operational details must comply with CUI requirements
- This is a **mandatory compliance standard** for government contractors and systems processing DoD data

### 2. **Legal & Regulatory Compliance**
- **32 CFR Part 2002** - Establishes the CUI program
- **NIST SP 800-171** - Requires CUI protection for non-federal systems (which this application likely is)
- **DFARS 252.204-7012** - Requires contractors to provide adequate security for CUI
- **Non-compliance can result in:**
  - Loss of contracts
  - Legal penalties
  - Security breaches
  - Loss of authorization to operate (ATO)

### 3. **Data Protection Requirements**
CUI compliance ensures:
- **Proper marking** of sensitive information
- **Access controls** - only authorized personnel can access CUI
- **Encryption** - CUI must be encrypted at rest and in transit
- **Audit trails** - all access to CUI must be logged
- **Incident reporting** - breaches must be reported within 72 hours
- **Training** - personnel handling CUI must be trained

### 4. **Integration with Other Compliance Standards**
In your application, CUI compliance works alongside:
- **NIST 800-171** - Protection of CUI in non-federal systems (110 controls)
- **ISO 27001** - Information security management
- **FedRAMP** - Cloud security authorization

These standards are **interconnected** - NIST 800-171 specifically addresses CUI protection.

## Do We Need CUI Compliance?

### **YES - Absolutely Required**

**Reasons:**

1. **Government Contract Requirement**
   - If this system processes any DoD/Air Force data, CUI compliance is **mandatory**
   - The RFS (Request for Services) document likely requires CUI compliance
   - Cannot operate without it

2. **Data Types Handled**
   - User account information (PII)
   - Training records and performance data
   - System configuration details
   - Security logs and audit trails
   - All of these likely qualify as CUI

3. **Contractor Obligations**
   - As a contractor/vendor to DoD, you must:
     - Implement CUI safeguards
     - Report compliance status
     - Undergo regular audits
     - Maintain documentation

4. **System Authorization**
   - Without CUI compliance, the system cannot receive:
     - Authorization to Operate (ATO)
     - Authority to Connect (ATC)
     - Cannot be deployed in DoD environments

## CUI Compliance Card in the Application

The CUI compliance card in your Security & Compliance Dashboard serves to:
- **Demonstrate compliance** to stakeholders
- **Track audit status** (last audit, next audit dates)
- **Show compliance score** (100% compliant)
- **Provide transparency** for security reviews
- **Support ATO process** - required documentation

## Compliance Requirements Summary

To maintain CUI compliance, the system must:

1. **Mark CUI appropriately** - Use CUI markings on documents/data
2. **Implement access controls** - Role-based access, authentication
3. **Encrypt data** - At rest and in transit
4. **Maintain audit logs** - Track all access to CUI
5. **Conduct regular audits** - Typically every 6 months
6. **Train personnel** - Security awareness training
7. **Report incidents** - Within 72 hours of discovery
8. **Document controls** - System Security Plan (SSP), policies

## Conclusion

**CUI compliance is NOT optional** for this application because:
- ✅ It's a DoD/Air Force system
- ✅ It handles sensitive government data
- ✅ It's required by law and regulation
- ✅ It's necessary for system authorization
- ✅ It protects against security breaches
- ✅ It's part of the overall compliance framework (NIST 800-171, ISO 27001, FedRAMP)

**Recommendation:** Keep the CUI compliance card and ensure all compliance requirements are properly implemented and documented.

## References

- **32 CFR Part 2002** - Controlled Unclassified Information
- **NIST SP 800-171** - Protecting Controlled Unclassified Information in Nonfederal Systems
- **DFARS 252.204-7012** - Safeguarding Covered Defense Information
- **CUI Registry** - https://www.archives.gov/cui

## Additional Notes

The CUI compliance card should display:
- Current compliance status (✓ Compliant)
- Last audit date
- Next audit date
- Compliance score
- Any outstanding issues or remediation items

This information is critical for:
- Security reviews
- Authorization processes
- Contract compliance
- Stakeholder reporting

