import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import './style.less';

// ==================== Types ====================

export type TextType = 'secondary' | 'success' | 'warning' | 'danger';

export interface CopyConfig {
  text?: string;
  onCopy?: (event: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  tooltips?: boolean | string;
}

export interface EditableConfig {
  editing?: boolean;
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onFinish?: (value: string) => void;
  triggerType?: ('icon' | 'text')[];
  icon?: React.ReactNode;
  tooltip?: boolean | string;
}

export interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: React.ReactNode;
  collapseSymbol?: React.ReactNode;
  onExpand?: (e: React.MouseEvent<HTMLElement>) => void;
  onCollapse?: (e: React.MouseEvent<HTMLElement>) => void;
  onEllipsis?: (ellipsis: boolean) => void;
  tooltip?: boolean | string;
}

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** 文本类型 */
  type?: TextType;
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  copyable?: boolean | CopyConfig;
  editable?: boolean | EditableConfig;
  ellipsis?: boolean | EllipsisConfig;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface TitleProps extends BaseProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface ParagraphProps extends BaseProps {
  // Paragraph specific props can be added here
}

export interface LinkProps extends BaseProps {
  href?: string;
  target?: string;
  rel?: string;
}

// ==================== Helper Components ====================

interface OperationButtonProps {
  icon: React.ReactNode;
  tooltip?: boolean | string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  icon,
  tooltip,
  onClick,
  className,
}) => {
  const tooltipText = typeof tooltip === 'string' ? tooltip : undefined;
  const tooltipEnabled = tooltip !== false;

  const buttonContent = (
    <span
      className={classNames('soui-typography-operation', className)}
      onClick={onClick}
    >
      {icon}
    </span>
  );

  if (tooltipEnabled && tooltipText) {
    return (
      <Tooltip title={tooltipText} placement="top">
        {buttonContent}
      </Tooltip>
    );
  }

  return buttonContent;
};

// ==================== Text Component ====================

