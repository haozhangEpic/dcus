/*
 * @Author: zhanghao
 * @Date: 2023-06-05 17:14:31
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-21 11:30:17
 * @Description:
 * @FilePath: \dcus\docusaurus.config.js
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "study",
  tagline: "我爱学习",
  favicon: "img/panda.png",

  // Set the production url of your site here
  url: "https://haozhangEpic.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/dcos/',
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "haozhangEpic", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  deploymentBranch: "gh-pages",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: false,
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        // blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "网站",
        logo: {
          alt: "fish Logo",
          src: "img/panda.png",
        },
        items: [
          {
            type: "docSidebar",
            label: "javascript",
            sidebarId: "tutorialSidebar",
          },

          { type: "docSidebar", label: "React", sidebarId: "react" },
          // {label:'Vue'},
          { type: "docSidebar", label: "threejs", sidebarId: "threejs" },
          {
            type: "docSidebar",
            label: "docusaurus",
            sidebarId: "docusaurus",
          },
          {
            type: "docSidebar",
            label: "面试题收集",
            sidebarId: "study",
          },
          { type: "docSidebar", label: "C语言系列", sidebarId: "Clanguage" },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: "https://github.com/haozhangEpic",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'QQ',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/haozhangEpic",
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        copyright: `摸了个大鱼，<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2023020506号-1</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      customDocsPath: './src/theme/DocItem.tsx'
    }),
    plugins: ['docusaurus-plugin-sass'],
};

module.exports = config;
