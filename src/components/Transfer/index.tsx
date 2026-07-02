import React, { useState, useCallback, useMemo, useRef, useContext, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type TransferKey = string | number;
export type TransferDirection = 'left' | 'right';

export interface TransferItem {
  /** 唯一标识 */
  key: TransferKey;
  /** 显示标题 */
  title?: string;
  /** 描述信息 */
  description?: string;
  /** 是否禁用 */
  disabled?: boolean;
  [name: string]: any;
}

export interface RenderResult {
  label: React.ReactNode;
  value: string;
}

export interface TransferLocale {
  titles?: React.ReactNode[];
  notFoundContent?: React.ReactNode;
  searchPlaceholder?: string;
  itemUnit?: string;
  itemsUnit?: string;
}

export interface TransferProps {
  /** 数据源 */
  dataSource?: TransferItem[];
  /** 右侧的 key 集合 */
  targetKeys?: TransferKey[];
  /** 两侧选中的 key 集合 */
  selectedKeys?: TransferKey[];
  /** 穿梭操作回调 */
  onChange?: (targetKeys: TransferKey[], direction: TransferDirection, moveKeys: TransferKey[]) => void;
  /** 选中项变化回调 */
  onSelectChange?: (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => void;
  /** 搜索回调 */
  onSearch?: (direction: TransferDirection, value: string) => void;
  /** 滚动回调 */
  onScroll?: (direction: TransferDirection, e: React.UIEvent<HTMLUListElement>) => void;
  /** 自定义渲染列表项 */
  render?: (item: TransferItem) => React.ReactNode | RenderResult;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 自定义过滤逻辑 */
  filterOption?: (inputValue: string, item: TransferItem, direction: TransferDirection) => boolean;
  /** 左右列标题 */
  titles?: React.ReactNode[];
  /** 操作按钮文字 */
  operations?: React.ReactNode[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 单向模式 */
  oneWay?: boolean;
  /** 底部自定义渲染 */
  footer?: (props: { direction: TransferDirection }) => React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 列表样式 */
  listStyle?: React.CSSProperties;
  /** 国际化 */
  locale?: Partial<TransferLocale>;
}

// ==================== TransferList ====================

interface TransferListProps {
  prefixCls: string;
  titleText: React.ReactNode;
  dataSource: TransferItem[];
  checkedKeys: TransferKey[];
  disabled?: boolean;
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem, direction: TransferDirection) => boolean;
  render?: (item: TransferItem) => React.ReactNode | RenderResult;
  onItemSelect: (key: TransferKey, check: boolean) => void;
  onItemSelectAll: (keys: TransferKey[], checkAll: boolean) => void;
  onSearch: (value: string) => void;
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
  direction: TransferDirection;
  locale: TransferLocale;
  listStyle?: React.CSSProperties;
  footer?: (props: { direction: TransferDirection }) => React.ReactNode;
  cssVars: Record<string, any>;
}

const TransferList: React.FC<TransferListProps> = ({
  prefixCls,
  titleText,
  dataSource,
  checkedKeys,
  disabled,
  showSearch,
  filterOption,
  render,
  onItemSelect,
  onItemSelectAll,
  onSearch,
  onScroll,
  direction,
  locale,
  listStyle,
  footer,
  cssVars,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!searchValue) return dataSource;
    return dataSource.filter((item) => {
      if (filterOption) return filterOption(searchValue, item, direction);
      // Default filter: match title or rendered text
      if (render) {
        const result = render(item);
        if (typeof result === 'string') return result.toLowerCase().includes(searchValue.toLowerCase());
        if (result && typeof result === 'object' && 'value' in result) {
          return (result as RenderResult).value.toLowerCase().includes(searchValue.toLowerCase());
        }
        if (result && typeof result === 'object' && 'label' in result) {
          return String((result as unknown as RenderResult).label).toLowerCase().includes(searchValue.toLowerCase());
        }
      }
      return (item.title || '').toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [dataSource, searchValue, filterOption, render, direction]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  // Selectable items (not disabled)
  const selectableItems = filteredItems.filter((item) => !item.disabled && !disabled);
  const checkedCount = checkedKeys.length;
  const isAllChecked = selectableItems.length > 0 && selectableItems.every((item) => checkedKeys.includes(item.key));
  const isPartialChecked = checkedCount > 0 && !isAllChecked;

  const handleSelectAll = () => {
    const allKeys = selectableItems.map((item) => item.key);
    onItemSelectAll(allKeys, !isAllChecked);
  };

  // Render item
  const renderItem = (item: TransferItem) => {
    const result = render?.(item);
    if (typeof result === 'string') return { label: result, value: result };
    if (result && typeof result === 'object' && 'label' in result) return result as RenderResult;
    if (React.isValidElement(result)) return { label: result, value: item.title || '' };
    return { label: item.title, value: item.title || '' };
  };

  const getCountText = () => {
    const total = filteredItems.length;
    const selected = checkedCount;
    if (selected > 0) {
      return `${selected}/${total}`;
    }
    return `${total}`;
  };

  const listCls = `${prefixCls}-list`;

  return (
    <div className={listCls} style={listStyle}>
      {/* Header */}
      <div className={`${listCls}-header`}>
        <Checkbox
          checked={isAllChecked}
          indeterminate={isPartialChecked}
          disabled={disabled || selectableItems.length === 0}
          onChange={() => handleSelectAll()}
        />
        <span className={`${listCls}-header-title`}>{titleText}</span>
        <span className={`${listCls}-header-count`}>
          {getCountText()} {checkedCount > 0 ? (locale.itemsUnit || '项') : (locale.itemUnit || '项')}
        </span>
      </div>

      {/* Search */}
      {showSearch && (
        <div className={`${listCls}-search-wrapper`}>
          <Icon name="Search" size={14} className={`${listCls}-search-icon`} style={cssVars.iconColor as React.CSSProperties} />
          <input
            ref={inputRef}
            className={`${listCls}-search`}
            placeholder={locale.searchPlaceholder || '请输入搜索内容'}
            value={searchValue}
            onChange={handleSearch}
            disabled={disabled}
          />
          {searchValue && (
            <span className={`${listCls}-search-clear`} onClick={handleClearSearch}>
              <Icon name="Close" size={12} style={cssVars.iconColor as React.CSSProperties} />
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className={`${listCls}-body`}>
        {filteredItems.length === 0 ? (
          <div className={`${listCls}-empty`}>
            <Icon name="Remind" size={32} style={{ opacity: 0.25 } as React.CSSProperties} />
            <span>{locale.notFoundContent || '暂无数据'}</span>
          </div>
        ) : (
          <ul className={`${listCls}-content soui-scrollbar`} onScroll={onScroll}>
            {filteredItems.map((item) => {
              const { label } = renderItem(item);
              const isChecked = checkedKeys.includes(item.key);
              const isDisabled = item.disabled || disabled;

              return (
                <li
                  key={item.key}
                  className={classNames(`${listCls}-item`, {
                    [`${listCls}-item-checked`]: isChecked,
                    [`${listCls}-item-disabled`]: isDisabled,
                  })}
                  onClick={() => !isDisabled && onItemSelect(item.key, !isChecked)}
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => !isDisabled && onItemSelect(item.key, !isChecked)}
                  />
                  <span className={`${listCls}-item-text`}>{label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      {footer && <div className={`${listCls}-footer`}>{footer({ direction })}</div>}
    </div>
  );
};

// ==================== TransferOperation ====================

interface TransferOperationProps {
  leftActive: boolean;
  rightActive: boolean;
  moveToLeft: () => void;
  moveToRight: () => void;
  disabled?: boolean;
  oneWay?: boolean;
  operations?: React.ReactNode[];
}

const TransferOperation: React.FC<TransferOperationProps> = ({
  leftActive,
  rightActive,
  moveToLeft,
  moveToRight,
  disabled,
  oneWay,
  operations = [],
}) => {
  return (
    <div className="soui-transfer-operation">
      <button
        className={classNames('soui-transfer-operation-btn', { 'soui-transfer-operation-btn-active': rightActive })}
        disabled={disabled || !rightActive}
        onClick={moveToRight}
        aria-label="Move to right"
      >
        {operations[0] ? (
          <span className="soui-transfer-operation-text">{operations[0]}</span>
        ) : (
          <Icon name="Right" size={14} />
        )}
      </button>
      {!oneWay && (
        <button
          className={classNames('soui-transfer-operation-btn', { 'soui-transfer-operation-btn-active': leftActive })}
          disabled={disabled || !leftActive}
          onClick={moveToLeft}
          aria-label="Move to left"
        >
          {operations[1] ? (
            <span className="soui-transfer-operation-text">{operations[1]}</span>
          ) : (
            <Icon name="Left" size={14} />
          )}
        </button>
      )}
    </div>
  );
};

// ==================== Transfer ====================

const Transfer: React.FC<TransferProps> = ({
  dataSource = [],
  targetKeys: targetKeysProp = [],
  selectedKeys: selectedKeysProp,
  onChange,
  onSelectChange,
  onSearch,
  onScroll,
  render,
  showSearch = false,
  filterOption,
  titles,
  operations,
  disabled = false,
  oneWay = false,
  footer,
  className,
  style,
  listStyle,
  locale = {},
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Transfer || {}) as Record<string, any>;

  // CSS variable injection
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.borderRadius !== undefined) cssVars['--soui-transfer-border-radius'] = `${componentTheme.borderRadius}px`;
  if (componentTheme.fontSize !== undefined) cssVars['--soui-transfer-font-size'] = `${componentTheme.fontSize}px`;
  if (componentTheme.colorPrimary) cssVars['--soui-transfer-color-primary'] = componentTheme.colorPrimary;
  if (componentTheme.colorPrimaryHover) cssVars['--soui-transfer-color-primary-hover'] = componentTheme.colorPrimaryHover;
  if (componentTheme.colorBorder) cssVars['--soui-transfer-color-border'] = componentTheme.colorBorder;
  if (componentTheme.colorBg) cssVars['--soui-transfer-color-bg'] = componentTheme.colorBg;
  if (componentTheme.headerBg) cssVars['--soui-transfer-header-bg'] = componentTheme.headerBg;
  if (componentTheme.colorText) cssVars['--soui-transfer-color-text'] = componentTheme.colorText;
  if (componentTheme.colorTextDisabled) cssVars['--soui-transfer-color-text-disabled'] = componentTheme.colorTextDisabled;
  if (componentTheme.itemHoverBg) cssVars['--soui-transfer-item-hover-bg'] = componentTheme.itemHoverBg;
  if (componentTheme.itemActiveBg) cssVars['--soui-transfer-item-active-bg'] = componentTheme.itemActiveBg;
  cssVars.iconColor = { color: 'var(--soui-transfer-color-text, rgba(0, 0, 0, 0.65))' };

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // Internal state for selectedKeys (supports both controlled and uncontrolled)
  const isControlled = selectedKeysProp !== undefined;
  const [innerSelectedKeys, setInnerSelectedKeys] = useState<{ left: TransferKey[]; right: TransferKey[] }>({
    left: [],
    right: [],
  });

  const selectedKeys = useMemo(() => {
    if (isControlled) {
      const left = selectedKeysProp!.filter((k) => !targetKeysProp.includes(k));
      const right = selectedKeysProp!.filter((k) => targetKeysProp.includes(k));
      return { left, right };
    }
    return innerSelectedKeys;
  }, [isControlled, selectedKeysProp, targetKeysProp, innerSelectedKeys]);

  // Split data source
  const { leftDataSource, rightDataSource } = useMemo(() => {
    const left: TransferItem[] = [];
    const right: TransferItem[] = [];
    dataSource.forEach((item) => {
      if (targetKeysProp.includes(item.key)) {
        right.push(item);
      } else {
        left.push(item);
      }
    });
    return { leftDataSource: left, rightDataSource: right };
  }, [dataSource, targetKeysProp]);

  // Handle item select
  const handleItemSelect = useCallback(
    (direction: TransferDirection, key: TransferKey, check: boolean) => {
      const newSelected = { ...selectedKeys };
      const keys = direction === 'left' ? [...selectedKeys.left] : [...selectedKeys.right];
      if (check) {
        keys.push(key);
      } else {
        const idx = keys.indexOf(key);
        if (idx >= 0) keys.splice(idx, 1);
      }
      if (direction === 'left') newSelected.left = keys;
      else newSelected.right = keys;

      if (!isControlled) setInnerSelectedKeys(newSelected);
      onSelectChange?.(newSelected.left, newSelected.right);
    },
    [selectedKeys, isControlled, onSelectChange],
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (direction: TransferDirection, keys: TransferKey[], checkAll: boolean) => {
      const newSelected = { ...selectedKeys };
      if (checkAll) {
        // Add all keys (merge)
        const current = direction === 'left' ? selectedKeys.left : selectedKeys.right;
        const merged = Array.from(new Set([...current, ...keys]));
        if (direction === 'left') newSelected.left = merged;
        else newSelected.right = merged;
      } else {
        // Remove all keys
        if (direction === 'left') newSelected.left = [];
        else newSelected.right = [];
      }

      if (!isControlled) setInnerSelectedKeys(newSelected);
      onSelectChange?.(newSelected.left, newSelected.right);
    },
    [selectedKeys, isControlled, onSelectChange],
  );

  // Move to right
  const moveToRight = useCallback(() => {
    const moveKeys = selectedKeys.left;
    if (moveKeys.length === 0) return;
    // Filter out disabled items
    const disabledKeys = new Set(dataSource.filter((item) => item.disabled).map((item) => item.key));
    const validMoveKeys = moveKeys.filter((k) => !disabledKeys.has(k));
    if (validMoveKeys.length === 0) return;
    const newTargetKeys = [...targetKeysProp, ...validMoveKeys];
    onChange?.(newTargetKeys, 'right', validMoveKeys);
    // Clear left selection
    const newSelected = { left: [], right: selectedKeys.right };
    if (!isControlled) setInnerSelectedKeys(newSelected);
    onSelectChange?.(newSelected.left, newSelected.right);
  }, [selectedKeys, targetKeysProp, dataSource, onChange, onSelectChange, isControlled]);

  // Move to left
  const moveToLeft = useCallback(() => {
    const moveKeys = selectedKeys.right;
    if (moveKeys.length === 0) return;
    const disabledKeys = new Set(dataSource.filter((item) => item.disabled).map((item) => item.key));
    const validMoveKeys = moveKeys.filter((k) => !disabledKeys.has(k));
    if (validMoveKeys.length === 0) return;
    const newTargetKeys = targetKeysProp.filter((k) => !validMoveKeys.includes(k));
    onChange?.(newTargetKeys, 'left', validMoveKeys);
    const newSelected = { left: selectedKeys.left, right: [] };
    if (!isControlled) setInnerSelectedKeys(newSelected);
    onSelectChange?.(newSelected.left, newSelected.right);
  }, [selectedKeys, targetKeysProp, dataSource, onChange, onSelectChange, isControlled]);

  // Search
  const handleSearch = useCallback(
    (direction: TransferDirection, value: string) => {
      onSearch?.(direction, value);
    },
    [onSearch],
  );

  // Scroll
  const handleScroll = useCallback(
    (direction: TransferDirection, e: React.UIEvent<HTMLUListElement>) => {
      onScroll?.(direction, e);
    },
    [onScroll],
  );

  const mergedLocale: TransferLocale = {
    titles: locale.titles || titles,
    notFoundContent: locale.notFoundContent || '暂无数据',
    searchPlaceholder: locale.searchPlaceholder || '请输入搜索内容',
    itemUnit: locale.itemUnit || '项',
    itemsUnit: locale.itemsUnit || '项',
  };

  const leftTitle = (mergedLocale.titles as React.ReactNode[])?.[0] || '源列表';
  const rightTitle = (mergedLocale.titles as React.ReactNode[])?.[1] || '目标列表';

  const transferCls = classNames(
    'soui-transfer',
    { 'soui-transfer-disabled': disabled, 'soui-transfer-one-way': oneWay },
    className,
  );

  return (
    <div className={transferCls} style={componentStyle}>
      <TransferList
        prefixCls="soui-transfer"
        titleText={leftTitle}
        dataSource={leftDataSource}
        checkedKeys={selectedKeys.left}
        disabled={disabled}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        onItemSelect={(key, check) => handleItemSelect('left', key, check)}
        onItemSelectAll={(keys, checkAll) => handleSelectAll('left', keys, checkAll)}
        onSearch={(value) => handleSearch('left', value)}
        onScroll={(e) => handleScroll('left', e)}
        direction="left"
        locale={mergedLocale}
        listStyle={listStyle}
        footer={footer}
        cssVars={cssVars}
      />

      <TransferOperation
        leftActive={selectedKeys.right.length > 0}
        rightActive={selectedKeys.left.length > 0}
        moveToLeft={moveToLeft}
        moveToRight={moveToRight}
        disabled={disabled}
        oneWay={oneWay}
        operations={operations}
      />

      <TransferList
        prefixCls="soui-transfer"
        titleText={rightTitle}
        dataSource={rightDataSource}
        checkedKeys={selectedKeys.right}
        disabled={disabled}
        showSearch={showSearch}
        filterOption={filterOption}
        render={render}
        onItemSelect={(key, check) => handleItemSelect('right', key, check)}
        onItemSelectAll={(keys, checkAll) => handleSelectAll('right', keys, checkAll)}
        onSearch={(value) => handleSearch('right', value)}
        onScroll={(e) => handleScroll('right', e)}
        direction="right"
        locale={mergedLocale}
        listStyle={listStyle}
        footer={footer}
        cssVars={cssVars}
      />
    </div>
  );
};

export default Transfer;
