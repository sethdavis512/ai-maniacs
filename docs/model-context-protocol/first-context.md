# Building Your First MCP Context

## Learning Objectives

By the end of this lesson, you will be able to:

- Follow a step-by-step process to build a complete MCP context
- Validate your context structure for common mistakes
- Test your context with real examples
- Adapt the basic template for different use cases

## Prerequisites

- Completed: [Understanding Context Components](./context-components.md)
- Basic understanding of JSON syntax
- A specific use case in mind (we'll provide one if needed)

## Step-by-Step Tutorial: Personal Study Assistant

Let's build a complete MCP context together. We'll create an AI study assistant that helps you prepare for exams while keeping you motivated and on track.

### Step 1: Define Your Use Case

**Our Goal**: Create an AI that helps college students study effectively by:

- Providing study schedules based on available time
- Asking practice questions to test knowledge
- Offering encouragement and motivation
- Tracking study progress
- Suggesting breaks and study techniques

**Target User**: College student preparing for midterm exams

### Step 2: Build the Identity Component

Start with the most important question: **Who will use this AI?**

```json
{
  "identity": {
    "user_id": "student_sarah",
    "role": "college_student", 
    "academic_level": "junior",
    "major": "psychology",
    "current_courses": ["cognitive_psychology", "research_methods", "statistics"],
    "study_preferences": {
      "learning_style": "visual",
      "best_time": "evening",
      "session_length": "45_minutes"
    },
    "permissions": [
      "access_study_materials",
      "track_progress", 
      "receive_reminders"
    ]
  }
}
```

**Key Decisions Explained**:

- `user_id`: Unique identifier for this student
- `role`: Defines this is a student context (not teacher/tutor)
- `study_preferences`: Personalizes the AI's approach
- `permissions`: Limits what the AI can do for safety

### Step 3: Create the Instructions Component

Define **how the AI should behave** with this student:

```json
{
  "instructions": {
    "system": "You are a supportive study assistant helping a college student prepare for exams effectively",
    "personality": "encouraging, patient, and organized",
    "teaching_style": "socratic method - guide student to answers rather than giving them directly",
    "constraints": [
      "never_do_homework_for_student",
      "encourage_regular_breaks", 
      "adapt_to_visual_learning_style",
      "keep_sessions_to_45_minutes_max",
      "celebrate_small_wins"
    ],
    "communication_style": "friendly peer, not authoritative teacher",
    "motivation_approach": "positive reinforcement and progress tracking"
  }
}
```

**Key Decisions Explained**:

- `system`: Core purpose in one clear sentence
- `constraints`: Hard rules the AI must follow
- `teaching_style`: Matches educational best practices
- `motivation_approach`: Keeps student engaged

### Step 4: Add Documents Component

Provide the AI with **information it needs** to help effectively:

```json
{
  "documents": [
    {
      "id": "study_schedule", 
      "type": "personal_calendar",
      "content": {
        "available_study_hours": {
          "monday": ["7pm-9pm"],
          "tuesday": ["8pm-10pm"], 
          "wednesday": ["6pm-8pm"],
          "thursday": ["7pm-9pm"],
          "friday": ["none"],
          "saturday": ["10am-2pm"],
          "sunday": ["2pm-5pm"]
        },
        "exam_dates": {
          "cognitive_psychology": "2025-09-15",
          "research_methods": "2025-09-18", 
          "statistics": "2025-09-22"
        }
      }
    },
    {
      "id": "course_materials",
      "type": "academic_content",
      "content": {
        "cognitive_psychology": {
          "current_chapter": "memory_and_learning",
          "difficult_topics": ["working_memory", "long_term_memory_encoding"],
          "confidence_level": "medium"
        },
        "research_methods": {
          "current_chapter": "experimental_design", 
          "difficult_topics": ["control_variables", "validity_types"],
          "confidence_level": "low"
        }
      }
    },
    {
      "id": "study_progress",
      "type": "progress_tracking",
      "content": {
        "completed_sessions": 3,
        "total_study_hours": 8.5,
        "topics_mastered": ["basic_psychology_concepts", "descriptive_statistics"],
        "topics_struggling": ["inferential_statistics", "experimental_controls"]
      }
    }
  ]
}
```

**Key Decisions Explained**:

- `study_schedule`: Real constraints on when student can study
- `exam_dates`: Creates urgency and helps prioritize
- `course_materials`: Shows what needs focus
- `study_progress`: Enables personalized recommendations

### Step 5: Define Tools Component

Give the AI **specific actions** it can take to help the student:

```json
{
  "tools": [
    {
      "name": "create_study_plan",
      "description": "Generate a personalized study schedule based on available time and exam dates", 
      "schema": {
        "subject": "string",
        "time_available": "number_of_hours",
        "difficulty_level": "easy|medium|hard",
        "focus_areas": ["array_of_topics"]
      },
      "permissions_required": ["access_study_materials"]
    },
    {
      "name": "generate_practice_questions",
      "description": "Create practice questions for a specific topic",
      "schema": {
        "topic": "string",
        "question_type": "multiple_choice|short_answer|essay",
        "difficulty": "easy|medium|hard",
        "number_of_questions": "number"
      },
      "permissions_required": ["access_study_materials"]
    },
    {
      "name": "track_study_session",
      "description": "Record completed study session and update progress",
      "schema": {
        "subject": "string", 
        "duration_minutes": "number",
        "topics_covered": ["array_of_topics"],
        "confidence_rating": "1-5_scale"
      },
      "permissions_required": ["track_progress"]
    },
    {
      "name": "suggest_break_activity",
      "description": "Recommend appropriate break activity based on study intensity",
      "schema": {
        "session_intensity": "light|moderate|intense",
        "break_duration": "5|15|30_minutes"
      },
      "permissions_required": ["basic_access"]
    }
  ]
}
```

**Key Decisions Explained**:

- `create_study_plan`: Core functionality for organization
- `generate_practice_questions`: Active learning tool
- `track_study_session`: Progress monitoring
- `suggest_break_activity`: Prevents burnout

### Step 6: Put It All Together

Here's our complete MCP context:

```json
{
  "context_id": "study_assistant_sarah_v1",
  "version": "1.0",
  "created": "2025-08-15",
  "identity": {
    "user_id": "student_sarah",
    "role": "college_student", 
    "academic_level": "junior",
    "major": "psychology",
    "current_courses": ["cognitive_psychology", "research_methods", "statistics"],
    "study_preferences": {
      "learning_style": "visual",
      "best_time": "evening",
      "session_length": "45_minutes"
    },
    "permissions": [
      "access_study_materials",
      "track_progress", 
      "receive_reminders"
    ]
  },
  "instructions": {
    "system": "You are a supportive study assistant helping a college student prepare for exams effectively",
    "personality": "encouraging, patient, and organized",
    "teaching_style": "socratic method - guide student to answers rather than giving them directly",
    "constraints": [
      "never_do_homework_for_student",
      "encourage_regular_breaks", 
      "adapt_to_visual_learning_style",
      "keep_sessions_to_45_minutes_max",
      "celebrate_small_wins"
    ],
    "communication_style": "friendly peer, not authoritative teacher",
    "motivation_approach": "positive reinforcement and progress tracking"
  },
  "documents": [
    {
      "id": "study_schedule", 
      "type": "personal_calendar",
      "content": {
        "available_study_hours": {
          "monday": ["7pm-9pm"],
          "tuesday": ["8pm-10pm"], 
          "wednesday": ["6pm-8pm"],
          "thursday": ["7pm-9pm"],
          "friday": ["none"],
          "saturday": ["10am-2pm"],
          "sunday": ["2pm-5pm"]
        },
        "exam_dates": {
          "cognitive_psychology": "2025-09-15",
          "research_methods": "2025-09-18", 
          "statistics": "2025-09-22"
        }
      }
    },
    {
      "id": "course_materials",
      "type": "academic_content",
      "content": {
        "cognitive_psychology": {
          "current_chapter": "memory_and_learning",
          "difficult_topics": ["working_memory", "long_term_memory_encoding"],
          "confidence_level": "medium"
        },
        "research_methods": {
          "current_chapter": "experimental_design", 
          "difficult_topics": ["control_variables", "validity_types"],
          "confidence_level": "low"
        }
      }
    },
    {
      "id": "study_progress",
      "type": "progress_tracking",
      "content": {
        "completed_sessions": 3,
        "total_study_hours": 8.5,
        "topics_mastered": ["basic_psychology_concepts", "descriptive_statistics"],
        "topics_struggling": ["inferential_statistics", "experimental_controls"]
      }
    }
  ],
  "tools": [
    {
      "name": "create_study_plan",
      "description": "Generate a personalized study schedule based on available time and exam dates", 
      "schema": {
        "subject": "string",
        "time_available": "number_of_hours",
        "difficulty_level": "easy|medium|hard",
        "focus_areas": ["array_of_topics"]
      },
      "permissions_required": ["access_study_materials"]
    },
    {
      "name": "generate_practice_questions",
      "description": "Create practice questions for a specific topic",
      "schema": {
        "topic": "string",
        "question_type": "multiple_choice|short_answer|essay",
        "difficulty": "easy|medium|hard",
        "number_of_questions": "number"
      },
      "permissions_required": ["access_study_materials"]
    },
    {
      "name": "track_study_session",
      "description": "Record completed study session and update progress",
      "schema": {
        "subject": "string", 
        "duration_minutes": "number",
        "topics_covered": ["array_of_topics"],
        "confidence_rating": "1-5_scale"
      },
      "permissions_required": ["track_progress"]
    },
    {
      "name": "suggest_break_activity",
      "description": "Recommend appropriate break activity based on study intensity",
      "schema": {
        "session_intensity": "light|moderate|intense",
        "break_duration": "5|15|30_minutes"
      },
      "permissions_required": ["basic_access"]
    }
  ]
}
```

## Context Validation Checklist

Before using your context, validate it against these common issues:

### ✅ **Identity Validation**

- [ ] User role is clearly defined
- [ ] Permissions match the tools provided
- [ ] Personal preferences are specific enough to be useful
- [ ] No sensitive information is included unnecessarily

### ✅ **Instructions Validation**

- [ ] System purpose is clear in one sentence
- [ ] Constraints are specific and actionable
- [ ] Style matches the intended user relationship
- [ ] No conflicting instructions

### ✅ **Documents Validation**

- [ ] All referenced data is relevant to the use case
- [ ] Content is current and accurate
- [ ] Document types are appropriate
- [ ] No redundant information

### ✅ **Tools Validation**

- [ ] Each tool has a clear, specific purpose
- [ ] Schemas include all required parameters
- [ ] Permissions are properly restricted
- [ ] No dangerous tools without safety measures

### ✅ **Overall Context Validation**

- [ ] All components work together logically
- [ ] Context size is reasonable (not overwhelming)
- [ ] Versioning and metadata are included
- [ ] Use case is clearly achievable with provided components

## Testing Your Context

Let's test our study assistant context with realistic scenarios:

### Test Scenario 1: Creating a Study Plan

**Student Request**: "I have my cognitive psychology exam in a week and I'm struggling with memory concepts. Can you help me create a study plan?"

**Expected AI Behavior**:

1. Check exam date (September 15th) and current date
2. Review available study time this week
3. Note that student struggles with "working_memory" and "long_term_memory_encoding"
4. Use `create_study_plan` tool with parameters:
   - subject: "cognitive_psychology"
   - focus_areas: ["working_memory", "long_term_memory_encoding"]
   - difficulty_level: "medium" (based on confidence level)

**AI Should NOT**:

- Provide direct answers to potential exam questions
- Suggest study sessions longer than 45 minutes
- Schedule during Friday (marked as "none" for study time)

### Test Scenario 2: Progress Tracking

**Student Request**: "I just finished a 2-hour study session on research methods, focusing on experimental design. I feel more confident now!"

**Expected AI Behavior**:

1. Celebrate the accomplishment (positive reinforcement)
2. Note that 2 hours exceeds the 45-minute constraint
3. Use `track_study_session` tool to record progress
4. Update that "experimental_design" confidence may have improved
5. Suggest this is good progress on a "struggling" topic

**AI Should**:

- Encourage the progress while gently noting session length
- Ask about specific confidence rating (1-5 scale)
- Suggest a break after the long session

## Common Mistakes and How to Fix Them

### Mistake 1: Vague Instructions

**Bad Example**:

```json
{
  "instructions": {
    "system": "Help the user with studying"
  }
}
```

**Fixed Version**:

```json
{
  "instructions": {
    "system": "You are a supportive study assistant helping a college student prepare for exams by creating study plans, generating practice questions, and tracking progress",
    "personality": "encouraging and organized",
    "constraints": ["never_do_homework_for_student", "encourage_regular_breaks"]
  }
}
```

### Mistake 2: Overpowered Tools

**Bad Example**:

```json
{
  "tools": [
    {
      "name": "do_anything",
      "description": "Handle any request",
      "schema": {"request": "string"}
    }
  ]
}
```

**Fixed Version**:

```json
{
  "tools": [
    {
      "name": "generate_practice_questions",
      "description": "Create practice questions for a specific topic",
      "schema": {
        "topic": "string",
        "question_type": "multiple_choice|short_answer|essay",
        "difficulty": "easy|medium|hard"
      },
      "permissions_required": ["access_study_materials"]
    }
  ]
}
```

### Mistake 3: Conflicting Components

**Bad Example**:

```json
{
  "instructions": {
    "constraints": ["give_direct_answers"]
  },
  "tools": [
    {
      "name": "generate_practice_questions",
      "description": "Create questions to test knowledge"
    }
  ]
}
```

**Problem**: Instructions say to give direct answers, but tools suggest testing knowledge (which requires not giving answers).

**Fixed**: Align instructions with educational best practices.

## Adapting the Template

Use our study assistant as a template for other contexts:

### For a Fitness Coach AI

**Change Identity**: role → "fitness_enthusiast", add fitness_goals
**Change Instructions**: system → "supportive fitness coach", add health constraints
**Change Documents**: Add workout_history, fitness_level, available_equipment
**Change Tools**: Add create_workout_plan, log_exercise, track_nutrition

### For a Personal Finance AI

**Change Identity**: role → "budget_conscious_individual", add financial_goals
**Change Instructions**: system → "financial advisor assistant", add security constraints
**Change Documents**: Add spending_history, budget_limits, financial_goals
**Change Tools**: Add track_expense, analyze_spending, suggest_savings

## Your Turn: Hands-On Exercise

**Challenge**: Create an MCP context for a "Cooking Assistant AI" that helps someone learn to cook healthy meals.

**Requirements**:

- User is a beginner cook
- Wants to eat healthier
- Has dietary restrictions (vegetarian)
- Limited cooking time (30 minutes max)
- Basic kitchen equipment only

**Components to Include**:

1. **Identity**: Beginner cook, vegetarian, time-constrained
2. **Instructions**: Patient teacher, health-focused, time-aware
3. **Documents**: Dietary restrictions, available ingredients, skill level
4. **Tools**: Find recipes, create shopping lists, set cooking timers

**Try building this yourself**, then compare with others or check online resources!

## What's Next?

Congratulations! You've built your first complete MCP context. You now understand how to:

- Structure context components systematically
- Validate contexts for common issues
- Test contexts with realistic scenarios
- Adapt templates for different use cases

In the next lesson, we'll explore **real-world applications** where MCP shines, including customer support, content creation, and educational systems.

---

## Quick Reference: Context Building Process

1. **Define Use Case** - Be specific about goals and users
2. **Build Identity** - Who, what role, what permissions
3. **Create Instructions** - How to behave, constraints, style
4. **Add Documents** - What information to reference
5. **Define Tools** - What actions AI can take
6. **Validate Context** - Check for conflicts and completeness
7. **Test Scenarios** - Verify expected behavior
8. **Iterate** - Refine based on testing results

**Remember**: Start simple, test early, and refine based on real usage!
