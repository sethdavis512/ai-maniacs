# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

AI Maniacs is a comprehensive AI education platform built with Docusaurus v3, TypeScript, and React 19. The platform follows a progressive learning structure designed for complete beginners, with content organized into distinct educational tracks.

### Core Structure

**Content Organization**: All educational content lives in `docs/` with auto-generated sidebars from folder structure. The platform includes five main learning tracks:
- `ai-101/`: Foundation AI concepts and tools
- `ai-201/`: Advanced AI applications and enterprise integration  
- `ai-and-careers/`: Industry-specific AI applications
- `automation/`: Workflow automation and business process optimization
- `model-context-protocol/`: Structured AI system design

**Navigation System**: Docusaurus auto-generates sidebars from `sidebar_position` frontmatter in markdown files. Each learning track has its own sidebar defined in `sidebars.ts`. Never link to directories - always link to specific `.md` files.

**Content Flow**: Each module follows a progressive structure: prerequisites → learning objectives → practical examples → hands-on exercises → key takeaways → next steps. Content assumes zero technical background and builds incrementally.

## Development Commands

```bash
# Development server with hot reload
npm start
# or yarn start

# Production build (validates all links, fails on broken links)  
npm run build
# or yarn build

# Type checking
npm run typecheck
# or yarn typecheck

# Clear Docusaurus cache (if builds behave unexpectedly)
npm run clear
# or yarn clear

# Serve production build locally
npm run serve
# or yarn serve
```

**Important**: Always run `npm run build` before submitting changes to validate all internal links and ensure deployment readiness. The build will fail on broken links or navigation errors.

## Content Standards and Conventions

### Content Style Guide
Follow the comprehensive style guide in `CONTENT_STYLE_GUIDE.md`:
- **Voice**: "Expert Guide" - authoritative but approachable
- **Tone**: Professional friendly, confident expert, supportive realist
- **Structure**: Brief intro → learning focus → main content (60% narrative, 40% structured) → key takeaways → next steps
- **Inclusive Language**: Never use "master/mastery/mastering" - use "learn/excel in/proficiency/expertise" instead

### Markdown and Frontmatter Requirements
```yaml
---
sidebar_position: N  # Required for lesson ordering
title: Lesson Title   # Optional but recommended
description: SEO description
keywords: [keyword1, keyword2]
image: /img/ai-maniacs-social-card.jpg
---
```

### Safety and Transparency
All AI-generated or AI-assisted content must include:
```markdown
:::warning
Content created with AI assistance - may contain errors or become outdated.
:::
```

### Prompt Examples
Use text code blocks with bracketed variables:
```text
"Analyze [business process] and suggest automation opportunities for [industry]"
```

### Link Management
- **Internal links**: Use relative paths (`./filename.md`, `../folder/filename.md`)
- **No directory links**: Always link to specific `.md` files, never folders
- **Cross-references**: Follow the pattern "Continue to: [Title](./file.md)" for navigation

### Content Types and Templates

**Career Guides** (`docs/ai-and-careers/`): Follow the established pattern:
- Overview → Key Applications → Recommended Tools → Practical Prompts → Safety Considerations → Key Takeaways → Next Steps

**Tutorial Content**: Include prerequisites, step-by-step instructions, validation steps, troubleshooting, and follow-up exercises.

**Reference Content**: Use consistent definition structure with cross-references to related terms.

## Technical Integration Details

### Docusaurus Configuration
- Site config: `docusaurus.config.ts` - handles SEO, metadata, navbar, footer
- Sidebar generation: `sidebars.ts` - defines auto-generated sidebar structure for each learning track
- Custom styling: `src/css/custom.css` - uses Infima CSS variables, avoid overriding classes directly

### React Components
- Homepage features: `src/components/HomepageFeatures/` follows the `FeatureItem` pattern
- Custom UI components should be TypeScript strict and React 19 compatible
- All custom interactivity should be built as reusable components

### Build and Deployment
- Static site generation with Docusaurus
- Automatic link validation during build process
- SEO optimized with structured data, meta tags, and social cards
- Performance optimized with preconnects and lazy loading

## Content Quality Standards

### Educational Requirements
- **Beginner-first**: Assume zero AI knowledge, define technical terms on first use
- **Progressive difficulty**: Each lesson builds on previous concepts with explicit prerequisites
- **Practical focus**: Include hands-on exercises, real-world examples, and actionable takeaways
- **Safety integration**: Address ethics and responsible AI use throughout, not in isolation

### Word Count Targets
- Foundation topics: 800-1200 words
- Application topics: 1000-1500 words  
- Career guides: 1200-1800 words
- Advanced topics: 1500-2000 words

### Content Balance
- Maximum 5 consecutive bullet points without explanatory text
- No more than 400 words without subheading or visual break
- Include concrete examples within every 3-4 paragraphs
- Maintain 60% narrative, 40% structured elements ratio

## Common Issues and Solutions

### MDX Parsing Errors
- Don't use `<5%` - write "under 5%" to prevent parsing issues
- Avoid unescaped special characters in markdown
- Test all content with `npm run build` to catch parsing errors

### Navigation Issues  
- Missing `sidebar_position` frontmatter causes ordering problems
- Linking to directories instead of files breaks navigation
- Always validate internal links with build process

### Performance Considerations
- Optimize images before adding to `static/img/`
- Avoid oversized assets that slow loading
- Use appropriate image formats (WebP when possible)

## Contributing Workflow

1. **Content changes**: Follow `CONTRIBUTING.md` guidelines for educational standards
2. **Technical changes**: Ensure TypeScript strict compliance and React 19 compatibility  
3. **Testing**: Always run `npm run build` before submitting to validate links and functionality
4. **Review**: Content must be beginner-appropriate, technically accurate, and educationally valuable

The platform prioritizes accessibility, progressive learning, and practical application over theoretical depth. All changes should advance the mission of making AI education accessible to complete beginners.