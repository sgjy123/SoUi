import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export type TreeSelectSize = 'large' | 'middle' | 'small';
export type TreeSelectStatus = 'error' | 'warning';
export type TreeSelectShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

export interface TreeSelectOption {
  /** 节点显示文本 */
  label?: React.ReactNode;
  /** 节点值 */
  value: string | number;
  /** 子节点 */
  children?: TreeSelectOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点（用于异步加载场景） */
  isLeaf?: boolean;
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

export interface TreeSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue' | 'placeholder'> {
  /** 树形数据 */
  treeData?: TreeSelectOption[];
  /** 指定选中的值（受控） */
  value?: string | number | (string | number)[];
  /** 默认选中的值 */
  defaultValue?: string | number | (string | number)[];
  /** 选中值变化回调 */
  onChange?: (value: any, option?: TreeSelectOption | TreeSelectOption[]) => void;
  /** 选中节点时的回调 */
  onSelect?: (value: string | number, option: TreeSelectOption) => void;
  /** 取消选中节点时的回调 */
  onDeselect?: (value: string | number, option: TreeSelectOption) => void;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否启用节点勾选 */
  treeCheckable?: boolean;
  /** 勾选节点是否完全受控（不联动父子节点） */
  treeCheckStrictly?: boolean;
  /** 是否启用搜索 */
  showSearch?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 占位文本 */
  placeholder?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: TreeSelectSize;
  /** 校验状态 */
  status?: TreeSelectStatus;
  /** 默认展开所有树节点 */
  treeDefaultExpandAll?: boolean;
  /** 默认展开的树节点 key 列表 */
  treeDefaultExpandedKeys?: React.Key[];
  /** 受控展开的树节点 key 列表 */
  treeExpandedKeys?: React.Key[];
  /** 展开节点变化回调 */
  onTreeExpand?: (expandedKeys: React.Key[]) => void;
  /** 异步加载子节点数据 */
  loadData?: (node: TreeSelectOption) => Promise<void> | void;
  /** 自定义字段名映射 */
  fieldNames?: TreeSelectFieldNames;
  /** 搜索时过滤的属性名，默认为 label */
  treeNodeFilterProp?: string;
  /** 下拉菜单宽度是否与选择器相同 */
  dropdownMatchSelectWidth?: boolean | number;
  /** 多选时最多显示的标签数量，超出以 +N 展示 */
  maxTagCount?: number;
  /** 多选时隐藏标签的占位 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: (string | number)[]) => React.ReactNode);
  /** 自定义标签渲染 */
  tagRender?: (props: { label: React.ReactNode; value: string | number; onClose: () => void }) => React.ReactNode;
  /** 勾选回填策略 */
  showCheckedStrategy?: TreeSelectShowCheckedStrategy;
  /** 自定义节点标题渲染 */
  treeTitleRender?: (node: TreeSelectOption) => React.ReactNode;
  /** 自定义节点标签属性，用于标签显示 */
  treeNodeLabelProp?: string;
  /** 自定义后缀图标 */
  suffixIcon?: React.ReactNode;
  /** 空数据时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 自定义下拉菜单内容 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  /** 下拉菜单展开/收起回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 控制下拉菜单显隐（受控） */
  open?: boolean;
  /** 默认下拉菜单显隐 */
  defaultOpen?: boolean;
  /** 下拉菜单自定义类名 */
  dropdownClassName?: string;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

interface FlatNode {
  node: TreeSelectOption;
  value: string | number;
  depth: number;
  parent: FlatNode | null;
  children: FlatNode[];
  path: FlatNode[];
}

// ==================== Utils ====================

function getOptionLabel(opt: TreeSelectOption, fn?: TreeSelectFieldNames): React.ReactNode {
  return opt[fn?.label || 'label'];
}
function getOptionValue(opt: TreeSelectOption, fn?: TreeSelectFieldNames): string | number {
  return opt[fn?.value || 'value'];
}
function getOptionChildren(opt: TreeSelectOption, fn?: TreeSelectFieldNames): TreeSelectOption[] | undefined {
  return opt[fn?.children || 'children'];
}
function buildTree(nodes: TreeSelectOption[], fn?: TreeSelectFieldNames, parent: FlatNode | null = null, depth = 0): FlatNode[] {
  return nodes.map((node) => {
    const flat: FlatNode = {
      node,
      value: getOptionValue(node, fn),
      depth,
      parent,
      children: [],
      path: parent ? [...parent.path, parent] : [],
    };
    const children = getOptionChildren(node, fn);
    flat.children = children ? buildTree(children, fn, flat, depth + 1) : [];
    return flat;
  });
}
function addWithDescendants(node: FlatNode, set: Set<React.Key>): void {
  set.add(node.value);
  node.children.forEach((child) => addWithDescendants(child, set));
}
function removeWithDescendants(node: FlatNode, set: Set<React.Key>): void {
  set.delete(node.value);
  node.children.forEach((child) => removeWithDescendants(child, set));
}
function isCheckedNode(node: FlatNode, checkedSet: Set<React.Key>): boolean {
  if (checkedSet.has(node.value)) return true;
  if (node.children.length > 0) return node.children.every((child) => isCheckedNode(child, checkedSet));
  return false;
}
function isHalfCheckedNode(node: FlatNode, checkedSet: Set<React.Key>): boolean {
  if (checkedSet.has(node.value)) return false;
  return node.children.some((child) => isCheckedNode(child, checkedSet) || isHalfCheckedNode(child, checkedSet));
}
function getAllEffectiveCheckedKeys(nodes: FlatNode[], checkedSet: Set<React.Key>): (string | number)[] {
  const result: (string | number)[] = [];
  function walk(list: FlatNode[]) {
    list.forEach((node) => {
      if (isCheckedNode(node, checkedSet)) result.push(node.value);
      walk(node.children);
    });
  }
  walk(nodes);
  return result;
}
function getStrategyValues(
  checkedSet: Set<React.Key>,
  strategy: TreeSelectShowCheckedStrategy,
  tree: FlatNode[],
  valueMap: Map<React.Key, FlatNode>
): (string | number)[] {
  if (strategy === 'SHOW_PARENT') {
    return getAllEffectiveCheckedKeys(tree, checkedSet).filter((key) => {
      const node = valueMap.get(key);
      return !node?.parent || !isCheckedNode(node.parent, checkedSet);
    });
  }
  if (strategy === 'SHOW_CHILD') {
    return getAllEffectiveCheckedKeys(tree, checkedSet).filter((key) => {
      const node = valueMap.get(key);
      return !node?.children.some((child) => isCheckedNode(child, checkedSet));
    });
  }
  return getAllEffectiveCheckedKeys(tree, checkedSet);
}
function buildTreeSelectCssVars(treeSelectTheme: Record<string, any>, globalTheme: Record<string, any>): Record<string, any> {
  const cssVars: Record<string, any> = {};
  const borderRadiusValue = treeSelectTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = treeSelectTheme?.fontSize || globalTheme?.fontSize;
  const controlHeightValue = treeSelectTheme?.controlHeight || globalTheme?.controlHeight;
  if (borderRadiusValue !== undefined) cssVars['--soui-tree-select-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-tree-select-font-size'] = `${fontSizeValue}px`;
  if (controlHeightValue !== undefined) {
    cssVars['--soui-tree-select-control-height-small'] = `${controlHeightValue - 8}px`;
    cssVars['--soui-tree-select-control-height-middle'] = `${controlHeightValue}px`;
    cssVars['--soui-tree-select-control-height-large'] = `${controlHeightValue + 8}px`;
  }
  if (treeSelectTheme?.colorBorder) cssVars['--soui-tree-select-color-border'] = treeSelectTheme.colorBorder;
  if (treeSelectTheme?.colorBorderHover) cssVars['--soui-tree-select-color-border-hover'] = treeSelectTheme.colorBorderHover;
  if (treeSelectTheme?.colorBorderFocus) cssVars['--soui-tree-select-color-border-focus'] = treeSelectTheme.colorBorderFocus;
  if (treeSelectTheme?.colorBg) cssVars['--soui-tree-select-color-bg'] = treeSelectTheme.colorBg;
  if (treeSelectTheme?.colorText) cssVars['--soui-tree-select-color-text'] = treeSelectTheme.colorText;
  if (treeSelectTheme?.colorBgDisabled) cssVars['--soui-tree-select-color-bg-disabled'] = treeSelectTheme.colorBgDisabled;
  if (treeSelectTheme?.colorTextDisabled) cssVars['--soui-tree-select-color-text-disabled'] = treeSelectTheme.colorTextDisabled;
  if (treeSelectTheme?.colorError) cssVars['--soui-tree-select-color-error'] = treeSelectTheme.colorError;
  if (treeSelectTheme?.colorWarning) cssVars['--soui-tree-select-color-warning'] = treeSelectTheme.colorWarning;
  if (treeSelectTheme?.dropdownBg) cssVars['--soui-tree-select-dropdown-bg'] = treeSelectTheme.dropdownBg;
  if (treeSelectTheme?.optionActiveBg) cssVars['--soui-tree-select-option-active-bg'] = treeSelectTheme.optionActiveBg;
  if (treeSelectTheme?.optionSelectedBg) cssVars['--soui-tree-select-option-selected-bg'] = treeSelectTheme.optionSelectedBg;
  if (treeSelectTheme?.tagBg) cssVars['--soui-tree-select-tag-bg'] = treeSelectTheme.tagBg;
  return cssVars;
}

const TREE_SELECT_CSS_VARS = [
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
  '--soui-primary-active-color',
  '--soui-border-radius',
  '--soui-font-size',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  TREE_SELECT_CSS_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

function normalizeValue(v: any): (string | number)[] {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v;
  return [v];
}

function collectExpandedKeys(nodes: FlatNode[], expandedKeys: Set<React.Key>): void {
  nodes.forEach((node) => {
    if (node.children.length > 0) {
      expandedKeys.add(node.value);
      collectExpandedKeys(node.children, expandedKeys);
    }
  });
}

// ==================== TreeSelect ====================

const TreeSelect = forwardRef<TreeSelectRef, TreeSelectProps>((props, ref) => {
  const {
    treeData = [],
    value: valueProp,
    defaultValue,
    onChange,
    onSelect,
    onDeselect,
    multiple = false,
    treeCheckable = false,
    treeCheckStrictly = false,
    showSearch = false,
    allowClear = false,
    placeholder,
    disabled = false,
    size: sizeProp = 'middle',
    status,
    treeDefaultExpandAll = false,
    treeDefaultExpandedKeys,
    treeExpandedKeys,
    onTreeExpand,
    loadData,
    fieldNames,
    treeNodeFilterProp = 'label',
    dropdownMatchSelectWidth = true,
    maxTagCount,
    maxTagPlaceholder,
    tagRender,
    showCheckedStrategy = 'SHOW_CHILD',
    treeTitleRender,
    treeNodeLabelProp = 'label',
    suffixIcon,
    notFoundContent = '暂无数据',
    dropdownRender,
    onDropdownVisibleChange,
    open: openProp,
    defaultOpen,
    dropdownClassName,
    className,
    style,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const treeSelectTheme = useComponentTheme('TreeSelect');
  const globalTheme = useTheme();

  const mergedSize = sizeProp || 'middle';

  // Open state
  const isOpenControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(!!defaultOpen);
  const isOpen = isOpenControlled ? openProp! : innerOpen;

  // Value state
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<(string | number)[]>(() => normalizeValue(defaultValue));
  const selectedValues = isControlled ? normalizeValue(valueProp) : innerValue;

  // Search & expand state
  const [searchValue, setSearchValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loadingKeys, setLoadingKeys] = useState<Set<React.Key>>(new Set());

  const [innerExpandedKeys, setInnerExpandedKeys] = useState<Set<React.Key>>(() => {
    const set = new Set<React.Key>();
    if (treeDefaultExpandAll) {
      const tree = buildTree(treeData, fieldNames);
      collectExpandedKeys(tree, set);
    } else if (treeDefaultExpandedKeys) {
      treeDefaultExpandedKeys.forEach((k) => set.add(k));
    }
    return set;
  });
  const expandedKeys = useMemo(() => {
    if (treeExpandedKeys !== undefined) return new Set(treeExpandedKeys);
    return innerExpandedKeys;
  }, [treeExpandedKeys, innerExpandedKeys]);

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setInnerOpen(nextOpen);
      onDropdownVisibleChange?.(nextOpen);
      if (nextOpen) {
        setSearchValue('');
        setActiveIndex(-1);
      }
    },
    [isOpenControlled, onDropdownVisibleChange]
  );

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpenState(!isOpen);
  }, [disabled, isOpen, setOpenState]);

