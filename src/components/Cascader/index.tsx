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

export type CascaderSize = 'large' | 'middle' | 'small';
export type CascaderStatus = 'error' | 'warning';
export type CascaderExpandTrigger = 'click' | 'hover';
export type CascaderPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type CascaderShowCheckedStrategy = 'SHOW_PARENT' | 'SHOW_CHILD';

export interface CascaderOption {
  /** 选项显示文本 */
  label?: React.ReactNode;
  /** 选项值 */
  value: string | number;
  /** 子级选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点（用于异步加载场景） */
  isLeaf?: boolean;
  [key: string]: any;
}

export interface CascaderFieldNames {
  label?: string;
  value?: string;
  children?: string;
}

export interface CascaderRef {
  focus: () => void;
  blur: () => void;
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'placeholder' | 'prefix'> {
  /** 可选项数据 */
  options?: CascaderOption[];
  /** 指定选中的值（受控）—— 单选: (string|number)[], 多选: (string|number)[][] */
  value?: (string | number)[] | (string | number)[][];
  /** 默认选中的值 */
  defaultValue?: (string | number)[] | (string | number)[][];
  /** 选中变化回调 */
  onChange?: (value: any, selectedOptions: any) => void;
  /** 是否多选 */
  multiple?: boolean;
  /** 多选时显示策略 */
  showCheckedStrategy?: CascaderShowCheckedStrategy;
  /** 点选每一级是否都触发 onChange */
  changeOnSelect?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 清除回调 */
  onClear?: () => void;
  /** 占位文本 */
  placeholder?: React.ReactNode;
  /** 前缀内容 */
  prefix?: React.ReactNode;
  /** 尺寸 */
  size?: CascaderSize;
  /** 校验状态 */
  status?: CascaderStatus;
  /** 是否启用搜索 */
  showSearch?: boolean | {
    filter?: (inputValue: string, path: CascaderOption[], fieldNames?: CascaderFieldNames) => boolean;
    sort?: (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;
    render?: (inputValue: string, path: CascaderOption[]) => React.ReactNode;
    limit?: number | false;
  };
  /** 子菜单展开方式 */
  expandTrigger?: CascaderExpandTrigger;
  /** 异步加载子级数据 */
  loadData?: (selectedOptions: CascaderOption[]) => void;
  /** 自定义显示渲染 */
  displayRender?: (labels: string[], selectedOptions: CascaderOption[]) => React.ReactNode;
  /** 自定义选项渲染 */
  optionRender?: (option: CascaderOption, info: { level: number; index: number }) => React.ReactNode;
  /** 自定义下拉菜单内容 */
  popupRender?: (menus: React.ReactElement) => React.ReactElement;
  /** 空数据时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 自定义后缀图标 */
  suffixIcon?: React.ReactNode;
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode;
  /** 下拉菜单展开/收起回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 控制下拉菜单显隐（受控） */
  open?: boolean;
  /** 默认下拉菜单显隐 */
  defaultOpen?: boolean;
  /** 下拉菜单位置 */
  placement?: CascaderPlacement;
  /** 自定义字段名映射 */
  fieldNames?: CascaderFieldNames;
  /** 多选时最多显示的标签数量 */
  maxTagCount?: number;
  /** 多选时隐藏标签的占位 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: (string | number)[][]) => React.ReactNode);
  /** 自定义标签渲染 */
  tagRender?: (props: { label: string; value: (string | number)[]; onClose: () => void }) => React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
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

function buildCascaderCssVars(cascaderTheme: Record<string, any>, globalTheme: Record<string, any>): Record<string, any> {
  const cssVars: Record<string, any> = {};
  const borderRadiusValue = cascaderTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = cascaderTheme?.fontSize || globalTheme?.fontSize;
  const controlHeightValue = cascaderTheme?.controlHeight || globalTheme?.controlHeight;
  if (borderRadiusValue !== undefined) cssVars['--soui-cascader-border-radius'] = `${borderRadiusValue}px`;
  if (fontSizeValue !== undefined) cssVars['--soui-cascader-font-size'] = `${fontSizeValue}px`;
  if (controlHeightValue !== undefined) {
    cssVars['--soui-cascader-control-height-small'] = `${controlHeightValue - 8}px`;
    cssVars['--soui-cascader-control-height-middle'] = `${controlHeightValue}px`;
    cssVars['--soui-cascader-control-height-large'] = `${controlHeightValue + 8}px`;
  }
  if (cascaderTheme?.colorBorder) cssVars['--soui-cascader-color-border'] = cascaderTheme.colorBorder;
  if (cascaderTheme?.colorBorderHover) cssVars['--soui-cascader-color-border-hover'] = cascaderTheme.colorBorderHover;
  if (cascaderTheme?.colorBorderFocus) cssVars['--soui-cascader-color-border-focus'] = cascaderTheme.colorBorderFocus;
  if (cascaderTheme?.colorBg) cssVars['--soui-cascader-color-bg'] = cascaderTheme.colorBg;
  if (cascaderTheme?.colorText) cssVars['--soui-cascader-color-text'] = cascaderTheme.colorText;
  if (cascaderTheme?.colorBgDisabled) cssVars['--soui-cascader-color-bg-disabled'] = cascaderTheme.colorBgDisabled;
  if (cascaderTheme?.colorTextDisabled) cssVars['--soui-cascader-color-text-disabled'] = cascaderTheme.colorTextDisabled;
  if (cascaderTheme?.colorError) cssVars['--soui-cascader-color-error'] = cascaderTheme.colorError;
  if (cascaderTheme?.colorWarning) cssVars['--soui-cascader-color-warning'] = cascaderTheme.colorWarning;
  if (cascaderTheme?.dropdownBg) cssVars['--soui-cascader-dropdown-bg'] = cascaderTheme.dropdownBg;
  if (cascaderTheme?.optionActiveBg) cssVars['--soui-cascader-option-active-bg'] = cascaderTheme.optionActiveBg;
  if (cascaderTheme?.optionSelectedBg) cssVars['--soui-cascader-option-selected-bg'] = cascaderTheme.optionSelectedBg;
  if (cascaderTheme?.tagBg) cssVars['--soui-cascader-tag-bg'] = cascaderTheme.tagBg;
  return cssVars;
}

const CASCADER_CSS_VARS = [
  '--soui-cascader-border-radius',
  '--soui-cascader-font-size',
  '--soui-cascader-control-height-small',
  '--soui-cascader-control-height-middle',
  '--soui-cascader-control-height-large',
  '--soui-cascader-color-border',
  '--soui-cascader-color-border-hover',
  '--soui-cascader-color-border-focus',
  '--soui-cascader-color-bg',
  '--soui-cascader-color-text',
  '--soui-cascader-color-bg-disabled',
  '--soui-cascader-color-text-disabled',
  '--soui-cascader-color-error',
  '--soui-cascader-color-warning',
  '--soui-cascader-dropdown-bg',
  '--soui-cascader-option-active-bg',
  '--soui-cascader-option-selected-bg',
  '--soui-cascader-tag-bg',
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-border-radius',
  '--soui-font-size',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  CASCADER_CSS_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

function getOptionLabel(opt: CascaderOption, fn?: CascaderFieldNames): React.ReactNode {
  return opt[fn?.label || 'label'];
}
function getOptionValue(opt: CascaderOption, fn?: CascaderFieldNames): string | number {
  return opt[fn?.value || 'value'];
}
function getOptionChildren(opt: CascaderOption, fn?: CascaderFieldNames): CascaderOption[] | undefined {
  return opt[fn?.children || 'children'];
}
function hasChildrenOpt(opt: CascaderOption, fn?: CascaderFieldNames): boolean {
  const c = getOptionChildren(opt, fn);
  return Array.isArray(c) && c.length > 0;
}
function isLeafOpt(opt: CascaderOption, fn?: CascaderFieldNames): boolean {
  if (opt.isLeaf !== undefined) return opt.isLeaf;
  return !hasChildrenOpt(opt, fn);
}
function findOption(options: CascaderOption[], val: string | number, fn?: CascaderFieldNames): CascaderOption | undefined {
  return options.find((o) => getOptionValue(o, fn) === val);
}
function pathKey(path: (string | number)[]): string {
  return path.join('/');
}
/** Flatten all leaf paths for search */
function flattenPaths(options: CascaderOption[], fn?: CascaderFieldNames, parent: CascaderOption[] = []): CascaderOption[][] {
  const result: CascaderOption[][] = [];
  for (const opt of options) {
    const cur = [...parent, opt];
    if (hasChildrenOpt(opt, fn)) {
      result.push(...flattenPaths(getOptionChildren(opt, fn)!, fn, cur));
    } else {
      result.push(cur);
    }
  }
  return result;
}
/** Get all leaf paths under a node */
function getLeafPaths(opt: CascaderOption, fn?: CascaderFieldNames, prefix: CascaderOption[] = []): CascaderOption[][] {
  const cur = [...prefix, opt];
  if (hasChildrenOpt(opt, fn)) {
    return getOptionChildren(opt, fn)!.flatMap((c) => getLeafPaths(c, fn, cur));
  }
  return [cur];
}
/** Resolve selected options from value path */
function resolveSelectedOptions(options: CascaderOption[], values: (string | number)[], fn?: CascaderFieldNames): CascaderOption[] {
  const result: CascaderOption[] = [];
  let cur = options;
  for (const v of values) {
    const found = findOption(cur, v, fn);
    if (found) {
      result.push(found);
      cur = getOptionChildren(found, fn) || [];
    } else break;
  }
  return result;
}
/** Get labels from a value path */
function getLabelsFromPath(options: CascaderOption[], values: (string | number)[], fn?: CascaderFieldNames): string[] {
  const opts = resolveSelectedOptions(options, values, fn);
  return opts.map((o) => {
    const l = getOptionLabel(o, fn);
    return typeof l === 'string' ? l : String(getOptionValue(o, fn));
  });
}

// ==================== Cascader ====================

const Cascader = forwardRef<CascaderRef, CascaderProps>((props, ref) => {
  const {
    options = [],
    value: valueProp,
    defaultValue,
    onChange,
    multiple = false,
    showCheckedStrategy = 'SHOW_PARENT',
    changeOnSelect = false,
    disabled = false,
    allowClear = true,
    onClear,
    placeholder,
    prefix,
    size: sizeProp = 'middle',
    status,
    showSearch = false,
    expandTrigger = 'click',
    loadData,
    displayRender,
    optionRender,
    popupRender,
    notFoundContent = '暂无数据',
    suffixIcon,
    expandIcon,
    onDropdownVisibleChange,
    open: openProp,
    defaultOpen,
    placement = 'bottomLeft',
    fieldNames,
    maxTagCount,
    maxTagPlaceholder,
    tagRender,
    className,
    style,
    ...rest
  } = props;

  // Theme
  const cascaderTheme = useComponentTheme('Cascader');
  const globalTheme = useGlobalTheme();
  const mergedSize = sizeProp || 'middle';

  // Open state (controlled)
  const isOpenControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(!!defaultOpen);
  const isOpen = isOpenControlled ? openProp! : innerOpen;

  // Normalize value
  const normalizeSingleValue = (v: any): (string | number)[] => {
    if (!v || !Array.isArray(v)) return [];
    return v as (string | number)[];
  };
  const normalizeMultiValue = (v: any): (string | number)[][] => {
    if (!v || !Array.isArray(v)) return [];
    return v as (string | number)[][];
  };

  const isControlled = valueProp !== undefined;
  const [innerSingleValue, setInnerSingleValue] = useState<(string | number)[]>(() => normalizeSingleValue(defaultValue));
  const [innerMultiValue, setInnerMultiValue] = useState<(string | number)[][]>(() => normalizeMultiValue(defaultValue));

  const singleValue = isControlled ? normalizeSingleValue(valueProp) : innerSingleValue;
  const multiValue = isControlled ? normalizeMultiValue(valueProp) : innerMultiValue;

  // State
  const [searchValue, setSearchValue] = useState('');
  const [activePath, setActivePath] = useState<(string | number)[]>([]);
  const [loadingPath, setLoadingPath] = useState<string>('');
  const [activeColIdx, setActiveColIdx] = useState(0);
  const [activeRowIdx, setActiveRowIdx] = useState(-1);

  // Refs
  const cascaderRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0, bottom: 0 });
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => searchInputRef.current?.focus(),
    blur: () => { searchInputRef.current?.blur(); setOpenState(false); },
  }));

