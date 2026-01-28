---
sidebar_position: 3
title: Agent Patterns & Architectures
description: Learn the common patterns AI agents use to reason, plan, and execute tasks - ReAct, Chain-of-Thought, tool use loops, and more.
keywords: [agent patterns, ReAct, chain of thought, tool use, AI reasoning, agent architecture]
---

# Agent Patterns & Architectures

AI agents use specific patterns to break down complex tasks and execute them reliably. Understanding these patterns helps you build better agents and debug when things go wrong.

## The Core Agent Loop

Every agent follows this basic pattern:

```
1. Observe (what's the current situation?)
2. Think (what should I do next?)
3. Act (execute the action)
4. Repeat until goal achieved
```

But how agents *think* and *act* varies by pattern.

## Pattern 1: ReAct (Reason + Act)

**Most common pattern** for production agents.

### How It Works

Agent alternates between reasoning and acting:

```
Thought: I need to find our competitor's pricing
Action: search_web("CompanyX pricing 2026")
Observation: Found pricing page at companyX.com/pricing

Thought: Now I need to extract the actual prices
Action: read_page("companyX.com/pricing")
Observation: Basic: $49/mo, Pro: $99/mo, Enterprise: Custom

Thought: I have the info, should format it
Action: create_spreadsheet(competitor_pricing_data)
Observation: Spreadsheet created at /output/competitor_prices.xlsx

Thought: Task complete
Result: Competitor pricing research finished
```

### Why It Works

- Self-documenting (you see the reasoning)
- Recovers from errors (can adjust approach)
- Explainable (shows decision process)

### When to Use

- Research tasks
- Data extraction
- Multi-step workflows
- When you need transparency

### Example Implementation

```python
while not task_complete:
    thought = agent.reason(current_state)
    action = agent.decide_action(thought)
    observation = agent.execute(action)
    current_state = update_state(observation)
```

## Pattern 2: Chain-of-Thought (CoT)

**Best for complex reasoning** before taking action.

### How It Works

Agent thinks through problem step-by-step before acting:

```
User: "Should we launch in Q1 or Q2?"

Agent thinking:
Let me break this down:
1. Q1 launch means:
   - Shorter dev time (need MVP by January)
   - Smaller feature set
   - First-mover advantage
   - Less competition

2. Q2 launch means:
   - More time for polish
   - Can include user feedback from beta
   - More competitive landscape
   - Better prepared for scale

3. Key factors to consider:
   - Current competition activity
   - Our resource constraints
   - Market readiness

4. Recommendation:
   Q2 launch because [reasons...]
```

### Variants

**Zero-shot CoT:**
Just add "Let's think step by step..." to prompt

**Few-shot CoT:**
Show examples of good reasoning

**Self-consistency:**
Generate multiple reasoning paths, pick most common answer

### When to Use

- Strategic decisions
- Analysis tasks
- Math/logic problems
- When accuracy > speed

## Pattern 3: Tool Use Loop

**For agents with access to external tools.**

### How It Works

```
Goal: "Analyze our website performance"

Loop:
1. Decide which tool to use
2. Execute tool
3. Process result
4. Decide next tool or finish

Example:
→ Use: analytics_api("get_metrics", last_30_days)
→ Use: database_query("user_cohorts")
→ Use: create_chart(metrics_data)
→ Use: write_report(analysis)
→ Done
```

### Tool Selection Strategies

**Sequential:** Pre-defined order of tools
```
search → extract → analyze → report
```

**Adaptive:** Agent decides based on results
```
if data_incomplete:
    use additional_search
elif data_messy:
    use data_cleaning_tool
else:
    proceed_to_analysis
```

**Parallel:** Multiple tools simultaneously
```
simultaneously:
    - search_news()
    - search_competitors()
    - search_social()
combine_results()
```

### When to Use

- Agents with many available tools
- When tool order isn't fixed
- Complex multi-source tasks

## Pattern 4: Planning Agents

**Generate entire plan upfront, then execute.**

### How It Works

**Phase 1: Planning**
```
Goal: "Build a marketing campaign"

Plan:
1. Research target audience (30min)
2. Analyze competitors (45min)
3. Create content calendar (20min)
4. Generate ad copy (40min)
5. Design graphics (1hr)
6. Set up tracking (30min)
Total estimated: 3.5 hours
```

**Phase 2: Execution**
```
Execute each step sequentially
Update plan if blockers encountered
Report progress
```

### Variants

**Hierarchical Task Network (HTN):**
Break down high-level goals into sub-tasks recursively

**Dynamic Replanning:**
Adjust plan based on execution results

### When to Use

- Long-running tasks
- When user needs time estimate
- Complex multi-step projects
- When you want approval before execution

## Pattern 5: Reflection & Critique

**Agent evaluates its own output and improves it.**

### How It Works

```
1. Generate initial output
2. Critique it (as if you're another person)
3. Revise based on critique
4. Repeat until satisfied

Example - Writing:
Draft 1: [writes article]
Critique: "Introduction is weak, needs stronger hook"
Draft 2: [rewrites intro]
Critique: "Better, but missing data to support claim"
Draft 3: [adds data]
Critique: "Good enough to publish"
```

### Variants

**Self-Refine:** Single agent critiques itself

**Multi-Agent Critique:** Separate agents for generating and critiquing

