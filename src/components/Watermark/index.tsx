import React, { useEffect, useRef, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export interface WatermarkProps {
  /** 水印容器类名 */
  className?: string;
  /** 水印容器样式 */
  style?: React.CSSProperties;
  /** 水印文本内容（支持 \n 换行） */
  content?: string;
  /** 水印图片 URL */
  image?: string;
  /** 水印宽度 */
  width?: number;
  /** 水印高度 */
  height?: number;
  /** 水印旋转角度 */
  rotate?: number;
  /** 水印间距 X 轴 */
  gapX?: number;
  /** 水印间距 Y 轴 */
  gapY?: number;
  /** 水印偏移量 X 轴 */
  offsetLeft?: number;
  /** 水印偏移量 Y 轴 */
  offsetTop?: number;
  /** 水印透明度 */
  opacity?: number;
  /** 水印字体颜色 */
  fontColor?: string;
  /** 水印字体大小 */
  fontSize?: number;
  /** 水印字体粗细 */
  fontWeight?: string | number;
  /** 水印字体 */
  fontFamily?: string;
  /** 水印层级 */
  zIndex?: number;
  /** 子元素 */
  children?: React.ReactNode;
}

// ==================== Defaults ====================

const DEFAULT_OPTIONS = {
  rotate: -22,
  width: 120,
  height: 64,
  gapX: 100,
  gapY: 100,
  offsetLeft: 0,
  offsetTop: 0,
  opacity: 0.15,
  fontColor: 'rgba(0, 0, 0, 0.85)',
  fontSize: 16,
  fontWeight: 'normal' as const,
  fontFamily: 'sans-serif',
  zIndex: 9,
};

// ==================== Canvas Helpers ====================

interface DrawOptions {
  content: string;
  image: string;
  width: number;
  height: number;
  rotate: number;
  opacity: number;
  fontColor: string;
  fontSize: number;
  fontWeight: string | number;
  fontFamily: string;
}

/**
 * 绘制文本水印（支持 \n 多行）
 */
function drawText(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  opts: DrawOptions,
) {
  const { content, rotate, opacity, fontColor, fontSize, fontWeight, fontFamily } = opts;
  const angle = (rotate * Math.PI) / 180;

  ctx.globalAlpha = opacity;
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate(angle);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = content.split('\n');
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = -totalHeight / 2 + lineHeight / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, 0, startY + i * lineHeight);
  });
}

/**
 * 绘制图片水印（异步加载）
 * @returns Promise<string> base64 data URL
 */
function drawImage(
  canvasWidth: number,
  canvasHeight: number,
  opts: DrawOptions,
): Promise<string> {
  const { image, rotate, opacity, width, height } = opts;
  const angle = (rotate * Math.PI) / 180;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }
      ctx.globalAlpha = opacity;
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate(angle);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve('');
    img.src = image;
  });
}

/**
 * 同步生成文本水印 base64
 */