  // Open/Close
  const setOpenState = useCallback((nextOpen: boolean) => {
    if (!isOpenControlled) setInnerOpen(nextOpen);
    onDropdownVisibleChange?.(nextOpen);
    if (nextOpen) {
      setSearchValue('');
      const sv = multiple ? (multiValue[0] || []) : singleValue;
      setActivePath(sv.length > 0 ? [...sv] : []);
      setActiveColIdx(0);
      setActiveRowIdx(-1);
    }
  }, [isOpenControlled, onDropdownVisibleChange, multiple, multiValue, singleValue]);

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setOpenState(!isOpen);
  }, [disabled, isOpen, setOpenState]);

  // Dropdown positioning
  const updatePosition = useCallback(() => {
    if (!cascaderRef.current) return;
    const rect = cascaderRef.current.getBoundingClientRect();
    const isTop = placement.startsWith('top');
    const isRight = placement.endsWith('Right');
    setDropdownPos({
      top: isTop ? 0 : rect.bottom + 4,
      left: isRight ? rect.right : rect.left,
      width: rect.width,
      bottom: isTop ? rect.top - 4 : 0,
    });
  }, [placement]);

  // Search config
  const searchConfig = typeof showSearch === 'object' ? showSearch : {};
  const searchEnabled = !!showSearch;

  // Search results
  const searchResults = useMemo(() => {
    if (!searchValue || !searchEnabled) return [];
    const allPaths = flattenPaths(options, fieldNames);
    const keyword = searchValue.toLowerCase();

    const defaultFilter = (inputVal: string, path: CascaderOption[]) => {
      return path.some((opt) => {
        const label = getOptionLabel(opt, fieldNames);
        const s = typeof label === 'string' ? label : String(getOptionValue(opt, fieldNames));
        return s.toLowerCase().includes(inputVal.toLowerCase());
      });
    };

    const filterFn = searchConfig.filter || defaultFilter;
    let results = allPaths.filter((path) => filterFn(searchValue, path, fieldNames));

    if (searchConfig.sort) {
      results.sort((a, b) => searchConfig.sort!(a, b, searchValue));
    }
    if (typeof searchConfig.limit === 'number' && searchConfig.limit > 0) {
      results = results.slice(0, searchConfig.limit);
    }
    return results;
  }, [searchValue, searchEnabled, options, fieldNames, searchConfig]);

  // Build cascading columns
  const buildColumns = useCallback((): { options: CascaderOption[]; activeValue?: string | number; level: number }[] => {
    const cols: { options: CascaderOption[]; activeValue?: string | number; level: number }[] = [];
    cols.push({ options, activeValue: activePath[0], level: 0 });
    for (let i = 0; i < activePath.length; i++) {
      const found = findOption(cols[i].options, activePath[i], fieldNames);
      if (found) {
        const ch = getOptionChildren(found, fieldNames);
        if (ch && ch.length > 0) {
          cols.push({ options: ch, activeValue: activePath[i + 1], level: i + 1 });
        }
      }
    }
    return cols;
  }, [options, activePath, fieldNames]);

  // Multi-select helpers
  const isPathSelected = useCallback((path: (string | number)[]) => {
    return multiValue.some((mv) => mv.length === path.length && mv.every((v, i) => v === path[i]));
  }, [multiValue]);

  const getCheckboxState = useCallback((opt: CascaderOption, level: number, parentPath: (string | number)[]): 'all' | 'half' | 'none' => {
    const val = getOptionValue(opt, fieldNames);
    const currentPath = [...parentPath, val];
    if (isLeafOpt(opt, fieldNames)) {
      return isPathSelected(currentPath) ? 'all' : 'none';
    }
    // Compute from leaf descendants
    const leafPaths = getLeafPaths(opt, fieldNames);
    const selectedCount = leafPaths.filter((lp) => {
      const fullPath = [...parentPath, ...lp.map((o) => getOptionValue(o, fieldNames))];
      return isPathSelected(fullPath);
    }).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === leafPaths.length) return 'all';
    return 'half';
  }, [fieldNames, isPathSelected]);

  const toggleMultiPath = useCallback((opt: CascaderOption, level: number, parentPath: (string | number)[]) => {
    const val = getOptionValue(opt, fieldNames);
    const currentPath = [...parentPath, val];
    const state = getCheckboxState(opt, level, parentPath);

    let newMulti: (string | number)[][];
    if (state === 'all') {
      // Deselect all leaf paths under this node
      if (isLeafOpt(opt, fieldNames)) {
        newMulti = multiValue.filter((mv) => !(mv.length === currentPath.length && mv.every((v, i) => v === currentPath[i])));
      } else {
        const leafPaths = getLeafPaths(opt, fieldNames);
        const leafKeys = new Set(leafPaths.map((lp) => pathKey([...parentPath, ...lp.map((o) => getOptionValue(o, fieldNames))])));
        newMulti = multiValue.filter((mv) => !leafKeys.has(pathKey(mv)));
      }
    } else {
      // Select all leaf paths under this node
      if (isLeafOpt(opt, fieldNames)) {
        if (!isPathSelected(currentPath)) {
          newMulti = [...multiValue, currentPath];
        } else {
          newMulti = [...multiValue];
        }
      } else {
        const leafPaths = getLeafPaths(opt, fieldNames);
        const existingKeys = new Set(multiValue.map(pathKey));
        const toAdd = leafPaths
          .map((lp) => [...parentPath, ...lp.map((o) => getOptionValue(o, fieldNames))])
          .filter((fp) => !existingKeys.has(pathKey(fp)));
        newMulti = [...multiValue, ...toAdd];
      }
    }

    if (!isControlled) setInnerMultiValue(newMulti);
    const selectedOpts = newMulti.map((mv) => resolveSelectedOptions(options, mv, fieldNames));
    onChange?.(newMulti, selectedOpts);
  }, [fieldNames, getCheckboxState, isLeafOpt, multiValue, isControlled, onChange, options, isPathSelected]);

  // Handle clicking an option (single mode)
  const handleOptionClick = useCallback(
    (opt: CascaderOption, level: number) => {
      if (opt.disabled) return;
      const val = getOptionValue(opt, fieldNames);
      const newPath = [...activePath.slice(0, level), val];
      setActivePath(newPath);

      const children = getOptionChildren(opt, fieldNames);
      const leaf = isLeafOpt(opt, fieldNames);

      if (multiple) {
        // In multiple mode, toggle checkbox
        toggleMultiPath(opt, level, activePath.slice(0, level));
        // Still expand if has children
        if (!leaf && loadData && !children && !opt.isLeaf) {
          setLoadingPath(newPath.join('/'));
          loadData(resolveSelectedOptions(options, newPath, fieldNames));
        }
        return;
      }

      // Single mode
      if (loadData && leaf && !opt.isLeaf) {
        setLoadingPath(newPath.join('/'));
        loadData(resolveSelectedOptions(options, newPath, fieldNames));
        return;
      }
      if (leaf) {
        if (!isControlled) setInnerSingleValue(newPath);
        onChange?.(newPath, resolveSelectedOptions(options, newPath, fieldNames));
        setOpenState(false);
      } else if (changeOnSelect) {
        if (!isControlled) setInnerSingleValue(newPath);
        onChange?.(newPath, resolveSelectedOptions(options, newPath, fieldNames));
        if (loadData && !children) {
          setLoadingPath(newPath.join('/'));
          loadData(resolveSelectedOptions(options, newPath, fieldNames));
        }
      } else {
        if (loadData && !children && !opt.isLeaf) {
          setLoadingPath(newPath.join('/'));
          loadData(resolveSelectedOptions(options, newPath, fieldNames));
        }
      }
    },
    [activePath, fieldNames, loadData, changeOnSelect, isControlled, onChange, options, setOpenState, multiple, toggleMultiPath]
  );

  // Hover expand
  const handleOptionHover = useCallback(
    (opt: CascaderOption, level: number) => {
      if (opt.disabled || expandTrigger !== 'hover') return;
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        if (!isLeafOpt(opt, fieldNames)) {
          const val = getOptionValue(opt, fieldNames);
          const newPath = [...activePath.slice(0, level), val];
          setActivePath(newPath);
          const children = getOptionChildren(opt, fieldNames);
          if (loadData && !children && !opt.isLeaf) {
            setLoadingPath(newPath.join('/'));
            loadData(resolveSelectedOptions(options, newPath, fieldNames));
          }
        }
      }, 150);
    },
    [expandTrigger, fieldNames, activePath, loadData, options]
  );

  // Clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        if (!isControlled) setInnerMultiValue([]);
        onChange?.([], []);
      } else {
        if (!isControlled) setInnerSingleValue([]);
        onChange?.([], []);
      }
      setSearchValue('');
      onClear?.();
    },
    [isControlled, multiple, onChange, onClear]
  );

  // Search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      if (!isOpen) setOpenState(true);
    },
    [isOpen, setOpenState]
  );

  // Select a search result path (single mode)
  const handleSearchSelect = useCallback(
    (path: CascaderOption[]) => {
      const values = path.map((opt) => getOptionValue(opt, fieldNames));
      if (multiple) {
        const pk = pathKey(values);
        const exists = multiValue.some((mv) => pathKey(mv) === pk);
        const newMulti = exists
          ? multiValue.filter((mv) => pathKey(mv) !== pk)
          : [...multiValue, values];
        if (!isControlled) setInnerMultiValue(newMulti);
        onChange?.(newMulti, newMulti.map((mv) => resolveSelectedOptions(options, mv, fieldNames)));
      } else {
        if (!isControlled) setInnerSingleValue(values);
        onChange?.(values, path);
        setSearchValue('');
        setOpenState(false);
      }
    },
    [fieldNames, multiple, multiValue, isControlled, onChange, options, setOpenState]
  );

  // Remove a tag in multiple mode
  const handleRemoveTag = useCallback(
    (path: (string | number)[], e: React.MouseEvent) => {
      e.stopPropagation();
      const newMulti = multiValue.filter((mv) => !(mv.length === path.length && mv.every((v, i) => v === path[i])));
      if (!isControlled) setInnerMultiValue(newMulti);
      onChange?.(newMulti, newMulti.map((mv) => resolveSelectedOptions(options, mv, fieldNames)));
    },
    [multiValue, isControlled, onChange, options]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      const columns = buildColumns();

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) { setOpenState(true); return; }
          if (columns.length === 0) return;
          const col = columns[Math.min(activeColIdx, columns.length - 1)];
          const maxRow = col.options.length - 1;
          let next = activeRowIdx + 1;
          while (next <= maxRow && col.options[next]?.disabled) next++;
          if (next <= maxRow) {
            setActiveRowIdx(next);
            // Update activePath to reflect keyboard navigation
            const opt = col.options[next];
            const val = getOptionValue(opt, fieldNames);
            const newPath = [...activePath.slice(0, col.level), val];
            setActivePath(newPath);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) { setOpenState(true); return; }
          if (columns.length === 0) return;
          const col = columns[Math.min(activeColIdx, columns.length - 1)];
          let next = activeRowIdx - 1;
          while (next >= 0 && col.options[next]?.disabled) next--;
          if (next >= 0) {
            setActiveRowIdx(next);
            const opt = col.options[next];
            const val = getOptionValue(opt, fieldNames);
            const newPath = [...activePath.slice(0, col.level), val];
            setActivePath(newPath);
          }
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (!isOpen) return;
          // Move to next column if it exists
          if (activeColIdx < columns.length - 1) {
            setActiveColIdx(activeColIdx + 1);
            setActiveRowIdx(-1);
          } else if (columns.length > 0) {
            // Try expanding current selection
            const col = columns[Math.min(activeColIdx, columns.length - 1)];
            if (activeRowIdx >= 0 && activeRowIdx < col.options.length) {
              const opt = col.options[activeRowIdx];
              if (!isLeafOpt(opt, fieldNames)) {
                // Will expand into next column
                setActiveColIdx(activeColIdx + 1);
                setActiveRowIdx(-1);
              }
            }
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (!isOpen) return;
          if (activeColIdx > 0) {
            setActiveColIdx(activeColIdx - 1);
            setActiveRowIdx(-1);
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (!isOpen) { setOpenState(true); return; }
          if (searchValue && searchResults.length > 0) {
            handleSearchSelect(searchResults[0]);
            return;
          }
          if (columns.length === 0 || activeRowIdx < 0) return;
          const col = columns[Math.min(activeColIdx, columns.length - 1)];
          if (activeRowIdx < col.options.length) {
            handleOptionClick(col.options[activeRowIdx], col.level);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setOpenState(false);
          break;
        }
        case 'Backspace': {
          if (searchEnabled && searchValue === '') {
            if (multiple && multiValue.length > 0) {
              const last = multiValue[multiValue.length - 1];
              handleRemoveTag(last, e as any);
            } else if (!multiple && singleValue.length > 0) {
              handleClear(e as any);
            }
          }
          break;
        }
      }
    },
    [disabled, isOpen, setOpenState, buildColumns, activeColIdx, activeRowIdx, fieldNames, activePath, handleOptionClick, handleSearchSelect, searchValue, searchResults, searchEnabled, multiple, multiValue, singleValue, handleRemoveTag, handleClear]
  );

  // Effects
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const h = () => updatePosition();
      window.addEventListener('scroll', h, true);
      window.addEventListener('resize', h);
      return () => { window.removeEventListener('scroll', h, true); window.removeEventListener('resize', h); };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (cascaderRef.current && !cascaderRef.current.contains(t) && dropdownRef.current && !dropdownRef.current.contains(t)) {
        setOpenState(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpenState]);

  useEffect(() => {
    if (isOpen && searchEnabled && searchInputRef.current) searchInputRef.current.focus();
  }, [isOpen, searchEnabled]);

  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); }, []);

  // CSS vars
  const cssVars = buildCascaderCssVars(cascaderTheme, globalTheme);
  const mergedStyle: React.CSSProperties = { ...cssVars, ...style };

  // Computed
  const hasValue = multiple ? multiValue.length > 0 : singleValue.length > 0;
  const showClear = allowClear && hasValue && !disabled;

  // Display text (single mode)
  const displayText = useMemo(() => {
    if (multiple || singleValue.length === 0) return null;
    const labels = getLabelsFromPath(options, singleValue, fieldNames);
    if (displayRender) return displayRender(labels, resolveSelectedOptions(options, singleValue, fieldNames));
    return labels.join(' / ');
  }, [multiple, singleValue, options, fieldNames, displayRender]);

  // Classes
  const cascaderCls = classNames(
    'soui-cascader',
    `soui-cascader-${mergedSize}`,
    {
      'soui-cascader-open': isOpen,
      'soui-cascader-focused': isOpen,
      'soui-cascader-disabled': disabled,
      'soui-cascader-show-search': searchEnabled,
      'soui-cascader-multiple': multiple,
      [`soui-cascader-status-${status}`]: !!status && !disabled,
    },
    className
  );

  // Render multiple tags
  const renderTags = () => {
    const visibleValues = maxTagCount !== undefined ? multiValue.slice(0, maxTagCount) : multiValue;
    const overflowCount = maxTagCount !== undefined ? Math.max(0, multiValue.length - maxTagCount) : 0;

    return (
      <div className="soui-cascader-selection-overflow">
        {visibleValues.map((mv) => {
          const labels = getLabelsFromPath(options, mv, fieldNames);
          const labelText = labels.join(' / ');
          const onClose = () => handleRemoveTag(mv, {} as any);
          if (tagRender) {
            return <React.Fragment key={pathKey(mv)}>{tagRender({ label: labelText, value: mv, onClose })}</React.Fragment>;
          }
          return (
            <span className="soui-cascader-selection-item" key={pathKey(mv)}>
              <span className="soui-cascader-selection-item-content">{labelText}</span>
              <span
                className="soui-cascader-selection-item-remove"
                onClick={(e) => handleRemoveTag(mv, e)}
                role="button"
                aria-label={`移除 ${labelText}`}
              >
                <Icon name="Close" size={10} theme="outline" />
              </span>
            </span>
          );
        })}
        {overflowCount > 0 && (
          <span className="soui-cascader-selection-item soui-cascader-selection-item-overflow">
            <span className="soui-cascader-selection-item-content">
              {typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(multiValue.slice(maxTagCount!)) : `+${overflowCount}`}
            </span>
          </span>
        )}
        {searchEnabled && (
          <span className="soui-cascader-selection-search">
            <input
              ref={searchInputRef}
              className="soui-cascader-selection-search-input"
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
        {multiValue.length === 0 && !searchValue && placeholder && (
          <span className="soui-cascader-selection-placeholder">{placeholder}</span>
        )}
      </div>
    );
  };

  // Render dropdown
  const renderDropdown = () => {
    if (!isOpen) return null;
    const columns = searchValue ? [] : buildColumns();
    const isTop = placement.startsWith('top');
    const isRight = placement.endsWith('Right');

    const menuContent = (
      <div className="soui-cascader-menus">
        {searchValue ? (
          <ul className="soui-cascader-menu soui-cascader-menu-search">
            {searchResults.length > 0 ? (
              searchResults.map((path, idx) => {
                const labels = path.map((opt) => {
                  const l = getOptionLabel(opt, fieldNames);
                  return typeof l === 'string' ? l : String(getOptionValue(opt, fieldNames));
                });
                const displayStr = labels.join(' / ');
                const values = path.map((opt) => getOptionValue(opt, fieldNames));
                const pk = pathKey(values);
                const isSelected = multiple ? multiValue.some((mv) => pathKey(mv) === pk) : (values.length === singleValue.length && values.every((v, i) => v === singleValue[i]));

                // Custom search render
                if (searchConfig.render) {
                  return (
                    <li key={`s-${idx}`} className={classNames('soui-cascader-option', { 'soui-cascader-option-selected': isSelected })}
                      onClick={() => handleSearchSelect(path)} role="option" aria-selected={isSelected}>
                      {multiple && (
                        <span className={classNames('soui-cascader-option-checkbox', { 'soui-cascader-option-checkbox-checked': isSelected })}>
                          {isSelected && <Icon name="Check" size={12} theme="outline" />}
                        </span>
                      )}
                      <span className="soui-cascader-option-content">{searchConfig.render(searchValue, path)}</span>
                    </li>
                  );
                }

                const highlightMatch = (text: string) => {
                  const kw = searchValue.toLowerCase();
                  const lt = text.toLowerCase();
                  const mi = lt.indexOf(kw);
                  if (mi < 0) return text;
                  return (
                    <>
                      {text.slice(0, mi)}
                      <span className="soui-cascader-search-highlight">{text.slice(mi, mi + searchValue.length)}</span>
                      {text.slice(mi + searchValue.length)}
                    </>
                  );
                };

                return (
                  <li key={`s-${idx}`} className={classNames('soui-cascader-option', { 'soui-cascader-option-selected': isSelected })}
                    onClick={() => handleSearchSelect(path)} role="option" aria-selected={isSelected}>
                    {multiple && (
                      <span className={classNames('soui-cascader-option-checkbox', { 'soui-cascader-option-checkbox-checked': isSelected })}>
                        {isSelected && <Icon name="Check" size={12} theme="outline" />}
                      </span>
                    )}
                    <span className="soui-cascader-option-content">{highlightMatch(displayStr)}</span>
                  </li>
                );
              })
            ) : (
              <div className="soui-cascader-empty">{notFoundContent}</div>
            )}
          </ul>
        ) : (
          columns.map((col) => (
            <ul className="soui-cascader-menu" key={`menu-${col.level}`}>
              {col.options.length > 0 ? (
                col.options.map((opt, optIdx) => {
                  const val = getOptionValue(opt, fieldNames);
                  const label = getOptionLabel(opt, fieldNames);
                  const hasSub = hasChildrenOpt(opt, fieldNames) || (loadData && opt.isLeaf === false);
                  const isActive = col.activeValue === val;
                  const isLoading = loadingPath && activePath.slice(0, col.level + 1).join('/') === loadingPath;
                  const isKeyActive = activeColIdx === col.level && activeRowIdx === optIdx;

                  // Checkbox state for multiple
                  let checkState: 'all' | 'half' | 'none' = 'none';
                  if (multiple) {
                    checkState = getCheckboxState(opt, col.level, activePath.slice(0, col.level));
                  }

                  // Selected check for single mode
                  const isSingleSelected = !multiple && singleValue[col.level] === val;

                  const optionNode = (
                    <li
                      key={val}
                      className={classNames('soui-cascader-option', {
                        'soui-cascader-option-active': isActive || isKeyActive,
                        'soui-cascader-option-selected': multiple ? checkState === 'all' : isSingleSelected,
                        'soui-cascader-option-disabled': opt.disabled,
                        'soui-cascader-option-half': multiple && checkState === 'half',
                      })}
                      onClick={() => handleOptionClick(opt, col.level)}
                      onMouseEnter={() => {
                        handleOptionHover(opt, col.level);
                        setActiveColIdx(col.level);
                        setActiveRowIdx(optIdx);
                      }}
                      role="option"
                      aria-selected={multiple ? checkState === 'all' : isSingleSelected}
                      aria-disabled={opt.disabled}
                      title={typeof label === 'string' ? label : undefined}
                    >
                      {multiple && (
                        <span className={classNames('soui-cascader-option-checkbox', {
                          'soui-cascader-option-checkbox-checked': checkState === 'all',
                          'soui-cascader-option-checkbox-half': checkState === 'half',
                        })}>
                          {(checkState === 'all') && <Icon name="Check" size={12} theme="outline" />}
                          {checkState === 'half' && <span className="soui-cascader-checkbox-indeterminate" />}
                        </span>
                      )}
                      <span className="soui-cascader-option-content">
                        {optionRender ? optionRender(opt, { level: col.level, index: optIdx }) : label}
                      </span>
                      {isLoading && (
                        <span className="soui-cascader-option-loading">
                          <Icon name="Loading" size={12} theme="outline" />
                        </span>
                      )}
                      {hasSub && !isLoading && (
                        <span className="soui-cascader-option-expand">
                          {expandIcon || <Icon name="Right" size={10} theme="outline" />}
                        </span>
                      )}
                    </li>
                  );
                  return optionNode;
                })
              ) : (
                <div className="soui-cascader-empty">{notFoundContent}</div>
              )}
            </ul>
          ))
        )}
        {!searchValue && columns.length === 0 && (
          <div className="soui-cascader-empty">{notFoundContent}</div>
        )}
      </div>
    );

    const dropdownStyle: React.CSSProperties = {
      position: 'fixed',
      ...(isTop ? { bottom: window.innerHeight - dropdownPos.bottom } : { top: dropdownPos.top }),
      ...(isRight ? { right: window.innerWidth - dropdownPos.left - dropdownPos.width } : { left: dropdownPos.left }),
      minWidth: Math.max(dropdownPos.width, 120),
    };

    const defaultMenu = (
      <div ref={dropdownRef} className={classNames('soui-cascader-dropdown', `soui-cascader-dropdown-${placement}`)} style={dropdownStyle} role="listbox">
        {popupRender ? popupRender(menuContent as React.ReactElement) : menuContent}
      </div>
    );

    return ReactDOM.createPortal(
      <div ref={(el) => { if (el) applyConfigProviderVars(el); }}>
        {defaultMenu}
      </div>,
      document.body
    );
  };

  return (
    <div ref={cascaderRef} className={cascaderCls} style={mergedStyle} onKeyDown={handleKeyDown} tabIndex={disabled ? -1 : 0} {...rest}>
      <div className="soui-cascader-selector" onClick={toggleOpen}>
        {prefix && <span className="soui-cascader-prefix">{prefix}</span>}
        {multiple ? (
          renderTags()
        ) : (
          <>
            {searchEnabled && isOpen ? (
              <div className="soui-cascader-selection-search">
                <input
                  ref={searchInputRef}
                  className="soui-cascader-selection-search-input"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  placeholder={hasValue ? (typeof displayText === 'string' ? displayText : '') : (typeof placeholder === 'string' ? placeholder : '')}
                />
              </div>
            ) : null}
            {displayText && !(searchEnabled && isOpen && searchValue) ? (
              <span className="soui-cascader-selection-item" title={typeof displayText === 'string' ? displayText : undefined}>
                {displayText}
              </span>
            ) : null}
            {!hasValue && !searchValue ? (
              <span className="soui-cascader-selection-placeholder">{placeholder}</span>
            ) : null}
          </>
        )}
      </div>

      {showClear && (
        <span className="soui-cascader-clear" onClick={handleClear} onMouseDown={(e) => e.preventDefault()} role="button" aria-label="清除" tabIndex={-1}>
          <Icon name="Close" size={12} theme="outline" />
        </span>
      )}

      <span className="soui-cascader-arrow">
        {suffixIcon !== undefined ? suffixIcon : <Icon name="Down" size={12} theme="outline" />}
      </span>

      {renderDropdown()}
    </div>
  );
});

