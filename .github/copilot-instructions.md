# AI Maniacs – AI Coding Agent Instructions

This project is a Docusaurus v3, TypeScript, and React 19–based AI education platform. It is structured for progressive, beginner-first learning, with a strong focus on content safety, hands-on exercises, and clear navigation. These instructions are tailored for AI coding agents (Copilot, Claude, Cursor, etc.) to maximize productivity and codebase alignment.

## 1. Architecture & Content Flow

-   **Content-first**: All educational material lives in `docs/`, organized by course and module. Each course (e.g., `ai-101`, `ai-201`, `ai-and-careers`, `model-context-protocol`) is a folder with submodules and lessons.
-   **Sidebar & Navigation**: Sidebars are auto-generated from folder structure and `sidebar_position` frontmatter. Never link to a directory—always link to a specific `.md` file.
-   **React/TypeScript**: All custom UI is in `src/components/`. Homepage features use the `FeatureItem` pattern (see `src/components/HomepageFeatures/`).
-   **Styling**: Use Infima CSS variables in `src/css/custom.css` for theming. Do not override classes directly.

## 2. Content & MDX Patterns

-   **Frontmatter**: Every lesson/page must have `sidebar_position: N` for ordering.
-   **Learning objectives**: Start each lesson with a "What you'll learn" section.
-   **Safety**: All AI-generated or AI-assisted content must include a `:::warning` disclaimer at the top.
-   **Career guides**: Follow the template in `docs/ai-and-careers/` (Overview → Key Applications → Prompts → Safety, etc.).
-   **Prompt blocks**: Use text code blocks with bracketed variables, e.g.:
    ```text
    "Summarize [topic] for a beginner."
    ```
-   **Linking**: Use relative paths (`../ai-201/lesson.md`), never link to folders. Avoid `<5%`—write "under 5%" to prevent MDX errors.

## 3. Developer Workflow

-   **Local dev**: `yarn start` (hot reload)
-   **Build**: `yarn build` (validates links, fails on broken links)
-   **Type checking**: `yarn typecheck`
-   **Clear cache**: `yarn clear` if builds behave unexpectedly
-   **Test links**: Always run `yarn build` before PRs to catch navigation errors

## 4. Project-Specific Conventions

-   **Beginner-first**: Assume zero technical background for all content and code
-   **Progressive learning**: Each module builds on the previous; prerequisites must be explicit
-   **Safety woven throughout**: Ethics and responsible use are not isolated—integrate them into all lessons
-   **Community-driven**: Use `.github/ISSUE_TEMPLATE/` and PR templates for all contributions
-   **No directory links**: All navigation must resolve to a file, not a folder

## 5. Integration & External Dependencies

-   **Docusaurus**: Core static site generator; see `docusaurus.config.ts` and `sidebars.ts`
-   **React 19**: For all custom interactivity/components
-   **TypeScript**: Strict typing enforced in all React code

## 6. Examples & Key Files

-   `docs/ai-101/foundations/` – Example of a beginner module
-   `docs/ai-and-careers/marketing-sales.md` – Example of a career guide with prompts
-   `src/components/HomepageFeatures/` – Example of React feature pattern
-   `src/css/custom.css` – Where to change theme colors
-   `docusaurus.config.ts` – Site config, plugins, and theme
-   `sidebars.ts` – Sidebar generation logic

## 7. Contribution & Review

-   All content must be accessible, actionable, and up-to-date
-   Use `:::warning` for AI-generated content
-   Run `yarn build` before submitting PRs
-   See `CONTRIBUTING.md` for detailed guidelines

---

If any section is unclear or missing project-specific nuance, please provide feedback for further refinement.

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
