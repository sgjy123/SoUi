import React, { useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from './context';
import type { ConfigProviderProps, ThemeConfig, ConfigContextProps } from './types';
import { defaultTheme } from './types';
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
    
    return {
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
      
      // Icon 全局变量
      '--soui-icon-size': `${iconTheme.size || 24}px`,
      '--soui-icon-color-primary': iconTheme.colorPrimary || mergedTheme.primaryColor,
      '--soui-icon-color-success': iconTheme.colorSuccess || mergedTheme.successColor,
      '--soui-icon-color-warning': iconTheme.colorWarning || mergedTheme.warningColor,
      '--soui-icon-color-error': iconTheme.colorError || mergedTheme.errorColor,
      '--soui-icon-color-info': iconTheme.colorInfo || mergedTheme.infoColor,
      '--soui-icon-color-default': iconTheme.colorDefault || mergedTheme.primaryColor,
      '--soui-icon-hover-opacity': iconTheme.hoverOpacity?.toString() || '0.7',
      '--soui-icon-active-opacity': iconTheme.activeOpacity?.toString() || '0.5',
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
