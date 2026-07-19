import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import Tooltip from '../Tooltip';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export interface TreeNodeData {
  /** 节点唯一标识 */
  key: React.Key;
  /** 显示文本 */
  title?: React.ReactNode;
  /** 子节点 */
  children?: TreeNodeData[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选（默认 true） */
  selectable?: boolean;
  /** 是否可勾选（默认 true） */
  checkable?: boolean;
  /** 是否禁用复选框 */
  disableCheckbox?: boolean;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否为叶子节点（用于异步加载场景，无 children 但有展开图标） */
  isLeaf?: boolean;
  /** 额外数据 */
  [key: string]: any;
}

export interface TreeFieldNames {
  title?: string;
  key?: string;
  children?: string;
  isLeaf?: string;
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** 树形数据 */
  treeData?: TreeNodeData[];
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点 keys */
  defaultExpandedKeys?: React.Key[];
  /** 受控展开的节点 keys */
  expandedKeys?: React.Key[];
  /** 展开/收起回调 */
  onExpand?: (expandedKeys: React.Key[], info: { expanded: boolean; node: TreeNodeData }) => void;
  /** 是否可选中 */
  selectable?: boolean;
  /** 是否多选（按住 Ctrl/Cmd） */
  multiple?: boolean;
  /** 默认选中的节点 keys */
  defaultSelectedKeys?: React.Key[];
  /** 受控选中的节点 keys */
  selectedKeys?: React.Key[];
  /** 选中回调 */
  onSelect?: (selectedKeys: React.Key[], info: { selected: boolean; node: TreeNodeData; nativeEvent: React.MouseEvent }) => void;
  /** 是否可勾选 */
  checkable?: boolean;
  /** 勾选是否严格（父子节点不联动） */
  checkStrictly?: boolean;
  /** 默认勾选的节点 keys */
  defaultCheckedKeys?: React.Key[];
  /** 受控勾选的节点 keys */
  checkedKeys?: React.Key[];
  /** 勾选回调 */
  onCheck?: (checkedKeys: React.Key[], info: { checked: boolean; node: TreeNodeData; halfCheckedKeys: React.Key[] }) => void;
  /** 是否禁用整棵树 */
  disabled?: boolean;
  /** 显示连接线 */
  showLine?: boolean;
  /** 显示节点图标 */
  showIcon?: boolean;
  /** 自定义展开图标 */
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
  /** 异步加载数据 */
  loadData?: (node: TreeNodeData) => Promise<void>;
  /** 加载中图标 */
  loadIcon?: React.ReactNode;
  /** 自定义字段名 */
  fieldNames?: TreeFieldNames;
  /** 搜索关键词（高亮匹配文字） */
  searchValue?: string;
  /** 块级节点（整行可选中/悬停） */
  blockNode?: boolean;
  /** 自定义节点渲染 */
  titleRender?: (node: TreeNodeData) => React.ReactNode;
  /** 空状态显示 */
  emptyText?: React.ReactNode;
  /** 缩进宽度（像素） */
  nodeIndent?: number;
  /** 悬停节点时是否显示 Tooltip 提示完整标题 */
  tooltip?: boolean;
}

// ==================== Helper Functions ====================

/** 收集树中所有 key */
function collectAllKeys(data: TreeNodeData[], childrenKey: string): React.Key[] {
  const keys: React.Key[] = [];
  const walk = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      keys.push(node.key);
      const children = node[childrenKey] as TreeNodeData[] | undefined;
      if (children) walk(children);
    }
  };
  walk(data);
  return keys;
}

/** 构建 key → { node, parent } 映射 */
function buildNodeMap(
  data: TreeNodeData[],
  childrenKey: string,
): Map<React.Key, { node: TreeNodeData; parent: React.Key | null }> {
  const map = new Map<React.Key, { node: TreeNodeData; parent: React.Key | null }>();
  const walk = (nodes: TreeNodeData[], parent: React.Key | null) => {
    for (const node of nodes) {
      map.set(node.key, { node, parent });
      const children = node[childrenKey] as TreeNodeData[] | undefined;
      if (children) walk(children, node.key);
    }
  };
  walk(data, null);
  return map;
}

