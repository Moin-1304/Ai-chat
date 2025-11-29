# Data Files - Single Source of Truth

## demoScriptParts.json

**Purpose:** Single source of truth for all Demo Script Navigator (DSN) content.

**Usage:**
- Imported by `src/components/DemoScriptNavigator.jsx`
- Referenced in documentation files to keep demo scripts in sync
- Contains 19 demo parts covering all 8 screens and chat scenarios

**Structure:**
```json
{
  "demoScriptParts": [
    {
      "id": 1,
      "title": "Part Title",
      "keyMessage": "Key message for the part",
      "script": "Speaker script (without quotes)",
      "nextAction": "What to do next",
      "clickTarget": "Where to click"
    }
  ]
}
```

**Important Notes:**
- Scripts are stored WITHOUT surrounding quotes (quotes are added by the component)
- This is the authoritative source for demo content
- Documentation files should reference this file rather than duplicating content
- Updates to demo flow should be made here first, then docs updated to point to this file

**Related Files:**
- `src/components/DemoScriptNavigator.jsx` - Component that uses this data
- `docs/Demo-Scenarios-Guide.md` - Documentation that should reference this file
- `docs/Demo-Evolution-Strategy.md` - Strategic notes about the demo

## Other Data Files

- `mockKB.js` - Knowledge base articles for AI chat
- `mockConversations.js` - Conversation intents and patterns
- `mockConnectors.js` - System integration connectors
- `mockWebhooks.js` - Webhook event data
