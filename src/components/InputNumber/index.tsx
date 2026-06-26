import React, { useState, useRef, useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type InputNumberSize = 'large' | 'middle' | 'small';
export type InputNumberStatus = 'error' | 'warning';

export interface InputNumberProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'prefix'> {
  /** 当前值 */
  value?: number | null;
  /** 默认值 */
  defaultValue?: number | null;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步进 */
  step?: number;
  /** 精度（小数位数） */
  precision?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 尺寸 */
  size?: InputNumberSize;
  /** 状态 */
  status?: InputNumberStatus;
  /** 是否显示加减按钮 */
  controls?: boolean;
  /** 前缀内容 */
  prefix?: React.ReactNode;
  /** 前置标签 */
  addonBefore?: React.ReactNode;
  /** 后置标签 */
  addonAfter?: React.ReactNode;
  /** 是否启用键盘上下键控制 */
  keyboard?: boolean;
  /** 格式化显示值 */
  formatter?: (value: number | string | undefined) => string;
  /** 解析格式化后的值 */
  parser?: (displayValue: string | undefined) => number;
  /** 值变化回调 */
  onChange?: (value: number | null) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 回车回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 占位文字 */
  placeholder?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Helpers ====================

function clampValue(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function toPrecision(val: number, precision: number): number {
  return parseFloat(val.toFixed(precision));
}

function isValidNumber(str: string): boolean {
  return /^-?\d*\.?\d*$/.test(str);
}

// ==================== Component ====================

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(({
  value: valueProp,
  defaultValue = null,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  disabled = false,
  readOnly = false,
  size = 'middle',
  status,
  controls = true,
  prefix,
  addonBefore,
  addonAfter,
  keyboard = true,
  formatter,
  parser,
  onChange,
  onBlur,
  onFocus,
  onPressEnter,
  placeholder,
  className,
  style,
  ...rest
}, ref) => {
  // Theme
  const context = useContext(ConfigContext);
  const inputNumberTheme = (context?.components?.InputNumber || {}) as Record<string, any>;

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (inputNumberTheme.borderRadius !== undefined) {
    cssVars['--soui-input-number-border-radius'] = `${inputNumberTheme.borderRadius}px`;
  }
  if (inputNumberTheme.fontSize !== undefined) {
    cssVars['--soui-input-number-font-size'] = `${inputNumberTheme.fontSize}px`;
  }
  if (inputNumberTheme.controlHeight !== undefined) {
    cssVars['--soui-input-number-control-height'] = `${inputNumberTheme.controlHeight}px`;
  }
  if (inputNumberTheme.colorBorder !== undefined) {
    cssVars['--soui-input-number-color-border'] = inputNumberTheme.colorBorder;
  }
  if (inputNumberTheme.colorBg !== undefined) {
    cssVars['--soui-input-number-color-bg'] = inputNumberTheme.colorBg;
  }
  if (inputNumberTheme.colorText !== undefined) {
    cssVars['--soui-input-number-color-text'] = inputNumberTheme.colorText;
  }
  if (inputNumberTheme.colorPrimary !== undefined) {
    cssVars['--soui-input-number-color-primary'] = inputNumberTheme.colorPrimary;
  }
  if (inputNumberTheme.colorError !== undefined) {
    cssVars['--soui-input-number-color-error'] = inputNumberTheme.colorError;
  }
  if (inputNumberTheme.colorWarning !== undefined) {
    cssVars['--soui-input-number-color-warning'] = inputNumberTheme.colorWarning;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // State
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<number | null>(defaultValue);
  const currentValue = isControlled ? (valueProp ?? null) : innerValue;

  const [inputStr, setInputStr] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = ref || inputRef;

  // Sync input string with value when not editing
  useEffect(() => {
    if (!focused) {
      if (currentValue !== null && currentValue !== undefined) {
        const displayVal = precision !== undefined ? toPrecision(currentValue, precision) : currentValue;
        setInputStr(formatter ? formatter(displayVal) : String(displayVal));
      } else {
        setInputStr('');
      }
    }
  }, [currentValue, focused, precision, formatter]);

  const updateValue = useCallback((newVal: number | null) => {
    if (newVal !== null) {
      newVal = clampValue(newVal, min, max);
      if (precision !== undefined) {
        newVal = toPrecision(newVal, precision);
      }
    }
    if (!isControlled) setInnerValue(newVal);
    onChange?.(newVal);
  }, [isControlled, min, max, precision, onChange]);

  const handleStep = useCallback((direction: 1 | -1) => {
    if (disabled || readOnly) return;
    const base = currentValue ?? 0;
    const newVal = base + step * direction;
    updateValue(newVal);
  }, [disabled, readOnly, currentValue, step, updateValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (parser) {
      setInputStr(raw);
      return;
    }
    if (raw === '' || raw === '-') {
      setInputStr(raw);
      return;
    }
    if (isValidNumber(raw)) {
      setInputStr(raw);
    }
  };

  const commitInput = () => {
    if (inputStr === '' || inputStr === '-') {
      updateValue(null);
      setInputStr('');
      return;
    }
    const parsed = parser ? parser(inputStr) : parseFloat(inputStr);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    } else {
      // Revert to current value
      if (currentValue !== null) {
        const displayVal = precision !== undefined ? toPrecision(currentValue, precision) : currentValue;
        setInputStr(formatter ? formatter(displayVal) : String(displayVal));
      } else {
        setInputStr('');
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    commitInput();
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitInput();
      onPressEnter?.(e);
    }
    if (keyboard && e.key === 'ArrowUp') {
      e.preventDefault();
      handleStep(1);
    }
    if (keyboard && e.key === 'ArrowDown') {
      e.preventDefault();
      handleStep(-1);
    }
  };

  const isAtMin = currentValue !== null && currentValue <= min;
  const isAtMax = currentValue !== null && currentValue >= max;

  // Class names
  const wrapperCls = classNames(
    'soui-input-number-wrapper',
    `soui-input-number-${size}`,
    {
      'soui-input-number-disabled': disabled,
      'soui-input-number-readonly': readOnly,
      'soui-input-number-focused': focused,
      'soui-input-number-hovered': hovered && !disabled,
      'soui-input-number-has-prefix': !!prefix,
      [`soui-input-number-status-${status}`]: !!status,
    },
    className,
  );

  const addonWrapperCls = classNames('soui-input-number-addon-wrapper', {
    'soui-input-number-has-addon': !!(addonBefore || addonAfter),
  });

  const content = (
    <div
      className={wrapperCls}
      style={componentStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {prefix && <span className="soui-input-number-prefix">{prefix}</span>}
      <input
        ref={mergedRef as React.Ref<HTMLInputElement>}
        className="soui-input-number-input"
        type="text"
        inputMode="decimal"
        value={inputStr}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        aria-valuemin={min === -Infinity ? undefined : min}
        aria-valuemax={max === Infinity ? undefined : max}
        aria-valuenow={currentValue ?? undefined}
        role="spinbutton"
      />
      {controls && !readOnly && (
        <span className="soui-input-number-controls">
          <button
            type="button"
            className={classNames('soui-input-number-control-up', {
              'soui-input-number-control-disabled': disabled || isAtMax,
            })}
            disabled={disabled || isAtMax || false}
            tabIndex={-1}
            aria-label="增加"
            onClick={() => handleStep(1)}
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 371.7l-332.8 332.8c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l355.5-355.5c12.5-12.5 32.8-12.5 45.3 0l355.5 355.5c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L512 371.7z" />
            </svg>
          </button>
          <button
            type="button"
            className={classNames('soui-input-number-control-down', {
              'soui-input-number-control-disabled': disabled || isAtMin,
            })}
            disabled={disabled || isAtMin || false}
            tabIndex={-1}
            aria-label="减少"
            onClick={() => handleStep(-1)}
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 652.3l332.8-332.8c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L534.6 720.3c-12.5 12.5-32.8 12.5-45.3 0L133.8 364.8c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L512 652.3z" />
            </svg>
          </button>
        </span>
      )}
    </div>
  );

  if (addonBefore || addonAfter) {
    return (
      <div className={addonWrapperCls}>
        {addonBefore && <span className="soui-input-number-addon-before">{addonBefore}</span>}
        {content}
        {addonAfter && <span className="soui-input-number-addon-after">{addonAfter}</span>}
      </div>
    );
  }

  return content;
});

InputNumber.displayName = 'InputNumber';

export default InputNumber;
