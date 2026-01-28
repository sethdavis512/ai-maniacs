---
sidebar_position: 7
title: MCP Integration for Agents
description: Connect your AI agents to tools, databases, and APIs using Model Context Protocol (MCP). Practical guide to building and using MCP servers.
keywords: [MCP integration, Model Context Protocol, AI tools, agent tools, MCP servers, Claude MCP]
---

# MCP Integration for Agents

Model Context Protocol (MCP) is how agents access tools, databases, and external data. This guide shows you how to use and build MCP servers.

## Why Agents Need MCP

**Without MCP:**
```
Agent: "I need to check our database"
You: [Manually query database]
You: [Copy results to agent]
Agent: [Analyzes data]
```

**With MCP:**
```
Agent: "Check database for X"
→ Automatically queries via MCP
→ Gets results
→ Analyzes and reports
```

**The difference:** Autonomous tool access vs manual tool use.

## MCP Architecture

```
┌─────────────┐
│  AI Agent   │ (Claude, ChatGPT, etc.)
└──────┬──────┘
       │
       │ MCP Protocol
       │
┌──────┴──────┐
│ MCP Server  │ (Your tool/data connector)
└──────┬──────┘
       │
┌──────┴──────┐
│ External    │ (Database, API, filesystem, etc.)
│ Resources   │
└─────────────┘
```

**MCP Server** exposes 3 things:

1. **Tools** - Functions agent can call
2. **Resources** - Data agent can read
3. **Prompts** - Pre-packaged instructions

## Using Existing MCP Servers

### Setup in Claude Desktop

**1. Install server:**
```bash
# Example: GitHub MCP server
npm install -g @anthropics/mcp-server-github
```

**2. Configure Claude:**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "your_github_token"
      }
    }
  }
}
```

**3. Restart Claude Desktop**

**4. Claude now has GitHub access:**
```
You: "What open issues do we have in the main repo?"
Claude: [Uses MCP to query GitHub]
        [Returns current issues]
```

### Popular Official Servers

**Filesystem Access:**
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@anthropics/mcp-server-filesystem", "/path/to/allowed/directory"]
  }
}
```

**Slack Integration:**
```json
{
  "slack": {
    "command": "npx",
    "args": ["-y", "@anthropics/mcp-server-slack"],
    "env": {
      "SLACK_BOT_TOKEN": "xoxb-your-token",
      "SLACK_TEAM_ID": "T1234567"
    }
  }
}
```

**PostgreSQL Database:**
```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@anthropics/mcp-server-postgres", "postgresql://user:pass@localhost/db"]
  }
}
```

**Google Drive:**
```json
{
  "gdrive": {
    "command": "npx",
    "args": ["-y", "@anthropics/mcp-server-gdrive"],
    "env": {
      "GOOGLE_CLIENT_ID": "your_client_id",
      "GOOGLE_CLIENT_SECRET": "your_secret"
    }
  }
}
```

### Using Multiple Servers

Claude can use all configured servers simultaneously:

```json
{
  "mcpServers": {
    "github": { /* config */ },
    "postgres": { /* config */ },
    "slack": { /* config */ },
    "filesystem": { /* config */ }
  }
}
```

**Example task using multiple servers:**
```
You: "Check GitHub issues, query the database for related bugs,
      and post a summary to Slack"

Claude: [Uses GitHub MCP → Postgres MCP → Slack MCP]
        [Completes entire workflow]
```

## Building Your First MCP Server

Let's build a simple MCP server that exposes a tool.

### Example: Weather Data Server (Python)

**1. Install MCP SDK:**
```bash
pip install mcp
```

**2. Create server:**

```python
# weather_server.py
import asyncio
import httpx
from mcp.server import Server
from mcp.types import Tool, TextContent

# Initialize server
app = Server("weather-server")

# Define tool
@app.tool()
async def get_weather(
    city: str,
    units: str = "metric"
) -> str:
    """
    Get current weather for a city.

    Args:
        city: City name (e.g., "San Francisco")
        units: Temperature units ("metric" or "imperial")
    """
    # Call weather API
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "q": city,
                "units": units,
                "appid": "your_api_key"
            }
        )
        data = response.json()

    # Format response
    temp = data["main"]["temp"]
    desc = data["weather"][0]["description"]
    unit = "°C" if units == "metric" else "°F"

    return f"{city}: {temp}{unit}, {desc}"

# Run server
if __name__ == "__main__":
    app.run()
```

**3. Configure in Claude:**

```json
{
  "weather": {
    "command": "python",
    "args": ["/path/to/weather_server.py"]
  }
}
```

**4. Use it:**
```
You: "What's the weather in Tokyo?"
Claude: [Calls get_weather via MCP]
        "Tokyo: 18°C, partly cloudy"
```

