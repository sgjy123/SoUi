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
      '--soui-input-color-icon': inputTheme.colorIcon || 'rgba(0, 0, 0, 0.45)',
      '--soui-input-color-icon-hover': inputTheme.colorIconHover || 'rgba(0, 0, 0, 0.65)',
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
      // 第3层: ColorPicker 组件级覆盖 (优先级最高)
      '--soui-color-picker-font-size-component': colorPickerTheme.fontSize ? `${colorPickerTheme.fontSize}px` : undefined,
      '--soui-color-picker-border-radius-component': colorPickerTheme.borderRadius ? `${colorPickerTheme.borderRadius}px` : undefined,
      '--soui-color-picker-color-primary-component': colorPickerTheme.colorPrimary,
      '--soui-color-picker-border-color-component': colorPickerTheme.colorBorder,
      '--soui-color-picker-panel-bg-component': colorPickerTheme.colorBg,
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