  const setExpandedKeys = useCallback(
    (nextKeys: Set<React.Key>) => {
      if (treeExpandedKeys === undefined) setInnerExpandedKeys(new Set(nextKeys));
      onTreeExpand?.(Array.from(nextKeys));
    },
    [treeExpandedKeys, onTreeExpand]
  );

  const toggleExpandKey = useCallback(
    (key: React.Key) => {
      const next = new Set(expandedKeys);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      setExpandedKeys(next);
    },
    [expandedKeys, setExpandedKeys]
  );

  // Refs
  const selectRef = useRef<HTMLDivElement>(null);
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

  // Tree structure
  const tree = useMemo(() => buildTree(treeData, fieldNames), [treeData, fieldNames]);
  const valueMap = useMemo(() => {
    const map = new Map<React.Key, FlatNode>();
    function walk(nodes: FlatNode[]) {
      nodes.forEach((node) => {
        map.set(node.value, node);
        walk(node.children);
      });
    }
    walk(tree);
    return map;
  }, [tree]);

  const allNodes = useMemo(() => {
    const result: FlatNode[] = [];
    function walk(nodes: FlatNode[]) {
      nodes.forEach((node) => {
        result.push(node);
        walk(node.children);
      });
    }
    walk(tree);
    return result;
  }, [tree]);

