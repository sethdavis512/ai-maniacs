---
sidebar_position: 3
---

# Understanding Context Components

## Learning Objectives

By the end of this lesson, you will be able to:

- Identify the four main components of an MCP context
- Explain the purpose of Identity, Instructions, Documents, and Tools
- Create simple examples of each component
- Understand how components work together to structure AI behavior

## Prerequisites

- Completed: [Introduction to MCP](./introduction.md)
- Understanding of basic JSON structure
- Familiarity with AI prompt concepts

## The Four Building Blocks of MCP

Every MCP context is built from four main components, like building blocks that work together:

1. **Identity** 👤 - Who is using the AI and in what role?
2. **Instructions** 📝 - What should the AI do and how should it behave?
3. **Documents** 📄 - What information should the AI reference?
4. **Tools** 🔧 - What actions can the AI take?

Let's explore each component with simple, practical examples.

## 1. Identity Component 👤

**Purpose**: Define who is using the AI and what permissions they have.

Think of Identity as an "ID badge" that tells the AI who it's working with and what they're allowed to do.

### Basic Identity Structure

```json
{
  "identity": {
    "user_id": "sarah_123",
    "role": "customer_support_agent",
    "permissions": ["read_customer_data", "update_ticket_status"],
    "department": "support_team"
  }
}
```

### Real-World Identity Examples

**Example 1: Student using educational AI**

```json
{
  "identity": {
    "user_id": "student_emma",
    "role": "high_school_student", 
    "grade_level": "11th",
    "subject_focus": "mathematics",
    "permissions": ["access_homework_help", "view_progress"]
  }
}
```

**Example 2: Manager using business AI**

```json
{
  "identity": {
    "user_id": "manager_john",
    "role": "team_lead",
    "department": "marketing",
    "permissions": ["view_team_data", "approve_campaigns", "access_analytics"]
  }
}
```

### Why Identity Matters

- **Security**: Ensures users only access what they should
- **Personalization**: AI adapts to user's role and needs
- **Accountability**: Track who did what with the AI system

## 2. Instructions Component 📝

**Purpose**: Tell the AI how to behave, what tone to use, and what rules to follow.

Instructions are like a "job description" for your AI - they define personality, style, and boundaries.

### Basic Instructions Structure

```json
{
  "instructions": {
    "system": "You are a helpful customer support agent",
    "style": "friendly but professional",
    "constraints": ["always_verify_identity", "escalate_billing_over_$500"],
    "tone": "patient and understanding"
  }
}
```

### Real-World Instructions Examples

**Example 1: Personal fitness coach AI**

```json
{
  "instructions": {
    "system": "You are a supportive fitness coach helping users reach their health goals",
    "style": "encouraging and motivational",
    "constraints": [
      "never_recommend_extreme_diets",
      "always_suggest_consulting_doctor_for_injuries",
      "focus_on_sustainable_habits"
    ],
    "tone": "upbeat but not pushy"
  }
}
```

**Example 2: Code review assistant**

```json
{
  "instructions": {
    "system": "You review code for security issues and best practices",
    "style": "constructive and educational",
    "constraints": [
      "focus_on_security_first",
      "explain_why_changes_needed",
      "suggest_specific_improvements"
    ],
    "tone": "helpful teacher, not critic"
  }
}
```

### Instruction Categories

- **System**: Core purpose and role definition
- **Style**: How to communicate and interact
- **Constraints**: Rules and boundaries that must be followed
- **Tone**: Emotional approach and personality

## 3. Documents Component 📄

**Purpose**: Provide the AI with specific information to reference and use.

Documents are like giving the AI a "reference library" of information it can use to answer questions accurately.

### Basic Documents Structure

```json
{
  "documents": [
    {
      "id": "company_policies",
      "type": "policy_guide",
      "content": "Customer refund policy allows full refunds within 30 days...",
      "last_updated": "2025-08-01"
    },
    {
      "id": "product_catalog", 
      "type": "product_data",
      "pointer": "database://products/current",
      "description": "Current product listings and specifications"
    }
  ]
}
```

