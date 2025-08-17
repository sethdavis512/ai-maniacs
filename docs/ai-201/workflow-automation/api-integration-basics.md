---
sidebar_position: 1
---

# API Integration Basics

Moving beyond simple chat interfaces, you'll learn to integrate AI into your workflows through APIs (Application Programming Interfaces). This opens up powerful automation possibilities and custom solutions.

## Understanding AI APIs

### What APIs Enable

**Direct Integration:**

- Embed AI capabilities into existing applications
- Automate repetitive AI tasks
- Process large volumes of data
- Build custom user interfaces

**Key Advantages:**

- **Programmable**: Define exact behavior and workflows
- **Scalable**: Handle multiple requests simultaneously  
- **Customizable**: Tailor responses to specific needs
- **Efficient**: Avoid manual copy-paste workflows

### Popular AI API Providers

**OpenAI API:**

- GPT models for text generation
- DALL-E for image generation
- Whisper for speech-to-text
- Embeddings for semantic search

**Anthropic Claude API:**

- Conversational AI with safety focus
- Long context windows
- Strong reasoning capabilities
- Constitutional AI approach

**Google AI Platform:**

- Gemini models for multimodal tasks
- Vertex AI for enterprise solutions
- Vision and Translation APIs
- AutoML for custom models

**Microsoft Azure OpenAI:**

- Enterprise-grade OpenAI models
- Enhanced security and compliance
- Integration with Microsoft ecosystem
- Custom deployment options

## Getting Started with APIs

### API Authentication

Most AI APIs require authentication through API keys:

```python
# Example API key setup
import openai

# Set your API key (keep this secure!)
openai.api_key = "your-api-key-here"

# Or use environment variables (recommended)
import os
openai.api_key = os.getenv("OPENAI_API_KEY")
```

**Security Best Practices:**

- Never hardcode API keys in your code
- Use environment variables or secure key management
- Rotate keys regularly
- Monitor usage for unusual activity
- Set spending limits and alerts

### Basic API Request Structure

Most AI APIs follow similar patterns:

```python
# Basic OpenAI API call
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    max_tokens=500,
    temperature=0.7
)

print(response.choices[0].message.content)
```

**Key Parameters:**

- **model**: Which AI model to use
- **messages**: Conversation history and context
- **max_tokens**: Response length limit
- **temperature**: Creativity level (0=deterministic, 1=creative)

## Workflow Integration Patterns

### Batch Processing

Process multiple items efficiently:

```python
def process_articles(articles):
    results = []
    for article in articles:
        prompt = f"Summarize this article in 2 sentences: {article}"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100
        )
        results.append(response.choices[0].message.content)
    return results

# Process 100 articles automatically
article_summaries = process_articles(my_articles)
```

### Data Pipeline Integration

Incorporate AI into data processing workflows:

```python
def analyze_customer_feedback(feedback_text):
    # Step 1: Sentiment analysis
    sentiment_prompt = f"Analyze the sentiment of this feedback: {feedback_text}"
    sentiment = get_ai_response(sentiment_prompt)
    
    # Step 2: Extract key themes
    themes_prompt = f"Extract main themes from: {feedback_text}"
    themes = get_ai_response(themes_prompt)
    
    # Step 3: Suggest actions
    action_prompt = f"Based on this feedback, suggest 3 specific actions: {feedback_text}"
    actions = get_ai_response(action_prompt)
    
    return {
        "sentiment": sentiment,
        "themes": themes,
        "suggested_actions": actions
    }
```

### Real-time Processing

Handle live data streams:

```python
def process_support_ticket(ticket):
    # Classify urgency
    urgency = classify_urgency(ticket.content)
    
    # Route to appropriate team
    team = determine_team(ticket.content)
    
    # Generate initial response draft
    response_draft = generate_response(ticket.content)
    
    return {
        "urgency": urgency,
        "assigned_team": team,
        "draft_response": response_draft
    }
```

## Building AI-Powered Applications

### Content Management System

Automate content creation and optimization:

```python
class AIContentManager:
    def __init__(self, api_key):
        self.client = openai.OpenAI(api_key=api_key)
    
    def generate_blog_post(self, topic, audience, length):
        prompt = f"""
        Write a {length}-word blog post about {topic} for {audience}.
        Include:
        - Engaging introduction
        - 3-5 main points with examples
        - Actionable conclusion
        - SEO-friendly structure
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=length * 2  # Rough token estimation
        )
        
        return response.choices[0].message.content
    
    def optimize_for_seo(self, content, keywords):
        prompt = f"""
        Optimize this content for SEO with these keywords: {keywords}
        Original content: {content}
        
        Provide:
        1. Optimized title
        2. Meta description
        3. Improved content with natural keyword integration
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content
```

