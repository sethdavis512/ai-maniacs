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
    url: 'https://sethdavis512.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/ai-maniacs/',

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

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/sethdavis512/ai-maniacs/tree/main/'
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
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
        image: 'img/ai-maniacs-social-card.jpg',
        navbar: {
            title: 'A.I. Maniacs',
            // logo: {
            //     alt: 'A.I. Maniacs Logo',
            //     src: 'img/ai-maniacs-logo-full.svg'
            // },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'AI 101'
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
                            to: '/docs/category/ai-201-intermediate-ai-skills--applications'
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
