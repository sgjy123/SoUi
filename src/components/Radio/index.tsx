import React, { useState, useContext, createContext } from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

export type RadioSize = 'large' | 'middle' | 'small';
export type RadioOptionType = 'default' | 'button';
export type RadioButtonStyle = 'outline' | 'solid';

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选项值 */
  value?: string | number | boolean;
  /** 选中变化回调 */
  onChange?: (e: { target: { value: any; checked: boolean }; nativeEvent: React.ChangeEvent<HTMLInputElement> }) => void;
  /** 原生 name 属性 */
  name?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 当前选中的值 */
  value?: string | number | boolean;
  /** 默认选中的值 */
  defaultValue?: string | number | boolean;
  /** 选中变化回调 */
  onChange?: (e: { target: { value: any }; nativeEvent: React.ChangeEvent<HTMLInputElement> }) => void;
  /** 选项数据 */
  options?: Array<{ label: React.ReactNode; value: string | number; disabled?: boolean }>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 单选框组名称 */
  name?: string;
  /** 尺寸 */
  size?: RadioSize;
  /** 选项类型：default 圆形，button 按钮 */
  optionType?: RadioOptionType;
  /** 按钮风格：outline 描边，solid 填色 */
  buttonStyle?: RadioButtonStyle;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Context ====================

interface RadioGroupContextValue {
  value: string | number | boolean | undefined;
  onChange: (val: string | number | boolean, nativeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  name?: string;
  optionType: RadioOptionType;
  buttonStyle: RadioButtonStyle;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ==================== Radio ====================

const RadioInner: React.FC<RadioProps> = ({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  value,
  onChange,
  name,
  children,
  className,
  style,
  ...rest
}) => {
  const groupContext = useContext(RadioGroupContext);
  const isControlled = checkedProp !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);

  // Determine checked state
  let isChecked: boolean;
  if (groupContext) {
    isChecked = groupContext.value === value;
  } else {
    isChecked = isControlled ? checkedProp! : innerChecked;
  }

  const isDisabled = groupContext?.disabled || disabled;
  const mergedName = groupContext?.name || name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    if (groupContext) {
      groupContext.onChange(value!, e);
    } else {
      if (!isControlled) setInnerChecked(true);
      onChange?.({
        target: { value, checked: true },
        nativeEvent: e,
      });
    }
  };

  // Determine if this is a button-style radio (from group context)
  const isButton = groupContext?.optionType === 'button';

  if (isButton) {
    const btnCls = classNames('soui-radio-button', {
      'soui-radio-button-checked': isChecked,
      'soui-radio-button-disabled': isDisabled,
      [`soui-radio-button-${groupContext.buttonStyle}`]: true,
    }, className);

    return (
      <label className={btnCls} style={style} {...rest}>
        <input
          type="radio"
          className="soui-radio-input"
          checked={isChecked}
          disabled={isDisabled}
          name={mergedName}
          value={String(value)}
          onChange={handleChange}
        />
        <span className="soui-radio-button-label">{children}</span>
      </label>
    );
  }

  const radioCls = classNames('soui-radio', {
    'soui-radio-checked': isChecked,
    'soui-radio-disabled': isDisabled,
  }, className);

  return (
    <label className={radioCls} style={style} {...rest}>
      <span className="soui-radio-inner-wrapper">
        <input
          type="radio"
          className="soui-radio-input"
          checked={isChecked}
          disabled={isDisabled}
          name={mergedName}
          value={String(value)}
          onChange={handleChange}
        />
        <span className="soui-radio-inner" />
      </span>
      {children !== undefined && <span className="soui-radio-label">{children}</span>}
    </label>
  );
};

// ==================== RadioGroup ====================

const RadioGroup: React.FC<RadioGroupProps> = ({
  value: valueProp,
  defaultValue,
  onChange,
  options,
  disabled = false,
  name,
  size = 'middle',
  optionType = 'default',
  buttonStyle = 'outline',
  children,
  className,
  style,
  ...rest
}) => {
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<string | number | boolean | undefined>(defaultValue);
  const currentValue = isControlled ? valueProp : innerValue;

  const handleChange = (val: string | number | boolean, nativeEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(val);
    onChange?.({
      target: { value: val },
      nativeEvent,
    });
  };

  const contextValue: RadioGroupContextValue = {
    value: currentValue,
    onChange: handleChange,
    disabled,
    name,
    optionType,
    buttonStyle,
    size,
  };

  const groupCls = classNames(
    'soui-radio-group',
    `soui-radio-group-${size}`,
    {
      'soui-radio-group-button': optionType === 'button',
      [`soui-radio-group-button-${buttonStyle}`]: optionType === 'button',
    },
    className,
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={groupCls} style={style} role="radiogroup" {...rest}>
        {options
          ? options.map((opt) => {
              const OptComponent = optionType === 'button' ? RadioInner : RadioInner;
              return (
                <OptComponent key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </OptComponent>
              );
            })
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// ==================== Compose ====================

type RadioComponent = typeof RadioInner & {
  Group: typeof RadioGroup;
  Button: React.FC<RadioProps>;
};

const Radio = RadioInner as RadioComponent;
Radio.Group = RadioGroup;

// RadioButton: explicitly renders in button style regardless of group context
const RadioButton: React.FC<RadioProps> = (props) => {
  // Force button rendering by providing a minimal group-like context check
  // When used inside Radio.Group, the group context already handles optionType
  // When used standalone, we render button style directly
  const groupContext = useContext(RadioGroupContext);

  if (groupContext) {
    // Inside a group, just render normally (group context controls button style)
    return <RadioInner {...props} />;
  }

  // Standalone button radio (rare usage)
  const { checked, defaultChecked = false, disabled = false, value, onChange, name, children, className, style, ...rest } = props;
  const isControlled = checked !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked! : innerChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!isControlled) setInnerChecked(true);
    onChange?.({ target: { value, checked: true }, nativeEvent: e });
  };

  const btnCls = classNames('soui-radio-button', 'soui-radio-button-outline', {
    'soui-radio-button-checked': isChecked,
    'soui-radio-button-disabled': disabled,
  }, className);

  return (
    <label className={btnCls} style={style} {...rest}>
      <input
        type="radio"
        className="soui-radio-input"
        checked={isChecked}
        disabled={disabled}
        name={name}
        value={String(value)}
        onChange={handleChange}
      />
      <span className="soui-radio-button-label">{children}</span>
    </label>
  );
};

Radio.Button = RadioButton;

export default Radio;
