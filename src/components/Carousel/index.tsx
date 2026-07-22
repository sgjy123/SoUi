import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 切换动画效果 */
export type CarouselEffect = 'scrollx' | 'fade';

/** 指示点位置 */
export type CarouselDotPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换间隔（毫秒） */
  autoplaySpeed?: number;
  /** 是否显示指示点 */
  dots?: boolean;
  /** 指示点位置 */
  dotPosition?: CarouselDotPosition;
  /** 切换动画效果 */
  effect?: CarouselEffect;
  /** 是否垂直方向 */
  vertical?: boolean;
  /** 是否无限循环 */
  infinite?: boolean;
  /** 切换动画时长（毫秒） */
  speed?: number;
  /** 是否显示切换箭头 */
  arrows?: boolean;
  /** 缓动函数 */
  easing?: string;
  /** 初始展示的幻灯片索引 */
  initialSlide?: number;
  /** 切换动画结束后回调，参数为当前索引 */
  afterChange?: (current: number) => void;
  /** 切换动画开始前回调，参数为当前索引和目标索引 */
  beforeChange?: (current: number, next: number) => void;
  /** 幻灯片内容 */
  children?: React.ReactNode;
}

/** Carousel 实例方法 */
export interface CarouselRef {
  /** 切换到指定索引 */
  goTo: (slide: number, dontAnimate?: boolean) => void;
  /** 切换到下一张 */
  next: () => void;
  /** 切换到上一张 */
  prev: () => void;
}

// ==================== Component ====================

