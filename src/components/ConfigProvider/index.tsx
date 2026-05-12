import React, { useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from './context';
import type { ConfigProviderProps, ThemeConfig, ConfigContextProps } from './types';
import { defaultTheme } from './types';
import { addOpacityToColor } from '../../utils';
import './style.less';

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
    throw new Error('useTheme must be used within ConfigProvider');
  }
  return context.theme || {};
};

/**
 * 使用组件尺寸的 Hook
 */
export const useComponentSize = () => {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error('useComponentSize must be used within ConfigProvider');
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
    throw new Error('useComponentTheme must be used within ConfigProvider');
  }
  return (context.components?.[componentName] || {}) as NonNullable<ConfigContextProps['components']>[T];
};

export { ConfigContext };
export default ConfigProvider;
