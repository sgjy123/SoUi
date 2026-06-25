import React, { useState, useRef, forwardRef, useImperativeHandle, useContext, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import { CloseSmall, Search as SearchIcon, Eyes, PreviewClose } from '@icon-park/react';
import './style.less';

// ==================== Types ====================

/** 输入框尺寸 */
export type InputSize = 'large' | 'middle' | 'small';

/** 输入框校验状态 */
export type InputStatus = 'success' | 'warning' | 'error';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 输入框校验状态 */
  status?: InputStatus;
  /** 前置标签 */
  addonBefore?: React.ReactNode;
  /** 后置标签 */
  addonAfter?: React.ReactNode;
  /** 前缀图标或内容 */
  prefix?: React.ReactNode;
  /** 后缀图标或内容 */
  suffix?: React.ReactNode;
  /** 允许清除 */
  allowClear?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 显示字符计数 */
  showCount?: boolean;
  /** 自定义字符计数格式化函数 */
  countFormatter?: (count: number, max?: number) => string;
  /** 值变化时回调 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 按下回车键时回调 */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface InputRef {
  /** 聚焦输入框 */
  focus: (options?: FocusOptions) => void;
  /** 失去焦点 */
  blur: () => void;
  /** 选择输入框内容 */
  select: () => void;
  /** 原生 input 元素 */
  nativeElement: HTMLInputElement | null;
}

// ==================== Shared Helpers ====================

function useInputTheme() {
  const context = useContext(ConfigContext);
  const inputTheme = (context?.components?.Input || {}) as Record<string, any>;
  const componentSize = context?.componentSize || 'middle';
  return { inputTheme, componentSize };
}

function buildCssVars(
  theme: Record<string, any>,
  size: string,
): React.CSSProperties & Record<string, any> {
  const vars: React.CSSProperties & Record<string, any> = {};
  if (theme.borderRadius !== undefined) vars['--soui-input-border-radius'] = `${theme.borderRadius}px`;
  if (theme.fontSize !== undefined) vars['--soui-input-font-size'] = `${theme.fontSize}px`;
  if (theme.controlHeight !== undefined) vars[`--soui-input-control-height-${size}`] = `${theme.controlHeight}px`;
  if (theme.colorBorder !== undefined) vars['--soui-input-color-border'] = theme.colorBorder;
  if (theme.colorBorderHover !== undefined) vars['--soui-input-color-border-hover'] = theme.colorBorderHover;
  if (theme.colorBorderFocus !== undefined) vars['--soui-input-color-border-focus'] = theme.colorBorderFocus;
  if (theme.colorBg !== undefined) vars['--soui-input-color-bg'] = theme.colorBg;
  if (theme.colorText !== undefined) vars['--soui-input-color-text'] = theme.colorText;
  if (theme.colorBgDisabled !== undefined) vars['--soui-input-color-bg-disabled'] = theme.colorBgDisabled;
  if (theme.colorTextDisabled !== undefined) vars['--soui-input-color-text-disabled'] = theme.colorTextDisabled;
  if (theme.colorError !== undefined) vars['--soui-input-color-error'] = theme.colorError;
  if (theme.colorWarning !== undefined) vars['--soui-input-color-warning'] = theme.colorWarning;
  if (theme.colorSuccess !== undefined) vars['--soui-input-color-success'] = theme.colorSuccess;
  if (theme.colorIcon !== undefined) vars['--soui-input-color-icon'] = theme.colorIcon;
  if (theme.colorIconHover !== undefined) vars['--soui-input-color-icon-hover'] = theme.colorIconHover;
  return vars;
}

function renderCount(
  value: string | undefined,
  maxLength: number | undefined,
  showCount: boolean,
  formatter?: (count: number, max?: number) => string,
) {
  if (!showCount) return null;
  const count = value?.length || 0;
  const display = formatter
    ? formatter(count, maxLength)
    : `${count}${maxLength !== undefined ? ` / ${maxLength}` : ''}`;
  return <span className="soui-input-count">{display}</span>;
}

// ==================== Internal Input ====================

const InternalInput = forwardRef<InputRef, InputProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      size: customSize,
      disabled = false,
      readOnly = false,
      status,
      addonBefore,
      addonAfter,
      prefix,
      suffix,
      allowClear = false,
      bordered = true,
      maxLength,
      showCount = false,
      countFormatter,
      className,
      style,
      onFocus,
      onBlur,
      onChange,
      onPressEnter,
      onKeyDown,
      type = 'text',
      ...rest
    } = props;

    const { inputTheme, componentSize } = useInputTheme();
    const size = customSize || componentSize;

    const [internalValue, setInternalValue] = useState<string>((defaultValue as string) || '');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const mergedValue = value !== undefined ? (value as string) : internalValue;
    const cssVars = { ...buildCssVars(inputTheme, size), ...style } as React.CSSProperties;

    useImperativeHandle(ref, () => ({
      focus: (options) => inputRef.current?.focus(options),
      blur: () => inputRef.current?.blur(),
      select: () => inputRef.current?.select(),
      nativeElement: inputRef.current,
    }));

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') onPressEnter?.(e);
      onKeyDown?.(e);
    };

    const handleClear = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (value === undefined) setInternalValue('');
      // 构造 synthetic event
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype, 'value',
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      const event = new Event('input', { bubbles: true });
      inputRef.current?.dispatchEvent(event);
      // React synthetic change event
      const reactEvent = {
        target: { value: '' },
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(reactEvent);
      inputRef.current?.focus();
    };

    const hasValue = mergedValue && mergedValue.length > 0;

    // 后缀区域：清除按钮 + 用户 suffix
    const suffixNode = (
      <>
        {allowClear && hasValue && !disabled && !readOnly && (
          <span className="soui-input-clear-icon" onClick={handleClear} role="button" aria-label="清除" tabIndex={-1}>
            <CloseSmall theme="filled" size={14} />
          </span>
        )}
        {suffix}
        {renderCount(mergedValue, maxLength, showCount, countFormatter)}
      </>
    );
    const hasSuffix = allowClear || suffix || showCount;

    const inputNode = (
      <div
        className={classNames('soui-input', {
          [`soui-input-${size}`]: size,
          'soui-input-disabled': disabled,
          'soui-input-readonly': readOnly,
          'soui-input-focused': isFocused,
          'soui-input-borderless': !bordered,
          [`soui-input-status-${status}`]: !!status,
          'soui-input-with-addon-before': !!addonBefore,
          'soui-input-with-addon-after': !!addonAfter,
        }, className)}
        style={cssVars}
      >
        {prefix && <span className="soui-input-prefix">{prefix}</span>}
        <input
          ref={inputRef}
          className="soui-input-inner"
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          value={mergedValue}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        {hasSuffix && <span className="soui-input-suffix">{suffixNode}</span>}
      </div>
    );

    // addon 组合模式
    if (addonBefore || addonAfter) {
      return (
        <div className={classNames('soui-input-group-wrapper', {
          'soui-input-group-wrapper-disabled': disabled,
        })}>
          {addonBefore && (
            <div className="soui-input-addon soui-input-addon-before">{addonBefore}</div>
          )}
          {inputNode}
          {addonAfter && (
            <div className="soui-input-addon soui-input-addon-after">{addonAfter}</div>
          )}
        </div>
      );
    }

    return inputNode;
  },
);

