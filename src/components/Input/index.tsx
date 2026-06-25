import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type InputSize = 'large' | 'middle' | 'small';
export type InputStatus = 'error' | 'warning' | 'success';

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
  /** 前缀内容 */
  prefix?: React.ReactNode;
  /** 后缀内容 */
  suffix?: React.ReactNode;
  /** 前置标签 */
  addonBefore?: React.ReactNode;
  /** 后置标签 */
  addonAfter?: React.ReactNode;
  /** 是否允许清空 */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计 */
  showCount?: boolean | ((count: number, maxLength: number | undefined) => React.ReactNode);
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
  showCount?: boolean | ((count: number, maxLength: number | undefined) => React.ReactNode);
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

export interface PasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  /** 是否显示切换按钮 */
  visibilityToggle?: boolean;
  /** 自定义图标渲染 */
  iconRender?: (visible: boolean) => React.ReactNode;
}

export interface SearchProps extends Omit<InputProps, 'suffix'> {
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

function buildInputCssVars(inputTheme: Record<string, any>, globalTheme: Record<string, any>): Record<string, any> {
  const cssVars: Record<string, any> = {};
  const borderRadiusValue = inputTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = inputTheme?.fontSize || globalTheme?.fontSize;
  const controlHeightValue = inputTheme?.controlHeight || globalTheme?.controlHeight;
  if (borderRadiusValue !== undefined) cssVars['--soui-input-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-input-font-size'] = `${fontSizeValue}px`;
  if (controlHeightValue !== undefined) {
    cssVars['--soui-input-control-height-small'] = `${controlHeightValue - 8}px`;
    cssVars['--soui-input-control-height-middle'] = `${controlHeightValue}px`;
    cssVars['--soui-input-control-height-large'] = `${controlHeightValue + 8}px`;
  }
  if (inputTheme?.colorBorder) cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
  if (inputTheme?.colorBorderHover) cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
  if (inputTheme?.colorBorderFocus) cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
  if (inputTheme?.colorBg) cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
  if (inputTheme?.colorText) cssVars['--soui-input-color-text'] = inputTheme.colorText;
  if (inputTheme?.colorBgDisabled) cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
  if (inputTheme?.colorTextDisabled) cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;
  if (inputTheme?.colorError) cssVars['--soui-input-color-error'] = inputTheme.colorError;
  if (inputTheme?.colorWarning) cssVars['--soui-input-color-warning'] = inputTheme.colorWarning;
  if (inputTheme?.colorSuccess) cssVars['--soui-input-color-success'] = inputTheme.colorSuccess;
  if (inputTheme?.colorIcon) cssVars['--soui-input-color-icon'] = inputTheme.colorIcon;
  if (inputTheme?.colorIconHover) cssVars['--soui-input-color-icon-hover'] = inputTheme.colorIconHover;
  if (inputTheme?.colorAddonBg) cssVars['--soui-input-color-addon-bg'] = inputTheme.colorAddonBg;
  if (inputTheme?.colorAddonText) cssVars['--soui-input-color-addon-text'] = inputTheme.colorAddonText;
  return cssVars;
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

  const hasClear = !!allowClear && !!valueStr && !disabled && !readOnly;
  const clearIcon = resolveClearIcon(allowClear);
  const isBordered = bordered && !borderless;

  const cssVars = buildInputCssVars(inputTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isControlled) setInnerValue('');
    onClear?.();
    // 直接调用 onChange 回调，不使用原生 DOM API
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: inputRef.current,
      preventDefault: () => {},
      stopPropagation: () => {},
      nativeEvent: new Event('input'),
      type: 'change',
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onPressEnter?.(e);
    onKeyDown?.(e);
  };

  // ---- count (inside suffix area) ----
  const actualCount = valueStr.length;
  const showCountNode = showCount ? (
    <span className="soui-input-count">
      {typeof showCount === 'function'
        ? showCount(actualCount, maxLength)
        : maxLength !== undefined
          ? `${actualCount} / ${maxLength}`
          : `${actualCount}`}
    </span>
  ) : null;

  // ---- wrapper classes ----
  const wrapperCls = classNames(
    'soui-input-wrapper',
    `soui-input-wrapper-${mergedSize}`,
    {
      'soui-input-wrapper-disabled': disabled,
      'soui-input-wrapper-readonly': readOnly,
      'soui-input-wrapper-focused': isFocused,
      'soui-input-wrapper-hovered': isHovered && !disabled && !readOnly,
      'soui-input-wrapper-has-prefix': !!prefix,
      'soui-input-wrapper-has-suffix': !!suffix || hasClear || !!showCountNode,
      'soui-input-wrapper-has-addon-before': !!addonBefore,
      'soui-input-wrapper-has-addon-after': !!addonAfter,
      'soui-input-wrapper-borderless': !isBordered,
      'soui-input-wrapper-bordered': isBordered,
      [`soui-input-wrapper-status-${status}`]: !!status && !disabled,
    },
    className,
  );

