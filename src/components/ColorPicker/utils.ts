// ==================== 颜色类型定义 ====================

/** HSB/HSV 颜色模型 */
export interface HSB {
  /** 色相 0-360 */
  h: number;
  /** 饱和度 0-100 */
  s: number;
  /** 亮度 0-100 */
  b: number;
  /** 透明度 0-1 */
  a?: number;
}

/** RGBA 颜色模型 */
export interface RGBA {
  /** 红色通道 0-255 */
  r: number;
  /** 绿色通道 0-255 */
  g: number;
  /** 蓝色通道 0-255 */
  b: number;
  /** 透明度 0-1 */
  a: number;
}

/** 支持的输出格式 */
export type ColorFormat = 'hex' | 'rgb' | 'hsb';

// ==================== 颜色解析器 ====================

/** 解析十六进制颜色字符串 */
function parseHex(hex: string): RGBA | null {
  const clean = hex.replace('#', '');
  let r: number, g: number, b: number, a = 1;

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
  } else if (clean.length === 8) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
    a = parseInt(clean.slice(6, 8), 16) / 255;
  } else {
    return null;
  }

  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b, a: Number.isNaN(a) ? 1 : a };
}

/** 解析 rgb()/rgba() 函数式颜色 */
function parseRgbString(str: string): RGBA | null {
  const m = str.match(
    /rgba?\(\s*(\d+(?:\.\d+)?%?)\s*[,\s]\s*(\d+(?:\.\d+)?%?)\s*[,\s]\s*(\d+(?:\.\d+)?%?)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)/
  );
  if (!m) return null;

  const parseChannel = (v: string) =>
    v.endsWith('%') ? (parseFloat(v) / 100) * 255 : parseFloat(v);

  const r = parseChannel(m[1]);
  const g = parseChannel(m[2]);
  const b = parseChannel(m[3]);
  const a = m[4]
    ? m[4].endsWith('%')
      ? parseFloat(m[4]) / 100
      : parseFloat(m[4])
    : 1;

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a };
}

/** 解析 hsl()/hsla() 函数式颜色 */
function parseHslString(str: string): RGBA | null {
  const m = str.match(
    /hsla?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)%\s*[,\s]\s*([\d.]+)%\s*(?:[,/]\s*([\d.]+%?)\s*)?\)/
  );
  if (!m) return null;

  const h = parseFloat(m[1]);
  const s = parseFloat(m[2]) / 100;
  const l = parseFloat(m[3]) / 100;
  const a = m[4]
    ? m[4].endsWith('%')
      ? parseFloat(m[4]) / 100
      : parseFloat(m[4])
    : 1;

  // HSL → RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const mod = l - c / 2;

  let r1: number, g1: number, b1: number;
  if (h < 60)        { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120)  { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180)  { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240)  { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300)  { r1 = x; g1 = 0; b1 = c; }
  else               { r1 = c; g1 = 0; b1 = x; }

  return {
    r: Math.round((r1 + mod) * 255),
    g: Math.round((g1 + mod) * 255),
    b: Math.round((b1 + mod) * 255),
    a,
  };
}

/** 通过 Canvas API 解析 CSS 命名颜色 */
function parseNamedColor(name: string): RGBA | null {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = name;
    const result = ctx.fillStyle;
    if (result && result !== '#000000') return parseHex(result);
  } catch {
    // 忽略 Canvas 不可用场景
  }
  return null;
}

/** 解析任意颜色字符串为 RGBA */
export const parseColor = (color: string): RGBA | null => {
  if (!color) return null;
  const v = color.trim().toLowerCase();

  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (v.startsWith('#')) return parseHex(v);
  if (v.startsWith('rgb')) return parseRgbString(v);
  if (v.startsWith('hsl')) return parseHslString(v);

  return parseNamedColor(v);
};

// ==================== 颜色空间转换 ====================

/** RGBA → HSB */
export const rgbaToHsb = (rgba: RGBA): HSB => {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d > 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(max === 0 ? 0 : (d / max) * 100),
    b: Math.round(max * 100),
    a: rgba.a,
  };
};

