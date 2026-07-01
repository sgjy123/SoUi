// ==================== 颜色类型 ====================

export interface HSB {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
  a?: number; // 0-1
}

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a?: number; // 0-1
}

// ==================== 解析颜色字符串 ====================

/** 解析 hex 颜色 */
export const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] !== undefined ? parseInt(result[4], 16) / 255 : 1,
  };
};

/** 解析 rgb/rgba 颜色 */
export const rgbStringToRgb = (str: string): RGB | null => {
  const match = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
};

/** 解析任意颜色字符串 */
export const parseColor = (color: string): RGB | null => {
  if (!color) return null;
  const trimmed = color.trim();

  // 尝试 hex
  if (trimmed.startsWith('#')) {
    return hexToRgb(trimmed);
  }

  // 尝试 rgb/rgba
  if (trimmed.startsWith('rgb')) {
    return rgbStringToRgb(trimmed);
  }

  // 尝试命名颜色（使用 canvas 解析）
  if (typeof document !== 'undefined') {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.fillStyle = trimmed;
      const computed = ctx.fillStyle;
      if (computed && computed !== '#000000') {
        return hexToRgb(computed);
      }
    }
  }

  return null;
};

// ==================== 颜色转换 ====================

/** RGB → Hex */
export const rgbToHex = (rgb: RGB): string => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  if (rgb.a !== undefined && rgb.a < 1) {
    return hex + toHex(Math.round(rgb.a * 255));
  }
  return hex;
};

/** RGB → RGB 字符串 */
export const rgbToRgbString = (rgb: RGB): string => {
  if (rgb.a !== undefined && rgb.a < 1) {
    return `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a.toFixed(2)})`;
  }
  return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
};

/** RGB → HSB */
export const rgbToHsb = (rgb: RGB): HSB => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const brightness = max * 100;

  return { h: Math.round(h), s: Math.round(s), b: Math.round(brightness), a: rgb.a };
};

/** HSB → RGB */
export const hsbToRgb = (hsb: HSB): RGB => {
  const h = hsb.h / 360;
  const s = hsb.s / 100;
  const b = hsb.b / 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = b * (1 - s);
  const q = b * (1 - f * s);
  const t = b * (1 - (1 - f) * s);

  let r: number, g: number, bl: number;
  switch (i % 6) {
    case 0: r = b; g = t; bl = p; break;
    case 1: r = q; g = b; bl = p; break;
    case 2: r = p; g = b; bl = t; break;
    case 3: r = p; g = q; bl = b; break;
    case 4: r = t; g = p; bl = b; break;
    default: r = b; g = p; bl = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(bl * 255),
    a: hsb.a,
  };
};

/** HSB → Hex */
export const hsbToHex = (hsb: HSB): string => rgbToHex(hsbToRgb(hsb));

/** HSB → RGB 字符串 */
export const hsbToRgbString = (hsb: HSB): string => rgbToRgbString(hsbToRgb(hsb));

// ==================== 格式化输出 ====================

export type ColorFormat = 'hex' | 'rgb' | 'hsb';

/** 将 RGB 格式化为指定格式的字符串 */
export const formatColor = (rgb: RGB, format: ColorFormat): string => {
  switch (format) {
    case 'hex':
      return rgbToHex(rgb);
    case 'rgb':
      return rgbToRgbString(rgb);
    case 'hsb': {
      const hsb = rgbToHsb(rgb);
      if (hsb.a !== undefined && hsb.a < 1) {
        return `hsba(${hsb.h}, ${hsb.s}%, ${hsb.b}%, ${hsb.a.toFixed(2)})`;
      }
      return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
    }
    default:
      return rgbToHex(rgb);
  }
};

/** 将任意颜色字符串转为 RGB */
export const toRgb = (color: string): RGB | null => {
  if (!color) return null;
  const parsed = parseColor(color);
  if (parsed) return parsed;

  // 尝试解析 hsb/hsba
  const hsbMatch = color.match(/hsba?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (hsbMatch) {
    const hsb: HSB = {
      h: parseInt(hsbMatch[1], 10),
      s: parseInt(hsbMatch[2], 10),
      b: parseInt(hsbMatch[3], 10),
      a: hsbMatch[4] !== undefined ? parseFloat(hsbMatch[4]) : 1,
    };
    return hsbToRgb(hsb);
  }

  return null;
};

// ==================== 预设颜色 ====================

export const defaultPresets: { label: string; colors: string[] }[] = [
  {
    label: '常用',
    colors: [
      '#000000', '#FFFFFF', '#F5222D', '#FA541C', '#FA8C16', '#FADB14',
      '#52C41A', '#13C2C2', '#1677FF', '#2F54EB', '#722ED1', '#EB2F96',
    ],
  },
  {
    label: '浅色系',
    colors: [
      '#FFF1F0', '#FFF7E6', '#FFFBE6', '#FEFFE6', '#F6FFED', '#E6FFFB',
      '#E6F7FF', '#F0F5FF', '#F9F0FF', '#FFF0F6',
    ],
  },
  {
    label: '深色系',
    colors: [
      '#CF1322', '#D4380D', '#D46B08', '#D4B106', '#389E0D', '#08979C',
      '#0958D9', '#1D39C4', '#531DAB', '#C41D7F',
    ],
  },
];
