import React, { useState, useContext, createContext } from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

export type CheckboxSize = 'large' | 'middle' | 'small';

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 半选状态（仅影响样式，不影响选中逻辑） */
  indeterminate?: boolean;
  /** 选项值（用于 Checkbox.Group 中标识选项） */
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

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 当前选中的值数组 */
  value?: Array<string | number | boolean>;
  /** 默认选中的值数组 */
  defaultValue?: Array<string | number | boolean>;
  /** 选中变化回调 */
  onChange?: (checkedValues: Array<string | number | boolean>) => void;
  /** 选项数据 */
  options?: Array<{ label: React.ReactNode; value: string | number; disabled?: boolean }>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 名称 */
  name?: string;
  /** 尺寸 */
  size?: CheckboxSize;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Context ====================

interface CheckboxGroupContextValue {
  value: Array<string | number | boolean>;
  onChange: (val: string | number | boolean, checked: boolean, nativeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  name?: string;
  size: CheckboxSize;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

// ==================== Checkbox ====================

const CheckboxInner: React.FC<CheckboxProps> = ({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  value,
  onChange,
  name,
  children,
  className,
  style,
  ...rest
}) => {
  const groupContext = useContext(CheckboxGroupContext);
  const isControlled = checkedProp !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);

  // Determine checked state
  let isChecked: boolean;
  if (groupContext) {
    isChecked = groupContext.value.includes(value!);
  } else {
    isChecked = isControlled ? checkedProp! : innerChecked;
  }

  const isDisabled = groupContext?.disabled || disabled;
  const mergedName = groupContext?.name || name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    if (groupContext) {
      groupContext.onChange(value!, e.target.checked, e);
    } else {
      if (!isControlled) setInnerChecked(e.target.checked);
      onChange?.({
        target: { value, checked: e.target.checked },
        nativeEvent: e,
      });
    }
  };

  const checkboxCls = classNames('soui-checkbox', {
    'soui-checkbox-checked': isChecked && !indeterminate,
    'soui-checkbox-indeterminate': indeterminate,
    'soui-checkbox-disabled': isDisabled,
  }, className);

  return (
    <label className={checkboxCls} style={style} {...rest}>
      <span className="soui-checkbox-inner-wrapper">
        <input
          type="checkbox"
          className="soui-checkbox-input"
          checked={isChecked}
          disabled={isDisabled}
          name={mergedName}
          value={String(value)}
          onChange={handleChange}
        />
        <span className="soui-checkbox-inner" />
      </span>
      {children !== undefined && <span className="soui-checkbox-label">{children}</span>}
    </label>
  );
};

// ==================== CheckboxGroup ====================

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value: valueProp,
  defaultValue,
  onChange,
  options,
  disabled = false,
  name,
  size = 'middle',
  children,
  className,
  style,
  ...rest
}) => {
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<Array<string | number | boolean>>(defaultValue || []);
  const currentValue = isControlled ? valueProp! : innerValue;

  const handleChange = (
    val: string | number | boolean,
    checked: boolean,
    nativeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = checked
      ? [...currentValue, val]
      : currentValue.filter((v) => v !== val);

    if (!isControlled) setInnerValue(newValue);
    onChange?.(newValue);
  };

  const contextValue: CheckboxGroupContextValue = {
    value: currentValue,
    onChange: handleChange,
    disabled,
    name,
    size,
  };

  const groupCls = classNames(
    'soui-checkbox-group',
    `soui-checkbox-group-${size}`,
    className,
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={groupCls} style={style} role="group" {...rest}>
        {options
          ? options.map((opt) => (
              <CheckboxInner key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </CheckboxInner>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// ==================== Compose ====================

type CheckboxComponent = typeof CheckboxInner & {
  Group: typeof CheckboxGroup;
};

const Checkbox = CheckboxInner as CheckboxComponent;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
