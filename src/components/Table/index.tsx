import React, { useContext, useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
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
  /** 排序方向（受控） */
  sortOrder?: SortOrder;
  /** 默认排序方向 */
  defaultSortOrder?: SortOrder;
  /** 列自定义类名 */
  className?: string;
  /** 列自定义样式 */
  onCell?: (record: RecordType, index: number) => React.TdHTMLAttributes<HTMLTableCellElement>;
  /** 表头自定义样式 */
  onHeaderCell?: (column: ColumnType<RecordType>) => React.ThHTMLAttributes<HTMLTableCellElement>;
  /** 是否可省略 */
  ellipsis?: boolean;
  /** 子列（分组表头） */
  children?: ColumnType<RecordType>[];
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
  onChange?: (pagination: PaginationConfig, sorter: { field: string; order: SortOrder }) => void;
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

  // Sort state
  const [sortState, setSortState] = useState<{ field: string; order: SortOrder }>({
    field: '',
    order: null,
  });

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

  // Handle sort
  const handleSort = useCallback((column: ColumnType<RecordType>) => {
    if (!column.sorter) return;

    const field = column.dataIndex || column.key || '';
    let newOrder: SortOrder;

    if (sortState.field === field) {
      if (sortState.order === 'ascend') newOrder = 'descend';
      else if (sortState.order === 'descend') newOrder = null;
      else newOrder = 'ascend';
    } else {
      newOrder = 'ascend';
    }

    setSortState({ field, order: newOrder });
    onChange?.(paginationState, { field, order: newOrder });
  }, [sortState, paginationState, onChange]);

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

  // Process data: sort + paginate
  const processedData = useMemo(() => {
    let data = [...dataSource];

    // Apply sorting
    if (sortState.order && sortState.field) {
      const sortColumn = columns.find(col => col.dataIndex === sortState.field || col.key === sortState.field);
      if (sortColumn && typeof sortColumn.sorter === 'function') {
        const sorterFn = sortColumn.sorter as (a: RecordType, b: RecordType) => number;
        data.sort((a, b) => {
          const result = sorterFn(a, b);
          return sortState.order === 'descend' ? -result : result;
        });
      }
    }

    return data;
  }, [dataSource, sortState, columns]);

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
    const flatten = (cols: ColumnType<RecordType>[]): ColumnType<RecordType>[] => {
      return cols.reduce((acc, col) => {
        if (col.children?.length) {
          acc.push(...flatten(col.children));
        } else {
          acc.push(col);
        }
        return acc;
      }, [] as ColumnType<RecordType>[]);
    };
    return flatten(columns);
  }, [columns]);

  // Calculate total columns count (including selection + expand)
  const totalColSpan = flatColumns.length
    + (rowSelection ? 1 : 0)
    + (expandable ? 1 : 0);

  // Render sort icon
  const renderSortIcon = (column: ColumnType<RecordType>) => {
    if (!column.sorter) return null;
    const field = column.dataIndex || column.key || '';
    const isActive = sortState.field === field;
    return (
      <span className="soui-table-sorter">
        <span
          className={classNames('soui-table-sorter-icon', 'soui-table-sorter-ascend', {
            'soui-table-sorter-active': isActive && sortState.order === 'ascend',
          })}
        >
          ▲
        </span>
        <span
          className={classNames('soui-table-sorter-icon', 'soui-table-sorter-descend', {
            'soui-table-sorter-active': isActive && sortState.order === 'descend',
          })}
        >
          ▼
        </span>
      </span>
    );
  };

  // Render header
  const renderHeader = () => {
    if (!showHeader) return null;

    const renderColumns = (cols: ColumnType<RecordType>[], level: number = 0): React.ReactNode => {
      return cols.map((column, colIndex) => {
        const hasChildren = column.children && column.children.length > 0;
        const colSpan = hasChildren ? 1 : 1;
        const headerCellProps = column.onHeaderCell?.(column) || {};
        const isSorted = sortState.field === (column.dataIndex || String(column.key));

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
              }
            )}
            style={{
              width: column.width,
              ...headerCellProps.style,
            }}
            rowSpan={hasChildren ? 1 : undefined}
            colSpan={colSpan}
            onClick={() => handleSort(column)}
            {...headerCellProps}
          >
            <span className="soui-table-th-content">
              {column.title}
              {renderSortIcon(column)}
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
                <input
                  type="checkbox"
                  className="soui-table-checkbox"
                  checked={allSelected}
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
                <div className="soui-table-loading">
                  <div className="soui-table-loading-spinner" />
                  <span>加载中...</span>
                </div>
              ) : (
                emptyText || <div className="soui-table-empty">暂无数据</div>
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
                        {isExpanded ? '−' : '+'}
                      </span>
                    )}
                  </td>
                )}
                {/* Selection cell */}
                {rowSelection && (
                  <td className="soui-table-td soui-table-td-selection">
                    <input
                      type={rowSelection.type === 'radio' ? 'radio' : 'checkbox'}
                      className={rowSelection.type === 'radio' ? 'soui-table-radio' : 'soui-table-checkbox'}
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(recordKey, e.target.checked)}
                      disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                      aria-label={`选择第 ${rowIndex + 1} 行`}
                    />
                  </td>
                )}
                {/* Data cells */}
                {flatColumns.map((column, colIndex) => {
                  const cellValue = getCellValue(record, column.dataIndex);
                  const cellProps = column.onCell?.(record, rowIndex) || {};
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

    const pages: number[] = [];
    const maxVisible = 7;
    let start = Math.max(1, paginationState.current - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return (
      <div className="soui-table-pagination">
        <span className="soui-table-pagination-total">共 {totalRecords} 条</span>
        <div className="soui-table-pagination-pages">
          <button
            className="soui-table-pagination-btn"
            disabled={paginationState.current <= 1}
            onClick={() => handlePageChange(paginationState.current - 1)}
            aria-label="上一页"
          >
            ‹
          </button>
          {pages.map(page => (
            <button
              key={page}
              className={classNames('soui-table-pagination-btn', {
                'soui-table-pagination-btn-active': page === paginationState.current,
              })}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="soui-table-pagination-btn"
            disabled={paginationState.current >= totalPages}
            onClick={() => handlePageChange(paginationState.current + 1)}
            aria-label="下一页"
          >
            ›
          </button>
        </div>
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
    <div className={tableClassName} style={componentStyle} {...rest}>
      {/* Loading overlay */}
      {loading && (
        <div className="soui-table-loading-mask">
          <div className="soui-table-loading-spinner" />
        </div>
      )}

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
  );
};

Table.displayName = 'Table';

export default Table;
