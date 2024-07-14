import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: "@sibiaoke/utils",
  description: "前端开发工具库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/quick-start' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '快速开始', link: '/guide/quick-start' },
        ]
      },
      {
        text: '工具 - Utils',
        items: [
          { text: '异步请求 - Endpoint', link: '/utils/endpoint' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sibiaoke/frontend-utils' }
    ],
    outline: {
      label: '页面导航',
      level: 'deep'
    },
  },
})
