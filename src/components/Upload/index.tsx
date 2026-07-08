import React, { useState, useRef, useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
import type { ComponentThemeConfig } from '../ConfigProvider/types';
import './style.less';

// ==================== Types ====================

export type UploadFileStatus = 'uploading' | 'done' | 'error' | 'removed';

export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface UploadFile {
  /** 唯一标识 */
  uid: string;
  /** 文件名 */
  name: string;
  /** 上传状态 */
  status?: UploadFileStatus;
  /** 上传进度百分比 (0-100) */
  percent?: number;
  /** 文件 url */
  url?: string;
  /** 文件预览 url（图片） */
  thumbUrl?: string;
  /** 服务器响应 */
  response?: any;
  /** 错误信息 */
  error?: any;
  /** 文件类型 */
  type?: string;
  /** 文件大小（字节） */
  size?: number;
  /** 原始 File 对象 */
  originFileObj?: File;
  /** 上次修改时间 */
  lastModified?: number;
  /** 预览地址（picture-card 用） */
  preview?: string;
}

export type UploadChangeParam = {
  file: UploadFile;
  fileList: UploadFile[];
};

export interface UploadRequestOption {
  file: File;
  filename: string;
  action?: string;
  method?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  withCredentials?: boolean;
  onProgress: (percent: number) => void;
  onSuccess: (response: any) => void;
  onError: (error: Error) => void;
}

export type RcCustomRequestOptions = UploadRequestOption;

export interface UploadProps {
  /** 上传地址 */
  action?: string;
  /** 上传方法 */
  method?: string;
  /** 发到后台的文件参数名 */
  name?: string;
  /** 额外参数 */
  data?: Record<string, any> | ((file: UploadFile) => Record<string, any>);
  /** 请求头 */
  headers?: Record<string, string>;
  /** 是否携带 cookie */
  withCredentials?: boolean;
  /** 默认文件列表 */
  defaultFileList?: UploadFile[];
  /** 受控文件列表 */
  fileList?: UploadFile[];
  /** 文件列表变化回调 */
  onChange?: (info: UploadChangeParam) => void;
  /** 移除文件回调（返回 false 阻止移除） */
  onRemove?: (file: UploadFile) => boolean | void | Promise<boolean | void>;
  /** 上传前回调（返回 false 阻止上传，返回 Promise 可异步处理文件） */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<File | boolean>;
  /** 自定义上传请求 */
  customRequest?: (options: UploadRequestOption) => void | { abort: () => void };
  /** 是否多选 */
  multiple?: boolean;
  /** 接受的文件类型（同 input accept） */
  accept?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最大上传文件数量 */
  maxCount?: number;
  /** 是否展示上传列表 */
  showUploadList?: boolean | { showRemoveIcon?: boolean; showPreviewIcon?: boolean };
  /** 文件列表类型 */
  listType?: UploadListType;
  /** 是否支持拖拽上传 */
  draggable?: boolean;
  /** 是否手动上传（不自动上传，需手动调用） */
  manualUpload?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 预览文件回调 */
  onPreview?: (file: UploadFile) => void;
  /** 文件下载回调 */
  onDownload?: (file: UploadFile) => void;
}

// ==================== Utils ====================

let uidCounter = 0;
function getUid(): string {
  uidCounter += 1;
  return `soui-upload-${Date.now()}-${uidCounter}`;
}

function toUploadFile(file: File): UploadFile {
  return {
    uid: getUid(),
    name: file.name,
    size: file.size,
    type: file.type,
    originFileObj: file,
    lastModified: file.lastModified,
    status: 'uploading',
    percent: 0,
  };
}

function isImageUrl(file: UploadFile): boolean {
  if (file.type && file.type.startsWith('image/')) return true;
  if (file.thumbUrl) return true;
  if (file.url) {
    // Strip query string and fragment before checking extension
    const cleanUrl = file.url.split('?')[0].split('#')[0];
    if (/\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(cleanUrl)) return true;
  }
  return false;
}

function getFileThumbnail(file: UploadFile): string | undefined {
  return file.thumbUrl || (isImageUrl(file) ? file.url : undefined);
}

// ==================== Default XHR Request ====================

function defaultRequest(options: UploadRequestOption): { abort: () => void } {
  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      options.onProgress(percent);
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response: any;
      try {
        response = JSON.parse(xhr.responseText);
      } catch {
        response = xhr.responseText;
      }
      options.onSuccess(response);
    } else {
      options.onError(new Error(`Upload failed with status ${xhr.status}`));
    }
  });

  xhr.addEventListener('error', () => {
    options.onError(new Error('Upload failed'));
  });

  const formData = new FormData();
  formData.append(options.filename || 'file', options.file);

  if (options.data) {
    Object.entries(options.data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  }

  xhr.open(options.method || 'POST', options.action || '', true);

  if (options.withCredentials) {
    xhr.withCredentials = true;
  }

  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
  }

  xhr.send(formData);

  return {
    abort: () => xhr.abort(),
  };
}