### Document Types and Examples

**Direct Content Documents** (information included directly):

```json
{
  "id": "troubleshooting_steps",
  "type": "procedure",
  "content": {
    "wifi_issues": [
      "Check if router is powered on",
      "Restart device", 
      "Check network settings"
    ]
  }
}
```

**Pointer Documents** (references to external data):

```json
{
  "id": "customer_history",
  "type": "customer_data",
  "pointer": "customer_db://user_12345/history",
  "access_level": "support_agent_read_only"
}
```

### When to Use Documents

- **Knowledge Base**: Company policies, procedures, FAQs
- **Personal Data**: User preferences, history, settings
- **Real-time Data**: Current inventory, live system status
- **Reference Materials**: Documentation, guides, specifications

## 4. Tools Component 🔧

**Purpose**: Define what actions the AI can take in the real world.

Tools are like giving the AI "hands" - specific capabilities to interact with systems and perform tasks.

### Basic Tools Structure

```json
{
  "tools": [
    {
      "name": "send_email",
      "description": "Send email to customer",
      "schema": {
        "to": "email_address",
        "subject": "string",
        "body": "string"
      },
      "permissions_required": ["email_send"]
    },
    {
      "name": "lookup_order",
      "description": "Find customer order details",
      "schema": {
        "order_id": "string"
      },
      "permissions_required": ["order_read"]
    }
  ]
}
```

### Tool Examples by Category

**Information Lookup Tools**:

```json
{
  "name": "check_weather",
  "description": "Get current weather for a location",
  "schema": {
    "location": "string",
    "units": "celsius|fahrenheit"
  }
}
```

**Communication Tools**:

```json
{
  "name": "schedule_meeting",
  "description": "Book a meeting in calendar",
  "schema": {
    "title": "string",
    "duration_minutes": "number",
    "attendees": ["email_addresses"]
  }
}
```

**Data Modification Tools**:

```json
{
  "name": "update_customer_status",
  "description": "Change customer account status",
  "schema": {
    "customer_id": "string",
    "new_status": "active|inactive|suspended"
  },
  "approval_required": true
}
```

### Tool Safety Considerations

- **Permissions**: What roles can use each tool
- **Approval**: Which actions need human approval
- **Limits**: Rate limits, spending caps, scope restrictions
- **Logging**: Track all tool usage for audit trails

## How Components Work Together

Let's see all four components working together in a complete example:

### Example: Personal Shopping Assistant

```json
{
  "context_id": "shopping_assistant_v1",
  "identity": {
    "user_id": "shopper_lisa",
    "role": "budget_conscious_shopper",
    "preferences": {
      "budget_limit": 200,
      "style": "casual",
      "size": "medium"
    }
  },
  "instructions": {
    "system": "Help user find products within budget that match their style",
    "style": "friendly shopping buddy",
    "constraints": [
      "never_exceed_budget_limit",
      "prioritize_user_preferences",
      "suggest_alternatives_if_item_unavailable"
    ]
  },
  "documents": [
    {
      "id": "user_purchase_history",
      "type": "transaction_data",
      "content": {
        "favorite_brands": ["Nike", "Adidas"],
        "past_purchases": ["running_shoes", "casual_dress"]
      }
    },
    {
      "id": "current_sales",
      "type": "promotion_data",
      "pointer": "store_api://current_promotions"
    }
  ],
  "tools": [
    {
      "name": "search_products",
      "description": "Find products matching criteria",
      "schema": {
        "category": "string",
        "max_price": "number",
        "brand": "string"
      }
    },
    {
      "name": "add_to_cart",
      "description": "Add item to shopping cart",
      "schema": {
        "product_id": "string",
        "quantity": "number"
      }
    }
  ]
}
```

## Component Interaction Flow

1. **Identity** establishes who the user is and their budget limit
2. **Instructions** define helpful, budget-conscious behavior
3. **Documents** provide purchase history and current sales data
4. **Tools** enable product search and cart management

The AI now knows:

