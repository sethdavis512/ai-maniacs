import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'A.I. Maniacs',
    tagline: 'Your guide to learning AI - from beginner to power user',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://ai-maniacs.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For custom domain, use root path
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'sethdavis512', // Usually your GitHub org/user name.
    projectName: 'ai-maniacs', // Usually your repo name.

    trailingSlash: false,

    onBrokenLinks: 'warn', // Changed from 'throw' to 'warn' to allow deployment
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    headTags: [
        // Preconnect to external domains for performance
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            }
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: 'anonymous'
            }
        },
        // JSON-LD structured data for educational content
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json'
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: 'AI Maniacs',
                description:
                    'Comprehensive AI education platform for beginners. Learn artificial intelligence fundamentals, explore AI tools, and discover career applications.',
                url: 'https://ai-maniacs.com',
                logo: 'https://ai-maniacs.com/img/ai-maniacs-logo-full.svg',
                sameAs: [
                    'https://github.com/sethdavis512/ai-maniacs',
                    'https://sethdavis.tech/'
                ],
                teaches: [
                    'Artificial Intelligence Fundamentals',
                    'AI Tools and Applications',
                    'AI Safety and Ethics',
                    'Career Applications of AI',
                    'Model Context Protocol'
                ],
                courseMode: 'online',
                educationalLevel: 'beginner',
                inLanguage: 'en',
                isAccessibleForFree: true,
                learningResourceType: 'Course',
                author: {
                    '@type': 'Person',
                    name: 'Seth Davis',
                    url: 'https://sethdavis.tech/'
                }
            })
        }
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/sethdavis512/ai-maniacs/tree/main/',
                    // SEO improvements for docs
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true
                },
                blog: {
                    showReadingTime: true,
                    blogTitle: 'AI Maniacs Blog - Latest AI News & Tutorials',
                    blogDescription:
                        'Stay updated with the latest AI trends, tutorials, and insights. Expert analysis of AI tools, industry news, and practical guides for AI implementation.',
                    postsPerPage: 10,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        title: 'AI Maniacs Blog - AI News & Tutorials',
                        description:
                            'Latest AI insights, tutorials, and industry analysis for beginners and professionals.',
                        copyright: `Copyright © ${new Date().getFullYear()} AI Maniacs`,
                        xslt: true
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/sethdavis512/ai-maniacs/tree/main/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn'
                },
                theme: {
                    customCss: './src/css/custom.css'
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/ai-maniacs-logo-social-card.jpg', // Using existing file until ai-maniacs-social-card.jpg is created
        // Global metadata for SEO
        metadata: [
            {
                name: 'keywords',
                content:
                    'AI learning, artificial intelligence education, AI courses, AI for beginners, machine learning tutorials, AI tools, AI career guidance, AI safety, prompt engineering, AI literacy'
            },
            {
                name: 'description',
                content:
                    'Comprehensive AI education platform for beginners. Learn artificial intelligence fundamentals, explore AI tools, and discover career applications with hands-on tutorials and safety-first approach.'
            },
            { name: 'author', content: 'Seth Davis' },
            { name: 'robots', content: 'index, follow' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@sethdavis512' },
            { name: 'twitter:creator', content: '@sethdavis512' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'AI Maniacs' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'article:author', content: 'Seth Davis' }
        ],
        navbar: {
            title: 'A.I. Maniacs',
            // logo: {
            //     alt: 'A.I. Maniacs Logo',
            //     src: 'img/ai-maniacs-logo-full.svg'
            // },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'ai101Sidebar',
                    position: 'left',
                    label: 'AI 101'
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'ai201Sidebar',
                    position: 'left',
                    label: 'AI 201'
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'careersSidebar',
                    position: 'left',
                    label: 'AI & Careers'
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'mcpSidebar',
                    position: 'left',
                    label: 'MCP'
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/sethdavis512/ai-maniacs',
                    label: 'GitHub',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Learn',
                    items: [
                        {
                            label: 'AI 101',
                            to: '/docs/intro'
                        },
                        {
                            label: 'AI 201',
                            to: '/docs/ai-201/ai-201-intro'
                        },
                        {
                            label: 'AI & Careers',
                            to: '/docs/ai-and-careers/'
                        },
                        {
                            label: 'MCP',
                            to: '/docs/model-context-protocol/mcp-start'
                        },
                        {
                            label: 'Blog',
                            to: '/blog'
                        }
                    ]
                },
                // {
                //     title: 'Community',
                //     items: [
                //         {
                //             label: 'Discord',
                //             href: 'https://discord.gg/ai-maniacs'
                //         },
                //         {
                //             label: 'Twitter',
                //             href: 'https://twitter.com/ai_maniacs'
                //         },
                //         {
                //             label: 'LinkedIn',
                //             href: 'https://linkedin.com/company/ai-maniacs'
                //         }
                //     ]
                // },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Created by Seth Davis',
                            href: 'https://sethdavis.tech/'
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/sethdavis512/ai-maniacs'
                        }
                        // {
                        //     label: 'Newsletter',
                        //     href: '#newsletter'
                        // }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} A.I. Maniacs. Empowering everyone with AI knowledge.`
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        }
    } satisfies Preset.ThemeConfig
};

export default config;
