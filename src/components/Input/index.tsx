import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { useComponentTheme, useComponentSize } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

/** 输入框尺寸 */
export type InputSize = 'large' | 'middle' | 'small';

/** 输入框状态 */
export type InputStatus = 'success' | 'warning' | 'error';

/** 密码可见性切换图标位置 */
export type PasswordIconPosition = 'left' | 'right';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 禁用状态 */
  disabled?: boolean;
  /** 只读状态 */
  readOnly?: boolean;
  /** 输入框状态 */
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
  /** 最大长度 */
  maxLength?: number;
  /** 显示字符计数 */
  showCount?: boolean;
  /** 自定义字符计数格式化函数 */
  countFormatter?: (count: number, max?: number) => string;
  /** 获取焦点时回调 */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** 失去焦点时回调 */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** 值变化时回调 */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** 按下回车键时回调 */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 键盘事件回调 */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
}

export interface InputRef {
  /** 聚焦输入框 */
  focus: () => void;
  /** 选择输入框内容 */
  select: () => void;
  /** 原生 input 元素 */
  nativeElement: HTMLInputElement | null;
}

// ==================== Component ====================

const InternalInput = forwardRef<InputRef, InputProps>(
  (
    {
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
      ...rest
    },
    ref
  ) => {
    // 从 ConfigContext 读取主题和尺寸配置
    const inputTheme = useComponentTheme('Input');
    const contextSize = useComponentSize();
    const size = customSize || contextSize || 'middle';

    // 内部状态
    const [internalValue, setInternalValue] = useState<string>(defaultValue as string || '');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // 合并受控和非受控值
    const mergedValue = value !== undefined ? (value as string) : internalValue;

    // 将主题配置注入为 CSS 变量
    const cssVars: React.CSSProperties & Record<string, any> = {};
    
    if (inputTheme?.borderRadius !== undefined) {
      cssVars['--soui-input-border-radius'] = `${inputTheme.borderRadius}px`;
    }
    if (inputTheme?.fontSize !== undefined) {
      cssVars['--soui-input-font-size'] = `${inputTheme.fontSize}px`;
    }
    if (inputTheme?.controlHeight !== undefined) {
      cssVars[`--soui-input-control-height-${size}`] = `${inputTheme.controlHeight}px`;
    }
    if (inputTheme?.colorBorder !== undefined) {
      cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
    }
    if (inputTheme?.colorBorderHover !== undefined) {
      cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
    }
    if (inputTheme?.colorBorderFocus !== undefined) {
      cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
    }
    if (inputTheme?.colorBg !== undefined) {
      cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
    }
    if (inputTheme?.colorText !== undefined) {
      cssVars['--soui-input-color-text'] = inputTheme.colorText;
    }
    if (inputTheme?.colorBgDisabled !== undefined) {
      cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
    }
    if (inputTheme?.colorTextDisabled !== undefined) {
      cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;
    }
    if (inputTheme?.colorError !== undefined) {
      cssVars['--soui-input-color-error'] = inputTheme.colorError;
    }
    if (inputTheme?.colorWarning !== undefined) {
      cssVars['--soui-input-color-warning'] = inputTheme.colorWarning;
    }
    if (inputTheme?.colorSuccess !== undefined) {
      cssVars['--soui-input-color-success'] = inputTheme.colorSuccess;
    }
    if (inputTheme?.colorIcon !== undefined) {
      cssVars['--soui-input-color-icon'] = inputTheme.colorIcon;
    }
    if (inputTheme?.colorIconHover !== undefined) {
      cssVars['--soui-input-color-icon-hover'] = inputTheme.colorIconHover;
    }

    const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      select: () => {
        inputRef.current?.select();
      },
      nativeElement: inputRef.current,
    }));

    // 处理聚焦
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    // 处理失焦
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // 处理值变化
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const newValue = e.target.value;
      
      // 如果设置了 maxLength，限制输入长度
      if (maxLength !== undefined && newValue.length > maxLength) {
        return;
      }
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    // 处理按键
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') {
        onPressEnter?.(e);
      }
      onKeyDown?.(e);
    };

    // 处理清除
    const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (value === undefined) {
        setInternalValue('');
      }
      
      // 触发 change 事件
      const event = {
        target: { value: '' },
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
      
      // 聚焦输入框
      inputRef.current?.focus();
    };

    // 计算字符数
    const charCount = mergedValue?.length || 0;
    const displayCount = countFormatter 
      ? countFormatter(charCount, maxLength)
      : `${charCount}${maxLength !== undefined ? ` / ${maxLength}` : ''}`;

    // 构建类名
    const inputClassName = classNames(
      'soui-input',
      {
        [`soui-input-${size}`]: size,
        'soui-input-disabled': disabled,
        'soui-input-readonly': readOnly,
        'soui-input-focused': isFocused,
        'soui-input-with-prefix': !!prefix,
        'soui-input-with-suffix': !!suffix || allowClear,
        'soui-input-with-addon-before': !!addonBefore,
        'soui-input-with-addon-after': !!addonAfter,
        'soui-input-bordered': bordered,
        [`soui-input-status-${status}`]: status,
      },
      className
    );

    // 渲染输入框主体
    const renderInput = () => (
      <div className={inputClassName} style={componentStyle}>
        {/* 前缀 */}
        {prefix && <span className="soui-input-prefix">{prefix}</span>}
        
        {/* 输入框 */}
        <input
          ref={inputRef}
          className="soui-input-inner"
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
        
        {/* 清除按钮 */}
        {allowClear && mergedValue && !disabled && !readOnly && (
          <span
            className="soui-input-clear-icon"
            onClick={handleClear}
            role="button"
            aria-label="清除"
          >
            ×
          </span>
        )}
        
        {/* 后缀 */}
        {suffix && <span className="soui-input-suffix">{suffix}</span>}
        
        {/* 字符计数 */}
        {showCount && (
          <span className="soui-input-count">
            {displayCount}
          </span>
        )}
      </div>
    );

    // 如果有 addonBefore 或 addonAfter，使用组合结构
    if (addonBefore || addonAfter) {
      return (
        <div
          className={classNames('soui-input-group', {
            'soui-input-group-disabled': disabled,
          })}
        >
          {addonBefore && <div className="soui-input-addon soui-input-addon-before">{addonBefore}</div>}
          {renderInput()}
          {addonAfter && <div className="soui-input-addon soui-input-addon-after">{addonAfter}</div>}
        </div>
      );
    }

    return renderInput();
  }
);

