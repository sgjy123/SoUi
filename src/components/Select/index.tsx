import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type SelectSize = 'large' | 'middle' | 'small';
export type SelectStatus = 'error' | 'warning';
export type SelectMode = 'multiple' | 'tags';

export interface OptionType {
  /** 选项显示文本 */
  label: React.ReactNode;
  /** 选项值 */
  value: string;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'placeholder'> {
  /** 指定选中的值 */
  value?: string | string[];
  /** 默认选中的值 */
  defaultValue?: string | string[];
  /** 选中值变化回调 */
  onChange?: (value: string | string[], option?: OptionType | OptionType[]) => void;
  /** 选择模式：multiple 多选，tags 标签 */
  mode?: SelectMode;
  /** 占位文本 */
  placeholder?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 加载中状态 */
  loading?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否启用搜索 */
  showSearch?: boolean;
  /** 搜索过滤函数，为 false 时不执行本地过滤 */
  filterOption?: boolean | ((inputValue: string, option: OptionType) => boolean);
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 尺寸 */
  size?: SelectSize;
  /** 校验状态 */
  status?: SelectStatus;
  /** 下拉菜单宽度是否与选择器相同 */
  dropdownMatchSelectWidth?: boolean | number;
  /** 空数据时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 选项数据 */
  options?: OptionType[];
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent) => void;
  /** 下拉菜单展开/收起回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 下拉菜单自定义类名 */
  dropdownClassName?: string;
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

function buildSelectCssVars(selectTheme: Record<string, any>, globalTheme: Record<string, any>): Record<string, any> {
  const cssVars: Record<string, any> = {};
  const borderRadiusValue = selectTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = selectTheme?.fontSize || globalTheme?.fontSize;
  const controlHeightValue = selectTheme?.controlHeight || globalTheme?.controlHeight;
  if (borderRadiusValue !== undefined) cssVars['--soui-select-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-select-font-size'] = `${fontSizeValue}px`;
  if (controlHeightValue !== undefined) {
    cssVars['--soui-select-control-height-small'] = `${controlHeightValue - 8}px`;
    cssVars['--soui-select-control-height-middle'] = `${controlHeightValue}px`;
    cssVars['--soui-select-control-height-large'] = `${controlHeightValue + 8}px`;
  }
  if (selectTheme?.colorBorder) cssVars['--soui-select-color-border'] = selectTheme.colorBorder;
  if (selectTheme?.colorBorderHover) cssVars['--soui-select-color-border-hover'] = selectTheme.colorBorderHover;
  if (selectTheme?.colorBorderFocus) cssVars['--soui-select-color-border-focus'] = selectTheme.colorBorderFocus;
  if (selectTheme?.colorBg) cssVars['--soui-select-color-bg'] = selectTheme.colorBg;
  if (selectTheme?.colorText) cssVars['--soui-select-color-text'] = selectTheme.colorText;
  if (selectTheme?.colorBgDisabled) cssVars['--soui-select-color-bg-disabled'] = selectTheme.colorBgDisabled;
  if (selectTheme?.colorTextDisabled) cssVars['--soui-select-color-text-disabled'] = selectTheme.colorTextDisabled;
  if (selectTheme?.colorError) cssVars['--soui-select-color-error'] = selectTheme.colorError;
  if (selectTheme?.colorWarning) cssVars['--soui-select-color-warning'] = selectTheme.colorWarning;
  if (selectTheme?.dropdownBg) cssVars['--soui-select-dropdown-bg'] = selectTheme.dropdownBg;
  if (selectTheme?.optionActiveBg) cssVars['--soui-select-option-active-bg'] = selectTheme.optionActiveBg;
  if (selectTheme?.optionSelectedBg) cssVars['--soui-select-option-selected-bg'] = selectTheme.optionSelectedBg;
  if (selectTheme?.tagBg) cssVars['--soui-select-tag-bg'] = selectTheme.tagBg;
  return cssVars;
}

/**
 * 从 ConfigProvider DOM 节点桥接 CSS 变量到 Portal 容器
 */
const SELECT_CSS_VARS = [
  '--soui-select-border-radius',
  '--soui-select-font-size',
  '--soui-select-control-height-small',
  '--soui-select-control-height-middle',
  '--soui-select-control-height-large',
  '--soui-select-color-border',
  '--soui-select-color-border-hover',
  '--soui-select-color-border-focus',
  '--soui-select-color-bg',
  '--soui-select-color-text',
  '--soui-select-color-bg-disabled',
  '--soui-select-color-text-disabled',
  '--soui-select-color-error',
  '--soui-select-color-warning',
  '--soui-select-dropdown-bg',
  '--soui-select-option-active-bg',
  '--soui-select-option-selected-bg',
  '--soui-select-tag-bg',
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-primary-active-color',
  '--soui-border-radius',
  '--soui-font-size',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  SELECT_CSS_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

// ==================== Select ====================

const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    mode,
    placeholder,
    disabled = false,
    loading = false,
    allowClear = false,
    showSearch = false,
    filterOption = true,
    onSearch,
    size: sizeProp,
    status,
    dropdownMatchSelectWidth = true,
    notFoundContent = '暂无数据',
    options = [],
    onFocus,
    onBlur,
    onDropdownVisibleChange,
    className,
    style,
    dropdownClassName,
    ...rest
  } = props;