Cascader.displayName = 'Cascader';

// ==================== Cascader.Panel ====================

export interface CascaderPanelProps {
  options?: CascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  changeOnSelect?: boolean;
  expandTrigger?: CascaderExpandTrigger;
  loadData?: (selectedOptions: CascaderOption[]) => void;
  fieldNames?: CascaderFieldNames;
  optionRender?: (option: CascaderOption, info: { level: number; index: number }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CascaderPanel: React.FC<CascaderPanelProps> = ({
  options = [],
  value: valueProp,
  defaultValue,
  onChange,
  changeOnSelect = false,
  expandTrigger = 'click',
  loadData,
  fieldNames,
  optionRender,
  className,
  style,
}) => {
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<(string | number)[]>(defaultValue || []);
  const selectedValues = isControlled ? (valueProp || []) : innerValue;
  const [activePath, setActivePath] = useState<(string | number)[]>(selectedValues.length > 0 ? [...selectedValues] : []);
  const [loadingPath, setLoadingPath] = useState('');
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (selectedValues.length > 0) setActivePath([...selectedValues]);
  }, [selectedValues]);

  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); }, []);

  const handleClick = useCallback(
    (opt: CascaderOption, level: number) => {
      if (opt.disabled) return;
      const val = getOptionValue(opt, fieldNames);
      const newPath = [...activePath.slice(0, level), val];
      setActivePath(newPath);
      const leaf = isLeafOpt(opt, fieldNames);
      const children = getOptionChildren(opt, fieldNames);

      if (loadData && leaf && !opt.isLeaf) {
        setLoadingPath(newPath.join('/'));
        loadData(resolveSelectedOptions(options, newPath, fieldNames));
        return;
      }
      if (leaf) {
        if (!isControlled) setInnerValue(newPath);
        onChange?.(newPath, resolveSelectedOptions(options, newPath, fieldNames));
      } else if (changeOnSelect) {
        if (!isControlled) setInnerValue(newPath);
        onChange?.(newPath, resolveSelectedOptions(options, newPath, fieldNames));
        if (loadData && !children) {
          setLoadingPath(newPath.join('/'));
          loadData(resolveSelectedOptions(options, newPath, fieldNames));
        }
      } else {
        if (loadData && !children && !opt.isLeaf) {
          setLoadingPath(newPath.join('/'));
          loadData(resolveSelectedOptions(options, newPath, fieldNames));
        }
      }
    },
    [activePath, fieldNames, loadData, changeOnSelect, isControlled, onChange, options]
  );

  const handleHover = useCallback(
    (opt: CascaderOption, level: number) => {
      if (opt.disabled || expandTrigger !== 'hover') return;
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        if (!isLeafOpt(opt, fieldNames)) {
          const val = getOptionValue(opt, fieldNames);
          setActivePath((prev) => [...prev.slice(0, level), val]);
        }
      }, 150);
    },
    [expandTrigger, fieldNames]
  );

  // Build columns
  const columns: { options: CascaderOption[]; activeValue?: string | number; level: number }[] = [];
  columns.push({ options, activeValue: activePath[0], level: 0 });
  for (let i = 0; i < activePath.length; i++) {
    const found = findOption(columns[i].options, activePath[i], fieldNames);
    if (found) {
      const ch = getOptionChildren(found, fieldNames);
      if (ch && ch.length > 0) {
        columns.push({ options: ch, activeValue: activePath[i + 1], level: i + 1 });
      }
    }
  }

  return (
    <div className={classNames('soui-cascader-panel', className)} style={style}>
      <div className="soui-cascader-menus">
        {columns.map((col) => (
          <ul className="soui-cascader-menu" key={`panel-menu-${col.level}`}>
            {col.options.map((opt, optIdx) => {
              const val = getOptionValue(opt, fieldNames);
              const label = getOptionLabel(opt, fieldNames);
              const hasSub = hasChildrenOpt(opt, fieldNames) || (loadData && opt.isLeaf === false);
              const isActive = col.activeValue === val;
              const isLoading = loadingPath && activePath.slice(0, col.level + 1).join('/') === loadingPath;
              const isSel = selectedValues[col.level] === val;

              return (
                <li
                  key={val}
                  className={classNames('soui-cascader-option', {
                    'soui-cascader-option-active': isActive,
                    'soui-cascader-option-selected': isSel,
                    'soui-cascader-option-disabled': opt.disabled,
                  })}
                  onClick={() => handleClick(opt, col.level)}
                  onMouseEnter={() => handleHover(opt, col.level)}
                  role="option"
                >
                  <span className="soui-cascader-option-content">
                    {optionRender ? optionRender(opt, { level: col.level, index: optIdx }) : label}
                  </span>
                  {isLoading && (
                    <span className="soui-cascader-option-loading"><Icon name="Loading" size={12} theme="outline" /></span>
                  )}
                  {hasSub && !isLoading && (
                    <span className="soui-cascader-option-expand"><Icon name="Right" size={10} theme="outline" /></span>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

CascaderPanel.displayName = 'CascaderPanel';

// Attach Panel as static property
const CascaderWithPanel = Cascader as typeof Cascader & { Panel: typeof CascaderPanel };
CascaderWithPanel.Panel = CascaderPanel;

export default CascaderWithPanel;
