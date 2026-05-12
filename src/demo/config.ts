export interface MenuItem {
  key: string;
  label: string;
  componentPath: string; // 对应 examples 下的文件夹名称
  exampleName: string;   // 对应 .tsx 文件名 (不含扩展名)
  description?: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const docsConfig: MenuGroup[] = [
  {
    title: '基础组件',
    items: [
      { key: 'button-basic', label: 'Button 基本类型', componentPath: 'Button', exampleName: 'Basic', description: '按钮的基本类型：主要按钮、默认按钮、虚线按钮等。' },
      { key: 'button-size', label: 'Button 尺寸', componentPath: 'Button', exampleName: 'Size', description: '按钮有大、中、小三种尺寸。' },
      { key: 'button-status', label: 'Button 状态', componentPath: 'Button', exampleName: 'Status', description: '加载中、禁用或危险状态。' },
      { key: 'button-shape', label: 'Button 形状', componentPath: 'Button', exampleName: 'Shape', description: '圆形、椭圆形以及带图标的按钮。' },
      
      { key: 'icon-basic', label: 'Icon 基本图标', componentPath: 'Icon', exampleName: 'Basic', description: '展示不同类型的图标。' },
      { key: 'icon-theme', label: 'Icon 主题样式', componentPath: 'Icon', exampleName: 'Theme', description: '轮廓和填充两种主题样式。' },
      { key: 'icon-color', label: 'Icon 颜色配置', componentPath: 'Icon', exampleName: 'Color', description: '预设颜色和自定义颜色。' },
      { key: 'icon-size', label: 'Icon 尺寸配置', componentPath: 'Icon', exampleName: 'Size', description: '设置图标大小。' },
      { key: 'icon-interactive', label: 'Icon 交互效果', componentPath: 'Icon', exampleName: 'Interactive', description: '启用点击交互效果。' },
    ],
  },
  {
    title: '布局组件',
    items: [
      { key: 'grid-basic', label: 'Grid 基础用法', componentPath: 'Grid', exampleName: 'Basic', description: '24 栅格系统。' },
      { key: 'grid-gutter', label: 'Grid 栅格间距', componentPath: 'Grid', exampleName: 'Gutter', description: '设置水平和垂直间距。' },
      { key: 'grid-offset', label: 'Grid 偏移', componentPath: 'Grid', exampleName: 'Offset', description: '列的左侧偏移。' },
      { key: 'grid-responsive', label: 'Grid 响应式', componentPath: 'Grid', exampleName: 'Responsive', description: '六种屏幕尺寸适配。' },
      { key: 'grid-alignment', label: 'Grid 对齐方式', componentPath: 'Grid', exampleName: 'Alignment', description: '水平和垂直对齐。' },

      { key: 'layout-basic', label: 'Layout 基础布局', componentPath: 'Layout', exampleName: 'Basic', description: '经典的上-中-下布局结构。' },
      { key: 'layout-with-sider', label: 'Layout 带侧边栏', componentPath: 'Layout', exampleName: 'WithSider', description: '带有导航菜单的后台管理系统布局。' },
      { key: 'layout-top-sider', label: 'Layout 顶部-侧边', componentPath: 'Layout', exampleName: 'TopSider', description: '顶部导航加侧边栏的复合布局。' },
      { key: 'layout-collapsible', label: 'Layout 可收起侧边栏', componentPath: 'Layout', exampleName: 'Collapsible', description: '支持收起/展开的侧边栏布局。' },
      { key: 'layout-custom-width', label: 'Layout 自定义宽度', componentPath: 'Layout', exampleName: 'CustomWidth', description: '自定义侧边栏宽度。' },
      { key: 'layout-landing-page', label: 'Layout 落地页', componentPath: 'Layout', exampleName: 'LandingPage', description: '产品落地页布局，包含 Hero 区和特性展示。' },
      { key: 'layout-dashboard', label: 'Layout 数据看板', componentPath: 'Layout', exampleName: 'Dashboard', description: '数据分析看板，包含统计卡片和图表。' },
      { key: 'layout-blog', label: 'Layout 博客布局', componentPath: 'Layout', exampleName: 'BlogLayout', description: '博客平台布局，包含文章列表和分页。' },
      { key: 'layout-app', label: 'Layout 应用布局', componentPath: 'Layout', exampleName: 'AppLayout', description: '音乐/社交应用布局，分组菜单和徽章提示。' },

      { key: 'menu-basic', label: 'Menu 基础用法', componentPath: 'Menu', exampleName: 'Basic', description: '垂直菜单的基本用法。' },
      { key: 'menu-horizontal', label: 'Menu 水平菜单', componentPath: 'Menu', exampleName: 'Horizontal', description: '水平方向的导航菜单。' },
      { key: 'menu-dark-theme', label: 'Menu 深色主题', componentPath: 'Menu', exampleName: 'DarkTheme', description: '深色主题的菜单样式。' },
      { key: 'menu-collapsed', label: 'Menu 折叠菜单', componentPath: 'Menu', exampleName: 'Collapsed', description: '可折叠的侧边栏菜单。' },
      { key: 'menu-controlled', label: 'Menu 受控模式', componentPath: 'Menu', exampleName: 'Controlled', description: '完全受控的菜单状态管理。' },
      { key: 'menu-group', label: 'Menu 分组菜单', componentPath: 'Menu', exampleName: 'Group', description: '使用 Menu.Group 对菜单项进行分组。' },

      { key: 'space-basic', label: 'Space 基本用法', componentPath: 'Space', exampleName: 'Basic', description: '设置子元素之间的间距。' },
      { key: 'space-size', label: 'Space 间距尺寸', componentPath: 'Space', exampleName: 'Size', description: '预设尺寸或自定义数值。' },
      { key: 'space-direction', label: 'Space 排列方向', componentPath: 'Space', exampleName: 'Direction', description: '水平和垂直排列。' },
      { key: 'space-block', label: 'Space 块级显示', componentPath: 'Space', exampleName: 'Block', description: '控制是否为块级元素。' },
      { key: 'space-split', label: 'Space 分隔符', componentPath: 'Space', exampleName: 'Split', description: '添加分隔符。' },
      { key: 'space-align', label: 'Space 对齐方式', componentPath: 'Space', exampleName: 'Align', description: '多种对齐方式。' },
    ],
  },
  {
    title: '排版与提示',
    items: [
      { key: 'typography-basic', label: 'Typography 基础', componentPath: 'Typography', exampleName: 'Basic', description: '不同层级的文本内容。' },
      { key: 'typography-style', label: 'Typography 样式', componentPath: 'Typography', exampleName: 'TextStyle', description: '加粗、斜体、下划线等。' },
      { key: 'typography-type', label: 'Typography 类型', componentPath: 'Typography', exampleName: 'TextType', description: '语义化的文本类型。' },
      { key: 'typography-copyable', label: 'Typography 可复制', componentPath: 'Typography', exampleName: 'Copyable', description: '启用文本复制功能。' },
      { key: 'typography-editable', label: 'Typography 可编辑', componentPath: 'Typography', exampleName: 'Editable', description: '启用文本编辑功能。' },
      { key: 'typography-ellipsis', label: 'Typography 省略', componentPath: 'Typography', exampleName: 'Ellipsis', description: '文本溢出省略。' },
      { key: 'typography-links', label: 'Typography 链接', componentPath: 'Typography', exampleName: 'Links', description: '可点击的链接。' },

      { key: 'tooltip-basic', label: 'Tooltip 基础', componentPath: 'Tooltip', exampleName: 'Basic', description: '鼠标悬停显示提示。' },
      { key: 'tooltip-placement', label: 'Tooltip 位置', componentPath: 'Tooltip', exampleName: 'Placement', description: '12 个不同的弹出位置。' },
      { key: 'tooltip-trigger', label: 'Tooltip 触发', componentPath: 'Tooltip', exampleName: 'Trigger', description: '四种触发方式。' },
      { key: 'tooltip-controlled', label: 'Tooltip 受控', componentPath: 'Tooltip', exampleName: 'Controlled', description: '控制显示和隐藏。' },
      { key: 'tooltip-delay', label: 'Tooltip 延迟', componentPath: 'Tooltip', exampleName: 'Delay', description: '设置延迟时间。' },
      { key: 'tooltip-destroy', label: 'Tooltip 销毁', componentPath: 'Tooltip', exampleName: 'Destroy', description: '关闭后销毁 DOM。' },
      { key: 'tooltip-style', label: 'Tooltip 样式', componentPath: 'Tooltip', exampleName: 'Style', description: '自定义提示框样式。' },
      { key: 'tooltip-auto', label: 'Tooltip 自动调整', componentPath: 'Tooltip', exampleName: 'AutoAdjust', description: '防止溢出视口。' },
      { key: 'tooltip-disabled', label: 'Tooltip 禁用', componentPath: 'Tooltip', exampleName: 'Disabled', description: '禁用状态处理。' },
    ],
  },
  {
    title: '其他组件',
    items: [
      { key: 'divider-basic', label: 'Divider 基础', componentPath: 'Divider', exampleName: 'Basic', description: '水平分割线和虚线。' },
      { key: 'divider-text', label: 'Divider 带文字', componentPath: 'Divider', exampleName: 'WithText', description: '嵌入文字的分割线。' },
      { key: 'divider-vertical', label: 'Divider 垂直', componentPath: 'Divider', exampleName: 'Vertical', description: '行内元素分隔。' },
      { key: 'divider-color', label: 'Divider 颜色', componentPath: 'Divider', exampleName: 'CustomColor', description: '自定义分割线颜色。' },
    ],
  },
];