/** 获取某节点所有子孙 key */
function getDescendantKeys(node: TreeNodeData, childrenKey: string): React.Key[] {
  const keys: React.Key[] = [];
  const walk = (n: TreeNodeData) => {
    const children = n[childrenKey] as TreeNodeData[] | undefined;
    if (!children) return;
    for (const child of children) {
      keys.push(child.key);
      walk(child);
    }
  };
  walk(node);
  return keys;
}

/** 获取某节点所有直接子节点 key */
function getChildKeys(node: TreeNodeData, childrenKey: string): React.Key[] {
  const children = node[childrenKey] as TreeNodeData[] | undefined;
  if (!children) return [];
  return children.map(c => c.key);
}

/**
 * 根据一次勾选操作，重新计算所有受影响的勾选/半选状态。
 * 策略：先向下传播（勾选/取消子节点），再向上传播（根据子节点状态计算父节点状态）。
 */
function computeCheckedState(
  triggerKey: React.Key,
  checked: boolean,
  currentChecked: Set<React.Key>,
  nodeMap: Map<React.Key, { node: TreeNodeData; parent: React.Key | null }>,
  childrenKey: string,
): { checkedKeys: React.Key[]; halfCheckedKeys: React.Key[] } {
  const newChecked = new Set(currentChecked);

  // 1. 向下传播：勾选或取消触发节点的所有子孙
  const triggerInfo = nodeMap.get(triggerKey);
  if (triggerInfo) {
    const descendants = getDescendantKeys(triggerInfo.node, childrenKey);
    if (checked) {
      newChecked.add(triggerKey);
      for (const k of descendants) {
        const info = nodeMap.get(k);
        if (info && !info.node.disabled && !info.node.disableCheckbox) {
          newChecked.add(k);
        }
      }
    } else {
      newChecked.delete(triggerKey);
      for (const k of descendants) {
        newChecked.delete(k);
      }
    }
  }

  // 2. 向上传播：从触发节点一路向上到根节点
  const halfChecked = new Set<React.Key>();
  if (triggerInfo) {
    let current: React.Key | null = triggerInfo.parent;
    while (current !== null) {
      const parentInfo = nodeMap.get(current);
      if (!parentInfo) break;
      const childKeys = getChildKeys(parentInfo.node, childrenKey);
      const allChecked = childKeys.every(k => newChecked.has(k));
      const someChecked = childKeys.some(k => newChecked.has(k) || halfChecked.has(k));

      if (allChecked) {
        newChecked.add(current);
        halfChecked.delete(current);
      } else if (someChecked) {
        newChecked.delete(current);
        halfChecked.add(current);
      } else {
        newChecked.delete(current);
        halfChecked.delete(current);
      }
      current = parentInfo.parent;
    }
  }

  return {
    checkedKeys: Array.from(newChecked),
    halfCheckedKeys: Array.from(halfChecked),
  };
}

/**
 * 初始加载时，根据 defaultCheckedKeys 计算完整的勾选/半选状态。
 * 只做向上传播（假设用户给的 key 是叶子级别的选中）。
 */
function computeInitialChecked(
  checkedKeys: React.Key[],
  nodeMap: Map<React.Key, { node: TreeNodeData; parent: React.Key | null }>,
  childrenKey: string,
): { checkedKeys: React.Key[]; halfCheckedKeys: React.Key[] } {
  const checkedSet = new Set(checkedKeys);
  const halfChecked = new Set<React.Key>();
  const processed = new Set<React.Key>();

  const processUp = (key: React.Key) => {
    if (processed.has(key)) return;
    processed.add(key);
    const info = nodeMap.get(key);
    if (!info || info.parent === null) return;

    // 先确保父节点的所有子节点都已处理
    const parentInfo = nodeMap.get(info.parent);
    if (!parentInfo) return;
    const childKeys = getChildKeys(parentInfo.node, childrenKey);
    for (const ck of childKeys) {
      processUp(ck);
    }

    const allChecked = childKeys.every(k => checkedSet.has(k));
    const someChecked = childKeys.some(k => checkedSet.has(k) || halfChecked.has(k));

    if (allChecked) {
      checkedSet.add(info.parent);
      halfChecked.delete(info.parent);
    } else if (someChecked) {
      checkedSet.delete(info.parent);
      halfChecked.add(info.parent);
    }

    // 继续向上
    processUp(info.parent);
  };

  // 从所有初始选中的 key 向上传播
  for (const k of checkedKeys) {
    processUp(k);
  }

  return {
    checkedKeys: Array.from(checkedSet),
    halfCheckedKeys: Array.from(halfChecked),
  };
}