### Example: Custom Database Server

```python
# database_server.py
import asyncio
import sqlite3
from mcp.server import Server
from mcp.types import Tool

app = Server("custom-db-server")

@app.tool()
async def query_customers(
    status: str = None,
    limit: int = 10
) -> list:
    """
    Query customer database.

    Args:
        status: Filter by status (active, inactive, trial)
        limit: Max results to return
    """
    conn = sqlite3.connect('customers.db')
    cursor = conn.cursor()

    if status:
        cursor.execute(
            "SELECT * FROM customers WHERE status = ? LIMIT ?",
            (status, limit)
        )
    else:
        cursor.execute(
            "SELECT * FROM customers LIMIT ?",
            (limit,)
        )

    results = cursor.fetchall()
    conn.close()

    return results

@app.tool()
async def update_customer_status(
    customer_id: int,
    new_status: str
) -> str:
    """Update customer status."""
    conn = sqlite3.connect('customers.db')
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE customers SET status = ? WHERE id = ?",
        (new_status, customer_id)
    )

    conn.commit()
    conn.close()

    return f"Updated customer {customer_id} to {new_status}"

if __name__ == "__main__":
    app.run()
```

**Agent can now:**
```
"Find all trial customers who signed up this month"
→ Agent queries database via MCP

"Upgrade customer 1234 to active status"
→ Agent updates via MCP
```

## MCP Resources (Read-Only Data)

Resources are data the agent can read:

```python
from mcp.server import Server
from mcp.types import Resource

app = Server("docs-server")

@app.resource("docs://api-reference")
async def get_api_docs() -> str:
    """Provide API documentation"""
    with open("api_docs.md", "r") as f:
        return f.read()

@app.resource("docs://changelog")
async def get_changelog() -> str:
    """Provide version changelog"""
    with open("CHANGELOG.md", "r") as f:
        return f.read()
```

**Agent usage:**
```
You: "How do I use the authentication API?"
Claude: [Reads docs://api-reference via MCP]
        [Provides answer from docs]
```

## MCP Prompts (Pre-Packaged Instructions)

Prompts are reusable agent instructions:

```python
from mcp.types import Prompt, PromptArgument

@app.prompt()
async def analyze_user_feedback(
    feedback_source: str
) -> str:
    """Analyze customer feedback for themes"""
    return f"""
    Analyze feedback from {feedback_source}:

    1. Read all recent feedback entries
    2. Identify common themes and pain points
    3. Categorize by: Product, Service, Technical, Other
    4. Calculate sentiment scores
    5. Prioritize top 3 issues
    6. Suggest improvements

    Provide executive summary with action items.
    """
```

**Agent usage:**
```
You: "Run feedback analysis on support tickets"
Claude: [Loads analyze_user_feedback prompt]
        [Executes all steps]
        [Delivers report]
```

## Advanced MCP Patterns

### Pattern 1: Authentication

Secure MCP servers with auth:

```python
from mcp.server import Server
from mcp.types import Tool

app = Server("secure-server")

def verify_token(token: str) -> bool:
    """Verify API token"""
    # Check token validity
    return token == "expected_token"

@app.tool()
async def sensitive_operation(
    token: str,
    operation: str
) -> str:
    """Requires authentication"""
    if not verify_token(token):
        raise PermissionError("Invalid token")

    # Proceed with operation
    return f"Executed: {operation}"
```

### Pattern 2: Rate Limiting

Prevent abuse:

```python
import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_calls=10, period=60):
        self.max_calls = max_calls
        self.period = period
        self.calls = defaultdict(list)

    def check(self, identifier):
        now = time.time()
        cutoff = now - self.period

        # Remove old calls
        self.calls[identifier] = [
            t for t in self.calls[identifier]
            if t > cutoff
        ]

        # Check limit
        if len(self.calls[identifier]) >= self.max_calls:
            raise Exception("Rate limit exceeded")

        self.calls[identifier].append(now)

limiter = RateLimiter(max_calls=10, period=60)

@app.tool()
async def api_call(user_id: str, query: str):
    limiter.check(user_id)
    # Proceed with call
```

### Pattern 3: Caching

Cache expensive operations:

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=100)
def cached_api_call(query: str) -> str:
    """Cache results for repeated queries"""
    # Expensive operation
    result = expensive_api_call(query)
    return result

@app.tool()
async def smart_search(query: str) -> str:
    """Search with caching"""
    return cached_api_call(query)
```

### Pattern 4: Batch Operations

Handle multiple items efficiently:

```python
@app.tool()
async def batch_process(
    items: list[str],
    operation: str
) -> list:
    """Process multiple items in parallel"""
    async with asyncio.TaskGroup() as group:
        tasks = [
            group.create_task(process_item(item, operation))
            for item in items
        ]

    return [t.result() for t in tasks]
