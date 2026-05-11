import React from 'react';
import classNames from 'classnames';
import { useComponentTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export interface LayoutProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /** 是否有侧边栏 */
  hasSider?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

export interface SiderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'width'> {
  /** 宽度 */
  width?: number | string;
  /** 是否可收起 */
  collapsible?: boolean;
  /** 当前收起状态 */
  collapsed?: boolean;
  /** 收起/展开回调 */
  onCollapse?: (collapsed: boolean) => void;
  /** 触发器位置 */
  trigger?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

export interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

// ==================== Sub-components ====================

/**
 * Header 顶部布局
 */
const Header: React.FC<HeaderProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  const headerClassName = classNames(
    'soui-layout-header',
    className
  );

  return (
    <header className={headerClassName} style={style} {...props}>
      {children}
    </header>
  );
};

/**
 * Sider 侧边栏
 */
const Sider: React.FC<SiderProps> = ({
  width = 200,
  collapsible = false,
  collapsed = false,
  onCollapse,
  trigger,
  className,
  style,
  children,
  ...props
}) => {
  const siderTheme = useComponentTheme('Layout');
  
  const siderStyle: React.CSSProperties = {
    '--soui-layout-sider-width': typeof width === 'number' ? `${width}px` : width,
    '--soui-layout-sider-collapsed-width': siderTheme?.siderCollapsedWidth ? `${siderTheme.siderCollapsedWidth}px` : '80px',
    ...style,
  } as any;

  const handleTriggerClick = () => {
    if (collapsible && onCollapse) {
      onCollapse(!collapsed);
    }
  };

  const siderClassName = classNames(
    'soui-layout-sider',
    {
      'soui-layout-sider-collapsed': collapsed,
      'soui-layout-sider-collapsible': collapsible,
    },
    className
  );

  return (
    <aside className={siderClassName} style={siderStyle} {...props}>
      <div className="soui-layout-sider-children">
        {children}
      </div>
      {collapsible && (
        <div 
          className="soui-layout-sider-trigger"
          onClick={handleTriggerClick}
        >
          {trigger || (collapsed ? '▶' : '◀')}
        </div>
      )}
    </aside>
  );
};

/**
 * Content 内容区域
 */
const Content: React.FC<ContentProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  const contentClassName = classNames(
    'soui-layout-content',
    className
  );

  return (
    <main className={contentClassName} style={style} {...props}>
      {children}
    </main>
  );
};

/**
 * Footer 底部布局
 */
const Footer: React.FC<FooterProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  const footerClassName = classNames(
    'soui-layout-footer',
    className
  );

  return (
    <footer className={footerClassName} style={style} {...props}>
      {children}
    </footer>
  );
};

// ==================== Main Component ====================

/**
 * Layout 布局容器
 */
const Layout: React.FC<LayoutProps> & {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
} = ({
  hasSider = false,
  className,
  style,
  children,
  ...props
}) => {
  const layoutTheme = useComponentTheme('Layout');
  
  const layoutStyle: React.CSSProperties = {
    '--soui-layout-header-height': layoutTheme?.headerHeight ? `${layoutTheme.headerHeight}px` : '64px',
    '--soui-layout-footer-height': layoutTheme?.footerHeight ? `${layoutTheme.footerHeight}px` : '64px',
    ...style,
  } as any;

  const layoutClassName = classNames(
    'soui-layout',
    {
      'soui-layout-has-sider': hasSider,
    },
    className
  );

  return (
    <section className={layoutClassName} style={layoutStyle} {...props}>
      {children}
    </section>
  );
};

// 附加子组件
Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