// ==================== UploadList ====================

interface UploadListProps {
  listType: UploadListType;
  items: UploadFile[];
  onRemove: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
  showRemoveIcon: boolean;
  showPreviewIcon: boolean;
  disabled?: boolean;
}

const UploadList: React.FC<UploadListProps> = ({
  listType,
  items,
  onRemove,
  onPreview,
  showRemoveIcon,
  showPreviewIcon,
  disabled,
}) => {
  if (items.length === 0) return null;

  if (listType === 'picture-card') {
    return (
      <div className="soui-upload-list soui-upload-list-picture-card">
        {items.map((file) => {
          const thumbnail = getFileThumbnail(file);
          return (
            <div
              key={file.uid}
              className={classNames('soui-upload-list-item', {
                [`soui-upload-list-item-${file.status}`]: file.status,
              })}
            >
              <div className="soui-upload-list-item-thumbnail">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={file.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.soui-upload-list-item-fallback-icon')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'soui-upload-list-item-fallback-icon';
                        fallback.innerHTML = '<span class="soui-icon soui-icon-default"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M8 44h32V15L29 4H8v40z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M28 4v12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
                        parent.insertBefore(fallback, target);
                      }
                    }}
                  />
                ) : (
                  <Icon name="FileEditing" size={32} color="default" />
                )}
                {file.status === 'uploading' && (
                  <div className="soui-upload-list-item-progress">
                    <div
                      className="soui-upload-list-item-progress-bar"
                      style={{ width: `${file.percent || 0}%` }}
                    />
                  </div>
                )}
                {file.status === 'error' && (
                  <div className="soui-upload-list-item-error-overlay">
                    <Icon name="Close" size={16} />
                  </div>
                )}
              </div>
              <div className="soui-upload-list-item-name" title={file.name}>
                {file.name}
              </div>
              <div className="soui-upload-list-item-actions">
                {showPreviewIcon && thumbnail && (
                  <span
                    className="soui-upload-list-item-action"
                    onClick={() => onPreview?.(file)}
                    role="button"
                    aria-label="预览"
                  >
                    <Icon name="PreviewOpen" size={16} />
                  </span>
                )}
                {showRemoveIcon && !disabled && (
                  <span
                    className="soui-upload-list-item-action"
                    onClick={() => onRemove(file)}
                    role="button"
                    aria-label="删除"
                  >
                    <Icon name="Delete" size={16} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // text / picture
  return (
    <div className={classNames('soui-upload-list', `soui-upload-list-${listType}`)}>
      {items.map((file) => {
        const thumbnail = listType === 'picture' ? getFileThumbnail(file) : undefined;
        return (
          <div
            key={file.uid}
            className={classNames('soui-upload-list-item', {
              [`soui-upload-list-item-${file.status}`]: file.status,
            })}
          >
            {thumbnail && (
              <div className="soui-upload-list-item-thumbnail">
                <img
                  src={thumbnail}
                  alt={file.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.soui-upload-list-item-fallback-icon')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'soui-upload-list-item-fallback-icon';
                      fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#999;';
                      fallback.innerHTML = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M8 44h32V15L29 4H8v40z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M28 4v12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                      parent.insertBefore(fallback, target);
                    }
                  }}
                />
              </div>
            )}
            {!thumbnail && listType === 'text' && (
              <span className="soui-upload-list-item-icon">
                <Icon name="FileEditing" size={16} color="default" />
              </span>
            )}
            {!thumbnail && listType === 'picture' && (
              <div className="soui-upload-list-item-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                <Icon name="FileEditing" size={20} color="default" />
              </div>
            )}
            <span
              className="soui-upload-list-item-name"
              title={file.name}
              onClick={() => {
                if (file.url) window.open(file.url, '_blank');
              }}
            >
              {file.name}
            </span>
            {file.status === 'uploading' && (
              <div className="soui-upload-list-item-progress">
                <div
                  className="soui-upload-list-item-progress-bar"
                  style={{ width: `${file.percent || 0}%` }}
                />
              </div>
            )}
            <span className="soui-upload-list-item-actions">
              {showPreviewIcon && thumbnail && (
                <span
                  className="soui-upload-list-item-action"
                  onClick={() => onPreview?.(file)}
                  role="button"
                  aria-label="预览"
                >
                  <Icon name="PreviewOpen" size={14} />
                </span>
              )}
              {showRemoveIcon && !disabled && (
                <span
                  className="soui-upload-list-item-action"
                  onClick={() => onRemove(file)}
                  role="button"
                  aria-label="删除"
                >
                  <Icon name="Close" size={14} />
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ==================== Dragger ====================

interface DraggerProps extends UploadProps {
  children?: React.ReactNode;
}

// ==================== Upload Component ====================

const Upload: React.FC<UploadProps> & { Dragger: React.FC<DraggerProps> } = ({
  action,
  method = 'POST',
  name: fileName = 'file',
  data,
  headers,
  withCredentials = false,
  defaultFileList,
  fileList: controlledFileList,
  onChange,
  onRemove,
  beforeUpload,
  customRequest,
  multiple = false,
  accept,
  disabled = false,
  maxCount,
  showUploadList = true,
  listType = 'text',
  draggable = false,
  manualUpload = false,
  children,
  className,
  style,
  onPreview,
  onDownload,
}) => {
  const context = useContext(ConfigContext);
  const uploadTheme = (context?.components?.Upload || {}) as ComponentThemeConfig['Upload'];

  const [innerFileList, setInnerFileList] = useState<UploadFile[]>(defaultFileList || []);
  const fileList = controlledFileList !== undefined ? controlledFileList : innerFileList;
  const fileListRef = useRef(fileList);
  fileListRef.current = fileList;

  const inputRef = useRef<HTMLInputElement>(null);
  const requestsRef = useRef<Record<string, { abort: () => void }>>({});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(requestsRef.current).forEach((req) => {
        try { req.abort(); } catch { /* ignore */ }
      });
    };
  }, []);

  const updateFileList = useCallback(
    (updater: (prev: UploadFile[]) => UploadFile[], changedFile: UploadFile) => {
      const currentList = fileListRef.current;
      const next = updater(currentList);
      fileListRef.current = next;
      setInnerFileList(next);
      onChange?.({ file: changedFile, fileList: next });
    },
    [onChange],
  );

  const uploadFile = useCallback(
    (file: UploadFile) => {
      const originFile = file.originFileObj;
      if (!originFile) return;

      const reqOptions: UploadRequestOption = {
        file: originFile,
        filename: fileName,
        action,
        method,
        headers,
        data: typeof data === 'function' ? data(file) : data,
        withCredentials,
        onProgress: (percent: number) => {
          const updated: UploadFile = { ...file, percent, status: 'uploading' };
          updateFileList(
            (prev) => prev.map((f) => (f.uid === file.uid ? updated : f)),
            updated,
          );
        },
        onSuccess: (response: any) => {
          const updated: UploadFile = { ...file, status: 'done', percent: 100, response };
          delete requestsRef.current[file.uid];
          updateFileList(
            (prev) => prev.map((f) => (f.uid === file.uid ? updated : f)),
            updated,
          );
        },
        onError: (error: Error) => {
          const updated: UploadFile = { ...file, status: 'error', error };
          delete requestsRef.current[file.uid];
          updateFileList(
            (prev) => prev.map((f) => (f.uid === file.uid ? updated : f)),
            updated,
          );
        },
      };

      const request = customRequest ? customRequest(reqOptions) : defaultRequest(reqOptions);
      if (request) {
        requestsRef.current[file.uid] = request;
      }
    },
    [action, method, fileName, data, headers, withCredentials, customRequest, updateFileList],
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      let filesToUpload = fileArray;

      // maxCount check
      if (maxCount) {
        const remaining = maxCount - fileListRef.current.length;
        if (remaining <= 0) return;
        filesToUpload = fileArray.slice(0, remaining);
      }

      const uploadFiles: UploadFile[] = [];
      for (const f of filesToUpload) {
        if (beforeUpload) {
          try {
            const result = await beforeUpload(f, filesToUpload);
            if (result === false) continue;
            // If result is a File, use it
            const fileToUse = result instanceof File ? result : f;
            uploadFiles.push(toUploadFile(fileToUse));
          } catch {
            // Promise rejected, skip this file
          }
        } else {
          uploadFiles.push(toUploadFile(f));
        }
      }

      if (uploadFiles.length === 0) return;

      updateFileList((prev) => [...prev, ...uploadFiles], uploadFiles[uploadFiles.length - 1]);

      if (!manualUpload) {
        uploadFiles.forEach((f) => uploadFile(f));
      }
    },
    [maxCount, beforeUpload, manualUpload, uploadFile, updateFileList],
  );

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input value so the same file can be selected again
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = useCallback(
    async (file: UploadFile) => {
      if (onRemove) {
        const result = await onRemove(file);
        if (result === false) return;
      }

      // Abort upload if in progress
      if (requestsRef.current[file.uid]) {
        try { requestsRef.current[file.uid].abort(); } catch { /* ignore */ }
        delete requestsRef.current[file.uid];
      }

      updateFileList(
        (prev) => prev.filter((f) => f.uid !== file.uid),
        { ...file, status: 'removed' },
      );
    },
    [onRemove, updateFileList],
  );

  // CSS variables from theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (uploadTheme?.borderRadius !== undefined) {
    cssVars['--soui-upload-border-radius'] = `${uploadTheme.borderRadius}px`;
  }
  if (uploadTheme?.colorPrimary !== undefined) {
    cssVars['--soui-upload-color-primary'] = uploadTheme.colorPrimary;
  }
  if (uploadTheme?.colorBorder !== undefined) {
    cssVars['--soui-upload-color-border'] = uploadTheme.colorBorder;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // Show upload list config
  const showList = typeof showUploadList === 'boolean' ? showUploadList : true;
  const showRemoveIcon = typeof showUploadList === 'object' ? showUploadList.showRemoveIcon !== false : true;
  const showPreviewIcon = typeof showUploadList === 'object' ? showUploadList.showPreviewIcon !== false : true;

  // Filter removed files for display
  const displayList = fileList.filter((f) => f.status !== 'removed');

  const isDragger = draggable;
  const isPictureCard = listType === 'picture-card';

  const triggerNode = isDragger ? (
    <div
      className={classNames('soui-upload-dragger', {
        'soui-upload-dragger-disabled': disabled,
      })}
    >
      {children || (
        <>
          <Icon name="Upload" size={40} color="default" />
          <p className="soui-upload-dragger-text">点击或拖拽文件到此区域上传</p>
          <p className="soui-upload-dragger-hint">支持单个或批量上传</p>
        </>
      )}
    </div>
  ) : (
    <div
      className="soui-upload-trigger"
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children || (
        <button className="soui-upload-btn" disabled={disabled} type="button">
          <Icon name="Upload" size={16} />
          <span>上传文件</span>
        </button>
      )}
    </div>
  );

  // Dragger event handlers
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dragCounterRef.current = 0;

    if (disabled) return;

    let files = Array.from(e.dataTransfer.files);
    // Filter by accept attribute
    if (accept) {
      const acceptTypes = accept.split(',').map((t) => t.trim().toLowerCase());
      files = files.filter((file) => {
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();
        return acceptTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileName.endsWith(type);
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return fileType === type;
        });
      });
    }
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  // Picture-card: show trigger inline among items
  if (isPictureCard) {
    const showTrigger = !maxCount || displayList.length < maxCount;
    return (
      <div
        className={classNames('soui-upload', 'soui-upload-picture-card', className)}
        style={componentStyle}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        {showList && displayList.map((file) => {
          const thumbnail = getFileThumbnail(file);
          return (
            <div
              key={file.uid}
              className={classNames('soui-upload-list-item', {
                [`soui-upload-list-item-${file.status}`]: file.status,
              })}
            >
              <div className="soui-upload-list-item-thumbnail">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={file.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.soui-upload-list-item-fallback-icon')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'soui-upload-list-item-fallback-icon';
                        fallback.innerHTML = '<span class="soui-icon soui-icon-default"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M8 44h32V15L29 4H8v40z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M28 4v12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
                        parent.insertBefore(fallback, target);
                      }
                    }}
                  />
                ) : (
                  <Icon name="FileEditing" size={32} color="default" />
                )}
                {file.status === 'uploading' && (
                  <div className="soui-upload-list-item-progress">
                    <div
                      className="soui-upload-list-item-progress-bar"
                      style={{ width: `${file.percent || 0}%` }}
                    />
                  </div>
                )}
                {file.status === 'error' && (
                  <div className="soui-upload-list-item-error-overlay">
                    <Icon name="Close" size={16} />
                  </div>
                )}
              </div>
              <div className="soui-upload-list-item-name" title={file.name}>
                {file.name}
              </div>
              <div className="soui-upload-list-item-actions">
                {showPreviewIcon && thumbnail && (
                  <span
                    className="soui-upload-list-item-action"
                    onClick={() => onPreview?.(file)}
                    role="button"
                    aria-label="预览"
                  >
                    <Icon name="PreviewOpen" size={16} />
                  </span>
                )}
                {showRemoveIcon && !disabled && (
                  <span
                    className="soui-upload-list-item-action"
                    onClick={() => handleRemove(file)}
                    role="button"
                    aria-label="删除"
                  >
                    <Icon name="Delete" size={16} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {showTrigger && (
          <div
            className={classNames('soui-upload-select', 'soui-upload-select-picture-card', {
              'soui-upload-disabled': disabled,
            })}
            onClick={handleClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            {children || (
              <>
                <Icon name="Plus" size={24} color="default" />
                <div className="soui-upload-select-text">上传</div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // Dragger mode
  if (isDragger) {
    return (
      <div
        className={classNames('soui-upload', 'soui-upload-drag', className, {
          'soui-upload-drag-over': isDragOver,
          'soui-upload-disabled': disabled,
        })}
        style={componentStyle}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {triggerNode}
        </div>
        {showList && (
          <UploadList
            listType={listType}
            items={displayList}
            onRemove={handleRemove}
            onPreview={onPreview}
            showRemoveIcon={showRemoveIcon}
            showPreviewIcon={showPreviewIcon}
            disabled={disabled}
          />
        )}
      </div>
    );
  }

  // Default (button) mode
  return (
    <div className={classNames('soui-upload', className)} style={componentStyle}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      {triggerNode}
      {showList && (
        <UploadList
          listType={listType}
          items={displayList}
          onRemove={handleRemove}
          onPreview={onPreview}
          showRemoveIcon={showRemoveIcon}
          showPreviewIcon={showPreviewIcon}
          disabled={disabled}
        />
      )}
    </div>
  );
};

// ==================== Dragger Sub-component ====================

const Dragger: React.FC<DraggerProps> = (props) => {
  return <Upload {...props} draggable />;
};

Upload.Dragger = Dragger;

export default Upload;