/** HSB → RGBA */
export const hsbToRgba = (hsb: HSB): RGBA => {
  const sN = hsb.s / 100;
  const bN = hsb.b / 100;
  const c = bN * sN;
  const x = c * (1 - Math.abs(((hsb.h / 60) % 2) - 1));
  const m = bN - c;

  let r1: number, g1: number, b1: number;
  const sector = hsb.h / 60;
  if (sector < 1)       { r1 = c; g1 = x; b1 = 0; }
  else if (sector < 2)  { r1 = x; g1 = c; b1 = 0; }
  else if (sector < 3)  { r1 = 0; g1 = c; b1 = x; }
  else if (sector < 4)  { r1 = 0; g1 = x; b1 = c; }
  else if (sector < 5)  { r1 = x; g1 = 0; b1 = c; }
  else                  { r1 = c; g1 = 0; b1 = x; }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a: hsb.a ?? 1,
  };
};

// ==================== 输出格式化 ====================

/** 单通道值 → 2位十六进制 */
const toHex2 = (n: number) => {
  const v = Math.round(Math.max(0, Math.min(255, n))).toString(16);
  return v.length < 2 ? '0' + v : v;
};

/** RGBA → hex 字符串 (#rrggbb 或 #rrggbbaa) */
export const rgbaToHex = (rgba: RGBA): string => {
  const base = `#${toHex2(rgba.r)}${toHex2(rgba.g)}${toHex2(rgba.b)}`;
  return rgba.a < 1 ? base + toHex2(rgba.a * 255) : base;
};

/** RGBA → rgb()/rgba() 字符串 */
export const rgbaToString = (rgba: RGBA): string => {
  const { r, g, b } = rgba;
  if (rgba.a < 1) return `rgba(${r}, ${g}, ${b}, ${parseFloat(rgba.a.toFixed(2))})`;
  return `rgb(${r}, ${g}, ${b})`;
};

/** HSB → hsb()/hsba() 字符串 */
export const hsbToString = (hsb: HSB): string => {
  const { h, s, b } = hsb;
  if (hsb.a !== undefined && hsb.a < 1) return `hsba(${h}, ${s}%, ${b}%, ${parseFloat(hsb.a.toFixed(2))})`;
  return `hsb(${h}, ${s}%, ${b}%)`;
};

/** 将 RGBA 按指定格式输出字符串 */
export const formatColor = (rgba: RGBA, format: ColorFormat): string => {
  switch (format) {
    case 'hex': return rgbaToHex(rgba);
    case 'rgb': return rgbaToString(rgba);
    case 'hsb': return hsbToString(rgbaToHsb(rgba));
  }
};

/** 将任意颜色字符串解析为 RGBA（失败返回 null） */
export const toRgba = (color: string): RGBA | null => parseColor(color);

// ==================== 辅助工具 ====================

/** 获取纯色 hex（用于饱和度面板背景） */
export const hueToHex = (h: number): string =>
  rgbaToHex(hsbToRgba({ h, s: 100, b: 100 }));

/** 棋盘格 CSS（透明度滑块背景） */
export const CHECKERBOARD = [
  'linear-gradient(45deg, #c5c5c5 25%, transparent 25%)',
  'linear-gradient(-45deg, #c5c5c5 25%, transparent 25%)',
  'linear-gradient(45deg, transparent 75%, #c5c5c5 75%)',
  'linear-gradient(-45deg, transparent 75%, #c5c5c5 75%)',
].join(', ');

// ==================== 预设颜色 ====================

export const defaultPresets: { label: string; colors: string[] }[] = [
  {
    label: '推荐',
    colors: [
      '#f5222d', '#fa541c', '#fa8c16', '#faad14',
      '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
      '#1677ff', '#2f54eb', '#722ed1', '#eb2f96',
    ],
  },
  {
    label: '最近使用',
    colors: [],
  },
];
