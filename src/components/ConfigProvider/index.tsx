import React, { useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from './context';
import type { ConfigProviderProps, ThemeConfig, ConfigContextProps } from './types';
import { defaultTheme } from './types';
import { addOpacityToColor } from '@/utils';

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  theme,
  componentSize = 'middle',
  children,
}) => {
  // 合并主题配置
  const mergedTheme: ThemeConfig = useMemo(() => {
    return { ...defaultTheme, ...theme };
  }, [theme]);

  // 生成 CSS 变量样式
  const cssVariables: React.CSSProperties = useMemo(() => {
    // 获取 Icon 组件级配置
    const iconTheme = mergedTheme.components?.Icon || {};
    // 获取 Typography 组件级配置
    const typographyTheme = mergedTheme.components?.Typography || {};
    // 获取 Tooltip 组件级配置
    const tooltipTheme = mergedTheme.components?.Tooltip || {};
    // 获取 Popconfirm 组件级配置
    const popconfirmTheme = mergedTheme.components?.Popconfirm || {};
    // 获取 Divider 组件级配置
    const dividerTheme = mergedTheme.components?.Divider || {};
    // 获取 Layout 组件级配置
    const layoutTheme = mergedTheme.components?.Layout || {};
    // 获取 Menu 组件级配置
    const menuTheme = mergedTheme.components?.Menu || {};
    // 获取 Anchor 组件级配置
    const anchorTheme = mergedTheme.components?.Anchor || {};
    // 获取 Alert 组件级配置
    const alertTheme = mergedTheme.components?.Alert || {};
    // 获取 Message 组件级配置
    const messageTheme = mergedTheme.components?.Message || {};
    // 获取 Progress 组件级配置
    const progressTheme = mergedTheme.components?.Progress || {};
    // 获取 Notification 组件级配置
    const notificationTheme = mergedTheme.components?.Notification || {};
    // 获取 Loading 组件级配置
    const loadingTheme = mergedTheme.components?.Loading || {};
    // 获取 Drawer 组件级配置
    const drawerTheme = mergedTheme.components?.Drawer || {};
    // 获取 Skeleton 组件级配置
    const skeletonTheme = mergedTheme.components?.Skeleton || {};
    // 获取 Watermark 组件级配置
    const watermarkTheme = mergedTheme.components?.Watermark || {};
    // 获取 Table 组件级配置
    const tableTheme = mergedTheme.components?.Table || {};
    // 获取 Input 组件级配置
    const inputTheme = mergedTheme.components?.Input || {};
    // 获取 Select 组件级配置
    const selectTheme = mergedTheme.components?.Select || {};
    // 获取 Radio 组件级配置
    const radioTheme = mergedTheme.components?.Radio || {};
    // 获取 Segmented 组件级配置
    const segmentedTheme = mergedTheme.components?.Segmented || {};
    // 获取 Checkbox 组件级配置
    const checkboxTheme = mergedTheme.components?.Checkbox || {};
    // 获取 InputNumber 组件级配置
    const inputNumberTheme = mergedTheme.components?.InputNumber || {};
    // 获取 Switch 组件级配置
    const switchTheme = mergedTheme.components?.Switch || {};
    // 获取 Cascader 组件级配置
    const cascaderTheme = mergedTheme.components?.Cascader || {};
    // 获取 TreeSelect 组件级配置
    const treeSelectTheme = mergedTheme.components?.TreeSelect || {};
    // 获取 ColorPicker 组件级配置
    const colorPickerTheme = mergedTheme.components?.ColorPicker || {};
    // 获取 DatePicker 组件级配置
    const datePickerTheme = mergedTheme.components?.DatePicker || {};
    // 获取 TimePicker 组件级配置
    const timePickerTheme = mergedTheme.components?.TimePicker || {};
    // 获取 Transfer 组件级配置
    const transferTheme = mergedTheme.components?.Transfer || {};
    // 获取 Empty 组件级配置
    const emptyTheme = mergedTheme.components?.Empty || {};
    // 获取 Slider 组件级配置
    const sliderTheme = mergedTheme.components?.Slider || {};
    // 获取 Upload 组件级配置
    const uploadTheme = mergedTheme.components?.Upload || {};
    // 获取 Form 组件级配置
    const formTheme = mergedTheme.components?.Form || {};
    // 获取 Pagination 组件级配置
    const paginationTheme = mergedTheme.components?.Pagination || {};
    // 获取 Tag 组件级配置
    const tagTheme = mergedTheme.components?.Tag || {};
    // 获取 Card 组件级配置
    const cardTheme = mergedTheme.components?.Card || {};
    // 获取 Badge 组件级配置
    const badgeTheme = mergedTheme.components?.Badge || {};
    // 获取 Carousel 组件级配置
    const carouselTheme = mergedTheme.components?.Carousel || {};
    // 获取 Descriptions 组件级配置
    const descriptionsTheme = mergedTheme.components?.Descriptions || {};
    // 获取 Image 组件级配置
    const imageTheme = mergedTheme.components?.Image || {};
    // 获取 Collapse 组件级配置
    const collapseTheme = mergedTheme.components?.Collapse || {};
    // 获取 PopCard 组件级配置
    const popCardTheme = mergedTheme.components?.PopCard || {};

    return {
      // ==================== 全局基础变量 ====================
      '--soui-primary-color': mergedTheme.primaryColor,
      '--soui-primary-hover-color': mergedTheme.primaryHoverColor,
      '--soui-primary-active-color': mergedTheme.primaryActiveColor,
      '--soui-success-color': mergedTheme.successColor,
      '--soui-warning-color': mergedTheme.warningColor,
      '--soui-error-color': mergedTheme.errorColor,
      '--soui-info-color': mergedTheme.infoColor,
      '--soui-border-radius': `${mergedTheme.borderRadius}px`,
      '--soui-font-size': `${mergedTheme.fontSize}px`,
      '--soui-line-height': mergedTheme.lineHeight?.toString(),

      // 间距变量
      '--soui-size-small': `${mergedTheme.paddingSM}px`,
      '--soui-size-middle': `${mergedTheme.paddingMD}px`,
      '--soui-size-large': `${mergedTheme.paddingLG}px`,

      // ==================== Typography 组件配置 ====================
      // 第2层: Typography 组件配置点 (引用设计令牌)
      '--soui-typography-font-size-sm': `${mergedTheme.fontSizeSM}px`,
      '--soui-typography-font-size-base': `${mergedTheme.fontSize}px`,
      '--soui-typography-font-size-lg': `${mergedTheme.fontSizeLG}px`,
      '--soui-typography-font-size-xl': `${mergedTheme.fontSizeXL}px`,
      '--soui-typography-line-height-base': mergedTheme.lineHeight?.toString(),

      // 标题字号
      '--soui-typography-heading-1-font-size': `${mergedTheme.headingLevel1FontSize}px`,
      '--soui-typography-heading-2-font-size': `${mergedTheme.headingLevel2FontSize}px`,
      '--soui-typography-heading-3-font-size': `${mergedTheme.headingLevel3FontSize}px`,
      '--soui-typography-heading-4-font-size': `${mergedTheme.headingLevel4FontSize}px`,
      '--soui-typography-heading-5-font-size': `${mergedTheme.headingLevel5FontSize}px`,
      '--soui-typography-heading-1-font-size-md': `${mergedTheme.headingLevel1FontSizeMD}px`,
      '--soui-typography-heading-2-font-size-md': `${mergedTheme.headingLevel2FontSizeMD}px`,
      '--soui-typography-heading-3-font-size-md': `${mergedTheme.headingLevel3FontSizeMD}px`,

      // 标题行高
      '--soui-typography-heading-1-line-height': mergedTheme.headingLevel1LineHeight?.toString(),
      '--soui-typography-heading-2-line-height': mergedTheme.headingLevel2LineHeight?.toString(),
      '--soui-typography-heading-3-line-height': mergedTheme.headingLevel3LineHeight?.toString(),
      '--soui-typography-heading-4-line-height': mergedTheme.headingLevel4LineHeight?.toString(),
      '--soui-typography-heading-5-line-height': mergedTheme.headingLevel5LineHeight?.toString(),

      // 特殊样式
      '--soui-typography-mark-bg-color': mergedTheme.markBackgroundColor,
      '--soui-typography-code-bg-color': mergedTheme.codeBackgroundColor,
      '--soui-typography-code-border-color': mergedTheme.codeBorderColor,

      // Typography 组件级变量（优先级更高）
      '--soui-typography-color-text': typographyTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-typography-color-text-secondary': typographyTheme.colorTextSecondary || 'rgba(0, 0, 0, 0.65)',
      '--soui-typography-color-text-disabled': typographyTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-typography-color-link': typographyTheme.colorLink || mergedTheme.primaryColor,
      '--soui-typography-color-link-hover': typographyTheme.colorLinkHover || mergedTheme.primaryHoverColor,
      '--soui-typography-color-link-active': typographyTheme.colorLinkActive || mergedTheme.primaryActiveColor,
      '--soui-typography-color-success': typographyTheme.colorSuccess || mergedTheme.successColor,
      '--soui-typography-color-warning': typographyTheme.colorWarning || mergedTheme.warningColor,
      '--soui-typography-color-danger': typographyTheme.colorDanger || mergedTheme.errorColor,
      '--soui-typography-heading-font-weight': typographyTheme.headingFontWeight?.toString() || '600',
      '--soui-typography-strong-font-weight': typographyTheme.strongFontWeight?.toString() || '600',
      '--soui-typography-code-border-radius': `${typographyTheme.codeBorderRadius || 2}px`,
      '--soui-typography-operation-gap': `${typographyTheme.operationGap || 4}px`,
      '--soui-typography-operation-hover-bg-opacity': typographyTheme.operationHoverBgOpacity?.toString() || '0.06',
      '--soui-typography-editable-border-color': typographyTheme.editableBorderColor || mergedTheme.primaryColor,
      '--soui-typography-editable-focus-shadow-opacity': typographyTheme.editableFocusShadowOpacity?.toString() || '0.2',
      '--soui-typography-expand-color': typographyTheme.expandColor || mergedTheme.primaryColor,
      '--soui-typography-expand-hover-color': typographyTheme.expandHoverColor || mergedTheme.primaryHoverColor,

      // Typography 带透明度的颜色（用于focus、hover等效果）
      '--soui-typography-link-focus-color': addOpacityToColor(
        typographyTheme.colorLink || mergedTheme.primaryColor || '#1890ff',
        typographyTheme.linkFocusOpacity || 0.2
      ),
      '--soui-typography-operation-hover-bg': addOpacityToColor(
        typographyTheme.colorLink || mergedTheme.primaryColor || '#1890ff',
        typographyTheme.operationHoverBgOpacity || 0.06
      ),
      '--soui-typography-editable-focus-shadow': addOpacityToColor(
        typographyTheme.editableBorderColor || mergedTheme.primaryColor || '#1890ff',
        typographyTheme.editableFocusShadowOpacity || 0.2
      ),

      // ==================== Icon 组件配置 ====================
      '--soui-icon-size': `${iconTheme.size || 24}px`,
      '--soui-icon-color-primary': iconTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-icon-color-success': iconTheme.colorSuccess || mergedTheme.successColor,
      '--soui-icon-color-warning': iconTheme.colorWarning || mergedTheme.warningColor,
      '--soui-icon-color-error': iconTheme.colorError || mergedTheme.errorColor,
      '--soui-icon-color-info': iconTheme.colorInfo || mergedTheme.infoColor,
      '--soui-icon-color-default': iconTheme.colorDefault || mergedTheme.primaryColor,
      '--soui-icon-hover-opacity': iconTheme.hoverOpacity?.toString() || '0.7',
      '--soui-icon-active-opacity': iconTheme.activeOpacity?.toString() || '0.5',

      // ==================== Tooltip 组件配置 ====================
      // 第1层: 设计令牌 (Design Tokens) - 真正的全局变量
      '--soui-color-bg-default': mergedTheme.tooltipBgColor,
      '--soui-color-text-inverse': mergedTheme.tooltipTextColor,
      '--soui-font-size-sm': `${mergedTheme.tooltipFontSize}px`,
      '--soui-line-height-sm': mergedTheme.tooltipLineHeight?.toString(),
      '--soui-box-shadow-secondary': mergedTheme.tooltipBoxShadow,
      '--soui-z-index-popover': mergedTheme.tooltipZIndex?.toString(),
      '--soui-transition-duration': `${mergedTheme.tooltipAnimationDuration}s`,

      // 第2层: Tooltip 配置点 (引用设计令牌)
      '--soui-tooltip-bg-color': mergedTheme.tooltipBgColor,
      '--soui-tooltip-text-color': mergedTheme.tooltipTextColor,
      '--soui-tooltip-font-size': `${mergedTheme.tooltipFontSize}px`,
      '--soui-tooltip-line-height': mergedTheme.tooltipLineHeight?.toString(),
      '--soui-tooltip-max-width': `${mergedTheme.tooltipMaxWidth}px`,
      '--soui-tooltip-min-height': `${mergedTheme.tooltipMinHeight}px`,
      '--soui-tooltip-padding': mergedTheme.tooltipPadding,
      '--soui-tooltip-border-radius': `${mergedTheme.tooltipBorderRadius}px`,
      '--soui-tooltip-box-shadow': mergedTheme.tooltipBoxShadow,
      '--soui-tooltip-arrow-size': `${mergedTheme.tooltipArrowSize}px`,
      '--soui-tooltip-z-index': mergedTheme.tooltipZIndex?.toString(),
      '--soui-tooltip-animation-duration': `${mergedTheme.tooltipAnimationDuration}s`,

      // 第3层: Tooltip 组件级覆盖 (优先级最高)
      '--soui-tooltip-color-bg-default': tooltipTheme.colorBgDefault || mergedTheme.tooltipBgColor,
      '--soui-tooltip-color-text': tooltipTheme.colorText || mergedTheme.tooltipTextColor,
      '--soui-tooltip-font-size-component': tooltipTheme.fontSize ? `${tooltipTheme.fontSize}px` : undefined,
      '--soui-tooltip-line-height-component': tooltipTheme.lineHeight?.toString(),
      '--soui-tooltip-max-width-component': tooltipTheme.maxWidth ? `${tooltipTheme.maxWidth}px` : undefined,
      '--soui-tooltip-min-height-component': tooltipTheme.minHeight ? `${tooltipTheme.minHeight}px` : undefined,
      '--soui-tooltip-padding-component': tooltipTheme.padding,
      '--soui-tooltip-border-radius-component': tooltipTheme.borderRadius ? `${tooltipTheme.borderRadius}px` : undefined,
      '--soui-tooltip-box-shadow-component': tooltipTheme.boxShadow,
      '--soui-tooltip-arrow-size-component': tooltipTheme.arrowSize ? `${tooltipTheme.arrowSize}px` : undefined,
      '--soui-tooltip-arrow-offset-component': tooltipTheme.arrowOffset ? `${tooltipTheme.arrowOffset}px` : undefined,
      '--soui-tooltip-z-index-component': tooltipTheme.zIndex?.toString(),
      '--soui-tooltip-animation-duration-component': tooltipTheme.animationDuration ? `${tooltipTheme.animationDuration}s` : undefined,
      '--soui-tooltip-animation-timing-function': tooltipTheme.animationTimingFunction,

      // ==================== Popconfirm 组件配置 ====================
      // 第2层: Popconfirm 配置点 (引用设计令牌)
      '--soui-popconfirm-bg-color': popconfirmTheme.colorBg || '#fff',
      '--soui-popconfirm-title-color': popconfirmTheme.titleColor || 'rgba(0, 0, 0, 0.88)',
      '--soui-popconfirm-description-color': popconfirmTheme.descriptionColor || 'rgba(0, 0, 0, 0.65)',
      '--soui-popconfirm-font-size': popconfirmTheme.fontSize ? `${popconfirmTheme.fontSize}px` : undefined,
      '--soui-popconfirm-border-radius': popconfirmTheme.borderRadius ? `${popconfirmTheme.borderRadius}px` : undefined,
      '--soui-popconfirm-box-shadow': popconfirmTheme.boxShadow,
      '--soui-popconfirm-color-warning': popconfirmTheme.colorWarning || mergedTheme.warningColor,
      '--soui-popconfirm-color-primary': popconfirmTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-popconfirm-color-primary-hover': popconfirmTheme.colorPrimary || mergedTheme.primaryHoverColor,

      // 第3层: Popconfirm 组件级覆盖
      '--soui-popconfirm-bg-color-component': popconfirmTheme.colorBg,
      '--soui-popconfirm-title-color-component': popconfirmTheme.titleColor,
      '--soui-popconfirm-description-color-component': popconfirmTheme.descriptionColor,
      '--soui-popconfirm-font-size-component': popconfirmTheme.fontSize ? `${popconfirmTheme.fontSize}px` : undefined,
      '--soui-popconfirm-border-radius-component': popconfirmTheme.borderRadius ? `${popconfirmTheme.borderRadius}px` : undefined,
      '--soui-popconfirm-box-shadow-component': popconfirmTheme.boxShadow,
      '--soui-popconfirm-color-warning-component': popconfirmTheme.colorWarning,
      '--soui-popconfirm-color-primary-component': popconfirmTheme.colorPrimary,

      // ==================== Divider 组件配置 ====================
      // 第2层: Divider 配置点 (引用设计令牌)
      '--soui-divider-color': dividerTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-divider-font-size': dividerTheme.fontSize ? `${dividerTheme.fontSize}px` : undefined,

      // ==================== Layout 组件配置 ====================
      // 第2层: Layout 配置点 (引用设计令牌)
      '--soui-layout-color-bg': layoutTheme.colorBg || '@bg-color-layout',
      '--soui-layout-header-height': layoutTheme.headerHeight ? `${layoutTheme.headerHeight}px` : '64px',
      '--soui-layout-footer-height': layoutTheme.footerHeight ? `${layoutTheme.footerHeight}px` : '64px',
      '--soui-layout-sider-width': layoutTheme.siderWidth ? `${layoutTheme.siderWidth}px` : '200px',
      '--soui-layout-sider-collapsed-width': layoutTheme.siderCollapsedWidth ? `${layoutTheme.siderCollapsedWidth}px` : '80px',
      '--soui-layout-header-color-bg': layoutTheme.headerColorBg || '@bg-color-base',
      '--soui-layout-header-color-text': layoutTheme.headerColorText || '@text-color',
      '--soui-layout-sider-color-bg': layoutTheme.siderColorBg || '#001529',
      '--soui-layout-content-color-bg': layoutTheme.contentColorBg || '@bg-color-base',
      '--soui-layout-content-padding': layoutTheme.contentPadding || '@padding-md',
      '--soui-layout-footer-color-bg': layoutTheme.footerColorBg || '@bg-color-layout',
      '--soui-layout-footer-color-text': layoutTheme.footerColorText || '@text-color-secondary',
      '--soui-layout-sider-trigger-color-text': layoutTheme.siderTriggerColorText || '#fff',
      '--soui-layout-sider-trigger-color-bg': layoutTheme.siderTriggerColorBg || 'rgba(255, 255, 255, 0.1)',
      '--soui-layout-sider-trigger-color-bg-hover': layoutTheme.siderTriggerColorBgHover || 'rgba(255, 255, 255, 0.2)',

      // ==================== Menu 组件配置 ====================
      // 第2层: Menu 配置点 (引用设计令牌)
      '--soui-menu-color-text': menuTheme.colorText || '@text-color',
      '--soui-menu-color-primary': menuTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-menu-color-primary-hover': menuTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-menu-item-hover-bg': menuTheme.itemHoverBg || 'rgba(0, 0, 0, 0.04)',
      '--soui-menu-item-active-bg': menuTheme.itemActiveBg || 'rgba(0, 0, 0, 0.06)',
      '--soui-menu-item-selected-bg': menuTheme.itemSelectedBg || 'rgba(24, 144, 255, 0.1)',
      '--soui-menu-item-selected-color': menuTheme.itemSelectedColor || mergedTheme.primaryColor,
      '--soui-menu-border-radius': menuTheme.borderRadius ? `${menuTheme.borderRadius}px` : undefined,
      '--soui-menu-font-size': menuTheme.fontSize ? `${menuTheme.fontSize}px` : undefined,

      // 第3层: Menu 组件级覆盖 (优先级最高)
      '--soui-menu-color-text-component': menuTheme.colorText,
      '--soui-menu-color-primary-component': menuTheme.colorPrimary,
      '--soui-menu-item-selected-bg-component': menuTheme.itemSelectedBg,
      '--soui-menu-item-selected-color-component': menuTheme.itemSelectedColor,
      '--soui-menu-border-radius-component': menuTheme.borderRadius ? `${menuTheme.borderRadius}px` : undefined,
      '--soui-menu-font-size-component': menuTheme.fontSize ? `${menuTheme.fontSize}px` : undefined,

      // ==================== Anchor 组件配置 ====================
      // 第2层: Anchor 配置点 (引用设计令牌)
      '--soui-anchor-color-primary': anchorTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-anchor-color-text': anchorTheme.colorText || '@text-color',
      '--soui-anchor-link-padding-block': anchorTheme.linkPadding ? `${anchorTheme.linkPadding}px` : undefined,
      '--soui-anchor-font-size': anchorTheme.fontSize ? `${anchorTheme.fontSize}px` : undefined,
      '--soui-anchor-ink-width': anchorTheme.inkWidth ? `${anchorTheme.inkWidth}px` : undefined,

      // ==================== Alert 组件配置 ====================
      // 第2层: Alert 配置点 (引用设计令牌)
      '--soui-alert-border-radius': alertTheme.borderRadius ? `${alertTheme.borderRadius}px` : undefined,
      '--soui-alert-font-size': alertTheme.fontSize ? `${alertTheme.fontSize}px` : undefined,
      '--soui-alert-title-font-size': alertTheme.titleFontSize ? `${alertTheme.titleFontSize}px` : undefined,
      '--soui-alert-icon-size': alertTheme.iconSize ? `${alertTheme.iconSize}px` : undefined,
      // 第3层: Alert 组件级覆盖 (状态颜色)
      '--soui-alert-success-bg': alertTheme.colorSuccessBg,
      '--soui-alert-success-border': alertTheme.colorSuccessBorder,
      '--soui-alert-info-bg': alertTheme.colorInfoBg,
      '--soui-alert-info-border': alertTheme.colorInfoBorder,
      '--soui-alert-warning-bg': alertTheme.colorWarningBg,
      '--soui-alert-warning-border': alertTheme.colorWarningBorder,
      '--soui-alert-error-bg': alertTheme.colorErrorBg,
      '--soui-alert-error-border': alertTheme.colorErrorBorder,

      // ==================== Message 组件配置 ====================
      // 第2层: Message 配置点 (引用设计令牌)
      '--soui-message-border-radius': messageTheme.borderRadius ? `${messageTheme.borderRadius}px` : undefined,
      '--soui-message-font-size': messageTheme.fontSize ? `${messageTheme.fontSize}px` : undefined,
      '--soui-message-max-width': messageTheme.maxWidth ? `${messageTheme.maxWidth}px` : undefined,

      // ==================== Progress 组件配置 ====================
      // 第2层: Progress 配置点 (引用设计令牌)
      '--soui-progress-border-radius': progressTheme.borderRadius ? `${progressTheme.borderRadius}px` : undefined,
      '--soui-progress-font-size': progressTheme.fontSize ? `${progressTheme.fontSize}px` : undefined,
      '--soui-progress-color-primary': progressTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-progress-color-success': progressTheme.colorSuccess || mergedTheme.successColor,
      '--soui-progress-color-error': progressTheme.colorError || mergedTheme.errorColor,
      '--soui-progress-trail-color': progressTheme.colorTrail,

      // ==================== Notification 组件配置 ====================
      // 第2层: Notification 配置点 (引用设计令牌)
      '--soui-notification-border-radius': notificationTheme.borderRadius ? `${notificationTheme.borderRadius}px` : undefined,
      '--soui-notification-font-size': notificationTheme.fontSize ? `${notificationTheme.fontSize}px` : undefined,
      '--soui-notification-description-font-size': notificationTheme.descriptionFontSize ? `${notificationTheme.descriptionFontSize}px` : undefined,
      '--soui-notification-icon-size': notificationTheme.iconSize ? `${notificationTheme.iconSize}px` : undefined,
      '--soui-notification-close-icon-size': notificationTheme.closeIconSize ? `${notificationTheme.closeIconSize}px` : undefined,
      '--soui-notification-padding': notificationTheme.padding,
      '--soui-notification-z-index': notificationTheme.zIndex?.toString(),
      '--soui-notification-bg-color': notificationTheme.colorBg,

      // ==================== Loading 组件配置 ====================
      // 第2层: Loading 配置点 (引用设计令牌)
      '--soui-loading-color-primary': loadingTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-loading-font-size': loadingTheme.fontSize ? `${loadingTheme.fontSize}px` : undefined,
      '--soui-loading-dot-size': loadingTheme.dotSize ? `${loadingTheme.dotSize}px` : undefined,
      '--soui-loading-dot-size-sm': loadingTheme.dotSizeSM ? `${loadingTheme.dotSizeSM}px` : undefined,
      '--soui-loading-dot-size-lg': loadingTheme.dotSizeLG ? `${loadingTheme.dotSizeLG}px` : undefined,

      // ==================== Drawer 组件配置 ====================
      // 第2层: Drawer 配置点 (引用设计令牌)
      '--soui-drawer-border-radius': drawerTheme.borderRadius ? `${drawerTheme.borderRadius}px` : undefined,
      '--soui-drawer-title-font-size': drawerTheme.titleFontSize ? `${drawerTheme.titleFontSize}px` : undefined,
      '--soui-drawer-bg-color': drawerTheme.colorBg,
      '--soui-drawer-mask-bg-color': drawerTheme.maskBgColor,
      '--soui-drawer-header-padding': drawerTheme.headerPadding,
      '--soui-drawer-body-padding': drawerTheme.bodyPadding,
      '--soui-drawer-footer-padding': drawerTheme.footerPadding,
      '--soui-drawer-z-index': drawerTheme.zIndex?.toString(),
      '--soui-drawer-box-shadow': drawerTheme.boxShadow,

      // ==================== Skeleton 组件配置 ====================
      // 第2层: Skeleton 配置点 (引用设计令牌)
      '--soui-skeleton-color-bg': skeletonTheme.colorBg,
      '--soui-skeleton-color-highlight': skeletonTheme.colorHighlight,
      '--soui-skeleton-border-radius': skeletonTheme.borderRadius ? `${skeletonTheme.borderRadius}px` : undefined,
      '--soui-skeleton-border-radius-lg': skeletonTheme.borderRadius ? `${skeletonTheme.borderRadius}px` : undefined,

      // ==================== Watermark 组件配置 ====================
      // 第2层: Watermark 配置点
      '--soui-watermark-font-color': watermarkTheme.fontColor,
      '--soui-watermark-font-size': watermarkTheme.fontSize ? `${watermarkTheme.fontSize}px` : undefined,
      '--soui-watermark-z-index': watermarkTheme.zIndex?.toString(),

      // ==================== Table 组件配置 ====================
      // 第2层: Table 配置点
      '--soui-table-border-radius': tableTheme.borderRadius ? `${tableTheme.borderRadius}px` : undefined,
      '--soui-table-font-size': tableTheme.fontSize ? `${tableTheme.fontSize}px` : undefined,
      '--soui-table-header-bg': tableTheme.headerBg,
      '--soui-table-header-color': tableTheme.headerColor,
      '--soui-table-row-hover-bg': tableTheme.rowHoverBg,
      '--soui-table-border-color': tableTheme.borderColor,
      '--soui-table-stripe-bg': tableTheme.stripeBg,
      '--soui-table-selected-row-bg': tableTheme.selectedRowBg,

      // ==================== Input 组件配置 ====================
      // 第2层: Input 配置点 (引用设计令牌)
      '--soui-input-border-radius': inputTheme.borderRadius ? `${inputTheme.borderRadius}px` : undefined,
      '--soui-input-font-size': inputTheme.fontSize ? `${inputTheme.fontSize}px` : undefined,
      // controlHeight 仅控制 middle 尺寸，small/large 基于它派生
      '--soui-input-control-height-small': inputTheme.controlHeight ? `${inputTheme.controlHeight - 8}px` : '24px',
      '--soui-input-control-height-middle': inputTheme.controlHeight ? `${inputTheme.controlHeight}px` : '32px',
      '--soui-input-control-height-large': inputTheme.controlHeight ? `${inputTheme.controlHeight + 8}px` : '40px',
      '--soui-input-color-border': inputTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-input-color-border-hover': inputTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-input-color-border-focus': inputTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-input-color-bg': inputTheme.colorBg || '#fff',
      '--soui-input-color-text': inputTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-input-color-bg-disabled': inputTheme.colorBgDisabled || '#f5f5f5',
      '--soui-input-color-text-disabled': inputTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-input-color-error': inputTheme.colorError || mergedTheme.errorColor,
      '--soui-input-color-warning': inputTheme.colorWarning || mergedTheme.warningColor,
      '--soui-input-color-success': inputTheme.colorSuccess || mergedTheme.successColor,
      '--soui-input-color-icon': inputTheme.colorIcon || 'rgba(0, 0, 0, 0.25)',
      '--soui-input-color-icon-hover': inputTheme.colorIconHover || 'rgba(0, 0, 0, 0.45)',
      '--soui-input-color-addon-bg': inputTheme.colorAddonBg || '#fafafa',
      '--soui-input-color-addon-text': inputTheme.colorAddonText || 'rgba(0, 0, 0, 0.88)',

      // ==================== Select 组件配置 ====================
      // 第2层: Select 配置点 (引用设计令牌)
      '--soui-select-border-radius': selectTheme.borderRadius ? `${selectTheme.borderRadius}px` : undefined,
      '--soui-select-font-size': selectTheme.fontSize ? `${selectTheme.fontSize}px` : undefined,
      '--soui-select-control-height-small': selectTheme.controlHeight ? `${selectTheme.controlHeight - 8}px` : '24px',
      '--soui-select-control-height-middle': selectTheme.controlHeight ? `${selectTheme.controlHeight}px` : '32px',
      '--soui-select-control-height-large': selectTheme.controlHeight ? `${selectTheme.controlHeight + 8}px` : '40px',
      '--soui-select-color-border': selectTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-select-color-border-hover': selectTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-select-color-border-focus': selectTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-select-color-bg': selectTheme.colorBg || '#fff',
      '--soui-select-color-text': selectTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-select-color-bg-disabled': selectTheme.colorBgDisabled || '#f5f5f5',
      '--soui-select-color-text-disabled': selectTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-select-color-error': selectTheme.colorError || mergedTheme.errorColor,
      '--soui-select-color-warning': selectTheme.colorWarning || mergedTheme.warningColor,
      '--soui-select-dropdown-bg': selectTheme.dropdownBg || '#fff',
      '--soui-select-option-active-bg': selectTheme.optionActiveBg || 'rgba(0, 0, 0, 0.04)',
      '--soui-select-option-selected-bg': selectTheme.optionSelectedBg || 'rgba(22, 119, 255, 0.08)',
      '--soui-select-tag-bg': selectTheme.tagBg || '#fafafa',

      // ==================== Radio 组件配置 ====================
      '--soui-radio-color-primary': radioTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-radio-color-primary-hover': radioTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-radio-color-border': radioTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-radio-border-radius': radioTheme.borderRadius ? `${radioTheme.borderRadius}px` : `${mergedTheme.borderRadius}px`,
      '--soui-radio-font-size': radioTheme.fontSize ? `${radioTheme.fontSize}px` : `${mergedTheme.fontSize}px`,
      '--soui-radio-control-height': radioTheme.controlHeight ? `${radioTheme.controlHeight}px` : '32px',
      '--soui-radio-color-bg': radioTheme.colorBg || '#fff',
      '--soui-radio-color-text': radioTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-radio-color-bg-disabled': radioTheme.colorBgDisabled || '#f5f5f5',

      // ==================== Segmented 组件配置 ====================
      '--soui-segmented-color-primary': segmentedTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-segmented-track-bg': segmentedTheme.trackBg || '#f5f5f5',
      '--soui-segmented-item-selected-bg': segmentedTheme.itemSelectedBg || '#fff',
      '--soui-segmented-color-text': segmentedTheme.colorText || 'rgba(0, 0, 0, 0.65)',
      '--soui-segmented-color-text-selected': segmentedTheme.colorTextSelected || 'rgba(0, 0, 0, 0.88)',
      '--soui-segmented-color-text-disabled': segmentedTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-segmented-border-radius': segmentedTheme.borderRadius ? `${segmentedTheme.borderRadius}px` : `${mergedTheme.borderRadius}px`,
      '--soui-segmented-font-size': segmentedTheme.fontSize ? `${segmentedTheme.fontSize}px` : `${mergedTheme.fontSize}px`,

      // ==================== Checkbox 组件配置 ====================
      '--soui-checkbox-color-primary': checkboxTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-checkbox-color-primary-hover': checkboxTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-checkbox-color-border': checkboxTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-checkbox-border-radius': checkboxTheme.borderRadius ? `${checkboxTheme.borderRadius}px` : '4px',
      '--soui-checkbox-font-size': checkboxTheme.fontSize ? `${checkboxTheme.fontSize}px` : `${mergedTheme.fontSize}px`,
      '--soui-checkbox-color-bg': checkboxTheme.colorBg || '#fff',
      '--soui-checkbox-color-text': checkboxTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-checkbox-color-bg-disabled': checkboxTheme.colorBgDisabled || '#f5f5f5',

      // ==================== InputNumber 组件配置 ====================
      '--soui-input-number-color-primary': inputNumberTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-input-number-color-border': inputNumberTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-input-number-color-border-hover': inputNumberTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-input-number-color-border-focus': inputNumberTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-input-number-border-radius': inputNumberTheme.borderRadius ? `${inputNumberTheme.borderRadius}px` : `${mergedTheme.borderRadius}px`,
      '--soui-input-number-font-size': inputNumberTheme.fontSize ? `${inputNumberTheme.fontSize}px` : `${mergedTheme.fontSize}px`,
      '--soui-input-number-control-height': inputNumberTheme.controlHeight ? `${inputNumberTheme.controlHeight}px` : '32px',
      '--soui-input-number-color-bg': inputNumberTheme.colorBg || '#fff',
      '--soui-input-number-color-text': inputNumberTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-input-number-color-bg-disabled': inputNumberTheme.colorBgDisabled || '#f5f5f5',
      '--soui-input-number-color-error': inputNumberTheme.colorError || mergedTheme.errorColor,
      '--soui-input-number-color-warning': inputNumberTheme.colorWarning || mergedTheme.warningColor,

      // ==================== Switch 组件配置 ====================
      '--soui-switch-color-primary': switchTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-switch-color-primary-hover': switchTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-switch-border-radius': switchTheme.borderRadius ? `${switchTheme.borderRadius}px` : '11px',
      '--soui-switch-color-bg': switchTheme.colorBg || 'rgba(0, 0, 0, 0.25)',
      '--soui-switch-color-bg-hover': switchTheme.colorBgHover || 'rgba(0, 0, 0, 0.35)',
      '--soui-switch-color-text': switchTheme.colorText || '#fff',

      // ==================== Cascader 组件配置 ====================
      '--soui-cascader-border-radius': cascaderTheme.borderRadius ? `${cascaderTheme.borderRadius}px` : undefined,
      '--soui-cascader-font-size': cascaderTheme.fontSize ? `${cascaderTheme.fontSize}px` : undefined,
      '--soui-cascader-control-height-small': cascaderTheme.controlHeight ? `${cascaderTheme.controlHeight - 8}px` : '24px',
      '--soui-cascader-control-height-middle': cascaderTheme.controlHeight ? `${cascaderTheme.controlHeight}px` : '32px',
      '--soui-cascader-control-height-large': cascaderTheme.controlHeight ? `${cascaderTheme.controlHeight + 8}px` : '40px',
      '--soui-cascader-color-border': cascaderTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-cascader-color-border-hover': cascaderTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-cascader-color-border-focus': cascaderTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-cascader-color-bg': cascaderTheme.colorBg || '#fff',
      '--soui-cascader-color-text': cascaderTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-cascader-color-bg-disabled': cascaderTheme.colorBgDisabled || '#f5f5f5',
      '--soui-cascader-color-text-disabled': cascaderTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-cascader-color-error': cascaderTheme.colorError || mergedTheme.errorColor,
      '--soui-cascader-color-warning': cascaderTheme.colorWarning || mergedTheme.warningColor,
      '--soui-cascader-dropdown-bg': cascaderTheme.dropdownBg || '#fff',
      '--soui-cascader-option-active-bg': cascaderTheme.optionActiveBg || 'rgba(0, 0, 0, 0.04)',
      '--soui-cascader-option-selected-bg': cascaderTheme.optionSelectedBg || 'rgba(22, 119, 255, 0.08)',

      // ==================== TreeSelect 组件配置 ====================
      '--soui-tree-select-border-radius': treeSelectTheme.borderRadius ? `${treeSelectTheme.borderRadius}px` : undefined,
      '--soui-tree-select-font-size': treeSelectTheme.fontSize ? `${treeSelectTheme.fontSize}px` : undefined,
      '--soui-tree-select-control-height-small': treeSelectTheme.controlHeight ? `${treeSelectTheme.controlHeight - 8}px` : '24px',
      '--soui-tree-select-control-height-middle': treeSelectTheme.controlHeight ? `${treeSelectTheme.controlHeight}px` : '32px',
      '--soui-tree-select-control-height-large': treeSelectTheme.controlHeight ? `${treeSelectTheme.controlHeight + 8}px` : '40px',
      '--soui-tree-select-color-border': treeSelectTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-tree-select-color-border-hover': treeSelectTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-tree-select-color-border-focus': treeSelectTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-tree-select-color-bg': treeSelectTheme.colorBg || '#fff',
      '--soui-tree-select-color-text': treeSelectTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-tree-select-color-bg-disabled': treeSelectTheme.colorBgDisabled || '#f5f5f5',
      '--soui-tree-select-color-text-disabled': treeSelectTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-tree-select-color-error': treeSelectTheme.colorError || mergedTheme.errorColor,
      '--soui-tree-select-color-warning': treeSelectTheme.colorWarning || mergedTheme.warningColor,
      '--soui-tree-select-dropdown-bg': treeSelectTheme.dropdownBg || '#fff',
      '--soui-tree-select-option-active-bg': treeSelectTheme.optionActiveBg || 'rgba(0, 0, 0, 0.04)',
      '--soui-tree-select-option-selected-bg': treeSelectTheme.optionSelectedBg || 'rgba(22, 119, 255, 0.08)',
      '--soui-tree-select-tag-bg': treeSelectTheme.tagBg || '#fafafa',

      // ==================== ColorPicker 组件配置 ====================
      // 第2层: ColorPicker 配置点 (引用设计令牌)
      '--soui-color-picker-font-size': colorPickerTheme.fontSize ? `${colorPickerTheme.fontSize}px` : undefined,
      '--soui-color-picker-border-radius': colorPickerTheme.borderRadius ? `${colorPickerTheme.borderRadius}px` : undefined,
      '--soui-color-picker-color-primary': colorPickerTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-color-picker-color-primary-hover': colorPickerTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-color-picker-border-color': colorPickerTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-color-picker-color-border-hover': colorPickerTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-color-picker-color-border-focus': colorPickerTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-color-picker-panel-bg': colorPickerTheme.colorBg || '#fff',
      '--soui-color-picker-text-color': colorPickerTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-color-picker-text-color-disabled': colorPickerTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-color-picker-primary-color-10': addOpacityToColor(colorPickerTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),

      // 第3层: ColorPicker 组件级覆盖 (优先级最高)
      '--soui-color-picker-font-size-component': colorPickerTheme.fontSize ? `${colorPickerTheme.fontSize}px` : undefined,
      '--soui-color-picker-border-radius-component': colorPickerTheme.borderRadius ? `${colorPickerTheme.borderRadius}px` : undefined,
      '--soui-color-picker-color-primary-component': colorPickerTheme.colorPrimary,
      '--soui-color-picker-color-primary-hover-component': colorPickerTheme.colorPrimaryHover,
      '--soui-color-picker-border-color-component': colorPickerTheme.colorBorder,
      '--soui-color-picker-color-border-hover-component': colorPickerTheme.colorBorderHover,
      '--soui-color-picker-color-border-focus-component': colorPickerTheme.colorBorderFocus,
      '--soui-color-picker-panel-bg-component': colorPickerTheme.colorBg,
      '--soui-color-picker-text-color-component': colorPickerTheme.colorText,
      '--soui-color-picker-text-color-disabled-component': colorPickerTheme.colorTextDisabled,
      '--soui-color-picker-primary-color-10-component': colorPickerTheme.colorPrimary ? addOpacityToColor(colorPickerTheme.colorPrimary, 0.1) : undefined,

      // ==================== DatePicker 组件配置 ====================
      // 第2层: DatePicker 配置点 (引用设计令牌)
      '--soui-date-picker-font-size': datePickerTheme.fontSize ? `${datePickerTheme.fontSize}px` : undefined,
      '--soui-date-picker-border-radius': datePickerTheme.borderRadius ? `${datePickerTheme.borderRadius}px` : undefined,
      '--soui-date-picker-color-primary': datePickerTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-date-picker-color-primary-hover': datePickerTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-date-picker-border-color': datePickerTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-date-picker-color-border-hover': datePickerTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-date-picker-color-border-focus': datePickerTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-date-picker-bg': datePickerTheme.colorBg || '#fff',
      '--soui-date-picker-panel-bg': datePickerTheme.panelBg || '#fff',
      '--soui-date-picker-text-color': datePickerTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-date-picker-control-height': datePickerTheme.controlHeight ? `${datePickerTheme.controlHeight}px` : '32px',
      '--soui-date-picker-primary-color-10': addOpacityToColor(datePickerTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),
      '--soui-date-picker-primary-color-6': addOpacityToColor(datePickerTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.06),

      // 第3层: DatePicker 组件级覆盖 (优先级最高)
      '--soui-date-picker-font-size-component': datePickerTheme.fontSize ? `${datePickerTheme.fontSize}px` : undefined,
      '--soui-date-picker-border-radius-component': datePickerTheme.borderRadius ? `${datePickerTheme.borderRadius}px` : undefined,
      '--soui-date-picker-color-primary-component': datePickerTheme.colorPrimary,
      '--soui-date-picker-color-primary-hover-component': datePickerTheme.colorPrimaryHover,
      '--soui-date-picker-border-color-component': datePickerTheme.colorBorder,
      '--soui-date-picker-color-border-hover-component': datePickerTheme.colorBorderHover,
      '--soui-date-picker-color-border-focus-component': datePickerTheme.colorBorderFocus,
      '--soui-date-picker-bg-component': datePickerTheme.colorBg,
      '--soui-date-picker-panel-bg-component': datePickerTheme.panelBg,
      '--soui-date-picker-text-color-component': datePickerTheme.colorText,
      '--soui-date-picker-control-height-component': datePickerTheme.controlHeight ? `${datePickerTheme.controlHeight}px` : undefined,
      '--soui-date-picker-primary-color-10-component': datePickerTheme.colorPrimary ? addOpacityToColor(datePickerTheme.colorPrimary, 0.1) : undefined,
      '--soui-date-picker-primary-color-6-component': datePickerTheme.colorPrimary ? addOpacityToColor(datePickerTheme.colorPrimary, 0.06) : undefined,

      // ==================== TimePicker 组件配置 ====================
      // 第2层: TimePicker 配置点 (引用设计令牌)
      '--soui-time-picker-font-size': timePickerTheme.fontSize ? `${timePickerTheme.fontSize}px` : undefined,
      '--soui-time-picker-border-radius': timePickerTheme.borderRadius ? `${timePickerTheme.borderRadius}px` : undefined,
      '--soui-time-picker-color-primary': timePickerTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-time-picker-color-primary-hover': timePickerTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-time-picker-border-color': timePickerTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-time-picker-color-border-hover': timePickerTheme.colorBorderHover || mergedTheme.primaryHoverColor,
      '--soui-time-picker-color-border-focus': timePickerTheme.colorBorderFocus || mergedTheme.primaryColor,
      '--soui-time-picker-bg': timePickerTheme.colorBg || '#fff',
      '--soui-time-picker-panel-bg': timePickerTheme.panelBg || '#fff',
      '--soui-time-picker-text-color': timePickerTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-time-picker-control-height': timePickerTheme.controlHeight ? `${timePickerTheme.controlHeight}px` : '32px',
      '--soui-time-picker-primary-color-10': addOpacityToColor(timePickerTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),
      '--soui-time-picker-primary-color-6': addOpacityToColor(timePickerTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.06),

      // 第3层: TimePicker 组件级覆盖 (优先级最高)
      '--soui-time-picker-font-size-component': timePickerTheme.fontSize ? `${timePickerTheme.fontSize}px` : undefined,
      '--soui-time-picker-border-radius-component': timePickerTheme.borderRadius ? `${timePickerTheme.borderRadius}px` : undefined,
      '--soui-time-picker-color-primary-component': timePickerTheme.colorPrimary,
      '--soui-time-picker-color-primary-hover-component': timePickerTheme.colorPrimaryHover,
      '--soui-time-picker-border-color-component': timePickerTheme.colorBorder,
      '--soui-time-picker-color-border-hover-component': timePickerTheme.colorBorderHover,
      '--soui-time-picker-color-border-focus-component': timePickerTheme.colorBorderFocus,
      '--soui-time-picker-bg-component': timePickerTheme.colorBg,
      '--soui-time-picker-panel-bg-component': timePickerTheme.panelBg,
      '--soui-time-picker-text-color-component': timePickerTheme.colorText,
      '--soui-time-picker-control-height-component': timePickerTheme.controlHeight ? `${timePickerTheme.controlHeight}px` : undefined,
      '--soui-time-picker-primary-color-10-component': timePickerTheme.colorPrimary ? addOpacityToColor(timePickerTheme.colorPrimary, 0.1) : undefined,
      '--soui-time-picker-primary-color-6-component': timePickerTheme.colorPrimary ? addOpacityToColor(timePickerTheme.colorPrimary, 0.06) : undefined,

      // ==================== Transfer 组件配置 ====================
      // 第2层: Transfer 配置点 (引用设计令牌)
      '--soui-transfer-font-size': transferTheme.fontSize ? `${transferTheme.fontSize}px` : undefined,
      '--soui-transfer-border-radius': transferTheme.borderRadius ? `${transferTheme.borderRadius}px` : undefined,
      '--soui-transfer-color-primary': transferTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-transfer-color-primary-hover': transferTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-transfer-color-border': transferTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-transfer-color-bg': transferTheme.colorBg || '#fff',
      '--soui-transfer-header-bg': transferTheme.headerBg || '#f5f5f5',
      '--soui-transfer-color-text': transferTheme.colorText || 'rgba(0, 0, 0, 0.88)',
      '--soui-transfer-color-text-disabled': transferTheme.colorTextDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-transfer-item-hover-bg': transferTheme.itemHoverBg || 'rgba(0, 0, 0, 0.04)',
      '--soui-transfer-item-active-bg': transferTheme.itemActiveBg || addOpacityToColor(transferTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.06),
      '--soui-transfer-primary-color-10': addOpacityToColor(transferTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),

      // 第3层: Transfer 组件级覆盖 (优先级最高)
      '--soui-transfer-font-size-component': transferTheme.fontSize ? `${transferTheme.fontSize}px` : undefined,
      '--soui-transfer-border-radius-component': transferTheme.borderRadius ? `${transferTheme.borderRadius}px` : undefined,
      '--soui-transfer-color-primary-component': transferTheme.colorPrimary,
      '--soui-transfer-color-primary-hover-component': transferTheme.colorPrimaryHover,
      '--soui-transfer-color-border-component': transferTheme.colorBorder,
      '--soui-transfer-color-bg-component': transferTheme.colorBg,
      '--soui-transfer-header-bg-component': transferTheme.headerBg,
      '--soui-transfer-color-text-component': transferTheme.colorText,
      '--soui-transfer-color-text-disabled-component': transferTheme.colorTextDisabled,
      '--soui-transfer-item-hover-bg-component': transferTheme.itemHoverBg,
      '--soui-transfer-item-active-bg-component': transferTheme.itemActiveBg,
      '--soui-transfer-primary-color-10-component': transferTheme.colorPrimary ? addOpacityToColor(transferTheme.colorPrimary, 0.1) : undefined,

      // ==================== Empty 组件配置 ====================
      // 第2层: Empty 配置点 (引用设计令牌)
      '--soui-empty-font-size': emptyTheme.fontSize ? `${emptyTheme.fontSize}px` : undefined,
      '--soui-empty-description-color': emptyTheme.descriptionColor || 'rgba(0, 0, 0, 0.65)',
      '--soui-empty-image-height': emptyTheme.imageHeight ? `${emptyTheme.imageHeight}px` : undefined,
      '--soui-empty-icon-color': emptyTheme.iconColor || mergedTheme.primaryColor,
      '--soui-empty-icon-bg': emptyTheme.iconBg || addOpacityToColor(mergedTheme.primaryColor || '#1677ff', 0.08),
      '--soui-empty-border-color': emptyTheme.borderColor || mergedTheme.borderColorBase,
      '--soui-empty-panel-bg': emptyTheme.panelBg || '#f5f5f5',
      '--soui-empty-content-bg': emptyTheme.contentBg || '#f5f5f5',
      '--soui-empty-detail-color': emptyTheme.detailColor || '#f0f0f0',
      '--soui-empty-shadow-color': emptyTheme.shadowColor || 'rgba(0, 0, 0, 0.06)',

      // 第3层: Empty 组件级覆盖 (优先级最高)
      '--soui-empty-font-size-component': emptyTheme.fontSize ? `${emptyTheme.fontSize}px` : undefined,
      '--soui-empty-description-color-component': emptyTheme.descriptionColor,
      '--soui-empty-image-height-component': emptyTheme.imageHeight ? `${emptyTheme.imageHeight}px` : undefined,
      '--soui-empty-icon-color-component': emptyTheme.iconColor,
      '--soui-empty-icon-bg-component': emptyTheme.iconBg,
      '--soui-empty-border-color-component': emptyTheme.borderColor,
      '--soui-empty-panel-bg-component': emptyTheme.panelBg,
      '--soui-empty-content-bg-component': emptyTheme.contentBg,
      '--soui-empty-detail-color-component': emptyTheme.detailColor,
      '--soui-empty-shadow-color-component': emptyTheme.shadowColor,

      // ==================== Slider 组件配置 ====================
      // 第2层: Slider 配置点 (引用设计令牌)
      '--soui-slider-color-primary': sliderTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-slider-color-primary-hover': sliderTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-slider-handle-size': sliderTheme.handleSize ? `${sliderTheme.handleSize}px` : undefined,
      '--soui-slider-rail-size': sliderTheme.railSize ? `${sliderTheme.railSize}px` : undefined,
      '--soui-slider-dot-size': sliderTheme.dotSize ? `${sliderTheme.dotSize}px` : undefined,
      '--soui-slider-rail-bg': sliderTheme.railBg,
      '--soui-slider-track-bg': sliderTheme.trackBg || mergedTheme.primaryColor,
      '--soui-slider-handle-color': sliderTheme.handleColor || '#fff',
      '--soui-slider-handle-active-color': sliderTheme.handleActiveColor || mergedTheme.primaryHoverColor,
      '--soui-slider-primary-color-10': addOpacityToColor(sliderTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),

      // 第3层: Slider 组件级覆盖 (优先级最高)
      '--soui-slider-color-primary-component': sliderTheme.colorPrimary,
      '--soui-slider-color-primary-hover-component': sliderTheme.colorPrimaryHover,
      '--soui-slider-handle-size-component': sliderTheme.handleSize ? `${sliderTheme.handleSize}px` : undefined,
      '--soui-slider-rail-size-component': sliderTheme.railSize ? `${sliderTheme.railSize}px` : undefined,
      '--soui-slider-dot-size-component': sliderTheme.dotSize ? `${sliderTheme.dotSize}px` : undefined,
      '--soui-slider-rail-bg-component': sliderTheme.railBg,
      '--soui-slider-track-bg-component': sliderTheme.trackBg,
      '--soui-slider-handle-color-component': sliderTheme.handleColor,
      '--soui-slider-handle-active-color-component': sliderTheme.handleActiveColor,
      '--soui-slider-primary-color-10-component': sliderTheme.colorPrimary ? addOpacityToColor(sliderTheme.colorPrimary, 0.1) : undefined,

      // ==================== Upload 组件配置 ====================
      // 第2层: Upload 配置点 (引用设计令牌)
      '--soui-upload-color-primary': uploadTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-upload-color-primary-hover': uploadTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-upload-border-radius': uploadTheme.borderRadius ? `${uploadTheme.borderRadius}px` : undefined,
      '--soui-upload-color-border': uploadTheme.colorBorder || mergedTheme.borderColorBase,
      '--soui-upload-color-bg': uploadTheme.colorBg || '#fff',
      '--soui-upload-font-size': uploadTheme.fontSize ? `${uploadTheme.fontSize}px` : undefined,
      '--soui-upload-text-color': uploadTheme.text || 'rgba(0, 0, 0, 0.88)',
      '--soui-upload-text-color-secondary': uploadTheme.textSecondary || 'rgba(0, 0, 0, 0.65)',
      '--soui-upload-text-color-disabled': uploadTheme.textDisabled || 'rgba(0, 0, 0, 0.25)',
      '--soui-upload-color-error': uploadTheme.colorError || mergedTheme.errorColor,
      '--soui-upload-color-success': uploadTheme.colorSuccess || mergedTheme.successColor,

      // 第3层: Upload 组件级覆盖 (优先级最高)
      '--soui-upload-color-primary-component': uploadTheme.colorPrimary,
      '--soui-upload-color-primary-hover-component': uploadTheme.colorPrimaryHover,
      '--soui-upload-border-radius-component': uploadTheme.borderRadius ? `${uploadTheme.borderRadius}px` : undefined,
      '--soui-upload-color-border-component': uploadTheme.colorBorder,
      '--soui-upload-color-bg-component': uploadTheme.colorBg,
      '--soui-upload-font-size-component': uploadTheme.fontSize ? `${uploadTheme.fontSize}px` : undefined,
      '--soui-upload-text-color-component': uploadTheme.text,
      '--soui-upload-text-color-secondary-component': uploadTheme.textSecondary,
      '--soui-upload-text-color-disabled-component': uploadTheme.textDisabled,
      '--soui-upload-color-error-component': uploadTheme.colorError,
      '--soui-upload-color-success-component': uploadTheme.colorSuccess,

      // ==================== Form 组件配置 ====================
      // 第2层: Form 配置点 (引用设计令牌)
      '--soui-form-color-primary': formTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-form-color-error': formTheme.colorError || mergedTheme.errorColor,
      '--soui-form-color-warning': formTheme.colorWarning || mergedTheme.warningColor,
      '--soui-form-color-success': formTheme.colorSuccess || mergedTheme.successColor,
      '--soui-form-border-radius': formTheme.borderRadius ? `${formTheme.borderRadius}px` : undefined,
      '--soui-form-font-size': formTheme.fontSize ? `${formTheme.fontSize}px` : undefined,
      '--soui-form-label-font-size': formTheme.labelFontSize ? `${formTheme.labelFontSize}px` : undefined,
      '--soui-form-label-width': formTheme.labelWidth ? `${formTheme.labelWidth}px` : undefined,
      '--soui-form-label-color': formTheme.labelColor,
      '--soui-form-text-color-secondary': formTheme.textSecondary || 'rgba(0, 0, 0, 0.65)',

      // 第3层: Form 组件级覆盖 (优先级最高)
      '--soui-form-color-primary-component': formTheme.colorPrimary,
      '--soui-form-color-error-component': formTheme.colorError,
      '--soui-form-color-warning-component': formTheme.colorWarning,
      '--soui-form-color-success-component': formTheme.colorSuccess,
      '--soui-form-border-radius-component': formTheme.borderRadius ? `${formTheme.borderRadius}px` : undefined,
      '--soui-form-font-size-component': formTheme.fontSize ? `${formTheme.fontSize}px` : undefined,
      '--soui-form-label-font-size-component': formTheme.labelFontSize ? `${formTheme.labelFontSize}px` : undefined,
      '--soui-form-label-width-component': formTheme.labelWidth ? `${formTheme.labelWidth}px` : undefined,
      '--soui-form-label-color-component': formTheme.labelColor,
      '--soui-form-text-color-secondary-component': formTheme.textSecondary,

      // ==================== Pagination 组件配置 ====================
      // 第2层: Pagination 配置点 (引用设计令牌)
      '--soui-pagination-font-size': paginationTheme.fontSize ? `${paginationTheme.fontSize}px` : undefined,
      '--soui-pagination-border-radius': paginationTheme.borderRadius ? `${paginationTheme.borderRadius}px` : undefined,
      '--soui-pagination-color-primary': paginationTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-pagination-color-primary-hover': paginationTheme.colorPrimaryHover || mergedTheme.primaryHoverColor,
      '--soui-pagination-border-color': paginationTheme.borderColor || mergedTheme.borderColorBase,
      '--soui-pagination-item-bg': paginationTheme.itemBg,
      '--soui-pagination-primary-color-20': addOpacityToColor(paginationTheme.colorPrimary || mergedTheme.primaryColor || '#1677ff', 0.1),

      // 第3层: Pagination 组件级覆盖 (优先级最高)
      '--soui-pagination-font-size-component': paginationTheme.fontSize ? `${paginationTheme.fontSize}px` : undefined,
      '--soui-pagination-border-radius-component': paginationTheme.borderRadius ? `${paginationTheme.borderRadius}px` : undefined,
      '--soui-pagination-color-primary-component': paginationTheme.colorPrimary,
      '--soui-pagination-color-primary-hover-component': paginationTheme.colorPrimaryHover,
      '--soui-pagination-border-color-component': paginationTheme.borderColor,
      '--soui-pagination-item-bg-component': paginationTheme.itemBg,
      '--soui-pagination-primary-color-20-component': paginationTheme.colorPrimary ? addOpacityToColor(paginationTheme.colorPrimary, 0.1) : undefined,

      // ==================== Tag 组件配置 ====================
      // 第2层: Tag 配置点 (引用设计令牌)
      '--soui-tag-color-primary': tagTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-tag-font-size': tagTheme.fontSize ? `${tagTheme.fontSize}px` : undefined,
      '--soui-tag-border-radius': tagTheme.borderRadius ? `${tagTheme.borderRadius}px` : undefined,
      '--soui-tag-default-bg': tagTheme.defaultBg,
      '--soui-tag-default-color': tagTheme.defaultColor,
      '--soui-tag-default-border-color': tagTheme.defaultBorderColor,

      // 第3层: Tag 组件级覆盖 (优先级最高)
      '--soui-tag-color-primary-component': tagTheme.colorPrimary,
      '--soui-tag-font-size-component': tagTheme.fontSize ? `${tagTheme.fontSize}px` : undefined,
      '--soui-tag-border-radius-component': tagTheme.borderRadius ? `${tagTheme.borderRadius}px` : undefined,
      '--soui-tag-default-bg-component': tagTheme.defaultBg,
      '--soui-tag-default-color-component': tagTheme.defaultColor,
      '--soui-tag-default-border-color-component': tagTheme.defaultBorderColor,

      // ==================== Card 组件配置 ====================
      // 第2层: Card 配置点 (引用设计令牌)
      '--soui-card-color-primary': cardTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-card-color-bg': cardTheme.colorBg,
      '--soui-card-header-bg': cardTheme.headerBg,
      '--soui-card-border-color': cardTheme.borderColor,
      '--soui-card-border-radius': cardTheme.borderRadius ? `${cardTheme.borderRadius}px` : undefined,
      '--soui-card-header-font-size': cardTheme.headerFontSize ? `${cardTheme.headerFontSize}px` : undefined,
      '--soui-card-hover-shadow': cardTheme.hoverShadow,

      // 第3层: Card 组件级覆盖 (优先级最高)
      '--soui-card-color-primary-component': cardTheme.colorPrimary,
      '--soui-card-color-bg-component': cardTheme.colorBg,
      '--soui-card-header-bg-component': cardTheme.headerBg,
      '--soui-card-border-color-component': cardTheme.borderColor,
      '--soui-card-border-radius-component': cardTheme.borderRadius ? `${cardTheme.borderRadius}px` : undefined,
      '--soui-card-header-font-size-component': cardTheme.headerFontSize ? `${cardTheme.headerFontSize}px` : undefined,
      '--soui-card-hover-shadow-component': cardTheme.hoverShadow,

      // ==================== Badge 组件配置 ====================
      // 第2层: Badge 配置点 (引用设计令牌)
      '--soui-badge-color-error': badgeTheme.colorError || mergedTheme.errorColor,
      '--soui-badge-color-primary': badgeTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-badge-font-size': badgeTheme.fontSize ? `${badgeTheme.fontSize}px` : undefined,

      // 第3层: Badge 组件级覆盖 (优先级最高)
      '--soui-badge-color-error-component': badgeTheme.colorError,
      '--soui-badge-color-primary-component': badgeTheme.colorPrimary,
      '--soui-badge-font-size-component': badgeTheme.fontSize ? `${badgeTheme.fontSize}px` : undefined,

      // ==================== Carousel 组件配置 ====================
      // 第2层: Carousel 配置点 (引用设计令牌)
      '--soui-carousel-color-primary': carouselTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-carousel-dot-size': carouselTheme.dotSize ? `${carouselTheme.dotSize}px` : undefined,
      '--soui-carousel-arrow-size': carouselTheme.arrowSize ? `${carouselTheme.arrowSize}px` : undefined,

      // 第3层: Carousel 组件级覆盖 (优先级最高)
      '--soui-carousel-color-primary-component': carouselTheme.colorPrimary,
      '--soui-carousel-dot-size-component': carouselTheme.dotSize ? `${carouselTheme.dotSize}px` : undefined,
      '--soui-carousel-arrow-size-component': carouselTheme.arrowSize ? `${carouselTheme.arrowSize}px` : undefined,

      // ==================== Descriptions 组件配置 ====================
      // 第2层: Descriptions 配置点 (引用设计令牌)
      '--soui-descriptions-label-bg': descriptionsTheme.colorLabelBg,
      '--soui-descriptions-border-color': descriptionsTheme.borderColor,
      '--soui-descriptions-font-size': descriptionsTheme.fontSize ? `${descriptionsTheme.fontSize}px` : undefined,

      // 第3层: Descriptions 组件级覆盖 (优先级最高)
      '--soui-descriptions-label-bg-component': descriptionsTheme.colorLabelBg,
      '--soui-descriptions-border-color-component': descriptionsTheme.borderColor,
      '--soui-descriptions-font-size-component': descriptionsTheme.fontSize ? `${descriptionsTheme.fontSize}px` : undefined,

      // ==================== Image 组件配置 ====================
      // 第2层: Image 配置点 (引用设计令牌)
      '--soui-image-placeholder-bg': imageTheme.placeholderBg,
      '--soui-image-border-radius': imageTheme.borderRadius ? `${imageTheme.borderRadius}px` : undefined,

      // 第3层: Image 组件级覆盖 (优先级最高)
      '--soui-image-placeholder-bg-component': imageTheme.placeholderBg,
      '--soui-image-border-radius-component': imageTheme.borderRadius ? `${imageTheme.borderRadius}px` : undefined,

      // ==================== Collapse 组件配置 ====================
      // 第2层: Collapse 配置点 (引用设计令牌)
      '--soui-collapse-color-bg': collapseTheme.colorBg,
      '--soui-collapse-header-bg': collapseTheme.headerBg,
      '--soui-collapse-border-color': collapseTheme.borderColor,
      '--soui-collapse-font-size': collapseTheme.fontSize ? `${collapseTheme.fontSize}px` : undefined,

      // 第3层: Collapse 组件级覆盖 (优先级最高)
      '--soui-collapse-color-bg-component': collapseTheme.colorBg,
      '--soui-collapse-header-bg-component': collapseTheme.headerBg,
      '--soui-collapse-border-color-component': collapseTheme.borderColor,
      '--soui-collapse-font-size-component': collapseTheme.fontSize ? `${collapseTheme.fontSize}px` : undefined,

      // ==================== PopCard 组件配置 ====================
      // 第2层: PopCard 配置点 (引用设计令牌)
      '--soui-popcard-color-bg': popCardTheme.colorBg,
      '--soui-popcard-border-radius': popCardTheme.borderRadius ? `${popCardTheme.borderRadius}px` : undefined,
      '--soui-popcard-box-shadow': popCardTheme.boxShadow,

      // 第3层: PopCard 组件级覆盖 (优先级最高)
      '--soui-popcard-color-bg-component': popCardTheme.colorBg,
      '--soui-popcard-border-radius-component': popCardTheme.borderRadius ? `${popCardTheme.borderRadius}px` : undefined,
      '--soui-popcard-box-shadow-component': popCardTheme.boxShadow,
    } as any;
  }, [mergedTheme]);

  const contextValue = useMemo(
    () => ({
      theme: mergedTheme,
      componentSize,
      components: mergedTheme.components, // 传递组件级配置
    }),
    [mergedTheme, componentSize]
  );

  return (
    <ConfigContext.Provider value={contextValue}>
      <div
        className={classNames('soui-config-provider')}
        style={cssVariables}
        data-soui-theme="custom"
      >
        {children}
      </div>
    </ConfigContext.Provider>
  );
};

/**
 * 使用配置的 Hook
 */
export const useConfig = () => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};

/**
 * 使用主题的 Hook
 */
export const useTheme = () => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    // 不在 ConfigProvider 内时返回空对象，组件将使用 Less 默认值
    return {};
  }
  return context.theme || {};
};

/**
 * 使用组件尺寸的 Hook
 */
export const useComponentSize = () => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    return 'middle' as const;
  }
  return context.componentSize || 'middle';
};

/**
 * 获取组件级主题配置的 Hook
 */
export const useComponentTheme = <T extends keyof NonNullable<ConfigContextProps['components']>>(
  componentName: T
): NonNullable<ConfigContextProps['components']>[T] => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    // 不在 ConfigProvider 内时返回空对象，组件将使用 Less 默认值
    // 适用于 Portal 组件（Dialog、Notification、Message 等）通过 createRoot 渲染的场景
    return {} as NonNullable<ConfigContextProps['components']>[T];
  }
  return (context.components?.[componentName] || {}) as NonNullable<ConfigContextProps['components']>[T];
};

export { ConfigContext };
export default ConfigProvider;
