import React, { useContext } from 'react';
import classNames from 'classnames';
import * as Icons from '@icon-park/react';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

export type IconTheme = 'outline' | 'filled';

export interface IconProps {
  /** 图标名称 */
  name: string;
  /** 主题 */
  theme?: IconTheme;
  /** 图标大小 */
  size?: number;
  /** 填充颜色 */
  fill?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  theme = 'outline',
  size = 24,
  fill,
  className,
  style,
  onClick,
}) => {
  // 从 ConfigContext 获取主题配置
  const context = useContext(ConfigContext);
  const defaultFill = fill || context?.theme?.primaryColor || '#000000';

  // 根据 name 动态获取图标组件
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @icon-park/react`);
    return null;
  }

  const iconClassName = classNames('soui-icon', className);

  return (
    <span
      className={iconClassName}
      style={style}
      onClick={onClick}
      role="img"
      aria-label={name}
    >
      <IconComponent
        theme={theme}
        size={size}
        fill={defaultFill}
      />
    </span>
  );
};

export default Icon;
