import { ReactNode } from 'react';

/**
 * 组件级主题配置
 */
export interface ComponentThemeConfig {
  /** 按钮组件配置 */
  Button?: {
    /** 主色，用于 primary 类型按钮 */
    colorPrimary?: string;
    /** 悬停颜色 */
    colorPrimaryHover?: string;
    /** 激活颜色 */
    colorPrimaryActive?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 控件高度（像素） */
    controlHeight?: number;
    /** 字体大小（像素） */
    fontSize?: number;
  };
  /** 输入框组件配置 */
  Input?: {
    /** 边框颜色 */
    colorBorder?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 控件高度（像素） */
    controlHeight?: number;
    /** 悬停边框颜色 */
    colorBorderHover?: string;
    /** 聚焦边框颜色 */
    colorBorderFocus?: string;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用状态背景色 */
    colorBgDisabled?: string;
    /** 禁用状态文本颜色 */
    colorTextDisabled?: string;
    /** 错误状态边框颜色 */
    colorError?: string;
    /** 警告状态边框颜色 */
    colorWarning?: string;
    /** 成功状态边框颜色 */
    colorSuccess?: string;
    /** 图标颜色 */
    colorIcon?: string;
    /** 图标悬停颜色 */
    colorIconHover?: string;
    /** 前后置标签背景色 */
    colorAddonBg?: string;
    /** 前后置标签文本颜色 */
    colorAddonText?: string;
  };
  /** 图标组件配置 */
  Icon?: {
    /** 默认图标尺寸（像素） */
    size?: number;
    /** 主色图标颜色 */
    colorPrimary?: string;
    /** 成功状态颜色 */
    colorSuccess?: string;
    /** 警告状态颜色 */
    colorWarning?: string;
    /** 错误状态颜色 */
    colorError?: string;
    /** 信息状态颜色 */
    colorInfo?: string;
    /** 默认颜色 */
    colorDefault?: string;
    /** 悬停透明度 */
    hoverOpacity?: number;
    /** 激活透明度 */
    activeOpacity?: number;
  };
  /** 排版组件配置 */
  Typography?: {
    // === 颜色配置 ===
    /** 主要文本颜色 */
    colorText?: string;
    /** 次要文本颜色 */
    colorTextSecondary?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 链接颜色 */
    colorLink?: string;
    /** 链接悬停颜色 */
    colorLinkHover?: string;
    /** 链接激活颜色 */
    colorLinkActive?: string;
    
    // === 类型状态颜色 ===
    /** Success 状态颜色 */
    colorSuccess?: string;
    /** Warning 状态颜色 */
    colorWarning?: string;
    /** Danger 状态颜色 */
    colorDanger?: string;
    
    // === 字号配置 ===
    /** 基础字号（像素） */
    fontSize?: number;
    /** 小字号（像素） */
    fontSizeSM?: number;
    /** 大字号（像素） */
    fontSizeLG?: number;
    /** 超大字号（像素） */
    fontSizeXL?: number;
    
    // === 标题字号配置 ===
    /** H1 字号（像素） */
    heading1FontSize?: number;
    /** H2 字号（像素） */
    heading2FontSize?: number;
    /** H3 字号（像素） */
    heading3FontSize?: number;
    /** H4 字号（像素） */
    heading4FontSize?: number;
    /** H5 字号（像素） */
    heading5FontSize?: number;
    
    // === 行高配置 ===
    /** 基础行高 */
    lineHeight?: number;
    /** H1 行高 */
    heading1LineHeight?: number;
    /** H2 行高 */
    heading2LineHeight?: number;
    /** H3 行高 */
    heading3LineHeight?: number;
    /** H4 行高 */
    heading4LineHeight?: number;
    /** H5 行高 */
    heading5LineHeight?: number;
    
    // === 字重配置 ===
    /** 标题字重 */
    headingFontWeight?: number;
    /** 加粗字重 */
    strongFontWeight?: number;
    
    // === 特殊样式配置 ===
    /** 标记背景色 */
    markBackgroundColor?: string;
    /** 代码块背景色 */
    codeBackgroundColor?: string;
    /** 代码块边框色 */
    codeBorderColor?: string;
    /** 代码块圆角 */
    codeBorderRadius?: number;
    
    // === 操作按钮配置 ===
    /** 操作按钮间距（像素） */
    operationGap?: number;
    /** 操作按钮悬停背景色透明度 */
    operationHoverBgOpacity?: number;
    /** 链接聚焦轮廓颜色透明度 */
    linkFocusOpacity?: number;
    
    // === 编辑输入框配置 ===
    /** 编辑框边框颜色 */
    editableBorderColor?: string;
    /** 编辑框聚焦阴影颜色透明度 */
    editableFocusShadowOpacity?: number;
    
    // === 展开/收起配置 ===
    /** 展开按钮颜色 */
    expandColor?: string;
    /** 展开按钮悬停颜色 */
    expandHoverColor?: string;
  };
  /** Tooltip 组件配置 */
  Tooltip?: {
    // === 颜色配置 ===
    /** 默认背景色 */
    colorBgDefault?: string;
    /** 文本颜色 */
    colorText?: string;
    
    // === 尺寸配置 ===
    /** 字体大小（像素） */
    fontSize?: number;
    /** 行高 */
    lineHeight?: number;
    /** 最大宽度（像素） */
    maxWidth?: number;
    /** 最小高度（像素） */
    minHeight?: number;
    /** 内边距 */
    padding?: string;
    /** 圆角（像素） */
    borderRadius?: number;
    
    // === 视觉效果 ===
    /** 阴影 */
    boxShadow?: string;
    /** 箭头尺寸（像素） */
    arrowSize?: number;
    /** 箭头偏移量（像素） */
    arrowOffset?: number;
    
    // === 层级与动画 ===
    /** z-index */
    zIndex?: number;
    /** 动画时长（秒） */
    animationDuration?: number;
    /** 动画缓动函数 */
    animationTimingFunction?: string;
  };
  /** Divider 分割线组件配置 */
  Divider?: {
    /** 边框颜色 */
    colorBorder?: string;
    /** 字体大小（像素） */
    fontSize?: number;
  };
  /** Grid 栅格组件配置 */
  Grid?: {
    // 响应式断点配置（像素）
    screenXS?: number;           // xs 断点（默认 480px）
    screenSM?: number;           // sm 断点（默认 576px）
    screenMD?: number;           // md 断点（默认 768px）
    screenLG?: number;           // lg 断点（默认 992px）
    screenXL?: number;           // xl 断点（默认 1200px）
    screenXXL?: number;          // xxl 断点（默认 1600px）
  };
  /** Layout 布局组件配置 */
  Layout?: {
    // === 高度配置 ===
    /** Header 高度（像素） */
    headerHeight?: number;
    /** Footer 高度（像素） */
    footerHeight?: number;
    
    // === Sider 配置 ===
    /** Sider 宽度（像素） */
    siderWidth?: number;
    /** Sider 收起宽度（像素） */
    siderCollapsedWidth?: number;
    
    // === 颜色配置 ===
    /** 布局背景色 */
    colorBg?: string;
    /** Header 背景色 */
    headerColorBg?: string;
    /** Header 文本色 */
    headerColorText?: string;
    /** Sider 背景色 */
    siderColorBg?: string;
    /** Content 背景色 */
    contentColorBg?: string;
    /** Footer 背景色 */
    footerColorBg?: string;
    /** Footer 文本色 */
    footerColorText?: string;
    /** Sider 触发器文本色 */
    siderTriggerColorText?: string;
    /** Sider 触发器背景色 */
    siderTriggerColorBg?: string;
    /** Sider 触发器悬停背景色 */
    siderTriggerColorBgHover?: string;
    
    // === 间距配置 ===
    /** 内容区域内边距 */
    contentPadding?: string;
  };
  /** Menu 菜单组件配置 */
  Menu?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 主色 */
    colorPrimary?: string;
    /** 主色悬停 */
    colorPrimaryHover?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 次要文本颜色 */
    colorTextSecondary?: string;
    /** 选中项背景色 */
    itemSelectedBg?: string;
    /** 选中项文本颜色 */
    itemSelectedColor?: string;
    /** 悬停背景色 */
    itemHoverBg?: string;
    /** 激活背景色 */
    itemActiveBg?: string;
  };
  /** FloatButton 悬浮按钮组件配置 */
  FloatButton?: {
    /** 主色 */
    colorPrimary?: string;
    /** 主色悬停 */
    colorPrimaryHover?: string;
    /** 主色激活 */
    colorPrimaryActive?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
  };
  /** Breadcrumb 面包屑组件配置 */
  Breadcrumb?: {
    /** 文本颜色 */
    colorText?: string;
    /** 链接颜色 */
    colorLink?: string;
    /** 链接悬停颜色 */
    colorLinkHover?: string;
    /** 分隔符颜色 */
    separatorColor?: string;
    /** 字体大小（像素） */
    fontSize?: number;
  };
  /** Steps 步骤条组件配置 */
  Steps?: {
    /** 主色 */
    colorPrimary?: string;
    /** 成功色 */
    colorSuccess?: string;
    /** 错误色 */
    colorError?: string;
    /** 等待状态颜色 */
    colorWait?: string;
    /** 边框颜色 */
    colorBorder?: string;
    /** 标题颜色 */
    colorText?: string;
    /** 描述颜色 */
    colorTextSecondary?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 图标尺寸（像素） */
    iconSize?: number;
  };
  /** Anchor 锚点组件配置 */
  Anchor?: {
    /** 主色 */
    colorPrimary?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 链接内边距（像素） */
    linkPadding?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 指示器宽度（像素） */
    inkWidth?: number;
  };
  /** Alert 警告提示组件配置 */
  Alert?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 标题字号（像素） */
    titleFontSize?: number;
    /** 图标大小（像素） */
    iconSize?: number;
    /** 成功状态背景色 */
    colorSuccessBg?: string;
    /** 成功状态边框色 */
    colorSuccessBorder?: string;
    /** 信息状态背景色 */
    colorInfoBg?: string;
    /** 信息状态边框色 */
    colorInfoBorder?: string;
    /** 警告状态背景色 */
    colorWarningBg?: string;
    /** 警告状态边框色 */
    colorWarningBorder?: string;
    /** 错误状态背景色 */
    colorErrorBg?: string;
    /** 错误状态边框色 */
    colorErrorBorder?: string;
  };
  /** Message 全局提示组件配置 */
  Message?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 最大宽度（像素） */
    maxWidth?: number;
  };
  /** Progress 进度条组件配置 */
  Progress?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 主色 */
    colorPrimary?: string;
    /** 成功色 */
    colorSuccess?: string;
    /** 错误色 */
    colorError?: string;
    /** 轨道颜色 */
    colorTrail?: string;
  };
  /** Notification 通知提醒框组件配置 */
  Notification?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 描述文字字号（像素） */
    descriptionFontSize?: number;
    /** 图标尺寸（像素） */
    iconSize?: number;
    /** 关闭按钮尺寸（像素） */
    closeIconSize?: number;
    /** 内边距 */
    padding?: string;
    /** z-index */
    zIndex?: number;
    /** 背景色 */
    colorBg?: string;
  };
  /** Loading 加载中组件配置 */
  Loading?: {
    /** 主色 */
    colorPrimary?: string;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 默认尺寸加载图标大小（像素） */
    dotSize?: number;
    /** 小号加载图标大小（像素） */
    dotSizeSM?: number;
    /** 大号加载图标大小（像素） */
    dotSizeLG?: number;
  };
  /** Skeleton 占位符组件配置 */
  Skeleton?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 占位背景色 */
    colorBg?: string;
    /** 高亮色（动画效果） */
    colorHighlight?: string;
  };
  /** Affix 固钉组件配置 */
  Affix?: {
    /** z-index 层级 */
    zIndex?: number;
  };
  /** Result 结果组件配置 */
  Result?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 标题字号（像素） */
    titleFontSize?: number;
    /** 副标题字号（像素） */
    subTitleFontSize?: number;
    /** 图标尺寸（像素） */
    iconSize?: number;
    /** 成功状态颜色 */
    colorSuccess?: string;
    /** 错误状态颜色 */
    colorError?: string;
    /** 警告状态颜色 */
    colorWarning?: string;
    /** 信息状态颜色 */
    colorInfo?: string;
  };
  /** Drawer 抽屉组件配置 */
  Drawer?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 标题字号（像素） */
    titleFontSize?: number;
    /** 背景色 */
    colorBg?: string;
    /** 遮罩背景色 */
    maskBgColor?: string;
    /** 头部内边距 */
    headerPadding?: string;
    /** 内容区内边距 */
    bodyPadding?: string;
    /** 底部内边距 */
    footerPadding?: string;
    /** z-index */
    zIndex?: number;
    /** 阴影 */
    boxShadow?: string;
  };
  /** Dialog 对话框组件配置 */
  Dialog?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 标题字号（像素） */
    titleFontSize?: number;
    /** 背景色 */
    colorBg?: string;
    /** 遮罩背景色 */
    maskBgColor?: string;
    /** 头部内边距 */
    headerPadding?: string;
    /** 内容区内边距 */
    bodyPadding?: string;
    /** 底部内边距 */
    footerPadding?: string;
    /** z-index */
    zIndex?: number;
    /** 阴影 */
    boxShadow?: string;
  };
  /** Watermark 水印组件配置 */
  Watermark?: {
    /** 字体颜色 */
    fontColor?: string;
    /** 字体大小（像素） */
    fontSize?: number;
    /** z-index */
    zIndex?: number;
  };
  /** Table 表格组件配置 */
  Table?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 表头背景色 */
    headerBg?: string;
    /** 表头文字颜色 */
    headerColor?: string;
    /** 行悬停背景色 */
    rowHoverBg?: string;
    /** 边框颜色 */
    borderColor?: string;
    /** 斑马纹背景色 */
    stripeBg?: string;
    /** 选中行背景色 */
    selectedRowBg?: string;
  };
  /** 选择器组件配置 */
  Select?: {
    /** 边框圆角（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 控件高度（像素） */
    controlHeight?: number;
    /** 边框颜色 */
    colorBorder?: string;
    /** 悬停边框颜色 */
    colorBorderHover?: string;
    /** 聚焦边框颜色 */
    colorBorderFocus?: string;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 错误状态颜色 */
    colorError?: string;
    /** 警告状态颜色 */
    colorWarning?: string;
    /** 下拉面板背景色 */
    dropdownBg?: string;
    /** 选项悬停背景色 */
    optionActiveBg?: string;
    /** 选项选中背景色 */
    optionSelectedBg?: string;
    /** 多选标签背景色 */
    tagBg?: string;
  };
  /** 单选框组件配置 */
  Radio?: {
    /** 主色 */
    colorPrimary?: string;
    /** 悬停主色 */
    colorPrimaryHover?: string;
    /** 边框颜色 */
    colorBorder?: string;
    /** 圆角（用于 button 模式） */
    borderRadius?: number;
    /** 字体大小 */
    fontSize?: number;
    /** 控件高度（button 模式） */
    controlHeight?: number;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
  };
  /** 多选框组件配置 */
  Checkbox?: {
    /** 主色 */
    colorPrimary?: string;
    /** 悬停主色 */
    colorPrimaryHover?: string;
    /** 边框颜色 */
    colorBorder?: string;
    /** 圆角 */
    borderRadius?: number;
    /** 字体大小 */
    fontSize?: number;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
  };
  /** 数字输入框组件配置 */
  InputNumber?: {
    /** 主色 */
    colorPrimary?: string;
    /** 边框颜色 */
    colorBorder?: string;
    /** 悬停边框颜色 */
    colorBorderHover?: string;
    /** 聚焦边框颜色 */
    colorBorderFocus?: string;
    /** 圆角 */
    borderRadius?: number;
    /** 字体大小 */
    fontSize?: number;
    /** 控件高度 */
    controlHeight?: number;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
    /** 错误色 */
    colorError?: string;
    /** 警告色 */
    colorWarning?: string;
  };
  /** 开关组件配置 */
  Switch?: {
    /** 主色（开启态背景） */
    colorPrimary?: string;
    /** 悬停主色 */
    colorPrimaryHover?: string;
    /** 圆角 */
    borderRadius?: number;
    /** 关闭态背景色 */
    colorBg?: string;
    /** 关闭态悬停背景色 */
    colorBgHover?: string;
    /** 文字颜色 */
    colorText?: string;
  };
  /** 级联选择器组件配置 */
  Cascader?: {
    /** 边框圆角（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 控件高度（像素） */
    controlHeight?: number;
    /** 边框颜色 */
    colorBorder?: string;
    /** 悬停边框颜色 */
    colorBorderHover?: string;
    /** 聚焦边框颜色 */
    colorBorderFocus?: string;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 错误状态颜色 */
    colorError?: string;
    /** 警告状态颜色 */
    colorWarning?: string;
    /** 下拉面板背景色 */
    dropdownBg?: string;
    /** 选项悬停背景色 */
    optionActiveBg?: string;
    /** 选项选中背景色 */
    optionSelectedBg?: string;
  };
  /** 树形下拉组件配置 */
  TreeSelect?: {
    /** 边框圆角（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 控件高度（像素） */
    controlHeight?: number;
    /** 边框颜色 */
    colorBorder?: string;
    /** 悬停边框颜色 */
    colorBorderHover?: string;
    /** 聚焦边框颜色 */
    colorBorderFocus?: string;
    /** 背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用背景色 */
    colorBgDisabled?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 错误状态颜色 */
    colorError?: string;
    /** 警告状态颜色 */
    colorWarning?: string;
    /** 下拉面板背景色 */
    dropdownBg?: string;
    /** 选项悬停背景色 */
    optionActiveBg?: string;
    /** 选项选中背景色 */
    optionSelectedBg?: string;
    /** 多选标签背景色 */
    tagBg?: string;
  };
  /** 评分组件配置 */
  Rate?: {
    /** 选中时的星星颜色 */
    starColor?: string;
    /** 未选中时的星星颜色 */
    starBg?: string;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 小号星星尺寸（像素） */
    starSizeSM?: number;
    /** 中号星星尺寸（像素） */
    starSize?: number;
    /** 大号星星尺寸（像素） */
    starSizeLG?: number;
  };
  /** 颜色选择器组件配置 */
  ColorPicker?: {
    /** 主色（格式按钮激活色、聚焦环色） */
    colorPrimary?: string;
    /** hover 主色 */
    colorPrimaryHover?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 触发器边框颜色 */
    colorBorder?: string;
    /** hover 边框颜色 */
    colorBorderHover?: string;
    /** focus 边框颜色 */
    colorBorderFocus?: string;
    /** 面板背景色 */
    colorBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 面板宽度（像素） */
    panelWidth?: number;
  };
  /** 日期选择器组件配置 */
  DatePicker?: {
    /** 主色（选中态、今日标记） */
    colorPrimary?: string;
    /** 主色-hover（面板按钮 hover 态） */
    colorPrimaryHover?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 触发器边框颜色 */
    colorBorder?: string;
    /** 触发器 hover 边框颜色 */
    colorBorderHover?: string;
    /** 触发器 focus 边框颜色 */
    colorBorderFocus?: string;
    /** 触发器背景色 */
    colorBg?: string;
    /** 面板背景色 */
    panelBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 控件高度（像素） */
    controlHeight?: number;
  };
  /** 时间选择器组件配置 */
  TimePicker?: {
    /** 主色 */
    colorPrimary?: string;
    /** hover 主色 */
    colorPrimaryHover?: string;
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 边框颜色 */
    colorBorder?: string;
    /** hover 边框颜色 */
    colorBorderHover?: string;
    /** focus 边框颜色 */
    colorBorderFocus?: string;
    /** 触发器背景色 */
    colorBg?: string;
    /** 面板背景色 */
    panelBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 控件高度（像素） */
    controlHeight?: number;
  };
  /** 穿梭框组件配置 */
  Transfer?: {
    /** 圆角大小（像素） */
    borderRadius?: number;
    /** 字体大小（像素） */
    fontSize?: number;
    /** 主色 */
    colorPrimary?: string;
    /** hover 主色 */
    colorPrimaryHover?: string;
    /** 边框颜色 */
    colorBorder?: string;
    /** 背景色 */
    colorBg?: string;
    /** 标题栏背景色 */
    headerBg?: string;
    /** 文本颜色 */
    colorText?: string;
    /** 禁用文本颜色 */
    colorTextDisabled?: string;
    /** 列表项悬停背景色 */
    itemHoverBg?: string;
    /** 列表项选中背景色 */
    itemActiveBg?: string;
  };
  /** 空状态组件配置 */
  Empty?: {
    /** 字体大小（像素） */
    fontSize?: number;
    /** 描述文本颜色 */
    descriptionColor?: string;
    /** 图片区域高度（像素） */
    imageHeight?: number;
    /** 装饰图标颜色 */
    iconColor?: string;
    /** 装饰图标背景色 */
    iconBg?: string;
    /** 插图边框颜色 */
    borderColor?: string;
    /** 插图面板背景色 */
    panelBg?: string;
    /** 插图内容背景色 */
    contentBg?: string;
    /** 插图细节线条颜色 */
    detailColor?: string;
    /** 插图阴影颜色 */
    shadowColor?: string;
  };
  // 可以继续添加其他组件的配置
}

