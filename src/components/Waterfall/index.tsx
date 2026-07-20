import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 响应式断点配置 */
export interface WaterfallBreakpoints {
  /** < 576px */
  xs?: number;
  /** >= 576px */
  sm?: number;
  /** >= 768px */
  md?: number;
  /** >= 992px */
  lg?: number;
  /** >= 1200px */
  xl?: number;
  /** >= 1600px */
  xxl?: number;
}

/** 瀑布流数据项 */
export interface WaterfallItem {
  /** 唯一标识 */
  key: React.Key;
  /** 预设高度（可选，提供后无需 DOM 测量，提升性能） */
  height?: number;
  /** 直接渲染内容（优先于 renderItem） */
  children?: React.ReactNode;
  /** 任意业务数据 */
  [prop: string]: any;
}

/** 布局信息（onLayoutChange 回调参数） */
export interface WaterfallLayoutInfo {
  key: React.Key;
  column: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface WaterfallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 数据源 */
  items?: WaterfallItem[];
  /** 自定义渲染每个项 */
  renderItem?: (item: WaterfallItem, index: number) => React.ReactNode;
  /** 子节点（children 模式，与 items 二选一） */
  children?: React.ReactNode;
  /** 列数，支持固定值或响应式断点对象 */
  columns?: number | WaterfallBreakpoints;
  /** 间距，支持统一值或 [水平, 垂直] */
  gutter?: number | [number, number];
  /** 布局变化回调 */
  onLayoutChange?: (layout: WaterfallLayoutInfo[]) => void;
  /** 是否持续监听子元素尺寸变化（适用于图片等异步加载内容） */
  fresh?: boolean;
}

// ==================== Constants ====================

const BREAKPOINTS: { key: keyof WaterfallBreakpoints; minWidth: number }[] = [
  { key: 'xxl', minWidth: 1600 },
  { key: 'xl', minWidth: 1200 },
  { key: 'lg', minWidth: 992 },
  { key: 'md', minWidth: 768 },
  { key: 'sm', minWidth: 576 },
  { key: 'xs', minWidth: 0 },
];

const DEFAULT_COLUMNS = 3;
const DEFAULT_GUTTER = 16;
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 20;

// ==================== Helpers ====================

