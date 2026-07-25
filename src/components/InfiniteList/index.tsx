import React, { useRef, useCallback, useEffect, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Loading from '../Loading';
import './style.less';

// ==================== Types ====================

export interface InfiniteListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  /** 数据源 */
  dataSource: any[];
  /** 渲染每一项 */
  renderItem: (item: any, index: number) => React.ReactNode;
  /** 是否正在加载 */
  loading?: boolean;
  /** 是否还有更多数据 */
  hasMore?: boolean;
  /** 加载更多回调 */
  onLoadMore?: () => void;
  /** 触底加载阈值（像素） */
  threshold?: number;
  /** 容器高度（数字为 px，字符串如 '100vh'） */
  height?: number | string;
  /** 自定义加载中内容 */
  loadingContent?: React.ReactNode;
  /** 自定义"没有更多"内容 */
  noMoreContent?: React.ReactNode;
  /** 自定义空状态内容 */
  emptyContent?: React.ReactNode;
  /** 提取唯一 key */
  keyExtractor?: (item: any, index: number) => string | number;
  /** 列表项类名 */
  itemClassName?: string;
  /** 列表项样式 */
  itemStyle?: React.CSSProperties;
  /** 是否使用滚动条 */
  showScrollbar?: boolean;
  /** 滚动事件回调 */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

// ==================== Component ====================

const InfiniteList: React.FC<InfiniteListProps> = ({
  dataSource = [],
  renderItem,
  loading = false,
  hasMore = true,
  onLoadMore,
  threshold = 100,
  height = 400,
  loadingContent,
  noMoreContent,
  emptyContent,
  keyExtractor,
  itemClassName,
  itemStyle,
  showScrollbar = false,
  onScroll,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.InfiniteList || {}) as Record<string, any>;

  // Theme CSS variables
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorBg !== undefined) cssVars['--soui-infinite-list-color-bg'] = theme.colorBg;
  if (theme.colorText !== undefined) cssVars['--soui-infinite-list-color-text'] = theme.colorText;
  if (theme.colorBorder !== undefined) cssVars['--soui-infinite-list-color-border'] = theme.colorBorder;
  if (theme.itemHoverBg !== undefined) cssVars['--soui-infinite-list-item-hover-bg'] = theme.itemHoverBg;
  if (theme.itemActiveBg !== undefined) cssVars['--soui-infinite-list-item-active-bg'] = theme.itemActiveBg;
  if (theme.borderRadius !== undefined) cssVars['--soui-infinite-list-border-radius'] = `${theme.borderRadius}px`;
  if (theme.fontSize !== undefined) cssVars['--soui-infinite-list-font-size'] = `${theme.fontSize}px`;

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  // Prevent duplicate loads
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      onScroll?.(e);

      if (!hasMore || loadingRef.current || !onLoadMore) return;

      const target = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceToBottom <= threshold) {
        onLoadMore();
      }
    },
    [hasMore, threshold, onLoadMore, onScroll],
  );

  // Render footer (loading / no more)
  const renderFooter = () => {
    if (loading) {
      return (
        <div className="soui-infinite-list-footer soui-infinite-list-footer-loading">
          {loadingContent ?? (
            <div className="soui-infinite-list-loading">
              <Loading size="small" />
              <span className="soui-infinite-list-loading-text">加载中...</span>
            </div>
          )}
        </div>
      );
    }

    if (!hasMore && dataSource.length > 0) {
      return (
        <div className="soui-infinite-list-footer soui-infinite-list-footer-no-more">
          {noMoreContent ?? <span className="soui-infinite-list-no-more-text">没有更多了</span>}
        </div>
      );
    }

    return null;
  };

  // Render empty state
  const renderEmpty = () => {
    if (dataSource.length > 0 || loading) return null;
    return (
      <div className="soui-infinite-list-empty">
        {emptyContent ?? <span className="soui-infinite-list-empty-text">暂无数据</span>}
      </div>
    );
  };

  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  const listClassName = classNames(
    'soui-infinite-list',
    {
      'soui-infinite-list-hide-scrollbar': !showScrollbar,
      'soui-infinite-list-empty-state': dataSource.length === 0 && !loading,
    },
    className,
  );

  return (
    <div
      ref={containerRef}
      className={listClassName}
      style={{ ...componentStyle, height: containerHeight }}
      onScroll={handleScroll}
      role="list"
      {...rest}
    >
      {dataSource.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : index;
        return (
          <div
            key={key}
            className={classNames('soui-infinite-list-item', itemClassName)}
            style={itemStyle}
            role="listitem"
          >
            {renderItem(item, index)}
          </div>
        );
      })}

      {renderFooter()}
      {renderEmpty()}
    </div>
  );
};

InfiniteList.displayName = 'InfiniteList';

export default InfiniteList;