/**
 * 主题配置接口
 */
export interface ThemeConfig {
  /** 主题色 */
  primaryColor?: string;
  /** 主题色悬停 */
  primaryHoverColor?: string;
  /** 主题色激活 */
  primaryActiveColor?: string;
  /** 成功色 */
  successColor?: string;
  /** 警告色 */
  warningColor?: string;
  /** 错误色 */
  errorColor?: string;
  /** 信息色 */
  infoColor?: string;
  /** 圆角 */
  borderRadius?: number;
  /** 字体大小 */
  fontSize?: number;
  /** 行高 */
  lineHeight?: number;
  /** 小间距（像素） */
  paddingSM?: number;
  /** 中间距（像素） */
  paddingMD?: number;
  /** 大间距（像素） */
  paddingLG?: number;
  /** 边框颜色 */
  borderColorBase?: string;
  
  // Typography 全局配置
  /** 小字号（像素） */
  fontSizeSM?: number;
  /** 大字号（像素） */
  fontSizeLG?: number;
  /** 超大字号（像素） */
  fontSizeXL?: number;
  /** H1 标题字号（像素） */
  headingLevel1FontSize?: number;
  /** H2 标题字号（像素） */
  headingLevel2FontSize?: number;
  /** H3 标题字号（像素） */
  headingLevel3FontSize?: number;
  /** H4 标题字号（像素） */
  headingLevel4FontSize?: number;
  /** H5 标题字号（像素） */
  headingLevel5FontSize?: number;
  /** H1 标题字号-中等屏幕（像素） */
  headingLevel1FontSizeMD?: number;
  /** H2 标题字号-中等屏幕（像素） */
  headingLevel2FontSizeMD?: number;
  /** H3 标题字号-中等屏幕（像素） */
  headingLevel3FontSizeMD?: number;
  /** H1 标题行高 */
  headingLevel1LineHeight?: number;
  /** H2 标题行高 */
  headingLevel2LineHeight?: number;
  /** H3 标题行高 */
  headingLevel3LineHeight?: number;
  /** H4 标题行高 */
  headingLevel4LineHeight?: number;
  /** H5 标题行高 */
  headingLevel5LineHeight?: number;
  /** 标记背景色 */
  markBackgroundColor?: string;
  /** 代码块背景色 */
  codeBackgroundColor?: string;
  /** 代码块边框色 */
  codeBorderColor?: string;
  
