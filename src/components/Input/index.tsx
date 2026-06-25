import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type InputSize = 'large' | 'middle' | 'small';
export type InputStatus = 'error' | 'warning';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'ref'> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 输入框状态 */
  status?: InputStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 无边框模式 */
  borderless?: boolean;
  /** 带标签的前缀 */
  prefix?: React.ReactNode;
  /** 带标签的后缀 */
  suffix?: React.ReactNode;
  /** 带标签的前置元素 */
  addonBefore?: React.ReactNode;
  /** 带标签的后置元素 */
  addonAfter?: React.ReactNode;
  /** 是否允许清空 */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计 */
  showCount?: boolean | ((count: number, maxLength: number) => React.ReactNode);
  /** 按下回车的回调 */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 是否只读 */
  readOnly?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 清除回调 */
  onClear?: () => void;
}

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计 */
  showCount?: boolean | ((count: number, maxLength: number) => React.ReactNode);
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 按下回车的回调 */
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /** 行数 */
  rows?: number;
  /** 自适应内容高度 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 清除回调 */
  onClear?: () => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface PasswordProps extends InputProps {
  /** 是否显示切换按钮 */
  visibilityToggle?: boolean;
  /** 自定义图标渲染 */
  iconRender?: (visible: boolean) => React.ReactNode;
}

export interface SearchProps extends InputProps {
  /** 是否有确认按钮，可设为按钮文字 */
  enterButton?: boolean | React.ReactNode;
  /** 搜索 loading */
  loading?: boolean;
  /** 点击搜索或按下回车时的回调 */
  onSearch?: (value: string, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
}

// ==================== Hooks ====================

function useComponentTheme(componentName: string): Record<string, any> {
  const context = useContext(ConfigContext);
  if (!context || !context.components) return {};
  return (context.components as any)[componentName] || {};
}

function useGlobalTheme(): Record<string, any> {
  const context = useContext(ConfigContext);
  if (!context || !context.theme) return {};
  return context.theme as Record<string, any>;
}

// ==================== Utils ====================

function resolveClearIcon(allowClear: InputProps['allowClear']): React.ReactNode {
  if (!allowClear) return null;
  if (typeof allowClear === 'object' && allowClear.clearIcon) {
    return allowClear.clearIcon;
  }
  return <Icon name="Close" size={14} theme="outline" />;
}

// ==================== Input ====================

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size: sizeProp,
    status,
    disabled = false,
    bordered = true,
    borderless = false,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    allowClear,
    maxLength,
    showCount,
    onPressEnter,
    readOnly = false,
    className,
    style,
    onClear,
    onKeyDown,
    onChange,
    value: valueProp,
    defaultValue,
    id,
    ...rest
  } = props;

  // Theme
  const inputTheme = useComponentTheme('Input');
  const globalTheme = useGlobalTheme();

  // Size
  const mergedSize = sizeProp || 'middle';
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const value = isControlled ? valueProp : innerValue;
  const valueStr = typeof value === 'string' || typeof value === 'number' ? String(value ?? '') : '';
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  // Shrink suffix when clear icon shows (the clear icon sits within the suffix area)
  const hasClear = !!allowClear && !!valueStr && !disabled && !readOnly;
  const clearIcon = resolveClearIcon(allowClear);

  // Count: maxLength
  const resolvedMax = maxLength;

  // CSS Variables
  const borderRadiusValue = inputTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = inputTheme?.fontSize || globalTheme?.fontSize;

  const cssVars: Record<string, any> = {};
  if (borderRadiusValue !== undefined) cssVars['--soui-input-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-input-font-size'] = `${fontSizeValue}px`;
  if (inputTheme?.colorBorder) cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
  if (inputTheme?.colorBorderHover) cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
  if (inputTheme?.colorBorderFocus) cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
  if (inputTheme?.colorBg) cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
  if (inputTheme?.colorText) cssVars['--soui-input-color-text'] = inputTheme.colorText;
  if (inputTheme?.colorBgDisabled) cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
  if (inputTheme?.colorTextDisabled) cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;
  if (inputTheme?.colorError) cssVars['--soui-input-color-error'] = inputTheme.colorError;
  if (inputTheme?.colorWarning) cssVars['--soui-input-color-warning'] = inputTheme.colorWarning;
  if (inputTheme?.colorIcon) cssVars['--soui-input-color-icon'] = inputTheme.colorIcon;
  if (inputTheme?.colorIconHover) cssVars['--soui-input-color-icon-hover'] = inputTheme.colorIconHover;

  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isControlled) setInnerValue('');
    onClear?.();
    inputRef.current?.focus();
    // trigger synthetic onChange with empty value
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )?.set;
    if (nativeInputValueSetter && inputRef.current) {
      nativeInputValueSetter.call(inputRef.current, '');
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onPressEnter?.(e);
    onKeyDown?.(e);
  };

  const wrapperCls = classNames(
    'soui-input-wrapper',
    `soui-input-wrapper-${mergedSize}`,
    {
      'soui-input-wrapper-disabled': disabled,
      'soui-input-wrapper-readonly': readOnly,
      'soui-input-wrapper-focused': isFocused,
      'soui-input-wrapper-hovered': isHovered && !disabled && !readOnly,
      'soui-input-wrapper-has-prefix': !!prefix,
      'soui-input-wrapper-has-suffix': !!suffix || hasClear,
      'soui-input-wrapper-has-addon-before': !!addonBefore,
      'soui-input-wrapper-has-addon-after': !!addonAfter,
      'soui-input-wrapper-borderless': borderless,
      'soui-input-wrapper-bordered': bordered && !borderless,
      [`soui-input-wrapper-status-${status}`]: !!status && !disabled,
    },
    className,
  );

  const inputCls = classNames('soui-input', {
    'soui-input-disabled': disabled,
    'soui-input-readonly': readOnly,
  });

  // ---- count ----
  const actualCount = valueStr.length;
  const showCountNode = showCount && resolvedMax ? (
    <span className="soui-input-count">
      {typeof showCount === 'function'
        ? showCount(actualCount, resolvedMax)
        : `${actualCount} / ${resolvedMax}`}
    </span>
  ) : null;

  // ---- affix wrapper ----
  const affixWrapperCls = classNames('soui-input-affix-wrapper', {
    'soui-input-affix-wrapper-borderless': borderless,
    'soui-input-affix-wrapper-focused': isFocused,
  });

  const renderInput = (
    <span
      ref={wrapperRef}
      className={affixWrapperCls}
      style={addonBefore || addonAfter ? undefined : mergedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {prefix && <span className="soui-input-prefix">{prefix}</span>}
      <input
        ref={inputRef}
        id={id}
        className={inputCls}
        disabled={disabled}
        readOnly={readOnly}
        value={valueStr}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => { setIsFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); rest.onBlur?.(e); }}
        maxLength={maxLength}
        {...rest}
      />
      <span className="soui-input-suffix">
        {suffix && <span className="soui-input-suffix-inner">{suffix}</span>}
        {hasClear && (
          <span
            className="soui-input-clear-icon"
            onClick={handleClear}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClear(e as any); } }}
            role="button"
            tabIndex={0}
            aria-label="清除"
          >
            {clearIcon}
          </span>
        )}
      </span>
    </span>
  );

  // ---- container with addons ----
  if (addonBefore || addonAfter) {
    const containerCls = classNames('soui-input-addon-wrapper', wrapperCls);
    return (
      <span className={containerCls} style={mergedStyle}>
        {addonBefore && <span className="soui-input-addon-before">{addonBefore}</span>}
        {renderInput}
        {addonAfter && <span className="soui-input-addon-after">{addonAfter}</span>}
        {showCountNode}
      </span>
    );
  }

  return (
    <span className={wrapperCls} style={mergedStyle}>
      {renderInput}
      {showCountNode}
    </span>
  );
});