const Text: React.FC<BaseProps & React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  style,
  type,
  disabled = false,
  mark = false,
  code = false,
  underline = false,
  delete: del = false,
  strong = false,
  italic = false,
  copyable = false,
  editable = false,
  ellipsis = false,
  onClick,
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEllipsis, setIsEllipsis] = useState(false);
  const contentRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle editable
  useEffect(() => {
    if (editable && typeof editable === 'object' && editable.editing !== undefined) {
      setEditing(editable.editing);
    }
  }, [editable]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  // Handle ellipsis detection
  useEffect(() => {
    if (ellipsis && contentRef.current && !expanded) {
      const element = contentRef.current;
      const checkEllipsis = () => {
        const isOverflowing = element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth;
        setIsEllipsis(isOverflowing);

        if (typeof ellipsis === 'object' && ellipsis.onEllipsis) {
          ellipsis.onEllipsis(isOverflowing);
        }
      };

      checkEllipsis();

      // Resize observer for dynamic content
      const resizeObserver = new ResizeObserver(checkEllipsis);
      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }
  }, [ellipsis, expanded, children]);

  const handleCopy = async (e: React.MouseEvent<HTMLElement>) => {
    let copyText = '';

    if (typeof copyable === 'object' && copyable.text) {
      copyText = copyable.text;
    } else {
      copyText = String(children);
    }

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);

      if (typeof copyable === 'object' && copyable.onCopy) {
        copyable.onCopy(e);
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleEditStart = () => {
    setEditing(true);
    setEditedValue(String(children));

    if (typeof editable === 'object' && editable.onStart) {
      editable.onStart();
    }
  };

  const handleEditCancel = () => {
    setEditing(false);

    if (typeof editable === 'object' && editable.onCancel) {
      editable.onCancel();
    }
  };

  const handleEditFinish = () => {
    setEditing(false);

    if (typeof editable === 'object' && editable.onFinish) {
      editable.onFinish(editedValue);
    }

    if (typeof editable === 'object' && editable.onChange) {
      editable.onChange(editedValue);
    }
  };

  const handleExpand = (e: React.MouseEvent<HTMLElement>) => {
    setExpanded(true);

    if (typeof ellipsis === 'object' && ellipsis.onExpand) {
      ellipsis.onExpand(e);
    }
  };

  const handleCollapse = (e: React.MouseEvent<HTMLElement>) => {
    setExpanded(false);

    if (typeof ellipsis === 'object' && ellipsis.onCollapse) {
      ellipsis.onCollapse(e);
    }
  };

  // Render editable input
  if (editing) {
    return (
      <span className={classNames('soui-typography', 'soui-typography-editable', className)} style={style}>
        <input
          ref={inputRef}
          className="soui-typography-editable-input"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onBlur={handleEditFinish}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEditFinish();
            } else if (e.key === 'Escape') {
              handleEditCancel();
            }
          }}
        />
        <span className="soui-typography-editable-actions">
          <OperationButton
            icon={<Icon name="CheckCorrect" size={14} />}
            tooltip="保存"
            onClick={handleEditFinish}
          />
          <OperationButton
            icon={<Icon name="Close" size={14} />}
            tooltip="取消"
            onClick={handleEditCancel}
          />
        </span>
      </span>
    );
  }

  // Build class names
  const typographyClassName = classNames(
    'soui-typography',
    'soui-typography-text',
    {
      'soui-typography-disabled': disabled,
      'soui-typography-mark': mark,
      'soui-typography-code': code,
      'soui-typography-underline': underline,
      'soui-typography-delete': del,
      'soui-typography-strong': strong,
      'soui-typography-italic': italic,
      'soui-typography-copyable': copyable,
      'soui-typography-editable': editable,
      'soui-typography-ellipsis': ellipsis && !expanded,
      'soui-typography-copied': copied,
      'soui-typography-secondary': type === 'secondary',
      'soui-typography-success': type === 'success',
      'soui-typography-warning': type === 'warning',
      'soui-typography-danger': type === 'danger',
    },
    className
  );

  // Ellipsis styles
  const ellipsisStyle: React.CSSProperties = {};
  if (ellipsis && !expanded) {
    const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};
    const rows = ellipsisConfig.rows || 1;

    if (rows > 1) {
      ellipsisStyle.display = '-webkit-box';
      ellipsisStyle.WebkitLineClamp = rows;
      ellipsisStyle.WebkitBoxOrient = 'vertical';
      ellipsisStyle.overflow = 'hidden';
      ellipsisStyle.textOverflow = 'ellipsis';
    } else {
      ellipsisStyle.whiteSpace = 'nowrap';
      ellipsisStyle.overflow = 'hidden';
      ellipsisStyle.textOverflow = 'ellipsis';
    }
  }

  // Render content with operations
  const renderContent = () => {
    let content = children;

    // Add suffix for ellipsis
    if (ellipsis && !expanded && typeof ellipsis === 'object' && ellipsis.suffix) {
      content = (
        <>
          {children}
          {ellipsis.suffix}
        </>
      );
    }

    // Wrap content with Tooltip if needed
    if (ellipsis && !expanded) {
      const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};
      const tooltip = ellipsisConfig.tooltip;
      
      if (tooltip) {
        const tooltipContent = typeof tooltip === 'string' ? tooltip : String(children);
        return (
          <Tooltip title={tooltipContent} placement="top">
            {content}
          </Tooltip>
        );
      }
    }

    return content;
  };

  // Render copy/edit icons
  const renderOperations = () => {
    const operations: React.ReactNode[] = [];

    if (copyable) {
      const copyConfig = typeof copyable === 'object' ? copyable : {};
      const copyIcon = copyConfig.icon || <Icon name="Copy" size={14} />;
      const copyTooltip = copied ? '已复制' : (copyConfig.tooltips !== false ? (copyConfig.tooltips || '复制') : false);

      operations.push(
        <OperationButton
          key="copy"
          icon={copied ? <Icon name="CheckCorrect" size={14} /> : copyIcon}
          tooltip={copyTooltip}
          onClick={handleCopy}
        />
      );
    }

    if (editable) {
      const editConfig = typeof editable === 'object' ? editable : {};
      const editIcon = editConfig.icon || <Icon name="Edit" size={14} />;
      const editTooltip = editConfig.tooltip !== false ? (editConfig.tooltip || '编辑') : false;

      operations.push(
        <OperationButton
          key="edit"
          icon={editIcon}
          tooltip={editTooltip}
          onClick={handleEditStart}
        />
      );
    }

    if (operations.length === 0) return null;

    return <span className="soui-typography-operations">{operations}</span>;
  };

  // Render expand/collapse button for ellipsis
  const renderExpandButton = () => {
    if (!ellipsis || !isEllipsis) return null;

    const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};
    const expandable = ellipsisConfig.expandable;

    // Only show expand/collapse button if expandable is explicitly set to true
    if (!expandable) return null;

    if (expanded) {
      // Show collapse button when expanded
      const collapseSymbol = ellipsisConfig.collapseSymbol || '收起';
      return (
        <span className="soui-typography-expand" onClick={handleCollapse}>
          {collapseSymbol}
        </span>
      );
    } else {
      // Show expand button when collapsed
      const symbol = ellipsisConfig.symbol || '展开';
      return (
        <span className="soui-typography-expand" onClick={handleExpand}>
          {symbol}
        </span>
      );
    }
  };

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'flex-end', maxWidth: '100%', position: 'relative' }}
    >
      <Tooltip
        title={ellipsis && !expanded && typeof ellipsis === 'object' && ellipsis.tooltip
          ? (typeof ellipsis.tooltip === 'string' ? ellipsis.tooltip : String(children))
          : undefined
        }
        placement="top"
      >
        <span
          ref={contentRef}
          className={typographyClassName}
          style={{ ...style, ...ellipsisStyle }}
          onClick={onClick}
          {...props}
        >
          {renderContent()}
        </span>
      </Tooltip>
      {renderExpandButton()}
      {renderOperations()}
    </span>
  );
};

