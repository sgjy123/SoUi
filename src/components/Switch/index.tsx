import React, { useState, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type SwitchSize = 'default' | 'small';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** 是否选中（受控） */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 尺寸 */
  size?: SwitchSize;
  /** 选中时的内容 */
  checkedChildren?: React.ReactNode;
  /** 未选中时的内容 */
  unCheckedChildren?: React.ReactNode;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 选中变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Component ====================

const Switch: React.FC<SwitchProps> = ({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  loading = false,
  size = 'default',
  checkedChildren,
  unCheckedChildren,
  autoFocus,
  onChange,
  className,
  style,
  ...rest
}) => {
  // Theme
  const context = useContext(ConfigContext);
  const switchTheme = (context?.components?.Switch || {}) as Record<string, any>;

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (switchTheme.colorPrimary !== undefined) {
    cssVars['--soui-switch-color-primary'] = switchTheme.colorPrimary;
  }
  if (switchTheme.colorPrimaryHover !== undefined) {
    cssVars['--soui-switch-color-primary-hover'] = switchTheme.colorPrimaryHover;
  }
  if (switchTheme.borderRadius !== undefined) {
    cssVars['--soui-switch-border-radius'] = `${switchTheme.borderRadius}px`;
  }
  if (switchTheme.colorBg !== undefined) {
    cssVars['--soui-switch-color-bg'] = switchTheme.colorBg;
  }
  if (switchTheme.colorText !== undefined) {
    cssVars['--soui-switch-color-text'] = switchTheme.colorText;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // State
  const isControlled = checkedProp !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checkedProp! : innerChecked;

  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoFocus && btnRef.current) {
      btnRef.current.focus();
    }
  }, [autoFocus]);

  const isDisabled = disabled || loading;

  const handleClick = () => {
    if (isDisabled) return;
    const newChecked = !isChecked;
    if (!isControlled) setInnerChecked(newChecked);
    onChange?.(newChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const switchCls = classNames(
    'soui-switch',
    {
      'soui-switch-checked': isChecked,
      'soui-switch-disabled': isDisabled,
      'soui-switch-loading': loading,
      'soui-switch-small': size === 'small',
    },
    className,
  );

  return (
    <button
      ref={btnRef}
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      className={switchCls}
      style={componentStyle}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className="soui-switch-handle">
        {loading && (
          <span className="soui-switch-loading-icon">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 64q14.016 0 23.008 8.992T544 96v192q0 14.016-8.992 23.008T512 320t-23.008-8.992T480 288V96q0-14.016 8.992-23.008T512 64z m0 640q14.016 0 23.008 8.992T544 736v192q0 14.016-8.992 23.008T512 960t-23.008-8.992T480 928v-192q0-14.016 8.992-23.008T512 704z m448-192q0 14.016-8.992 23.008T928 544h-192q-14.016 0-23.008-8.992T704 512t8.992-23.008T736 480h192q14.016 0 23.008 8.992T960 512z m-640 0q0 14.016-8.992 23.008T288 544H96q-14.016 0-23.008-8.992T64 512t8.992-23.008T96 480h192q14.016 0 23.008 8.992T320 512z" opacity="1" />
              <path d="M825.472 289.536q-10.016 10.016-24 10.016t-24-10.016L642.496 154.496q-10.016-10.016-10.016-24t10.016-24 24-10.016 24 10.016l135.04 135.04q10.016 10.016 10.016 24t-10.08 24.032z m-494.976 494.976q-10.016 10.016-24 10.016t-24-10.016L147.52 649.472q-10.016-10.016-10.016-24t10.016-24 24-10.016 24 10.016l135.04 135.04q10.016 10.016 10.016 24t-10.08 24.032z m494.976 0q-10.016 10.016-24 10.016t-24-10.016q-10.016-10.016-10.016-24t10.016-24l135.04-135.04q10.016-10.016 24-10.016t24 10.016 10.016 24-10.016 24z M330.496 289.536q-10.016 10.016-24 10.016t-24-10.016L147.52 154.496q-10.016-10.016-10.016-24t10.016-24 24-10.016 24 10.016l135.04 135.04q10.016 10.016 10.016 24t-10.08 24.032z" opacity="0.3" />
            </svg>
          </span>
        )}
      </span>
      <span className="soui-switch-inner">
        {isChecked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  );
};

export default Switch;
