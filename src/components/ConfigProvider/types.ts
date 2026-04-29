import { ReactNode } from 'react';

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
};
