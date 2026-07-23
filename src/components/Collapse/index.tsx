import React, { useContext, useState, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 尺寸 */
export type CollapseSize = 'large' | 'middle' | 'small';

/** 展开图标位置 */
export type CollapseExpandIconPosition = 'start' | 'end';

/** 可折叠触发区域 */
export type CollapseCollapsible = 'header' | 'icon' | 'disabled';

export interface CollapsePanelProps {
  /** 唯一标识 */
  key?: string;
  /** 面板头内容 */
  header?: React.ReactNode;
  /** 可折叠触发区域 */
  collapsible?: CollapseCollapsible;
  /** 是否禁用 */
  disabled?: boolean;
  /** 面板头右侧额外内容 */
  extra?: React.ReactNode;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 强制渲染内容（即使折叠） */
  forceRender?: boolean;
  /** 内容 */
  children?: React.ReactNode;
}

export interface CollapseItemConfig {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  collapsible?: CollapseCollapsible;
  disabled?: boolean;
  extra?: React.ReactNode;
  showArrow?: boolean;
  forceRender?: boolean;
}

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 当前激活的面板 key（受控） */
  activeKey?: string | string[];
  /** 默认激活的面板 key */
  defaultActiveKey?: string | string[];
  /** 手风琴模式（同时只展开一个） */
  accordion?: boolean;
  /** 是否有边框 */
  bordered?: boolean;
  /** 无边框幽灵模式 */
  ghost?: boolean;
  /** 尺寸 */
  size?: CollapseSize;
  /** 展开图标位置 */
  expandIconPosition?: CollapseExpandIconPosition;
  /** 自定义展开图标 */
  expandIcon?: (props: { isActive: boolean }) => React.ReactNode;
  /** 折叠时销毁内容 */
  destroyInactivePanel?: boolean;
  /** 切换回调 */
  onChange?: (key: string | string[]) => void;
  /** 面板配置（与 children 二选一） */
  items?: CollapseItemConfig[];
  /** Collapse.Panel 子元素 */
  children?: React.ReactNode;
}

// ==================== Utils ====================

const toArray = (key?: string | string[]): string[] => {
  if (key === undefined || key === null) return [];
  return Array.isArray(key) ? key : [key];
};

// ==================== Collapse.Panel ====================

const CollapsePanel: React.FC<CollapsePanelProps> = () => null;

// ==================== Collapse ====================

interface CollapseComponent extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseComponent = ({
  activeKey,
  defaultActiveKey,
  accordion = false,
  bordered = true,
  ghost = false,
  size = 'middle',
  expandIconPosition = 'start',
  expandIcon,
  destroyInactivePanel = false,
  onChange,
  items,
  className,
  style,
  children,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Collapse || {}) as Record<string, any>;

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorBg !== undefined) {
    cssVars['--soui-collapse-color-bg'] = componentTheme.colorBg;
  }
  if (componentTheme.headerBg !== undefined) {
    cssVars['--soui-collapse-header-bg'] = componentTheme.headerBg;
  }
  if (componentTheme.borderColor !== undefined) {
    cssVars['--soui-collapse-border-color'] = componentTheme.borderColor;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-collapse-font-size'] = `${componentTheme.fontSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== 收集面板 ====================
  const panels: CollapseItemConfig[] = [];
  if (items && items.length > 0) {
    items.forEach((item) => panels.push(item));
  } else {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const props = child.props as CollapsePanelProps;
      panels.push({
        key: (child.key as string) ?? '',
        label: props.header,
        children: props.children,
        collapsible: props.collapsible,
        disabled: props.disabled,
        extra: props.extra,
        showArrow: props.showArrow,
        forceRender: props.forceRender,
      });
    });
  }

  // ==================== 激活状态 ====================
  const isControlled = activeKey !== undefined;
  const [innerKeys, setInnerKeys] = useState<string[]>(() => toArray(defaultActiveKey));
  const activeKeys = isControlled ? toArray(activeKey) : innerKeys;

  const isActive = (key: string) => activeKeys.includes(key);

  const handleToggle = useCallback(
    (key: string, disabled?: boolean, collapsible?: CollapseCollapsible) => {
      if (disabled || collapsible === 'disabled') return;
      let newKeys: string[];
      if (accordion) {
        newKeys = isActive(key) ? [] : [key];
      } else {
        newKeys = isActive(key) ? activeKeys.filter((k) => k !== key) : [...activeKeys, key];
      }
      if (!isControlled) setInnerKeys(newKeys);
      onChange?.(accordion ? newKeys[0] ?? '' : newKeys);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accordion, activeKeys, isControlled, onChange]
  );

  // ==================== 渲染 ====================
  return (
    <div
      className={classNames(
        'soui-collapse',
        `soui-collapse-size-${size}`,
        {
          'soui-collapse-bordered': bordered && !ghost,
          'soui-collapse-ghost': ghost,
        },
        className
      )}
      style={componentStyle}
      {...rest}
    >
      {panels.map((panel) => {
        const active = isActive(panel.key);
        const disabled = panel.disabled;
        const collapsible = panel.collapsible;
        const showArrow = panel.showArrow !== false;
        const headerClickable = collapsible !== 'icon' && collapsible !== 'disabled' && !disabled;
        const iconClickable = collapsible === 'icon' && !disabled;

        const shouldRenderContent =
          active || panel.forceRender || (!destroyInactivePanel && !active);
        const renderContent = active || panel.forceRender || !destroyInactivePanel;

        const arrow = showArrow ? (
          <span
            className={classNames('soui-collapse-arrow', { 'soui-collapse-arrow-active': active })}
            onClick={
              iconClickable
                ? (e) => {
                    e.stopPropagation();
                    handleToggle(panel.key, disabled, collapsible);
                  }
                : undefined
            }
          >
            {expandIcon ? expandIcon({ isActive: active }) : <Icon name="Right" size={14} />}
          </span>
        ) : null;

        return (
          <div
            key={panel.key}
            className={classNames('soui-collapse-item', {
              'soui-collapse-item-active': active,
              'soui-collapse-item-disabled': disabled,
            })}
          >
            <div
              className="soui-collapse-header"
              role="button"
              aria-expanded={active}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={() => headerClickable && handleToggle(panel.key, disabled, collapsible)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && headerClickable) {
                  e.preventDefault();
                  handleToggle(panel.key, disabled, collapsible);
                }
              }}
            >
              {expandIconPosition === 'start' && arrow}
              <div className="soui-collapse-header-text">{panel.label}</div>
              {panel.extra && <div className="soui-collapse-extra">{panel.extra}</div>}
              {expandIconPosition === 'end' && arrow}
            </div>
            {renderContent && (
              <div
                className={classNames('soui-collapse-content', {
                  'soui-collapse-content-active': active,
                })}
                style={{ display: shouldRenderContent ? undefined : 'none' }}
              >
                <div className="soui-collapse-content-box">{panel.children}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

Collapse.Panel = CollapsePanel;
Collapse.displayName = 'Collapse';

export default Collapse;