  // Theme
  const selectTheme = useComponentTheme('Select');
  const globalTheme = useGlobalTheme();

  // Size
  const mergedSize = sizeProp || 'middle';

  // Controlled vs Uncontrolled
  const isMultiple = mode === 'multiple' || mode === 'tags';
  const isControlled = valueProp !== undefined;

  const normalizeValue = (v: string | string[] | undefined): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [innerValue, setInnerValue] = useState<string[]>(() => normalizeValue(defaultValue));
  const selectedValues = isControlled ? normalizeValue(valueProp) : innerValue;

  // State
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: () => searchInputRef.current?.focus(),
    blur: () => {
      searchInputRef.current?.blur();
      setOpen(false);
    },
    clear: () => handleClear(),
  }));

  // Helpers
  const getOptionByValue = useCallback(
    (val: string): OptionType | undefined => options.find((opt) => opt.value === val),
    [options]
  );

  const getLabelByValue = useCallback(
    (val: string): React.ReactNode => {
      const opt = getOptionByValue(val);
      return opt ? opt.label : val;
    },
    [getOptionByValue]
  );

  // Filtered options
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    if (filterOption === false) return options;
    if (typeof filterOption === 'function') {
      return options.filter((opt) => (filterOption as Function)(searchValue, opt));
    }
    // Default: filter by label text
    const lower = searchValue.toLowerCase();
    return options.filter((opt) => {
      const labelStr = typeof opt.label === 'string' ? opt.label.toLowerCase() : String(opt.value).toLowerCase();
      return labelStr.includes(lower);
    });
  }, [options, searchValue, filterOption]);

  // Dropdown positioning
  const updatePosition = useCallback(() => {
    if (!selectRef.current) return;
    const rect = selectRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  // Open/Close
  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onDropdownVisibleChange?.(nextOpen);
      if (nextOpen) {
        setSearchValue('');
        setActiveIndex(-1);
      }
    },
    [onDropdownVisibleChange]
  );

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpenState(!open);
  }, [disabled, open, setOpenState]);

  // Selection
  const handleSelect = useCallback(
    (opt: OptionType) => {
      if (opt.disabled) return;

      if (isMultiple) {
        const idx = selectedValues.indexOf(opt.value);
        const nextValues =
          idx >= 0 ? selectedValues.filter((v) => v !== opt.value) : [...selectedValues, opt.value];

        if (!isControlled) setInnerValue(nextValues);
        const selectedOpts = nextValues.map((v) => getOptionByValue(v)).filter(Boolean) as OptionType[];
        onChange?.(nextValues, selectedOpts);
        setSearchValue('');
        // Keep focus on search input for continuous selection
        searchInputRef.current?.focus();
      } else {
        const nextValue = [opt.value];
        if (!isControlled) setInnerValue(nextValue);
        onChange?.(opt.value, opt);
        setOpenState(false);
      }
    },
    [isMultiple, selectedValues, isControlled, onChange, getOptionByValue, setOpenState]
  );

  // Remove tag in multiple mode
  const handleRemoveTag = useCallback(
    (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const nextValues = selectedValues.filter((v) => v !== val);
      if (!isControlled) setInnerValue(nextValues);
      const selectedOpts = nextValues.map((v) => getOptionByValue(v)).filter(Boolean) as OptionType[];
      onChange?.(nextValues, selectedOpts);
    },
    [selectedValues, isControlled, onChange, getOptionByValue]
  );

  // Clear
  const handleClear = useCallback(() => {
    const nextValue: string[] = [];
    if (!isControlled) setInnerValue(nextValue);
    if (isMultiple) {
      onChange?.(nextValue, []);
    } else {
      onChange?.('', undefined);
    }
    setSearchValue('');
  }, [isControlled, isMultiple, onChange]);

  // Search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      onSearch?.(val);
      setActiveIndex(-1);
      if (!open) setOpenState(true);
    },
    [onSearch, open, setOpenState]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!open) {
            setOpenState(true);
            return;
          }
          setActiveIndex((prev) => {
            let next = prev + 1;
            while (next < filteredOptions.length && filteredOptions[next].disabled) next++;
            return next < filteredOptions.length ? next : prev;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!open) {
            setOpenState(true);
            return;
          }
          setActiveIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && filteredOptions[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (open && activeIndex >= 0 && activeIndex < filteredOptions.length) {
            handleSelect(filteredOptions[activeIndex]);
          } else if (!open) {
            setOpenState(true);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setOpenState(false);
          break;
        }
        case 'Backspace': {
          if (isMultiple && searchValue === '' && selectedValues.length > 0) {
            const lastVal = selectedValues[selectedValues.length - 1];
            handleRemoveTag(lastVal, e as any);
          }
          break;
        }
      }
    },
    [disabled, open, activeIndex, filteredOptions, handleSelect, setOpenState, isMultiple, searchValue, selectedValues, handleRemoveTag]
  );

  // Scroll active option into view
  useEffect(() => {
    if (open && activeIndex >= 0 && dropdownRef.current) {
      const activeEl = dropdownRef.current.querySelector('.soui-select-option-active');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, open]);

  // Update position when open
  useEffect(() => {
    if (open) {
      updatePosition();
      const handleScrollResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollResize, true);
      window.addEventListener('resize', handleScrollResize);
      return () => {
        window.removeEventListener('scroll', handleScrollResize, true);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [open, updatePosition]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        selectRef.current &&
        !selectRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpenState(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, setOpenState]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open, showSearch]);

  // CSS vars
  const cssVars = buildSelectCssVars(selectTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Compute dropdown width
  const dropdownWidth = useMemo(() => {
    if (typeof dropdownMatchSelectWidth === 'number') return dropdownMatchSelectWidth;
    if (dropdownMatchSelectWidth === true) return dropdownPos.width;
    return undefined;
  }, [dropdownMatchSelectWidth, dropdownPos.width]);

  // Has value?
  const hasValue = isMultiple ? selectedValues.length > 0 : selectedValues.length > 0 && selectedValues[0] !== '';
  const showClear = allowClear && hasValue && !disabled;

  // Selected label for single mode
  const singleLabel = !isMultiple && selectedValues.length > 0 ? getLabelByValue(selectedValues[0]) : null;

  // Classes
  const selectCls = classNames(
    'soui-select',
    `soui-select-${mergedSize}`,
    {
      'soui-select-open': open,
      'soui-select-focused': open || isHovered,
      'soui-select-disabled': disabled,
      'soui-select-multiple': isMultiple,
      'soui-select-single': !isMultiple,
      'soui-select-show-search': showSearch,
      [`soui-select-status-${status}`]: !!status && !disabled,
    },
    className
  );

  // Render selected content
  const renderSelectorContent = () => {
    if (isMultiple) {
      return (
        <div className="soui-select-selection-overflow">
          {selectedValues.map((val) => (
            <span className="soui-select-selection-item" key={val}>
              <span className="soui-select-selection-item-content">{getLabelByValue(val)}</span>
              <span
                className="soui-select-selection-item-remove"
                onClick={(e) => handleRemoveTag(val, e)}
                role="button"
                aria-label={`移除 ${getLabelByValue(val)}`}
              >
                <Icon name="Close" size={10} theme="outline" />
              </span>
            </span>
          ))}
          {showSearch && (
            <span className="soui-select-selection-search">
              <input
                ref={searchInputRef}
                className="soui-select-selection-search-input"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
              />
            </span>
          )}
          {selectedValues.length === 0 && !searchValue && placeholder && (
            <span className="soui-select-selection-placeholder">{placeholder}</span>
          )}
        </div>
      );
    }

    // Single mode
    return (
      <>
        {showSearch && open ? (
          <div className="soui-select-selection-search">
            <input
              ref={searchInputRef}
              className="soui-select-selection-search-input"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              autoComplete="off"
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
            />
          </div>
        ) : null}
        {singleLabel && !(showSearch && open && searchValue) ? (
          <span className="soui-select-selection-item" title={typeof singleLabel === 'string' ? singleLabel : undefined}>
            {singleLabel}
          </span>
        ) : null}
        {!hasValue && !searchValue ? (
          <span className="soui-select-selection-placeholder">{placeholder}</span>
        ) : null}
      </>
    );
  };

  // Dropdown style
  const dropdownStyle: React.CSSProperties = {
    position: 'fixed',
    top: dropdownPos.top,
    left: dropdownPos.left,
    ...(dropdownWidth ? { width: dropdownWidth } : {}),
    minWidth: 120,
  };

  // Render dropdown
  const renderDropdown = () => {
    if (!open) return null;

    const dropdownNode = (
      <div
        ref={dropdownRef}
        className={classNames('soui-select-dropdown', dropdownClassName)}
        style={dropdownStyle}
        role="listbox"
      >
        <ul className="soui-select-option-list">
          {filteredOptions.map((opt, idx) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={classNames('soui-select-option', {
                  'soui-select-option-selected': isSelected,
                  'soui-select-option-disabled': opt.disabled,
                  'soui-select-option-active': idx === activeIndex,
                })}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => !opt.disabled && setActiveIndex(idx)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                title={typeof opt.label === 'string' ? opt.label : undefined}
              >
                {isMultiple && (
                  <span className={classNames('soui-select-option-checkbox', { 'soui-select-option-checkbox-checked': isSelected })}>
                    {isSelected && <Icon name="Check" size={12} theme="outline" />}
                  </span>
                )}
                <span className="soui-select-option-content">{opt.label}</span>
              </li>
            );
          })}
          {filteredOptions.length === 0 && (
            <div className="soui-select-empty">{notFoundContent}</div>
          )}
        </ul>
      </div>
    );

    // Apply CSS variable bridging after mount
    return ReactDOM.createPortal(
      <div
        ref={(el) => {
          if (el) applyConfigProviderVars(el);
        }}
      >
        {dropdownNode}
      </div>,
      document.body
    );
  };

  return (
    <div
      ref={selectRef}
      className={selectCls}
      style={mergedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={!showSearch || !open ? handleKeyDown : undefined}
      tabIndex={disabled ? -1 : 0}
      onFocus={(e) => {
        if (!showSearch) onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!showSearch) onBlur?.(e);
      }}
      {...rest}
    >
      <div className="soui-select-selector" onClick={toggleOpen}>
        {renderSelectorContent()}
      </div>

      {/* Clear icon */}
      {showClear && (
        <span
          className="soui-select-clear"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          aria-label="清除"
          tabIndex={-1}
        >
          <Icon name="Close" size={12} theme="outline" />
        </span>
      )}

      {/* Arrow icon */}
      <span className="soui-select-arrow">
        {loading ? (
          <Icon name="Loading" size={12} theme="outline" />
        ) : (
          <Icon name="Down" size={12} theme="outline" />
        )}
      </span>

      {/* Dropdown portal */}
      {renderDropdown()}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
