import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SoUi',
  description: '现代化 React 组件库',

  // GitHub Pages 基础路径（与仓库名一致）
  base: '/SoUi/',

  // 语言设置
  lang: 'zh-CN',

  // Head 配置（添加图标等）
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/SoUi.ico' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
  ],

  // 主题配置
  themeConfig: {
    // Logo 配置
    logo: {
      src: '/logo.svg',
      width: 24,
      height: 24,
    },

    // 导航栏
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '样式', link: '/styles/overview' },
      { text: '主题', link: '/theming/config-provider' },
      { text: '组件', link: '/components/button' },
      { text: '示例', link: '/examples/', target: '_blank' },
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

    // 搜索配置（暂时禁用，本地搜索在 CI 中有问题）
    // search: {
    //   provider: 'local',
    // },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/souI/ui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    // 页面大纲（右侧导航）
    outline: {
      level: [2, 3],
      label: '本页目录',
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
    plugins: [react() as any],
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

  // 忽略死链接检查（文档还在完善中）
  ignoreDeadLinks: true,
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
        { text: 'FloatButton 悬浮按钮', link: 'float-button' },
        { text: 'Icon 图标', link: 'icon' },
      ],
    },
    {
      text: '布局组件',
      collapsed: false,
      items: [
        { text: 'Grid 栅格', link: 'grid' },
        { text: 'Layout 布局', link: 'layout' },
        { text: 'Space 间距', link: 'space' },
        { text: 'Tabs 标签页', link: 'tabs' },
        { text: 'Dropdown 下拉菜单', link: 'dropdown' },
      ],
    },
    {
      text: '导航组件',
      collapsed: false,
      items: [
        { text: 'Menu 菜单', link: 'menu' },
        { text: 'Breadcrumb 面包屑', link: 'breadcrumb' },
        { text: 'Anchor 锚点', link: 'anchor' },
        { text: 'Affix 固钉', link: 'affix' },
        { text: 'Tree 树形控件', link: 'tree' },
      ],
    },
    {
      text: '数据录入',
      collapsed: false,
      items: [
        { text: 'Input 输入框', link: 'input' },
        { text: 'Select 选择器', link: 'select' },
        { text: 'Radio 单选框', link: 'radio' },
        { text: 'Checkbox 多选框', link: 'checkbox' },
        { text: 'InputNumber 数字输入', link: 'input-number' },
        { text: 'Switch 开关', link: 'switch' },
        { text: 'Cascader 级联选择', link: 'cascader' },
        { text: 'TreeSelect 树形下拉', link: 'tree-select' },
        { text: 'Rate 评分', link: 'rate' },
        { text: 'ColorPicker 颜色选择器', link: 'color-picker' },
        { text: 'DatePicker 日期选择', link: 'date-picker' },
        { text: 'RangePicker 范围选择', link: 'range-picker' },
        { text: 'TimePicker 时间选择', link: 'time-picker' },
        { text: 'Transfer 穿梭框', link: 'transfer' },
        { text: 'Slider 滑块', link: 'slider' },
        { text: 'Upload 上传', link: 'upload' },
        { text: 'Form 表单', link: 'form' },
      ],
    },
    {
      text: '排版',
      collapsed: false,
      items: [
        { text: 'Typography 排版', link: 'typography' },
        { text: 'Tooltip 提示', link: 'tooltip' },
      ],
    },
    {
      text: '数据展示',
      collapsed: false,
      items: [
        { text: 'Table 表格', link: 'table' },
        { text: 'Pagination 分页', link: 'pagination' },
        { text: 'Empty 空状态', link: 'empty' },
        { text: 'Calendar 日历', link: 'calendar' },
        { text: 'Waterfall 瀑布流', link: 'waterfall' },
        { text: 'Tag 标签', link: 'tag' },
        { text: 'Card 卡片', link: 'card' },
        { text: 'Badge 徽章数', link: 'badge' },
        { text: 'Carousel 轮播', link: 'carousel' },
        { text: 'Descriptions 描述列表', link: 'descriptions' },
        { text: 'Image 图片', link: 'image' },
      ],
    },
    {
      text: '反馈组件',
      collapsed: false,
      items: [
        { text: 'Alert 警告提示', link: 'alert' },
        { text: 'Message 全局提示', link: 'message' },
        { text: 'Progress 进度条', link: 'progress' },
        { text: 'Notification 通知提醒框', link: 'notification' },
        { text: 'Dialog 对话框', link: 'dialog' },
        { text: 'Drawer 抽屉', link: 'drawer' },
        { text: 'Loading 加载中', link: 'loading' },
        { text: 'Skeleton 占位符', link: 'skeleton' },
        { text: 'Result 结果', link: 'result' },
        { text: 'Popconfirm 气泡确认框', link: 'popconfirm' },
        { text: 'Steps 步骤条', link: 'steps' },
      ],
    },
    {
      text: '其他组件',
      collapsed: false,
      items: [
        { text: 'Divider 分割线', link: 'divider' },
        { text: 'Watermark 水印', link: 'watermark' },
      ],
    },
  ]
}
