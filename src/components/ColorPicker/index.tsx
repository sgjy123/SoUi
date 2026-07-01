import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import {
  toRgb,
  rgbToHsb,
  hsbToRgb,
  formatColor,
  type RGB,
  type HSB,
  type ColorFormat,
  defaultPresets,
} from './utils';
import type { ComponentThemeConfig } from '../ConfigProvider/types';
import './style.less';

// ==================== Types ====================

/** 颜色选择器尺寸 */
export type ColorPickerSize = 'small' | 'medium' | 'large';

/** 颜色选择器弹出位置 */
export type ColorPickerPlacement =
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';

/** 预设颜色配置 */
export interface PresetColorGroup {
  label: string;
  colors: string[];
}

/** 颜色选择器属性 */
export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 当前颜色值（受控） */
  value?: string;
  /** 默认颜色值（非受控） */
  defaultValue?: string;
  /** 颜色格式 */
  format?: ColorFormat;
  /** 默认格式 */
  defaultFormat?: ColorFormat;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用透明度 */
  disabledAlpha?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 预设颜色面板 */
  presets?: PresetColorGroup[];
  /** 是否显示颜色文本 */
  showText?: boolean;
  /** 触发器尺寸 */
  size?: ColorPickerSize;
  /** 弹出位置 */
  placement?: ColorPickerPlacement;
  /** 颜色改变时触发 */
  onChange?: (color: string) => void;
  /** 颜色选择完成时触发（鼠标释放） */
  onChangeComplete?: (color: string) => void;
  /** 格式改变时触发 */
  onFormatChange?: (format: ColorFormat) => void;
  /** 弹出面板显隐变化 */
  onOpenChange?: (open: boolean) => void;
  /** 清除时触发 */
  onClear?: () => void;
}

// ==================== 尺寸映射 ====================

const sizeMap: Record<ColorPickerSize, number> = {
  small: 24,
  medium: 32,
  large: 40,
};

// ==================== 自定义 Hook: 拖拽交互 ====================

const useDrag = (
  elementRef: React.RefObject<HTMLElement>,
  onDrag: (x: number, y: number) => void,
  onComplete: () => void,
  disabled?: boolean
) => {
  const draggingRef = useRef(false);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      onDrag(x / rect.width, y / rect.height);
    },
    [elementRef, onDrag]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      draggingRef.current = true;
      handleMove(e.clientX, e.clientY);

      const onMouseMove = (ev: MouseEvent) => {
        if (draggingRef.current) {
          ev.preventDefault();
          handleMove(ev.clientX, ev.clientY);
        }
      };

      const onMouseUp = () => {
        draggingRef.current = false;
        onComplete();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [disabled, handleMove, onComplete]
  );

  return { handleMouseDown };
};

// ==================== 饱和度/亮度面板 ====================

const SaturationPanel: React.FC<{
  hsb: HSB;
  onChange: (hsb: Partial<HSB>) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (x: number, y: number) => {
      onChange({ s: Math.round(x * 100), b: Math.round(100 - y * 100) });
    },
    [onChange]
  );

  const { handleMouseDown } = useDrag(panelRef, handleDrag, onComplete, disabled);

  const pureHueColor = `hsl(${hsb.h}, 100%, 50%)`;

  return (
    <div
      ref={panelRef}
      className="soui-color-picker-saturation"
      style={{ background: pureHueColor }}
      onMouseDown={handleMouseDown}
    >
      <div className="soui-color-picker-saturation-gradient soui-color-picker-saturation-white" />
      <div className="soui-color-picker-saturation-gradient soui-color-picker-saturation-black" />
      <div
        className="soui-color-picker-saturation-pointer"
        style={{ left: `${hsb.s}%`, top: `${100 - hsb.b}%` }}
      />
    </div>
  );
};

// ==================== 色相滑块 ====================

const HueSlider: React.FC<{
  hsb: HSB;
  onChange: (h: number) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (x: number) => {
      onChange(Math.round(x * 360));
    },
    [onChange]
  );

  const { handleMouseDown } = useDrag(sliderRef, handleDrag, onComplete, disabled);

  return (
    <div
      ref={sliderRef}
      className="soui-color-picker-slider soui-color-picker-hue"
      onMouseDown={handleMouseDown}
    >
      <div
        className="soui-color-picker-slider-handle"
        style={{ left: `${(hsb.h / 360) * 100}%` }}
      />
    </div>
  );
};