/** 校验列数有效值 */
function validateColumns(value: number): number {
  if (!Number.isFinite(value)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[SoUi Waterfall] columns 必须为有效数字，收到: ${value}，已回退为默认值 ${DEFAULT_COLUMNS}`);
    }
    return DEFAULT_COLUMNS;
  }
  const rounded = Math.round(value);
  if (rounded !== value) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[SoUi Waterfall] columns 必须为整数，收到: ${value}，已取整为 ${rounded}`);
    }
  }
  if (rounded < MIN_COLUMNS || rounded > MAX_COLUMNS) {
    const clamped = Math.min(Math.max(rounded, MIN_COLUMNS), MAX_COLUMNS);
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[SoUi Waterfall] columns 有效范围为 ${MIN_COLUMNS}~${MAX_COLUMNS}，收到: ${rounded}，已修正为 ${clamped}`);
    }
    return clamped;
  }
  return rounded;
}

/** 根据容器宽度获取响应式列数 */
function getResponsiveColumns(breakpoints: WaterfallBreakpoints, containerWidth: number): number {
  for (const bp of BREAKPOINTS) {
    if (containerWidth >= bp.minWidth && breakpoints[bp.key] !== undefined) {
      return breakpoints[bp.key]!;
    }
  }
  return DEFAULT_COLUMNS;
}

/** 解析 gutter 为 [horizontal, vertical] */
function parseGutter(gutter: number | [number, number] | undefined): [number, number] {
  if (gutter === undefined) return [DEFAULT_GUTTER, DEFAULT_GUTTER];
  if (Array.isArray(gutter)) return [gutter[0], gutter[1]];
  return [gutter, gutter];
}

// ==================== Component ====================

const Waterfall: React.FC<WaterfallProps> = ({
  items,
  renderItem,
  children,
  columns = DEFAULT_COLUMNS,
  gutter,
  onLayoutChange,
  fresh = false,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Waterfall || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-waterfall-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.gutter !== undefined) {
    cssVars['--soui-waterfall-gutter'] = `${componentTheme.gutter}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== Refs & State ====================
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<React.Key, HTMLDivElement>>(new Map());
  const [containerWidth, setContainerWidth] = useState(0);
  const [layout, setLayout] = useState<WaterfallLayoutInfo[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  // 使用 ref 存储 onLayoutChange，避免用户未 memoize 时导致无限循环
  const onLayoutChangeRef = useRef(onLayoutChange);
  onLayoutChangeRef.current = onLayoutChange;

  // 布局计算锁，防止 MutationObserver 触发无限循环
  const calculatingRef = useRef(false);

  // ==================== Computed ====================
  const [gutterH, gutterV] = useMemo(() => parseGutter(gutter), [gutter]);

  const resolvedColumns = useMemo(() => {
    if (typeof columns === 'number') {
      return validateColumns(columns);
    }
    if (containerWidth === 0) return DEFAULT_COLUMNS;
    return validateColumns(getResponsiveColumns(columns, containerWidth));
  }, [columns, containerWidth]);

  // 数据源：items 模式或 children 模式
  const dataSource: WaterfallItem[] = useMemo(() => {
    if (items && items.length > 0) return items;
    if (children) {
      return React.Children.toArray(children).map((child, index) => ({
        key: `child-${index}`,
        children: child,
      }));
    }
    return [];
  }, [items, children]);

  // ==================== ResizeObserver ====================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth((prev) => (Math.abs(prev - width) > 1 ? width : prev));
      }
    });

    observer.observe(container);
    setContainerWidth(container.clientWidth);

    return () => observer.disconnect();
  }, []);

  // ==================== Layout Calculation ====================
  const calculateLayout = useCallback(() => {
    if (containerWidth === 0 || dataSource.length === 0) return;
    if (calculatingRef.current) return;
    calculatingRef.current = true;

    const colWidth = (containerWidth - gutterH * (resolvedColumns - 1)) / resolvedColumns;
    const columnHeights = new Array(resolvedColumns).fill(0);
    const newLayout: WaterfallLayoutInfo[] = [];

    dataSource.forEach((item) => {
      // 找到最短列
      const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));

      // 获取元素高度
      let itemHeight = item.height || 0;
      if (!itemHeight) {
        const el = itemRefs.current.get(item.key);
        if (el) {
          itemHeight = el.offsetHeight;
        }
      }

      const top = columnHeights[shortestCol];
      const left = shortestCol * (colWidth + gutterH);

      newLayout.push({
        key: item.key,
        column: shortestCol,
        top,
        left,
        width: colWidth,
        height: itemHeight,
      });

      columnHeights[shortestCol] = top + itemHeight + gutterV;
    });

    const maxHeight = Math.max(...columnHeights) - gutterV;
    setContainerHeight(Math.max(0, maxHeight));
    setLayout(newLayout);
    onLayoutChangeRef.current?.(newLayout);

    // 延迟释放锁，确保本轮 DOM 更新完成后再允许下次计算
    requestAnimationFrame(() => {
      calculatingRef.current = false;
    });
  }, [containerWidth, dataSource, resolvedColumns, gutterH, gutterV]);

  // 初始布局 + 列数/间距变化时重新计算
  useLayoutEffect(() => {
    calculateLayout();
  }, [calculateLayout]);

  // fresh 模式：持续监听子元素尺寸变化
  useEffect(() => {
    if (!fresh || dataSource.length === 0) return;

    const observer = new MutationObserver(() => {
      calculateLayout();
    });

    const container = containerRef.current;
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    // 监听图片加载
    const images = container?.querySelectorAll('img');
    const handleLoad = () => calculateLayout();
    images?.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleLoad);
      }
    });

    return () => {
      observer.disconnect();
      images?.forEach((img) => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
  }, [fresh, dataSource, calculateLayout]);

  // ==================== Render ====================

  const setItemRef = useCallback((key: React.Key) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(key, el);
    } else {
      itemRefs.current.delete(key);
    }
  }, []);

  const renderItems = () => {
    // 预构建 Map 避免 O(n²) 查找
    const layoutMap = new Map(layout.map((l) => [l.key, l]));

    return dataSource.map((item, index) => {
      const layoutInfo = layoutMap.get(item.key);
      const itemStyle: React.CSSProperties = {
        position: 'absolute',
        width: layoutInfo ? layoutInfo.width : undefined,
        transform: layoutInfo ? `translate(${layoutInfo.left}px, ${layoutInfo.top}px)` : undefined,
        opacity: layoutInfo ? 1 : 0,
      };

      const content = item.children ?? renderItem?.(item, index);

      return (
        <div
          key={item.key}
          ref={setItemRef(item.key)}
          className="soui-waterfall-item"
          style={itemStyle}
        >
          {content}
        </div>
      );
    });
  };

  const waterfallCls = classNames('soui-waterfall', className);

  return (
    <div
      ref={containerRef}
      className={waterfallCls}
      style={{ ...componentStyle, height: containerHeight || undefined }}
      {...rest}
    >
      {renderItems()}
    </div>
  );
};

export default Waterfall;