**Constitution AI:** Critique against predefined principles

### When to Use

- Quality-critical outputs
- Creative work
- When accuracy matters more than speed
- Complex reasoning tasks

## Pattern 6: Multi-Agent Collaboration

**Multiple specialized agents working together.**

### Architecture Types

**Sequential Pipeline:**
```
Research Agent → Analyst Agent → Writer Agent → Editor Agent
```

**Parallel with Aggregation:**
```
        → Agent A (search news)
Task → → Agent B (search social)  → Aggregator → Result
        → Agent C (search reports)
```

**Debate/Discussion:**
```
Agent 1: "We should launch Q1"
Agent 2: "I disagree because..."
Agent 1: "Good point, but consider..."
Moderator: *synthesizes consensus*
```

**Hierarchical:**
```
Manager Agent
    ├── Research Team Agent
    │   ├── Web Research Agent
    │   └── Data Analysis Agent
    └── Content Team Agent
        ├── Writer Agent
        └── Designer Agent
```

### Communication Patterns

**Shared Memory:** All agents read/write to common knowledge base

**Message Passing:** Agents send explicit messages

**Blackboard:** Agents contribute to shared workspace

### When to Use

- Complex projects needing specialization
- When single agent is overwhelmed
- Different tasks need different models/tools
- Want to simulate team dynamics

## Pattern 7: Memory-Augmented Agents

**Agents that remember and learn from past interactions.**

### Memory Types

**Short-term (Working Memory):**
- Current conversation
- Recent tool uses
- Active task state

**Long-term (Episodic Memory):**
- Past conversations
- Successful strategies
- User preferences

**Semantic Memory:**
- Domain knowledge
- Learned facts
- Skill improvements

### Implementation

```python
class MemoryAgent:
    def __init__(self):
        self.working_memory = []  # Current task
        self.episodic_memory = []  # Past tasks
        self.semantic_memory = {}  # Learned knowledge

    def remember(self, experience):
        self.episodic_memory.append(experience)
        self.extract_knowledge(experience)

    def recall(self, context):
        relevant = search(self.episodic_memory, context)
        return relevant
```

### When to Use

- Recurring tasks
- When learning from past is valuable
- Long-running agent relationships
- Personalization needed

## Pattern 8: Verification & Validation

**Agent checks its own work before returning results.**

### How It Works

```
1. Generate output
2. Run verification checks
3. If checks fail, retry or flag
4. Return with confidence score

Example - Data Extraction:
Extract: {company: "Acme", price: "$99"}
Verify: Check if format is correct ✓
Verify: Cross-reference with source ✓
Verify: Confidence calculation: 95%
Return: Data with confidence score
```

### Verification Types

**Format Checking:** Output matches expected structure

**Fact Verification:** Cross-reference with sources

**Logical Consistency:** No contradictions

**External Validation:** Run tests, check with tools

### When to Use

- High-stakes outputs
- Data extraction tasks
- Code generation
- Financial/legal applications

## Combining Patterns

Real agents often combine multiple patterns:

**Example: Research Agent**
```
1. Planning pattern → Create research plan
2. ReAct pattern → Execute each research step
3. Tool use → Access web, databases, APIs
4. Reflection → Critique findings quality
5. Memory → Remember successful strategies
```

**Example: Code Review Agent**
```
1. Tool use → Read code files
2. Chain-of-Thought → Analyze for issues
3. Verification → Run tests, check syntax
4. Reflection → Suggest improvements
5. Multi-agent → Security expert + performance expert
```

## Choosing the Right Pattern

**For simple tasks:**
- ReAct (straightforward, reliable)

**For complex reasoning:**
- Chain-of-Thought + Reflection

**For long projects:**
- Planning agent with checkpoints

**For team-like work:**
- Multi-agent collaboration

**For learning over time:**
- Memory-augmented agent

**For critical outputs:**
- Verification pattern + reflection

## Common Anti-Patterns (Avoid These)

**Infinite loops:**
```
Bad: Agent keeps researching without ever deciding
Fix: Set max iterations, require decision after N steps
```

**Tool addiction:**
```
Bad: Agent uses 10 tools for simple question
Fix: Teach when NOT to use tools
```

**Over-planning:**
```
Bad: Spends an hour planning a 5-minute task
Fix: Plan complexity should match task complexity
```

**No error handling:**
```
Bad: First API error crashes entire workflow
Fix: Retry logic, fallbacks, graceful degradation
```

## Pattern Selection Guide

| Task Type | Recommended Pattern | Why |
|-----------|---------------------|-----|
| Research | ReAct | Need to adapt based on findings |
| Analysis | Chain-of-Thought | Reasoning matters more than action |
| Long projects | Planning | Need overview and estimates |
| Creative work | Reflection | Quality through iteration |
| Complex systems | Multi-agent | Different expertise needed |
| Recurring tasks | Memory-augmented | Learn from experience |
| Critical outputs | Verification | Accuracy is paramount |

## Next Steps

Now that you understand the patterns, try:
1. [Building Your First Agent](./first-agent.md) - Hands-on implementation
2. [Multi-Agent Systems](./multi-agent-systems.md) - When one agent isn't enough
3. [Agent Safety](./agent-safety.md) - Keeping agents under control

**Practice:** Take a real task you do and map it to one of these patterns. Which fits best?