  // Tooltip 全局配置
  /** Tooltip 默认背景色 */
  tooltipBgColor?: string;
  /** Tooltip 文本颜色 */
  tooltipTextColor?: string;
  /** Tooltip 字体大小（像素） */
  tooltipFontSize?: number;
  /** Tooltip 行高 */
  tooltipLineHeight?: number;
  /** Tooltip 最大宽度（像素） */
  tooltipMaxWidth?: number;
  /** Tooltip 最小高度（像素） */
  tooltipMinHeight?: number;
  /** Tooltip 内边距 */
  tooltipPadding?: string;
  /** Tooltip 圆角（像素） */
  tooltipBorderRadius?: number;
  /** Tooltip 阴影 */
  tooltipBoxShadow?: string;
  /** Tooltip 箭头尺寸（像素） */
  tooltipArrowSize?: number;
  /** Tooltip 默认 z-index */
  tooltipZIndex?: number;
  /** Tooltip 动画时长（秒） */
  tooltipAnimationDuration?: number;
  
  /** 组件级配置 */
  components?: ComponentThemeConfig;
}

/**
 * 组件尺寸配置
 */
export type ComponentSize = 'small' | 'middle' | 'large';

/**
 * ConfigProvider Props
 */
export interface ConfigProviderProps {
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 子节点 */
  children?: ReactNode;
  /** 组件尺寸 */
  componentSize?: ComponentSize;
}