// ==================== 透明度滑块 ====================

const AlphaSlider: React.FC<{
  hsb: HSB;
  onChange: (a: number) => void;
  onComplete: () => void;
  disabled?: boolean;
}> = ({ hsb, onChange, onComplete, disabled }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const rgb = hsbToRgb(hsb);
  const solidColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const handleDrag = useCallback(
    (x: number) => {
      onChange(parseFloat(x.toFixed(2)));
    },
    [onChange]
  );

  const { handleMouseDown } = useDrag(sliderRef, handleDrag, onComplete, disabled);

  return (
    <div
      ref={sliderRef}
      className="soui-color-picker-slider soui-color-picker-alpha"
      style={{ background: `linear-gradient(to right, transparent, ${solidColor})` }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="soui-color-picker-slider-handle"
        style={{ left: `${(hsb.a ?? 1) * 100}%` }}
      />
    </div>
  );
};

// ==================== 主组件 ====================

/**
 * ColorPicker 颜色选择器
 *
 * 用于选择颜色，支持 hex、rgb、hsb 格式切换，可调节饱和度、亮度和透明度。
 * 参考 Ant Design 的 API 设计。
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = '#1677FF',
  format: controlledFormat,
  defaultFormat = 'hex',
  disabled = false,
  disabledAlpha = false,
  allowClear = false,
  presets = defaultPresets,
  showText = false,
  size = 'medium',
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
  const context = useContext(ConfigContext);
  const pickerTheme = (context?.components?.ColorPicker || {}) as Record<string, any>;

  // 状态
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [format, setFormat] = useState<ColorFormat>(defaultFormat);
  const [inputValue, setInputValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const isFormatControlled = controlledFormat !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const currentFormat = isFormatControlled ? controlledFormat : format;

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 解析当前颜色
  const currentRgb = toRgb(currentValue) || { r: 22, g: 119, b: 255, a: 1 };
  const currentHsb = rgbToHsb(currentRgb);

  // CSS 变量注入
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (pickerTheme.fontSize !== undefined) {
    cssVars['--soui-color-picker-font-size'] = `${pickerTheme.fontSize}px`;
  }
  if (pickerTheme.borderRadius !== undefined) {
    cssVars['--soui-color-picker-border-radius'] = `${pickerTheme.borderRadius}px`;
  }
  if (pickerTheme.colorPrimary) {
    cssVars['--soui-color-picker-color-primary'] = pickerTheme.colorPrimary;
  }

  // 更新颜色
  const updateColor = useCallback(
    (newRgb: RGB, complete = false) => {
      const formatted = formatColor(newRgb, currentFormat);
      if (!isControlled) setInternalValue(formatted);
      onChange?.(formatted);
      if (complete) onChangeComplete?.(formatted);
    },
    [currentFormat, isControlled, onChange, onChangeComplete]
  );

  // HSB 变化
  const handleHsbChange = useCallback(
    (partial: Partial<HSB>) => {
      updateColor(hsbToRgb({ ...currentHsb, ...partial }));
    },
    [currentHsb, updateColor]
  );

  const handleHsbComplete = useCallback(() => {
    onChangeComplete?.(formatColor(hsbToRgb(currentHsb), currentFormat));
  }, [currentHsb, currentFormat, onChangeComplete]);

  // 透明度变化
  const handleAlphaChange = useCallback(
    (a: number) => {
      updateColor({ ...currentRgb, a });
    },
    [currentRgb, updateColor]
  );

  const handleAlphaComplete = useCallback(() => {
    onChangeComplete?.(formatColor(currentRgb, currentFormat));
  }, [currentRgb, currentFormat, onChangeComplete]);

  // 格式切换
  const handleFormatChange = useCallback(
    (newFormat: ColorFormat) => {
      if (!isFormatControlled) setFormat(newFormat);
      onFormatChange?.(newFormat);
    },
    [isFormatControlled, onFormatChange]
  );

  // 输入框
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      const rgb = toRgb(val);
      if (rgb) updateColor(rgb);
    },
    [updateColor]
  );

  const handleInputBlur = useCallback(() => {
    setInputValue(formatColor(currentRgb, currentFormat));
  }, [currentRgb, currentFormat]);

  // 预设颜色
  const handlePresetClick = useCallback(
    (color: string) => {
      const rgb = toRgb(color);
      if (rgb) updateColor(rgb, true);
    },
    [updateColor]
  );

  // 清除
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue('');
      onChange?.('');
      onClear?.();
      setOpen(false);
    },
    [isControlled, onChange, onClear]
  );

  // 面板显隐
  const handleTriggerClick = useCallback(() => {
    if (disabled) return;
    const newOpen = !open;
    setOpen(newOpen);
    onOpenChange?.(newOpen);
    if (newOpen) {
      setInputValue(formatColor(currentRgb, currentFormat));
    }
  }, [disabled, open, onOpenChange, currentRgb, currentFormat]);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onOpenChange]);

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // 触发器内容
  const triggerContent = children || (
    <div
      className="soui-color-picker-trigger-color"
      style={{ backgroundColor: currentValue || 'transparent' }}
    >
      {!currentValue && <span className="soui-color-picker-trigger-empty" />}
    </div>
  );

  return (
    <div
      className={classNames(
        'soui-color-picker',
        `soui-color-picker-${size}`,
        { 'soui-color-picker-disabled': disabled },
        className
      )}
      style={componentStyle}
      {...rest}
    >
      {/* 触发器 */}
      <div
        ref={triggerRef}
        className="soui-color-picker-trigger"
        onClick={handleTriggerClick}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="颜色选择器"
      >
        {triggerContent}
        {showText && currentValue && (
          <span className="soui-color-picker-trigger-text">{currentValue}</span>
        )}
        {allowClear && currentValue && (
          <span
            className="soui-color-picker-clear"
            onClick={handleClear}
            role="button"
            aria-label="清除颜色"
            tabIndex={0}
          >
            ×
          </span>
        )}
      </div>

      {/* 弹出面板 */}
      {open && (
        <div
          ref={panelRef}
          className={classNames('soui-color-picker-panel', `soui-color-picker-panel-${placement}`)}
          role="dialog"
          aria-label="颜色选择面板"
        >
          {/* 饱和度/亮度面板 */}
          <SaturationPanel
            hsb={currentHsb}
            onChange={handleHsbChange}
            onComplete={handleHsbComplete}
            disabled={disabled}
          />

          {/* 色相滑块 */}
          <HueSlider
            hsb={currentHsb}
            onChange={(h) => handleHsbChange({ h })}
            onComplete={handleHsbComplete}
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

          {/* 输入区域 */}
          <div className="soui-color-picker-input-area">
            <input
              className="soui-color-picker-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={disabled}
              spellCheck={false}
              aria-label="颜色值输入"
            />
            <div className="soui-color-picker-formats">
              {(['hex', 'rgb', 'hsb'] as ColorFormat[]).map((f) => (
                <button
                  key={f}
                  className={classNames('soui-color-picker-format-btn', {
                    'soui-color-picker-format-btn-active': currentFormat === f,
                  })}
                  onClick={() => handleFormatChange(f)}
                  type="button"
                  aria-label={`切换到 ${f.toUpperCase()} 格式`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 预设颜色 */}
          {presets.length > 0 && (
            <div className="soui-color-picker-presets">
              {presets.map((group) => (
                <div key={group.label} className="soui-color-picker-preset-group">
                  <div className="soui-color-picker-preset-label">{group.label}</div>
                  <div className="soui-color-picker-preset-colors">
                    {group.colors.map((color) => (
                      <div
                        key={color}
                        className={classNames('soui-color-picker-preset-color', {
                          'soui-color-picker-preset-color-active':
                            currentValue?.toLowerCase() === color.toLowerCase(),
                        })}
                        style={{ backgroundColor: color }}
                        onClick={() => handlePresetClick(color)}
                        title={color}
                        role="button"
                        aria-label={`选择颜色 ${color}`}
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
