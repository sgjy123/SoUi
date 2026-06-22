// 案例项配置
export interface MenuItem {
  key: string;
  label: string;
  componentPath: string; // 对应 examples 下的文件夹名称
  exampleName: string;   // 对应 .tsx 文件名 (不含扩展名)
  description?: string;
}

// 二级组件配置（组件级别）
export interface ComponentConfig {
  key: string;
  label: string;
  icon: string; // Icon组件名
  items: MenuItem[];
}

export interface MenuGroup {
  title: string;
  icon: string; // Icon组件名
  components: ComponentConfig[];
}

export const docsConfig: MenuGroup[] = [
  {
    title: '基础组件',
    icon: 'Components',
    components: [
      {
        key: 'button',
        label: 'Button 按钮',
        icon: 'Click',
        items: [
          { key: 'button-basic', label: 'Button 基本类型', componentPath: 'Button', exampleName: 'Basic', description: '按钮的基本类型：主要按钮、默认按钮、虚线按钮等。' },
          { key: 'button-size', label: 'Button 尺寸', componentPath: 'Button', exampleName: 'Size', description: '按钮有大、中、小三种尺寸。' },
          { key: 'button-status', label: 'Button 状态', componentPath: 'Button', exampleName: 'Status', description: '加载中、禁用或危险状态。' },
          { key: 'button-shape', label: 'Button 形状', componentPath: 'Button', exampleName: 'Shape', description: '圆形、椭圆形以及带图标的按钮。' },
        ],
      },
      {
        key: 'float-button',
        label: 'FloatButton 悬浮按钮',
        icon: 'Click',
        items: [
          { key: 'float-button-basic', label: 'FloatButton 基础用法', componentPath: 'FloatButton', exampleName: 'Basic', description: '最基础的悬浮按钮，默认圆形样式。' },
          { key: 'float-button-shape', label: 'FloatButton 形状', componentPath: 'FloatButton', exampleName: 'Shape', description: '支持圆形和方形两种形状。' },
          { key: 'float-button-type', label: 'FloatButton 类型', componentPath: 'FloatButton', exampleName: 'Type', description: '支持默认和主色两种类型，以及危险状态。' },
          { key: 'float-button-group', label: 'FloatButton 按钮组', componentPath: 'FloatButton', exampleName: 'Group', description: '可以将多个悬浮按钮组合在一起使用。' },
          { key: 'float-button-group-trigger', label: 'FloatButton 带触发器', componentPath: 'FloatButton', exampleName: 'GroupWithTrigger', description: '支持点击触发展开/收起的按钮组。' },
          { key: 'float-button-group-controlled', label: 'FloatButton 受控模式', componentPath: 'FloatButton', exampleName: 'GroupControlled', description: '通过 state 控制展开/收起状态。' },
          { key: 'float-button-group-hover', label: 'FloatButton 悬停触发', componentPath: 'FloatButton', exampleName: 'GroupHover', description: '鼠标悬停自动展开的按钮组。' },
          { key: 'float-button-Zindex', label: 'FloatButton 层级', componentPath: 'FloatButton', exampleName: 'ZIndex', description: '控制悬浮按钮显示层级。' },
        ],
      },
      {
        key: 'icon',
        label: 'Icon 图标',
        icon: 'HamburgerButton',
        items: [
          { key: 'icon-basic', label: 'Icon 基本图标', componentPath: 'Icon', exampleName: 'Basic', description: '展示不同类型的图标。' },
          { key: 'icon-theme', label: 'Icon 主题样式', componentPath: 'Icon', exampleName: 'Theme', description: '轮廓和填充两种主题样式。' },
          { key: 'icon-color', label: 'Icon 颜色配置', componentPath: 'Icon', exampleName: 'Color', description: '预设颜色和自定义颜色。' },
          { key: 'icon-size', label: 'Icon 尺寸配置', componentPath: 'Icon', exampleName: 'Size', description: '设置图标大小。' },
          { key: 'icon-interactive', label: 'Icon 交互效果', componentPath: 'Icon', exampleName: 'Interactive', description: '启用点击交互效果。' },
        ],
      },
    ],
  },
  {
    title: '布局组件',
    icon: 'PageTemplate',
    components: [
      {
        key: 'grid',
        label: 'Grid 栅格',
        icon: 'GridTwo',
        items: [
          { key: 'grid-basic', label: 'Grid 基础用法', componentPath: 'Grid', exampleName: 'Basic', description: '24 栅格系统。' },
          { key: 'grid-gutter', label: 'Grid 栅格间距', componentPath: 'Grid', exampleName: 'Gutter', description: '设置水平和垂直间距。' },
          { key: 'grid-offset', label: 'Grid 偏移', componentPath: 'Grid', exampleName: 'Offset', description: '列的左侧偏移。' },
          { key: 'grid-responsive', label: 'Grid 响应式', componentPath: 'Grid', exampleName: 'Responsive', description: '六种屏幕尺寸适配。' },
          { key: 'grid-alignment', label: 'Grid 对齐方式', componentPath: 'Grid', exampleName: 'Alignment', description: '水平和垂直对齐。' },
        ],
      },
      {
        key: 'layout',
        label: 'Layout 布局',
        icon: 'Application',
        items: [
          { key: 'layout-basic', label: 'Layout 基础布局', componentPath: 'Layout', exampleName: 'Basic', description: '经典的上-中-下布局结构。' },
          { key: 'layout-with-sider', label: 'Layout 带侧边栏', componentPath: 'Layout', exampleName: 'WithSider', description: '带有导航菜单的后台管理系统布局。' },
          { key: 'layout-top-sider', label: 'Layout 顶部-侧边', componentPath: 'Layout', exampleName: 'TopSider', description: '顶部导航加侧边栏的复合布局。' },
          { key: 'layout-collapsible', label: 'Layout 可收起侧边栏', componentPath: 'Layout', exampleName: 'Collapsible', description: '支持收起/展开的侧边栏布局。' },
          { key: 'layout-custom-width', label: 'Layout 自定义宽度', componentPath: 'Layout', exampleName: 'CustomWidth', description: '自定义侧边栏宽度。' },
          { key: 'layout-landing-page', label: 'Layout 落地页', componentPath: 'Layout', exampleName: 'LandingPage', description: '产品落地页布局，包含 Hero 区和特性展示。' },
          { key: 'layout-dashboard', label: 'Layout 数据看板', componentPath: 'Layout', exampleName: 'Dashboard', description: '数据分析看板，包含统计卡片和图表。' },
          { key: 'layout-blog', label: 'Layout 博客布局', componentPath: 'Layout', exampleName: 'BlogLayout', description: '博客平台布局，包含文章列表和分页。' },
          { key: 'layout-app', label: 'Layout 应用布局', componentPath: 'Layout', exampleName: 'AppLayout', description: '音乐/社交应用布局，分组菜单和徽章提示。' },
        ],
      },
      {
        key: 'space',
        label: 'Space 间距',
        icon: 'HorizontalTidyUp',
        items: [
          { key: 'space-basic', label: 'Space 基本用法', componentPath: 'Space', exampleName: 'Basic', description: '设置子元素之间的间距。' },
          { key: 'space-size', label: 'Space 间距尺寸', componentPath: 'Space', exampleName: 'Size', description: '预设尺寸或自定义数值。' },
          { key: 'space-direction', label: 'Space 排列方向', componentPath: 'Space', exampleName: 'Direction', description: '水平和垂直排列。' },
          { key: 'space-block', label: 'Space 块级显示', componentPath: 'Space', exampleName: 'Block', description: '控制是否为块级元素。' },
          { key: 'space-split', label: 'Space 分隔符', componentPath: 'Space', exampleName: 'Split', description: '添加分隔符。' },
          { key: 'space-align', label: 'Space 对齐方式', componentPath: 'Space', exampleName: 'Align', description: '多种对齐方式。' },
        ],
      },
    ],
  },
  {
    title: '导航组件',
    icon: 'Navigation',
    components: [
      {
        key: 'menu',
        label: 'Menu 菜单',
        icon: 'List',
        items: [
          { key: 'menu-basic', label: 'Menu 基础用法', componentPath: 'Menu', exampleName: 'Basic', description: '最简单的菜单用法，展示垂直菜单的基本结构。' },
          { key: 'menu-icon', label: 'Menu 图标菜单', componentPath: 'Menu', exampleName: 'IconMenu', description: '为菜单项添加图标，增强视觉识别度。' },
          { key: 'menu-horizontal', label: 'Menu 水平菜单', componentPath: 'Menu', exampleName: 'Horizontal', description: '顶部导航栏式的水平菜单布局。' },
          { key: 'menu-collapsed', label: 'Menu 折叠菜单', componentPath: 'Menu', exampleName: 'Collapsed', description: '侧边栏收起时只显示图标。' },
          { key: 'menu-accordion', label: 'Menu 手风琴模式', componentPath: 'Menu', exampleName: 'Accordion', description: '同一时刻只能展开一个子菜单。' },
          { key: 'menu-grouped', label: 'Menu 分组菜单', componentPath: 'Menu', exampleName: 'Grouped', description: '带有分组的菜单结构。' },
          { key: 'menu-dark', label: 'Menu 暗色主题', componentPath: 'Menu', exampleName: 'DarkTheme', description: '深色背景下的菜单样式。' },
          { key: 'menu-controlled', label: 'Menu 受控菜单', componentPath: 'Menu', exampleName: 'Controlled', description: '完全控制菜单的选中状态和展开状态。' },
        ],
      },
      {
        key: 'breadcrumb',
        label: 'Breadcrumb 面包屑',
        icon: 'Bread',
        items: [
          { key: 'breadcrumb-basic', label: 'Breadcrumb 基础用法', componentPath: 'Breadcrumb', exampleName: 'Basic', description: '最基础的面包屑导航。' },
          { key: 'breadcrumb-separator', label: 'Breadcrumb 自定义分隔符', componentPath: 'Breadcrumb', exampleName: 'Separator', description: '通过 separator 属性自定义分隔符。' },
          { key: 'breadcrumb-icon', label: 'Breadcrumb 带图标', componentPath: 'Breadcrumb', exampleName: 'WithIcon', description: '为面包屑项添加图标，增强视觉识别度。' },
          { key: 'breadcrumb-items', label: 'Breadcrumb 使用 items', componentPath: 'Breadcrumb', exampleName: 'WithItems', description: '通过 items 属性配置面包屑项。' },
          { key: 'breadcrumb-custom', label: 'Breadcrumb 主题定制', componentPath: 'Breadcrumb', exampleName: 'CustomStyle', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'steps',
        label: 'Steps 步骤条',
        icon: 'Steps',
        items: [
          { key: 'steps-basic', label: 'Steps 基础用法', componentPath: 'Steps', exampleName: 'Basic', description: '最简单的步骤条用法。' },
          { key: 'steps-vertical', label: 'Steps 垂直方向', componentPath: 'Steps', exampleName: 'Vertical', description: '垂直方向的步骤条。' },
          { key: 'steps-icon', label: 'Steps 带图标', componentPath: 'Steps', exampleName: 'WithIcon', description: '为步骤添加自定义图标。' },
          { key: 'steps-small', label: 'Steps 小尺寸', componentPath: 'Steps', exampleName: 'SmallSize', description: '小尺寸的步骤条。' },
          { key: 'steps-controlled', label: 'Steps 受控模式', componentPath: 'Steps', exampleName: 'Controlled', description: '通过按钮控制步骤切换。' },
          { key: 'steps-progress-dot', label: 'Steps 进度点模式', componentPath: 'Steps', exampleName: 'ProgressDot', description: '使用小圆点代替数字图标，支持自定义渲染。' },
          { key: 'steps-subtitle', label: 'Steps 子标题与禁用', componentPath: 'Steps', exampleName: 'WithSubtitle', description: '添加子标题和禁用特定步骤。' },
          { key: 'steps-label-placement', label: 'Steps 标签位置', componentPath: 'Steps', exampleName: 'LabelPlacement', description: '控制标签水平或垂直放置。' },
          { key: 'steps-advanced', label: 'Steps 综合示例', componentPath: 'Steps', exampleName: 'Advanced', description: '展示所有功能的完整示例。' },
        ],
      },
      {
        key: 'anchor',
        label: 'Anchor 锚点',
        icon: 'AnchorOne',
        items: [
          { key: 'anchor-basic', label: 'Anchor 基础用法', componentPath: 'Anchor', exampleName: 'Basic', description: '最简单的锚点用法，支持滚动监听自动高亮。' },
          { key: 'anchor-horizontal', label: 'Anchor 水平方向', componentPath: 'Anchor', exampleName: 'Horizontal', description: '水平排列的锚点，适合顶部导航。' },
          { key: 'anchor-items', label: 'Anchor Items 数据化', componentPath: 'Anchor', exampleName: 'ItemsMode', description: '通过 items 属性以数据化方式配置嵌套锚点。' },
          { key: 'anchor-link-children', label: 'Anchor Link 子组件', componentPath: 'Anchor', exampleName: 'LinkChildren', description: '使用 Anchor.Link 子组件方式定义锚点，支持嵌套。' },
          { key: 'anchor-onchange', label: 'Anchor onChange 监听', componentPath: 'Anchor', exampleName: 'OnChange', description: '通过 onChange 实时获取当前激活的锚点链接。' },
          { key: 'anchor-offset', label: 'Anchor 偏移量', componentPath: 'Anchor', exampleName: 'Offset', description: '设置 offsetTop 和 targetOffset 控制锚点偏移。' },
          { key: 'anchor-bounds', label: 'Anchor 边界范围', componentPath: 'Anchor', exampleName: 'Bounds', description: 'bounds 限制锚点监听范围，超出时取消高亮。' },
          { key: 'anchor-replace', label: 'Anchor 替换历史', componentPath: 'Anchor', exampleName: 'Replace', description: '开启 replace 点击锚点不产生浏览器历史记录。' },
          { key: 'anchor-scroll-container', label: 'Anchor 自定义容器', componentPath: 'Anchor', exampleName: 'ScrollContainer', description: '通过 getContainer 指定自定义滚动容器。' },
          { key: 'anchor-static', label: 'Anchor 静态模式', componentPath: 'Anchor', exampleName: 'Static', description: '不浮动，状态不随页面滚动变化。' },
          { key: 'anchor-theme', label: 'Anchor 主题定制', componentPath: 'Anchor', exampleName: 'Theme', description: '通过 ConfigProvider 自定义锚点主题样式。' },
        ],
      },
      {
        key: 'affix',
        label: 'Affix 固钉',
        icon: 'Pin',
        items: [
          { key: 'affix-basic', label: 'Affix 基础用法', componentPath: 'Affix', exampleName: 'Basic', description: '最简单的用法，固定在顶部和底部。' },
          { key: 'affix-target', label: 'Affix 指定容器', componentPath: 'Affix', exampleName: 'Target', description: '用 target 指定 Affix 需要监听滚动事件的元素。' },
          { key: 'affix-callback', label: 'Affix 回调', componentPath: 'Affix', exampleName: 'Callback', description: '可以通过 onChange 获取到状态改变的情况。' },
        ],
      },
    ],
  },
  {
    title: '排版与提示',
    icon: 'Text',
    components: [
      {
        key: 'typography',
        label: 'Typography 排版',
        icon: 'Text',
        items: [
          { key: 'typography-basic', label: 'Typography 基础', componentPath: 'Typography', exampleName: 'Basic', description: '不同层级的文本内容。' },
          { key: 'typography-style', label: 'Typography 样式', componentPath: 'Typography', exampleName: 'TextStyle', description: '加粗、斜体、下划线等。' },
          { key: 'typography-type', label: 'Typography 类型', componentPath: 'Typography', exampleName: 'TextType', description: '语义化的文本类型。' },
          { key: 'typography-copyable', label: 'Typography 可复制', componentPath: 'Typography', exampleName: 'Copyable', description: '启用文本复制功能。' },
          { key: 'typography-editable', label: 'Typography 可编辑', componentPath: 'Typography', exampleName: 'Editable', description: '启用文本编辑功能。' },
          { key: 'typography-ellipsis', label: 'Typography 省略', componentPath: 'Typography', exampleName: 'Ellipsis', description: '文本溢出省略。' },
          { key: 'typography-links', label: 'Typography 链接', componentPath: 'Typography', exampleName: 'Links', description: '可点击的链接。' },
        ],
      },
      {
        key: 'tooltip',
        label: 'Tooltip 提示',
        icon: 'Info',
        items: [
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
    ],
  },
  {
    title: '反馈组件',
    icon: 'Remind',
    components: [
      {
        key: 'alert',
        label: 'Alert 警告提示',
        icon: 'Attention',
        items: [
          { key: 'alert-basic', label: 'Alert 基础用法', componentPath: 'Alert', exampleName: 'Basic', description: '四种类型的警告提示。' },
          { key: 'alert-description', label: 'Alert 带描述', componentPath: 'Alert', exampleName: 'Description', description: '含有辅助性文字介绍的警告提示。' },
          { key: 'alert-icon', label: 'Alert 带图标', componentPath: 'Alert', exampleName: 'WithIcon', description: '为警告提示添加图标。' },
          { key: 'alert-desc-icon', label: 'Alert 描述+图标', componentPath: 'Alert', exampleName: 'DescriptionIcon', description: '带描述和图标的警告提示。' },
          { key: 'alert-closable', label: 'Alert 可关闭', componentPath: 'Alert', exampleName: 'Closable', description: '可以关闭的警告提示。' },
          { key: 'alert-action', label: 'Alert 操作按钮', componentPath: 'Alert', exampleName: 'Action', description: '带有自定义操作元素的警告提示。' },
          { key: 'alert-banner', label: 'Alert Banner 模式', componentPath: 'Alert', exampleName: 'Banner', description: '页面顶部通告形式。' },
        ],
      },
      {
        key: 'message',
        label: 'Message 全局提示',
        icon: 'MessageOne',
        items: [
          { key: 'message-basic', label: 'Message 基础用法', componentPath: 'Message', exampleName: 'Basic', description: '四种类型的全局提示消息。' },
          { key: 'message-types', label: 'Message 自定义内容', componentPath: 'Message', exampleName: 'Types', description: '支持自定义内容和图标的消息提示。' },
          { key: 'message-duration', label: 'Message 持续时间', componentPath: 'Message', exampleName: 'Duration', description: '自定义消息显示的持续时间。' },
          { key: 'message-loading', label: 'Message 加载状态', componentPath: 'Message', exampleName: 'Loading', description: '展示加载中的全局提示。' },
        ],
      },
      {
        key: 'progress',
        label: 'Progress 进度条',
        icon: 'Pie',
        items: [
          { key: 'progress-basic', label: 'Progress 基础用法', componentPath: 'Progress', exampleName: 'Basic', description: '不同状态的线形进度条。' },
          { key: 'progress-circle', label: 'Progress 圆形', componentPath: 'Progress', exampleName: 'Circle', description: '圆形进度条。' },
          { key: 'progress-dynamic', label: 'Progress 动态', componentPath: 'Progress', exampleName: 'Dynamic', description: '动态改变进度值。' },
          { key: 'progress-steps', label: 'Progress 步骤', componentPath: 'Progress', exampleName: 'Steps', description: '步骤进度条。' },
        ],
      },
      {
        key: 'notification',
        label: 'Notification 通知提醒框',
        icon: 'MessageOne',
        items: [
          { key: 'notification-basic', label: 'Notification 基础用法', componentPath: 'Notification', exampleName: 'Basic', description: '四种类型的通知提醒框。' },
          { key: 'notification-placement', label: 'Notification 位置', componentPath: 'Notification', exampleName: 'Placement', description: '设置通知出现的位置。' },
        ],
      },
      {
        key: 'dialog',
        label: 'Dialog 对话框',
        icon: 'Remind',
        items: [
          { key: 'dialog-basic', label: 'Dialog 基础用法', componentPath: 'Dialog', exampleName: 'Basic', description: '基本的对话框用法。' },
          { key: 'dialog-confirm', label: 'Dialog 确认框', componentPath: 'Dialog', exampleName: 'Confirm', description: '静态方法的确认框、信息、成功、警告、错误。' },
          { key: 'dialog-async', label: 'Dialog 异步提交', componentPath: 'Dialog', exampleName: 'Async', description: '异步操作的对话框，带有加载状态。' },
        ],
      },
      {
        key: 'loading',
        label: 'Loading 加载中',
        icon: 'LoadingThree',
        items: [
          { key: 'loading-basic', label: 'Loading 基础用法', componentPath: 'Loading', exampleName: 'Basic', description: '三种尺寸的加载指示器。' },
          { key: 'loading-nested', label: 'Loading 包裹内容', componentPath: 'Loading', exampleName: 'Nested', description: '将内容包裹在加载中状态。' },
          { key: 'loading-custom', label: 'Loading 自定义', componentPath: 'Loading', exampleName: 'Custom', description: '自定义加载指示器和描述文案。' },
        ],
      },
      {
        key: 'skeleton',
        label: 'Skeleton 占位符',
        icon: 'PageTemplate',
        items: [
          { key: 'skeleton-basic', label: 'Skeleton 基础用法', componentPath: 'Skeleton', exampleName: 'Basic', description: '基础的骨架屏占位。' },
          { key: 'skeleton-active', label: 'Skeleton 动画效果', componentPath: 'Skeleton', exampleName: 'Active', description: '显示动画效果。' },
          { key: 'skeleton-complex', label: 'Skeleton 复杂组合', componentPath: 'Skeleton', exampleName: 'Complex', description: '带头像的复杂骨架屏组合。' },
          { key: 'skeleton-sub-components', label: 'Skeleton 子组件', componentPath: 'Skeleton', exampleName: 'SubComponents', description: '按钮、头像、输入框、图片占位。' },
        ],
      },
    ],
  },
  {
    title: '其他组件',
    icon: 'Box',
    components: [
      {
        key: 'divider',
        label: 'Divider 分割线',
        icon: 'DividingLine',
        items: [
          { key: 'divider-basic', label: 'Divider 基础', componentPath: 'Divider', exampleName: 'Basic', description: '水平分割线和虚线。' },
          { key: 'divider-text', label: 'Divider 带文字', componentPath: 'Divider', exampleName: 'WithText', description: '嵌入文字的分割线。' },
          { key: 'divider-vertical', label: 'Divider 垂直', componentPath: 'Divider', exampleName: 'Vertical', description: '行内元素分隔。' },
          { key: 'divider-color', label: 'Divider 颜色', componentPath: 'Divider', exampleName: 'CustomColor', description: '自定义分割线颜色。' },
        ],
      },

    ],
  },
];