const Carousel = forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const {
    autoplay = false,
    autoplaySpeed = 3000,
    dots = true,
    dotPosition = 'bottom',
    effect = 'scrollx',
    vertical = false,
    infinite = true,
    speed = 500,
    arrows = false,
    easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    initialSlide = 0,
    afterChange,
    beforeChange,
    className,
    style,
    children,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;

  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Carousel || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-carousel-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.dotSize !== undefined) {
    cssVars['--soui-carousel-dot-size'] = `${componentTheme.dotSize}px`;
  }
  if (componentTheme.arrowSize !== undefined) {
    cssVars['--soui-carousel-arrow-size'] = `${componentTheme.arrowSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const slides = React.Children.toArray(children);
  const count = slides.length;

  const isFade = effect === 'fade';
  // 仅在 scrollx + 无限循环 + 多于一张时启用首尾克隆
  const cloneEnabled = infinite && !isFade && count > 1;

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 轨道索引：cloneEnabled 时渲染 [last, ...slides, first]，索引范围 0..count+1
  const [index, setIndex] = useState(() => {
    const base = count > 0 ? ((initialSlide % count) + count) % count : 0;
    return cloneEnabled ? base + 1 : base;
  });
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // 当前真实幻灯片索引（0..count-1）
  const realIndex =
    count > 0
      ? cloneEnabled
        ? ((index - 1) % count + count) % count
        : (index % count + count) % count
      : 0;

  // ==================== 尺寸测量 ====================
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.offsetWidth;
      // 高度取第一个幻灯片的自然高度（垂直/渐显模式用于约束视口）
      const firstSlide = el.querySelector('.soui-carousel-slide') as HTMLElement | null;
      const height = firstSlide ? firstSlide.offsetHeight : el.offsetHeight;
      setSize({ width, height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // ==================== 导航 ====================
  const stepTo = useCallback(
    (target: number, animate = true) => {
      if (count <= 0) return;
      const nextReal = cloneEnabled
        ? ((target - 1) % count + count) % count
        : ((target % count) + count) % count;
      beforeChange?.(realIndex, nextReal);
      setTransitionEnabled(animate);
      setIndex(target);
    },
    [count, cloneEnabled, beforeChange, realIndex]
  );

  const next = useCallback(() => {
    if (count <= 1) return;
    if (cloneEnabled) {
      stepTo(index + 1);
    } else if (isFade && infinite) {
      stepTo((index + 1) % count);
    } else {
      stepTo(Math.min(index + 1, count - 1));
    }
  }, [count, cloneEnabled, isFade, infinite, index, stepTo]);

  const prev = useCallback(() => {
    if (count <= 1) return;
    if (cloneEnabled) {
      stepTo(index - 1);
    } else if (isFade && infinite) {
      stepTo((index - 1 + count) % count);
    } else {
      stepTo(Math.max(index - 1, 0));
    }
  }, [count, cloneEnabled, isFade, infinite, index, stepTo]);

  const goTo = useCallback(
    (slide: number, dontAnimate = false) => {
      if (count <= 1) return;
      const s = ((slide % count) + count) % count;
      stepTo(cloneEnabled ? s + 1 : s, !dontAnimate);
    },
    [count, cloneEnabled, stepTo]
  );

  useImperativeHandle(ref, () => ({ goTo, next, prev }), [goTo, next, prev]);

  // 保持最新的 next 引用供自动播放使用
  const nextRef = useRef(next);
  nextRef.current = next;

  // ==================== 过渡结束（处理克隆跳转） ====================
  const handleTransitionEnd = () => {
    if (cloneEnabled) {
      if (index === 0) {
        setTransitionEnabled(false);
        setIndex(count);
        afterChange?.(realIndex);
        return;
      }
      if (index === count + 1) {
        setTransitionEnabled(false);
        setIndex(1);
        afterChange?.(realIndex);
        return;
      }
    }
    afterChange?.(realIndex);
  };

  // ==================== 自动播放 ====================
  const timerRef = useRef<number | undefined>(undefined);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (!autoplay || count <= 1) return;
    timerRef.current = window.setInterval(() => {
      nextRef.current();
    }, autoplaySpeed);
  }, [autoplay, autoplaySpeed, count, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  // ==================== 触摸滑动 ====================
  const dragState = useRef({ dragging: false, start: 0, delta: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFade || count <= 1) return;
    const t = e.touches[0];
    dragState.current = { dragging: true, start: vertical ? t.clientY : t.clientX, delta: 0 };
    setTransitionEnabled(false);
    stopAutoplay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.current.dragging) return;
    const t = e.touches[0];
    const current = vertical ? t.clientY : t.clientX;
    const delta = current - dragState.current.start;
    dragState.current.delta = delta;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const delta = dragState.current.delta;
    const threshold = (vertical ? size.height : size.width) * 0.2;
    setDragOffset(0);
    if (delta < -threshold) {
      next();
    } else if (delta > threshold) {
      prev();
    } else {
      setTransitionEnabled(true);
    }
    startAutoplay();
  };

  // ==================== 渲染 ====================
  if (count === 0) {
    return null;
  }

  // 渲染的幻灯片列表（scrollx 无限循环时首尾克隆）
  const renderedSlides = cloneEnabled
    ? [slides[count - 1], ...slides, slides[0]]
    : slides;
  const renderedCount = renderedSlides.length;

  const isVerticalLayout = vertical;

  // 轨道样式
  let trackStyle: React.CSSProperties;
  if (isFade) {
    trackStyle = { position: 'relative', width: '100%', height: '100%' };
  } else if (isVerticalLayout) {
    trackStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: size.height * renderedCount,
      transform: `translateY(${-index * size.height + dragOffset}px)`,
      transition: transitionEnabled ? `transform ${speed}ms ${easing}` : 'none',
    };
  } else {
    trackStyle = {
      display: 'flex',
      flexDirection: 'row',
      width: size.width * renderedCount,
      transform: `translateX(${-index * size.width + dragOffset}px)`,
      transition: transitionEnabled ? `transform ${speed}ms ${easing}` : 'none',
    };
  }

  const arrowPrevIcon = vertical ? 'Up' : 'Left';
  const arrowNextIcon = vertical ? 'Down' : 'Right';

  // 视口样式：渐显/垂直模式需约束高度为单张幻灯片高度
  const viewportStyle: React.CSSProperties =
    isFade || isVerticalLayout ? { height: size.height } : {};

  return (
    <div
      className={classNames(
        'soui-carousel',
        {
          'soui-carousel-vertical': vertical,
          'soui-carousel-fade': isFade,
        },
        className
      )}
      style={componentStyle}
      onMouseEnter={(e) => {
        stopAutoplay();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        startAutoplay();
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      <div
        className="soui-carousel-viewport"
        ref={containerRef}
        style={viewportStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="soui-carousel-track" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
          {renderedSlides.map((slide, i) => {
            if (isFade) {
              const active = i === index;
              return (
                <div
                  key={i}
                  className={classNames('soui-carousel-slide', 'soui-carousel-slide-fade', {
                    'soui-carousel-slide-active': active,
                  })}
                  style={{
                    opacity: active ? 1 : 0,
                    zIndex: active ? 1 : 0,
                    transition: `opacity ${speed}ms ${easing}`,
                  }}
                  aria-hidden={!active}
                >
                  {slide}
                </div>
              );
            }

            const slideStyle: React.CSSProperties = isVerticalLayout
              ? { width: '100%' }
              : { width: size.width };

            return (
              <div key={i} className="soui-carousel-slide" style={slideStyle}>
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {/* 指示点 */}
      {dots && count > 1 && (
        <ul className={classNames('soui-carousel-dots', `soui-carousel-dots-${dotPosition}`)}>
          {slides.map((_, i) => (
            <li
              key={i}
              className={classNames('soui-carousel-dot-item', {
                'soui-carousel-dot-active': i === realIndex,
              })}
            >
              <button
                type="button"
                className="soui-carousel-dot"
                aria-label={`切换到第 ${i + 1} 张`}
                onClick={() => goTo(i)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* 切换箭头 */}
      {arrows && count > 1 && (
        <>
          <button
            type="button"
            className={classNames('soui-carousel-arrow', 'soui-carousel-arrow-prev', {
              'soui-carousel-arrow-disabled': !infinite && realIndex === 0,
            })}
            aria-label="上一张"
            disabled={!infinite && realIndex === 0}
            onClick={prev}
          >
            <Icon name={arrowPrevIcon} size={componentTheme.arrowSize ?? 16} color="default" />
          </button>
          <button
            type="button"
            className={classNames('soui-carousel-arrow', 'soui-carousel-arrow-next', {
              'soui-carousel-arrow-disabled': !infinite && realIndex === count - 1,
            })}
            aria-label="下一张"
            disabled={!infinite && realIndex === count - 1}
            onClick={next}
          >
            <Icon name={arrowNextIcon} size={componentTheme.arrowSize ?? 16} color="default" />
          </button>
        </>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