InternalInput.displayName = 'Input';

// ==================== Password ====================

export interface PasswordProps extends Omit<InputProps, 'type' | 'suffix'> {
  /** 自定义切换按钮 */
  iconRender?: (visible: boolean) => React.ReactNode;
  /** 是否显示切换按钮 */
  visibilityToggle?: boolean;
}

export interface PasswordRef extends InputRef {}

const InternalPassword = forwardRef<PasswordRef, PasswordProps>(
  ({ iconRender, visibilityToggle = true, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      setVisible((v) => !v);
    };

    const eyeIcon = iconRender
      ? iconRender(visible)
      : (
        <span className="soui-input-password-icon" onClick={toggleVisibility} role="button" aria-label={visible ? '隐藏密码' : '显示密码'} tabIndex={-1}>
          {visible
            ? <Eyes theme="outline" size={16} />
            : <PreviewClose theme="outline" size={16} />
          }
        </span>
      );

    return (
      <InternalInput
        ref={ref}
        type={visible ? 'text' : 'password'}
        suffix={visibilityToggle ? eyeIcon : undefined}
        {...rest}
      />
    );
  },
);

InternalPassword.displayName = 'Password';

// ==================== Search ====================

export interface SearchProps extends Omit<InputProps, 'suffix' | 'addonAfter'> {
  /** 搜索按钮内容（自定义） */
  enterButton?: React.ReactNode;
  /** 点击搜索或按回车时回调 */
  onSearch?: (value: string, event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => void;
  /** 搜索加载状态 */
  loading?: boolean;
}

export interface SearchRef extends InputRef {}

const InternalSearch = forwardRef<SearchRef, SearchProps>(
  ({ enterButton, onSearch, loading, className, ...rest }, ref) => {
    const inputRef = useRef<InputRef>(null);

    // 转发 ref
    useImperativeHandle(ref, () => ({
      focus: (options) => inputRef.current?.focus(options),
      blur: () => inputRef.current?.blur(),
      select: () => inputRef.current?.select(),
      nativeElement: inputRef.current?.nativeElement || null,
    }));

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
      const val = (inputRef.current?.nativeElement as HTMLInputElement)?.value || '';
      onSearch?.(val, e);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') handleSearch(e);
      rest.onKeyDown?.(e);
    };

    // 带按钮模式
    if (enterButton) {
      return (
        <InternalInput
          ref={inputRef}
          className={classNames('soui-input-search', className)}
          suffix={null as any}
          addonAfter={
            <span
              className={classNames('soui-input-search-button', { 'soui-input-search-button-loading': loading })}
              onClick={handleSearch}
              role="button"
              aria-label="搜索"
            >
              <SearchIcon theme="outline" size={16} />
              {typeof enterButton !== 'boolean' && enterButton}
            </span>
          }
          {...rest}
          onKeyDown={handleKeyDown}
        />
      );
    }

    // 普通搜索模式（带搜索图标前缀）
    return (
      <InternalInput
        ref={inputRef}
        className={classNames('soui-input-search', className)}
        prefix={<SearchIcon theme="outline" size={16} />}
        {...rest}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

InternalSearch.displayName = 'Search';

// ==================== TextArea ====================

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** 输入框校验状态 */
  status?: InputStatus;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 自适应高度 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 显示字符计数 */
  showCount?: boolean;
  /** 自定义字符计数格式化函数 */
  countFormatter?: (count: number, max?: number) => string;
  /** 值变化时回调 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface TextAreaRef {
  focus: (options?: FocusOptions) => void;
  blur: () => void;
  nativeElement: HTMLTextAreaElement | null;
}

const InternalTextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      status,
      bordered = true,
      autoSize,
      showCount = false,
      countFormatter,
      maxLength,
      className,
      style,
      onChange,
      rows = 4,
      ...rest
    } = props;

    const { inputTheme } = useInputTheme();
    const [internalValue, setInternalValue] = useState<string>((defaultValue as string) || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const mergedValue = value !== undefined ? (value as string) : internalValue;
    const cssVars: React.CSSProperties & Record<string, any> = {};
    if (inputTheme.borderRadius !== undefined) cssVars['--soui-input-border-radius'] = `${inputTheme.borderRadius}px`;
    if (inputTheme.fontSize !== undefined) cssVars['--soui-input-font-size'] = `${inputTheme.fontSize}px`;
    if (inputTheme.colorBorder !== undefined) cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
    if (inputTheme.colorBorderHover !== undefined) cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
    if (inputTheme.colorBorderFocus !== undefined) cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
    if (inputTheme.colorBg !== undefined) cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
    if (inputTheme.colorText !== undefined) cssVars['--soui-input-color-text'] = inputTheme.colorText;
    if (inputTheme.colorBgDisabled !== undefined) cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
    if (inputTheme.colorTextDisabled !== undefined) cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;

    const mergedStyle = { ...cssVars, ...style } as React.CSSProperties;

    useImperativeHandle(ref, () => ({
      focus: (options) => textareaRef.current?.focus(options),
      blur: () => textareaRef.current?.blur(),
      nativeElement: textareaRef.current,
    }));

    // autoSize 高度计算
    const calcAutoHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoSize) return;

      // 重置高度以获取正确的 scrollHeight
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      if (typeof autoSize === 'object') {
        const { minRows, maxRows } = autoSize;
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(computedStyle.lineHeight) || 22;
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const borderTop = parseFloat(computedStyle.borderTopWidth);
        const borderBottom = parseFloat(computedStyle.borderBottomWidth);
        const contentHeight = scrollHeight - paddingTop - paddingBottom;
        const minHeight = minRows ? minRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom : undefined;
        const maxHeight = maxRows ? maxRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom : undefined;

        let height = contentHeight + paddingTop + paddingBottom + borderTop + borderBottom;
        if (minHeight && height < minHeight) height = minHeight;
        if (maxHeight && height > maxHeight) height = maxHeight;
        textarea.style.height = `${height}px`;
        textarea.style.overflowY = maxHeight && contentHeight + paddingTop + paddingBottom > maxHeight ? 'auto' : 'hidden';
      } else {
        textarea.style.height = `${scrollHeight}px`;
      }
    }, [autoSize]);

    useEffect(() => {
      calcAutoHeight();
    }, [mergedValue, calcAutoHeight]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const textareaClassName = classNames(
      'soui-textarea',
      {
        'soui-textarea-disabled': disabled,
        'soui-textarea-readonly': readOnly,
        'soui-textarea-borderless': !bordered,
        'soui-textarea-auto-size': !!autoSize,
        [`soui-textarea-status-${status}`]: !!status,
      },
      className,
    );

    return (
      <div className="soui-textarea-wrapper">
        <textarea
          ref={textareaRef}
          className={textareaClassName}
          style={mergedStyle}
          disabled={disabled}
          readOnly={readOnly}
          value={mergedValue}
          maxLength={maxLength}
          rows={autoSize ? undefined : rows}
          onChange={handleChange}
          {...rest}
        />
        {showCount && (
          <span className="soui-textarea-count">
            {countFormatter
              ? countFormatter(mergedValue?.length || 0, maxLength)
              : `${mergedValue?.length || 0}${maxLength !== undefined ? ` / ${maxLength}` : ''}`
            }
          </span>
        )}
      </div>
    );
  },
);

InternalTextArea.displayName = 'TextArea';

// ==================== Compound Component ====================

type CompoundedComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  Password: React.ForwardRefExoticComponent<
    PasswordProps & React.RefAttributes<PasswordRef>
  >;
  Search: React.ForwardRefExoticComponent<
    SearchProps & React.RefAttributes<SearchRef>
  >;
  TextArea: React.ForwardRefExoticComponent<
    TextAreaProps & React.RefAttributes<TextAreaRef>
  >;
};

const Input = InternalInput as CompoundedComponent;
Input.Password = InternalPassword;
Input.Search = InternalSearch;
Input.TextArea = InternalTextArea;

export default Input;
export type { PasswordProps as InputPasswordProps, SearchProps as InputSearchProps, TextAreaProps as InputTextAreaProps };
