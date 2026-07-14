import React, { useState, useContext, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import { addOpacityToColor } from '@/utils';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** Pagination 尺寸 */
export type PaginationSize = 'default' | 'small';

/** Pagination Props */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'> {
  /** 当前页码 */
  current?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 数据总数 */
  total?: number;
  /** 页码或 pageSize 改变的回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** pageSize 改变的回调 */
  onShowSizeChange?: (current: number, size: number) => void;
  /** 是否显示 pageSize 切换器 */
  showSizeChanger?: boolean;
  /** 指定每页显示项数 */
  pageSizeOptions?: number[];
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 用于显示数据总量的回调 */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /** 尺寸 */
  size?: PaginationSize;
  /** 简洁模式 */
  simple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 只有一页时是否隐藏 */
  hideOnSinglePage?: boolean;
}

// ==================== Helpers ====================

/** 计算页码列表（含省略逻辑） */
function getPageList(current: number, totalPages: number): (number | 'left-ellipsis' | 'right-ellipsis')[] {
  const pages: (number | 'left-ellipsis' | 'right-ellipsis')[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible + 2) {
    // 总页数不多，全部显示
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // 始终显示第一页
  pages.push(1);

  let start = Math.max(2, current - 2);
  let end = Math.min(totalPages - 1, current + 2);

  // 保证中间至少显示 5 个
  if (current <= 4) {
    end = Math.min(totalPages - 1, maxVisible - 1);
    start = 2;
  } else if (current >= totalPages - 3) {
    start = Math.max(2, totalPages - maxVisible + 2);
    end = totalPages - 1;
  }

  if (start > 2) pages.push('left-ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('right-ellipsis');

  // 始终显示最后一页
  pages.push(totalPages);

  return pages;
}

// ==================== Component ====================

const Pagination: React.FC<PaginationProps> = ({
  current: currentProp,
  defaultCurrent = 1,
  pageSize: pageSizeProp,
  defaultPageSize = 10,
  total = 0,
  onChange,
  onShowSizeChange,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = false,
  showTotal,
  size = 'default',
  simple = false,
  disabled = false,
  hideOnSinglePage = false,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Pagination || {}) as Record<string, any>;

  // CSS Variables for theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-pagination-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-pagination-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.itemBg !== undefined) {
    cssVars['--soui-pagination-item-bg'] = componentTheme.itemBg;
  }
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-pagination-color-primary'] = componentTheme.colorPrimary;
    cssVars['--soui-pagination-primary-color-20'] = addOpacityToColor(componentTheme.colorPrimary, 0.1);
  }
  if (componentTheme.borderColor !== undefined) {
    cssVars['--soui-pagination-border-color'] = componentTheme.borderColor;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // Internal state
  const [innerCurrent, setInnerCurrent] = useState(defaultCurrent);
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);
  const [jumperValue, setJumperValue] = useState('');

  const isControlled = currentProp !== undefined;
  const isPageSizeControlled = pageSizeProp !== undefined;

  const current = isControlled ? currentProp : innerCurrent;
  const pageSize = isPageSizeControlled ? pageSizeProp : innerPageSize;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Hide on single page
  if (hideOnSinglePage && totalPages <= 1) return null;

  // Page change handler
  const goTo = useCallback((page: number) => {
    if (disabled) return;
    const p = Math.max(1, Math.min(page, totalPages));
    if (p === current) return;
    if (!isControlled) setInnerCurrent(p);
    onChange?.(p, pageSize);
  }, [disabled, totalPages, current, isControlled, onChange, pageSize]);

  // Page size change handler
  const handleSizeChange = useCallback((newSize: number) => {
    if (disabled) return;
    if (!isPageSizeControlled) setInnerPageSize(newSize);
    const newTotalPages = Math.max(1, Math.ceil(total / newSize));
    const newCurrent = Math.min(current, newTotalPages);
    if (!isControlled) setInnerCurrent(newCurrent);
    onShowSizeChange?.(newCurrent, newSize);
    onChange?.(newCurrent, newSize);
  }, [disabled, isPageSizeControlled, total, current, isControlled, onShowSizeChange, onChange]);

  // Quick jumper handler
  const handleJumperKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumperValue, 10);
      if (!isNaN(page)) {
        goTo(page);
      }
      setJumperValue('');
    }
  }, [jumperValue, goTo]);

  // Page list
  const pageList = useMemo(() => getPageList(current, totalPages), [current, totalPages]);

  // Range for showTotal
  const startRange = (current - 1) * pageSize + 1;
  const endRange = Math.min(current * pageSize, total);

  // Class names
  const paginationClassName = classNames(
    'soui-pagination',
    {
      [`soui-pagination-${size}`]: size !== 'default',
      'soui-pagination-simple': simple,
      'soui-pagination-disabled': disabled,
    },
    className
  );

  // ==================== Simple Mode ====================
  if (simple) {
    return (
      <ul className={paginationClassName} style={componentStyle} {...rest}>
        {showTotal && (
          <li className="soui-pagination-total">
            {showTotal(total, [startRange, endRange])}
          </li>
        )}
        <li
          className={classNames('soui-pagination-prev', { 'soui-pagination-disabled': current <= 1 || disabled })}
          onClick={() => goTo(current - 1)}
          aria-label="上一页"
        >
          <Icon name="Left" size={size === 'small' ? 12 : 14} />
        </li>
        <li className="soui-pagination-simple-pager">
          <input
            type="text"
            value={current}
            disabled={disabled}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) goTo(v);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const v = parseInt((e.target as HTMLInputElement).value, 10);
                if (!isNaN(v)) goTo(v);
              }
            }}
            aria-label="当前页码"
          />
          <span className="soui-pagination-slash">/</span>
          <span>{totalPages}</span>
        </li>
        <li
          className={classNames('soui-pagination-next', { 'soui-pagination-disabled': current >= totalPages || disabled })}
          onClick={() => goTo(current + 1)}
          aria-label="下一页"
        >
          <Icon name="Right" size={size === 'small' ? 12 : 14} />
        </li>
      </ul>
    );
  }

  // ==================== Full Mode ====================
  return (
    <ul className={paginationClassName} style={componentStyle} {...rest}>
      {/* Total */}
      {showTotal && (
        <li className="soui-pagination-total">
          {showTotal(total, [startRange, endRange])}
        </li>
      )}

      {/* Page Size Changer */}
      {showSizeChanger && (
        <li className="soui-pagination-options">
          <select
            value={pageSize}
            disabled={disabled}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="soui-pagination-size-selector"
            aria-label="每页条数"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt} 条/页</option>
            ))}
          </select>
        </li>
      )}

      {/* Prev */}
      <li
        className={classNames('soui-pagination-prev', {
          'soui-pagination-disabled': current <= 1 || disabled,
        })}
        onClick={() => goTo(current - 1)}
        aria-label="上一页"
      >
        <Icon name="Left" size={size === 'small' ? 12 : 14} />
      </li>

      {/* Page Items */}
      {pageList.map((page, index) => {
        if (page === 'left-ellipsis' || page === 'right-ellipsis') {
          return (
            <li
              key={page}
              className="soui-pagination-jump"
              onClick={() => {
                if (page === 'left-ellipsis') goTo(Math.max(1, current - 5));
                else goTo(Math.min(totalPages, current + 5));
              }}
              aria-label={page === 'left-ellipsis' ? '向前5页' : '向后5页'}
            >
              <span className="soui-pagination-ellipsis">•••</span>
            </li>
          );
        }

        return (
          <li
            key={page}
            className={classNames('soui-pagination-item', {
              'soui-pagination-item-active': page === current,
            })}
            onClick={() => goTo(page)}
            aria-label={`第 ${page} 页`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </li>
        );
      })}

      {/* Next */}
      <li
        className={classNames('soui-pagination-next', {
          'soui-pagination-disabled': current >= totalPages || disabled,
        })}
        onClick={() => goTo(current + 1)}
        aria-label="下一页"
      >
        <Icon name="Right" size={size === 'small' ? 12 : 14} />
      </li>

      {/* Quick Jumper */}
      {showQuickJumper && (
        <li className="soui-pagination-jumper">
          <span>跳至</span>
          <input
            type="text"
            value={jumperValue}
            disabled={disabled}
            onChange={(e) => setJumperValue(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={handleJumperKeyDown}
            aria-label="快速跳转页码"
          />
          <span>页</span>
        </li>
      )}
    </ul>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
