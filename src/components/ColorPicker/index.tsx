import React, { useState, useRef, useCallback, useEffect, useLayoutEffect, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import {
  parseColor,
  rgbaToHsb,
  hsbToRgba,
  formatColor,
  rgbaToHex,
  hueToHex,
  CHECKERBOARD,
  type RGBA,
  type HSB,
  type ColorFormat,
  defaultPresets,
} from './utils';
import './style.less';

// ==================== 类型定义 ====================

/** 颜色选择器尺寸 */
export type ColorPickerSize = 'small' | 'middle' | 'large';

/** 弹出面板位置 */
export type ColorPickerPlacement =
  | 'bottomLeft' | 'bottomRight'
  | 'topLeft' | 'topRight';

/** 预设颜色组 */
export interface PresetColorGroup {
  /** 分组标签 */
  label: string;
  /** 颜色值数组 */
  colors: string[];
}

/** 颜色选择器属性 */
export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 当前颜色（受控模式） */
  value?: string;
  /** 默认颜色（非受控模式） */
  defaultValue?: string;
  /** 受控格式 */
  format?: ColorFormat;
  /** 默认格式 */
  defaultFormat?: ColorFormat;
  /** 禁用 */
  disabled?: boolean;
  /** 禁用透明度通道 */
  disabledAlpha?: boolean;
  /** 允许清空（显示清除按钮） */
  allowClear?: boolean;
  /** 预设颜色分组 */
  presets?: PresetColorGroup[];
  /** 触发器旁显示颜色文本 */
  showText?: boolean;
  /** 触发器尺寸 */
  size?: ColorPickerSize;
  /** 面板弹出方向 */
  placement?: ColorPickerPlacement;
  /** 颜色变化回调（拖拽中持续触发） */
  onChange?: (color: string) => void;
  /** 颜色选择完成回调（鼠标释放时触发） */
  onChangeComplete?: (color: string) => void;
  /** 格式切换回调 */
  onFormatChange?: (format: ColorFormat) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 清空颜色回调 */
  onClear?: () => void;
}

// ==================== 拖拽交互 Hook ====================

/**
 * 通用拖拽 Hook：将鼠标位移映射为 0-1 范围内的归一化坐标
 * 支持水平、垂直或二维拖拽
 */
function useDrag(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDrag: (normX: number, normY: number) => void,
  onComplete: () => void,
  disabled = false,
) {
  const activeRef = useRef(false);

  const resolve = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      const ny = Math.max(0, Math.min((clientY - rect.top) / rect.height, 1));
      onDrag(nx, ny);
    },
    [containerRef, onDrag],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      activeRef.current = true;
      resolve(e.clientX, e.clientY);

      const move = (ev: MouseEvent) => {
        if (activeRef.current) {
          ev.preventDefault();
          resolve(ev.clientX, ev.clientY);
        }
      };
      const up = () => {
        activeRef.current = false;
        onComplete();
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    [disabled, resolve, onComplete],
  );

  return { onMouseDown };
}

// ==================== 内部子组件 ====================

/** 饱和度 / 亮度选择面板 */
const SaturationPanel: React.FC<{
  hsb: HSB;
  onChange: (patch: Partial<HSB>) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDrag(
    ref,
    (nx, ny) => onChange({ s: Math.round(nx * 100), b: Math.round((1 - ny) * 100) }),
    onComplete,
    disabled,
  );

  return (
    <div
      ref={ref}
      className="soui-color-picker-saturation"
      style={{ background: `hsl(${hsb.h}, 100%, 50%)` }}
      onMouseDown={onMouseDown}
    >
      <div className="soui-color-picker-saturation-gradient soui-color-picker-saturation-gradient--white" />
      <div className="soui-color-picker-saturation-gradient soui-color-picker-saturation-gradient--black" />
      <div
        className="soui-color-picker-saturation-handle"
        style={{ left: `${hsb.s}%`, top: `${100 - hsb.b}%` }}
      />
    </div>
  );
};

