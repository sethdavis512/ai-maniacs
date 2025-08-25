# Content Style Guide

Internal reference for maintaining consistent voice, tone, and composition across all AI Maniacs content.

## Voice and Tone Framework

### Core Voice: "Expert Guide"
Write as a knowledgeable guide who has walked this path before and wants to help others succeed. You're confident in your expertise but remember what it was like to be a beginner.

**Characteristics:**
- Authoritative but approachable
- Confident without being arrogant  
- Encouraging but realistic about challenges
- Professional but not academic

### Tone Guidelines

**Warmth Level: Professional Friendly**
- Use "you" to address the reader directly
- Acknowledge challenges without dwelling on them
- Celebrate progress at appropriate milestones
- Avoid overly casual language or excessive enthusiasm

**Authority Level: Confident Expert**
- Make clear statements about what works and what doesn't
- Provide reasoning behind recommendations
- Don't hedge unnecessarily with "maybe" or "might"
- Admit when something is genuinely uncertain

**Encouragement Level: Supportive Realist**
- Acknowledge that learning takes time and practice
- Provide reassurance about common struggles
- Focus on practical next steps rather than motivational speeches
- Celebrate completion of significant milestones

## Content Composition Standards

### Structure Template

**Every page should follow this structure:**

1. **Brief Introduction** (2-3 sentences)
   - What this content covers
   - Why it matters for the reader's journey

2. **Learning Focus** (2-4 bullet points)
   - What the reader will understand or be able to do
   - Keep focused and specific

3. **Main Content** (60% narrative, 40% structured elements)
   - Use subheadings every 300-400 words
   - Include practical examples every 2-3 paragraphs
   - Balance explanation with actionable information

4. **Key Takeaways** (3-5 bullet points)
   - Most important concepts to remember
   - Practical insights they can apply immediately

5. **Next Steps** (consistent navigation)
   - Clear direction for continuing the learning journey

### Content Density Guidelines

**Word Count Targets:**
- Foundation topics: 800-1200 words
- Application topics: 1000-1500 words  
- Career guides: 1200-1800 words
- Advanced topics: 1500-2000 words

**Information Balance:**
- No more than 5 consecutive bullet points without explanatory text
- No more than 400 words without a subheading or visual break
- Include concrete examples within every 3-4 paragraphs

## Writing Style Standards

### Sentence Structure
- **Average length**: 15-20 words per sentence
- **Complexity**: Mix simple and compound sentences
- **Clarity**: One main idea per sentence

### Paragraph Guidelines
- **Length**: 3-5 sentences maximum
- **Focus**: One main concept per paragraph
- **Flow**: Each paragraph should connect logically to the next

### Examples and Analogies
- Use familiar comparisons to explain complex concepts
- Provide specific, actionable examples rather than abstract descriptions
- Include both positive examples (what to do) and negative examples (what to avoid) when helpful

### Inclusive Language Standards
- **Avoid**: "master", "mastery", "mastering" - use "learn", "excel in", "proficiency", "expertise"
- **Use**: "learn the basics", "develop expertise in", "gain proficiency", "become skilled at"
- **Replace**: "master prompt" → "learn prompt", "mastery level" → "proficiency level", "master the tool" → "excel with the tool"

## Formatting Standards

### Headings
- Use sentence case: "Understanding large language models"
- Keep under 8 words when possible
- Make headings descriptive of the content that follows

### Lists and Bullets
- Use parallel structure (all items start with same part of speech)
- Keep individual items to 1-2 lines when possible
- Use numbered lists for sequential processes, bullets for related items

### Code and Technical Elements
- Explain technical terms the first time they appear
- Use consistent formatting for tool names, AI model names, etc.
- Include context for why technical details matter

### Visual Elements
- Use consistent emoji patterns: ✅ for good examples, ❌ for poor examples
- Avoid emoji in headings or formal text
- Include visual breaks every 400-500 words

## Navigation and Linking

### Standard Link Language
**Next Steps:** "Continue to: [Descriptive Title]"
**Internal References:** "Learn more in [Module Name]"
**External Links:** "See [Resource Name] for additional details"

### Progress Indicators
- Acknowledge where readers are in their journey
- Reference previous learning when building on concepts
- Set expectations for upcoming complexity

### Link Validation Standards

**Internal Link Format:**
- **Correct:** `/docs/section/page` (no file extensions)
- **Incorrect:** `/docs/section/page.md` (never include .md)
- **Incorrect:** `/docs/section/` (avoid directory links)

**Required Validation Steps:**
1. **Before Publishing:** Manually verify 3-5 random internal links by checking live URLs
2. **Build Test:** Always run `npm run build` before committing - build fails on broken links
3. **Documentation Check:** Verify referenced pages exist in actual file structure using `ls docs/[path]`

**Common Link Errors to Avoid:**
- Linking to directories instead of specific files
- Including `.md` extensions in URLs
- Using old paths after content restructuring
- Linking to placeholder content that doesn't exist yet

**Link Maintenance Process:**
- When moving or renaming files, search codebase for all references
- Update all internal links before deploying changes
- Use relative paths consistently: `./filename` or `../folder/filename`
- Test all changed links on live site after deployment

**Emergency Link Fix Protocol:**
1. Identify broken link pattern (e.g., all `.md` extensions)
2. Use global search/replace to fix pattern across all files
3. Run build validation immediately after changes
4. Verify fixes on live site within 24 hours

## Content Types and Specific Guidelines

### Introductory Content
- Start with what the reader already knows
- Connect new concepts to familiar experiences
- Use "you" statements to make content personal

### Instructional Content  
- Lead with the outcome or benefit
- Break complex processes into numbered steps
- Include troubleshooting for common issues

### Reference Content (like glossaries)
- Prioritize clarity over completeness
- Use consistent definition structure
- Cross-reference related terms

### Career-Focused Content
- Balance practical advice with realistic expectations
- Include specific examples from real workplace scenarios
- Address common concerns and obstacles

## Quality Standards

### Before Publishing Checklist
- [ ] Tone matches "Expert Guide" persona throughout
- [ ] Content length fits established guidelines
- [ ] List/paragraph ratio maintains 60/40 balance
- [ ] Examples are relevant and sufficient for understanding
- [ ] Navigation language follows standard patterns
- [ ] Technical terms are explained appropriately for audience
- [ ] Structure follows established template
- [ ] Content connects logically to prerequisite and subsequent material
- [ ] Inclusive language standards followed (no "master/mastery/mastering")
- [ ] All internal links validated (no .md extensions, actual files exist)
- [ ] Build test passes (`npm run build` succeeds)
- [ ] Sample of links tested on live site

### Review Process
1. **Content Review**: Does this advance the reader's learning journey?
2. **Voice Review**: Does this sound like it comes from the same expert guide?
3. **Structure Review**: Is information balanced between narrative and structured elements?
4. **Flow Review**: Can a beginner follow this content successfully?

This style guide ensures every piece of content contributes to a cohesive, professional learning experience that helps beginners become confident AI users.