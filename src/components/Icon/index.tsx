import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import * as Icons from '@icon-park/react';
import ConfigContext from '../ConfigProvider/context';
import type { ComponentThemeConfig } from '../ConfigProvider/types';
import './style.less';

export type IconTheme = 'outline' | 'filled';

export type IconColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';

export interface IconProps {
  /** 图标名称 */
  name: string;
  /** 主题风格 */
  theme?: IconTheme;
  /** 图标大小（像素） */
  size?: number;
  /** 填充颜色 */
  fill?: string;
  /** 预设颜色类型 */
  color?: IconColor;
  /** 是否可点击 */
  clickable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  theme = 'outline',
  size,
  fill,
  color = 'default',
  clickable,
  className,
  style,
  onClick,
}) => {
  // 从 ConfigContext 获取主题配置
  const context = useContext(ConfigContext);
  const globalTheme = context?.theme || {};
  const iconTheme = (context?.components?.Icon || {}) as ComponentThemeConfig['Icon'];

  // 计算图标尺寸（优先级：props > 组件级配置 > 全局配置 > 默认值）
  const iconSize = useMemo(() => {
    if (size !== undefined) return size;
    if (iconTheme?.size !== undefined) return iconTheme.size;
    return 24;
  }, [size, iconTheme?.size]);

  // 计算图标颜色（优先级：props.fill > props.color > 组件级配置 > 全局配置）
  const iconFill = useMemo(() => {
    // 如果直接传入 fill，优先使用
    if (fill) return fill;

    // 根据 color 属性选择预设颜色
    const colorMap: Record<IconColor, string | undefined> = {
      primary: iconTheme?.colorPrimary || globalTheme.primaryColor,
      success: iconTheme?.colorSuccess || globalTheme.successColor,
      warning: iconTheme?.colorWarning || globalTheme.warningColor,
      error: iconTheme?.colorError || globalTheme.errorColor,
      info: iconTheme?.colorInfo || globalTheme.infoColor,
      default: undefined, // 使用 currentColor 继承父元素颜色
    };

    return colorMap[color];
  }, [fill, color, iconTheme, globalTheme]);

  // 根据 name 动态获取图标组件
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @icon-park/react`);
    return null;
  }

  const iconClassName = classNames('soui-icon', {
    'soui-icon-clickable': clickable || onClick,
  }, className);

  return (
    <span
      className={iconClassName}
      style={{
        '--soui-icon-size': `${iconSize}px`,
        ...style,
      } as React.CSSProperties}
      onClick={onClick}
      role="img"
      aria-label={name}
    >
      <IconComponent
        theme={theme}
        size={iconSize}
        fill={iconFill || 'currentColor'}
      />
    </span>
  );
};

export default Icon;
