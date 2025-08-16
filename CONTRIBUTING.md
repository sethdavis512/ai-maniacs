# Contributing to AI Maniacs

Thank you for your interest in contributing to AI Maniacs! We welcome contributions from educators, AI enthusiasts, developers, and learners of all backgrounds. This guide will help you get started.

## 🎯 Mission

AI Maniacs is dedicated to making AI education accessible to complete beginners. Our goal is to provide practical, safe, and up-to-date learning resources that help people understand and use AI effectively.

## 🤝 Ways to Contribute

### 📚 Content Contributions

- **Fix errors**: Typos, outdated information, broken links
- **Improve explanations**: Make concepts clearer for beginners
- **Add examples**: Real-world use cases and practical exercises
- **Update tool information**: Keep AI tool descriptions current
- **Translate content**: Help make AI education globally accessible

### 🛠️ Technical Contributions

- **Fix bugs**: Site functionality, build issues, performance
- **Improve accessibility**: Better navigation, screen reader support
- **Enhance user experience**: Better mobile responsiveness, loading times
- **Add features**: Interactive elements, progress tracking, search

### 🌟 Community Contributions

- **Share feedback**: Suggest improvements or new topics
- **Test content**: Try exercises and report issues
- **Spread the word**: Help others discover AI education resources

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Basic understanding of Markdown (for content)
- Git/GitHub knowledge for submitting changes

### Local Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-maniacs.git
   cd ai-maniacs
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn start
   ```

   This opens the site at `http://localhost:3000` with live reload.

4. **Test your changes**

   ```bash
   yarn build
   ```

   Ensure the build completes without errors before submitting.

## 📝 Content Guidelines

### Educational Standards

- **Beginner-first**: Assume no prior AI knowledge
- **Progressive difficulty**: Build concepts incrementally
- **Practical focus**: Include hands-on exercises and real examples
- **Safety emphasis**: Address ethics and responsible AI use
- **Current information**: Reference up-to-date tools and practices

### Writing Style

- **Clear and conversational**: Write like you're teaching a friend
- **Use examples**: Relate concepts to familiar experiences
- **Define terms**: Explain technical terms when first introduced
- **Be inclusive**: Use language welcoming to all backgrounds
- **Stay factual**: Distinguish between facts and opinions

### Content Structure

```markdown
---
sidebar_position: N  # Required for lesson ordering
---

# Lesson Title

## Learning Objectives
- What readers will learn
- Specific, actionable goals

## Prerequisites
- Previous lessons or knowledge needed

## Content Sections
- Break into digestible sections
- Use headings for navigation

## Hands-on Exercise
- Practical activity readers can try
- Step-by-step instructions

## Key Takeaways
- Summary of important points
- What to remember
```

### AI Content Transparency

When content is created with AI assistance, include this warning:

```markdown
:::warning
Content created with AI assistance - may contain errors or become outdated.
:::
```

## 🔧 Technical Guidelines

### File Organization

- **Course content**: Add to appropriate `docs/` subfolder
- **Lesson ordering**: Use `sidebar_position: N` in frontmatter
- **Assets**: Add images to `static/img/` with descriptive names
- **Categories**: Update `_category_.json` for new sections

### Link Management

- **Internal links**: Use relative paths (`./filename.md`, `../folder/filename.md`)
- **No directory links**: Always link to specific `.md` files
- **Cross-references**: Link to related lessons appropriately
- **External links**: Include for tools and resources mentioned

### Common Issues to Avoid

- **MDX parsing**: Don't use `<5%` - write "under 5%" instead
- **Broken links**: Test with `yarn build` before submitting
- **Missing positions**: Include `sidebar_position` in all lesson files
- **Large files**: Optimize images and avoid oversized assets

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description**: What happened vs. what you expected
2. **Steps to reproduce**: Detailed steps to recreate the issue
3. **Environment**: Browser, device, operating system
4. **Screenshots**: If applicable, show the issue visually
5. **Console errors**: Check browser developer tools for errors

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) when available.

## 💡 Feature Requests

For new features or improvements:

1. **Check existing issues**: See if it's already been suggested
2. **Describe the need**: What problem would this solve?
3. **Propose solution**: How might this work?
4. **Consider scope**: Keep suggestions focused and achievable
5. **Educational value**: How does this improve learning?

## 📋 Pull Request Process

### Before Submitting

1. **Create an issue**: Discuss significant changes first
2. **Follow guidelines**: Ensure your changes meet our standards
3. **Test thoroughly**: Run `yarn build` and test functionality
4. **Update documentation**: Include necessary documentation changes

### Pull Request Template

```markdown
## Description
Brief description of changes and motivation

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Content update
- [ ] Documentation update
- [ ] Breaking change

## Testing
- [ ] Local testing completed
- [ ] Build succeeds without errors
- [ ] Links checked and working
- [ ] Content reviewed for accuracy

## Checklist
- [ ] Follows project style guidelines
- [ ] Self-review completed
- [ ] Content is beginner-appropriate
- [ ] AI transparency included if applicable
```

### Review Process

1. **Automated checks**: Ensure builds pass and links work
2. **Content review**: Check for accuracy and educational value
3. **Technical review**: Verify code quality and functionality
4. **Educational review**: Ensure beginner-friendly approach
5. **Final approval**: Maintainer approval and merge

## 🏷️ Issue Labels

We use these labels to organize contributions:

- `good first issue`: Perfect for new contributors
- `content`: Content-related changes
- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation updates
- `help wanted`: Extra attention needed
- `question`: Further information requested

## 👥 Community Standards

### Code of Conduct

- **Be respectful**: Treat everyone with kindness and respect
- **Be inclusive**: Welcome people of all backgrounds and experience levels
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember everyone is learning
- **Be collaborative**: Work together toward our shared goals

### Communication

- **GitHub Issues**: For bugs, features, and technical discussions
- **Pull Requests**: For code and content contributions
- **Discussions**: For general questions and community topics

## 🎓 Learning Resources

New to contributing? Check out these resources:

- [GitHub's Contributing Guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
- [Markdown Guide](https://www.markdownguide.org/)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Writing Inclusive Documentation](https://developers.google.com/style/inclusive-documentation)

## 🆘 Getting Help

Stuck or have questions? We're here to help:

1. **Check existing issues**: Someone might have asked already
2. **Create an issue**: Ask questions or request clarification
3. **Tag maintainers**: Use `@sethdavis512` for urgent matters
4. **Be specific**: Provide context and details

## 🙏 Recognition

Contributors are recognized in:

- **README.md**: Listed as project contributors
- **Release notes**: Credited for significant contributions
- **Blog posts**: Featured for major improvements
- **Community**: Acknowledged in discussions and social media

## 📜 License

By contributing to AI Maniacs, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make AI education accessible to everyone! 🚀
