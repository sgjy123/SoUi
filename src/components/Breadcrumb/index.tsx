import React from 'react';
import classNames from 'classnames';
import { useTheme, useComponentTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export interface BreadcrumbItemProps {
  /** 链接地址 */
  href?: string;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
  /** 图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

export interface BreadcrumbProps {
  /** 面包屑项列表 */
  items?: BreadcrumbItemProps[];
  /** 分隔符 */
  separator?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点（优先于 items） */
  children?: React.ReactNode;
}

// ==================== Breadcrumb Item Component ====================

const BreadcrumbItem: React.FC<BreadcrumbItemProps & React.HTMLAttributes<HTMLLIElement>> = ({
  href,
  onClick,
  icon,
  className,
  style,
  children,
  ...props
}) => {
  const globalTheme = useTheme();
  const breadcrumbTheme = useComponentTheme('Breadcrumb');

  // 应用主题样式
  const itemStyle: React.CSSProperties = {
    ...(breadcrumbTheme?.fontSize && {
      fontSize: `${breadcrumbTheme.fontSize}px`,
    }),
    ...(globalTheme?.fontSize && !breadcrumbTheme?.fontSize && {
      fontSize: `${globalTheme.fontSize}px`,
    }),
    ...style,
  };

  const itemClassName = classNames('soui-breadcrumb-item', className);

  if (href) {
    return (
      <li className={itemClassName} style={itemStyle} {...props}>
        <a
          className="soui-breadcrumb-link"
          href={href}
          onClick={onClick}
        >
          {icon && <span className="soui-breadcrumb-icon">{icon}</span>}
          {children}
        </a>
      </li>
    );
  }

  return (
    <li className={itemClassName} style={itemStyle} {...props}>
      <span
        className="soui-breadcrumb-separator-less"
        onClick={onClick}
      >
        {icon && <span className="soui-breadcrumb-icon">{icon}</span>}
        {children}
      </span>
    </li>
  );
};

// ==================== Main Breadcrumb Component ====================

const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
} = ({
  items,
  separator = '/',
  className,
  style,
  children,
}) => {
  const globalTheme = useTheme();
  const breadcrumbTheme = useComponentTheme('Breadcrumb');

  // 应用主题样式
  const breadcrumbStyle: React.CSSProperties = {
    ...(breadcrumbTheme?.colorText && {
      '--soui-breadcrumb-color-text': breadcrumbTheme.colorText,
    }),
    ...(breadcrumbTheme?.colorLink && {
      '--soui-breadcrumb-color-link': breadcrumbTheme.colorLink,
    }),
    ...(breadcrumbTheme?.colorLinkHover && {
      '--soui-breadcrumb-color-link-hover': breadcrumbTheme.colorLinkHover,
    }),
    ...(breadcrumbTheme?.separatorColor && {
      '--soui-breadcrumb-separator-color': breadcrumbTheme.separatorColor,
    }),
    ...(globalTheme?.primaryColor && !breadcrumbTheme?.colorLink && {
      '--soui-breadcrumb-color-link': globalTheme.primaryColor,
    }),
    ...style,
  } as any;

  const breadcrumbClassName = classNames('soui-breadcrumb', className);

  // 如果提供了 children，直接渲染 children
  if (children) {
    return (
      <nav className={breadcrumbClassName} style={breadcrumbStyle}>
        <ol className="soui-breadcrumb-list">
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child;

            // 如果不是最后一个元素，添加分隔符
            const isLast = index === React.Children.count(children) - 1;
            
            return (
              <>
                {child}
                {!isLast && (
                  <li className="soui-breadcrumb-separator">
                    {typeof separator === 'string' ? (
                      <span>{separator}</span>
                    ) : (
                      separator
                    )}
                  </li>
                )}
              </>
            );
          })}
        </ol>
      </nav>
    );
  }

  // 如果提供了 items，渲染 items
  if (items && items.length > 0) {
    return (
      <nav className={breadcrumbClassName} style={breadcrumbStyle}>
        <ol className="soui-breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const { href, onClick, className: itemClassName, style: itemStyle, children: itemChildren, ...restProps } = item;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem
                  href={!isLast ? href : undefined}
                  onClick={onClick}
                  className={itemClassName}
                  style={itemStyle}
                  {...restProps}
                >
                  {itemChildren}
                </BreadcrumbItem>
                {!isLast && (
                  <li className="soui-breadcrumb-separator">
                    {typeof separator === 'string' ? (
                      <span>{separator}</span>
                    ) : (
                      separator
                    )}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }

  return null;
};

// 附加子组件
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
