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

export type TreeSelectSize = 'large' | 'middle' | 'small';
export type TreeSelectStatus = 'error' | 'warning';
export type TreeSelectShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

export interface TreeSelectOption {
  /** 选项显示文本 */
  title?: React.ReactNode;
  /** 选项值 */
  value: string | number;
  /** 子级选项 */
  children?: TreeSelectOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选（树节点为父级时，设为 false 则该节点不可选中） */
  selectable?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 自定义 key */
  key?: string | number;
  [key: string]: any;
}

export interface TreeSelectFieldNames {
  label?: string;
  value?: string;
  children?: string;
}

export interface TreeSelectRef {
  focus: () => void;
  blur: () => void;
}

export interface TreeSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'placeholder'> {
  /** 可选项数据 */
  treeData?: TreeSelectOption[];
  /** 指定选中的值（受控） */
  value?: (string | number)[] | string | number;
  /** 默认选中的值 */
  defaultValue?: (string | number)[] | string | number;
  /** 选中变化回调 */
  onChange?: (value: any, label?: any) => void;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示复选框（多选模式） */
  treeCheckable?: boolean;
  /** 多选时显示策略 */
  showCheckedStrategy?: TreeSelectShowCheckedStrategy;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 清除回调 */
  onClear?: () => void;
  /** 占位文本 */
  placeholder?: React.ReactNode;
  /** 尺寸 */
  size?: TreeSelectSize;
  /** 校验状态 */
  status?: TreeSelectStatus;
  /** 是否启用搜索 */
  showSearch?: boolean;
  /** 搜索过滤函数 */
  filterTreeNode?: (inputValue: string, treeNode: TreeSelectOption) => boolean;
  /** 用于搜索过滤的字段名 */
  treeNodeFilterProp?: 'title' | 'value';
  /** 默认展开所有节点 */
  treeDefaultExpandAll?: boolean;
  /** 默认展开的节点 keys */
  treeDefaultExpandedKeys?: (string | number)[];
  /** 展开的节点 keys（受控） */
  treeExpandedKeys?: (string | number)[];
  /** 展开/收起回调 */
  onTreeExpand?: (expandedKeys: (string | number)[]) => void;
  /** 异步加载子级数据 */
  loadData?: (treeNode: TreeSelectOption) => void;
  /** 自定义字段名映射 */
  fieldNames?: TreeSelectFieldNames;
  /** 多选时最多显示的标签数量 */
  maxTagCount?: number;
  /** 多选时隐藏标签的占位 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: any[]) => React.ReactNode);
  /** 自定义后缀图标 */
  suffixIcon?: React.ReactNode;
  /** 自定义展开/折叠图标 */
  switcherIcon?: React.ReactNode;
  /** 空数据时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 自定义下拉菜单内容 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  /** 控制下拉菜单显隐（受控） */
  open?: boolean;
  /** 下拉菜单展开/收起回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 是否显示树连接线 */
  treeLine?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 下拉菜单自定义类名 */
  popupClassName?: string;
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

function buildCssVars(theme: Record<string, any>, globalTheme: Record<string, any>): Record<string, any> {
  const cssVars: Record<string, any> = {};
  const br = theme?.borderRadius || globalTheme?.borderRadius;
  const fs = theme?.fontSize || globalTheme?.fontSize;
  const ch = theme?.controlHeight || globalTheme?.controlHeight;
  if (br !== undefined) cssVars['--soui-tree-select-border-radius'] = `${br}px`;
  if (fs !== undefined) cssVars['--soui-tree-select-font-size'] = `${fs}px`;
  if (ch !== undefined) {
    cssVars['--soui-tree-select-control-height-small'] = `${ch - 8}px`;
    cssVars['--soui-tree-select-control-height-middle'] = `${ch}px`;
    cssVars['--soui-tree-select-control-height-large'] = `${ch + 8}px`;
  }
  if (theme?.colorBorder) cssVars['--soui-tree-select-color-border'] = theme.colorBorder;
  if (theme?.colorBorderHover) cssVars['--soui-tree-select-color-border-hover'] = theme.colorBorderHover;
  if (theme?.colorBorderFocus) cssVars['--soui-tree-select-color-border-focus'] = theme.colorBorderFocus;
  if (theme?.colorBg) cssVars['--soui-tree-select-color-bg'] = theme.colorBg;
  if (theme?.colorText) cssVars['--soui-tree-select-color-text'] = theme.colorText;
  if (theme?.colorBgDisabled) cssVars['--soui-tree-select-color-bg-disabled'] = theme.colorBgDisabled;
  if (theme?.colorTextDisabled) cssVars['--soui-tree-select-color-text-disabled'] = theme.colorTextDisabled;
  if (theme?.colorError) cssVars['--soui-tree-select-color-error'] = theme.colorError;
  if (theme?.colorWarning) cssVars['--soui-tree-select-color-warning'] = theme.colorWarning;
  if (theme?.dropdownBg) cssVars['--soui-tree-select-dropdown-bg'] = theme.dropdownBg;
  if (theme?.optionActiveBg) cssVars['--soui-tree-select-option-active-bg'] = theme.optionActiveBg;
  if (theme?.optionSelectedBg) cssVars['--soui-tree-select-option-selected-bg'] = theme.optionSelectedBg;
  if (theme?.tagBg) cssVars['--soui-tree-select-tag-bg'] = theme.tagBg;
  return cssVars;
}

const CSS_VARS = [
  '--soui-tree-select-border-radius',
  '--soui-tree-select-font-size',
  '--soui-tree-select-control-height-small',
  '--soui-tree-select-control-height-middle',
  '--soui-tree-select-control-height-large',
  '--soui-tree-select-color-border',
  '--soui-tree-select-color-border-hover',
  '--soui-tree-select-color-border-focus',
  '--soui-tree-select-color-bg',
  '--soui-tree-select-color-text',
  '--soui-tree-select-color-bg-disabled',
  '--soui-tree-select-color-text-disabled',
  '--soui-tree-select-color-error',
  '--soui-tree-select-color-warning',
  '--soui-tree-select-dropdown-bg',
  '--soui-tree-select-option-active-bg',
  '--soui-tree-select-option-selected-bg',
  '--soui-tree-select-tag-bg',
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-border-radius',
  '--soui-font-size',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  CSS_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

function getOptLabel(opt: TreeSelectOption, fn?: TreeSelectFieldNames): React.ReactNode {
  return opt[fn?.label || 'title'];
}
function getOptValue(opt: TreeSelectOption, fn?: TreeSelectFieldNames): string | number {
  return opt[fn?.value || 'value'];
}
function getOptChildren(opt: TreeSelectOption, fn?: TreeSelectFieldNames): TreeSelectOption[] | undefined {
  return opt[fn?.children || 'children'];
}
function hasOptChildren(opt: TreeSelectOption, fn?: TreeSelectFieldNames): boolean {
  const c = getOptChildren(opt, fn);
  return Array.isArray(c) && c.length > 0;
}
function isLeafOpt(opt: TreeSelectOption, fn?: TreeSelectFieldNames): boolean {
  if (opt.isLeaf !== undefined) return opt.isLeaf;
  return !hasOptChildren(opt, fn);
}

/** Collect all keys in tree */
function collectAllKeys(data: TreeSelectOption[], fn?: TreeSelectFieldNames): (string | number)[] {
  const keys: (string | number)[] = [];
  const walk = (nodes: TreeSelectOption[]) => {
    for (const n of nodes) {
      keys.push(getOptValue(n, fn));
      const ch = getOptChildren(n, fn);
      if (ch) walk(ch);
    }
  };
  walk(data);
  return keys;
}

/** Find option by value */
function findOption(data: TreeSelectOption[], val: string | number, fn?: TreeSelectFieldNames): TreeSelectOption | undefined {
  for (const opt of data) {
    if (getOptValue(opt, fn) === val) return opt;
    const ch = getOptChildren(opt, fn);
    if (ch) {
      const found = findOption(ch, val, fn);
      if (found) return found;
    }
  }
  return undefined;
}

/** Get all leaf descendant values under a node */
function getLeafValues(opt: TreeSelectOption, fn?: TreeSelectFieldNames): (string | number)[] {
  if (isLeafOpt(opt, fn)) return [getOptValue(opt, fn)];
  const ch = getOptChildren(opt, fn) || [];
  return ch.flatMap((c) => getLeafValues(c, fn));
}

/** Get all descendant values under a node (including self) */
function getAllDescendantValues(opt: TreeSelectOption, fn?: TreeSelectFieldNames): (string | number)[] {
  const val = getOptValue(opt, fn);
  const ch = getOptChildren(opt, fn) || [];
  return [val, ...ch.flatMap((c) => getAllDescendantValues(c, fn))];
}

/** Build a parent map: childValue -> parentValue */
function buildParentMap(data: TreeSelectOption[], fn?: TreeSelectFieldNames, parent?: string | number): Map<string | number, string | number | undefined> {
  const map = new Map<string | number, string | number | undefined>();
  for (const opt of data) {
    const val = getOptValue(opt, fn);
    map.set(val, parent);
    const ch = getOptChildren(opt, fn);
    if (ch) {
      const childMap = buildParentMap(ch, fn, val);
      childMap.forEach((v, k) => map.set(k, v));
    }
  }
  return map;
}

/** Get label string for display */
function getLabelStr(opt: TreeSelectOption, fn?: TreeSelectFieldNames): string {
  const l = getOptLabel(opt, fn);
  return typeof l === 'string' ? l : String(getOptValue(opt, fn));
}

// ==================== Component ====================

const TreeSelect = forwardRef<TreeSelectRef, TreeSelectProps>((props, ref) => {
  const {
    treeData = [],
    value: valueProp,
    defaultValue,
    onChange,
    multiple = false,
    treeCheckable = false,
    showCheckedStrategy = 'SHOW_ALL',
    disabled = false,
    allowClear = true,
    onClear,
    placeholder,
    size: sizeProp = 'middle',
    status,
    showSearch = false,
    filterTreeNode,
    treeNodeFilterProp = 'value',
    treeDefaultExpandAll = false,
    treeDefaultExpandedKeys,
    treeExpandedKeys: treeExpandedKeysProp,
    onTreeExpand,
    loadData,
    fieldNames,
    maxTagCount,
    maxTagPlaceholder,
    suffixIcon,
    switcherIcon,
    notFoundContent = '暂无数据',
    dropdownRender,
    open: openProp,
    onDropdownVisibleChange,
    treeLine = false,
    className,
    style,
    popupClassName,
    ...rest
  } = props;

  // Theme
  const treeSelectTheme = useComponentTheme('TreeSelect');
  const globalTheme = useGlobalTheme();
  const mergedSize = sizeProp || 'middle';

  // Open state
  const isOpenControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = isOpenControlled ? openProp! : innerOpen;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setInnerOpen(nextOpen);
      onDropdownVisibleChange?.(nextOpen);
    },
    [isOpenControlled, onDropdownVisibleChange],
  );

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpenState(!isOpen);
  }, [disabled, isOpen, setOpenState]);

  // Normalize value
  const normalizeValue = (v: any): (string | number)[] => {
    if (v === undefined || v === null) return [];
    return Array.isArray(v) ? v : [v];
  };

  // Parent map / flat options (needed for value expansion, declared before state)
  const parentMap = useMemo(() => buildParentMap(treeData, fieldNames), [treeData, fieldNames]);

  const flatOptions = useMemo(() => {
    const result: TreeSelectOption[] = [];
    const walk = (nodes: TreeSelectOption[]) => {
      for (const n of nodes) {
        result.push(n);
        const ch = getOptChildren(n, fieldNames);
        if (ch) walk(ch);
      }
    };
    walk(treeData);
    return result;
  }, [treeData, fieldNames]);

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<(string | number)[]>(
    () => expandValue(normalizeValue(defaultValue), showCheckedStrategy, flatOptions, fieldNames),
  );
  const selectedValues = useMemo(
    () =>
      isControlled
        ? expandValue(normalizeValue(valueProp), showCheckedStrategy, flatOptions, fieldNames)
        : innerValue,
    [isControlled, valueProp, innerValue, showCheckedStrategy, flatOptions, fieldNames],
  );

  // Expanded keys
  const isTreeExpandedControlled = treeExpandedKeysProp !== undefined;
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<(string | number)[]>(() => {
    if (treeDefaultExpandAll) return collectAllKeys(treeData, fieldNames);
    return treeDefaultExpandedKeys || [];
  });
  const expandedKeys = isTreeExpandedControlled ? treeExpandedKeysProp! : innerExpandedKeys;

  // Search
  const [searchValue, setSearchValue] = useState('');

  // Loading
  const [loadingKeys, setLoadingKeys] = useState<Set<string | number>>(new Set());

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useImperativeHandle(ref, () => ({
    focus: () => searchInputRef.current?.focus(),
    blur: () => {
      searchInputRef.current?.blur();
      setOpenState(false);
    },
  }));

  // Expand/Collapse
  const toggleExpand = useCallback(
    (key: string | number) => {
      const idx = expandedKeys.indexOf(key);
      const next = idx >= 0 ? expandedKeys.filter((k) => k !== key) : [...expandedKeys, key];
      if (!isTreeExpandedControlled) setInnerExpandedKeys(next);
      onTreeExpand?.(next);
    },
    [expandedKeys, isTreeExpandedControlled, onTreeExpand],
  );

  // Checkbox state for a node
  const getCheckState = useCallback(
    (opt: TreeSelectOption): 'all' | 'half' | 'none' => {
      if (isLeafOpt(opt, fieldNames)) {
        return selectedValues.includes(getOptValue(opt, fieldNames)) ? 'all' : 'none';
      }
      const leafValues = getLeafValues(opt, fieldNames);
      const selectedCount = leafValues.filter((v) => selectedValues.includes(v)).length;
      if (selectedCount === 0) return 'none';
      if (selectedCount === leafValues.length) return 'all';
      return 'half';
    },
    [selectedValues, fieldNames],
  );

  // Handle selecting a node (single mode or non-checkable multiple)
  const handleSelect = useCallback(
    (opt: TreeSelectOption) => {
      if (opt.disabled) return;
      if (opt.selectable === false) return;
      const val = getOptValue(opt, fieldNames);

      if (treeCheckable && multiple) {
        // Internal state is the full expanded set, so it always includes
        // all descendants when a parent is "checked". The toggle logic must
        // operate on leaves + propagate up the ancestor chain, not on
        // the clicked node alone.
        const state = getCheckState(opt);
        const isOptLeaf = isLeafOpt(opt, fieldNames);
        // Determine the actual node to toggle: a leaf toggles itself,
        // a non-leaf toggles all its descendants.
        const targetVals = isOptLeaf ? [val] : getAllDescendantValues(opt, fieldNames).filter((v) => {
          const o = flatOptions.find((x) => getOptValue(x, fieldNames) === v);
          return o ? isLeafOpt(o, fieldNames) : true;
        });

        let nextValues: (string | number)[];
        if (state === 'all') {
          // Uncheck: remove the toggled leaves and the clicked (parent) value itself.
          const removeSet = new Set<(string | number)>([...targetVals, val]);
          nextValues = selectedValues.filter((v) => !removeSet.has(v));
        } else {
          // Check: add the toggled leaves and the clicked (parent) value itself.
          const addSet = new Set<(string | number)>([...targetVals, val]);
          // Also include the parent chain so getCheckState stays correct
          let parentVal = parentMap.get(val);
          while (parentVal !== undefined) {
            addSet.add(parentVal);
            parentVal = parentMap.get(parentVal);
          }
          nextValues = Array.from(new Set([...selectedValues, ...addSet]));
        }

        // Apply showCheckedStrategy to compress the output
        const filtered = applyShowCheckedStrategy(nextValues, showCheckedStrategy, parentMap, flatOptions, fieldNames);

        if (!isControlled) setInnerValue(nextValues);
        const labels = filtered.map((v) => {
          const o = findOption(treeData, v, fieldNames);
          return o ? getLabelStr(o, fieldNames) : String(v);
        });
        // Always pass arrays in treeCheckable mode (it is always used with multiple=true)
        onChange?.(filtered, labels);
        return;
      }

      if (multiple) {
        const idx = selectedValues.indexOf(val);
        const nextValues = idx >= 0 ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
        if (!isControlled) setInnerValue(nextValues);
        const labels = nextValues.map((v) => {
          const o = findOption(treeData, v, fieldNames);
          return o ? getLabelStr(o, fieldNames) : String(v);
        });
        onChange?.(nextValues, labels);
        searchInputRef.current?.focus();
      } else {
        const nextValues = [val];
        if (!isControlled) setInnerValue(nextValues);
        const label = getLabelStr(opt, fieldNames);
        onChange?.(val, label);
        setOpenState(false);
      }
    },
    [
      treeCheckable,
      multiple,
      selectedValues,
      isControlled,
      onChange,
      setOpenState,
      getCheckState,
      showCheckedStrategy,
      parentMap,
      flatOptions,
      fieldNames,
      treeData,
    ],
  );

  // Clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextValue: (string | number)[] = [];
      // Always update innerValue because:
      // - Uncontrolled: directly updates displayed value
      // - Single-select controlled: clearing to undefined switches from controlled
      //   to uncontrolled (valueProp becomes undefined), so innerValue must be
      //   pre-set to [] to avoid showing stale data on the next render
      setInnerValue(nextValue);
      if (multiple) {
        onChange?.(nextValue, []);
      } else {
        onChange?.(undefined, undefined);
      }
      setSearchValue('');
      onClear?.();
    },
    [multiple, onChange, onClear],
  );

  // Remove tag
  const handleRemoveTag = useCallback(
    (val: string | number, e: React.MouseEvent) => {
      e.stopPropagation();

      let nextValues: (string | number)[];
      const _checkable = treeCheckable && multiple;
      if (_checkable) {
        // In treeCheckable mode, removing a parent tag should also uncheck all descendants
        const opt = findOption(treeData, val, fieldNames);
        const descValues = opt ? getAllDescendantValues(opt, fieldNames) : [val];
        nextValues = selectedValues.filter((v) => !descValues.includes(v));
      } else {
        nextValues = selectedValues.filter((v) => v !== val);
      }

      if (!isControlled) setInnerValue(nextValues);

      // Apply showCheckedStrategy for onChange output
      const outputValues = _checkable
        ? applyShowCheckedStrategy(nextValues, showCheckedStrategy, parentMap, flatOptions, fieldNames)
        : nextValues;
      const labels = outputValues.map((v) => {
        const o = findOption(treeData, v, fieldNames);
        return o ? getLabelStr(o, fieldNames) : String(v);
      });
      onChange?.(outputValues, labels);
    },
    [selectedValues, isControlled, treeCheckable, multiple, onChange, treeData, fieldNames, showCheckedStrategy, parentMap, flatOptions],
  );

  // Search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      if (!isOpen) setOpenState(true);
      // Auto expand all when searching
      if (val) {
        const allKeys = collectAllKeys(treeData, fieldNames);
        if (!isTreeExpandedControlled) setInnerExpandedKeys(allKeys);
      }
    },
    [isOpen, setOpenState, treeData, fieldNames, isTreeExpandedControlled],
  );

  // Load data
  const handleLoadData = useCallback(
    (opt: TreeSelectOption) => {
      if (!loadData) return;
      const val = getOptValue(opt, fieldNames);
      if (loadingKeys.has(val)) return;
      setLoadingKeys((prev) => new Set(prev).add(val));
      loadData(opt);
    },
    [loadData, loadingKeys, fieldNames],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) setOpenState(true);
          break;
        case 'Escape':
          e.preventDefault();
          setOpenState(false);
          break;
        case 'Backspace':
          if (multiple && searchValue === '' && selectedValues.length > 0) {
            const last = selectedValues[selectedValues.length - 1];
            handleRemoveTag(last, e as any);
          }
          break;
      }
    },
    [disabled, isOpen, setOpenState, multiple, searchValue, selectedValues, handleRemoveTag],
  );

  // Dropdown position
  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const h = () => updatePosition();
      window.addEventListener('scroll', h, true);
      window.addEventListener('resize', h);
      return () => {
        window.removeEventListener('scroll', h, true);
        window.removeEventListener('resize', h);
      };
    }
  }, [isOpen, updatePosition]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(t) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(t)
      ) {
        setOpenState(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpenState]);

  // Focus search
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  // CSS vars
  const cssVars = buildCssVars(treeSelectTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Computed
  const hasValue = selectedValues.length > 0;
  const showClear = allowClear && hasValue && !disabled;
  const isCheckable = treeCheckable && multiple;

  // Search filter
  const searchFilter = useCallback(
    (opt: TreeSelectOption): boolean => {
      if (!searchValue) return true;
      if (filterTreeNode) return filterTreeNode(searchValue, opt);
      const prop = treeNodeFilterProp === 'title' ? getOptLabel(opt, fieldNames) : getOptValue(opt, fieldNames);
      const str = typeof prop === 'string' ? prop : String(prop);
      return str.toLowerCase().includes(searchValue.toLowerCase());
    },
    [searchValue, filterTreeNode, treeNodeFilterProp, fieldNames],
  );

  // Check if a node or any descendant matches search
  const nodeOrDescendantMatches = useCallback(
    (opt: TreeSelectOption): boolean => {
      if (searchFilter(opt)) return true;
      const ch = getOptChildren(opt, fieldNames);
      if (ch) return ch.some((c) => nodeOrDescendantMatches(c));
      return false;
    },
    [searchFilter, fieldNames],
  );

  // Display text for single mode
  const displayText = useMemo(() => {
    if (multiple || selectedValues.length === 0) return null;
    const opt = findOption(treeData, selectedValues[0], fieldNames);
    return opt ? getLabelStr(opt, fieldNames) : String(selectedValues[0]);
  }, [multiple, selectedValues, treeData, fieldNames]);

  // Classes
  const wrapperCls = classNames(
    'soui-tree-select',
    `soui-tree-select-${mergedSize}`,
    {
      'soui-tree-select-open': isOpen,
      'soui-tree-select-focused': isOpen,
      'soui-tree-select-disabled': disabled,
      'soui-tree-select-multiple': multiple,
      'soui-tree-select-single': !multiple,
      'soui-tree-select-show-search': showSearch,
      [`soui-tree-select-status-${status}`]: !!status && !disabled,
    },
    className,
  );

  // Render tree nodes
  const renderTreeNode = (opt: TreeSelectOption, level: number): React.ReactNode => {
    const val = getOptValue(opt, fieldNames);
    const label = getOptLabel(opt, fieldNames);
    const children = getOptChildren(opt, fieldNames);
    const leaf = isLeafOpt(opt, fieldNames);
    const hasChildren = hasOptChildren(opt, fieldNames);
    const isExpanded = expandedKeys.includes(val);
    const isLoading = loadingKeys.has(val);
    const isDisabled = opt.disabled;

    // Search filtering
    if (searchValue && !nodeOrDescendantMatches(opt)) return null;

    // Selection state
    const isSelected = selectedValues.includes(val);
    let checkState: 'all' | 'half' | 'none' = 'none';
    if (isCheckable) {
      checkState = getCheckState(opt);
    }

    // Indentation
    const indent = level * 24;

    return (
      <React.Fragment key={val}>
        <div
          className={classNames('soui-tree-select-treenode', {
            'soui-tree-select-treenode-selected': isSelected && !isCheckable,
            'soui-tree-select-treenode-disabled': isDisabled,
            'soui-tree-select-treenode-checked': checkState === 'all',
            'soui-tree-select-treenode-half-checked': checkState === 'half',
          })}
          style={{ paddingLeft: indent }}
        >
          {/* Switcher */}
          <span
            className={classNames('soui-tree-select-switcher', {
              'soui-tree-select-switcher-open': isExpanded,
              'soui-tree-select-switcher-close': !isExpanded && hasChildren,
              'soui-tree-select-switcher-noop': leaf,
            })}
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleExpand(val);
              else if (loadData && !leaf) handleLoadData(opt);
            }}
          >
            {isLoading ? (
              <Icon name="Loading" size={12} theme="outline" />
            ) : leaf ? null : switcherIcon !== undefined ? (
              switcherIcon
            ) : (
              <Icon name="Right" size={10} theme="outline" />
            )}
          </span>

          {/* Checkbox */}
          {isCheckable && (
            <span
              className={classNames('soui-tree-select-checkbox', {
                'soui-tree-select-checkbox-checked': checkState === 'all',
                'soui-tree-select-checkbox-half': checkState === 'half',
                'soui-tree-select-checkbox-disabled': isDisabled,
              })}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDisabled) handleSelect(opt);
              }}
            >
              {checkState === 'all' && <Icon name="Check" size={12} theme="outline" />}
              {checkState === 'half' && <span className="soui-tree-select-checkbox-indeterminate" />}
            </span>
          )}

          {/* Node content */}
          <span
            className={classNames('soui-tree-select-node-content', {
              'soui-tree-select-node-content-selected': isSelected && !isCheckable,
              'soui-tree-select-node-content-disabled': isDisabled,
            })}
            onClick={() => {
              if (!isDisabled) {
                handleSelect(opt);
              }
            }}
            title={typeof label === 'string' ? label : undefined}
          >
            {label}
          </span>
        </div>

        {/* Children */}
        {isExpanded && hasChildren && children && (
          <div className={classNames('soui-tree-select-children', { 'soui-tree-select-line': treeLine })}>
            {children.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </React.Fragment>
    );
  };

  // Render selected content
  const renderSelectorContent = () => {
    if (multiple) {
      // Apply showCheckedStrategy for display
      const displayValues = isCheckable
        ? applyShowCheckedStrategy(selectedValues, showCheckedStrategy, parentMap, flatOptions, fieldNames)
        : selectedValues;
      const displayVisible = maxTagCount !== undefined ? displayValues.slice(0, maxTagCount) : displayValues;
      const displayOverflow = maxTagCount !== undefined ? Math.max(0, displayValues.length - maxTagCount) : 0;

      return (
        <div className="soui-tree-select-selection-overflow">
          {displayVisible.map((val) => {
            const opt = findOption(treeData, val, fieldNames);
            const lbl = opt ? getLabelStr(opt, fieldNames) : String(val);
            return (
              <span className="soui-tree-select-selection-item" key={val}>
                <span className="soui-tree-select-selection-item-content">{lbl}</span>
                <span
                  className="soui-tree-select-selection-item-remove"
                  onClick={(e) => handleRemoveTag(val, e)}
                  role="button"
                  aria-label={`移除 ${lbl}`}
                >
                  <Icon name="Close" size={10} theme="outline" />
                </span>
              </span>
            );
          })}
          {displayOverflow > 0 && (
            <span className="soui-tree-select-selection-item soui-tree-select-selection-item-overflow">
              <span className="soui-tree-select-selection-item-content">
                {typeof maxTagPlaceholder === 'function'
                  ? maxTagPlaceholder(displayValues.slice(maxTagCount!))
                  : `+${displayOverflow}`}
              </span>
            </span>
          )}
          {showSearch && (
            <span className="soui-tree-select-selection-search">
              <input
                ref={searchInputRef}
                className="soui-tree-select-selection-search-input"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              />
            </span>
          )}
          {displayValues.length === 0 && !searchValue && placeholder && (
            <span className="soui-tree-select-selection-placeholder">{placeholder}</span>
          )}
        </div>
      );
    }

    // Single mode
    return (
      <>
        {showSearch && isOpen ? (
          <div className="soui-tree-select-selection-search">
            <input
              ref={searchInputRef}
              className="soui-tree-select-selection-search-input"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              autoComplete="off"
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              placeholder={hasValue ? displayText || '' : (typeof placeholder === 'string' ? placeholder : '')}
            />
          </div>
        ) : null}
        {displayText && !(showSearch && isOpen && searchValue) ? (
          <span className="soui-tree-select-selection-item" title={typeof displayText === 'string' ? displayText : undefined}>
            {displayText}
          </span>
        ) : null}
        {!hasValue && !searchValue ? (
          <span className="soui-tree-select-selection-placeholder">{placeholder}</span>
        ) : null}
      </>
    );
  };

  // Dropdown style
  const dropdownStyle: React.CSSProperties = {
    position: 'fixed',
    top: dropdownPos.top,
    left: dropdownPos.left,
    ...(dropdownPos.width ? { minWidth: dropdownPos.width } : {}),
    minWidth: 120,
  };

  // Render dropdown
  const renderDropdown = () => {
    if (!isOpen) return null;

    const menuContent = (
      <div className="soui-tree-select-tree">
        {treeData.length > 0 ? (
          treeData.map((opt) => renderTreeNode(opt, 0))
        ) : (
          <div className="soui-tree-select-empty">{notFoundContent}</div>
        )}
      </div>
    );

    const defaultMenu = (
      <div
        ref={dropdownRef}
        className={classNames('soui-tree-select-dropdown', popupClassName)}
        style={dropdownStyle}
        role="listbox"
      >
        {dropdownRender ? dropdownRender(menuContent as React.ReactElement) : menuContent}
      </div>
    );

    return ReactDOM.createPortal(
      <div ref={(el) => { if (el) applyConfigProviderVars(el); }}>
        {defaultMenu}
      </div>,
      document.body,
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={wrapperCls}
      style={mergedStyle}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      <div className="soui-tree-select-selector" onClick={toggleOpen}>
        {renderSelectorContent()}
      </div>

      {showClear && (
        <span
          className="soui-tree-select-clear"
          onClick={handleClear}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          aria-label="清除"
          tabIndex={-1}
        >
          <Icon name="Close" size={12} theme="outline" />
        </span>
      )}

      <span className="soui-tree-select-arrow">
        {suffixIcon !== undefined ? suffixIcon : <Icon name="Down" size={12} theme="outline" />}
      </span>

      {renderDropdown()}
    </div>
  );
});