Input.displayName = 'Input';

// ==================== TextArea ====================

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    size = 'middle',
    bordered = true,
    disabled = false,
    maxLength,
    showCount,
    allowClear,
    onPressEnter,
    rows = 3,
    autoSize,
    className,
    style,
    onClear,
    onKeyDown,
    onChange,
    value: valueProp,
    defaultValue,
    ...rest
  } = props;

  const inputTheme = useComponentTheme('Input');
  const globalTheme = useGlobalTheme();

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const value = isControlled ? valueProp : innerValue;
  const valueStr = typeof value === 'string' || typeof value === 'number' ? String(value ?? '') : '';
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current!);

  const hasClear = !!allowClear && !!valueStr && !disabled;

  // CSS Variables
  const borderRadiusValue = inputTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = inputTheme?.fontSize || globalTheme?.fontSize;
  const cssVars: Record<string, any> = {};
  if (borderRadiusValue !== undefined) cssVars['--soui-input-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-input-font-size'] = `${fontSizeValue}px`;
  if (inputTheme?.colorBorder) cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
  if (inputTheme?.colorBorderHover) cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
  if (inputTheme?.colorBorderFocus) cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
  if (inputTheme?.colorBg) cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
  if (inputTheme?.colorText) cssVars['--soui-input-color-text'] = inputTheme.colorText;
  if (inputTheme?.colorBgDisabled) cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
  if (inputTheme?.colorTextDisabled) cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;

  // Auto size
  useEffect(() => {
    if (autoSize && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      const minRows = typeof autoSize === 'object' ? autoSize.minRows : undefined;
      const maxRows = typeof autoSize === 'object' ? autoSize.maxRows : undefined;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
      el.style.height = `${Math.max(el.scrollHeight, minRows ? minRows * lineHeight : 0)}px`;
      if (maxRows) {
        el.style.maxHeight = `${maxRows * lineHeight}px`;
      }
    }
  }, [value, autoSize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isControlled) setInnerValue('');
    onClear?.();
    textareaRef.current?.focus();
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype, 'value'
    )?.set;
    if (nativeInputValueSetter && textareaRef.current) {
      nativeInputValueSetter.call(textareaRef.current, '');
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') onPressEnter?.(e);
    onKeyDown?.(e);
  };

  const resolvedMax = maxLength;
  const actualCount = valueStr.length;
  const showCountNode = showCount && resolvedMax ? (
    <span className="soui-input-count">
      {typeof showCount === 'function'
        ? showCount(actualCount, resolvedMax)
        : `${actualCount} / ${resolvedMax}`}
    </span>
  ) : null;

  const wrapperCls = classNames(
    'soui-input-wrapper',
    'soui-input-textarea-wrapper',
    `soui-input-wrapper-${size}`,
    {
      'soui-input-wrapper-disabled': disabled,
      'soui-input-wrapper-bordered': bordered,
      'soui-input-wrapper-focused': isFocused,
    },
    className,
  );

  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  return (
    <span className={wrapperCls} style={mergedStyle}>
      <span className="soui-input-textarea-affix">
        <textarea
          ref={textareaRef}
          className="soui-input soui-input-textarea"
          disabled={disabled}
          value={valueStr}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(e) => { setIsFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); rest.onBlur?.(e); }}
          rows={autoSize ? undefined : rows}
          maxLength={maxLength}
          {...rest}
        />
        {hasClear && (
          <span
            className="soui-input-textarea-clear-icon"
            onClick={handleClear}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClear(e as any); } }}
            role="button"
            tabIndex={0}
            aria-label="清除"
          >
            <Icon name="Close" size={14} theme="outline" />
          </span>
        )}
      </span>
      {showCountNode}
    </span>
  );
});