  const visibleNodes = useMemo(() => {
    const result: FlatNode[] = [];
    function walk(nodes: FlatNode[]) {
      nodes.forEach((node) => {
        result.push(node);
        if (expandedKeys.has(node.value)) walk(node.children);
      });
    }
    walk(tree);
    return result;
  }, [tree, expandedKeys]);

  // Checked keys derived from selected values
  const checkedKeys = useMemo(() => {
    const set = new Set<React.Key>();
    if (!treeCheckable) return set;
    selectedValues.forEach((v) => {
      const node = valueMap.get(v);
      if (node) {
        if (treeCheckStrictly) {
          set.add(v);
        } else {
          addWithDescendants(node, set);
        }
      } else {
        set.add(v);
      }
    });
    return set;
  }, [selectedValues, treeCheckable, treeCheckStrictly, valueMap]);

  const displayValues = useMemo(() => {
    if (!treeCheckable || treeCheckStrictly) return selectedValues;
    return getStrategyValues(checkedKeys, showCheckedStrategy, tree, valueMap);
  }, [selectedValues, treeCheckable, treeCheckStrictly, checkedKeys, showCheckedStrategy, tree, valueMap]);

  // Update value
  const updateValue = useCallback(
    (nextValues: (string | number)[], triggerNode?: TreeSelectOption) => {
      if (!isControlled) setInnerValue(nextValues);
      const options = nextValues.map((v) => valueMap.get(v)?.node).filter(Boolean) as TreeSelectOption[];
      if (multiple || treeCheckable) {
        onChange?.(nextValues, options);
      } else {
        onChange?.(nextValues[0], options[0]);
      }
      if (triggerNode) onSelect?.(triggerNode.value, triggerNode);
    },
    [isControlled, multiple, treeCheckable, onChange, onSelect, valueMap]
  );

