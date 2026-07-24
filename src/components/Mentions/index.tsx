import React, { useState, useRef, useContext, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export interface MentionsOption {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}

export type MentionsOptions = (MentionsOption | string)[];

export type MentionsSize = 'small' | 'middle' | 'large';
export type MentionsStatus = 'error' | 'warning';
export type MentionsPlacement = 'top' | 'bottom';

export interface MentionsProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onSelect' | 'prefix' | 'size'> {
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 选中提及回调 */
  onSelect?: (option: MentionsOption, prefix: string) => void;
  /** 搜索回调 */
  onSearch?: (text: string, prefix: string) => void;
  /** 失焦回调（Form 兼容） */
  onBlur?: (e: React.FocusEvent) => void;
  /** 选项数据 */
  options?: MentionsOptions;
  /** 触发前缀字符 */
  prefix?: string | string[];
  /** 提及之间的分隔符 */
  split?: string;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: MentionsSize;
  /** 状态 */
  status?: MentionsStatus;
  /** 是否本地过滤 */
  filterOption?: boolean | ((inputValue: string, option: MentionsOption) => boolean);
  /** 空状态内容 */
  notFoundContent?: React.ReactNode;
  /** 下拉位置 */
  placement?: MentionsPlacement;
  /** 行数 */
  rows?: number;
}

// ==================== Utils ====================

const normalizeOptions = (options: MentionsOptions): MentionsOption[] =>
  options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));

const HEIGHT_MAP: Record<string, number> = { small: 24, middle: 32, large: 40 };

// ==================== Component ====================

const Mentions: React.FC<MentionsProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  onBlur,
  onFocus,
  options = [],
  prefix = '@',
  split = ' ',
  placeholder,
  disabled,
  size,
  status,
  filterOption = true,
  notFoundContent = '暂无数据',
  placement = 'bottom',
  rows = 3,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.Mentions || {}) as Record<string, any>;
  const formSize = context?.componentSize;
  const mergedSize = size || formSize || 'middle';

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined && controlledValue !== null;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchText, setSearchText] = useState('');
  const [activePrefix, setActivePrefix] = useState('');
  const [mentionStart, setMentionStart] = useState(-1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const prefixes = useMemo(
    () => (Array.isArray(prefix) ? prefix : [prefix]),
    [prefix]
  );

  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  // 过滤选项
  const filteredOptions = useMemo(() => {
    if (filterOption === false) return normalizedOptions;
    if (typeof filterOption === 'function') {
      return normalizedOptions.filter((opt) => filterOption(searchText, opt));
    }
    const lower = searchText.toLowerCase();
    return normalizedOptions.filter((opt) => {
      const label = typeof opt.label === 'string' ? opt.label : opt.value;
      return label.toLowerCase().includes(lower);
    });
  }, [normalizedOptions, searchText, filterOption]);

  // 检测光标前的 prefix 触发
  const detectMention = useCallback(
    (text: string, cursorPos: number) => {
      // 从光标位置往前找最近的 prefix
      for (let i = cursorPos - 1; i >= 0; i--) {
        const ch = text[i];
        // 遇到空白或换行停止
        if (/\s/.test(ch)) break;
        if (prefixes.includes(ch)) {
          // 确认 prefix 前面是开头或空白
          if (i === 0 || /\s/.test(text[i - 1])) {
            const search = text.slice(i + 1, cursorPos);
            setActivePrefix(ch);
            setMentionStart(i);
            setSearchText(search);
            setOpen(true);
            setActiveIndex(-1);
            onSearch?.(search, ch);
            return;
          }
        }
      }
      setOpen(false);
    },
    [prefixes, onSearch]
  );

  const closeMention = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
    setMentionStart(-1);
  }, []);

  // 插入提及
  const insertMention = useCallback(
    (opt: MentionsOption) => {
      if (opt.disabled || mentionStart < 0) return;

      const textarea = textareaRef.current;
      if (!textarea) return;

      const before = currentValue.slice(0, mentionStart);
      const after = currentValue.slice(textarea.selectionStart);
      const mention = `${activePrefix}${opt.value}${split}`;
      const newValue = before + mention + after;

      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
      onSelect?.(opt, activePrefix);

      // 设置光标位置到 mention 之后
      setTimeout(() => {
        const pos = mention.length + mentionStart;
        textarea.focus();
        textarea.setSelectionRange(pos, pos);
      }, 0);

      closeMention();
    },
    [currentValue, mentionStart, activePrefix, split, isControlled, onChange, onSelect, closeMention]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      // 检测 mention
      detectMention(val, e.target.selectionStart);
    },
    [isControlled, onChange, detectMention]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!open) return;
      const textarea = e.currentTarget;
      detectMention(currentValue, textarea.selectionStart);
    },
    [open, currentValue, detectMention]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!open || filteredOptions.length === 0) return;
      const enabled = filteredOptions.filter((o) => !o.disabled);
      if (enabled.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % enabled.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + enabled.length) % enabled.length);
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && activeIndex < enabled.length) {
          e.preventDefault();
          insertMention(enabled[activeIndex]);
        }
      } else if (e.key === 'Escape') {
        closeMention();
      }
    },
    [open, filteredOptions, activeIndex, insertMention, closeMention]
  );

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeMention();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeMention]);

  // CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorPrimary !== undefined) cssVars['--soui-mentions-color-primary'] = theme.colorPrimary;
  if (theme.borderRadius !== undefined) cssVars['--soui-mentions-border-radius'] = `${theme.borderRadius}px`;
  if (theme.fontSize !== undefined) cssVars['--soui-mentions-font-size'] = `${theme.fontSize}px`;
  if (theme.colorBorder !== undefined) cssVars['--soui-mentions-color-border'] = theme.colorBorder;
  if (theme.colorBg !== undefined) cssVars['--soui-mentions-color-bg'] = theme.colorBg;
  if (theme.colorText !== undefined) cssVars['--soui-mentions-color-text'] = theme.colorText;

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const enabled = filteredOptions.filter((o) => !o.disabled);
  const textareaHeight = HEIGHT_MAP[mergedSize] || 32;

  const dropdown = open && !disabled && (
    <div
      className={classNames('soui-mentions-dropdown', {
        'soui-mentions-dropdown-top': placement === 'top',
      })}
      ref={dropdownRef}
    >
      {filteredOptions.length > 0 ? (
        <ul className="soui-mentions-menu">
          {filteredOptions.map((opt) => {
            const enabledIdx = enabled.indexOf(opt);
            const isActive = enabledIdx === activeIndex;
            return (
              <li
                key={opt.value}
                className={classNames('soui-mentions-option', {
                  'soui-mentions-option-active': isActive,
                  'soui-mentions-option-disabled': opt.disabled,
                })}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertMention(opt);
                }}
                onMouseEnter={() => !opt.disabled && setActiveIndex(enabledIdx)}
              >
                {opt.label ?? opt.value}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="soui-mentions-empty">{notFoundContent}</div>
      )}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        'soui-mentions',
        `soui-mentions-${mergedSize}`,
        {
          'soui-mentions-disabled': disabled,
          'soui-mentions-error': status === 'error',
          'soui-mentions-warning': status === 'warning',
        },
        className
      )}
      style={componentStyle}
    >
      <textarea
        ref={textareaRef}
        className="soui-mentions-textarea"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={(e) => {
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...rest}
      />
      {dropdown}
    </div>
  );
};

Mentions.displayName = 'Mentions';

export default Mentions;
