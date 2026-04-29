import React, { useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from './context';
import type { ConfigProviderProps, ThemeConfig } from './types';
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
    } as any;
  }, [mergedTheme]);

  const contextValue = useMemo(
    () => ({
      theme: mergedTheme,
      componentSize,
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

export { ConfigContext };
export default ConfigProvider;
