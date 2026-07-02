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
    title: '数据录入',
    icon: 'Edit',
    components: [
      {
        key: 'input',
        label: 'Input 输入框',
        icon: 'Edit',
        items: [
          { key: 'input-basic', label: 'Input 基础用法', componentPath: 'Input', exampleName: 'Basic', description: '基本使用：输入框、禁用、只读状态。' },
          { key: 'input-size', label: 'Input 尺寸', componentPath: 'Input', exampleName: 'Size', description: '三种尺寸：small、middle、large。' },
          { key: 'input-status', label: 'Input 状态', componentPath: 'Input', exampleName: 'Status', description: '错误和警告状态。' },
          { key: 'input-addon', label: 'Input 前后置标签', componentPath: 'Input', exampleName: 'Addon', description: '通过 addonBefore 和 addonAfter 添加前置/后置标签。' },
          { key: 'input-prefix-suffix', label: 'Input 前缀后缀', componentPath: 'Input', exampleName: 'PrefixSuffix', description: '在输入框内添加前缀或后缀图标。' },
          { key: 'input-clearable', label: 'Input 可清空', componentPath: 'Input', exampleName: 'Clearable', description: '启用 allowClear 显示清空按钮。' },
          { key: 'input-borderless', label: 'Input 无边框', componentPath: 'Input', exampleName: 'Borderless', description: '无边框或去除边框样式。' },
          { key: 'input-textarea', label: 'Input.TextArea 多行', componentPath: 'Input', exampleName: 'TextArea', description: '多行文本输入、自适应高度、字数统计。' },
          { key: 'input-password', label: 'Input.Password 密码', componentPath: 'Input', exampleName: 'Password', description: '密码输入框，支持显示/隐藏切换。' },
          { key: 'input-search', label: 'Input.Search 搜索', componentPath: 'Input', exampleName: 'Search', description: '搜索输入框，支持回车和点击搜索。' },
          { key: 'input-combined', label: 'Input 综合示例', componentPath: 'Input', exampleName: 'Combined', description: '综合示例：前缀 + 清空 + 字数统计等组合使用。' },
        ],
      },
      {
        key: 'select',
        label: 'Select 选择器',
        icon: 'FullSelection',
        items: [
          { key: 'select-basic', label: 'Select 基础用法', componentPath: 'Select', exampleName: 'Basic', description: '基础单选、默认值、禁用状态。' },
          { key: 'select-multiple', label: 'Select 多选', componentPath: 'Select', exampleName: 'Multiple', description: '多选模式，支持标签式展示。' },
          { key: 'select-search', label: 'Select 搜索', componentPath: 'Select', exampleName: 'Search', description: '带搜索功能的选择器。' },
          { key: 'select-disabled', label: 'Select 禁用', componentPath: 'Select', exampleName: 'Disabled', description: '禁用选择器和禁用选项。' },
          { key: 'select-sizes', label: 'Select 尺寸', componentPath: 'Select', exampleName: 'Sizes', description: '三种尺寸：small、middle、large。' },
          { key: 'select-controlled', label: 'Select 受控模式', componentPath: 'Select', exampleName: 'Controlled', description: '通过 value 和 onChange 受控使用。' },
          { key: 'select-status', label: 'Select 状态', componentPath: 'Select', exampleName: 'Status', description: '错误和警告校验状态。' },
          { key: 'select-allow-clear', label: 'Select 可清空', componentPath: 'Select', exampleName: 'AllowClear', description: '启用 allowClear 显示清空按钮。' },
          { key: 'select-loading', label: 'Select 加载中', componentPath: 'Select', exampleName: 'Loading', description: '加载数据时的状态展示。' },
          { key: 'select-theme', label: 'Select 主题定制', componentPath: 'Select', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
          { key: 'select-grouped', label: 'Select 分组选项', componentPath: 'Select', exampleName: 'GroupedOptions', description: '支持选项分组展示。' },
          { key: 'select-max-tag', label: 'Select 标签溢出', componentPath: 'Select', exampleName: 'MaxTagCount', description: 'maxTagCount 限制标签数量。' },
          { key: 'select-tags-create', label: 'Select 创建标签', componentPath: 'Select', exampleName: 'TagsCreate', description: 'Tags 模式动态创建新选项。' },
          { key: 'select-custom-render', label: 'Select 自定义渲染', componentPath: 'Select', exampleName: 'CustomRender', description: '自定义图标、选项渲染、下拉内容。' },
        ],
      },
      {
        key: 'radio',
        label: 'Radio 单选框',
        icon: 'CheckOne',
        items: [
          { key: 'radio-basic', label: 'Radio 基础用法', componentPath: 'Radio', exampleName: 'Basic', description: '基本单选、默认选中、受控模式、禁用状态。' },
          { key: 'radio-group', label: 'Radio 单选组', componentPath: 'Radio', exampleName: 'Group', description: 'Radio.Group 数据驱动、按钮风格。' },
          { key: 'radio-size', label: 'Radio 尺寸', componentPath: 'Radio', exampleName: 'Size', description: '大、中、小三种尺寸。' },
          { key: 'radio-theme', label: 'Radio 主题定制', componentPath: 'Radio', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'checkbox',
        label: 'Checkbox 多选框',
        icon: 'CheckCorrect',
        items: [
          { key: 'checkbox-basic', label: 'Checkbox 基础用法', componentPath: 'Checkbox', exampleName: 'Basic', description: '基本多选、默认选中、受控模式、禁用状态。' },
          { key: 'checkbox-group', label: 'Checkbox 多选组', componentPath: 'Checkbox', exampleName: 'Group', description: 'Checkbox.Group 数据驱动、子组件方式。' },
          { key: 'checkbox-indeterminate', label: 'Checkbox 半选状态', componentPath: 'Checkbox', exampleName: 'Indeterminate', description: 'indeterminate 半选状态与全选联动。' },
          { key: 'checkbox-theme', label: 'Checkbox 主题定制', componentPath: 'Checkbox', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'input-number',
        label: 'InputNumber 数字输入',
        icon: 'Edit',
        items: [
          { key: 'input-number-basic', label: 'InputNumber 基础用法', componentPath: 'InputNumber', exampleName: 'Basic', description: '基本数字输入、受控模式、步进精度、禁用只读。' },
          { key: 'input-number-size', label: 'InputNumber 尺寸与附加', componentPath: 'InputNumber', exampleName: 'Size', description: '三种尺寸、前缀、前后置标签、隐藏按钮。' },
          { key: 'input-number-variant', label: 'InputNumber 状态与格式化', componentPath: 'InputNumber', exampleName: 'Variant', description: '错误/警告状态、自定义格式化。' },
          { key: 'input-number-theme', label: 'InputNumber 主题定制', componentPath: 'InputNumber', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'switch',
        label: 'Switch 开关',
        icon: 'SwitchContrast',
        items: [
          { key: 'switch-basic', label: 'Switch 基础用法', componentPath: 'Switch', exampleName: 'Basic', description: '基本开关、默认状态、受控模式、禁用。' },
          { key: 'switch-variant', label: 'Switch 尺寸与内容', componentPath: 'Switch', exampleName: 'Variant', description: '小尺寸、自定义文字和图标。' },
          { key: 'switch-loading', label: 'Switch 加载状态', componentPath: 'Switch', exampleName: 'Loading', description: 'loading 属性与异步操作。' },
          { key: 'switch-theme', label: 'Switch 主题定制', componentPath: 'Switch', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'cascader',
        label: 'Cascader 级联选择',
        icon: 'List',
        items: [
          { key: 'cascader-basic', label: 'Cascader 基础用法', componentPath: 'Cascader', exampleName: 'Basic', description: '基本级联选择、默认值、受控模式、禁用。' },
          { key: 'cascader-change-on-select', label: 'Cascader 选择即改变', componentPath: 'Cascader', exampleName: 'ChangeOnSelect', description: '允许选择父级、自定义显示、悬停展开、不同尺寸。' },
          { key: 'cascader-multiple', label: 'Cascader 多选', componentPath: 'Cascader', exampleName: 'Multiple', description: '多选模式、标签限制、多选搜索、选择即改变。' },
          { key: 'cascader-searchable', label: 'Cascader 搜索与加载', componentPath: 'Cascader', exampleName: 'Searchable', description: '搜索过滤、异步加载、状态校验。' },
          { key: 'cascader-theme', label: 'Cascader 主题定制', componentPath: 'Cascader', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题。' },
        ],
      },
      {
        key: 'tree-select',
        label: 'TreeSelect 树形下拉',
        icon: 'TreeList',
        items: [
          { key: 'tree-select-basic', label: 'TreeSelect 基础用法', componentPath: 'TreeSelect', exampleName: 'Basic', description: '基本树形下拉选择、默认值、受控模式、禁用。' },
          { key: 'tree-select-multiple', label: 'TreeSelect 多选', componentPath: 'TreeSelect', exampleName: 'Multiple', description: '多选模式、标签溢出限制。' },
          { key: 'tree-select-checkable', label: 'TreeSelect 可勾选', componentPath: 'TreeSelect', exampleName: 'Checkable', description: '树节点勾选模式、显示策略。' },
          { key: 'tree-select-searchable', label: 'TreeSelect 搜索与状态', componentPath: 'TreeSelect', exampleName: 'Searchable', description: '搜索过滤、错误和警告状态、尺寸。' },
          { key: 'tree-select-async', label: 'TreeSelect 异步加载', componentPath: 'TreeSelect', exampleName: 'AsyncLoad', description: '点击展开图标异步加载子节点。' },
          { key: 'tree-select-controlled-expanded', label: 'TreeSelect 受控展开', componentPath: 'TreeSelect', exampleName: 'ControlledExpanded', description: '通过 treeExpandedKeys 控制展开节点。' },
          { key: 'tree-select-custom-field-names', label: 'TreeSelect 自定义字段名', componentPath: 'TreeSelect', exampleName: 'CustomFieldNames', description: '使用 fieldNames 映射后端数据结构。' },
          { key: 'tree-select-disabled-nodes', label: 'TreeSelect 禁用节点', componentPath: 'TreeSelect', exampleName: 'DisabledNodes', description: '禁用指定节点，不影响父节点联动。' },
          { key: 'tree-select-large-data', label: 'TreeSelect 大数据量', componentPath: 'TreeSelect', exampleName: 'LargeData', description: '上千个节点下的搜索和选择体验。' },
          { key: 'tree-select-theme', label: 'TreeSelect 主题定制', componentPath: 'TreeSelect', exampleName: 'Theme', description: '通过 ConfigProvider 自定义主题、尺寸。' },
        ],
      },
      {
        key: 'rate',
        label: 'Rate 评分',
        icon: 'Star',
        items: [
          { key: 'rate-basic', label: 'Rate 基础用法', componentPath: 'Rate', exampleName: 'Basic', description: '基本的评分组件，支持受控和非受控模式。' },
          { key: 'rate-half', label: 'Rate 半星', componentPath: 'Rate', exampleName: 'Half', description: '允许选择半星，更精确的评分。' },
          { key: 'rate-custom-character', label: 'Rate 自定义字符', componentPath: 'Rate', exampleName: 'CustomCharacter', description: '使用自定义字符替代默认星星。' },
          { key: 'rate-disabled', label: 'Rate 禁用状态', componentPath: 'Rate', exampleName: 'Disabled', description: '禁用和只读状态。' },
          { key: 'rate-size', label: 'Rate 尺寸', componentPath: 'Rate', exampleName: 'Size', description: '小、中、大三种尺寸。' },
          { key: 'rate-tooltips', label: 'Rate 提示文字', componentPath: 'Rate', exampleName: 'Tooltips', description: '为每个评分项添加提示文字。' },
        ],
      },
      {
        key: 'color-picker',
        label: 'ColorPicker 颜色选择器',
        icon: 'Fill',
        items: [
          { key: 'color-picker-basic', label: 'ColorPicker 基础用法', componentPath: 'ColorPicker', exampleName: 'Basic', description: '基本的颜色选择器，支持 hex/rgb/hsb 格式切换。' },
          { key: 'color-picker-size', label: 'ColorPicker 尺寸', componentPath: 'ColorPicker', exampleName: 'Size', description: '小、中、大三种尺寸。' },
          { key: 'color-picker-variant', label: 'ColorPicker 变体', componentPath: 'ColorPicker', exampleName: 'Variant', description: '可清除、显示文本、禁用、无透明度等状态。' },
          { key: 'color-picker-format', label: 'ColorPicker 格式', componentPath: 'ColorPicker', exampleName: 'Format', description: '指定默认颜色格式，受控模式下未选中格式禁用。' },
          { key: 'color-picker-presets', label: 'ColorPicker 预设色板', componentPath: 'ColorPicker', exampleName: 'Presets', description: '自定义预设颜色分组。' },
          { key: 'color-picker-custom-trigger', label: 'ColorPicker 自定义触发器', componentPath: 'ColorPicker', exampleName: 'CustomTrigger', description: '通过 children 替换默认触发器。' },
          { key: 'color-picker-placement', label: 'ColorPicker 弹出方向', componentPath: 'ColorPicker', exampleName: 'Placement', description: '四个弹出方向，自动检测视口溢出。' },
          { key: 'color-picker-theme', label: 'ColorPicker 主题定制', componentPath: 'ColorPicker', exampleName: 'ThemeConfig', description: '通过 ConfigProvider 自定义主题样式。' },
        ],
      },
      {
        key: 'date-picker',
        label: 'DatePicker 日期选择',
        icon: 'Calendar',
        items: [
          { key: 'date-picker-basic', label: 'DatePicker 基础用法', componentPath: 'DatePicker', exampleName: 'Basic', description: '基本的日期选择器。' },
          { key: 'date-picker-controlled', label: 'DatePicker 受控模式', componentPath: 'DatePicker', exampleName: 'Controlled', description: '通过 value 和 onChange 实现受控，支持外部操作。' },
          { key: 'date-picker-size', label: 'DatePicker 尺寸', componentPath: 'DatePicker', exampleName: 'Size', description: '小、中、大三种尺寸。' },
          { key: 'date-picker-picker-mode', label: 'DatePicker 选择模式', componentPath: 'DatePicker', exampleName: 'PickerMode', description: '支持日期、周、月、年四种选择模式。' },
          { key: 'date-picker-variant', label: 'DatePicker 变体', componentPath: 'DatePicker', exampleName: 'Variant', description: '禁用、不可清除、自定义占位、自定义格式。' },
          { key: 'date-picker-placement', label: 'DatePicker 弹出方向', componentPath: 'DatePicker', exampleName: 'Placement', description: '控制面板弹出位置，支持四个方向，自动翻转。' },
          { key: 'date-picker-disabled-date', label: 'DatePicker 禁用日期', componentPath: 'DatePicker', exampleName: 'DisabledDate', description: '通过 disabledDate 禁用指定日期，支持多种场景。' },
          { key: 'date-picker-show-time', label: 'DatePicker 时间选择', componentPath: 'DatePicker', exampleName: 'ShowTime', description: '开启 showTime 后支持选择时分秒。' },
          { key: 'date-picker-presets', label: 'DatePicker 预设日期', componentPath: 'DatePicker', exampleName: 'Presets', description: '通过 presets 提供快捷日期选项。' },
          { key: 'date-picker-input-week', label: 'DatePicker 输入与周格式', componentPath: 'DatePicker', exampleName: 'InputAndWeek', description: '手动输入日期和周模式自定义格式。' },
          { key: 'date-picker-theme', label: 'DatePicker 主题定制', componentPath: 'DatePicker', exampleName: 'ThemeConfig', description: '通过 ConfigProvider 自定义主题样式。' },
        ],
      },
      {
        key: 'range-picker',
        label: 'RangePicker 范围选择',
        icon: 'Calendar',
        items: [
          { key: 'range-picker-basic', label: 'RangePicker 基础用法', componentPath: 'DatePicker', exampleName: 'RangePickerBasic', description: '基本的日期范围选择器，双面板联动。' },
          { key: 'range-picker-size', label: 'RangePicker 尺寸', componentPath: 'DatePicker', exampleName: 'RangePickerSize', description: '小、中、大三种尺寸。' },
          { key: 'range-picker-presets', label: 'RangePicker 预设范围', componentPath: 'DatePicker', exampleName: 'RangePickerPresets', description: '通过 presets 提供快捷范围选项（今天、本周、本月等）。' },
          { key: 'range-picker-disabled', label: 'RangePicker 禁用日期', componentPath: 'DatePicker', exampleName: 'RangePickerDisabled', description: '通过 disabledDate 禁用不可选的日期。' },
          { key: 'range-picker-format', label: 'RangePicker 自定义格式', componentPath: 'DatePicker', exampleName: 'RangePickerFormat', description: '通过 format 自定义日期显示格式。' },
          { key: 'range-picker-show-time', label: 'RangePicker 日期时间范围', componentPath: 'DatePicker', exampleName: 'RangePickerShowTime', description: '开启 showTime 后支持选择起止时间。' },
          { key: 'range-picker-controlled', label: 'RangePicker 受控模式', componentPath: 'DatePicker', exampleName: 'RangePickerControlled', description: '通过 value 和 onChange 实现受控，支持外部操作。' },
          { key: 'range-picker-calendar-change', label: 'RangePicker 日历回调', componentPath: 'DatePicker', exampleName: 'RangePickerCalendarChange', description: '通过 onCalendarChange 实时监听面板日期变化。' },
        ],
      },
      {
        key: 'time-picker',
        label: 'TimePicker 时间选择',
        icon: 'Time',
        items: [
          { key: 'time-picker-basic', label: 'TimePicker 基础用法', componentPath: 'TimePicker', exampleName: 'Basic', description: '基本的时间选择器，支持滚动列选择和手动输入。' },
          { key: 'time-picker-size', label: 'TimePicker 尺寸', componentPath: 'TimePicker', exampleName: 'Size', description: '小、中、大三种尺寸。' },
          { key: 'time-picker-controlled', label: 'TimePicker 受控模式', componentPath: 'TimePicker', exampleName: 'Controlled', description: '通过 value 和 onChange 实现受控，支持外部操作。' },
          { key: 'time-picker-disabled-time', label: 'TimePicker 禁用时间', componentPath: 'TimePicker', exampleName: 'DisabledTime', description: '通过 disabledHours/disabledMinutes/disabledSeconds 禁用特定时间。' },
          { key: 'time-picker-format', label: 'TimePicker 格式与步长', componentPath: 'TimePicker', exampleName: 'Format', description: '自定义格式、12小时制和步长。' },
          { key: 'time-picker-theme', label: 'TimePicker 主题定制', componentPath: 'TimePicker', exampleName: 'ThemeConfig', description: '通过 ConfigProvider 自定义主题样式。' },
          { key: 'time-picker-range-basic', label: 'TimePicker.RangePicker 基础用法', componentPath: 'TimePicker', exampleName: 'RangeBasic', description: '时间范围选择器，选择开始和结束时间。' },
          { key: 'time-picker-range-size', label: 'TimePicker.RangePicker 尺寸', componentPath: 'TimePicker', exampleName: 'RangeSize', description: '范围选择器小、中、大三种尺寸。' },
          { key: 'time-picker-range-variant', label: 'TimePicker.RangePicker 变体', componentPath: 'TimePicker', exampleName: 'RangeVariant', description: '隐藏秒列、禁用、12小时制等变体。' },
        ],
      },
      {
        key: 'transfer',
        label: 'Transfer 穿梭框',
        icon: 'Transfer',
        items: [
          { key: 'transfer-basic', label: 'Transfer 基础用法', componentPath: 'Transfer', exampleName: 'Basic', description: '基本的穿梭框，支持全选、单选和批量移动。' },
          { key: 'transfer-search', label: 'Transfer 带搜索', componentPath: 'Transfer', exampleName: 'Search', description: '开启搜索功能，支持自定义过滤逻辑。' },
          { key: 'transfer-one-way', label: 'Transfer 单向模式', componentPath: 'Transfer', exampleName: 'OneWay', description: '单向穿梭，仅允许从左向右移动。' },
          { key: 'transfer-custom-render', label: 'Transfer 自定义渲染', componentPath: 'Transfer', exampleName: 'CustomRender', description: '自定义列表项的渲染内容和搜索匹配。' },
          { key: 'transfer-theme', label: 'Transfer 主题定制', componentPath: 'Transfer', exampleName: 'ThemeConfig', description: '通过 ConfigProvider 自定义主题样式。' },
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
    title: '数据展示',
    icon: 'Table',
    components: [
      {
        key: 'table',
        label: 'Table 表格',
        icon: 'TableFile',
        items: [
          { key: 'table-basic', label: 'Table 基础用法', componentPath: 'Table', exampleName: 'Basic', description: '最基本的表格用法，展示列和数据。' },
          { key: 'table-sorter', label: 'Table 排序', componentPath: 'Table', exampleName: 'Sorter', description: '支持列排序功能。' },
          { key: 'table-selection', label: 'Table 行选择', componentPath: 'Table', exampleName: 'Selection', description: '支持选择行数据。' },
          { key: 'table-bordered', label: 'Table 边框', componentPath: 'Table', exampleName: 'Bordered', description: '带边框的表格。' },
          { key: 'table-size', label: 'Table 尺寸', componentPath: 'Table', exampleName: 'Size', description: '小、中、大三种尺寸。' },
          { key: 'table-expandable', label: 'Table 展开行', componentPath: 'Table', exampleName: 'Expandable', description: '可展开的行内容。' },
          { key: 'table-pagination', label: 'Table 分页', componentPath: 'Table', exampleName: 'Pagination', description: '带分页的表格。' },
          { key: 'table-loading', label: 'Table 加载中', componentPath: 'Table', exampleName: 'Loading', description: '加载状态展示。' },
          { key: 'table-fixed-header', label: 'Table 固定表头', componentPath: 'Table', exampleName: 'FixedHeader', description: '固定表头，支持横向滚动。' },
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
          { key: 'dialog-custom', label: 'Dialog 自定义', componentPath: 'Dialog', exampleName: 'Custom', description: '自定义宽度、居中显示、按钮文字等。' },
          { key: 'dialog-custom-footer', label: 'Dialog 自定义底部', componentPath: 'Dialog', exampleName: 'CustomFooter', description: '自定义对话框底部内容或隐藏底部。' },
          { key: 'dialog-use-dialog', label: 'Dialog useDialog', componentPath: 'Dialog', exampleName: 'UseDialog', description: '使用 useDialog Hook 继承主题上下文。' },
        ],
      },
      {
        key: 'drawer',
        label: 'Drawer 抽屉',
        icon: 'Box',
        items: [
          { key: 'drawer-basic', label: 'Drawer 基础用法', componentPath: 'Drawer', exampleName: 'Basic', description: '基本的抽屉用法，从屏幕边缘滑出。' },
          { key: 'drawer-placement', label: 'Drawer 弹出方向', componentPath: 'Drawer', exampleName: 'Placement', description: '支持上、右、下、左四个方向。' },
          { key: 'drawer-extra', label: 'Drawer 额外操作', componentPath: 'Drawer', exampleName: 'Extra', description: '头部额外操作区和底部操作栏。' },
          { key: 'drawer-size', label: 'Drawer 尺寸', componentPath: 'Drawer', exampleName: 'Size', description: '默认、大尺寸和自定义宽度。' },
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
      {
        key: 'result',
        label: 'Result 结果',
        icon: 'CheckCorrect',
        items: [
          { key: 'result-basic', label: 'Result 基础用法', componentPath: 'Result', exampleName: 'Basic', description: '成功状态的反馈结果，带有标题、描述和操作按钮。' },
          { key: 'result-status', label: 'Result 所有状态', componentPath: 'Result', exampleName: 'Status', description: '展示所有可用的结果状态：success、error、warning、info 和 HTTP 状态码。' },
          { key: 'result-custom-icon', label: 'Result 自定义图标', componentPath: 'Result', exampleName: 'CustomIcon', description: '通过 icon 属性自定义结果图标。' },
          { key: 'result-content', label: 'Result 自定义内容', componentPath: 'Result', exampleName: 'Content', description: '在副标题下方添加额外的内容区域。' },
        ],
      },
      {
        key: 'watermark',
        label: 'Watermark 水印',
        icon: 'Shield',
        items: [
          { key: 'watermark-basic', label: 'Watermark 基础用法', componentPath: 'Watermark', exampleName: 'Basic', description: '基础的文字水印。' },
          { key: 'watermark-multiline', label: 'Watermark 多行文本', componentPath: 'Watermark', exampleName: 'MultiLine', description: '支持多行文字水印。' },
          { key: 'watermark-image', label: 'Watermark 图片水印', componentPath: 'Watermark', exampleName: 'Image', description: '使用图片作为水印内容。' },
          { key: 'watermark-content', label: 'Watermark 覆盖内容', componentPath: 'Watermark', exampleName: 'Content', description: '水印覆盖在子元素上方。' },
          { key: 'watermark-custom', label: 'Watermark 自定义样式', componentPath: 'Watermark', exampleName: 'CustomStyle', description: '自定义水印的颜色、大小、旋转角度等。' },
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
