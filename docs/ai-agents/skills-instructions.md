---
sidebar_position: 4
title: Skills & Custom Instructions
description: Learn how to extend AI agents with custom skills, instructions, and capabilities using skills.sh and other platforms.
keywords: [AI skills, custom GPTs, Claude skills, skills.sh, AI instructions, agent capabilities]
---

# Skills & Custom Instructions

Skills are the superpower of modern AI agents. They're packaged sets of instructions + tools + examples that give agents new capabilities.

## What Are Skills?

Think of skills like apps for your AI:
- **Base AI** = smartphone
- **Skills** = apps that add specific capabilities

### Real Example: Excel Skill

**Without skill:**
```
You: "Create a budget spreadsheet"
AI: [Writes text that looks like a table]
```

**With Excel skill:**
```
You: "Create a budget spreadsheet"
AI: [Creates actual .xlsx file with formulas, formatting, charts]
```

## The Skills Ecosystem

### 1. Skills.sh - The Skills Marketplace

**[skills.sh](https://skills.sh)** is the primary hub for discovering and creating AI skills.

**Browse skills by category:**
- 📊 Data Analysis
- 💻 Software Development
- 📝 Content Creation
- 🎨 Design & Creative
- 📈 Business Operations
- 🔬 Research & Academic

**Example skills available:**
- **Deep Research** - Multi-source research with citations
- **Code Review** - Security and quality analysis
- **SEO Optimizer** - Content optimization with keyword research
- **Data Visualizer** - Charts and graphs from raw data
- **Meeting Prep** - Agenda, research, talking points

### 2. Platform-Specific Skills

**Claude Skills** (Anthropic)
- Access via Claude Desktop or API
- Can use MCP servers for tool access
- Markdown-based definitions

**Custom GPTs** (OpenAI)
- Built in ChatGPT interface
- Can include actions (API calls)
- Shareable via link or GPT store

**Gemini Gems** (Google)
- Specialized Gemini instances
- Custom instructions and examples

## Anatomy of a Skill

Every skill has three components:

### 1. Purpose Statement
What does this skill do?

```markdown
# Marketing Campaign Creator

Creates comprehensive marketing campaigns including:
- Target audience analysis
- Content calendar
- Social media posts
- Email sequences
- Ad copy variants
```

### 2. Instructions
How should the AI behave?

```markdown
## Instructions

1. Start by asking about:
   - Product/service
   - Target audience
   - Campaign goals
   - Budget range

2. Research competitors and industry trends

3. Create a 30-day content calendar

4. Generate all assets (posts, emails, ad copy)

5. Provide performance tracking recommendations

## Tone
Professional but approachable. Use data to back up suggestions.

## Constraints
- Always include A/B test variants
- Focus on ROI and measurability
- Follow platform-specific best practices
```

### 3. Tools & Integrations
What can the skill access?

```markdown
## Tools Needed

- Web search (for competitor research)
- Image generation (for visual assets)
- Spreadsheet creation (for calendars)
- MCP: google-calendar (for scheduling)
- MCP: buffer (for social posting)
```

## Creating Your First Skill

### Option 1: Use Skills.sh

1. **Go to [skills.sh](https://skills.sh)**
2. **Click "Create Skill"**
3. **Fill in the template:**

```markdown
# [Skill Name]

## What you do
[One sentence description]

## Instructions
[Step by step what to do]

## Tools
[What tools you need]

## Examples
[Show example interactions]
```

4. **Test it** with Claude or ChatGPT
5. **Publish** to share with others

### Option 2: Create a Custom GPT

1. **Go to ChatGPT → "Explore GPTs" → "Create"**
2. **Use the GPT Builder** (conversational creation)
3. **Or use "Configure"** (direct editing)

**Key fields:**
- **Name** - Clear, descriptive
- **Description** - What it does, who it's for
- **Instructions** - Detailed behavior guide
- **Conversation starters** - Example prompts
- **Knowledge** - Upload reference files
- **Actions** - Connect to APIs

### Option 3: Claude Skills (Developers)

Create a skill directory:

```
my-skill/
  SKILL.md          # Main instructions
  examples/         # Example interactions
  tools/            # MCP server configs
```

**SKILL.md structure:**
```markdown
---
name: Your Skill Name
version: 1.0.0
author: Your Name
---

# [Skill Name]

## Triggers
When should this skill activate?
- Keywords: data analysis, visualization
- File types: .csv, .xlsx
- User requests: "analyze this data"

## Core Instructions
[Detailed instructions...]

## Tools Required
- MCP: filesystem
- MCP: database

## Output Format
[What you produce...]
```

## Skill Design Best Practices

### 1. Make It Focused
**Bad:** "General Business Helper"
**Good:** "Sales Email Response Generator"

Narrow skills work better than broad ones.

### 2. Include Examples
```markdown
## Examples

### Example 1: Product Launch
User: "Create launch emails for our new app"
Assistant: [Shows complete response]

### Example 2: Re-engagement
User: "Win back churned customers"
Assistant: [Shows complete response]
```

### 3. Define Success Criteria
```markdown
## Success Criteria

Good output includes:
✓ Personalization tokens
✓ Clear CTA
✓ A/B test variant
✓ Mobile-optimized length
✓ Compliance disclaimer

Avoid:
✗ Generic messaging
✗ Spam trigger words
✗ Missing unsubscribe
```

### 4. Handle Edge Cases
```markdown
## Edge Cases

- If no product info provided → Ask specific questions
- If target audience is unclear → Suggest research first
- If budget is too low → Provide free/organic alternatives
```

### 5. Use Structured Outputs
```markdown
## Output Format

Always structure responses as:

# Campaign Overview
[Summary]

# Target Audience
[Details]

# Content Calendar
| Date | Platform | Content | Goal |
|------|----------|---------|------|

# Assets
[Actual posts, emails, etc.]

# Success Metrics
[KPIs to track]
```

## Real-World Skill Examples

### 1. Meeting Note Taker
```markdown
# Meeting Note Taker

## What you do
Transform meeting transcripts into structured, actionable notes

## Instructions
1. Identify participants, date, purpose
2. Extract key decisions made
3. List action items with owners and deadlines
4. Summarize important discussion points
5. Note any parking lot items
6. Create follow-up email draft

## Output Format
- Executive summary (3 bullets)
- Decisions made
- Action items table
- Next meeting agenda items
- Follow-up email draft
```

### 2. Code Review Specialist
```markdown
# Code Review Specialist

## What you do
Provide thorough, constructive code reviews

## Instructions
Review for:
- Security vulnerabilities
- Performance issues
- Code style consistency
- Test coverage
- Documentation clarity

Provide:
- Specific line-by-line feedback
- Severity ratings (critical/major/minor)
- Suggested fixes with code examples
- Learning resources for patterns found

## Tone
Constructive and educational, never judgmental
```

### 3. Research Synthesizer
```markdown
# Research Synthesizer

## What you do
Deep research on any topic with cited sources

## Tools Required
- Web search
- PDF extraction
- Academic database access (optional MCP)

## Instructions
1. Search multiple authoritative sources
2. Cross-reference facts between sources
3. Identify consensus vs conflicting views
4. Extract key quotes with citations
5. Organize by themes/subtopics
6. Create annotated bibliography

## Output Format
# Executive Summary

# Key Findings
[Organized by theme]

# Conflicting Views
[Where sources disagree]

# Detailed Analysis
[Deep dive with citations]

# Sources
[Full bibliography in requested format]
```

## Combining Multiple Skills

Agents can use multiple skills together:

**Example: Product Launch Agent**
1. **Research Skill** - Analyze market and competitors
2. **Copywriting Skill** - Create marketing messages
3. **Design Skill** - Generate visual assets
4. **Social Media Skill** - Plan content calendar
5. **Analytics Skill** - Set up tracking and reports

```
You: "Launch our new mobile app"

Agent uses:
→ Research Skill: Studies app store competitors
→ Copywriting Skill: Writes app store listing
→ Design Skill: Creates social media graphics
→ Social Media Skill: Plans 30-day campaign
→ Analytics Skill: Sets up performance dashboards
```

## Skill Marketplaces

Where to find pre-built skills:

### Skills.sh
- Community-created skills
- Browse by category or popularity
- Import directly to Claude or ChatGPT

### GPT Store (OpenAI)
- Thousands of custom GPTs
- Categories: Writing, Productivity, Research, etc.
- Some free, some paid

### Claude Skills Library (Anthropic)
- Official Claude skills
- Focus on professional workflows
- Integrated with MCP servers

### Community GitHub Repos
- [awesome-ai-skills](https://github.com/topics/ai-skills)
- Open source skill definitions
- Fork and customize

## Advanced: Skills with MCP Servers

For skills that need tool access, use MCP:

```json
{
  "skill": "database-analyst",
  "requires": {
    "mcp_servers": [
      "postgres",
      "visualization"
    ]
  },
  "instructions": "Connect to database, run queries, create charts..."
}
```

See [MCP Integration](./mcp-integration.md) for details.

## Monetizing Skills

Some platforms allow selling skills:

**GPT Store:**
- Set usage pricing
- Earn revenue share
- Track usage analytics

**Skills Marketplace:**
- Premium skills for subscribers
- One-time purchases
- Freemium models

**Custom Development:**
- Build enterprise skills for companies
- Consulting for skill optimization
- Training workshops

## Testing Your Skills

### 1. Test Coverage
Try edge cases:
- Missing information
- Ambiguous requests
- Error conditions
- Multiple languages
- Long inputs

### 2. User Testing
Have others try your skill:
- Observe where they get confused
- Note what questions they ask
- Track which features they use most

### 3. Iteration
Based on usage:
- Refine instructions
- Add more examples
- Improve error handling
- Update for new AI capabilities

## Skill Composition Patterns

### Chain of Skills
One skill calls another:
```
Research Skill → Analysis Skill → Report Writer Skill
```

### Parallel Skills
Multiple skills work simultaneously:
```
          → Content Writer
Request → → Image Generator
          → SEO Optimizer
                ↓
          Combined Output
```

### Conditional Skills
Route based on context:
```
If technical: → Code Review Skill
If creative: → Design Feedback Skill
If business: → Strategy Analysis Skill
```

## Your Turn

**Start simple:**
1. Identify a repetitive task you do
2. Write out the steps you follow
3. Add examples of inputs/outputs
4. Create a skill at [skills.sh](https://skills.sh)
5. Test and refine

**Example starter:**
"I always format meeting notes the same way. Let me make a skill for that..."

Next: Learn about [Multi-Agent Systems](./multi-agent-systems.md) where multiple skilled agents work together.
