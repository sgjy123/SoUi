import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 尺寸 */
export type DescriptionsSize = 'default' | 'middle' | 'small';

/** 布局方式 */
export type DescriptionsLayout = 'horizontal' | 'vertical';

/** 响应式列数 */
export type DescriptionsColumn =
  | number
  | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>;

export interface DescriptionsItemProps {
  /** 标签文字 */
  label?: React.ReactNode;
  /** 占用的列数 */
  span?: number;
  /** 标签自定义样式 */
  labelStyle?: React.CSSProperties;
  /** 内容自定义样式 */
  contentStyle?: React.CSSProperties;
  /** 内容 */
  children?: React.ReactNode;
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 标题 */
  title?: React.ReactNode;
  /** 标题右侧操作区 */
  extra?: React.ReactNode;
  /** 是否有边框 */
  bordered?: boolean;
  /** 每行列数（支持响应式对象） */
  column?: DescriptionsColumn;
  /** 尺寸 */
  size?: DescriptionsSize;
  /** 布局方式 */
  layout?: DescriptionsLayout;
  /** 标签后是否显示冒号（仅水平布局、无边框生效） */
  colon?: boolean;
  /** 标签统一样式 */
  labelStyle?: React.CSSProperties;
  /** 内容统一样式 */
  contentStyle?: React.CSSProperties;
  /** Descriptions.Item 子元素 */
  children?: React.ReactNode;
}

// ==================== 响应式列数 ====================

const BREAKPOINTS = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 };
const BP_ORDER: Array<keyof typeof BREAKPOINTS> = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

function resolveColumn(column: DescriptionsColumn, width: number): number {
  if (typeof column === 'number') return column;
  for (const key of BP_ORDER) {
    if (width >= BREAKPOINTS[key] && column[key] !== undefined) {
      return column[key] as number;
    }
  }
  return 3;
}

// ==================== Descriptions.Item ====================

const DescriptionsItem: React.FC<DescriptionsItemProps> = () => null;

// ==================== 内部类型 ====================

interface RowItem {
  label?: React.ReactNode;
  span: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

// ==================== Descriptions ====================

interface DescriptionsComponent extends React.FC<DescriptionsProps> {
  Item: typeof DescriptionsItem;
}

const Descriptions: DescriptionsComponent = ({
  title,
  extra,
  bordered = false,
  column = 3,
  size = 'default',
  layout = 'horizontal',
  colon = true,
  labelStyle,
  contentStyle,
  className,
  style,
  children,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Descriptions || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorLabelBg !== undefined) {
    cssVars['--soui-descriptions-label-bg'] = componentTheme.colorLabelBg;
  }
  if (componentTheme.borderColor !== undefined) {
    cssVars['--soui-descriptions-border-color'] = componentTheme.borderColor;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-descriptions-font-size'] = `${componentTheme.fontSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== 当前列数（响应式） ====================
  const isResponsive = typeof column === 'object';
  const [winWidth, setWinWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (!isResponsive) return;
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isResponsive]);

  const columnCount = Math.max(1, resolveColumn(column, winWidth));

  // ==================== 收集 Items ====================
  const items: RowItem[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props as DescriptionsItemProps;
    items.push({
      label: props.label,
      span: props.span ?? 1,
      labelStyle: props.labelStyle,
      contentStyle: props.contentStyle,
      children: props.children,
    });
  });

  // ==================== 分行 ====================
  const rows: RowItem[][] = [];
  let current: RowItem[] = [];
  let used = 0;
  items.forEach((item) => {
    const span = Math.min(Math.max(1, item.span), columnCount);
    if (used + span > columnCount) {
      rows.push(current);
      current = [];
      used = 0;
    }
    current.push({ ...item, span });
    used += span;
    if (used === columnCount) {
      rows.push(current);
      current = [];
      used = 0;
    }
  });
  if (current.length) rows.push(current);

  const showColon = colon && layout === 'horizontal' && !bordered;

  // ==================== 水平布局行 ====================
  const renderHorizontalRow = (row: RowItem[], ri: number) => {
    const totalCols = columnCount * 2;
    let acc = 0;
    return (
      <tr key={ri}>
        {row.map((item, ii) => {
          const usedBefore = acc;
          acc += item.span * 2;
          const isLast = ii === row.length - 1;
          const contentColSpan = isLast ? totalCols - usedBefore - 1 : item.span * 2 - 1;
          return (
            <React.Fragment key={ii}>
              <th
                className="soui-descriptions-item-label"
                style={{ ...labelStyle, ...item.labelStyle }}
              >
                {item.label}
                {showColon && <span className="soui-descriptions-colon">:</span>}
              </th>
              <td
                className="soui-descriptions-item-content"
                colSpan={contentColSpan}
                style={{ ...contentStyle, ...item.contentStyle }}
              >
                {item.children}
              </td>
            </React.Fragment>
          );
        })}
      </tr>
    );
  };

  // ==================== 垂直布局行 ====================
  const renderVerticalRow = (row: RowItem[], ri: number) => {
    let acc = 0;
    const labelCells = row.map((item, ii) => {
      const usedBefore = acc;
      acc += item.span;
      const isLast = ii === row.length - 1;
      const colSpan = isLast ? columnCount - usedBefore : item.span;
      return (
        <th
          key={ii}
          className="soui-descriptions-item-label"
          colSpan={colSpan}
          style={{ ...labelStyle, ...item.labelStyle }}
        >
          {item.label}
        </th>
      );
    });

    acc = 0;
    const contentCells = row.map((item, ii) => {
      const usedBefore = acc;
      acc += item.span;
      const isLast = ii === row.length - 1;
      const colSpan = isLast ? columnCount - usedBefore : item.span;
      return (
        <td
          key={ii}
          className="soui-descriptions-item-content"
          colSpan={colSpan}
          style={{ ...contentStyle, ...item.contentStyle }}
        >
          {item.children}
        </td>
      );
    });

    return [
      <tr key={`label-${ri}`} className="soui-descriptions-row-label">
        {labelCells}
      </tr>,
      <tr key={`content-${ri}`} className="soui-descriptions-row-content">
        {contentCells}
      </tr>,
    ];
  };

  return (
    <div
      className={classNames(
        'soui-descriptions',
        `soui-descriptions-size-${size}`,
        `soui-descriptions-layout-${layout}`,
        { 'soui-descriptions-bordered': bordered },
        className
      )}
      style={componentStyle}
      {...rest}
    >
      {(title || extra) && (
        <div className="soui-descriptions-header">
          {title && <div className="soui-descriptions-title">{title}</div>}
          {extra && <div className="soui-descriptions-extra">{extra}</div>}
        </div>
      )}
      <div className="soui-descriptions-body">
        <table className="soui-descriptions-table">
          <tbody>
            {rows.map((row, ri) =>
              layout === 'vertical' ? renderVerticalRow(row, ri) : renderHorizontalRow(row, ri)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Descriptions.Item = DescriptionsItem;
Descriptions.displayName = 'Descriptions';

export default Descriptions;
