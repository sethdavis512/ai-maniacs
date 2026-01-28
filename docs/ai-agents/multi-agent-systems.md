---
sidebar_position: 6
title: Multi-Agent Systems
description: Learn how to orchestrate multiple AI agents working together on complex tasks - from simple pipelines to collaborative teams.
keywords: [multi-agent systems, agent orchestration, CrewAI, agent collaboration, AI teams]
---

# Multi-Agent Systems

Sometimes one agent isn't enough. Multi-agent systems coordinate specialized agents to tackle complex problems.

## When You Need Multiple Agents

**Single agent is fine for:**
- Focused, well-defined tasks
- One domain of expertise
- Linear workflows

**Multiple agents better for:**
- Complex projects requiring diverse skills
- Parallel execution for speed
- Quality through peer review
- Specialized expertise per task

## Simple Multi-Agent Example

**Task:** Create a marketing campaign

**Single Agent:**
```
"Create a marketing campaign for our product"
→ Does everything (okay results)
```

**Multi-Agent Team:**
```
Research Agent → "Analyze target audience"
Strategy Agent → "Develop positioning"
Writer Agent → "Create content"
Designer Agent → "Generate visuals"
Editor Agent → "Review and refine"
```
→ Better results through specialization

## Multi-Agent Architectures

### 1. Sequential Pipeline

Agents pass work down a line:

```
Agent A → Agent B → Agent C → Output
```

**Example: Content Production**
```
Researcher → Writer → Editor → Publisher
```

**When to use:**
- Clear sequential steps
- Each agent builds on previous work
- Quality improves through stages

### 2. Parallel with Aggregation

Multiple agents work simultaneously:

```
        → Agent A →
Input → → Agent B → Aggregator → Output
        → Agent C →
```

**Example: Comprehensive Research**
```
           → Web Search Agent →
Question → → Academic Search → Synthesizer → Answer
           → Database Query →
```

**When to use:**
- Speed is critical
- Diverse data sources
- Tasks can run independently

### 3. Hierarchical (Manager-Worker)

Manager delegates to specialists:

```
    Manager Agent
    ├── Worker Agent 1
    ├── Worker Agent 2
    └── Worker Agent 3
```

**Example: Software Development**
```
    Project Manager Agent
    ├── Backend Developer Agent
    ├── Frontend Developer Agent
    └── QA Agent
```

**When to use:**
- Complex projects with subtasks
- Need coordination and planning
- Dynamic task allocation

### 4. Collaborative (Debate/Discussion)

Agents discuss and reach consensus:

```
Agent A ←→ Agent B ←→ Agent C → Consensus
```

**Example: Decision Making**
```
Optimist ←→ Pessimist ←→ Realist → Balanced Decision
```

**When to use:**
- Decisions with tradeoffs
- Need diverse perspectives
- Quality through peer review

## Building with CrewAI

**Most popular framework for multi-agent systems**

### Installation

```bash
pip install crewai crewai-tools
```

### Example: Content Marketing Crew

```python
from crewai import Agent, Task, Crew
from crewai_tools import SerperDevTool, WebsiteSearchTool

# Define agents
researcher = Agent(
    role='Market Researcher',
    goal='Find trending topics in AI',
    backstory='Expert at identifying market trends',
    tools=[SerperDevTool()],
    verbose=True
)

writer = Agent(
    role='Content Writer',
    goal='Write engaging blog posts',
    backstory='Skilled technical writer',
    verbose=True
)

editor = Agent(
    role='Editor',
    goal='Ensure quality and accuracy',
    backstory='Detail-oriented editor',
    verbose=True
)

# Define tasks
research_task = Task(
    description='Research top 3 AI trends this month',
    agent=researcher,
    expected_output='List of trends with data'
)

writing_task = Task(
    description='Write 800-word blog post on findings',
    agent=writer,
    expected_output='Complete blog post'
)

editing_task = Task(
    description='Edit for clarity and accuracy',
    agent=editor,
    expected_output='Polished final post'
)

# Create crew
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    verbose=True
)

# Run the crew
result = crew.kickoff()
print(result)
```

### Run It

```bash
export OPENAI_API_KEY=your_key
python marketing_crew.py
```

The agents collaborate to produce a polished blog post!

## Building with LangGraph

**For more control and complex workflows**

### Example: Research & Analysis Crew