/** 检查一个节点是否有子节点 */
function hasChildren(node: TreeNodeData, childrenKey: string): boolean {
  const children = node[childrenKey] as TreeNodeData[] | undefined;
  return !!children && children.length > 0;
}

/** 判断节点是否为叶子 */
function isLeafNode(node: TreeNodeData, childrenKey: string): boolean {
  if (node.isLeaf !== undefined) return node.isLeaf;
  return !hasChildren(node, childrenKey);
}

/** 根据 fieldNames 将外部数据结构标准化为内部 TreeNodeData 格式 */
function normalizeTreeData(data: any[], fieldNames?: TreeFieldNames): TreeNodeData[] {
  if (!fieldNames) return data;
  const titleKey = fieldNames.title || 'title';
  const keyValue = fieldNames.key || 'key';
  const childrenField = fieldNames.children || 'children';
  const isLeafField = fieldNames.isLeaf || 'isLeaf';

  const walk = (nodes: any[]): TreeNodeData[] =>
    nodes.map((node) => {
      const result: TreeNodeData = {
        ...node,
        key: node[keyValue],
        title: node[titleKey],
      };
      if (isLeafField !== 'isLeaf' && node[isLeafField] !== undefined) {
        result.isLeaf = node[isLeafField];
      }
      const kids = node[childrenField];
      if (Array.isArray(kids)) {
        result.children = walk(kids);
      } else if (childrenField !== 'children') {
        delete result[childrenField];
      }
      return result;
    });

  return walk(data);
}

// ==================== Main Tree Component ====================

