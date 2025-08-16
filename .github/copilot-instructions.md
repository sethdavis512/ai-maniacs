# AI Maniacs - AI Learning Platform Guide

This is an **AI education platform** built with Docusaurus v3, TypeScript and React 19. The project focuses on teaching AI fundamentals to complete beginners through a structured, progressive curriculum.

## Platform Architecture

-   **Educational content**: Progressive courses in `docs/` organized by skill level (AI 101 → AI 201 → MCP)
-   **Course structure**: Auto-generated sidebars from folder hierarchy using `sidebar_position` frontmatter
-   **Target audience**: Complete beginners with no technical background required
-   **Content approach**: Hands-on, practical, safety-first methodology with interactive exercises

## Critical File Organization

```
docs/
├── intro.md                    # Platform entry point
├── ai-101/                     # Beginner course (6 modules)
│   ├── _category_.json         # Module metadata & auto-index generation
│   ├── foundations/            # Core AI concepts
│   ├── companies/              # Industry landscape
│   ├── applications/           # Practical use cases
│   ├── safety/                 # Ethics & responsible use
│   ├── best-practices/         # Optimization techniques
│   └── community/              # Resources & next steps
├── ai-201/                     # Intermediate course (6 modules)
│   ├── advanced-foundations/
│   ├── workflow-automation/
│   ├── custom-solutions/
│   ├── enterprise-integration/
│   ├── advanced-ethics/
│   └── innovation-research/
└── model-context-protocol/     # Advanced MCP concepts
```

## Content Conventions & Patterns

### Educational Content Standards

-   **Frontmatter**: Always include `sidebar_position: N` for lesson ordering within categories
-   **Learning objectives**: Start lessons with clear "What you'll learn" sections
-   **Progressive difficulty**: Each module builds on previous knowledge with explicit prerequisites
-   **Safety warnings**: Use `:::warning` admonitions for AI-generated content disclaimers
-   **Practical exercises**: Include hands-on activities that students can try immediately

### MDX Specific Patterns

```markdown
---
sidebar_position: 1
---

# Lesson Title

:::warning
Content created with AI assistance - may contain errors or become outdated.
:::

## Learning Objectives

-   Clear, actionable learning goals

## Prerequisites

-   Explicit requirements from previous lessons
```

### Link Management (CRITICAL)

-   **Cross-course navigation**: Use relative paths like `../ai-201/ai-201-intro.md`
-   **Within same course**: Use `./` for same directory, `../` for parent directory
-   **Avoid directory links**: Link to specific `.md` files, not directories (causes build errors)
-   **Recent fix pattern**: Replace `<5%` with `under 5%` in content to avoid MDX parsing issues

## Development Workflow

### Essential Commands

-   `yarn start` - Local dev with hot reload (primary development)
-   `yarn build` - Production build with link validation (catches broken links)
-   `yarn clear` - Clear Docusaurus cache (use when build acts unexpectedly)
-   `yarn typecheck` - TypeScript validation for React components

### Build-Breaking Issues to Watch

1. **Broken internal links** - Build fails with exhaustive broken link report
2. **MDX parsing errors** - Avoid `<` symbols followed by numbers (use "under N%" instead)
3. **Missing sidebar positions** - Can cause ordering issues in navigation

### Deployment

-   **GitHub Pages**: Configured for `sethdavis512.github.io/ai-maniacs/`
-   **Base URL**: `/ai-maniacs/` (critical for asset paths)
-   **Broken links**: Set to 'warn' not 'throw' to allow deployment despite link issues

## Course Content Philosophy

### Beginner-First Design

-   **No technical prerequisites**: Assume zero AI knowledge
-   **Scaffolded learning**: Each lesson builds incrementally on previous concepts
-   **Real-world examples**: Use familiar tools (Google, Netflix, Siri) before technical concepts
-   **Safety integration**: Ethics and responsible use woven throughout, not relegated to single section

### Content Quality Standards

-   **AI transparency**: Acknowledge AI-assisted content creation with warnings
-   **Community-driven**: Welcome corrections and improvements via GitHub
-   **Current relevance**: Focus on current tools and practices, not theoretical concepts
-   **Practical application**: Every concept includes hands-on exercises or real examples

## React Component Patterns

### Homepage Features (src/components/HomepageFeatures/)

```tsx
type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

// Static asset imports
Svg: require('@site/static/img/ai-learning-illustration.svg').default;
```

### Styling Approach

-   **CSS Variables**: Modify `src/css/custom.css` Infima variables, don't override classes
-   **Brand colors**: Navy-based palette with dark mode considerations
-   **Responsive design**: Leverage Docusaurus/Infima responsive utilities

## When Making Changes

-   **New lessons**: Add to appropriate `docs/` subfolder with `sidebar_position` frontmatter
-   **Course structure**: Update `_category_.json` files for module metadata
-   **Navigation**: Test all internal links with `yarn build` before committing
-   **Content updates**: Maintain beginner-friendly tone and progressive difficulty
-   **Link fixes**: Always use specific file paths, never directory-only links

## Contributing & Open Source Standards

### Community Guidelines

-   **Beginner-first contributions**: All content should be accessible to complete beginners
-   **Practical focus**: Include hands-on exercises and real-world examples
-   **Safety emphasis**: Address ethics and responsible AI use throughout
-   **AI transparency**: Use `:::warning` admonitions for AI-assisted content

### Contribution Process

-   **Issues**: Use templates in `.github/ISSUE_TEMPLATE/` for bugs, features, and content
-   **Pull requests**: Follow template in `.github/pull_request_template.md`
-   **Testing**: Run `yarn build` to validate links and ensure deployment readiness
-   **Review criteria**: Educational value, technical accuracy, and beginner accessibility

### License & Usage

-   **MIT License**: Open source, free for personal/commercial/educational use
-   **Attribution**: Credit contributors in releases and community recognition
-   **Content standards**: Follow CONTRIBUTING.md guidelines for educational content
