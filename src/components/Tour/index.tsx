import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Button from '../Button';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

export type TourPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export type TourType = 'default' | 'primary';

export interface TourStepButtonProps {
  /** 按钮文字 */
  children?: React.ReactNode;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
}

export interface TourStep {
  /** 目标元素（HTMLElement 或返回 HTMLElement 的函数） */
  target?: HTMLElement | (() => HTMLElement);
  /** 标题 */
  title?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 步骤引导图 */
  cover?: React.ReactNode;
  /** 浮层位置 */
  placement?: TourPlacement;
  /** 是否显示遮罩 */
  mask?: boolean | React.CSSProperties;
  /** 是否显示箭头 */
  arrow?: boolean | { pointAtCenter: boolean };
  /** 类型 */
  type?: TourType;
  /** 上一步按钮属性 */
  prevButtonProps?: TourStepButtonProps;
  /** 下一步按钮属性 */
  nextButtonProps?: TourStepButtonProps;
}

export interface TourProps {
  /** 是否显示引导 */
  open: boolean;
  /** 关闭引导回调 */
  onClose?: () => void;
  /** 步骤数据 */
  steps: TourStep[];
  /** 当前步骤（受控） */
  current?: number;
  /** 步骤变化回调 */
  onChange?: (current: number) => void;
  /** 默认位置 */
  placement?: TourPlacement;
  /** 类型 */
  type?: TourType;
  /** 是否显示遮罩 */
  mask?: boolean | React.CSSProperties;
  /** 是否显示箭头 */
  arrow?: boolean | { pointAtCenter: boolean };
  /** 关闭时是否销毁 */
  destroyOnClose?: boolean;
  /** 自定义指示器 */
  indicatorsRender?: (current: number, total: number) => React.ReactNode;
  /** z-index */
  zIndex?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== ConfigProvider DOM Bridge ====================

const CONFIG_PROVIDER_VARS = [
  '--soui-tour-color-bg',
  '--soui-tour-color-text',
  '--soui-tour-color-text-secondary',
  '--soui-tour-font-size',
  '--soui-tour-border-radius',
  '--soui-tour-color-primary',
  '--soui-tour-color-primary-text',
  '--soui-tour-box-shadow',
  '--soui-tour-mask-color',
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-border-radius',
  '--soui-font-size',
  '--soui-text-color',
  '--soui-text-color-secondary',
  '--soui-transition-duration',
  '--soui-transition-timing-function',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  CONFIG_PROVIDER_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

// ==================== Positioning ====================

const GAP = 12;
const PADDING = 6; // mask padding around target

interface Rect {
  width: number;
  height: number;
}

function getRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect();
}

function keepInViewport(left: number, top: number, popup: Rect) {
  const maxLeft = window.innerWidth - popup.width - 4;
  const maxTop = window.innerHeight - popup.height - 4;
  return {
    left: Math.max(4, Math.min(left, maxLeft)),
    top: Math.max(4, Math.min(top, maxTop)),
  };
}

function calcPosition(
  placement: TourPlacement,
  targetRect: DOMRect,
  popupRect: Rect,
) {
  let left = 0;
  let top = 0;

  switch (placement) {
    case 'top':
      left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
      top = targetRect.top - popupRect.height - GAP;
      break;
    case 'topLeft':
      left = targetRect.left;
      top = targetRect.top - popupRect.height - GAP;
      break;
    case 'topRight':
      left = targetRect.right - popupRect.width;
      top = targetRect.top - popupRect.height - GAP;
      break;
    case 'bottom':
      left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
      top = targetRect.bottom + GAP;
      break;
    case 'bottomLeft':
      left = targetRect.left;
      top = targetRect.bottom + GAP;
      break;
    case 'bottomRight':
      left = targetRect.right - popupRect.width;
      top = targetRect.bottom + GAP;
      break;
    case 'left':
      left = targetRect.left - popupRect.width - GAP;
      top = targetRect.top + targetRect.height / 2 - popupRect.height / 2;
      break;
    case 'leftTop':
      left = targetRect.left - popupRect.width - GAP;
      top = targetRect.top;
      break;
    case 'leftBottom':
      left = targetRect.left - popupRect.width - GAP;
      top = targetRect.bottom - popupRect.height;
      break;
    case 'right':
      left = targetRect.right + GAP;
      top = targetRect.top + targetRect.height / 2 - popupRect.height / 2;
      break;
    case 'rightTop':
      left = targetRect.right + GAP;
      top = targetRect.top;
      break;
    case 'rightBottom':
      left = targetRect.right + GAP;
      top = targetRect.bottom - popupRect.height;
      break;
    default:
      left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
      top = targetRect.bottom + GAP;
  }

  return keepInViewport(left, top, popupRect);
}

function getTargetElement(target?: HTMLElement | (() => HTMLElement)): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'function') return target();
  return target;
}

