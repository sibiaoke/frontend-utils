import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: '@sibiaoke/utils',
  description: '前端开发工具库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/quick-start' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [{ text: '快速开始', link: '/guide/quick-start' }]
      },
      {
        text: '工具 - Utils',
        items: [
          { text: '异步请求 - Endpoint', link: '/utils/endpoint' },
          { text: '存储 - store', link: '/utils/store' },
          { text: '小数精度 - accurateNum', link: '/utils/accurate-num' },
          { text: '坐标转换 - coord', link: '/utils/coord' },
          { text: '设备信息 - device', link: '/utils/device' },
          { text: '命名 - naming', link: '/utils/naming' },
          { text: '货币 - currency', link: '/utils/currency' },
          { text: '加密 - crypto', link: '/utils/crypto' },
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/sibiaoke/frontend-utils' }],
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最近更新时间'
    }
  }
});