  const inputCls = classNames('soui-input', {
    'soui-input-disabled': disabled,
    'soui-input-readonly': readOnly,
  });

  // ---- affix wrapper ----
  const affixWrapperCls = classNames('soui-input-affix-wrapper', {
    'soui-input-affix-wrapper-borderless': !isBordered,
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
        {showCountNode}
      </span>
    </span>
  );

  // ---- container with addons (不要添加 wrapperCls，避免 flex-direction: column 干扰水平布局) ----
  if (addonBefore || addonAfter) {
    return (
      <span className="soui-input-addon-wrapper" style={mergedStyle}>
        {addonBefore && <span className="soui-input-addon-before">{addonBefore}</span>}
        <span className={wrapperCls}>
          {renderInput}
        </span>
        {addonAfter && <span className="soui-input-addon-after">{addonAfter}</span>}
      </span>
    );
  }

  return (
    <span className={wrapperCls} style={mergedStyle}>
      {renderInput}
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
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current!);

  const hasClear = !!allowClear && !!valueStr && !disabled;
  const cssVars = buildInputCssVars(inputTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Auto size - 正确计算高度（包含 padding 和 border）
  useEffect(() => {
    if (autoSize && textareaRef.current) {
      const el = textareaRef.current;
      const computedStyle = getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 22;
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
      const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
      const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;

      // 重置高度以获取正确的 scrollHeight
      el.style.height = 'auto';
      const scrollHeight = el.scrollHeight;

      if (typeof autoSize === 'object') {
        const { minRows, maxRows } = autoSize;
        const paddingHeight = paddingTop + paddingBottom;
        const borderHeight = borderTop + borderBottom;

        const minHeight = minRows ? minRows * lineHeight + paddingHeight + borderHeight : undefined;
        const maxHeight = maxRows ? maxRows * lineHeight + paddingHeight + borderHeight : undefined;

        let height = scrollHeight;
        if (minHeight && height < minHeight) height = minHeight;
        if (maxHeight && height > maxHeight) height = maxHeight;

        el.style.height = `${height}px`;
        el.style.overflowY = maxHeight && scrollHeight > maxHeight ? 'auto' : 'hidden';
      } else {
        el.style.height = `${scrollHeight}px`;
        el.style.overflowY = 'hidden';
      }
    }
  }, [valueStr, autoSize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isControlled) setInnerValue('');
    onClear?.();
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: textareaRef.current,
      preventDefault: () => {},
      stopPropagation: () => {},
      nativeEvent: new Event('input'),
      type: 'change',
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onChange?.(syntheticEvent);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') onPressEnter?.(e);
    onKeyDown?.(e);
  };

  // ---- count ----
  const actualCount = valueStr.length;
  const showCountNode = showCount ? (
    <span className="soui-input-textarea-count">
      {typeof showCount === 'function'
        ? showCount(actualCount, maxLength)
        : maxLength !== undefined
          ? `${actualCount} / ${maxLength}`
          : `${actualCount}`}
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
      'soui-input-wrapper-hovered': isHovered && !disabled,
    },
    className,
  );

  return (
    <span className={wrapperCls} style={mergedStyle}>
      <span
        className="soui-input-textarea-affix"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
        {showCountNode}
      </span>
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
      {...rest}
      type={visible ? 'text' : 'password'}
      suffix={toggleIcon}
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
    if (loading) return;
    onSearch?.(value as string, e);
  };

  // 有 enterButton 时：按钮作为 addonAfter 渲染（与 Ant Design 一致）
  if (enterButton) {
    const buttonNode = (
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
          <>
            <Icon name="Search" size={16} theme="outline" />
            <span>{enterButton}</span>
          </>
        )}
      </span>
    );

    return (
      <Input
        ref={ref}
        value={value}
        onChange={handleChange}
        addonAfter={buttonNode}
        onPressEnter={handleSearch}
        disabled={disabled}
        {...rest}
      />
    );
  }

  // 无 enterButton 时：搜索图标作为 suffix 渲染
  const searchIcon = (
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
      suffix={searchIcon}
      onPressEnter={handleSearch}
      disabled={disabled}
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