/**
 * ConfigContext Props
 */
export interface ConfigContextProps extends ConfigProviderProps {
  theme?: ThemeConfig;
  componentSize?: ComponentSize;
  components?: ComponentThemeConfig;
}

/**
 * 默认主题配置
 */
export const defaultTheme: ThemeConfig = {
  primaryColor: '#1677ff',
  primaryHoverColor: '#4096ff',
  primaryActiveColor: '#0958d9',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1677ff',
  borderRadius: 6,
  fontSize: 14,
  lineHeight: 1.5715,
  paddingSM: 8,
  paddingMD: 16,
  paddingLG: 24,
  borderColorBase: '#d9d9d9',
  
  // Typography 全局默认值
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  headingLevel1FontSize: 50,
  headingLevel2FontSize: 40,
  headingLevel3FontSize: 30,
  headingLevel4FontSize: 25,
  headingLevel5FontSize: 20,
  headingLevel1FontSizeMD: 40,
  headingLevel2FontSizeMD: 35,
  headingLevel3FontSizeMD: 25,
  headingLevel1LineHeight: 1.23,
  headingLevel2LineHeight: 1.25,
  headingLevel3LineHeight: 1.3,
  headingLevel4LineHeight: 1.35,
  headingLevel5LineHeight: 1.4,
  markBackgroundColor: '#ffe58f',
  codeBackgroundColor: 'rgba(0, 0, 0, 0.04)',
  codeBorderColor: 'rgba(0, 0, 0, 0.06)',
  
  // Tooltip 全局默认值
  tooltipBgColor: 'rgba(0, 0, 0, 0.88)',
  tooltipTextColor: '#fff',
  tooltipFontSize: 12,
  tooltipLineHeight: 1.6667,
  tooltipMaxWidth: 250,
  tooltipMinHeight: 32,
  tooltipPadding: '6px 12px',
  tooltipBorderRadius: 6,
  tooltipBoxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  tooltipArrowSize: 8,
  tooltipZIndex: 1030,
  tooltipAnimationDuration: 0.2,
};
