import React, { useContext, useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Empty from '../Empty';
import Loading from '../Loading';
import Pagination from '../Pagination';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 表格尺寸 */
export type TableSize = 'small' | 'middle' | 'large';

/** 排序方向 */
export type SortOrder = 'ascend' | 'descend' | null;

/** 列对齐方式 */
export type AlignType = 'left' | 'center' | 'right';

/** 表格列配置 */
export interface ColumnType<RecordType = any> {
  /** 列头显示文字 */
  title?: React.ReactNode;
  /** 数据索引 */
  dataIndex?: string;
  /** 列 key */
  key?: string;
  /** 列宽度 */
  width?: number | string;
  /** 列对齐方式 */
  align?: AlignType;
  /** 是否固定列 */
  fixed?: 'left' | 'right' | boolean;
  /** 自定义渲染 */
  render?: (text: any, record: RecordType, index: number) => React.ReactNode;
  /** 排序函数 */
  sorter?: ((a: RecordType, b: RecordType) => number) | boolean;
  /** 多列排序优先级（数字越大优先级越高） */
  multiple?: number;
  /** 排序方向（受控） */
  sortOrder?: SortOrder;
  /** 默认排序方向 */
  defaultSortOrder?: SortOrder;
  /** 过滤选项 */
  filters?: FilterItemType[];
  /** 过滤回调 */
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
  /** 受控过滤值 */
  filteredValue?: (string | number | boolean)[];
  /** 是否多选过滤 */
  filterMultiple?: boolean;
  /** 过滤搜索 */
  filterSearch?: boolean;
  /** 列自定义类名 */
  className?: string;
  /** 表头列合并列数 */
  colSpan?: number;
  /** 列自定义样式 */
  onCell?: (record: RecordType, index: number) => React.TdHTMLAttributes<HTMLTableCellElement>;
  /** 表头自定义样式 */
  onHeaderCell?: (column: ColumnType<RecordType>) => React.ThHTMLAttributes<HTMLTableCellElement>;
  /** 是否可省略 */
  ellipsis?: boolean;
  /** 子列（分组表头） */
  children?: ColumnType<RecordType>[];
}

/** 过滤选项 */
export interface FilterItemType {
  /** 显示文本 */
  text: React.ReactNode;
  /** 过滤值 */
  value: string | number | boolean;
}

/** 排序状态项（多列排序） */
export interface SortState {
  /** 排序字段 */
  field: string;
  /** 排序方向 */
  order: SortOrder;
  /** 优先级 */
  multiple?: number;
}

/** 分页配置 */
export interface PaginationConfig {
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 总条数 */
  total?: number;
  /** 页码改变回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 是否显示分页 */
  show?: boolean;
}

/** 行选择配置 */
export interface RowSelectionConfig<RecordType = any> {
  /** 选中的行 keys */
  selectedRowKeys?: (string | number)[];
  /** 选中改变回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: RecordType[]) => void;
  /** 获取行 key */
  getCheckboxProps?: (record: RecordType) => { disabled?: boolean; name?: string };
  /** 选择列宽度 */
  columnWidth?: number;
  /** 选择列标题 */
  columnTitle?: React.ReactNode;
  /** 固定选择列 */
  fixed?: boolean;
  /** 选择类型 */
  type?: 'checkbox' | 'radio';
}

/** 展开行配置 */
export interface ExpandableConfig<RecordType = any> {
  /** 展开的行 keys */
  expandedRowKeys?: (string | number)[];
  /** 展开改变回调 */
  onExpandedRowsChange?: (expandedRowKeys: (string | number)[]) => void;
  /** 自定义展开渲染 */
  expandedRowRender?: (record: RecordType, index: number) => React.ReactNode;
  /** 是否可展开 */
  rowExpandable?: (record: RecordType) => boolean;
  /** 展开列宽度 */
  columnWidth?: number;
}

/** Table 组件 Props */
export interface TableProps<RecordType = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  /** 列配置 */
  columns?: ColumnType<RecordType>[];
  /** 数据源 */
  dataSource?: RecordType[];
  /** 行 key 字段 */
  rowKey?: string | ((record: RecordType) => string | number);
  /** 表格尺寸 */
  size?: TableSize;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 表格标题 */
  title?: (data: RecordType[]) => React.ReactNode;
  /** 表格底部 */
  footer?: (data: RecordType[]) => React.ReactNode;
  /** 加载中状态 */
  loading?: boolean;
  /** 空数据展示 */
  emptyText?: React.ReactNode;
  /** 滚动配置 */
  scroll?: { x?: number | string; y?: number | string };
  /** 分页配置 */
  pagination?: PaginationConfig | false;
  /** 行选择配置 */
  rowSelection?: RowSelectionConfig<RecordType>;
  /** 展开行配置 */
  expandable?: ExpandableConfig<RecordType>;
  /** 行点击事件 */
  onRow?: (record: RecordType, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  /** 排序变化回调 */
  onChange?: (pagination: PaginationConfig, sorter: SortState | SortState[]) => void;
  /** 表格 summary */
  summary?: (data: RecordType[]) => React.ReactNode;
}

// ==================== Helper Functions ====================

function getRecordKey<RecordType>(record: RecordType, rowKey: string | ((record: RecordType) => string | number), index: number): string | number {
  if (typeof rowKey === 'function') {
    return rowKey(record);
  }
  return (record as any)?.[rowKey] ?? index;
}

function getCellValue(record: any, dataIndex?: string): any {
  if (!dataIndex) return undefined;
  const keys = dataIndex.split('.');
  let value = record;
  for (const key of keys) {
    if (value == null) return undefined;
    value = value[key];
  }
  return value;
}

// ==================== FilterDropdown Sub-Component ====================

interface FilterDropdownProps {
  filters: FilterItemType[];
  selectedValues: (string | number | boolean)[];
  multiple: boolean;
  search: boolean;
  onConfirm: (values: (string | number | boolean)[]) => void;
  onReset: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  selectedValues,
  multiple,
  search,
  onConfirm,
  onReset,
}) => {
  const [localValues, setLocalValues] = useState(selectedValues);
  const [searchText, setSearchText] = useState('');

  const filteredFilters = search && searchText
    ? filters.filter(f => String(f.text).toLowerCase().includes(searchText.toLowerCase()))
    : filters;

  const handleToggle = (value: string | number | boolean) => {
    if (multiple) {
      setLocalValues(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else {
      setLocalValues(prev => prev.includes(value) ? [] : [value]);
    }
  };

  return (
    <div className="soui-table-filter-dropdown-inner">
      {search && (
        <div className="soui-table-filter-search">
          <input
            type="text"
            placeholder="搜索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}
      <div className="soui-table-filter-list">
        {filteredFilters.map(filter => (
          <label key={String(filter.value)} className="soui-table-filter-item">
            <Checkbox
              checked={localValues.includes(filter.value)}
              onChange={() => handleToggle(filter.value)}
            />
            <span className="soui-table-filter-item-text">{filter.text}</span>
          </label>
        ))}
      </div>
      <div className="soui-table-filter-actions">
        <button className="soui-table-filter-btn soui-table-filter-btn-reset" onClick={onReset}>
          重置
        </button>
        <button
          className="soui-table-filter-btn soui-table-filter-btn-confirm"
          onClick={() => onConfirm(localValues)}
        >
          确定
        </button>
      </div>
    </div>
  );
};

// ==================== Component ====================

const Table = <RecordType extends any = any>({
  columns = [],
  dataSource = [],
  rowKey = 'key',
  size = 'middle',
  bordered = false,
  showHeader = true,
  striped = false,
  title,
  footer,
  loading = false,
  emptyText,
  scroll,
  pagination,
  rowSelection,
  expandable,
  onRow,
  onChange,
  summary,
  className,
  style,
  ...rest
}: TableProps<RecordType>) => {
  // Theme context
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Table || {}) as Record<string, any>;

  // Compute flat columns (needed before state init)
  const flattenColumns = (cols: ColumnType<RecordType>[]): ColumnType<RecordType>[] => {
    return cols.reduce((acc, col) => {
      if (col.children?.length) {
        acc.push(...flattenColumns(col.children));
      } else {
        acc.push(col);
      }
      return acc;
    }, [] as ColumnType<RecordType>[]);
  };

  const flatColumnsRef = React.useRef(flattenColumns(columns));
  flatColumnsRef.current = flattenColumns(columns);

  // CSS Variables for theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-table-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-table-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.headerBg !== undefined) {
    cssVars['--soui-table-header-bg'] = componentTheme.headerBg;
  }
  if (componentTheme.rowHoverBg !== undefined) {
    cssVars['--soui-table-row-hover-bg'] = componentTheme.rowHoverBg;
  }
  if (componentTheme.borderColor !== undefined) {
    cssVars['--soui-table-border-color'] = componentTheme.borderColor;
  }
  if (componentTheme.headerColor !== undefined) {
    cssVars['--soui-table-header-color'] = componentTheme.headerColor;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // Sort state (multi-column)
  const [sortStates, setSortStates] = useState<SortState[]>(() => {
    const initial: SortState[] = [];
    flatColumnsRef.current.forEach(col => {
      if (col.sortOrder) {
        initial.push({
          field: col.dataIndex || col.key || '',
          order: col.sortOrder,
          multiple: col.multiple,
        });
      }
    });
    return initial.sort((a, b) => (b.multiple ?? 0) - (a.multiple ?? 0));
  });

  // Filter state
  const [filterStates, setFilterStates] = useState<Record<string, (string | number | boolean)[]>>(() => {
    const initial: Record<string, (string | number | boolean)[]> = {};
    flatColumnsRef.current.forEach(col => {
      if (col.filteredValue !== undefined) {
        const field = col.dataIndex || col.key || '';
        initial[field] = col.filteredValue;
      }
    });
    return initial;
  });

  // Active filter dropdown
  const [activeFilterField, setActiveFilterField] = useState<string | null>(null);
  const filterRef = React.useRef<HTMLDivElement>(null);

  const paginationConfig = pagination === false ? null : pagination;

  // Pagination state
  const [paginationState, setPaginationState] = useState({
    current: paginationConfig?.current || 1,
    pageSize: paginationConfig?.pageSize || 10,
  });

  // Row selection state
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(
    rowSelection?.selectedRowKeys || []
  );

  // Expand state
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(
    expandable?.expandedRowKeys || []
  );

  // Sync controlled states
  React.useEffect(() => {
    if (rowSelection?.selectedRowKeys !== undefined) {
      setSelectedKeys(rowSelection.selectedRowKeys);
    }
  }, [rowSelection?.selectedRowKeys]);

  React.useEffect(() => {
    if (expandable?.expandedRowKeys !== undefined) {
      setExpandedKeys(expandable.expandedRowKeys);
    }
  }, [expandable?.expandedRowKeys]);

  React.useEffect(() => {
    if (paginationConfig && paginationConfig.current !== undefined) {
      setPaginationState(prev => ({ ...prev, current: paginationConfig.current! }));
    }
  }, [paginationConfig?.current]);

  // Handle sort (multi-column)
  const handleSort = useCallback((column: ColumnType<RecordType>) => {
    if (!column.sorter) return;

    const field = column.dataIndex || column.key || '';
    const existing = sortStates.find(s => s.field === field);
    let newOrder: SortOrder;

    if (existing) {
      if (existing.order === 'ascend') newOrder = 'descend';
      else if (existing.order === 'descend') newOrder = null;
      else newOrder = 'ascend';
    } else {
      newOrder = 'ascend';
    }

    let newStates: SortState[];
    if (column.multiple !== undefined) {
      // Multi-sort mode: maintain all active sorts
      if (newOrder === null) {
        newStates = sortStates.filter(s => s.field !== field);
      } else if (existing) {
        newStates = sortStates.map(s => s.field === field ? { ...s, order: newOrder } : s);
      } else {
        newStates = [...sortStates, { field, order: newOrder, multiple: column.multiple }];
      }
      newStates.sort((a, b) => (b.multiple ?? 0) - (a.multiple ?? 0));
    } else {
      // Single sort mode: replace all
      newOrder = newOrder === null ? null : (existing ? newOrder : 'ascend');
      if (newOrder === null) {
        newStates = [];
      } else {
        newStates = [{ field, order: newOrder, multiple: column.multiple }];
      }
    }

    setSortStates(newStates);
    onChange?.(paginationState, newStates.length === 1 ? newStates[0] : newStates);
  }, [sortStates, paginationState, onChange]);

  // Handle row selection
  const handleSelectRow = useCallback((key: string | number, checked: boolean) => {
    let newKeys: (string | number)[];
    if (rowSelection?.type === 'radio') {
      newKeys = checked ? [key] : [];
    } else {
      newKeys = checked ? [...selectedKeys, key] : selectedKeys.filter(k => k !== key);
    }
    setSelectedKeys(newKeys);
    const selectedRows = dataSource.filter((record, index) => {
      const recordKey = getRecordKey(record, rowKey, index);
      return newKeys.includes(recordKey);
    });
    rowSelection?.onChange?.(newKeys, selectedRows);
  }, [selectedKeys, dataSource, rowKey, rowSelection]);

  const handleSelectAll = useCallback((checked: boolean) => {
    let newKeys: (string | number)[];
    if (checked) {
      newKeys = dataSource.map((record, index) => getRecordKey(record, rowKey, index));
      // Filter disabled rows
      if (rowSelection?.getCheckboxProps) {
        newKeys = newKeys.filter((key, index) => {
          const props = rowSelection.getCheckboxProps!(dataSource[index]);
          return !props.disabled;
        });
      }
    } else {
      newKeys = [];
    }
    setSelectedKeys(newKeys);
    const selectedRows = dataSource.filter((_, index) => newKeys.includes(getRecordKey(dataSource[index], rowKey, index)));
    rowSelection?.onChange?.(newKeys, selectedRows);
  }, [dataSource, rowKey, rowSelection]);

  // Handle expand
  const handleExpand = useCallback((key: string | number) => {
    const newKeys = expandedKeys.includes(key)
      ? expandedKeys.filter(k => k !== key)
      : [...expandedKeys, key];
    setExpandedKeys(newKeys);
    expandable?.onExpandedRowsChange?.(newKeys);
  }, [expandedKeys, expandable]);

  // Handle pagination change
  const handlePageChange = useCallback((page: number) => {
    setPaginationState(prev => ({ ...prev, current: page }));
    paginationConfig?.onChange?.(page, paginationState.pageSize);
  }, [paginationConfig, paginationState.pageSize]);

  // Handle filter change
  const handleFilterChange = useCallback((field: string, values: (string | number | boolean)[]) => {
    setFilterStates(prev => {
      const next = { ...prev };
      if (values.length === 0) {
        delete next[field];
      } else {
        next[field] = values;
      }
      return next;
    });
  }, []);

  // Handle filter reset
  const handleFilterReset = useCallback((field: string) => {
    setFilterStates(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  // Close filter dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setActiveFilterField(null);
      }
    };
    if (activeFilterField) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeFilterField]);

  // Process data: filter + sort + paginate
  const processedData = useMemo(() => {
    let data = [...dataSource];

    // Apply filters
    flatColumnsRef.current.forEach(col => {
      const field = col.dataIndex || col.key || '';
      const activeValues = col.filteredValue !== undefined ? col.filteredValue : filterStates[field];
      if (activeValues && activeValues.length > 0 && col.onFilter) {
        data = data.filter(record =>
          activeValues.some(val => col.onFilter!(val, record))
        );
      }
    });

    // Apply multi-column sorting
    if (sortStates.length > 0) {
      data.sort((a, b) => {
        for (const state of sortStates) {
          if (!state.order) continue;
          const col = flatColumnsRef.current.find(c => (c.dataIndex || c.key || '') === state.field);
          if (col && typeof col.sorter === 'function') {
            const result = (col.sorter as (a: RecordType, b: RecordType) => number)(a, b);
            const finalResult = state.order === 'descend' ? -result : result;
            if (finalResult !== 0) return finalResult;
          }
        }
        return 0;
      });
    }

    return data;
  }, [dataSource, sortStates, filterStates]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (!paginationConfig || paginationConfig.show === false) return processedData;
    const { current, pageSize } = paginationState;
    const start = (current - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, paginationState, paginationConfig]);

  const totalRecords = paginationConfig?.total ?? processedData.length;
  const totalPages = Math.ceil(totalRecords / paginationState.pageSize);

  // Check if all selectable rows are selected
  const allSelected = useMemo(() => {
    if (rowSelection?.getCheckboxProps) {
      const selectableKeys = dataSource
        .map((record, index) => ({
          key: getRecordKey(record, rowKey, index),
          props: rowSelection.getCheckboxProps!(record),
        }))
        .filter(item => !item.props.disabled)
        .map(item => item.key);
      return selectableKeys.length > 0 && selectableKeys.every(key => selectedKeys.includes(key));
    }
    return dataSource.length > 0 && selectedKeys.length === dataSource.length;
  }, [dataSource, selectedKeys, rowKey, rowSelection]);

  // Flatten columns (handle children for grouped headers)
  const flatColumns = useMemo(() => {
    return flattenColumns(columns);
  }, [columns]);

  // Calculate total columns count (including selection + expand)
  const totalColSpan = flatColumns.length
    + (rowSelection ? 1 : 0)
    + (expandable ? 1 : 0);

  // Render sort icon (multi-column aware)
  const renderSortIcon = (column: ColumnType<RecordType>) => {
    if (!column.sorter) return null;
    const field = column.dataIndex || column.key || '';
    const sortItem = sortStates.find(s => s.field === field);
    const isActive = !!sortItem && !!sortItem.order;
    const isMulti = sortStates.length > 1;

    return (
      <span className="soui-table-sorter">
        <span
          className={classNames('soui-table-sorter-icon', 'soui-table-sorter-ascend', {
            'soui-table-sorter-active': isActive && sortItem?.order === 'ascend',
          })}
        >
          <Icon name="Up" size={14} />
        </span>
        <span
          className={classNames('soui-table-sorter-icon', 'soui-table-sorter-descend', {
            'soui-table-sorter-active': isActive && sortItem?.order === 'descend',
          })}
        >
          <Icon name="Down" size={14} />
        </span>
        {isMulti && isActive && column.multiple !== undefined && (
          <span className="soui-table-sorter-order">{column.multiple}</span>
        )}
      </span>
    );
  };

  // Render filter dropdown
  const renderFilterDropdown = (column: ColumnType<RecordType>) => {
    if (!column.filters?.length) return null;
    const field = column.dataIndex || column.key || '';
    const activeValues = column.filteredValue !== undefined ? column.filteredValue : (filterStates[field] || []);
    const isActive = activeValues.length > 0;
    const isMulti = column.filterMultiple !== false;
    const isOpen = activeFilterField === field;

    return (
      <span className="soui-table-filter" ref={isOpen ? filterRef : undefined}>
        <span
          className={classNames('soui-table-filter-icon', {
            'soui-table-filter-active': isActive,
          })}
          onClick={(e) => {
            e.stopPropagation();
            setActiveFilterField(isOpen ? null : field);
          }}
          role="button"
          aria-label="过滤"
        >
          <Icon name="Filter" size={12} />
        </span>
        {isOpen && (
          <div className="soui-table-filter-dropdown" onClick={(e) => e.stopPropagation()}>
            <FilterDropdown
              filters={column.filters}
              selectedValues={activeValues}
              multiple={isMulti}
              search={!!column.filterSearch}
              onConfirm={(values) => {
                handleFilterChange(field, values);
                setActiveFilterField(null);
              }}
              onReset={() => {
                handleFilterReset(field);
                setActiveFilterField(null);
              }}
            />
          </div>
        )}
      </span>
    );
  };

  // Render header
  const renderHeader = () => {
    if (!showHeader) return null;

    const renderColumns = (cols: ColumnType<RecordType>[], level: number = 0): React.ReactNode => {
      return cols.map((column, colIndex) => {
        const hasChildren = column.children && column.children.length > 0;
        const colSpan = column.colSpan || (hasChildren ? 1 : 1);
        const headerCellProps = column.onHeaderCell?.(column) || {};
        const field = column.dataIndex || column.key || '';
        const isSorted = sortStates.some(s => s.field === field && s.order !== null);
        const hasFilter = !!column.filters?.length;

        // colSpan=0 时跳过渲染表头（被合并的列）
        if (colSpan === 0 || headerCellProps.colSpan === 0) return null;

        return (
          <th
            key={column.key || column.dataIndex || colIndex}
            className={classNames(
              'soui-table-th',
              column.className,
              {
                'soui-table-th-sortable': column.sorter,
                'soui-table-th-ellipsis': column.ellipsis,
                [`soui-table-th-align-${column.align}`]: column.align,
                'soui-table-th-fixed-left': column.fixed === 'left' || column.fixed === true,
                'soui-table-th-fixed-right': column.fixed === 'right',
                'soui-table-th-sorted': isSorted,
                'soui-table-th-filtered': hasFilter && (filterStates[field]?.length > 0 || (column.filteredValue && column.filteredValue.length > 0)),
                'soui-table-th-sticky': !!scroll?.y,
              }
            )}
            style={{
              width: column.width,
              ...headerCellProps.style,
            }}
            rowSpan={hasChildren ? 1 : undefined}
            colSpan={colSpan}
            onClick={column.sorter ? () => handleSort(column) : undefined}
            {...headerCellProps}
          >
            <span className="soui-table-th-content">
              {column.title}
              {renderSortIcon(column)}
              {renderFilterDropdown(column)}
            </span>
          </th>
        );
      });
    };

    return (
      <thead className="soui-table-thead">
        <tr>{/* Expand column header */}
          {expandable && (
            <th className="soui-table-th soui-table-th-expand" style={{ width: expandable.columnWidth || 48 }} />
          )}
          {/* Selection column header */}
          {rowSelection && (
            <th className="soui-table-th soui-table-th-selection" style={{ width: rowSelection.columnWidth || 48 }}>
              {rowSelection.type !== 'radio' && (
                <Checkbox
                  checked={allSelected}
                  indeterminate={!allSelected && selectedKeys.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="全选"
                />
              )}
              {rowSelection.columnTitle}
            </th>
          )}
          {/* Data columns */}
          {renderColumns(columns)}
        </tr>
      </thead>
    );
  };

  // Render body
  const renderBody = () => {
    if (paginatedData.length === 0) {
      return (
        <tbody className="soui-table-tbody">
          <tr className="soui-table-tr soui-table-tr-empty">
            <td colSpan={totalColSpan} className="soui-table-td soui-table-td-empty">
              {loading ? (
                <Loading spinning tip="加载中..." />
              ) : (
                emptyText || <Empty description="暂无数据" />
              )}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="soui-table-tbody">
        {paginatedData.map((record, rowIndex) => {
          const recordKey = getRecordKey(record, rowKey, rowIndex);
          const isSelected = selectedKeys.includes(recordKey);
          const isExpanded = expandedKeys.includes(recordKey);
          const rowProps = onRow?.(record, rowIndex) || {};

          return (
            <React.Fragment key={recordKey}>
              <tr
                className={classNames('soui-table-tr', {
                  'soui-table-tr-selected': isSelected,
                  'soui-table-tr-expanded': isExpanded,
                })}
                {...rowProps}
              >
                {/* Expand cell */}
                {expandable && (
                  <td className="soui-table-td soui-table-td-expand">
                    {expandable.rowExpandable?.(record) !== false && (
                      <span
                        className={classNames('soui-table-expand-icon', { 'soui-table-expand-icon-expanded': isExpanded })}
                        onClick={() => handleExpand(recordKey)}
                        role="button"
                        aria-label={isExpanded ? '收起' : '展开'}
                      >
                        {isExpanded ? <Icon name="Minus" size={12} /> : <Icon name="Plus" size={12} />}
                      </span>
                    )}
                  </td>
                )}
                {/* Selection cell */}
                {rowSelection && (
                  <td className="soui-table-td soui-table-td-selection">
                    {rowSelection.type === 'radio' ? (
                      <Radio
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(recordKey, e.target.checked)}
                        disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                        aria-label={`选择第 ${rowIndex + 1} 行`}
                      />
                    ) : (
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(recordKey, e.target.checked)}
                        disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                        aria-label={`选择第 ${rowIndex + 1} 行`}
                      />
                    )}
                  </td>
                )}
                {/* Data cells */}
                {flatColumns.map((column, colIndex) => {
                  const cellValue = getCellValue(record, column.dataIndex);
                  const cellProps = column.onCell?.(record, rowIndex) || {};

                  // colSpan=0 或 rowSpan=0 时跳过渲染（被合并的单元格）
                  if (cellProps.colSpan === 0 || cellProps.rowSpan === 0) return null;

                  const content = column.render
                    ? column.render(cellValue, record, rowIndex)
                    : cellValue;

                  return (
                    <td
                      key={column.key || column.dataIndex || colIndex}
                      className={classNames(
                        'soui-table-td',
                        column.className,
                        {
                          'soui-table-td-ellipsis': column.ellipsis,
                          [`soui-table-td-align-${column.align}`]: column.align,
                          'soui-table-td-fixed-left': column.fixed === 'left' || column.fixed === true,
                          'soui-table-td-fixed-right': column.fixed === 'right',
                        }
                      )}
                      style={{ width: column.width }}
                      {...cellProps}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
              {/* Expanded row */}
              {expandable && isExpanded && expandable.expandedRowRender && (
                <tr className="soui-table-tr soui-table-tr-expand-row">
                  <td colSpan={totalColSpan} className="soui-table-td soui-table-td-expand-content">
                    {expandable.expandedRowRender(record, rowIndex)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  // Render pagination
  const renderPagination = () => {
    if (!paginationConfig || paginationConfig.show === false) return null;
    if (totalPages <= 1 && totalRecords <= paginationState.pageSize) return null;

    return (
      <div className="soui-table-pagination">
        <Pagination
          current={paginationState.current}
          pageSize={paginationState.pageSize}
          total={totalRecords}
          onChange={handlePageChange}
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>
    );
  };

  // Table class names
  const tableClassName = classNames(
    'soui-table',
    {
      'soui-table-bordered': bordered,
      'soui-table-striped': striped,
      [`soui-table-${size}`]: size,
      'soui-table-loading': loading,
      'soui-table-scroll-x': scroll?.x,
      'soui-table-scroll-y': scroll?.y,
    },
    className
  );

  return (
    <Loading spinning={loading} tip="加载中...">
      <div className={tableClassName} style={componentStyle} {...rest}>
        {/* Table title */}
        {title && (
          <div className="soui-table-title">
            {title(processedData)}
          </div>
        )}

      {/* Table wrapper for scroll */}
      <div
        className="soui-table-wrapper"
        style={{
          overflowX: scroll?.x ? 'auto' : undefined,
          overflowY: scroll?.y ? 'auto' : undefined,
          maxHeight: scroll?.y,
        }}
      >
        <table
          className="soui-table-element"
          style={{
            minWidth: scroll?.x,
            tableLayout: scroll?.x ? 'fixed' : undefined,
          }}
        >
          {renderHeader()}
          {renderBody()}
          {summary && (
            <tfoot className="soui-table-tfoot">
              {summary(processedData)}
            </tfoot>
          )}
        </table>
      </div>

      {/* Table footer */}
      {footer && (
        <div className="soui-table-footer">
          {footer(processedData)}
        </div>
      )}

      {/* Pagination */}
      {renderPagination()}
    </div>
    </Loading>
  );
};

Table.displayName = 'Table';

export default Table;
