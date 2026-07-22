import React, { useContext, useState, useEffect, useCallback, useRef, createContext } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

export interface ImagePreviewProps {
  /** 受控显示状态 */
  visible?: boolean;
  /** 默认显示状态 */
  defaultVisible?: boolean;
  /** 显示/隐藏回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 自定义预览图片 */
  src?: string;
  /** 遮罩内容 */
  mask?: React.ReactNode | false;
  /** 遮罩类名 */
  maskClassName?: string;
  /** 关闭图标 */
  closeIcon?: React.ReactNode;
}

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'preview'> {
  /** 图片地址 */
  src?: string;
  /** 替代文本 */
  alt?: string;
  /** 加载失败时的占位图 */
  fallback?: string;
  /** 加载中占位 */
  placeholder?: React.ReactNode;
  /** 是否支持预览，false 关闭 */
  preview?: boolean | ImagePreviewProps;
}

export interface PreviewGroupProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 预览配置 */
  preview?: Omit<ImagePreviewProps, 'src'>;
}

// ==================== Context ====================

interface PreviewGroupCtx {
  register: (id: string, src: string, alt?: string) => () => void;
  openPreview: (id: string) => void;
}

const PreviewGroupContext = createContext<PreviewGroupCtx | null>(null);

// ==================== 预览弹层 ====================

interface PreviewModalProps {
  visible: boolean;
  images: Array<{ src: string; alt?: string }>;
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeIcon?: React.ReactNode;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  visible,
  images,
  current,
  onClose,
  onPrev,
  onNext,
  closeIcon,
}) => {
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose, onPrev, onNext]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible || images.length === 0) return null;

  const img = images[current];
  const multi = images.length > 1;

  return ReactDOM.createPortal(
    <div className="soui-image-preview-mask" onClick={onClose}>
      <div className="soui-image-preview-wrap" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="soui-image-preview-close"
          aria-label="关闭"
          onClick={onClose}
        >
          {closeIcon ?? <Icon name="Close" size={18} />}
        </button>

        {multi && (
          <button
            type="button"
            className="soui-image-preview-nav soui-image-preview-nav-prev"
            aria-label="上一张"
            onClick={onPrev}
          >
            <Icon name="Left" size={20} />
          </button>
        )}

        <img
          className="soui-image-preview-img"
          src={img.src}
          alt={img.alt}
          onClick={(e) => e.stopPropagation()}
        />

        {multi && (
          <button
            type="button"
            className="soui-image-preview-nav soui-image-preview-nav-next"
            aria-label="下一张"
            onClick={onNext}
          >
            <Icon name="Right" size={20} />
          </button>
        )}

        {multi && (
          <div className="soui-image-preview-indicator">
            {current + 1} / {images.length}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// ==================== Image ====================

const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  fallback,
  placeholder,
  preview = true,
  className,
  style,
  width,
  height,
  onError: onErrorProp,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
    setErrored(false);
  }, [src]);

  const onLoad = () => setLoaded(true);
  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onErrorProp?.(e);
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    } else {
      setErrored(true);
    }
  };

  const previewConfig: ImagePreviewProps | null =
    preview === false ? null : preview === true ? {} : preview;
  const groupCtx = useContext(PreviewGroupContext);

  // 注册到预览组
  const idRef = useRef(`img-${Math.random().toString(36).slice(2, 9)}`);
  useEffect(() => {
    if (!groupCtx || !src) return undefined;
    return groupCtx.register(idRef.current, previewConfig?.src || src, alt);
  }, [groupCtx, src, alt, previewConfig?.src]);

  const canPreview = !!src && previewConfig !== null && !errored;

  // 独立预览（不在 PreviewGroup 中）
  const [selfVisible, setSelfVisible] = useState(false);
  const openPreview = useCallback(() => {
    if (!canPreview) return;
    if (groupCtx) {
      groupCtx.openPreview(idRef.current);
    } else {
      const v = previewConfig?.visible !== undefined ? undefined : true;
      if (v !== undefined) setSelfVisible(true);
      previewConfig?.onVisibleChange?.(true);
    }
  }, [canPreview, groupCtx, previewConfig]);

  const wrapperStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(
        'soui-image',
        { 'soui-image-preview-enabled': canPreview },
        className
      )}
      style={wrapperStyle}
    >
      {!loaded && !errored && placeholder && (
        <div className="soui-image-placeholder">{placeholder}</div>
      )}
      <img
        className={classNames('soui-image-img', {
          'soui-image-img-hidden': !loaded && !errored,
        })}
        src={imgSrc}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...rest}
      />
      {canPreview && (
        <div
          className={classNames('soui-image-mask', previewConfig?.maskClassName)}
          onClick={openPreview}
          role="button"
          aria-label="预览图片"
        >
          {previewConfig?.mask === false ? null : (
            previewConfig?.mask ?? (
              <span className="soui-image-mask-default">
                <Icon name="PreviewOpen" size={16} color="default" /> 预览
              </span>
            )
          )}
        </div>
      )}

      {/* 独立预览弹层 */}
      {!groupCtx && (
        <PreviewModal
          visible={selfVisible}
          images={src ? [{ src: previewConfig?.src || src, alt }] : []}
          current={0}
          onClose={() => { setSelfVisible(false); previewConfig?.onVisibleChange?.(false); }}
          onPrev={() => {}}
          onNext={() => {}}
          closeIcon={previewConfig?.closeIcon}
        />
      )}
    </div>
  );
};

// ==================== PreviewGroup ====================

const PreviewGroup: React.FC<PreviewGroupProps> = ({ children, preview }) => {
  const [images, setImages] = useState<Array<{ id: string; src: string; alt?: string }>>([]);
  const [visible, setVisible] = useState(preview?.defaultVisible ?? false);
  const [current, setCurrent] = useState(0);

  const controlledVisible = preview?.visible;
  const isControlled = controlledVisible !== undefined;
  const mergedVisible = isControlled ? controlledVisible : visible;

  const register = useCallback((id: string, src: string, alt?: string) => {
    setImages((prev) => {
      if (prev.some((p) => p.id === id)) {
        return prev.map((p) => (p.id === id ? { id, src, alt } : p));
      }
      return [...prev, { id, src, alt }];
    });
    return () => {
      setImages((prev) => prev.filter((p) => p.id !== id));
    };
  }, []);

  const openPreview = useCallback((id: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx >= 0) setCurrent(idx);
      return prev;
    });
    if (!isControlled) setVisible(true);
    preview?.onVisibleChange?.(true);
  }, [isControlled, preview]);

  const close = useCallback(() => {
    if (!isControlled) setVisible(false);
    preview?.onVisibleChange?.(false);
  }, [isControlled, preview]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  return (
    <PreviewGroupContext.Provider value={{ register, openPreview }}>
      {children}
      <PreviewModal
        visible={mergedVisible}
        images={images}
        current={current}
        onClose={close}
        onPrev={prev}
        onNext={next}
        closeIcon={preview?.closeIcon}
      />
    </PreviewGroupContext.Provider>
  );
};

// ==================== Export ====================

interface ImageComponentType extends React.FC<ImageProps> {
  PreviewGroup: typeof PreviewGroup;
}

const Image = ImageComponent as ImageComponentType;
Image.PreviewGroup = PreviewGroup;

export default Image;
