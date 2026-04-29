import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SoUi',
  description: '现代化 React 组件库',
  
  // 语言设置
  lang: 'zh-CN',
  
  // Head 配置（添加图标等）
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/SoUi.ico' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
  ],
  
  // Logo 配置
  logo: {
    src: '/logo.svg',
    width: 48,
    height: 48,
  },
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '样式', link: '/styles/overview' },
      { text: '主题', link: '/theming/config-provider' },
      { text: '组件', link: '/components/button' },
      { 
        text: '资源', 
        items: [
          { text: '更新日志', link: '/resources/changelog' },
          { text: '迁移指南', link: '/resources/migration' },
        ]
      },
    ],

    // 侧边栏配置
    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: sidebarGuide(),
      },
      '/styles/': {
        base: '/styles/',
        items: sidebarStyles(),
      },
      '/theming/': {
        base: '/theming/',
        items: sidebarTheming(),
      },
      '/components/': {
        base: '/components/',
        items: sidebarComponents(),
      },
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/souI/ui' },
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present SoUi Team',
    },

    // 搜索配置（使用 Algolia DocSearch）
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/souI/ui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    // 上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
  },

  // Vite 配置（支持 React 和 Less）
  vite: {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  },

  // Markdown 配置
  markdown: {
    config: (md) => {
      // 可以在这里添加自定义 markdown-it 插件
    },
  },

  // 构建配置
  build: {
    outDir: 'dist-docs',
  },
})

// 侧边栏配置函数
function sidebarGuide() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '什么是 SoUi', link: 'introduction' },
        { text: '快速开始', link: 'quick-start' },
        { text: '安装指南', link: 'installation' },
      ],
    },
  ]
}

function sidebarStyles() {
  return [
    {
      text: '设计基础',
      collapsed: false,
      items: [
        { text: '概览', link: 'overview' },
        { text: '色彩系统', link: 'colors' },
        { text: '排版系统', link: 'typography' },
        { text: '间距系统', link: 'spacing' },
        { text: '阴影系统', link: 'shadows' },
        { text: 'Mixins', link: 'mixins' },
      ],
    },
  ]
}

function sidebarTheming() {
  return [
    {
      text: '主题定制',
      collapsed: false,
      items: [
        { text: 'ConfigProvider', link: 'config-provider' },
        { text: 'CSS 变量', link: 'css-variables' },
        { text: '暗黑模式', link: 'dark-mode' },
      ],
    },
  ]
}

function sidebarComponents() {
  return [
    {
      text: '基础组件',
      collapsed: false,
      items: [
        { text: 'Button 按钮', link: 'button' },
        { text: 'Icon 图标', link: 'icon' },
        { text: 'Typography 排版', link: 'typography' },
      ],
    },
    {
      text: '布局组件',
      collapsed: false,
      items: [
        { text: 'Grid 栅格', link: 'grid' },
        { text: 'Space 间距', link: 'space' },
      ],
    },
    {
      text: '数据录入',
      collapsed: false,
      items: [
        { text: 'Input 输入框', link: 'input' },
      ],
    },
    {
      text: '数据展示',
      collapsed: false,
      items: [
        { text: 'Card 卡片', link: 'card' },
        { text: 'Tag 标签', link: 'tag' },
        { text: 'Badge 徽标', link: 'badge' },
        { text: 'Tooltip 文字提示', link: 'tooltip' },
      ],
    },
    {
      text: '反馈组件',
      collapsed: false,
      items: [
        { text: 'Modal 对话框', link: 'modal' },
        { text: 'Message 全局提示', link: 'message' },
        { text: 'Alert 警告提示', link: 'alert' },
      ],
    },
  ]
}