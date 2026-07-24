import React, { useState, useRef, useContext, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Input from '../Input';
import './style.less';

// ==================== Types ====================

export interface AutoCompleteOption {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}

export type AutoCompleteOptions = (AutoCompleteOption | string)[];

export type AutoCompleteSize = 'small' | 'middle' | 'large';
export type AutoCompleteStatus = 'error' | 'warning';

export interface AutoCompleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'> {
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 选中选项回调 */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 失焦回调（Form 兼容） */
  onBlur?: (e: React.FocusEvent) => void;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent) => void;
  /** 选项数据 */
  options?: AutoCompleteOptions;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 是否本地过滤选项 */
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  /** 下拉面板自定义渲染 */
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  /** 空状态内容 */
  notFoundContent?: React.ReactNode;
  /** 尺寸 */
  size?: AutoCompleteSize;
  /** 状态 */
  status?: AutoCompleteStatus;
  /** 前缀图标 */
  prefix?: React.ReactNode;
}

// ==================== Utils ====================

const normalizeOptions = (options: AutoCompleteOptions): AutoCompleteOption[] =>
  options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));

// ==================== Component ====================

const AutoComplete: React.FC<AutoCompleteProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  onBlur,
  onFocus,
  options = [],
  placeholder,
  disabled,
  allowClear,
  filterOption = true,
  dropdownRender,
  notFoundContent = '暂无数据',
  size,
  status,
  prefix,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.AutoComplete || {}) as Record<string, any>;
  const formSize = context?.componentSize;
  const mergedSize = size || formSize || 'middle';

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined && controlledValue !== null;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 规范化选项
  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  // 过滤选项
  const filteredOptions = useMemo(() => {
    if (filterOption === false) return normalizedOptions;
    if (typeof filterOption === 'function') {
      return normalizedOptions.filter((opt) => filterOption(currentValue, opt));
    }
    // 默认本地过滤：label 或 value 包含输入值
    const lower = currentValue.toLowerCase();
    return normalizedOptions.filter((opt) => {
      const label = typeof opt.label === 'string' ? opt.label : opt.value;
      return label.toLowerCase().includes(lower);
    });
  }, [normalizedOptions, currentValue, filterOption]);

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      onSearch?.(val);
      setOpen(true);
      setActiveIndex(-1);
    },
    [isControlled, onChange, onSearch]
  );

  const handleSelect = useCallback(
    (opt: AutoCompleteOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      onSelect?.(opt.value, opt);
      setOpen(false);
    },
    [isControlled, onChange, onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || filteredOptions.length === 0) return;
      const enabledOptions = filteredOptions.filter((o) => !o.disabled);
      if (enabledOptions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % enabledOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + enabledOptions.length) % enabledOptions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < enabledOptions.length) {
          handleSelect(enabledOptions[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [open, filteredOptions, activeIndex, handleSelect]
  );

  // CSS 变量注入
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorPrimary !== undefined) cssVars['--soui-auto-complete-color-primary'] = theme.colorPrimary;
  if (theme.borderRadius !== undefined) cssVars['--soui-auto-complete-border-radius'] = `${theme.borderRadius}px`;
  if (theme.fontSize !== undefined) cssVars['--soui-auto-complete-font-size'] = `${theme.fontSize}px`;
  if (theme.dropdownBg !== undefined) cssVars['--soui-auto-complete-dropdown-bg'] = theme.dropdownBg;

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // 计算 activeIndex 在 enabledOptions 中的映射
  const enabledOptions = filteredOptions.filter((o) => !o.disabled);

  const menu = (
    <div className="soui-auto-complete-dropdown" ref={dropdownRef}>
      {filteredOptions.length > 0 ? (
        <ul className="soui-auto-complete-menu">
          {filteredOptions.map((opt, idx) => {
            const enabledIdx = enabledOptions.indexOf(opt);
            const isActive = enabledIdx === activeIndex;
            return (
              <li
                key={opt.value}
                className={classNames('soui-auto-complete-option', {
                  'soui-auto-complete-option-active': isActive,
                  'soui-auto-complete-option-disabled': opt.disabled,
                })}
                onMouseDown={(e) => {
                  e.preventDefault(); // 阻止 input blur
                  handleSelect(opt);
                }}
                onMouseEnter={() => !opt.disabled && setActiveIndex(enabledIdx)}
              >
                {opt.label ?? opt.value}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="soui-auto-complete-empty">{notFoundContent}</div>
      )}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        'soui-auto-complete',
        { 'soui-auto-complete-disabled': disabled },
        className
      )}
      style={componentStyle}
      {...rest}
    >
      <Input
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          setOpen(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        size={mergedSize}
        status={status}
        prefix={prefix}
      />
      {open && !disabled && (dropdownRender ? dropdownRender(menu) : menu)}
    </div>
  );
};

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;