function generateTextBase64(opts: DrawOptions): string {
  const { width, height, rotate } = opts;
  const angle = (rotate * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // 计算旋转后的 canvas 尺寸
  const canvasWidth = Math.abs(width * cos) + Math.abs(height * sin);
  const canvasHeight = Math.abs(width * sin) + Math.abs(height * cos);

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  drawText(ctx, canvasWidth, canvasHeight, opts);
  return canvas.toDataURL('image/png');
}

/**
 * 计算旋转后 canvas 尺寸
 */
function calcCanvasSize(width: number, height: number, rotate: number) {
  const angle = (rotate * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    canvasWidth: Math.abs(width * cos) + Math.abs(height * sin),
    canvasHeight: Math.abs(width * sin) + Math.abs(height * cos),
  };
}

// ==================== Watermark Component ====================

const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    className,
    style,
    content = '',
    image = '',
    width = DEFAULT_OPTIONS.width,
    height = DEFAULT_OPTIONS.height,
    rotate = DEFAULT_OPTIONS.rotate,
    gapX = DEFAULT_OPTIONS.gapX,
    gapY = DEFAULT_OPTIONS.gapY,
    offsetLeft = DEFAULT_OPTIONS.offsetLeft,
    offsetTop = DEFAULT_OPTIONS.offsetTop,
    opacity = DEFAULT_OPTIONS.opacity,
    fontColor = DEFAULT_OPTIONS.fontColor,
    fontSize = DEFAULT_OPTIONS.fontSize,
    fontWeight = DEFAULT_OPTIONS.fontWeight,
    fontFamily = DEFAULT_OPTIONS.fontFamily,
    zIndex = DEFAULT_OPTIONS.zIndex,
    children,
  } = props;

  // 读取 ConfigProvider 主题
  const context = useContext(ConfigContext);
  const watermarkTheme = (context?.components?.Watermark || {}) as Record<string, any>;

  // 合并主题配置（优先级：Props > ConfigProvider > 默认值）
  const mergedFontColor = fontColor !== DEFAULT_OPTIONS.fontColor ? fontColor : (watermarkTheme.fontColor || fontColor);
  const mergedFontSize = fontSize !== DEFAULT_OPTIONS.fontSize ? fontSize : (watermarkTheme.fontSize || fontSize);
  const mergedZIndex = zIndex !== DEFAULT_OPTIONS.zIndex ? zIndex : (watermarkTheme.zIndex ?? zIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const isAppendingRef = useRef(false); // 防止 MutationObserver 循环

  // 稳定化绘制参数
  const drawOpts = useMemo<DrawOptions>(() => ({
    content,
    image,
    width,
    height,
    rotate,
    opacity,
    fontColor: mergedFontColor,
    fontSize: mergedFontSize,
    fontWeight,
    fontFamily,
  }), [content, image, width, height, rotate, opacity, mergedFontColor, mergedFontSize, fontWeight, fontFamily]);

  // 生成背景样式
  const buildBackgroundStyle = useCallback((base64: string): React.CSSProperties => ({
    zIndex: mergedZIndex,
    backgroundImage: `url('${base64}')`,
    backgroundSize: `${width + gapX}px ${height + gapY}px`,
    backgroundPosition: `${offsetLeft}px ${offsetTop}px`,
    backgroundRepeat: 'repeat',
  }), [width, height, gapX, gapY, offsetLeft, offsetTop, mergedZIndex]);

  // 创建/更新水印层
  const renderWatermark = useCallback((base64: string) => {
    const container = containerRef.current;
    if (!container) return;

    // 标记正在操作 DOM，防止 observer 回调
    isAppendingRef.current = true;

    // 移除旧水印层
    const oldLayer = container.querySelector('.soui-watermark-layer');
    if (oldLayer) oldLayer.remove();

    // 创建新水印层
    const layer = document.createElement('div');
    layer.className = 'soui-watermark-layer';
    const bgStyle = buildBackgroundStyle(base64);
    Object.entries(bgStyle).forEach(([key, value]) => {
      // camelCase → kebab-case
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      layer.style.setProperty(cssKey, String(value));
    });
    container.appendChild(layer);
    watermarkRef.current = layer;

    // 恢复 observer
    isAppendingRef.current = false;
  }, [buildBackgroundStyle]);

  // 图片水印：异步加载后渲染
  useEffect(() => {
    if (!image) return;

    const { canvasWidth, canvasHeight } = calcCanvasSize(width, height, rotate);
    let cancelled = false;

    drawImage(canvasWidth, canvasHeight, drawOpts).then((base64) => {
      if (!cancelled && base64) {
        renderWatermark(base64);
      }
    });

    return () => { cancelled = true; };
  }, [image, width, height, rotate, drawOpts, renderWatermark]);

  // 文本水印：同步渲染
  useEffect(() => {
    if (image) return; // 图片模式由上面的 effect 处理

    const base64 = generateTextBase64(drawOpts);
    renderWatermark(base64);
  }, [image, drawOpts, renderWatermark]);

  // MutationObserver：防止水印被恶意删除
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      // 如果正在执行 DOM 操作，跳过
      if (isAppendingRef.current) return;

      for (const mutation of mutations) {
        // 检查水印层是否被移除
        if (
          mutation.type === 'childList' &&
          mutation.removedNodes.length > 0 &&
          watermarkRef.current &&
          !container.contains(watermarkRef.current)
        ) {
          // 重新渲染水印
          if (image) {
            const { canvasWidth, canvasHeight } = calcCanvasSize(width, height, rotate);
            drawImage(canvasWidth, canvasHeight, drawOpts).then((base64) => {
              if (base64) renderWatermark(base64);
            });
          } else {
            const base64 = generateTextBase64(drawOpts);
            renderWatermark(base64);
          }
          return;
        }

        // 检查水印层样式是否被篡改
        if (
          mutation.type === 'attributes' &&
          mutation.target === watermarkRef.current
        ) {
          // 重新应用样式
          if (image) {
            const { canvasWidth, canvasHeight } = calcCanvasSize(width, height, rotate);
            drawImage(canvasWidth, canvasHeight, drawOpts).then((base64) => {
              if (base64) renderWatermark(base64);
            });
          } else {
            const base64 = generateTextBase64(drawOpts);
            renderWatermark(base64);
          }
          return;
        }
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [drawOpts, image, width, height, rotate, renderWatermark]);

  // 容器样式
  const containerStyle: React.CSSProperties = {
    position: children ? 'relative' : 'fixed',
    top: 0,
    left: 0,
    width: children ? '100%' : '100vw',
    height: children ? '100%' : '100vh',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={classNames('soui-watermark', {
        'soui-watermark-has-children': !!children,
      }, className)}
      style={containerStyle}
    >
      {children}
    </div>
  );
};

export default Watermark;
