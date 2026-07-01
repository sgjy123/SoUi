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
export type TreeSelectPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

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
  /** 是否为叶子节点（用于异步加载场景） */
  isLeaf?: boolean;
  /** 自定义 key */
  key?: string | number;
  /** 节点图标 */
  icon?: React.ReactNode;
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

export interface LabeledValue {
  value: string | number;
  label: React.ReactNode;
}

export type TreeSelectValue = string | number | (string | number)[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'placeholder' | 'value'> {
  /** 可选项数据 */
  treeData?: TreeSelectOption[];
  /** 指定选中的值（受控） */
  value?: TreeSelectValue;
  /** 默认选中的值 */
  defaultValue?: TreeSelectValue;
  /** 选中变化回调 */
  onChange?: (value: any, label?: any, extra?: any) => void;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示复选框（启用勾选模式） */
  treeCheckable?: boolean;
  /** 多选勾选时显示策略 */
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
  /** 下拉菜单自定义样式 */
  dropdownStyle?: React.CSSProperties;
  /** 控制下拉菜单显隐（受控） */
  open?: boolean;
  /** 默认下拉菜单显隐 */
  defaultOpen?: boolean;
  /** 下拉菜单展开/收起回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 下拉菜单位置 */
  placement?: TreeSelectPlacement;
  /** 是否显示树连接线 */
  treeLine?: boolean;
  /** 是否显示节点图标 */
  treeIcon?: boolean | ((node: TreeSelectOption) => React.ReactNode);
  /** 自定义节点标题渲染 */
  treeTitleRender?: (node: TreeSelectOption) => React.ReactNode;
  /** 自定义标签渲染 */
  tagRender?: (props: { label: React.ReactNode; value: string | number; onClose: () => void }) => React.ReactNode;
  /** 是否显示箭头图标 */
  showArrow?: boolean;
  /** 选中后是否自动清空搜索值 */
  autoClearSearchValue?: boolean;
  /** 是否把每个选项的 label 包装到 value 中 */
  labelInValue?: boolean;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 选中回调 */
  onSelect?: (value: string | number, node: TreeSelectOption) => void;
  /** 取消选中回调 */
  onDeselect?: (value: string | number, node: TreeSelectOption) => void;
  /** 下拉菜单自定义类名 */
  popupClassName?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Theme Hooks ====================

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

// ==================== CSS Variables ====================

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

// ==================== Field Helpers ====================

function getField<T>(opt: TreeSelectOption, key: string | undefined, defaultKey: keyof TreeSelectOption): T {
  return (key ? opt[key] : opt[defaultKey]) as T;
}

function getOptLabel(opt: TreeSelectOption, fn?: TreeSelectFieldNames): React.ReactNode {
  return getField<React.ReactNode>(opt, fn?.label, 'title');
}

function getOptValue(opt: TreeSelectOption, fn?: TreeSelectFieldNames): string | number {
  return getField<string | number>(opt, fn?.value, 'value');
}

function getOptChildren(opt: TreeSelectOption, fn?: TreeSelectFieldNames): TreeSelectOption[] | undefined {
  return getField<TreeSelectOption[] | undefined>(opt, fn?.children, 'children');
}

function hasOptChildren(opt: TreeSelectOption, fn?: TreeSelectFieldNames): boolean {
  const c = getOptChildren(opt, fn);
  return Array.isArray(c) && c.length > 0;
}

function isLeafOpt(opt: TreeSelectOption, fn?: TreeSelectFieldNames): boolean {
  if (opt.isLeaf === true) return true;
  if (opt.isLeaf === false) return false;
  return !hasOptChildren(opt, fn);
}

function getLabelStr(opt: TreeSelectOption, fn?: TreeSelectFieldNames): React.ReactNode {
  const l = getOptLabel(opt, fn);
  return l !== undefined ? l : String(getOptValue(opt, fn));
}

// ==================== Tree Traversal ====================

function findOption(
  data: TreeSelectOption[],
  val: string | number,
  fn?: TreeSelectFieldNames,
): TreeSelectOption | undefined {
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

function buildParentMap(
  data: TreeSelectOption[],
  fn?: TreeSelectFieldNames,
  parent?: string | number,
): Map<string | number, string | number | undefined> {
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

function getAllNodes(data: TreeSelectOption[], fn?: TreeSelectFieldNames): TreeSelectOption[] {
  const result: TreeSelectOption[] = [];
  const walk = (nodes: TreeSelectOption[]) => {
    for (const n of nodes) {
      result.push(n);
      const ch = getOptChildren(n, fn);
      if (ch) walk(ch);
    }
  };
  walk(data);
  return result;
}

function collectAllKeys(data: TreeSelectOption[], fn?: TreeSelectFieldNames): (string | number)[] {
  return getAllNodes(data, fn).map((n) => getOptValue(n, fn));
}

function getLeafValues(opt: TreeSelectOption, fn?: TreeSelectFieldNames): (string | number)[] {
  if (isLeafOpt(opt, fn)) return [getOptValue(opt, fn)];
  return (getOptChildren(opt, fn) || []).flatMap((c) => getLeafValues(c, fn));
}

function isNodeDisabled(opt: TreeSelectOption): boolean {
  return opt.disabled === true;
}

function getSelectableLeafValues(opt: TreeSelectOption, fn?: TreeSelectFieldNames): (string | number)[] {
  if (isLeafOpt(opt, fn)) return isNodeDisabled(opt) ? [] : [getOptValue(opt, fn)];
  return (getOptChildren(opt, fn) || []).flatMap((c) => getSelectableLeafValues(c, fn));
}

function isNodeFullySelected(opt: TreeSelectOption, selectedSet: Set<string | number>, fn?: TreeSelectFieldNames): boolean {
  const leaves = getSelectableLeafValues(opt, fn);
  if (leaves.length === 0) return selectedSet.has(getOptValue(opt, fn));
  return leaves.every((v) => selectedSet.has(v));
}

// ==================== Value Helpers ====================

function normalizeValueList(value: TreeSelectValue | undefined): (string | number)[] {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'object' && v !== null ? v.value : v)).filter((v) => v !== undefined);
  }
  if (typeof value === 'object') return [(value as LabeledValue).value];
  return [value];
}

function expandValue(
  values: (string | number)[],
  strategy: TreeSelectShowCheckedStrategy,
  data: TreeSelectOption[],
  fn?: TreeSelectFieldNames,
): (string | number)[] {
  if (strategy === 'SHOW_ALL' || values.length === 0) return values.slice();
  const result = new Set(values);
  for (const val of values) {
    const opt = findOption(data, val, fn);
    if (opt && !isLeafOpt(opt, fn)) {
      getLeafValues(opt, fn).forEach((v) => result.add(v));
    }
  }
  return Array.from(result);
}

function compressValue(
  selectedSet: Set<string | number>,
  strategy: TreeSelectShowCheckedStrategy,
  data: TreeSelectOption[],
  fn?: TreeSelectFieldNames,
): (string | number)[] {
  if (strategy === 'SHOW_ALL') return Array.from(selectedSet);

  if (strategy === 'SHOW_CHILD') {
    return Array.from(selectedSet).filter((v) => {
      const opt = findOption(data, v, fn);
      return !opt || isLeafOpt(opt, fn);
    });
  }

  // SHOW_PARENT
  const allNodes = getAllNodes(data, fn);
  const parentMap = buildParentMap(data, fn);
  const fullySelected = new Set<string | number>();
  allNodes.forEach((node) => {
    if (isNodeFullySelected(node, selectedSet, fn)) {
      fullySelected.add(getOptValue(node, fn));
    }
  });

  return Array.from(fullySelected).filter((v) => {
    let parentVal = parentMap.get(v);
    while (parentVal !== undefined) {
      if (fullySelected.has(parentVal)) return false;
      parentVal = parentMap.get(parentVal);
    }
    return true;
  });
}

function formatValue(
  rawValues: (string | number)[],
  labelInValue: boolean,
  multiple: boolean,
  data: TreeSelectOption[],
  fn?: TreeSelectFieldNames,
): any {
  const labels = rawValues.map((v) => {
    const opt = findOption(data, v, fn);
    return opt ? getLabelStr(opt, fn) : String(v);
  });
  if (labelInValue) {
    const labeled = rawValues.map((v, i) => ({ value: v, label: labels[i] }));
    return multiple ? labeled : labeled[0];
  }
  if (multiple) return rawValues;
  return rawValues[0];
}

function formatValueWithLabel(
  rawValues: (string | number)[],
  data: TreeSelectOption[],
  fn?: TreeSelectFieldNames,
): any[] {
  return rawValues.map((v) => {
    const opt = findOption(data, v, fn);
    return opt ? getLabelStr(opt, fn) : String(v);
  });
}

// ==================== Search Helpers ====================

function createSearchFilter(
  searchValue: string,
  treeNodeFilterProp: 'title' | 'value',
  filterTreeNode: TreeSelectProps['filterTreeNode'],
  fn?: TreeSelectFieldNames,
): (opt: TreeSelectOption) => boolean {
  const keyword = searchValue.toLowerCase();
  return (opt: TreeSelectOption) => {
    if (filterTreeNode) return filterTreeNode(searchValue, opt);
    const prop = treeNodeFilterProp === 'title' ? getOptLabel(opt, fn) : getOptValue(opt, fn);
    const str = typeof prop === 'string' ? prop : String(prop);
    return str.toLowerCase().includes(keyword);
  };
}

function nodeOrDescendantMatches(opt: TreeSelectOption, filter: (opt: TreeSelectOption) => boolean, fn?: TreeSelectFieldNames): boolean {
  if (filter(opt)) return true;
  return (getOptChildren(opt, fn) || []).some((c) => nodeOrDescendantMatches(c, filter, fn));
}

function getAncestorKeys(
  data: TreeSelectOption[],
  targetValues: Set<string | number>,
  fn?: TreeSelectFieldNames,
): (string | number)[] {
  const keys: (string | number)[] = [];
  const walk = (nodes: TreeSelectOption[], parentKey?: string | number) => {
    for (const n of nodes) {
      const val = getOptValue(n, fn);
      const ch = getOptChildren(n, fn);
      if (ch) {
        const childTargets = ch.some((c) => targetValues.has(getOptValue(c, fn)) || nodeHasDescendantMatch(c, targetValues, fn));
        if (childTargets) {
          keys.push(val);
          walk(ch, val);
        }
      }
    }
  };
  walk(data);
  return keys;
}

function nodeHasDescendantMatch(
  opt: TreeSelectOption,
  targetValues: Set<string | number>,
  fn?: TreeSelectFieldNames,
): boolean {
  if (targetValues.has(getOptValue(opt, fn))) return true;
  return (getOptChildren(opt, fn) || []).some((c) => nodeHasDescendantMatch(c, targetValues, fn));
}

// ==================== Visible Nodes ====================

interface FlatNode {
  node: TreeSelectOption;
  level: number;
  parent?: TreeSelectOption;
}

function flattenVisibleNodes(
  data: TreeSelectOption[],
  expandedKeys: (string | number)[],
  searchFilter: ((opt: TreeSelectOption) => boolean) | null,
  fn?: TreeSelectFieldNames,
  level = 0,
  parent?: TreeSelectOption,
  result: FlatNode[] = [],
): FlatNode[] {
  for (const node of data) {
    const matches = searchFilter ? nodeOrDescendantMatches(node, searchFilter, fn) : true;
    if (!matches) continue;
    result.push({ node, level, parent });
    const val = getOptValue(node, fn);
    const ch = getOptChildren(node, fn);
    if (ch && expandedKeys.includes(val)) {
      flattenVisibleNodes(ch, expandedKeys, searchFilter, fn, level + 1, node, result);
    }
  }
  return result;
}

// ==================== Component ====================

const TreeSelect = forwardRef<TreeSelectRef, TreeSelectProps>((props, ref) => {
  const {
    treeData = [],
    value: valueProp,
    defaultValue,
    onChange,
    multiple: multipleProp = false,
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
    treeNodeFilterProp = 'title',
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
    dropdownStyle,
    open: openProp,
    defaultOpen = false,
    onDropdownVisibleChange,
    placement = 'bottomLeft',
    treeLine = false,
    treeIcon = false,
    treeTitleRender,
    tagRender,
    showArrow = true,
    autoClearSearchValue = true,
    labelInValue = false,
    onSearch,
    onSelect,
    onDeselect,
    popupClassName,
    className,
    style,
    ...rest
  } = props;

  const isMultiple = multipleProp || treeCheckable;

  // Theme
  const treeSelectTheme = useComponentTheme('TreeSelect');
  const globalTheme = useGlobalTheme();
  const mergedSize = sizeProp || 'middle';

  // Open state
  const isOpenControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isOpen = isOpenControlled ? openProp! : innerOpen;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setInnerOpen(nextOpen);
      onDropdownVisibleChange?.(nextOpen);
      if (nextOpen) {
        setSearchValue('');
        setActiveIndex(-1);
      }
    },
    [isOpenControlled, onDropdownVisibleChange],
  );

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpenState(!isOpen);
  }, [disabled, isOpen, setOpenState]);

  // Value state
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<(string | number)[]>(() => normalizeValueList(defaultValue));
  const selectedValues = useMemo(
    () => (isControlled ? normalizeValueList(valueProp) : innerValue),
    [isControlled, valueProp, innerValue],
  );

  // Expanded state
  const isTreeExpandedControlled = treeExpandedKeysProp !== undefined;
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<(string | number)[]>(() => {
    if (treeDefaultExpandAll) return collectAllKeys(treeData, fieldNames);
    return treeDefaultExpandedKeys || [];
  });
  const expandedKeys = isTreeExpandedControlled ? treeExpandedKeysProp! : innerExpandedKeys;

  // Search state
  const [searchValue, setSearchValue] = useState('');
  const [loadingKeys, setLoadingKeys] = useState<Set<string | number>>(new Set());
  const [activeIndex, setActiveIndex] = useState(-1);

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, right: 0, bottom: 0, width: 0 });

  useImperativeHandle(ref, () => ({
    focus: () => searchInputRef.current?.focus(),
    blur: () => {
      searchInputRef.current?.blur();
      setOpenState(false);
    },
  }));

  // Derived sets
  const selectedSet = useMemo(() => {
    if (treeCheckable) {
      return new Set(expandValue(selectedValues, showCheckedStrategy, treeData, fieldNames));
    }
    return new Set(selectedValues);
  }, [selectedValues, treeCheckable, showCheckedStrategy, treeData, fieldNames]);

  const displayValues = useMemo(() => {
    if (treeCheckable) {
      return compressValue(selectedSet, showCheckedStrategy, treeData, fieldNames);
    }
    return selectedValues.slice();
  }, [selectedValues, selectedSet, treeCheckable, showCheckedStrategy, treeData, fieldNames]);

  // Search handling
  const searchFilter = useMemo(() => {
    if (!searchValue || !showSearch) return null;
    return createSearchFilter(searchValue, treeNodeFilterProp, filterTreeNode, fieldNames);
  }, [searchValue, showSearch, treeNodeFilterProp, filterTreeNode, fieldNames]);

  // Auto expand ancestors of search matches
  useEffect(() => {
    if (!searchValue || !isOpen) return;
    if (!isTreeExpandedControlled) {
      const matchingValues = new Set<string | number>();
      const walk = (nodes: TreeSelectOption[]) => {
        for (const n of nodes) {
          if (searchFilter && searchFilter(n)) matchingValues.add(getOptValue(n, fieldNames));
          const ch = getOptChildren(n, fieldNames);
          if (ch) walk(ch);
        }
      };
      walk(treeData);
      const ancestorKeys = getAncestorKeys(treeData, matchingValues, fieldNames);
      setInnerExpandedKeys((prev) => Array.from(new Set([...prev, ...ancestorKeys])));
    }
  }, [searchValue, isOpen, isTreeExpandedControlled, treeData, fieldNames, searchFilter]);

  // Visible flat list for keyboard navigation
  const visibleNodes = useMemo(() => {
    return flattenVisibleNodes(treeData, expandedKeys, searchFilter, fieldNames);
  }, [treeData, expandedKeys, searchFilter, fieldNames]);

  // Reset active index when visible list changes
  useEffect(() => {
    setActiveIndex((prev) => {
      if (prev >= visibleNodes.length) return visibleNodes.length - 1;
      return prev;
    });
  }, [visibleNodes.length]);

  // Loading state cleanup when data changes
  useEffect(() => {
    if (loadingKeys.size === 0) return;
    setLoadingKeys((prev) => {
      const next = new Set(prev);
      prev.forEach((key) => {
        const opt = findOption(treeData, key, fieldNames);
        if (!opt) return;
        if (hasOptChildren(opt, fieldNames) || opt.isLeaf === true) next.delete(key);
      });
      return next;
    });
  }, [treeData, fieldNames]);

  // Dropdown positioning
  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const isTop = placement.startsWith('top');
    const isRight = placement.endsWith('Right');
    setDropdownPos({
      top: isTop ? 0 : rect.bottom + 4,
      left: isRight ? 0 : rect.left,
      right: isRight ? window.innerWidth - rect.right : 0,
      bottom: isTop ? window.innerHeight - rect.top + 4 : 0,
      width: rect.width,
    });
  }, [placement]);

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

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(t) && dropdownRef.current && !dropdownRef.current.contains(t)) {
        setOpenState(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpenState]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  // Toggle expand
  const toggleExpand = useCallback(
    (key: string | number) => {
      const idx = expandedKeys.indexOf(key);
      const next = idx >= 0 ? expandedKeys.filter((k) => k !== key) : [...expandedKeys, key];
      if (!isTreeExpandedControlled) setInnerExpandedKeys(next);
      onTreeExpand?.(next);
    },
    [expandedKeys, isTreeExpandedControlled, onTreeExpand],
  );

  // Label lookup
  const getLabelByValue = useCallback(
    (val: string | number): React.ReactNode => {
      const opt = findOption(treeData, val, fieldNames);
      return opt ? getLabelStr(opt, fieldNames) : String(val);
    },
    [treeData, fieldNames],
  );

  // Change handler
  const triggerChange = useCallback(
    (nextRawValues: (string | number)[], eventInfo?: { selected?: boolean; node?: TreeSelectOption }) => {
      if (!isControlled) setInnerValue(nextRawValues);
      const output = formatValue(nextRawValues, labelInValue, isMultiple, treeData, fieldNames);
      const labels = formatValueWithLabel(nextRawValues, treeData, fieldNames);
      onChange?.(output, labels, eventInfo);

      if (eventInfo?.node) {
        const val = getOptValue(eventInfo.node, fieldNames);
        if (eventInfo.selected) {
          onSelect?.(val, eventInfo.node);
        } else {
          onDeselect?.(val, eventInfo.node);
        }
      }
    },
    [isControlled, labelInValue, isMultiple, treeData, fieldNames, onChange, onSelect, onDeselect],
  );

  // Selection
  const handleSelect = useCallback(
    (node: TreeSelectOption) => {
      if (disabled || isNodeDisabled(node) || node.selectable === false) return;
      const val = getOptValue(node, fieldNames);

      if (treeCheckable) {
        const targetLeaves = getSelectableLeafValues(node, fieldNames);
        const allSelected = targetLeaves.length > 0 && targetLeaves.every((v) => selectedSet.has(v));
        const nextSet = new Set(selectedSet);
        if (allSelected) {
          targetLeaves.forEach((v) => nextSet.delete(v));
          nextSet.delete(val);
        } else {
          targetLeaves.forEach((v) => nextSet.add(v));
          if (!isLeafOpt(node, fieldNames)) nextSet.add(val);
        }
        const nextRaw = compressValue(nextSet, showCheckedStrategy, treeData, fieldNames);
        triggerChange(nextRaw, { selected: !allSelected, node });
      } else if (isMultiple) {
        const idx = selectedValues.indexOf(val);
        const nextRaw = idx >= 0 ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
        triggerChange(nextRaw, { selected: idx < 0, node });
      } else {
        triggerChange([val], { selected: true, node });
        setOpenState(false);
      }

      if (autoClearSearchValue) setSearchValue('');
      searchInputRef.current?.focus();
    },
    [
      disabled,
      treeCheckable,
      isMultiple,
      selectedSet,
      selectedValues,
      showCheckedStrategy,
      treeData,
      fieldNames,
      triggerChange,
      autoClearSearchValue,
      setOpenState,
    ],
  );

  // Clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextRaw: (string | number)[] = [];
      if (!isControlled) setInnerValue(nextRaw);
      setSearchValue('');
      const output = formatValue(nextRaw, labelInValue, isMultiple, treeData, fieldNames);
      const labels = formatValueWithLabel(nextRaw, treeData, fieldNames);
      onChange?.(output, labels);
      onClear?.();
      searchInputRef.current?.focus();
    },
    [isControlled, labelInValue, isMultiple, treeData, fieldNames, onChange, onClear],
  );

  // Remove tag
  const handleRemoveTag = useCallback(
    (val: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      let nextRaw: (string | number)[];
      if (treeCheckable) {
        const opt = findOption(treeData, val, fieldNames);
        const descValues = opt ? getSelectableLeafValues(opt, fieldNames) : [val];
        const nextSet = new Set(selectedSet);
        descValues.forEach((v) => nextSet.delete(v));
        nextSet.delete(val);
        nextRaw = compressValue(nextSet, showCheckedStrategy, treeData, fieldNames);
      } else {
        nextRaw = selectedValues.filter((v) => v !== val);
      }
      const node = findOption(treeData, val, fieldNames);
      triggerChange(nextRaw, node ? { selected: false, node } : undefined);
    },
    [treeCheckable, selectedSet, selectedValues, showCheckedStrategy, treeData, fieldNames, triggerChange],
  );

  // Search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      onSearch?.(val);
      if (!isOpen) setOpenState(true);
    },
    [isOpen, setOpenState, onSearch],
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
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          setActiveIndex((prev) => {
            let next = prev + 1;
            while (next < visibleNodes.length && isNodeDisabled(visibleNodes[next].node)) next++;
            return next < visibleNodes.length ? next : prev;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          setActiveIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && isNodeDisabled(visibleNodes[next].node)) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          const active = visibleNodes[activeIndex];
          if (!active) return;
          const val = getOptValue(active.node, fieldNames);
          if (hasOptChildren(active.node, fieldNames) && !expandedKeys.includes(val)) {
            toggleExpand(val);
          } else if (loadData && !isLeafOpt(active.node, fieldNames) && active.node.isLeaf !== true) {
            handleLoadData(active.node);
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          const active = visibleNodes[activeIndex];
          if (!active) return;
          const val = getOptValue(active.node, fieldNames);
          if (hasOptChildren(active.node, fieldNames) && expandedKeys.includes(val)) {
            toggleExpand(val);
          } else if (active.parent) {
            const parentVal = getOptValue(active.parent, fieldNames);
            const idx = visibleNodes.findIndex((n) => getOptValue(n.node, fieldNames) === parentVal);
            if (idx >= 0) setActiveIndex(idx);
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          if (activeIndex >= 0 && activeIndex < visibleNodes.length) {
            handleSelect(visibleNodes[activeIndex].node);
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
            const last = selectedValues[selectedValues.length - 1];
            handleRemoveTag(last, e as any);
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          if (!isOpen) setOpenState(true);
          setActiveIndex(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          if (!isOpen) setOpenState(true);
          setActiveIndex(visibleNodes.length - 1);
          break;
        }
      }
    },
    [
      disabled,
      isOpen,
      setOpenState,
      visibleNodes,
      activeIndex,
      expandedKeys,
      toggleExpand,
      loadData,
      handleLoadData,
      handleSelect,
      isMultiple,
      searchValue,
      selectedValues,
      handleRemoveTag,
    ],
  );

  // Scroll active node into view
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && dropdownRef.current) {
      const activeEls = dropdownRef.current.querySelectorAll('.soui-tree-select-treenode-active');
      if (activeEls[activeIndex]) {
        activeEls[activeIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, isOpen]);

  // CSS vars
  const cssVars = buildCssVars(treeSelectTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Computed
  const hasValue = selectedValues.length > 0;
  const showClear = allowClear && hasValue && !disabled;
  const showArrowIcon = showArrow && !showClear;

  // Check state
  const getCheckState = useCallback(
    (opt: TreeSelectOption): 'all' | 'half' | 'none' => {
      if (!treeCheckable) return 'none';
      const leaves = getSelectableLeafValues(opt, fieldNames);
      if (leaves.length === 0) return selectedSet.has(getOptValue(opt, fieldNames)) ? 'all' : 'none';
      const selectedCount = leaves.filter((v) => selectedSet.has(v)).length;
      if (selectedCount === 0) return 'none';
      if (selectedCount === leaves.length) return 'all';
      return 'half';
    },
    [treeCheckable, selectedSet, fieldNames],
  );

  // Render tree node
  const renderTreeNode = (opt: TreeSelectOption, level: number, parent?: TreeSelectOption): React.ReactNode => {
    const val = getOptValue(opt, fieldNames);
    const label = getOptLabel(opt, fieldNames);
    const children = getOptChildren(opt, fieldNames);
    const leaf = isLeafOpt(opt, fieldNames);
    const hasChildren = hasOptChildren(opt, fieldNames);
    const isExpanded = expandedKeys.includes(val);
    const isLoading = loadingKeys.has(val);
    const isDisabled = isNodeDisabled(opt);
    const checkState = getCheckState(opt);
    const isSelected = !treeCheckable && selectedSet.has(val);
    const activeNode = visibleNodes[activeIndex]?.node;
    const isActive = activeNode ? getOptValue(activeNode, fieldNames) === val : false;
    const indent = level * 18;

    const switcherNode = (
      <span
        className={classNames('soui-tree-select-switcher', {
          'soui-tree-select-switcher-open': isExpanded,
          'soui-tree-select-switcher-close': !isExpanded && (hasChildren || (loadData && opt.isLeaf === false)),
          'soui-tree-select-switcher-noop': leaf && !(loadData && opt.isLeaf === false),
        })}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) toggleExpand(val);
          else if (loadData && opt.isLeaf === false) handleLoadData(opt);
        }}
      >
        {isLoading ? (
          <Icon name="Loading" size={12} theme="outline" />
        ) : leaf && !(loadData && opt.isLeaf === false) ? null : switcherIcon !== undefined ? (
          switcherIcon
        ) : (
          <Icon name="Right" size={10} theme="outline" />
        )}
      </span>
    );

    const checkboxNode = treeCheckable ? (
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
    ) : null;

    const iconNode = treeIcon ? (
      <span className="soui-tree-select-node-icon">
        {typeof treeIcon === 'function' ? treeIcon(opt) : opt.icon}
      </span>
    ) : null;

    const titleNode = treeTitleRender ? treeTitleRender(opt) : label;

    return (
      <React.Fragment key={val}>
        <div
          className={classNames('soui-tree-select-treenode', {
            'soui-tree-select-treenode-selected': isSelected,
            'soui-tree-select-treenode-checked': checkState === 'all',
            'soui-tree-select-treenode-half-checked': checkState === 'half',
            'soui-tree-select-treenode-disabled': isDisabled,
            'soui-tree-select-treenode-active': isActive,
          })}
          style={{ paddingLeft: indent }}
        >
          {switcherNode}
          {checkboxNode}
          {iconNode}
          <span
            className={classNames('soui-tree-select-node-content', {
              'soui-tree-select-node-content-selected': isSelected,
              'soui-tree-select-node-content-disabled': isDisabled,
            })}
            onClick={() => !isDisabled && handleSelect(opt)}
            title={typeof titleNode === 'string' ? titleNode : undefined}
          >
            {titleNode}
          </span>
        </div>
        {isExpanded && (hasChildren || (loadData && opt.isLeaf === false)) && (
          <div className={classNames('soui-tree-select-children', { 'soui-tree-select-line': treeLine })}>
            {children?.map((child) => renderTreeNode(child, level + 1, opt))}
          </div>
        )}
      </React.Fragment>
    );
  };

  // Render selected content
  const renderSelectorContent = () => {
    if (isMultiple) {
      const visibleValues = maxTagCount !== undefined ? displayValues.slice(0, maxTagCount) : displayValues;
      const overflowCount = maxTagCount !== undefined ? Math.max(0, displayValues.length - maxTagCount) : 0;

      return (
        <div className="soui-tree-select-selection-overflow">
          {visibleValues.map((val) => {
            const label = getLabelByValue(val);
            const onClose = () => handleRemoveTag(val, { stopPropagation: () => {} } as any);
            if (tagRender) {
              return <React.Fragment key={val}>{tagRender({ label, value: val, onClose })}</React.Fragment>;
            }
            return (
              <span className="soui-tree-select-selection-item" key={val}>
                <span className="soui-tree-select-selection-item-content">{label}</span>
                <span
                  className="soui-tree-select-selection-item-remove"
                  onClick={(e) => handleRemoveTag(val, e)}
                  role="button"
                  aria-label={`移除 ${label}`}
                >
                  <Icon name="Close" size={10} theme="outline" />
                </span>
              </span>
            );
          })}
          {overflowCount > 0 && (
            <span className="soui-tree-select-selection-item soui-tree-select-selection-item-overflow">
              <span className="soui-tree-select-selection-item-content">
                {typeof maxTagPlaceholder === 'function'
                  ? maxTagPlaceholder(displayValues.slice(maxTagCount!))
                  : `+${overflowCount}`}
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
    const displayText = selectedValues.length > 0 ? getLabelByValue(selectedValues[0]) : null;
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
              placeholder={hasValue ? (typeof displayText === 'string' ? displayText : '') : typeof placeholder === 'string' ? placeholder : ''}
            />
          </div>
        ) : null}
        {displayText && !(showSearch && isOpen && searchValue) ? (
          <span className="soui-tree-select-selection-item" title={typeof displayText === 'string' ? displayText : undefined}>
            {displayText}
          </span>
        ) : null}
        {!hasValue && !searchValue && placeholder && (
          <span className="soui-tree-select-selection-placeholder">{placeholder}</span>
        )}
      </>
    );
  };

  // Dropdown style
  const dropdownInlineStyle: React.CSSProperties = {
    position: 'fixed',
    ...(placement.startsWith('top') ? { bottom: dropdownPos.bottom } : { top: dropdownPos.top }),
    ...(placement.endsWith('Right') ? { right: dropdownPos.right } : { left: dropdownPos.left }),
    minWidth: Math.max(dropdownPos.width, 120),
    ...dropdownStyle,
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
        className={classNames('soui-tree-select-dropdown', `soui-tree-select-dropdown-${placement}`, popupClassName)}
        style={dropdownInlineStyle}
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

  const wrapperCls = classNames(
    'soui-tree-select',
    `soui-tree-select-${mergedSize}`,
    `soui-tree-select-${placement}`,
    {
      'soui-tree-select-open': isOpen,
      'soui-tree-select-focused': isOpen,
      'soui-tree-select-disabled': disabled,
      'soui-tree-select-multiple': isMultiple,
      'soui-tree-select-single': !isMultiple,
      'soui-tree-select-show-search': showSearch,
      'soui-tree-select-show-arrow': showArrow,
      'soui-tree-select-tree-checkable': treeCheckable,
      [`soui-tree-select-status-${status}`]: !!status && !disabled,
    },
    className,
  );

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

      {showArrowIcon && (
        <span className="soui-tree-select-arrow">
          {suffixIcon !== undefined ? suffixIcon : <Icon name="Down" size={12} theme="outline" />}
        </span>
      )}

      {renderDropdown()}
    </div>
  );
});

TreeSelect.displayName = 'TreeSelect';

export default TreeSelect;