// ==================== Title Component ====================

const Title: React.FC<TitleProps & Omit<React.HTMLAttributes<HTMLHeadingElement>, 'onClick'>> = ({
  children,
  className,
  style,
  level = 1,
  disabled = false,
  mark = false,
  code = false,
  underline = false,
  delete: del = false,
  strong = false,
  italic = false,
  copyable = false,
  editable = false,
  ellipsis = false,
  onClick,
  ...props
}) => {
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  const titleClassName = classNames(
    'soui-typography',
    `soui-typography-title`,
    `soui-typography-title-${level}`,
    {
      'soui-typography-disabled': disabled,
      'soui-typography-mark': mark,
      'soui-typography-code': code,
      'soui-typography-underline': underline,
      'soui-typography-delete': del,
      'soui-typography-strong': strong,
      'soui-typography-italic': italic,
      'soui-typography-copyable': copyable,
      'soui-typography-editable': editable,
      'soui-typography-ellipsis': ellipsis,
    },
    className
  );

  return (
    <HeadingTag
      className={titleClassName}
      style={style}
      {...props}
    >
      <Text
        disabled={disabled}
        mark={mark}
        code={code}
        underline={underline}
        delete={del}
        strong={strong}
        italic={italic}
        copyable={copyable}
        editable={editable}
        ellipsis={ellipsis}
        onClick={onClick}
      >
        {children}
      </Text>
    </HeadingTag>
  );
};

// ==================== Paragraph Component ====================

const Paragraph: React.FC<ParagraphProps & Omit<React.HTMLAttributes<HTMLParagraphElement>, 'onClick'>> = ({
  children,
  className,
  style,
  disabled = false,
  mark = false,
  code = false,
  underline = false,
  delete: del = false,
  strong = false,
  italic = false,
  copyable = false,
  editable = false,
  ellipsis = false,
  onClick,
  ...props
}) => {
  const paragraphClassName = classNames(
    'soui-typography',
    'soui-typography-paragraph',
    {
      'soui-typography-disabled': disabled,
      'soui-typography-mark': mark,
      'soui-typography-code': code,
      'soui-typography-underline': underline,
      'soui-typography-delete': del,
      'soui-typography-strong': strong,
      'soui-typography-italic': italic,
      'soui-typography-copyable': copyable,
      'soui-typography-editable': editable,
      'soui-typography-ellipsis': ellipsis,
    },
    className
  );

  return (
    <p
      className={paragraphClassName}
      style={style}
      {...props}
    >
      <Text
        disabled={disabled}
        mark={mark}
        code={code}
        underline={underline}
        delete={del}
        strong={strong}
        italic={italic}
        copyable={copyable}
        editable={editable}
        ellipsis={ellipsis}
        onClick={onClick}
      >
        {children}
      </Text>
    </p>
  );
};

// ==================== Link Component ====================

const Link: React.FC<LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>> = ({
  children,
  className,
  style,
  href,
  target,
  rel,
  disabled = false,
  mark = false,
  code = false,
  underline = false,
  delete: del = false,
  strong = false,
  italic = false,
  copyable = false,
  editable = false,
  ellipsis = false,
  onClick,
  ...props
}) => {
  const linkClassName = classNames(
    'soui-typography',
    'soui-typography-link',
    {
      'soui-typography-disabled': disabled,
      'soui-typography-mark': mark,
      'soui-typography-code': code,
      'soui-typography-underline': underline,
      'soui-typography-delete': del,
      'soui-typography-strong': strong,
      'soui-typography-italic': italic,
      'soui-typography-copyable': copyable,
      'soui-typography-editable': editable,
      'soui-typography-ellipsis': ellipsis,
    },
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      className={linkClassName}
      style={style}
      href={disabled ? undefined : href}
      target={target}
      rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      onClick={handleClick}
      {...props}
    >
      <Text
        disabled={disabled}
        mark={mark}
        code={code}
        underline={false}
        delete={del}
        strong={strong}
        italic={italic}
        copyable={copyable}
        editable={editable}
        ellipsis={ellipsis}
      >
        {children}
      </Text>
    </a>
  );
};

// ==================== Main Typography Component ====================

export type TypographyProps = BaseProps;

interface TypographyComponent extends React.FC<BaseProps & React.HTMLAttributes<HTMLSpanElement>> {
  Title: typeof Title;
  Paragraph: typeof Paragraph;
  Link: typeof Link;
  Text: typeof Text;
}

const Typography = Text as unknown as TypographyComponent;

Typography.Title = Title;
Typography.Paragraph = Paragraph;
Typography.Link = Link;
Typography.Text = Text;

export default Typography;
