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
  /** 分组子选项（存在时表示这是一个分组） */
  children?: OptionType[];
}

/** 选项分组类型 */
export interface OptionGroupType {
  /** 分组标签 */
  label: React.ReactNode;
  /** 分组子选项 */
  children: OptionType[];
}

export type GroupedOptionType = OptionType | OptionGroupType;

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
  /** 选项数据（支持分组） */
  options?: GroupedOptionType[];
  /** 多选时最多显示的标签数量，超出以 +N 展示 */
  maxTagCount?: number;
  /** 自定义下拉菜单内容 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  /** 自定义选项渲染 */
  optionRender?: (option: OptionType, index: number) => React.ReactNode;
  /** 自定义后缀图标 */
  suffixIcon?: React.ReactNode;
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

/** Type guard: check if an item is an option group */
function isOptionGroup(item: GroupedOptionType): item is OptionGroupType {
  return 'children' in item && Array.isArray((item as OptionGroupType).children);
}

/** Flatten grouped options into a plain array for filtering, keyboard nav, and selection lookup */
function flattenOptions(options: GroupedOptionType[]): OptionType[] {
  const result: OptionType[] = [];
  for (const opt of options) {
    if (isOptionGroup(opt)) {
      result.push(...opt.children);
    } else {
      result.push(opt);
    }
  }
  return result;
}

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
    maxTagCount,
    dropdownRender,
    optionRender,
    suffixIcon,
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
    (val: string): OptionType | undefined => flattenOptions(options).find((opt) => opt.value === val),
    [options]
  );

  const getLabelByValue = useCallback(
    (val: string): React.ReactNode => {
      const opt = getOptionByValue(val);
      return opt ? opt.label : val;
    },
    [getOptionByValue]
  );

  // Filtered options (preserves group structure)
  const filteredOptions = useMemo(() => {
    const defaultFilter = (opt: OptionType) => {
      const labelStr = typeof opt.label === 'string' ? opt.label.toLowerCase() : String(opt.value).toLowerCase();
      return labelStr.includes(searchValue.toLowerCase());
    };
    const customFilter = typeof filterOption === 'function' ? (opt: OptionType) => (filterOption as Function)(searchValue, opt) : defaultFilter;
    const doFilter = !searchValue ? null : filterOption === false ? null : customFilter;

    return options.filter((item) => {
      if (isOptionGroup(item)) {
        if (!doFilter) return item.children.length > 0;
        return item.children.some(doFilter);
      }
      return doFilter ? doFilter(item) : true;
    });
  }, [options, searchValue, filterOption]);

  // Flat filtered options for keyboard navigation (excludes group headers)
  const flatFilteredOptions = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);

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
        // In tags mode, keep dropdown open for continuous tagging
        if (mode !== 'tags') {
          // For multiple mode, keep focus on search input
          searchInputRef.current?.focus();
        } else {
          searchInputRef.current?.focus();
        }
      } else {
        const nextValue = [opt.value];
        if (!isControlled) setInnerValue(nextValue);
        onChange?.(opt.value, opt);
        setOpenState(false);
      }
    },
    [isMultiple, selectedValues, isControlled, onChange, getOptionByValue, setOpenState, mode]
  );

  // Create new option in tags mode
  const handleCreateTag = useCallback(
    (val: string) => {
      if (!val.trim()) return;
      // Don't create duplicate
      if (selectedValues.includes(val)) return;

      const newOpt: OptionType = { label: val, value: val };
      const nextValues = [...selectedValues, val];
      if (!isControlled) setInnerValue(nextValues);
      onChange?.(nextValues, [...nextValues.map((v) => getOptionByValue(v)).filter(Boolean), newOpt] as OptionType[]);
      setSearchValue('');
      searchInputRef.current?.focus();
    },
    [selectedValues, isControlled, onChange, getOptionByValue]
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
            while (next < flatFilteredOptions.length && flatFilteredOptions[next].disabled) next++;
            return next < flatFilteredOptions.length ? next : prev;
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
            while (next >= 0 && flatFilteredOptions[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (open && activeIndex >= 0 && activeIndex < flatFilteredOptions.length) {
            handleSelect(flatFilteredOptions[activeIndex]);
          } else if (open && mode === 'tags' && searchValue.trim()) {
            // Tags mode: create new option from search text
            handleCreateTag(searchValue.trim());
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
    [disabled, open, activeIndex, flatFilteredOptions, handleSelect, setOpenState, isMultiple, searchValue, selectedValues, handleRemoveTag, mode, handleCreateTag]
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
      'soui-select-focused': open,
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
      // Determine visible tags based on maxTagCount
      const visibleValues = maxTagCount !== undefined ? selectedValues.slice(0, maxTagCount) : selectedValues;
      const overflowCount = maxTagCount !== undefined ? Math.max(0, selectedValues.length - maxTagCount) : 0;

      return (
        <div className="soui-select-selection-overflow">
          {visibleValues.map((val) => (
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
          {overflowCount > 0 && (
            <span className="soui-select-selection-item soui-select-selection-item-overflow">
              <span className="soui-select-selection-item-content">+{overflowCount}</span>
            </span>
          )}
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

    // Track flat index for keyboard active highlighting
    let flatIdx = -1;

    const menuContent = (
      <ul className="soui-select-option-list">
        {filteredOptions.map((item, groupIdx) => {
          if (isOptionGroup(item)) {
            const groupKey = typeof item.label === 'string' ? item.label : `group-${groupIdx}`;
            return (
              <li key={groupKey} className="soui-select-group" role="group">
                <div className="soui-select-group-header">{item.label}</div>
                <ul>
                  {item.children.map((opt) => {
                    if (searchValue && filterOption !== false) {
                      const labelStr = typeof opt.label === 'string' ? opt.label.toLowerCase() : String(opt.value).toLowerCase();
                      const matches = typeof filterOption === 'function'
                        ? (filterOption as Function)(searchValue, opt)
                        : labelStr.includes(searchValue.toLowerCase());
                      if (!matches) return null;
                    }
                    flatIdx++;
                    const currentFlatIdx = flatIdx;
                    const isSelected = selectedValues.includes(opt.value);
                    return (
                      <li
                        key={opt.value}
                        className={classNames('soui-select-option', {
                          'soui-select-option-selected': isSelected,
                          'soui-select-option-disabled': opt.disabled,
                          'soui-select-option-active': currentFlatIdx === activeIndex,
                        })}
                        onClick={() => handleSelect(opt)}
                        onMouseEnter={() => !opt.disabled && setActiveIndex(currentFlatIdx)}
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
                        <span className="soui-select-option-content">
                          {optionRender ? optionRender(opt, currentFlatIdx) : opt.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          // Plain option
          const opt = item as OptionType;
          flatIdx++;
          const currentFlatIdx = flatIdx;
          const isSelected = selectedValues.includes(opt.value);
          return (
            <li
              key={opt.value}
              className={classNames('soui-select-option', {
                'soui-select-option-selected': isSelected,
                'soui-select-option-disabled': opt.disabled,
                'soui-select-option-active': currentFlatIdx === activeIndex,
              })}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => !opt.disabled && setActiveIndex(currentFlatIdx)}
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
              <span className="soui-select-option-content">
                {optionRender ? optionRender(opt, currentFlatIdx) : opt.label}
              </span>
            </li>
          );
        })}
        {/* Tags mode: show "create" hint when search value has no match */}
        {mode === 'tags' && searchValue && flatFilteredOptions.length === 0 && (
          <li
            className="soui-select-option soui-select-option-create"
            onClick={() => handleCreateTag(searchValue)}
            onMouseEnter={() => setActiveIndex(0)}
          >
            <span className="soui-select-option-content">
              创建 "{searchValue}"
            </span>
          </li>
        )}
        {filteredOptions.length === 0 && !(mode === 'tags' && searchValue) && (
          <div className="soui-select-empty">{notFoundContent}</div>
        )}
      </ul>
    );

    // Build the dropdown menu node
    const defaultMenu = (
      <div
        ref={dropdownRef}
        className={classNames('soui-select-dropdown', dropdownClassName)}
        style={dropdownStyle}
        role="listbox"
      >
        {dropdownRender ? dropdownRender(menuContent) : menuContent}
      </div>
    );

    // Apply CSS variable bridging after mount
    return ReactDOM.createPortal(
      <div
        ref={(el) => {
          if (el) applyConfigProviderVars(el);
        }}
      >
        {defaultMenu}
      </div>,
      document.body
    );
  };

  return (
    <div
      ref={selectRef}
      className={selectCls}
      style={mergedStyle}
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

      {/* Arrow / Suffix icon */}
      <span className="soui-select-arrow">
        {loading ? (
          <Icon name="Loading" size={12} theme="outline" />
        ) : suffixIcon !== undefined ? (
          suffixIcon
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