// ==================== Arrow Position ====================

function getArrowPlacement(placement: TourPlacement): 'top' | 'bottom' | 'left' | 'right' {
  if (placement.startsWith('top')) return 'bottom';
  if (placement.startsWith('bottom')) return 'top';
  if (placement.startsWith('left')) return 'right';
  return 'left';
}

// ==================== Component ====================

const Tour: React.FC<TourProps> = ({
  open,
  onClose,
  steps,
  current: controlledCurrent,
  onChange,
  placement: globalPlacement = 'bottom',
  type: globalType = 'default',
  mask: globalMask = true,
  arrow: globalArrow = true,
  destroyOnClose = true,
  indicatorsRender,
  zIndex = 1100,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.Tour || {}) as Record<string, any>;

  const [internalCurrent, setInternalCurrent] = useState(0);
  const currentStep = controlledCurrent !== undefined ? controlledCurrent : internalCurrent;
  const step = steps[currentStep] || {};

  const [pos, setPos] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const targetEl = getTargetElement(step.target);
  const stepPlacement = step.placement || globalPlacement;
  const stepType = step.type || globalType;
  const stepMask = step.mask !== undefined ? step.mask : globalMask;
  const stepArrow = step.arrow !== undefined ? step.arrow : globalArrow;

  // ---- Align ----
  const align = useCallback(() => {
    if (!targetEl || !popupRef.current) {
      // No target → center in viewport
      if (popupRef.current) {
        const rect = popupRef.current.getBoundingClientRect();
        setPos(keepInViewport(
          window.innerWidth / 2 - rect.width / 2,
          window.innerHeight / 2 - rect.height / 2,
          { width: rect.width, height: rect.height },
        ));
      }
      return;
    }
    const targetRect = getRect(targetEl);
    const popupRect = popupRef.current.getBoundingClientRect();
    const { left, top } = calcPosition(stepPlacement, targetRect, {
      width: popupRect.width,
      height: popupRect.height,
    });
    setPos({ top, left });
  }, [targetEl, stepPlacement]);

  useLayoutEffect(() => {
    if (open) align();
  }, [open, align, currentStep]);

  useEffect(() => {
    if (!open) return;

    const handleUpdate = () => {
      rafRef.current = requestAnimationFrame(align);
    };

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
      cancelAnimationFrame(rafRef.current);
    };
  }, [open, align]);

  // ---- Apply ConfigProvider vars ----
  useEffect(() => {
    if (open && popupRef.current) {
      applyConfigProviderVars(popupRef.current);
    }
  }, [open, currentStep]);

  // ---- Reset internal current when open changes ----
  useEffect(() => {
    if (open && controlledCurrent === undefined) {
      setInternalCurrent(0);
    }
  }, [open, controlledCurrent]);

  // ---- Keyboard ----
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // ---- Navigation ----
  const goTo = useCallback(
    (next: number) => {
      if (controlledCurrent === undefined) setInternalCurrent(next);
      onChange?.(next);
    },
    [controlledCurrent, onChange],
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      step.prevButtonProps?.onClick?.(e);
      if (currentStep > 0) goTo(currentStep - 1);
    },
    [currentStep, goTo, step],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      step.nextButtonProps?.onClick?.(e);
      if (currentStep < steps.length - 1) {
        goTo(currentStep + 1);
      } else {
        onClose?.();
      }
    },
    [currentStep, steps.length, goTo, onClose, step],
  );

  // ---- Mask cutout ----
  const maskStyle: React.CSSProperties =
    typeof stepMask === 'object' ? stepMask : {};

  const showMask = stepMask !== false;

  const maskCutout = targetEl
    ? (() => {
        const r = getRect(targetEl);
        return {
          left: r.left - PADDING,
          top: r.top - PADDING,
          width: r.width + PADDING * 2,
          height: r.height + PADDING * 2,
          borderRadius: theme.borderRadius ? `${theme.borderRadius}px` : '6px',
        };
      })()
    : null;

  // ---- Arrow ----
  const showArrow = stepArrow !== false;
  const arrowSide = getArrowPlacement(stepPlacement);

  // ---- Build popup content ----
  if (!open && destroyOnClose) return null;

  // CSS vars for inline injection
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorBg !== undefined) cssVars['--soui-tour-color-bg'] = theme.colorBg;
  if (theme.borderRadius !== undefined) cssVars['--soui-tour-border-radius'] = `${theme.borderRadius}px`;
  if (theme.fontSize !== undefined) cssVars['--soui-tour-font-size'] = `${theme.fontSize}px`;
  if (theme.colorPrimary !== undefined) cssVars['--soui-tour-color-primary'] = theme.colorPrimary;
  if (theme.colorPrimaryText !== undefined) cssVars['--soui-tour-color-primary-text'] = theme.colorPrimaryText;
  if (theme.boxShadow !== undefined) cssVars['--soui-tour-box-shadow'] = theme.boxShadow;
  if (theme.maskColor !== undefined) cssVars['--soui-tour-mask-color'] = theme.maskColor;

  const componentStyle = { ...cssVars, ...style, zIndex } as React.CSSProperties;

  const isPrimary = stepType === 'primary';
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  const totalSteps = steps.length;

  // Indicators
  const indicators = indicatorsRender
    ? indicatorsRender(currentStep, totalSteps)
    : (
      <div className="soui-tour-indicators">
        {steps.map((_, i) => (
          <span
            key={i}
            className={classNames('soui-tour-indicator-dot', {
              'soui-tour-indicator-dot-active': i === currentStep,
            })}
          />
        ))}
      </div>
    );

  const popup = (
    <div
      ref={popupRef}
      className={classNames(
        'soui-tour',
        {
          'soui-tour-primary': isPrimary,
          'soui-tour-hidden': !open,
        },
        className,
      )}
      style={{
        ...componentStyle,
        position: 'fixed',
        top: pos.top,
        left: pos.left,
      }}
    >
      {/* Arrow */}
      {showArrow && (
        <div
          className={classNames('soui-tour-arrow', `soui-tour-arrow-${arrowSide}`)}
        />
      )}

      {/* Cover */}
      {step.cover && <div className="soui-tour-cover">{step.cover}</div>}

      {/* Content */}
      <div className="soui-tour-inner">
        {/* Close button */}
        <button
          className="soui-tour-close"
          onClick={onClose}
          aria-label="关闭"
          type="button"
        >
          <Icon name="Close" size={14} />
        </button>

        {step.title && <div className="soui-tour-title">{step.title}</div>}
        {step.description && (
          <div className="soui-tour-description">{step.description}</div>
        )}

        {/* Footer */}
        <div className="soui-tour-footer">
          {indicators}
          <div className="soui-tour-buttons">
            {!isFirst && (
              <Button
                size="small"
                onClick={handlePrev}
                type={isPrimary ? 'default' : 'default'}
              >
                {step.prevButtonProps?.children || '上一步'}
              </Button>
            )}
            <Button
              size="small"
              type={isPrimary ? 'primary' : 'primary'}
              onClick={handleNext}
            >
              {isLast
                ? (step.nextButtonProps?.children || '完成')
                : (step.nextButtonProps?.children || '下一步')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mask overlay with cutout
  const maskNode = showMask ? (
    <div
      className="soui-tour-mask"
      style={{ zIndex: zIndex - 1, ...maskStyle }}
    >
      {maskCutout && (
        <div
          className="soui-tour-mask-cutout"
          style={{
            position: 'fixed',
            left: maskCutout.left,
            top: maskCutout.top,
            width: maskCutout.width,
            height: maskCutout.height,
            borderRadius: maskCutout.borderRadius,
            boxShadow: `0 0 0 9999px var(--soui-tour-mask-color, rgba(0, 0, 0, 0.45))`,
          }}
        />
      )}
    </div>
  ) : null;

  return ReactDOM.createPortal(
    <>
      {maskNode}
      {popup}
    </>,
    document.body,
  );
};

Tour.displayName = 'Tour';

export default Tour;