TreeSelect.displayName = 'TreeSelect';

// ==================== showCheckedStrategy ====================

/** Expand compressed values back to the full internal selection set.
 *  For SHOW_PARENT/SHOW_CHILD, if a non-leaf value is present, all its
 *  descendants are also considered selected so the tree checkboxes render
 *  correctly and interactions stay consistent.
 */
function expandValue(
  values: (string | number)[],
  strategy: TreeSelectShowCheckedStrategy,
  flatOptions: TreeSelectOption[],
  fieldNames?: TreeSelectFieldNames,
): (string | number)[] {
  if (strategy === 'SHOW_ALL' || values.length === 0) return values;

  const expanded = new Set(values);
  for (const val of values) {
    const opt = flatOptions.find((o) => getOptValue(o, fieldNames) === val);
    if (opt && !isLeafOpt(opt, fieldNames)) {
      const desc = getAllDescendantValues(opt, fieldNames);
      desc.forEach((v) => expanded.add(v));
    }
  }
  return Array.from(expanded);
}

function applyShowCheckedStrategy(
  values: (string | number)[],
  strategy: TreeSelectShowCheckedStrategy,
  parentMap: Map<string | number, string | number | undefined>,
  flatOptions: TreeSelectOption[],
  fieldNames?: TreeSelectFieldNames,
): (string | number)[] {
  if (strategy === 'SHOW_ALL') return values;

  if (strategy === 'SHOW_PARENT') {
    // Helper: check if a node is "fully selected" — all its leaf descendants are in values.
    const isFullySelected = (opt: TreeSelectOption): boolean => {
      const leaves = getLeafValues(opt, fieldNames);
      return leaves.length > 0 && leaves.every((lv) => values.includes(lv));
    };

    // Find the nearest fully-selected ancestor for a value.
    // Only hide a child when its parent (or higher ancestor) is fully checked.
    return values.filter((v) => {
      let parentVal = parentMap.get(v);
      while (parentVal !== undefined) {
        if (values.includes(parentVal)) {
          const parentOpt = flatOptions.find((o) => getOptValue(o, fieldNames) === parentVal);
          if (parentOpt && isFullySelected(parentOpt)) return false;
        }
        parentVal = parentMap.get(parentVal);
      }
      return true;
    });
  }

  if (strategy === 'SHOW_CHILD') {
    // Only keep leaf nodes
    return values.filter((v) => {
      const opt = flatOptions.find((o) => getOptValue(o, fieldNames) === v);
      return opt ? isLeafOpt(opt, fieldNames) : true;
    });
  }

  return values;
}

export default TreeSelect;