### Customer Service Automation

Build intelligent support systems:

```python
class AICustomerSupport:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
    
    def handle_inquiry(self, customer_message):
        # Search relevant information
        relevant_info = self.search_knowledge_base(customer_message)
        
        # Generate response
        prompt = f"""
        Customer inquiry: {customer_message}
        
        Relevant information: {relevant_info}
        
        Provide a helpful, professional response that:
        - Addresses the customer's specific question
        - Uses the relevant information provided
        - Offers additional assistance if needed
        - Maintains a friendly, supportive tone
        """
        
        response = self.generate_response(prompt)
        return response
    
    def escalate_if_needed(self, inquiry, response):
        # Determine if human intervention is needed
        escalation_check = f"""
        Should this inquiry be escalated to a human agent?
        Inquiry: {inquiry}
        AI Response: {response}
        
        Escalate if: complex problem, customer dissatisfaction, requires human judgment
        Return: YES or NO with brief reason
        """
        
        return self.generate_response(escalation_check)
```

## Error Handling and Reliability

### Rate Limiting

Manage API usage responsibly:

```python
import time
from functools import wraps

def rate_limit(calls_per_minute=60):
    def decorator(func):
        last_called = [0.0]
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = 60.0 / calls_per_minute - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

@rate_limit(calls_per_minute=30)
def call_ai_api(prompt):
    # Your API call here
    pass
```

### Retry Logic

Handle temporary failures gracefully:

```python
import random
import time

def retry_with_backoff(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            
            # Exponential backoff with jitter
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(wait_time)
    
    return None

# Usage
response = retry_with_backoff(lambda: openai.ChatCompletion.create(...))
```

### Cost Management

Monitor and control API costs:

```python
class CostTracker:
    def __init__(self):
        self.usage_log = []
        self.monthly_budget = 1000  # dollars
    
    def log_usage(self, model, tokens, cost):
        self.usage_log.append({
            "timestamp": time.time(),
            "model": model,
            "tokens": tokens,
            "cost": cost
        })
    
    def check_budget(self):
        current_month_cost = sum(
            log["cost"] for log in self.usage_log 
            if log["timestamp"] > time.time() - 30*24*3600
        )
        
        if current_month_cost > self.monthly_budget * 0.9:
            print("Warning: Approaching monthly budget limit")
        
        return current_month_cost
```

## Testing and Validation

### A/B Testing AI Responses

Compare different prompts or models:

```python
def ab_test_prompts(prompt_a, prompt_b, test_cases):
    results_a = []
    results_b = []
    
    for test_case in test_cases:
        response_a = get_ai_response(prompt_a.format(input=test_case))
        response_b = get_ai_response(prompt_b.format(input=test_case))
        
        results_a.append(evaluate_response(response_a, test_case))
        results_b.append(evaluate_response(response_b, test_case))
    
    return {
        "prompt_a_score": sum(results_a) / len(results_a),
        "prompt_b_score": sum(results_b) / len(results_b)
    }
```

### Quality Assurance

Implement automated quality checks:

```python
def validate_ai_output(response, expected_criteria):
    checks = {
        "length": len(response) > expected_criteria["min_length"],
        "contains_keywords": all(
            keyword in response.lower() 
            for keyword in expected_criteria["required_keywords"]
        ),
        "appropriate_tone": check_tone(response, expected_criteria["tone"]),
        "factual_accuracy": verify_facts(response)
    }
    
    return all(checks.values()), checks
```

## Hands-On Exercise

Build a simple AI-powered tool:

**Project: Article Analyzer**

1. Create a script that takes article URLs
2. Extract article content
3. Use AI to:
   - Summarize the article
   - Extract key topics
   - Determine reading difficulty
   - Suggest related articles

```python
def analyze_article(url):
    # Extract content (pseudo-code)
    content = extract_article_content(url)
    
    # AI analysis
    summary = generate_summary(content)
    topics = extract_topics(content)
    difficulty = assess_difficulty(content)
    
    return {
        "url": url,
        "summary": summary,
        "topics": topics,
        "difficulty": difficulty
    }
```

## Key Takeaways

- **APIs enable programmatic** AI integration beyond chat interfaces
- **Authentication and security** are critical for production systems
- **Error handling and retries** ensure reliable automated workflows
- **Cost monitoring** prevents unexpected expenses
- **Testing and validation** maintain output quality
- **Rate limiting** respects API provider constraints

## What's Next?

Now that you understand API integration basics, let's explore more sophisticated automation patterns and tools that can orchestrate complex AI workflows.