  // Search results
  const searchResults = useMemo(() => {
    if (!showSearch || !searchValue) return [];
    const keyword = searchValue.toLowerCase();
    return allNodes.filter((node) => {
      let text: React.ReactNode;
      if (treeNodeFilterProp === 'label' || treeNodeFilterProp === 'title') {
        text = getOptionLabel(node.node, fieldNames);
      } else if (treeNodeFilterProp === 'value') {
        text = node.value;
      } else {
        text = node.node[treeNodeFilterProp];
      }
      const str = typeof text === 'string' ? text : String(text ?? '');
      return str.toLowerCase().includes(keyword);
    });
  }, [showSearch, searchValue, allNodes, treeNodeFilterProp, fieldNames]);

  // Expand to selected values when opened
  useEffect(() => {
    if (!isOpen || treeExpandedKeys !== undefined) return;
    setInnerExpandedKeys((prev) => {
      const next = new Set(prev);
      selectedValues.forEach((v) => {
        let node = valueMap.get(v);
        while (node?.parent) {
          next.add(node.parent.value);
          node = node.parent;
        }
      });
      return next;
    });
  }, [isOpen, treeExpandedKeys, selectedValues, valueMap]);

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

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollResize, true);
      window.addEventListener('resize', handleScrollResize);
      return () => {
        window.removeEventListener('scroll', handleScrollResize, true);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [isOpen, updatePosition]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, setOpenState]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  // Toggle check / select
  const toggleCheck = useCallback(
    (node: FlatNode) => {
      if (treeCheckStrictly) {
        const nextValues = selectedValues.includes(node.value)
          ? selectedValues.filter((v) => v !== node.value)
          : [...selectedValues, node.value];
        updateValue(nextValues, node.node);
        return;
      }
      const nextSet = new Set(checkedKeys);
      const effective = isCheckedNode(node, nextSet);
      if (effective) {
        removeWithDescendants(node, nextSet);
        if (node.parent && isCheckedNode(node.parent, nextSet)) {
          node.parent.children.forEach((sibling) => {
            if (sibling !== node) addWithDescendants(sibling, nextSet);
          });
          nextSet.delete(node.parent.value);
        }
      } else {
        addWithDescendants(node, nextSet);
      }
      const nextValues = getStrategyValues(nextSet, showCheckedStrategy, tree, valueMap);
      updateValue(nextValues, node.node);
    },
    [selectedValues, treeCheckStrictly, checkedKeys, showCheckedStrategy, tree, valueMap, updateValue]
  );

  const handleSelectNode = useCallback(
    (node: FlatNode) => {
      if (node.node.disabled) return;
      if (treeCheckable) {
        toggleCheck(node);
        return;
      }
      if (multiple) {
        const idx = selectedValues.indexOf(node.value);
        const nextValues = idx >= 0 ? selectedValues.filter((v) => v !== node.value) : [...selectedValues, node.value];
        updateValue(nextValues, node.node);
      } else {
        updateValue([node.value], node.node);
        setOpenState(false);
      }
    },
    [treeCheckable, multiple, selectedValues, toggleCheck, updateValue, setOpenState]
  );

  const handleToggleExpand = useCallback(
    (node: FlatNode) => {
      const hasSub = node.children.length > 0 || (loadData && node.node.isLeaf === false);
      if (!hasSub) return;
      if (loadData && node.children.length === 0 && node.node.isLeaf === false) {
        setLoadingKeys((prev) => {
          const next = new Set(prev);
          next.add(node.value);
          return next;
        });
        Promise.resolve(loadData(node.node)).finally(() => {
          setLoadingKeys((prev) => {
            const next = new Set(prev);
            next.delete(node.value);
            return next;
          });
        });
      }
      toggleExpandKey(node.value);
    },
    [loadData, toggleExpandKey]
  );

  const handleRemoveTag = useCallback(
    (val: string | number) => {
      if (treeCheckable) {
        const node = valueMap.get(val);
        if (node) {
          toggleCheck(node);
          return;
        }
      }
      const nextValues = selectedValues.filter((v) => v !== val);
      updateValue(nextValues);
      const removed = valueMap.get(val)?.node;
      if (removed) onDeselect?.(val, removed);
    },
    [treeCheckable, selectedValues, valueMap, toggleCheck, updateValue, onDeselect]
  );

  const handleClear = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!isControlled) setInnerValue([]);
      onChange?.(multiple || treeCheckable ? [] : undefined, []);
      setSearchValue('');
    },
    [isControlled, multiple, treeCheckable, onChange]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      setActiveIndex(-1);
      if (!isOpen) setOpenState(true);
    },
    [isOpen, setOpenState]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      const list = searchValue && showSearch ? searchResults : visibleNodes;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          if (list.length === 0) return;
          setActiveIndex((prev) => (prev + 1 < list.length ? prev + 1 : prev));
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          if (list.length === 0) return;
          setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (!isOpen || activeIndex < 0 || activeIndex >= list.length) return;
          const node = list[activeIndex];
          const hasSub = node.children.length > 0 || (loadData && node.node.isLeaf === false);
          if (hasSub && !expandedKeys.has(node.value)) {
            handleToggleExpand(node);
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (!isOpen || activeIndex < 0 || activeIndex >= list.length) return;
          const node = list[activeIndex];
          if (expandedKeys.has(node.value)) {
            handleToggleExpand(node);
          } else if (node.parent) {
            // Move active to parent and collapse
            const parentIdx = visibleNodes.findIndex((n) => n.value === node.parent!.value);
            if (parentIdx >= 0) setActiveIndex(parentIdx);
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (!isOpen) {
            setOpenState(true);
            return;
          }
          if (searchValue && searchResults.length > 0) {
            handleSelectNode(searchResults[0]);
          } else if (activeIndex >= 0 && activeIndex < list.length) {
            handleSelectNode(list[activeIndex]);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setOpenState(false);
          break;
        }
        case 'Backspace': {
          if (searchValue === '') {
            if ((multiple || treeCheckable) && displayValues.length > 0) {
              const last = displayValues[displayValues.length - 1];
              handleRemoveTag(last);
            } else if (!multiple && !treeCheckable && selectedValues.length > 0) {
              handleClear();
            }
          }
          break;
        }
      }
    },
    [
      disabled,
      isOpen,
      searchValue,
      showSearch,
      searchResults,
      visibleNodes,
      activeIndex,
      expandedKeys,
      loadData,
      displayValues,
      multiple,
      treeCheckable,
      selectedValues,
      handleSelectNode,
      handleToggleExpand,
      handleRemoveTag,
      handleClear,
      setOpenState,
    ]
  );

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && dropdownRef.current) {
      const activeEl = dropdownRef.current.querySelector('.soui-tree-select-tree-node-active');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  // CSS vars
  const cssVars = buildTreeSelectCssVars(treeSelectTheme as Record<string, any>, globalTheme as Record<string, any>);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  const dropdownWidth = useMemo(() => {
    if (typeof dropdownMatchSelectWidth === 'number') return dropdownMatchSelectWidth;
    if (dropdownMatchSelectWidth === true) return dropdownPos.width;
    return undefined;
  }, [dropdownMatchSelectWidth, dropdownPos.width]);

  const hasValue = displayValues.length > 0;
  const showClear = allowClear && hasValue && !disabled;

  // Get label by value with custom prop
  const getLabelByValue = useCallback(
    (val: string | number): React.ReactNode => {
      const node = valueMap.get(val);
      if (!node) return val;
      if (treeNodeLabelProp === 'label' || treeNodeLabelProp === 'title') return getOptionLabel(node.node, fieldNames);
      return node.node[treeNodeLabelProp] ?? val;
    },
    [valueMap, treeNodeLabelProp, fieldNames]
  );

  // Classes
  const selectCls = classNames(
    'soui-tree-select',
    `soui-tree-select-${mergedSize}`,
    {
      'soui-tree-select-open': isOpen,
      'soui-tree-select-focused': isOpen,
      'soui-tree-select-disabled': disabled,
      'soui-tree-select-show-search': showSearch,
      'soui-tree-select-multiple': multiple || treeCheckable,
      'soui-tree-select-single': !multiple && !treeCheckable,
      'soui-tree-select-checkable': treeCheckable,
      [`soui-tree-select-status-${status}`]: !!status && !disabled,
    },
    className
  );

  const renderSingleContent = () => {
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
              placeholder={hasValue ? (getLabelByValue(displayValues[0]) as string) : (placeholder as string) || ''}
            />
          </div>
        ) : null}
        {displayValues.length > 0 && !(showSearch && isOpen && searchValue) ? (
          <span className="soui-tree-select-selection-item" title={getLabelByValue(displayValues[0]) as string}>
            {getLabelByValue(displayValues[0])}
          </span>
        ) : null}
        {!hasValue && !searchValue ? (
          <span className="soui-tree-select-selection-placeholder">{placeholder}</span>
        ) : null}
      </>
    );
  };

  const renderTags = () => {
    const visibleValues = maxTagCount !== undefined ? displayValues.slice(0, maxTagCount) : displayValues;
    const overflowCount = maxTagCount !== undefined ? Math.max(0, displayValues.length - maxTagCount) : 0;

    return (
      <div className="soui-tree-select-selection-overflow">
        {visibleValues.map((val) => {
          const label = getLabelByValue(val);
          const onClose = () => handleRemoveTag(val);
          if (tagRender) {
            return (
              <React.Fragment key={val}>
                {tagRender({ label, value: val, onClose })}
              </React.Fragment>
            );
          }
          return (
            <span className="soui-tree-select-selection-item" key={val}>
              <span className="soui-tree-select-selection-item-content">{label}</span>
              <span
                className="soui-tree-select-selection-item-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
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
  };

  const renderTree = () => {
    const nodes = searchValue && showSearch ? searchResults : visibleNodes;
    if (nodes.length === 0) {
      return <div className="soui-tree-select-empty">{notFoundContent}</div>;
    }
    return (
      <ul className="soui-tree-select-tree" role="treebox">
        {nodes.map((node, idx) => {
          const isSelected = !treeCheckable && selectedValues.includes(node.value);
          let checkState: 'all' | 'half' | 'none' | null = null;
          if (treeCheckable) {
            if (treeCheckStrictly) {
              checkState = checkedKeys.has(node.value) ? 'all' : 'none';
            } else {
              checkState = isCheckedNode(node, checkedKeys)
                ? 'all'
                : isHalfCheckedNode(node, checkedKeys)
                ? 'half'
                : 'none';
            }
          }
          const isExpanded = expandedKeys.has(node.value);
          const isLoading = loadingKeys.has(node.value);
          const isActive = activeIndex === idx;
          const hasSub = node.children.length > 0 || (loadData && node.node.isLeaf === false);
          const indent = node.depth * 18;

          return (
            <li
              key={node.value}
              className={classNames('soui-tree-select-tree-node', {
                'soui-tree-select-tree-node-active': isActive,
                'soui-tree-select-tree-node-selected': isSelected,
                'soui-tree-select-tree-node-half-checked': checkState === 'half',
                'soui-tree-select-tree-node-disabled': node.node.disabled,
              })}
              role="treeitem"
              aria-selected={isSelected || checkState === 'all'}
              aria-disabled={node.node.disabled}
              aria-expanded={hasSub ? isExpanded : undefined}
            >
              <span className="soui-tree-select-indent" style={{ width: indent }} />
              {hasSub ? (
                <span
                  className={classNames('soui-tree-select-switcher', {
                    'soui-tree-select-switcher-expanded': isExpanded,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(node);
                  }}
                >
                  {isLoading ? (
                    <Icon name="LoadingFour" size={12} theme="outline" />
                  ) : isExpanded ? (
                    <Icon name="Down" size={12} theme="outline" />
                  ) : (
                    <Icon name="Right" size={12} theme="outline" />
                  )}
                </span>
              ) : (
                <span className="soui-tree-select-switcher-placeholder" />
              )}
              {treeCheckable && (
                <span
                  className={classNames('soui-tree-select-checkbox', {
                    'soui-tree-select-checkbox-checked': checkState === 'all',
                    'soui-tree-select-checkbox-half': checkState === 'half',
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode(node);
                  }}
                >
                  {checkState === 'all' && <Icon name="Check" size={12} theme="outline" />}
                  {checkState === 'half' && <span className="soui-tree-select-checkbox-indeterminate" />}
                </span>
              )}
              <span className="soui-tree-select-node-content" onClick={() => handleSelectNode(node)}>
                {treeTitleRender
                  ? treeTitleRender(node.node)
                  : getOptionLabel(node.node, fieldNames)}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderDropdown = () => {
    if (!isOpen) return null;

    const dropdownStyle: React.CSSProperties = {
      position: 'fixed',
      top: dropdownPos.top,
      left: dropdownPos.left,
      ...(dropdownWidth ? { width: dropdownWidth } : {}),
      minWidth: 120,
    };

    const menu = (
      <div
        ref={dropdownRef}
        className={classNames('soui-tree-select-dropdown', dropdownClassName)}
        style={dropdownStyle}
        role="listbox"
      >
        {dropdownRender ? dropdownRender(renderTree() as React.ReactElement) : renderTree()}
      </div>
    );

    return ReactDOM.createPortal(
      <div
        ref={(el) => {
          if (el) applyConfigProviderVars(el);
        }}
      >
        {menu}
      </div>,
      document.body
    );
  };

  return (
    <div
      ref={selectRef}
      className={selectCls}
      style={mergedStyle}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      <div className="soui-tree-select-selector" onClick={toggleOpen}>
        {multiple || treeCheckable ? renderTags() : renderSingleContent()}
      </div>

      {showClear && (
        <span
          className="soui-tree-select-clear"
          onClick={(e) => {
            e.stopPropagation();
            handleClear(e);
          }}
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

export default TreeSelect;
