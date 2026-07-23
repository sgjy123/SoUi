import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

export type SegmentedSize = 'large' | 'middle' | 'small';
export type SegmentedValue = string | number;

export interface SegmentedOption {
  /** 选项显示内容 */
  label?: React.ReactNode;
  /** 选项值 */
  value: SegmentedValue;
  /** 选项图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 原生 title 提示 */
  title?: string;
}

/** options 支持对象或简单值两种形式 */
export type SegmentedOptions = Array<SegmentedOption | SegmentedValue>;

export interface SegmentedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 选项数据 */
  options?: SegmentedOptions;
  /** 当前选中的值（受控） */
  value?: SegmentedValue;
  /** 默认选中的值 */
  defaultValue?: SegmentedValue;
  /** 选中变化回调 */
  onChange?: (value: SegmentedValue) => void;
  /** 尺寸 */
  size?: SegmentedSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否撑满父容器宽度 */
  block?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Utils ====================

/** 归一化选项：简单值 → 对象 */
const normalizeOptions = (options: SegmentedOptions): SegmentedOption[] =>
  options.map((opt) =>
    typeof opt === 'object' && opt !== null
      ? opt
      : { label: opt, value: opt }
  );

// ==================== Component ====================

const Segmented: React.FC<SegmentedProps> = ({
  options = [],
  value: valueProp,
  defaultValue,
  onChange,
  size = 'middle',
  disabled = false,
  block = false,
  className,
  style,
  ...rest
}) => {
  const normalized = useMemo(() => normalizeOptions(options), [options]);

  const isControlled = valueProp !== undefined;
  // 默认选中第一个未禁用选项
  const firstValue = useMemo(() => {
    const first = normalized.find((o) => !o.disabled);
    return first ? first.value : normalized[0]?.value;
  }, [normalized]);

  const [innerValue, setInnerValue] = useState<SegmentedValue | undefined>(
    defaultValue ?? firstValue
  );
  const currentValue = isControlled ? valueProp : innerValue;

  const groupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<SegmentedValue, HTMLLabelElement>>(new Map());
  const [thumb, setThumb] = useState({ width: 0, left: 0 });
  const [ready, setReady] = useState(false);

  const setItemRef = useCallback(
    (val: SegmentedValue) => (el: HTMLLabelElement | null) => {
      if (el) itemRefs.current.set(val, el);
      else itemRefs.current.delete(val);
    },
    []
  );

  // 测量选中项位置，驱动滑块
  const measure = useCallback(() => {
    const el = currentValue !== undefined ? itemRefs.current.get(currentValue) : undefined;
    if (!el) return;
    setThumb({ width: el.offsetWidth, left: el.offsetLeft });
  }, [currentValue]);

  useLayoutEffect(() => {
    measure();
  }, [measure, size, normalized]);

  // 容器尺寸变化时重新测量（block / 响应式）
  useEffect(() => {
    const node = groupRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(node);
    return () => ro.disconnect();
  }, [measure]);

  // 首帧后再启用过渡动画，避免初始跳动
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const select = (val: SegmentedValue) => {
    if (disabled) return;
    const opt = normalized.find((o) => o.value === val);
    if (!opt || opt.disabled) return;
    if (val === currentValue) return;
    if (!isControlled) setInnerValue(val);
    onChange?.(val);
  };

  // 键盘左右方向键切换
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const enabled = normalized.filter((o) => !o.disabled);
    if (!enabled.length) return;
    const idx = enabled.findIndex((o) => o.value === currentValue);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = idx < 0 ? 0 : (idx + 1) % enabled.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = idx < 0 ? 0 : (idx - 1 + enabled.length) % enabled.length;
    } else {
      return;
    }
    e.preventDefault();
    select(enabled[next].value);
  };

  const rootCls = classNames(
    'soui-segmented',
    `soui-segmented-${size}`,
    {
      'soui-segmented-block': block,
      'soui-segmented-disabled': disabled,
      'soui-segmented-ready': ready,
    },
    className
  );

  return (
    <div className={rootCls} style={style} {...rest}>
      <div
        ref={groupRef}
        className="soui-segmented-group"
        role="radiogroup"
        onKeyDown={handleKeyDown}
      >
        <div
          className="soui-segmented-thumb"
          style={{ width: thumb.width, transform: `translateX(${thumb.left}px)` }}
        />
        {normalized.map((opt) => {
          const checked = opt.value === currentValue;
          const itemDisabled = disabled || opt.disabled;
          const itemCls = classNames(
            'soui-segmented-item',
            {
              'soui-segmented-item-selected': checked,
              'soui-segmented-item-disabled': itemDisabled,
            },
            opt.className
          );
          return (
            <label
              key={String(opt.value)}
              ref={setItemRef(opt.value)}
              className={itemCls}
              title={opt.title}
              role="radio"
              aria-checked={checked}
              aria-disabled={itemDisabled}
              tabIndex={itemDisabled ? -1 : 0}
              onClick={() => select(opt.value)}
            >
              <span className="soui-segmented-item-label">
                {opt.icon && <span className="soui-segmented-item-icon">{opt.icon}</span>}
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

Segmented.displayName = 'Segmented';

export default Segmented;