```python
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from typing import TypedDict, List

# Define state
class AgentState(TypedDict):
    topic: str
    research_results: List[str]
    analysis: str
    final_report: str

# Initialize model
llm = ChatAnthropic(model="claude-sonnet-4-5-20250929")

# Define agent functions
def research_agent(state: AgentState):
    """Agent 1: Research"""
    topic = state["topic"]

    prompt = f"Research {topic} from multiple sources. Provide 3-5 key findings."
    response = llm.invoke(prompt)

    return {
        **state,
        "research_results": [response.content]
    }

def analysis_agent(state: AgentState):
    """Agent 2: Analysis"""
    results = state["research_results"]

    prompt = f"Analyze these findings and identify patterns:\n{results}"
    response = llm.invoke(prompt)

    return {
        **state,
        "analysis": response.content
    }

def report_agent(state: AgentState):
    """Agent 3: Report Writer"""
    analysis = state["analysis"]

    prompt = f"Create executive summary from this analysis:\n{analysis}"
    response = llm.invoke(prompt)

    return {
        **state,
        "final_report": response.content
    }

# Build graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("research", research_agent)
workflow.add_node("analysis", analysis_agent)
workflow.add_node("report", report_agent)

# Define edges
workflow.set_entry_point("research")
workflow.add_edge("research", "analysis")
workflow.add_edge("analysis", "report")
workflow.add_edge("report", END)

# Compile
app = workflow.compile()

# Run
result = app.invoke({
    "topic": "AI code editors 2026",
    "research_results": [],
    "analysis": "",
    "final_report": ""
})

print(result["final_report"])
```

## Communication Between Agents

### Shared Memory

All agents read/write to common database:

```python
class SharedMemory:
    def __init__(self):
        self.data = {}

    def write(self, key, value):
        self.data[key] = value

    def read(self, key):
        return self.data.get(key)

# Agents use shared memory
memory = SharedMemory()

# Agent 1 writes
memory.write("research", findings)

# Agent 2 reads
data = memory.read("research")
```

### Message Passing

Agents send explicit messages:

```python
class MessageBus:
    def __init__(self):
        self.messages = []

    def send(self, from_agent, to_agent, content):
        self.messages.append({
            "from": from_agent,
            "to": to_agent,
            "content": content
        })

    def receive(self, agent_name):
        return [m for m in self.messages if m["to"] == agent_name]
```

### Blackboard Pattern

Agents contribute to shared workspace:

```python
class Blackboard:
    """Shared workspace for agent collaboration"""

    def __init__(self):
        self.sections = {
            "research": [],
            "analysis": [],
            "recommendations": []
        }

    def contribute(self, section, content):
        self.sections[section].append(content)

    def get_section(self, section):
        return self.sections[section]
```

## Agent Coordination Strategies

### Strategy 1: Fixed Roles

Each agent has specific responsibility:

```python
agents = {
    "researcher": ResearchAgent(),
    "analyst": AnalysisAgent(),
    "writer": WriterAgent()
}

# Fixed workflow
results = agents["researcher"].execute(topic)
analysis = agents["analyst"].execute(results)
report = agents["writer"].execute(analysis)
```

### Strategy 2: Dynamic Allocation

Manager assigns tasks based on capability:

```python
class ManagerAgent:
    def __init__(self, workers):
        self.workers = workers

    def delegate(self, task):
        # Choose best worker for task
        best_agent = self.select_agent(task)
        return best_agent.execute(task)

    def select_agent(self, task):
        # Logic to match task to agent
        if task.type == "research":
            return self.workers["researcher"]
        elif task.type == "analysis":
            return self.workers["analyst"]
```

### Strategy 3: Auction-Based

Agents bid on tasks:

```python
class AuctionCoordinator:
    def __init__(self, agents):
        self.agents = agents

    def assign_task(self, task):
        # Agents submit bids
        bids = [agent.bid(task) for agent in self.agents]

        # Highest bidder gets task
        winner = max(bids, key=lambda b: b.confidence)
        return winner.agent.execute(task)
```

## Real-World Multi-Agent Examples

### Example 1: Customer Support System

```
Tier 1 Agent (Initial Response)
    ├─ If simple → Resolve & close
    ├─ If technical → Technical Agent
    ├─ If billing → Billing Agent
    └─ If complex → Escalation Agent
```