- Who it's helping (budget-conscious shopper named Lisa)
- How to behave (friendly, stay within budget)
- What information to use (preferences, sales, history)
- What actions it can take (search, add to cart)

## Common Component Patterns

### Pattern 1: Role-Based Access

```json
{
  "identity": {"role": "manager"},
  "tools": [
    {"name": "view_reports", "permissions_required": ["manager_level"]},
    {"name": "approve_expense", "permissions_required": ["manager_level"]}
  ]
}
```

### Pattern 2: Context-Aware Instructions

```json
{
  "instructions": {
    "system": "Adapt response based on user's experience level",
    "constraints": [
      "if_beginner_explain_basics",
      "if_expert_provide_advanced_details"
    ]
  },
  "documents": [
    {"id": "user_skill_level", "content": {"experience": "beginner"}}
  ]
}
```

### Pattern 3: Progressive Tool Access

```json
{
  "tools": [
    {"name": "read_data", "permissions_required": ["basic_user"]},
    {"name": "modify_data", "permissions_required": ["editor"]},
    {"name": "delete_data", "permissions_required": ["admin"], "approval_required": true}
  ]
}
```

## Hands-On Exercise: Build Your Components

**Scenario**: Create MCP components for an AI study buddy that helps college students with homework.

**Your Task**: Design each component for this context:

1. **Identity**: College student, sophomore level, studying computer science
2. **Instructions**: Helpful tutor that encourages learning, doesn't give direct answers
3. **Documents**: Course syllabus, student's previous assignments
4. **Tools**: Search course materials, create study schedule, set reminders

**Try it yourself** before looking at the solution below!

### Exercise Solution

```json
{
  "identity": {
    "user_id": "student_alex",
    "role": "college_student",
    "year": "sophomore",
    "major": "computer_science",
    "permissions": ["access_course_materials", "view_own_grades"]
  },
  "instructions": {
    "system": "You are a patient tutor helping a computer science student learn",
    "style": "encouraging and socratic - guide students to answers",
    "constraints": [
      "never_give_direct_homework_answers",
      "explain_concepts_with_examples",
      "break_complex_problems_into_steps"
    ],
    "tone": "supportive mentor"
  },
  "documents": [
    {
      "id": "cs101_syllabus",
      "type": "course_material",
      "content": {
        "topics": ["variables", "loops", "functions", "data_structures"],
        "current_unit": "functions"
      }
    },
    {
      "id": "student_progress",
      "type": "academic_record",
      "content": {
        "completed_assignments": ["hw1_variables", "hw2_loops"],
        "struggle_areas": ["debugging", "algorithm_design"]
      }
    }
  ],
  "tools": [
    {
      "name": "search_course_materials",
      "description": "Find relevant course content and examples",
      "schema": {"topic": "string", "difficulty": "beginner|intermediate|advanced"}
    },
    {
      "name": "create_study_schedule",
      "description": "Generate personalized study plan",
      "schema": {"subject": "string", "hours_available": "number"}
    }
  ]
}
```

## Knowledge Check

Test your understanding of MCP components:

1. **Identity Question**: What's the difference between `user_id` and `role` in the identity component?

2. **Instructions Question**: Why would you put a constraint in instructions rather than just explaining it in the system message?

3. **Documents Question**: When would you use a pointer document instead of including content directly?

4. **Tools Question**: What safety considerations should you have when giving an AI tools that can modify data?

## What's Next?

Now that you understand the four building blocks, you're ready to put them together! In the next lesson, we'll walk through **building your first complete MCP context** step-by-step.

**Ready to build?** Let's create your [First MCP Context →](./first-context.md)

---

## Quick Reference Card

| Component | Purpose | Key Question |
|-----------|---------|--------------|
| **Identity** 👤 | Who is using the AI? | "What role and permissions does this user have?" |
| **Instructions** 📝 | How should AI behave? | "What's the AI's job and personality?" |
| **Documents** 📄 | What info to reference? | "What knowledge does the AI need access to?" |
| **Tools** 🔧 | What actions can AI take? | "What can the AI actually do in the world?" |

**Remember**: All four components work together to create predictable, reliable AI behavior!