/** 色相滑块 */
const HueSlider: React.FC<{
  hsb: HSB;
  onChange: (h: number) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDrag(
    ref,
    (nx) => onChange(Math.round(nx * 360)),
    onComplete,
    disabled,
  );

  return (
    <div
      ref={ref}
      className="soui-color-picker-slider soui-color-picker-slider--hue"
      onMouseDown={onMouseDown}
    >
      <div
        className="soui-color-picker-slider-thumb"
        style={{ left: `${(hsb.h / 360) * 100}%` }}
      />
    </div>
  );
};

/** 透明度滑块 */
const AlphaSlider: React.FC<{
  hsb: HSB;
  onChange: (a: number) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = hsbToRgba(hsb);
  const solidColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const { onMouseDown } = useDrag(
    ref,
    (nx) => onChange(parseFloat(nx.toFixed(2))),
    onComplete,
    disabled,
  );

  return (
    <div
      ref={ref}
      className="soui-color-picker-slider soui-color-picker-slider--alpha"
      style={{ backgroundImage: CHECKERBOARD, backgroundSize: '8px 8px', backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0' }}
      onMouseDown={onMouseDown}
    >
      {/* 颜色渐变层覆盖在棋盘格之上 */}
      <div
        className="soui-color-picker-slider-alpha-overlay"
        style={{ background: `linear-gradient(to right, transparent, ${solidColor})` }}
      />
      <div
        className="soui-color-picker-slider-thumb"
        style={{ left: `${(hsb.a ?? 1) * 100}%` }}
      />
    </div>
  );
};

// ==================== 主组件 ====================

/**
 * ColorPicker 颜色选择器
 *
 * 提供可视化颜色选择面板，支持 hex / rgb / hsb 三种格式输出，
 * 集成 ConfigProvider 主题配置，支持受控/非受控模式。
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = '#1677ff',
  format: controlledFormat,
  defaultFormat = 'hex',
  disabled = false,
  disabledAlpha = false,
  allowClear = false,
  presets = defaultPresets,
  showText = false,
  size = 'middle',
  placement = 'bottomLeft',
  onChange,
  onChangeComplete,
  onFormatChange,
  onOpenChange,
  onClear,
  className,
  style,
  children,
  ...rest
}) => {
  // --- 主题集成 ---
  const ctx = useContext(ConfigContext);
  const theme = (ctx?.components?.ColorPicker || {}) as Record<string, any>;

  // --- 受控 / 非受控状态 ---
  const [internalColor, setInternalColor] = useState(defaultValue);
  const [format, setFormat] = useState<ColorFormat>(defaultFormat);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [placementClass, setPlacementClass] = useState(`soui-color-picker-panel--${placement}`);

  const isControlled = controlledValue !== undefined;
  const isFormatControlled = controlledFormat !== undefined;
  const color = isControlled ? controlledValue : internalColor;
  const currentFormat = isFormatControlled ? controlledFormat : format;

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // --- 颜色解析 ---
  const currentRgba: RGBA = parseColor(color) ?? { r: 22, g: 119, b: 255, a: 1 };
  const currentHsb = rgbaToHsb(currentRgba);

  // --- CSS 变量注入 ---
  const cssVars: Record<string, string | number> = {};
  if (theme.fontSize !== undefined) cssVars['--soui-color-picker-font-size'] = `${theme.fontSize}px`;
  if (theme.borderRadius !== undefined) cssVars['--soui-color-picker-border-radius'] = `${theme.borderRadius}px`;
  if (theme.colorPrimary) cssVars['--soui-color-picker-color-primary'] = theme.colorPrimary;
  if (theme.colorBorder) cssVars['--soui-color-picker-border-color'] = theme.colorBorder;
  if (theme.colorBg) cssVars['--soui-color-picker-panel-bg'] = theme.colorBg;

  const mergedStyle = { ...cssVars, ...style } as React.CSSProperties;

  // --- 颜色更新 ---
  const emitColor = useCallback(
    (rgba: RGBA, complete = false) => {
      const output = formatColor(rgba, currentFormat);
      if (!isControlled) setInternalColor(output);
      onChange?.(output);
      if (complete) onChangeComplete?.(output);
    },
    [currentFormat, isControlled, onChange, onChangeComplete],
  );

  const handleSatChange = useCallback(
    (patch: Partial<HSB>) => emitColor(hsbToRgba({ ...currentHsb, ...patch })),
    [currentHsb, emitColor],
  );

  const handleSatComplete = useCallback(
    () => onChangeComplete?.(formatColor(hsbToRgba(currentHsb), currentFormat)),
    [currentHsb, currentFormat, onChangeComplete],
  );

  const handleHueChange = useCallback(
    (h: number) => emitColor(hsbToRgba({ ...currentHsb, h })),
    [currentHsb, emitColor],
  );

  const handleHueComplete = useCallback(
    () => onChangeComplete?.(formatColor(hsbToRgba(currentHsb), currentFormat)),
    [currentHsb, currentFormat, onChangeComplete],
  );

  const handleAlphaChange = useCallback(
    (a: number) => emitColor({ ...currentRgba, a }),
    [currentRgba, emitColor],
  );

  const handleAlphaComplete = useCallback(
    () => onChangeComplete?.(formatColor(currentRgba, currentFormat)),
    [currentRgba, currentFormat, onChangeComplete],
  );

  // --- 格式切换 ---
  const handleFormatSwitch = useCallback(
    (f: ColorFormat) => {
      if (!isFormatControlled) setFormat(f);
      onFormatChange?.(f);
    },
    [isFormatControlled, onFormatChange],
  );

  // --- 输入框 ---
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputText(val);
      const parsed = parseColor(val);
      if (parsed) emitColor(parsed);
    },
    [emitColor],
  );

  const handleInputBlur = useCallback(() => {
    setInputText(formatColor(currentRgba, currentFormat));
  }, [currentRgba, currentFormat]);

  // --- 预设颜色 ---
  const handlePresetPick = useCallback(
    (c: string) => {
      const parsed = parseColor(c);
      if (parsed) emitColor(parsed, true);
    },
    [emitColor],
  );

  // --- 清空 ---
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalColor('');
      onChange?.('');
      onClear?.();
      setOpen(false);
    },
    [isControlled, onChange, onClear],
  );

  // --- 面板开关 ---
  const togglePanel = useCallback(() => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
    if (next) {
      setInputText(formatColor(currentRgba, currentFormat));
      setPlacementClass(`soui-color-picker-panel--${placement}`);
    }
  }, [disabled, open, onOpenChange, currentRgba, currentFormat, placement]);

  // --- 外部点击关闭 ---
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onOpenChange]);

  // --- 视口溢出自动调整定位（useLayoutEffect 同步修改 DOM，避免闪烁） ---
  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;

    const panel = panelRef.current;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const PANEL_W = 310;
    const PANEL_H = 420; // 预估面板高度
    const gap = 8;

    // 水平方向：左对齐还是右对齐
    const spaceRight = viewportWidth - triggerRect.left - gap;
    const spaceLeft = triggerRect.right - gap;
    const useLeft = spaceRight >= PANEL_W;
    const useRight = !useLeft && spaceLeft >= PANEL_W;

    let hAlign: 'Left' | 'Right';
    let maxW: number;
    if (useLeft) {
      hAlign = 'Left';
      maxW = Math.min(PANEL_W, spaceRight);
    } else if (useRight) {
      hAlign = 'Right';
      maxW = Math.min(PANEL_W, spaceLeft);
    } else {
      hAlign = spaceRight >= spaceLeft ? 'Left' : 'Right';
      maxW = Math.max(200, Math.max(spaceRight, spaceLeft));
    }

    // 垂直方向：向上弹还是向下弹
    let vAlign: 'top' | 'bottom' = 'bottom';
    if (viewportHeight - triggerRect.bottom - gap < PANEL_H && triggerRect.top - gap > viewportHeight - triggerRect.bottom - gap) {
      vAlign = 'top';
    }

    const cls = `soui-color-picker-panel--${vAlign}${hAlign}`;
    setPlacementClass(cls);
    panel.style.maxWidth = `${maxW}px`;
  }, [open, placement]);

  // --- 触发器内容 ---
  const triggerBody = children ?? (
    <span
      className="soui-color-picker-swatch"
      style={{ background: color || 'transparent' }}
    >
      {!color && <span className="soui-color-picker-swatch-empty" />}
    </span>
  );

  return (
    <div
      className={classNames(
        'soui-color-picker',
        `soui-color-picker--${size}`,
        { 'soui-color-picker--disabled': disabled },
        className,
      )}
      style={mergedStyle}
      {...rest}
    >
      {/* 触发器 */}
      <div
        ref={triggerRef}
        className="soui-color-picker-trigger"
        onClick={togglePanel}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="打开颜色选择器"
        tabIndex={disabled ? -1 : 0}
      >
        {triggerBody}
        {showText && color && (
          <span className="soui-color-picker-label">{color}</span>
        )}
        {allowClear && color && (
          <button
            type="button"
            className="soui-color-picker-clear-btn"
            onClick={handleClear}
            aria-label="清除颜色值"
            tabIndex={0}
          >
            ×
          </button>
        )}
      </div>

      {/* 弹出面板 */}
      {open && (
        <div
          ref={panelRef}
          className={classNames(
            'soui-color-picker-panel',
            placementClass,
          )}
          role="dialog"
          aria-label="颜色选择面板"
        >
          {/* 预览色块 */}
          <div
            className="soui-color-picker-preview"
            style={{ background: formatColor(currentRgba, 'rgb') }}
          />

          {/* 饱和度 / 亮度面板 */}
          <SaturationPanel
            hsb={currentHsb}
            onChange={handleSatChange}
            onComplete={handleSatComplete}
            disabled={disabled}
          />

          {/* 色相滑块 */}
          <HueSlider
            hsb={currentHsb}
            onChange={handleHueChange}
            onComplete={handleHueComplete}
            disabled={disabled}
          />

          {/* 透明度滑块 */}
          {!disabledAlpha && (
            <AlphaSlider
              hsb={currentHsb}
              onChange={handleAlphaChange}
              onComplete={handleAlphaComplete}
              disabled={disabled}
            />
          )}

          {/* 颜色输入 + 格式切换 */}
          <div className="soui-color-picker-input-row">
            <input
              className="soui-color-picker-input"
              value={inputText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={disabled}
              spellCheck={false}
              aria-label="颜色值输入框"
            />
            <div className="soui-color-picker-format-group">
              {(['hex', 'rgb', 'hsb'] as ColorFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={classNames('soui-color-picker-format-btn', {
                    'soui-color-picker-format-btn--active': currentFormat === f,
                  })}
                  onClick={() => handleFormatSwitch(f)}
                  aria-label={`切换为 ${f.toUpperCase()} 格式`}
                  aria-pressed={currentFormat === f}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 预设色板 */}
          {presets.length > 0 && (
            <div className="soui-color-picker-presets">
              {presets.map((group) => (
                <div key={group.label} className="soui-color-picker-preset-group">
                  <div className="soui-color-picker-preset-group-label">{group.label}</div>
                  <div className="soui-color-picker-preset-colors">
                    {group.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={classNames('soui-color-picker-preset-item', {
                          'soui-color-picker-preset-item--active':
                            color?.toLowerCase() === c.toLowerCase(),
                        })}
                        style={{ background: c }}
                        onClick={() => handlePresetPick(c)}
                        title={c}
                        aria-label={`选择颜色 ${c}`}
                        tabIndex={0}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
