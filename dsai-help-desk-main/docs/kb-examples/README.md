# KB Upload Demo Files

These files demonstrate the different knowledge base formats that can be uploaded to the AI Help Desk system, as specified in the PCTE RFS.

## File Formats

### 1. **Markdown (.md)** - MKDocs Format
**File:** `KB-DEMO-001-Lab-Access.md`

**Use Case:** Native format for PCTE MKDocs documentation system
- Human-readable and easy to edit
- Supports full markdown syntax (headers, lists, tables, code blocks)
- Directly integrates with PCTE's documentation application
- Best for: User guides, procedural documentation

**Demo Talking Point:** "This is the native format PCTE uses for its documentation. Administrators can export directly from MKDocs or upload markdown files from external sources."

---

### 2. **CSV (.csv)** - Jira Export Format
**File:** `KB-DEMO-001-Lab-Access.csv`

**Use Case:** Bulk import from Jira Service Management or spreadsheet systems
- Structured tabular format
- Each row represents a KB section or entry
- Columns: KB_ID, Title, Category, Source, Confidence, Last_Updated, Section, Content
- Best for: Bulk migrations, data imports, spreadsheet management

**Demo Talking Point:** "This CSV format allows bulk import of KB articles from Jira Service Management, which PCTE has used for 54,000+ support tickets. You can export tickets and convert them to KB articles automatically."

---

### 3. **JSON (.json)** - API/System Integration Format
**File:** `KB-DEMO-001-Lab-Access.json`

**Use Case:** Programmatic integration with external systems
- Structured hierarchical format
- Supports rich metadata (views, helpful counts, error codes)
- Integrates with REST APIs and automation tools
- Best for: System integrations, API uploads, advanced metadata

**Demo Talking Point:** "This JSON format enables programmatic integration with other systems. The AI engine can parse structured KB data, extract error codes, and provide targeted solutions. Notice the metadata tracking - we can measure KB effectiveness."

---

## How to Use in Demo

### Demo Script: KB Upload Feature

1. **Show the three formats:**
   - "Our system accepts multiple KB formats to fit your workflow"
   - Display each file in the IDE

2. **Explain the RFS alignment:**
   - "The RFS specifies that PCTE uses Confluence, MKDocs, and Jira"
   - "We support all three through these formats"

3. **Demonstrate upload capability:**
   - Point to Configuration Interface screen
   - "Administrators can upload KB files in any of these formats"
   - "The system automatically parses and indexes them"

4. **Show the result:**
   - "Once uploaded, the AI immediately uses them for responses"
   - "Users get answers from your custom KB, not generic responses"

---

## File Structure Details

### Markdown Structure
```
# Title
Metadata (KB ID, Category, Source, Confidence, Last Updated)
## Sections with content
- Lists
- Tables
- Code blocks
```

### CSV Structure
```
KB_ID | Title | Category | Source | Confidence | Last_Updated | Section | Content
```

### JSON Structure
```json
{
  "kb_article": {
    "id": "KB-DEMO-001",
    "metadata": {...},
    "sections": [
      {
        "section_id": "...",
        "title": "...",
        "content": "..."
      }
    ]
  }
}
```

---

## Integration Points

These KB formats integrate with:

1. **Self-Service Portal** - AI uses KB to generate responses
2. **Configuration Interface** - Admins upload/manage KB files
3. **Analytics Dashboard** - Tracks KB effectiveness metrics
4. **Ticket Dashboard** - Links tickets to KB articles
5. **Search Function** - Full-text search across KB

---

## Demo Tips

- **Start with Markdown:** Most intuitive, shows human-readable format
- **Explain CSV:** "This is how you migrate from Jira"
- **Show JSON:** "This is how systems talk to each other"
- **Emphasize flexibility:** "Use whatever format works for you"
- **Highlight metadata:** "We track which KB articles actually help users"

---

## Creating Your Own KB Files

To create additional KB files:

1. **Copy one of these templates**
2. **Update the KB_ID** (e.g., KB-DEMO-002)
3. **Fill in your content** (title, sections, solutions)
4. **Add metadata** (confidence score, category, tags)
5. **Upload via Configuration Interface**

The system will automatically index and make it available to the AI.