const Tree: React.FC<TreeProps> = ({
  treeData = [],
  defaultExpandAll = false,
  defaultExpandedKeys,
  expandedKeys: controlledExpandedKeys,
  onExpand,
  selectable = true,
  multiple = false,
  defaultSelectedKeys,
  selectedKeys: controlledSelectedKeys,
  onSelect,
  checkable = false,
  checkStrictly = false,
  defaultCheckedKeys,
  checkedKeys: controlledCheckedKeys,
  onCheck,
  disabled = false,
  showLine = false,
  showIcon = false,
  switcherIcon,
  loadData,
  loadIcon,
  fieldNames,
  searchValue,
  blockNode = false,
  titleRender,
  emptyText = '暂无数据',
  nodeIndent = 24,
  tooltip = false,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const treeTheme = (context?.components?.Tree || {}) as Record<string, any>;

  // 根据 fieldNames 标准化数据（title/key/children/isLeaf 映射到标准字段）
  const normalizedData = useMemo(
    () => normalizeTreeData(treeData, fieldNames),
    [treeData, fieldNames],
  );
  const childrenKey = 'children';

  // ==================== 节点映射 ====================
  const nodeMap = useMemo(() => buildNodeMap(normalizedData, childrenKey), [normalizedData, childrenKey]);

  // ==================== 展开状态 ====================
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<React.Key[]>(() => {
    if (defaultExpandAll) {
      return collectAllKeys(normalizedData, childrenKey);
    }
    return defaultExpandedKeys || [];
  });

  // 当 defaultExpandAll 变化时重新同步展开状态
  useEffect(() => {
    if (controlledExpandedKeys !== undefined) return;
    if (defaultExpandAll) {
      setInnerExpandedKeys(collectAllKeys(normalizedData, childrenKey));
    } else {
      setInnerExpandedKeys(defaultExpandedKeys || []);
    }
  }, [defaultExpandAll, normalizedData, controlledExpandedKeys]);

  const expandedKeys = controlledExpandedKeys !== undefined ? controlledExpandedKeys : innerExpandedKeys;
  const expandedSet = useMemo(() => new Set(expandedKeys), [expandedKeys]);

  // ==================== 选中状态 ====================
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<React.Key[]>(defaultSelectedKeys || []);
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : innerSelectedKeys;
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  // ==================== 勾选状态 ====================
  const [initCheckedState] = useState(() => {
    if (checkStrictly) return { checkedKeys: defaultCheckedKeys || [], halfCheckedKeys: [] as React.Key[] };
    return computeInitialChecked(defaultCheckedKeys || [], nodeMap, childrenKey);
  });
  const [innerCheckedKeys, setInnerCheckedKeys] = useState<React.Key[]>(initCheckedState.checkedKeys);
  const [halfCheckedKeysState, setHalfCheckedKeysState] = useState<React.Key[]>(initCheckedState.halfCheckedKeys);

  const checkedKeys = controlledCheckedKeys !== undefined ? controlledCheckedKeys : innerCheckedKeys;
  const checkedSet = useMemo(() => new Set(checkedKeys), [checkedKeys]);
  const halfCheckedSet = useMemo(() => new Set(halfCheckedKeysState), [halfCheckedKeysState]);

  // ==================== 加载状态 ====================
  const [loadingKeys, setLoadingKeys] = useState<Set<React.Key>>(new Set());

  // ==================== CSS 变量 ====================
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (treeTheme.fontSize !== undefined) {
    cssVars['--soui-tree-font-size'] = `${treeTheme.fontSize}px`;
  }
  if (treeTheme.colorPrimary !== undefined) {
    cssVars['--soui-tree-color-primary'] = treeTheme.colorPrimary;
  }
  if (treeTheme.nodeHeight !== undefined) {
    cssVars['--soui-tree-node-height'] = `${treeTheme.nodeHeight}px`;
  }
  if (treeTheme.nodeHoverBg !== undefined) {
    cssVars['--soui-tree-node-hover-bg'] = treeTheme.nodeHoverBg;
  }
  if (treeTheme.nodeSelectedBg !== undefined) {
    cssVars['--soui-tree-node-selected-bg'] = treeTheme.nodeSelectedBg;
  }
  if (treeTheme.switcherColor !== undefined) {
    cssVars['--soui-tree-switcher-color'] = treeTheme.switcherColor;
  }
  if (treeTheme.iconColor !== undefined) {
    cssVars['--soui-tree-icon-color'] = treeTheme.iconColor;
  }
  if (treeTheme.borderRadius !== undefined) {
    cssVars['--soui-tree-border-radius'] = `${treeTheme.borderRadius}px`;
  }
  // showLine 模式下 switcher 宽度需与 indent-unit 宽度一致，确保竖线对齐
  cssVars['--soui-tree-indent-size'] = `${nodeIndent}px`;

  const treeStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== 展开/收起 ====================
  const handleExpand = useCallback(async (node: TreeNodeData) => {
    if (disabled || node.disabled) return;

    const isExpanded = expandedSet.has(node.key);
    const newKeys = isExpanded
      ? expandedKeys.filter(k => k !== node.key)
      : [...expandedKeys, node.key];

    if (controlledExpandedKeys === undefined) {
      setInnerExpandedKeys(newKeys);
    }
    onExpand?.(newKeys, { expanded: !isExpanded, node });

    // 异步加载
    if (!isExpanded && loadData && !loadingKeys.has(node.key)) {
      const children = node[childrenKey] as TreeNodeData[] | undefined;
      if (!children || children.length === 0) {
        setLoadingKeys(prev => new Set(prev).add(node.key));
        try {
          await loadData(node);
        } finally {
          setLoadingKeys(prev => {
            const next = new Set(prev);
            next.delete(node.key);
            return next;
          });
        }
      }
    }
  }, [disabled, expandedKeys, expandedSet, controlledExpandedKeys, onExpand, loadData, loadingKeys, childrenKey]);

  // ==================== 选中 ====================
  const handleSelect = useCallback((node: TreeNodeData, e: React.MouseEvent) => {
    if (disabled || node.disabled || node.selectable === false) return;

    const isSelected = selectedSet.has(node.key);
    let newKeys: React.Key[];

    if (multiple || e.ctrlKey || e.metaKey) {
      newKeys = isSelected
        ? selectedKeys.filter(k => k !== node.key)
        : [...selectedKeys, node.key];
    } else {
      newKeys = isSelected ? [] : [node.key];
    }

    if (controlledSelectedKeys === undefined) {
      setInnerSelectedKeys(newKeys);
    }
    onSelect?.(newKeys, { selected: !isSelected, node, nativeEvent: e });
  }, [disabled, selectedKeys, selectedSet, multiple, controlledSelectedKeys, onSelect]);

  // ==================== 勾选 ====================
  const handleCheck = useCallback((node: TreeNodeData) => {
    if (disabled || node.disabled || node.disableCheckbox) return;

    const isChecked = checkedSet.has(node.key);
    const newChecked = !isChecked;

    if (checkStrictly) {
      // 严格模式：不联动父子
      const newKeys = newChecked
        ? [...checkedKeys, node.key]
        : checkedKeys.filter(k => k !== node.key);

      if (controlledCheckedKeys === undefined) {
        setInnerCheckedKeys(newKeys);
      }
      onCheck?.(newKeys, { checked: newChecked, node, halfCheckedKeys: halfCheckedKeysState });
    } else {
      // 联动模式
      const result = computeCheckedState(
        node.key,
        newChecked,
        checkedSet,
        nodeMap,
        childrenKey,
      );

      if (controlledCheckedKeys === undefined) {
        setInnerCheckedKeys(result.checkedKeys);
        setHalfCheckedKeysState(result.halfCheckedKeys);
      }
      onCheck?.(result.checkedKeys, { checked: newChecked, node, halfCheckedKeys: result.halfCheckedKeys });
    }
  }, [disabled, checkedKeys, checkedSet, halfCheckedKeysState, checkStrictly, controlledCheckedKeys, nodeMap, childrenKey, onCheck]);

  // ==================== 搜索高亮 ====================
  const renderTitle = (node: TreeNodeData): React.ReactNode => {
    if (titleRender) return titleRender(node);

    const title = node.title;
    if (!searchValue || typeof title !== 'string') return title;

    const idx = title.toLowerCase().indexOf(searchValue.toLowerCase());
    if (idx === -1) return title;

    return (
      <>
        {title.slice(0, idx)}
        <span className="soui-tree-title-match">{title.slice(idx, idx + searchValue.length)}</span>
        {title.slice(idx + searchValue.length)}
      </>
    );
  };

  // ==================== 展开图标 ====================
  const renderSwitcherIcon = (isExpanded: boolean) => {
    if (typeof switcherIcon === 'function') return switcherIcon({ expanded: isExpanded });
    if (switcherIcon) return switcherIcon;
    // showLine 模式：□-/□+ 图标（同 antd）
    if (showLine) {
      return isExpanded ? (
        <svg className="soui-tree-switcher-line-icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M328 472h368v80H328v-80z" />
          <path d="M872 152H152v720h720V152zm-80 640H232V232h560v560z" />
        </svg>
      ) : (
        <svg className="soui-tree-switcher-line-icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M472 328h80v144h144v80H552v144h-80V552H328v-80h144V328z" />
          <path d="M872 152H152v720h720V152zm-80 640H232V232h560v560z" />
        </svg>
      );
    }
    return <Icon name={isExpanded ? 'Down' : 'Right'} size={10} />;
  };

  // ==================== 递归渲染 ====================
  const renderNodes = (nodes: TreeNodeData[], level: number, isEnd: boolean[] = []): React.ReactNode => {
    return nodes.map((node, index) => {
      const children = node[childrenKey] as TreeNodeData[] | undefined;
      const hasKids = !!children && children.length > 0;
      const leaf = isLeafNode(node, childrenKey);
      const isExpanded = expandedSet.has(node.key);
      const isSelected = selectedSet.has(node.key);
      const isChecked = checkedSet.has(node.key);
      const isHalfChecked = halfCheckedSet.has(node.key);
      const isLoading = loadingKeys.has(node.key);
      const nodeDisabled = disabled || node.disabled || false;
      const isLast = index === nodes.length - 1;
      const nodeIsEnd = [...isEnd, isLast];

      const nodeCls = classNames('soui-tree-treenode', {
        'soui-tree-treenode-disabled': nodeDisabled,
        'soui-tree-treenode-selected': isSelected,
        'soui-tree-treenode-checked': isChecked,
        'soui-tree-treenode-leaf-last': isLast,
      });

      return (
        <li key={node.key} className={nodeCls}>
          {/* 缩进：Ant Design 方式，每层一个 indent-unit，showLine 模式下画竖线 */}
          {level > 0 && (
            <span className="soui-tree-indent" aria-hidden="true">
              {Array.from({ length: level }, (_, i) => (
                <span
                  key={i}
                  className={classNames('soui-tree-indent-unit', {
                    'soui-tree-indent-unit-end': isEnd[i],
                  })}
                  style={{ width: nodeIndent }}
                />
              ))}
            </span>
          )}

          {/* 节点内容行 */}
          <span
            className={classNames('soui-tree-node-content-wrapper', {
              'soui-tree-node-content-wrapper-block': blockNode,
            })}
          >
            {/* 展开/收起图标 */}
            {!leaf || isLoading ? (
              <span
                className={classNames('soui-tree-switcher', {
                  'soui-tree-switcher-open': isExpanded,
                  'soui-tree-switcher-close': !isExpanded,
                  'soui-tree-switcher-loading': isLoading,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpand(node);
                }}
              >
                {isLoading ? (
                  loadIcon || <Icon name="Loading" size={12} style={{ animation: 'soui-spin 1s linear infinite' }} />
                ) : (
                  renderSwitcherIcon(isExpanded)
                )}
              </span>
            ) : showLine ? (
              <span className="soui-tree-switcher soui-tree-switcher-leaf-line" />
            ) : (
              <span className="soui-tree-switcher soui-tree-switcher-noop" />
            )}

            {/* 勾选框 */}
            {checkable && node.checkable !== false && (
              <span className="soui-tree-checkbox">
                <Checkbox
                  checked={isChecked}
                  indeterminate={isHalfChecked && !isChecked}
                  disabled={nodeDisabled || node.disableCheckbox || false}
                  onChange={() => {
                    if (!nodeDisabled && !node.disableCheckbox) handleCheck(node);
                  }}
                />
              </span>
            )}

            {/* 节点图标 */}
            {(showIcon || node.icon) && (
              <span className="soui-tree-icon">
                {node.icon || (
                  <Icon
                    name={leaf ? 'FileText' : (isExpanded ? 'FolderOpen' : 'FolderClose')}
                    size={16}
                  />
                )}
              </span>
            )}

            {/* 标题 */}
            {(() => {
              const titleStr = typeof node.title === 'string' ? node.title : undefined;
              const titleEl = (
                <span
                  className={classNames('soui-tree-title', {
                    'soui-tree-title-truncate': tooltip,
                    'soui-tree-title-selected': isSelected,
                    'soui-tree-title-disabled': nodeDisabled,
                  })}
                  title={titleStr}
                  onClick={(e) => {
                    if (selectable && node.selectable !== false && !nodeDisabled) {
                      handleSelect(node, e);
                    }
                  }}
                >
                  {renderTitle(node)}
                </span>
              );
              return tooltip && titleStr ? (
                <Tooltip title={titleStr} placement="top">
                  {titleEl}
                </Tooltip>
              ) : titleEl;
            })()}
          </span>

          {/* 子节点 */}
          {hasKids && isExpanded && (
            <ul className="soui-tree-child-tree">
              {renderNodes(children!, level + 1, nodeIsEnd)}
            </ul>
          )}
        </li>
      );
    });
  };

  const treeCls = classNames(
    'soui-tree',
    {
      'soui-tree-show-line': showLine,
      'soui-tree-block-node': blockNode,
      'soui-tree-disabled': disabled,
    },
    className,
  );

  return (
    <div className={treeCls} style={treeStyle} {...rest}>
      {normalizedData.length > 0 ? (
        <ul className="soui-tree-list">
          {renderNodes(normalizedData, 0)}
        </ul>
      ) : (
        <div className="soui-tree-empty">{emptyText}</div>
      )}
    </div>
  );
};

Tree.displayName = 'Tree';

export default Tree;