**Benefits:**
- Faster resolution
- Specialized expertise
- Better customer experience

### Example 2: Software Development Team

```
Product Manager Agent (Planning)
    ↓
    ├─ Backend Agent (API development)
    ├─ Frontend Agent (UI development)
    ├─ QA Agent (Testing)
    └─ DevOps Agent (Deployment)
```

**Benefits:**
- Parallel development
- Specialized knowledge
- Better code quality

### Example 3: Investment Research

```
Data Agent → Financial Agent → Risk Agent → Report Agent
                ↑                   ↓
         Market Sentiment Agent ←←←←←
```

**Benefits:**
- Comprehensive analysis
- Multiple perspectives
- Risk-aware recommendations

## Challenges & Solutions

### Challenge 1: Agent Conflicts

**Problem:** Agents disagree on approach

**Solutions:**
- Voting system
- Confidence scores
- Human arbiter for critical decisions

```python
def resolve_conflict(agent_outputs):
    # Vote on best output
    votes = [agent.vote(outputs) for agent in agents]
    return max(votes, key=votes.count)
```

### Challenge 2: Infinite Loops

**Problem:** Agents keep passing work back and forth

**Solutions:**
- Max iteration limits
- Progress requirements
- Circuit breakers

```python
max_rounds = 10
for round in range(max_rounds):
    if task_complete:
        break
    result = next_agent.execute(state)
```

### Challenge 3: Cost Explosion

**Problem:** Multiple agents = multiple API calls

**Solutions:**
- Smaller models for simple agents
- Caching repeated queries
- Budget limits

```python
class CostAwareAgent:
    def __init__(self, budget):
        self.budget = budget
        self.spent = 0

    def execute(self, task):
        cost = estimate_cost(task)
        if self.spent + cost > self.budget:
            raise BudgetExceeded()
        # Execute task
        self.spent += cost
```

### Challenge 4: Coordination Overhead

**Problem:** Managing agents takes longer than single agent

**Solutions:**
- Use multi-agent only when beneficial
- Optimize communication
- Async execution where possible

## Tools & Frameworks

**CrewAI** - Easiest for role-based teams
- [crewai.com](https://crewai.com)

**LangGraph** - Most flexible for complex workflows
- [langchain.com/langgraph](https://langchain.com/langgraph)

**AutoGen** - Microsoft's framework
- [github.com/microsoft/autogen](https://github.com/microsoft/autogen)

**AgentScope** - Production-ready framework
- [github.com/modelscope/agentscope](https://github.com/modelscope/agentscope)

## Testing Multi-Agent Systems

### Unit Test Each Agent

```python
def test_research_agent():
    agent = ResearchAgent()
    result = agent.research("AI trends")
    assert len(result) > 0
    assert "sources" in result
```

### Integration Test

```python
def test_agent_collaboration():
    crew = create_crew()
    result = crew.execute("Create blog post")

    assert result["research"] is not None
    assert result["content"] is not None
    assert result["final"] is not None
```

### Monitor in Production

```python
class AgentMonitor:
    def log_execution(self, agent_name, task, result, duration):
        # Track performance
        metrics.record({
            "agent": agent_name,
            "task": task,
            "success": result.success,
            "duration": duration
        })
```

## When to Use Multi-Agent

**Use single agent if:**
- ✓ Task is straightforward
- ✓ One domain of expertise
- ✓ Speed matters most
- ✓ Simple is better

**Use multi-agent if:**
- ✓ Complex problem with subtasks
- ✓ Need specialized expertise
- ✓ Quality > speed
- ✓ Want peer review/validation
- ✓ Parallel execution beneficial

## Next Steps

1. **Start simple:** Build sequential pipeline with 2-3 agents
2. **Use frameworks:** Try CrewAI or LangGraph
3. **Measure value:** Does multi-agent improve results?
4. **Optimize:** Remove agents that don't add value
5. **Learn more:** [Agent Safety](./agent-safety.md) for production deployment

**Resources:**
- [CrewAI Examples](https://github.com/joaomdmoura/crewAI-examples)
- [LangGraph Tutorials](https://langchain.com/docs/langgraph)
- [Multi-Agent Papers](https://github.com/thunlp/MAE)

Multi-agent systems are powerful but complex. Start simple, prove value, then scale up!
