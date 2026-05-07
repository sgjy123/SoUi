import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import ReactDOM from "react-dom";
import classNames from "classnames";

import "./style.less";

// ==================== Types ====================

export type TooltipPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

export type TooltipTrigger = "hover" | "click" | "focus" | "contextMenu";

export interface TooltipProps {
  title?: React.ReactNode;

  children?: React.ReactNode;

  placement?: TooltipPlacement;

  trigger?: TooltipTrigger | TooltipTrigger[];

  open?: boolean;

  defaultOpen?: boolean;

  disabled?: boolean;

  fresh?: boolean;

  destroyOnHidden?: boolean;

  autoAdjustOverflow?: boolean;

  arrow?: boolean;

  color?: string;

  zIndex?: number;

  mouseEnterDelay?: number;

  mouseLeaveDelay?: number;

  className?: string;

  style?: React.CSSProperties;

  overlayClassName?: string;

  overlayStyle?: React.CSSProperties;

  overlayInnerStyle?: React.CSSProperties;

  getPopupContainer?: (node: HTMLElement) => HTMLElement;

  onOpenChange?: (open: boolean) => void;
}

// ==================== Constants ====================

const GAP = 8;

// ==================== Utils ====================

const getRect = (el: HTMLElement) => {
  return el.getBoundingClientRect();
};

const keepInViewport = (left: number, top: number, popupRect: DOMRect) => {
  const padding = 4;

  const maxLeft = window.innerWidth - popupRect.width - padding;

  const maxTop = window.innerHeight - popupRect.height - padding;

  return {
    left: Math.max(padding, Math.min(left, maxLeft)),

    top: Math.max(padding, Math.min(top, maxTop)),
  };
};

const calcPosition = (
  placement: TooltipPlacement,
  triggerRect: DOMRect,
  popupRect: DOMRect,
  autoAdjustOverflow: boolean,
) => {
  let top = 0;
  let left = 0;

  switch (placement) {
    case "top":
      top = triggerRect.top - popupRect.height - GAP;

      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;

      break;

    case "topLeft":
      top = triggerRect.top - popupRect.height - GAP;

      left = triggerRect.left;

      break;

    case "topRight":
      top = triggerRect.top - popupRect.height - GAP;

      left = triggerRect.right - popupRect.width;

      break;

    case "bottom":
      top = triggerRect.bottom + GAP;

      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;

      break;

    case "bottomLeft":
      top = triggerRect.bottom + GAP;

      left = triggerRect.left;

      break;

    case "bottomRight":
      top = triggerRect.bottom + GAP;

      left = triggerRect.right - popupRect.width;

      break;

    case "left":
      top = triggerRect.top + (triggerRect.height - popupRect.height) / 2;

      left = triggerRect.left - popupRect.width - GAP;

      break;

    case "leftTop":
      top = triggerRect.top;

      left = triggerRect.left - popupRect.width - GAP;

      break;

    case "leftBottom":
      top = triggerRect.bottom - popupRect.height;

      left = triggerRect.left - popupRect.width - GAP;

      break;

    case "right":
      top = triggerRect.top + (triggerRect.height - popupRect.height) / 2;

      left = triggerRect.right + GAP;

      break;

    case "rightTop":
      top = triggerRect.top;

      left = triggerRect.right + GAP;

      break;

    case "rightBottom":
      top = triggerRect.bottom - popupRect.height;

      left = triggerRect.right + GAP;

      break;
  }

  if (autoAdjustOverflow) {
    return keepInViewport(left, top, popupRect);
  }

  return {
    top,
    left,
  };
};

// ==================== Popup ====================

interface PopupProps {
  visible: boolean;

  title: React.ReactNode;

  placement: TooltipPlacement;

  arrow: boolean;

  color?: string;

  zIndex?: number;

  overlayClassName?: string;

  overlayStyle?: React.CSSProperties;

  overlayInnerStyle?: React.CSSProperties;

  position: {
    top: number;
    left: number;
  };

