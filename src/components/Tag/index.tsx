import React, { useState, useRef, useContext, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 预设状态色 */
export type TagPresetStatus = 'success' | 'processing' | 'error' | 'default' | 'warning';

/** 预设颜色 */
export type TagPresetColor =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple';

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** 标签颜色：预设状态色、预设颜色或自定义色值 */
  color?: TagPresetStatus | TagPresetColor | string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 关闭时的回调（e.preventDefault() 可阻止关闭） */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 标签内的图标 */
  icon?: React.ReactNode;
  /** 是否有边框 */
  bordered?: boolean;
  /** 标签内容 */
  children?: React.ReactNode;
}

export interface CheckableTagProps {
  /** 是否选中 */
  checked?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 标签内容 */
  children?: React.ReactNode;
}

// ==================== Constants ====================

/** 预设颜色集合 */
const PRESET_COLORS: TagPresetColor[] = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
];

/** 预设状态色集合 */
const PRESET_STATUS: TagPresetStatus[] = [
  'success', 'processing', 'error', 'default', 'warning',
];

/** 判断是否为预设颜色或状态 */
const isPresetColor = (color?: string): boolean =>
  !!color && ([...PRESET_COLORS, ...PRESET_STATUS] as string[]).includes(color);

// ==================== CheckableTag ====================

const CheckableTag: React.FC<CheckableTagProps> = ({
  checked = false,
  onChange,
  className,
  style,
  children,
}) => {
  return (
    <span
      className={classNames('soui-tag soui-tag-checkable', { 'soui-tag-checked': checked }, className)}
      style={style}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onChange?.(!checked)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange?.(!checked);
        }
      }}
    >
      {children}
    </span>
  );
};

// ==================== Tag ====================

interface TagComponent extends React.FC<TagProps> {
  CheckableTag: typeof CheckableTag;
}

const Tag: TagComponent = ({
  color,
  closable = false,
  closeIcon,
  onClose,
  icon,
  bordered = true,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Tag || {}) as Record<string, any>;

  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-tag-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-tag-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-tag-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.defaultBg !== undefined) {
    cssVars['--soui-tag-default-bg'] = componentTheme.defaultBg;
  }
  if (componentTheme.defaultColor !== undefined) {
    cssVars['--soui-tag-default-color'] = componentTheme.defaultColor;
  }
  if (componentTheme.defaultBorderColor !== undefined) {
    cssVars['--soui-tag-default-border-color'] = componentTheme.defaultBorderColor;
  }

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (e.defaultPrevented) return;
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  const preset = isPresetColor(color);
  const isCustomColor = !!color && !preset;

  // 自定义颜色：实底 + 白色文字
  const customStyle: React.CSSProperties = isCustomColor
    ? { backgroundColor: color, borderColor: color, color: '#fff' }
    : {};

  const tagClassName = classNames(
    'soui-tag',
    {
      [`soui-tag-${color}`]: preset,
      'soui-tag-bordered': bordered,
      'soui-tag-closable': closable,
      'soui-tag-closing': closing,
    },
    className,
  );

  const tagStyle = { ...cssVars, ...customStyle, ...style } as React.CSSProperties;

  return (
    <span className={tagClassName} style={tagStyle} {...rest}>
      {icon && <span className="soui-tag-icon">{icon}</span>}
      <span className="soui-tag-content">{children}</span>
      {closable && (
        <span
          className="soui-tag-close-icon"
          role="button"
          aria-label="关闭"
          tabIndex={0}
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClose(e as unknown as React.MouseEvent<HTMLElement>);
            }
          }}
        >
          {closeIcon ?? <Icon name="Close" size={12} />}
        </span>
      )}
    </span>
  );
};

Tag.CheckableTag = CheckableTag;

export default Tag;
