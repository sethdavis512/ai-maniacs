---
sidebar_position: 5
title: Building Your First Agent
description: Hands-on tutorial for building your first AI agent - from simple automation to autonomous workflows.
keywords: [build AI agent, agent tutorial, first agent, AI automation, agent development]
---

# Building Your First Agent

Let's build a real agent that completes tasks autonomously. We'll start simple and progressively add capabilities.

## Agent 1: Research Assistant (No Code)

**Goal:** Agent that researches a topic and creates a summary document

**Platform:** Claude or ChatGPT (free tier works)

### Step 1: Define the Task

Instead of asking questions, give a complete task:

```
Research the top 5 AI code editors in 2026. For each one:
- Key features
- Pricing
- Best use case
- Market position

Create a comparison document with recommendations.
```

### Step 2: Let It Run

The agent will:
1. Search for information
2. Analyze findings
3. Structure the document
4. Create the output

### Step 3: Review and Refine

Provide feedback:
```
Good start. Please add:
- User reviews/ratings
- Integration capabilities
- Update with pricing I can verify
```

**You just built your first agent!** It's autonomous, multi-step, and completes the full task.

## Agent 2: Custom Skill Agent

**Goal:** Create a reusable research skill

**Platform:** [skills.sh](https://skills.sh) + Claude/ChatGPT

### Step 1: Create the Skill

Go to skills.sh and create:

```markdown
# Deep Tech Research Skill

## What you do
Comprehensive technology research with competitive analysis

## Instructions
1. Search for the technology/tool
2. Find official sources first (documentation, company site)
3. Check reviews on Reddit, HN, Twitter
4. Analyze competitors
5. Identify strengths and weaknesses
6. Create structured comparison

## Output Format
# [Technology Name]

## Overview
[2-3 sentence summary]

## Key Features
- [Feature 1]
- [Feature 2]

## Competitors
| Name | Strength | Weakness |

## Recommendation
[Who should use this and why]

## Sources
[Links to all sources]
```

### Step 2: Use the Skill

In Claude or ChatGPT, reference your skill:
```
Use the Deep Tech Research skill to analyze Cursor IDE
```

### Step 3: Iterate

Refine the skill based on results. Skills improve over time.

## Agent 3: Automated Workflow (Low Code)

**Goal:** Agent that monitors competitors daily

**Platform:** Make.com or Zapier Central

### Architecture

```
Schedule (daily 9am)
    ↓
Web Scraping (competitor sites)
    ↓
Claude Analysis (what changed?)
    ↓
Filter (only if significant changes)
    ↓
Slack Alert (notify team)
```

### Step 1: Set Up Trigger

**Make.com:**
1. New scenario
2. Schedule trigger: Daily 9am

**Zapier Central:**
1. Natural language: "Every day at 9am..."

### Step 2: Add Web Monitoring

**Make.com:**
- HTTP module → Get competitor homepage
- Repeat for each competitor

**Zapier:**
- "Check these URLs: [list]"

### Step 3: Add AI Analysis

**Make.com:**
- Claude/ChatGPT API module
- Prompt: "Analyze these pages for changes in: pricing, features, messaging"

**Zapier:**
- "Use AI to find changes"

### Step 4: Alert on Changes

**Make.com:**
- Filter: If changes detected
- Slack module: Post message

**Zapier:**
- "If changes found, post to #competitive-intel"

**You now have an autonomous monitoring agent!**

## Agent 4: Development Agent (Technical)

**Goal:** Agent that fixes bugs autonomously

**Platform:** Cursor or Claude Code

### Using Cursor

1. **Open your project in Cursor**

2. **Describe the bug:**
```
Agent mode: There's a bug where users can submit empty forms.
Fix the validation and add tests.
```

3. **Cursor Agent will:**
   - Read relevant files
   - Identify the issue
   - Write the fix across multiple files
   - Add tests
   - Verify it works

4. **Review the changes:**
   - Check the diff
   - Run tests
   - Commit if good

### Using Claude Code (CLI)

```bash
# Install
brew install claude-code  # or npm install -g claude-code

# Navigate to project
cd my-project

# Give it a task
claude-code "Add rate limiting to the API endpoints"
```

Claude Code will:
- Analyze your codebase
- Implement rate limiting
- Add tests
- Update documentation

## Agent 5: Custom Agent (Code)

**Goal:** Build a custom agent from scratch

**Platform:** Python + Claude API

### Simple Agent Framework

```python
import anthropic
import os

class ResearchAgent:
    def __init__(self):
        self.client = anthropic.Anthropic(
            api_key=os.environ.get("ANTHROPIC_API_KEY")
        )

    def research_topic(self, topic):
        """Autonomous research agent"""

        # Agent loop
        messages = [{
            "role": "user",
            "content": f"""Research {topic} thoroughly.

            Steps:
            1. Search for official information
            2. Find user reviews
            3. Compare alternatives
            4. Create summary document

            Use tools as needed. Complete the full task."""
        }]

        # Agent runs until task complete
        while True:
            response = self.client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=4096,
                messages=messages,
                tools=[
                    {
                        "name": "web_search",
                        "description": "Search the web",
                        "input_schema": {
                            "type": "object",
                            "properties": {
                                "query": {"type": "string"}
                            }
                        }
                    },
                    {
                        "name": "create_document",
                        "description": "Create markdown document",
                        "input_schema": {
                            "type": "object",
                            "properties": {
                                "content": {"type": "string"}
                            }
                        }
                    }
                ]
            )

            # Check if agent is done
            if response.stop_reason == "end_turn":
                return response.content

            # Execute tool calls
            if response.stop_reason == "tool_use":
                for block in response.content:
                    if block.type == "tool_use":
                        result = self._execute_tool(
                            block.name,
                            block.input
                        )
                        messages.append({
                            "role": "assistant",
                            "content": response.content
                        })
                        messages.append({
                            "role": "user",
                            "content": [{
                                "type": "tool_result",
                                "tool_use_id": block.id,
                                "content": result
                            }]
                        })

    def _execute_tool(self, tool_name, params):
        """Execute tool and return result"""
        if tool_name == "web_search":
            return self._web_search(params["query"])
        elif tool_name == "create_document":
            return self._create_doc(params["content"])

    def _web_search(self, query):
        # Implement web search
        # Could use Tavily, SerpAPI, etc.
        pass

    def _create_doc(self, content):
        # Save document
        with open("research.md", "w") as f:
            f.write(content)
        return "Document created"

# Use the agent
agent = ResearchAgent()
result = agent.research_topic("AI code editors 2026")
print(result)
```

### Run It

```bash
export ANTHROPIC_API_KEY=your_key
python research_agent.py
```

The agent autonomously completes the research task!

## Common Patterns

### Pattern 1: Approval Gates

For agents that take actions, add human approval:

```python
def needs_approval(action):
    """Human approval for critical actions"""
    print(f"Agent wants to: {action}")
    response = input("Approve? (y/n): ")
    return response.lower() == 'y'
```

### Pattern 2: Error Recovery

Agents should retry on failure:

```python
def safe_tool_call(tool, params, max_retries=3):
    for attempt in range(max_retries):
        try:
            return tool(params)
        except Exception as e:
            if attempt == max_retries - 1:
                return f"Failed after {max_retries} attempts: {e}"
            time.sleep(2 ** attempt)  # Exponential backoff
```

### Pattern 3: Cost Limits

Prevent runaway costs:

```python
class Agent:
    def __init__(self, max_cost_usd=1.0):
        self.max_cost = max_cost_usd
        self.current_cost = 0

    def check_budget(self, estimated_cost):
        if self.current_cost + estimated_cost > self.max_cost:
            raise BudgetExceeded("Cost limit reached")
        self.current_cost += estimated_cost
```

## Next Steps

**Level up your agents:**
1. [Agent Patterns](./agent-patterns.md) - Learn advanced architectures
2. [Multi-Agent Systems](./multi-agent-systems.md) - Coordinate multiple agents
3. [MCP Integration](./mcp-integration.md) - Connect to tools and data
4. [Agent Safety](./agent-safety.md) - Guardrails and sandboxing

**Resources:**
- [Anthropic Agent SDK](https://github.com/anthropics/anthropic-agent-sdk)
- [LangGraph Tutorials](https://langchain.com/langgraph)
- [CrewAI Docs](https://crewai.com/docs)

**Community:**
- Share your agents on [skills.sh](https://skills.sh)
- Join [Anthropic Discord](https://discord.gg/anthropic)
- Follow #ai-agents on Twitter/X

Start with Agent 1 today. By Agent 5, you'll be building production systems!