InternalInput.displayName = 'Input';

// ==================== TextArea ====================

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** 输入框状态 */
  status?: InputStatus;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 允许自适应高度 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 显示字符计数 */
  showCount?: boolean;
  /** 自定义字符计数格式化函数 */
  countFormatter?: (count: number, max?: number) => string;
  /** 值变化时回调 */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
}

export interface TextAreaRef {
  focus: () => void;
  nativeElement: HTMLTextAreaElement | null;
}

const InternalTextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
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
      ...rest
    },
    ref
  ) => {
    const inputTheme = useComponentTheme('Input');
    const [internalValue, setInternalValue] = useState<string>(defaultValue as string || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const mergedValue = value !== undefined ? (value as string) : internalValue;

    const cssVars: React.CSSProperties & Record<string, any> = {};
    if (inputTheme?.borderRadius !== undefined) {
      cssVars['--soui-input-border-radius'] = `${inputTheme.borderRadius}px`;
    }
    if (inputTheme?.fontSize !== undefined) {
      cssVars['--soui-input-font-size'] = `${inputTheme.fontSize}px`;
    }
    if (inputTheme?.colorBorder !== undefined) {
      cssVars['--soui-input-color-border'] = inputTheme.colorBorder;
    }
    if (inputTheme?.colorBorderHover !== undefined) {
      cssVars['--soui-input-color-border-hover'] = inputTheme.colorBorderHover;
    }
    if (inputTheme?.colorBorderFocus !== undefined) {
      cssVars['--soui-input-color-border-focus'] = inputTheme.colorBorderFocus;
    }
    if (inputTheme?.colorBg !== undefined) {
      cssVars['--soui-input-color-bg'] = inputTheme.colorBg;
    }
    if (inputTheme?.colorText !== undefined) {
      cssVars['--soui-input-color-text'] = inputTheme.colorText;
    }
    if (inputTheme?.colorBgDisabled !== undefined) {
      cssVars['--soui-input-color-bg-disabled'] = inputTheme.colorBgDisabled;
    }
    if (inputTheme?.colorTextDisabled !== undefined) {
      cssVars['--soui-input-color-text-disabled'] = inputTheme.colorTextDisabled;
    }
    if (inputTheme?.colorError !== undefined) {
      cssVars['--soui-input-color-error'] = inputTheme.colorError;
    }
    if (inputTheme?.colorWarning !== undefined) {
      cssVars['--soui-input-color-warning'] = inputTheme.colorWarning;
    }
    if (inputTheme?.colorSuccess !== undefined) {
      cssVars['--soui-input-color-success'] = inputTheme.colorSuccess;
    }

    const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      nativeElement: textareaRef.current,
    }));

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const newValue = e.target.value;
      if (maxLength !== undefined && newValue.length > maxLength) return;
      if (value === undefined) setInternalValue(newValue);
      onChange?.(e);
    };

    const charCount = mergedValue?.length || 0;
    const displayCount = countFormatter
      ? countFormatter(charCount, maxLength)
      : `${charCount}${maxLength !== undefined ? ` / ${maxLength}` : ''}`;

    const textareaClassName = classNames(
      'soui-textarea',
      {
        'soui-textarea-disabled': disabled,
        'soui-textarea-readonly': readOnly,
        'soui-textarea-bordered': bordered,
        [`soui-textarea-status-${status}`]: status,
      },
      className
    );

    return (
      <div className="soui-textarea-wrapper">
        <textarea
          ref={textareaRef}
          className={textareaClassName}
          style={componentStyle}
          disabled={disabled}
          readOnly={readOnly}
          value={mergedValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...rest}
        />
        {showCount && (
          <span className="soui-textarea-count">{displayCount}</span>
        )}
      </div>
    );
  }
);

InternalTextArea.displayName = 'TextArea';

// ==================== Compound Component ====================

type CompoundedComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  TextArea: React.ForwardRefExoticComponent<
    TextAreaProps & React.RefAttributes<TextAreaRef>
  >;
};

const Input = InternalInput as CompoundedComponent;
Input.TextArea = InternalTextArea;

export default Input;
export type { TextAreaProps as InputTextAreaProps };