```

## Production MCP Best Practices

### 1. Error Handling

```python
@app.tool()
async def robust_tool(param: str) -> str:
    try:
        result = risky_operation(param)
        return result
    except ConnectionError:
        return "Service temporarily unavailable"
    except ValueError as e:
        return f"Invalid input: {e}"
    except Exception as e:
        # Log error
        logger.error(f"Unexpected error: {e}")
        return "An error occurred. Please try again."
```

### 2. Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.tool()
async def logged_tool(param: str) -> str:
    logger.info(f"Tool called with: {param}")

    try:
        result = operation(param)
        logger.info(f"Success: {result}")
        return result
    except Exception as e:
        logger.error(f"Failed: {e}")
        raise
```

### 3. Input Validation

```python
from pydantic import BaseModel, validator

class SearchParams(BaseModel):
    query: str
    limit: int = 10

    @validator('query')
    def query_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Query cannot be empty')
        return v

    @validator('limit')
    def limit_in_range(cls, v):
        if not 1 <= v <= 100:
            raise ValueError('Limit must be between 1 and 100')
        return v

@app.tool()
async def validated_search(
    query: str,
    limit: int = 10
) -> list:
    params = SearchParams(query=query, limit=limit)
    return perform_search(params.query, params.limit)
```

### 4. Monitoring

```python
import time
from prometheus_client import Counter, Histogram

# Metrics
tool_calls = Counter('mcp_tool_calls', 'Tool invocations')
tool_duration = Histogram('mcp_tool_duration', 'Tool execution time')

@app.tool()
async def monitored_tool(param: str) -> str:
    tool_calls.inc()

    start = time.time()
    try:
        result = operation(param)
        return result
    finally:
        duration = time.time() - start
        tool_duration.observe(duration)
```

## MCP Server Deployment

### Development

```bash
# Run locally
python mcp_server.py
```

### Production

**Option 1: Docker**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY mcp_server.py .

CMD ["python", "mcp_server.py"]
```

**Option 2: Systemd Service**
```ini
[Unit]
Description=MCP Server
After=network.target

[Service]
Type=simple
User=mcp
WorkingDirectory=/opt/mcp
ExecStart=/usr/bin/python3 /opt/mcp/server.py
Restart=always

[Install]
WantedBy=multi-user.target
```

**Option 3: Cloud Function**
Deploy as serverless function on AWS Lambda, Google Cloud Functions, etc.

## Testing MCP Servers

### Unit Tests

```python
import pytest
from mcp_server import app

@pytest.mark.asyncio
async def test_weather_tool():
    result = await app.call_tool("get_weather", {
        "city": "London",
        "units": "metric"
    })
    assert "London" in result
    assert "°C" in result
```

### Integration Tests

```python
@pytest.mark.asyncio
async def test_full_workflow():
    # Test agent using MCP server
    agent = Agent(mcp_servers=["weather"])

    response = await agent.execute(
        "What's the weather in Paris and Tokyo?"
    )

    assert "Paris" in response
    assert "Tokyo" in response
```

## MCP Registry & Discovery

**Find servers:**
- [modelcontextprotocol.io](https://modelcontextprotocol.io) - Official registry
- [GitHub MCP Topics](https://github.com/topics/mcp-server) - Community servers
- [Anthropic MCP Servers](https://github.com/anthropics/anthropic-mcp-servers) - Official collection

**Publish your server:**
1. Open source on GitHub
2. Add `mcp-server` topic
3. Submit to registry
4. Share in communities

## Common MCP Use Cases

**Development:**
- GitHub, GitLab integration
- Database query tools
- CI/CD pipeline access
- Log analysis tools

**Business:**
- CRM integration (Salesforce, HubSpot)
- Project management (Linear, Jira)
- Communication (Slack, Teams)
- Analytics (Google Analytics, Mixpanel)

**Data:**
- SQL databases
- NoSQL stores
- Data warehouses
- File systems

**External Services:**
- Weather APIs
- Maps and geocoding
- Payment processing
- Email services

## Next Steps

1. **Try existing servers:** Start with official Anthropic servers
2. **Build simple server:** Create a tool for your use case
3. **Learn frameworks:** Explore [agent frameworks](./multi-agent-systems.md) that support MCP
4. **Production deploy:** [Agent Safety](./agent-safety.md) for secure deployment

**Resources:**
- [MCP Specification](https://modelcontextprotocol.io/docs)
- [Python SDK Docs](https://github.com/anthropics/python-mcp-sdk)
- [TypeScript SDK](https://github.com/anthropics/typescript-mcp-sdk)
- [Community Examples](https://github.com/topics/mcp-server)

MCP is what makes agents truly autonomous. Master it and your agents can do anything!