TextArea.displayName = 'TextArea';

// ==================== Password ====================

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const {
    visibilityToggle = true,
    iconRender,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);

  const defaultIconRender = (v: boolean) =>
    v ? <Icon name="PreviewOpen" size={16} theme="outline" /> : <Icon name="PreviewClose" size={16} theme="outline" />;

  const toggleIcon = visibilityToggle ? (
    <span
      className="soui-input-password-icon"
      onClick={() => setVisible(!visible)}
      role="button"
      tabIndex={0}
      aria-label={visible ? '隐藏密码' : '显示密码'}
    >
      {iconRender ? iconRender(visible) : defaultIconRender(visible)}
    </span>
  ) : null;

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      suffix={toggleIcon}
      {...rest}
    />
  );
});

Password.displayName = 'Password';

// ==================== Search ====================

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const {
    enterButton,
    loading = false,
    onSearch,
    onChange,
    value: valueProp,
    defaultValue,
    disabled,
    ...rest
  } = props;

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const value = isControlled ? (valueProp as string) : innerValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    onChange?.(e);
  };

  const handleSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    onSearch?.(value as string, e);
  };

  const searchSuffix = enterButton ? (
    <span
      className={classNames('soui-input-search-button', { 'soui-input-search-button-loading': loading })}
      onClick={handleSearch}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSearch(e as any); } }}
      role="button"
      tabIndex={0}
    >
      {loading ? (
        <Icon name="Loading" size={16} theme="outline" />
      ) : typeof enterButton === 'boolean' ? (
        <Icon name="Search" size={16} theme="outline" />
      ) : (
        enterButton
      )}
    </span>
  ) : (
    <span
      className="soui-input-search-icon"
      onClick={handleSearch}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSearch(e as any); } }}
      role="button"
      tabIndex={0}
    >
      {loading ? (
        <Icon name="Loading" size={16} theme="outline" />
      ) : (
        <Icon name="Search" size={16} theme="outline" />
      )}
    </span>
  );

  return (
    <Input
      ref={ref}
      value={value}
      onChange={handleChange}
      suffix={searchSuffix}
      onPressEnter={handleSearch}
      disabled={disabled || loading}
      {...rest}
    />
  );
});

Search.displayName = 'Search';

// ==================== Compound Component ====================

type CompoundedComponent = typeof Input & {
  TextArea: typeof TextArea;
  Password: typeof Password;
  Search: typeof Search;
};

const InputComponent = Input as CompoundedComponent;
InputComponent.TextArea = TextArea;
InputComponent.Password = Password;
InputComponent.Search = Search;

export default InputComponent;
export { TextArea, Password, Search };