  popupRef: React.RefObject<HTMLDivElement>;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  visible,
  title,
  placement,
  arrow,
  color,
  zIndex,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  position,
  popupRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      ref={popupRef}
      className={classNames(
        "soui-tooltip",
        `soui-tooltip-${placement}`,
        overlayClassName,
      )}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex,
        visibility: visible ? "visible" : "hidden",
        pointerEvents: visible ? "auto" : "none",
        ...overlayStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {arrow && (
        <div
          className="soui-tooltip-arrow"
          style={{
            background: color,
          }}
        />
      )}

      <div
        className="soui-tooltip-inner"
        style={{
          background: color,
          ...overlayInnerStyle,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// ==================== Main ====================

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = "top",
  trigger = "hover",
  open: controlledOpen,
  defaultOpen = false,
  disabled = false,
  fresh = false,
  destroyOnHidden = true,
  autoAdjustOverflow = true,
  arrow = true,
  color,
  zIndex = 1070,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  className,
  style,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  getPopupContainer,
  onOpenChange,
  ...props
}) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);

  const [position, setPosition] = useState({
    top: -9999,
    left: -9999,
  });

  const triggerRef = useRef<HTMLDivElement>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visible = controlledOpen !== undefined ? controlledOpen : innerOpen;

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const changeVisible = (next: boolean) => {
    if (disabled) {
      return;
    }

    if (controlledOpen === undefined) {
      setInnerOpen(next);
    }

    onOpenChange?.(next);
  };

  const align = useCallback(() => {
    const triggerNode = triggerRef.current;

    const popupNode = popupRef.current;

    if (!triggerNode || !popupNode) {
      return;
    }

    const triggerRect = getRect(triggerNode);

    const popupRect = popupNode.getBoundingClientRect();

    const next = calcPosition(
      placement,
      triggerRect,
      popupRect,
      autoAdjustOverflow,
    );

    setPosition((prev) => {
      if (prev.top === next.top && prev.left === next.left) {
        return prev;
      }

      return next;
    });
  }, [placement, autoAdjustOverflow]);

  useLayoutEffect(() => {
    if (!visible || !title) {
      return;
    }

    align();
  }, [visible, title, align]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        align();
      });
    };

    window.addEventListener("scroll", update, true);

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("scroll", update, true);

      window.removeEventListener("resize", update);
    };
  }, [visible, align]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        changeVisible(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const openTooltip = () => {
    clearTimer();

    timerRef.current = setTimeout(() => {
      changeVisible(true);
    }, mouseEnterDelay * 1000);
  };

  const closeTooltip = () => {
    clearTimer();

    timerRef.current = setTimeout(() => {
      changeVisible(false);
    }, mouseLeaveDelay * 1000);
  };

  const toggleTooltip = () => {
    clearTimer();

    changeVisible(!visible);
  };

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (triggers.includes("hover")) {
    triggerProps.onMouseEnter = openTooltip;

    triggerProps.onMouseLeave = closeTooltip;
  }

  if (triggers.includes("click")) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      toggleTooltip();
    };
  }

  if (triggers.includes("focus")) {
    triggerProps.onFocus = openTooltip;

    triggerProps.onBlur = closeTooltip;
  }

  if (triggers.includes("contextMenu")) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      toggleTooltip();
    };
  }

  const popup =
    visible || !destroyOnHidden ? (
      <Popup
        visible={visible}
        title={fresh ? title : title}
        placement={placement}
        arrow={arrow}
        color={color}
        zIndex={zIndex}
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
        overlayInnerStyle={overlayInnerStyle}
        position={position}
        popupRef={popupRef}
        onMouseEnter={triggers.includes("hover") ? openTooltip : undefined}
        onMouseLeave={triggers.includes("hover") ? closeTooltip : undefined}
      />
    ) : null;

  const container =
    getPopupContainer && triggerRef.current
      ? getPopupContainer(triggerRef.current)
      : document.body;

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames("soui-tooltip-trigger", className)}
        style={style}
        {...triggerProps}
        {...props}
      >
        {children}
      </div>

      {popup && ReactDOM.createPortal(popup, container)}
    </>
  );
};

export default Tooltip;
