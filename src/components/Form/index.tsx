import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
  cloneElement,
  isValidElement,
} from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import type { ComponentThemeConfig } from '../ConfigProvider/types';
import './style.less';

// ==================== Types ====================

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export type RuleType = 'string' | 'number' | 'boolean' | 'url' | 'email';

export interface RuleConfig {
  /** 是否必填 */
  required?: boolean;
  /** 校验消息 */
  message?: string;
  /** 校验类型 */
  type?: RuleType;
  /** 正则校验 */
  pattern?: RegExp;
  /** 最小长度/值 */
  min?: number;
  /** 最大长度/值 */
  max?: number;
  /** 自定义校验函数（返回 Promise.reject 表示校验失败） */
  validator?: (rule: RuleConfig, value: any) => Promise<void>;
  /** 异步校验函数 */
  asyncValidator?: (rule: RuleConfig, value: any) => Promise<void>;
  /** 触发方式 */
  validateTrigger?: 'onChange' | 'onBlur';
  /** 仅对 type: 'string' 或 'array' 生效，是否去除空白 */
  whitespace?: boolean;
}

export type Rule = RuleConfig | string;

export interface FormItemProps {
  /** 字段名（在 form store 中的 key） */
  name?: string | (string | number)[];
  /** 标签 */
  label?: React.ReactNode;
  /** 校验规则 */
  rules?: Rule[];
  /** 必填标记（仅显示红色 *，不做实际校验） */
  required?: boolean;
  /** 提示信息 */
  extra?: React.ReactNode;
  /** 自定义帮助文本 */
  help?: React.ReactNode;
  /** 手动指定校验状态 */
  validateStatus?: '' | 'success' | 'error' | 'warning' | 'validating';
  /** 子节点 */
  children?: React.ReactNode;
  /** 标签列宽（horizontal 布局） */
  labelCol?: { span?: number; offset?: number };
  /** 内容列宽（horizontal 布局） */
  wrapperCol?: { span?: number; offset?: number };
  /** 标签文本对齐 */
  labelAlign?: 'left' | 'right';
  /** 是否隐藏表单项 */
  hidden?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 值属性名（默认 'value'） */
  valuePropName?: string;
  /** 从事件中提取值的函数 */
  getValueFromEvent?: (...args: any[]) => any;
  /** 字段依赖 */
  dependencies?: (string | (string | number)[])[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 初始化字段值 */
  initialValue?: any;
  /** 校验触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | ('onChange' | 'onBlur')[];
  /** 冒泡值改变事件 */
  noStyle?: boolean;
}

export interface FormInstance {
  /** 获取字段值 */
  getFieldValue: (name: string | (string | number)[]) => any;
  /** 获取所有字段值 */
  getFieldsValue: () => Record<string, any>;
  /** 设置字段值 */
  setFieldValue: (name: string | (string | number)[], value: any) => void;
  /** 设置多个字段值 */
  setFieldsValue: (values: Record<string, any>) => void;
  /** 校验所有字段 */
  validateFields: () => Promise<Record<string, any>>;
  /** 校验指定字段 */
  validateField: (name: string | (string | number)[]) => Promise<void>;
  /** 重置表单 */
  resetFields: (names?: (string | (string | number)[])[]) => void;
  /** 清空校验 */
  clearValidate: (names?: (string | (string | number)[])[]) => void;
  /** 提交表单（触发校验和 onFinish） */
  submit: () => void;
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** 表单布局 */
  layout?: FormLayout;
  /** 表单初始值 */
  initialValues?: Record<string, any>;
  /** 提交成功回调 */
  onFinish?: (values: Record<string, any>) => void;
  /** 提交失败回调（校验不通过） */
  onFinishFailed?: (info: { values: Record<string, any>; errorFields: { name: string; errors: string[] }[] }) => void;
  /** 字段值变化回调 */
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
  /** 表单实例（受控） */
  form?: FormInstance;
  /** 统一标签列宽 */
  labelCol?: { span?: number; offset?: number };
  /** 统一内容列宽 */
  wrapperCol?: { span?: number; offset?: number };
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 组件尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填标记 */
  requiredMark?: boolean | 'optional';
  /** 子节点 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 统一校验触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | ('onChange' | 'onBlur')[];
  /** 统一校验消息配置 */
  validateMessages?: Record<string, string>;
}

// ==================== Utils ====================

function normalizeName(name: string | (string | number)[]): string {
  return Array.isArray(name) ? name.join('.') : name;
}

function getNestedValue(obj: any, path: string | (string | number)[]): any {
  const keys = Array.isArray(path) ? path : [path];
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}

function setNestedValue(obj: any, path: string | (string | number)[], value: any): any {
  const keys = Array.isArray(path) ? path : [path];
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] != null ? { ...current[key] } : {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

function deleteNestedKey(obj: any, path: string | (string | number)[]): any {
  const keys = Array.isArray(path) ? path : [path];
  if (keys.length === 1) {
    const result = { ...obj };
    delete result[keys[0]];
    return result;
  }
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }
  delete current[keys[keys.length - 1]];
  return result;
}

// ==================== Validation ====================

async function validateValue(value: any, rules: Rule[], fieldName?: string): Promise<string[]> {
  const errors: string[] = [];
  const label = fieldName || '此字段';

  for (const rawRule of rules) {
    const rule: RuleConfig = typeof rawRule === 'string' ? { type: 'string' as RuleType, message: rawRule } : rawRule;

    try {
      // Required
      if (rule.required) {
        if (value === undefined || value === null || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
          errors.push(rule.message || `${label}不能为空`);
          continue;
        }
      }

      // Skip further validation if value is empty and not required
      if (value === undefined || value === null || value === '') continue;

      // Pattern
      if (rule.pattern && !rule.pattern.test(String(value))) {
        errors.push(rule.message || `${label}格式不正确`);
        continue;
      }

      // Whitespace
      if (rule.whitespace && typeof value === 'string' && value.trim() === '') {
        errors.push(rule.message || `${label}不能全为空格`);
        continue;
      }

      // Min / Max
      if (rule.min !== undefined || rule.max !== undefined) {
        const len = typeof value === 'string' || Array.isArray(value) ? value.length : Number(value);
        if (rule.min !== undefined && len < rule.min) {
          errors.push(rule.message || `${label}不能少于${rule.min}个字符`);
          continue;
        }
        if (rule.max !== undefined && len > rule.max) {
          errors.push(rule.message || `${label}不能超过${rule.max}个字符`);
          continue;
        }
      }

      // Type validation
      if (rule.type === 'email' && typeof value === 'string') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push(rule.message || `${label}不是有效的邮箱地址`);
          continue;
        }
      }
      if (rule.type === 'url' && typeof value === 'string') {
        try {
          new URL(value);
        } catch {
          errors.push(rule.message || `${label}不是有效的 URL 地址`);
          continue;
        }
      }
      if (rule.type === 'number' && isNaN(Number(value))) {
        errors.push(rule.message || `${label}必须是数字`);
        continue;
      }

      // Custom validator
      if (rule.validator) {
        await rule.validator(rule, value);
      }

      // Async validator
      if (rule.asyncValidator) {
        await rule.asyncValidator(rule, value);
      }
    } catch (err: any) {
      errors.push(err?.message || rule.message || `${label}校验失败`);
    }
  }

  return errors;
}

// ==================== Context ====================

interface FieldMeta {
  rules: Rule[];
  initialValue?: any;
}

interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  layout: FormLayout;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  labelAlign: 'left' | 'right';
  disabled: boolean;
  size: 'small' | 'middle' | 'large';
  requiredMark: boolean | 'optional';
  validateTrigger: 'onChange' | 'onBlur' | ('onChange' | 'onBlur')[];
  getFieldValue: (name: string | (string | number)[]) => any;
  setFieldValue: (name: string | (string | number)[], value: any) => void;
  validateField: (name: string | (string | number)[]) => Promise<void>;
  registerField: (name: string, meta: FieldMeta) => void;
  unregisterField: (name: string) => void;
  onFieldBlur: (name: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext);

// ==================== useForm Hook ====================

export function useForm(): [FormInstance] {
  const storeRef = useRef<Record<string, any>>({});
  const errorsRef = useRef<Record<string, string[]>>({});
  const fieldsRef = useRef<Map<string, FieldMeta>>(new Map());
  const callbacksRef = useRef<{
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (info: any) => void;
    onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
  }>({});
  const forceUpdateRef = useRef<() => void>(() => {});

  const instance = useMemo<FormInstance>(() => ({
    getFieldValue: (name) => getNestedValue(storeRef.current, name),
    getFieldsValue: () => ({ ...storeRef.current }),
    setFieldValue: (name, value) => {
      storeRef.current = setNestedValue(storeRef.current, name, value);
      forceUpdateRef.current();
    },
    setFieldsValue: (values) => {
      storeRef.current = { ...storeRef.current, ...values };
      forceUpdateRef.current();
    },
    validateFields: async () => {
      const allErrors: Record<string, string[]> = {};
      let hasError = false;
      const entries = Array.from(fieldsRef.current.entries());
      for (const [fieldName, meta] of entries) {
        if (meta.rules.length === 0) continue;
        const value = getNestedValue(storeRef.current, fieldName);
        const errs = await validateValue(value, meta.rules, fieldName);
        allErrors[fieldName] = errs;
        if (errs.length > 0) hasError = true;
      }
      errorsRef.current = allErrors;
      forceUpdateRef.current();
      if (hasError) {
        const errorFields = Object.entries(allErrors)
          .filter(([, errs]) => errs.length > 0)
          .map(([name, errs]) => ({ name, errors: errs }));
        return Promise.reject({ errorFields, values: { ...storeRef.current } });
      }
      return { ...storeRef.current };
    },
    validateField: async (name) => {
      const key = normalizeName(name);
      const meta = fieldsRef.current.get(key);
      if (!meta || meta.rules.length === 0) return;
      const value = getNestedValue(storeRef.current, name);
      const errs = await validateValue(value, meta.rules, key);
      errorsRef.current = { ...errorsRef.current, [key]: errs };
      forceUpdateRef.current();
      if (errs.length > 0) return Promise.reject(errs);
    },
    resetFields: (names) => {
      if (names) {
        for (const name of names) {
          const key = normalizeName(name);
          storeRef.current = deleteNestedKey(storeRef.current, name);
          const meta = fieldsRef.current.get(key);
          if (meta?.initialValue !== undefined) {
            storeRef.current = setNestedValue(storeRef.current, name, meta.initialValue);
          }
          delete errorsRef.current[key];
        }
      } else {
        storeRef.current = {};
        fieldsRef.current.forEach((meta, key) => {
          if (meta.initialValue !== undefined) {
            storeRef.current = setNestedValue(storeRef.current, key, meta.initialValue);
          }
        });
        errorsRef.current = {};
      }
      forceUpdateRef.current();
    },
    clearValidate: (names) => {
      if (names) {
        for (const name of names) {
          delete errorsRef.current[normalizeName(name)];
        }
      } else {
        errorsRef.current = {};
      }
      forceUpdateRef.current();
    },
    submit: () => {
      instance.validateFields().then(
        (values) => { callbacksRef.current.onFinish?.(values); },
        (info) => { callbacksRef.current.onFinishFailed?.(info); },
      );
    },
  }), []);

  // Expose internals for the Form component to wire up
  (instance as any).__storeRef = storeRef;
  (instance as any).__errorsRef = errorsRef;
  (instance as any).__fieldsRef = fieldsRef;
  (instance as any).__callbacksRef = callbacksRef;
  (instance as any).__setForceUpdate = (fn: () => void) => { forceUpdateRef.current = fn; };

  return [instance];
}

// ==================== Form Component ====================

const InternalForm = forwardRef<FormInstance, FormProps>(({
  layout = 'horizontal',
  initialValues,
  onFinish,
  onFinishFailed,
  onValuesChange,
  form: externalForm,
  labelCol,
  wrapperCol,
  labelAlign = 'right',
  size = 'middle',
  disabled = false,
  requiredMark = true,
  validateTrigger = 'onChange',
  children,
  className,
  style,
  ...rest
}, ref) => {
  const context = useContext(ConfigContext);
  const formTheme = (context?.components?.Form || {}) as ComponentThemeConfig['Form'];

  const [internalForm] = useForm();
  const formInstance = externalForm || internalForm;

  // Wire up force update
  const [, setRenderTick] = useState(0);
  useEffect(() => {
    (formInstance as any).__setForceUpdate(() => setRenderTick((t) => t + 1));
  }, [formInstance]);

  // Wire up callbacks
  useEffect(() => {
    (formInstance as any).__callbacksRef.current = { onFinish, onFinishFailed, onValuesChange };
  }, [onFinish, onFinishFailed, onValuesChange]);

  // Apply initial values
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initialValues && !initializedRef.current) {
      (formInstance as any).__storeRef.current = { ...initialValues };
      initializedRef.current = true;
      setRenderTick((t) => t + 1);
    }
  }, [initialValues, formInstance]);

  useImperativeHandle(ref, () => formInstance, [formInstance]);

  const store: Record<string, any> = (formInstance as any).__storeRef.current;
  const errors: Record<string, string[]> = (formInstance as any).__errorsRef.current;
  const fields: Map<string, FieldMeta> = (formInstance as any).__fieldsRef.current;
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const getFieldValue = useCallback(
    (name: string | (string | number)[]) => getNestedValue(store, name),
    [store],
  );

  const setFieldValue = useCallback(
    (name: string | (string | number)[], value: any) => {
      const prev = { ...store };
      (formInstance as any).__storeRef.current = setNestedValue(store, name, value);
      const key = normalizeName(name);
      // Trigger onValuesChange
      onValuesChange?.({ [key]: value }, (formInstance as any).__storeRef.current);
      setRenderTick((t) => t + 1);
    },
    [store, formInstance, onValuesChange],
  );

  const validateField = useCallback(
    async (name: string | (string | number)[]) => {
      const key = normalizeName(name);
      const meta = fields.get(key);
      if (!meta || meta.rules.length === 0) return;
      const value = getNestedValue((formInstance as any).__storeRef.current, name);
      const errs = await validateValue(value, meta.rules, key);
      (formInstance as any).__errorsRef.current = {
        ...(formInstance as any).__errorsRef.current,
        [key]: errs,
      };
      setRenderTick((t) => t + 1);
    },
    [fields, formInstance],
  );

  const registerField = useCallback(
    (name: string, meta: FieldMeta) => {
      fields.set(name, meta);
      // Apply field's initialValue if store doesn't have it
      if (meta.initialValue !== undefined && getNestedValue((formInstance as any).__storeRef.current, name) === undefined) {
        (formInstance as any).__storeRef.current = setNestedValue(
          (formInstance as any).__storeRef.current,
          name,
          meta.initialValue,
        );
        setRenderTick((t) => t + 1);
      }
    },
    [fields, formInstance],
  );

  const unregisterField = useCallback(
    (name: string) => {
      fields.delete(name);
    },
    [fields],
  );

  const onFieldBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      // Validate on blur if configured
      const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
      if (triggers.includes('onBlur')) {
        validateField(name);
      }
    },
    [validateTrigger, validateField],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      formInstance.validateFields().then(
        (values) => { onFinish?.(values); },
        (info) => { onFinishFailed?.(info); },
      );
    },
    [formInstance, onFinish, onFinishFailed],
  );

  const formContextValue = useMemo<FormContextValue>(
    () => ({
      values: store,
      errors,
      touched,
      layout,
      labelCol,
      wrapperCol,
      labelAlign,
      disabled,
      size,
      requiredMark,
      validateTrigger,
      getFieldValue,
      setFieldValue,
      validateField,
      registerField,
      unregisterField,
      onFieldBlur,
    }),
    [store, errors, touched, layout, labelCol, wrapperCol, labelAlign, disabled, size, requiredMark, validateTrigger, getFieldValue, setFieldValue, validateField, registerField, unregisterField, onFieldBlur],
  );

  // CSS variables from theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (formTheme?.borderRadius !== undefined) {
    cssVars['--soui-form-border-radius'] = `${formTheme.borderRadius}px`;
  }
  if (formTheme?.fontSize !== undefined) {
    cssVars['--soui-form-font-size'] = `${formTheme.fontSize}px`;
  }
  if (formTheme?.labelFontSize !== undefined) {
    cssVars['--soui-form-label-font-size'] = `${formTheme.labelFontSize}px`;
  }
  if (formTheme?.colorPrimary !== undefined) {
    cssVars['--soui-form-color-primary'] = formTheme.colorPrimary;
  }
  if (formTheme?.colorError !== undefined) {
    cssVars['--soui-form-color-error'] = formTheme.colorError;
  }
  if (formTheme?.colorWarning !== undefined) {
    cssVars['--soui-form-color-warning'] = formTheme.colorWarning;
  }
  if (formTheme?.colorSuccess !== undefined) {
    cssVars['--soui-form-color-success'] = formTheme.colorSuccess;
  }
  if (formTheme?.labelWidth !== undefined) {
    cssVars['--soui-form-label-width'] = `${formTheme.labelWidth}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  return (
    <FormContext.Provider value={formContextValue}>
      <form
        className={classNames(
          'soui-form',
          `soui-form-${layout}`,
          `soui-form-size-${size}`,
          {
            'soui-form-disabled': disabled,
          },
          className,
        )}
        style={componentStyle}
        onSubmit={handleSubmit}
        noValidate
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

InternalForm.displayName = 'Form';

// ==================== Form.Item ====================

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  required,
  extra,
  help,
  validateStatus: externalValidateStatus,
  children,
  labelCol: itemLabelCol,
  wrapperCol: itemWrapperCol,
  labelAlign: itemLabelAlign,
  hidden,
  className,
  style,
  valuePropName = 'value',
  getValueFromEvent,
  dependencies,
  disabled: itemDisabled,
  initialValue,
  validateTrigger: itemValidateTrigger,
  noStyle,
}) => {
  const formCtx = useContext(FormContext);

  const nameKey = name ? normalizeName(name) : '';

  // Determine effective rules (add required rule if required prop is set)
  const effectiveRules = useMemo(() => {
    const result = [...rules];
    if (required && !result.some((r) => typeof r === 'object' && r.required)) {
      result.unshift({ required: true, message: `${label || nameKey || '此字段'}不能为空` });
    }
    return result;
  }, [rules, required, label, nameKey]);

  // Register/unregister field
  useEffect(() => {
    if (nameKey && formCtx) {
      formCtx.registerField(nameKey, { rules: effectiveRules, initialValue });
      return () => formCtx.unregisterField(nameKey);
    }
  }, [nameKey, formCtx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update rules when they change
  useEffect(() => {
    if (nameKey && formCtx) {
      const fields = (formCtx as any).values; // trigger re-render
      formCtx.registerField(nameKey, { rules: effectiveRules, initialValue });
    }
  }, [effectiveRules, nameKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (hidden) return null;

  const layout = formCtx?.layout || 'horizontal';
  const effectiveLabelCol = itemLabelCol || formCtx?.labelCol;
  const effectiveWrapperCol = itemWrapperCol || formCtx?.wrapperCol;
  const effectiveLabelAlign = itemLabelAlign || formCtx?.labelAlign || 'right';
  const effectiveDisabled = itemDisabled ?? formCtx?.disabled ?? false;
  const effectiveRequiredMark = formCtx?.requiredMark ?? true;
  const effectiveValidateTrigger = itemValidateTrigger || formCtx?.validateTrigger || 'onChange';

  const value = nameKey ? formCtx?.getFieldValue(name!) : undefined;
  const fieldErrors = nameKey ? (formCtx?.errors[nameKey] || []) : [];
  const isTouched = nameKey ? (formCtx?.touched[nameKey] ?? false) : false;

  // Determine validation status
  let currentStatus: '' | 'success' | 'error' | 'warning' | 'validating' = '';
  if (externalValidateStatus !== undefined) {
    currentStatus = externalValidateStatus;
  } else if (help !== undefined) {
    currentStatus = '';
  } else if (fieldErrors.length > 0) {
    currentStatus = 'error';
  } else if (isTouched && nameKey && fieldErrors.length === 0 && value !== undefined && value !== '') {
    currentStatus = 'success';
  }

  // Check if required asterisk should show
  const showRequired = required || effectiveRules.some((r) => typeof r === 'object' && r.required);
  const showAsterisk = showRequired && effectiveRequiredMark !== false;

  // Build label node
  const labelNode = label !== undefined ? (
    <label
      className={classNames('soui-form-item-label', {
        'soui-form-item-label-required': showAsterisk,
        [`soui-form-item-label-${effectiveLabelAlign}`]: true,
      })}
      title={typeof label === 'string' ? label : undefined}
    >
      {label}
      {showRequired && effectiveRequiredMark === 'optional' && !showAsterisk && (
        <span className="soui-form-item-optional">(可选)</span>
      )}
    </label>
  ) : null;

  // Build help/error text
  const helpNode = help !== undefined ? (
    <div className="soui-form-item-explain">{help}</div>
  ) : fieldErrors.length > 0 ? (
    <div className="soui-form-item-explain soui-form-item-explain-error">
      {fieldErrors.map((err, i) => (
        <div key={i} className="soui-form-item-explain-item">{err}</div>
      ))}
    </div>
  ) : null;

  const extraNode = extra ? (
    <div className="soui-form-item-extra">{extra}</div>
  ) : null;

  // Clone child to inject value/onChange
  let controlNode: React.ReactNode = children;
  if (nameKey && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const triggers = Array.isArray(effectiveValidateTrigger) ? effectiveValidateTrigger : [effectiveValidateTrigger];

    const controlProps: Record<string, any> = {
      [valuePropName]: value,
    };

    if (triggers.includes('onChange')) {
      controlProps.onChange = (...args: any[]) => {
        let newValue: any;
        if (getValueFromEvent) {
          newValue = getValueFromEvent(...args);
        } else if (args[0] && typeof args[0] === 'object' && 'target' in args[0]) {
          newValue = args[0].target.value;
        } else {
          newValue = args[0];
        }
        formCtx?.setFieldValue(name!, newValue);

        // Validate on change
        // Use setTimeout to let the state update first
        setTimeout(() => {
          formCtx?.validateField(name!);
        }, 0);

        // Call original onChange
        child.props.onChange?.(...args);
      };
    }

    if (triggers.includes('onBlur')) {
      controlProps.onBlur = (...args: any[]) => {
        formCtx?.onFieldBlur(nameKey);
        child.props.onBlur?.(...args);
      };
    }

    if (effectiveDisabled && !child.props.disabled) {
      controlProps.disabled = true;
    }

    controlNode = cloneElement(child, controlProps);
  }

  // No-style mode: just render the control
  if (noStyle) {
    return (
      <div className={classNames({ 'soui-form-item-has-error': currentStatus === 'error' })}>
        {controlNode}
        {helpNode}
      </div>
    );
  }

  // Compute column classes for horizontal layout
  const labelColClass = layout === 'horizontal' && effectiveLabelCol?.span
    ? `soui-col-${effectiveLabelCol.span}`
    : undefined;
  const labelOffsetClass = layout === 'horizontal' && effectiveLabelCol?.offset
    ? `soui-col-offset-${effectiveLabelCol.offset}`
    : undefined;
  const wrapperColClass = layout === 'horizontal' && effectiveWrapperCol?.span
    ? `soui-col-${effectiveWrapperCol.span}`
    : undefined;
  const wrapperOffsetClass = layout === 'horizontal' && effectiveWrapperCol?.offset
    ? `soui-col-offset-${effectiveWrapperCol.offset}`
    : undefined;

  return (
    <div
      className={classNames(
        'soui-form-item',
        {
          'soui-form-item-has-error': currentStatus === 'error',
          'soui-form-item-has-warning': currentStatus === 'warning',
          'soui-form-item-has-success': currentStatus === 'success',
          'soui-form-item-is-validating': currentStatus === 'validating',
          'soui-form-item-hidden': hidden,
        },
        className,
      )}
      style={style}
    >
      {labelNode && (
        <div className={classNames('soui-form-item-label-col', labelColClass, labelOffsetClass)}>
          {labelNode}
        </div>
      )}
      <div className={classNames('soui-form-item-wrapper-col', wrapperColClass, wrapperOffsetClass)}>
        <div className="soui-form-item-control">{controlNode}</div>
        {helpNode}
        {extraNode}
      </div>
    </div>
  );
};

FormItem.displayName = 'FormItem';

// ==================== Form.List (bonus) ====================

interface FormListProps {
  /** 字段名 */
  name: string | (string | number)[];
  /** 渲染函数 */
  children: (
    fields: { key: string; name: number; fieldKey: string }[],
    operation: {
      add: (defaultValue?: any, insertIndex?: number) => void;
      remove: (index: number | number[]) => void;
      move: (from: number, to: number) => void;
    },
  ) => React.ReactNode;
  /** 初始值 */
  initialValue?: any[];
}

const FormList: React.FC<FormListProps> = ({ name, children, initialValue }) => {
  const formCtx = useContext(FormContext);
  const nameKey = normalizeName(name);

  // Register field for list
  useEffect(() => {
    if (formCtx) {
      formCtx.registerField(nameKey, { rules: [], initialValue: initialValue || [] });
      return () => formCtx.unregisterField(nameKey);
    }
  }, [nameKey, formCtx]); // eslint-disable-line react-hooks/exhaustive-deps

  const listValue: any[] = formCtx?.getFieldValue(name) || [];

  const fields = listValue.map((_, index) => ({
    key: `${nameKey}-${index}`,
    name: index,
    fieldKey: `${nameKey}-${index}`,
  }));

  const operation = {
    add: (defaultValue?: any, insertIndex?: number) => {
      const current = [...(formCtx?.getFieldValue(name) || [])];
      const idx = insertIndex !== undefined ? insertIndex : current.length;
      current.splice(idx, 0, defaultValue);
      formCtx?.setFieldValue(name, current);
    },
    remove: (index: number | number[]) => {
      const indices = Array.isArray(index) ? index : [index];
      const current = [...(formCtx?.getFieldValue(name) || [])];
      const filtered = current.filter((_, i) => !indices.includes(i));
      formCtx?.setFieldValue(name, filtered);
    },
    move: (from: number, to: number) => {
      const current = [...(formCtx?.getFieldValue(name) || [])];
      const item = current.splice(from, 1)[0];
      current.splice(to, 0, item);
      formCtx?.setFieldValue(name, current);
    },
  };

  return <>{children(fields, operation)}</>;
};

FormList.displayName = 'FormList';

// ==================== Compose ====================

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof FormItem;
  List: typeof FormList;
  useForm: typeof useForm;
}

const Form = InternalForm as FormInterface;
Form.Item = FormItem;
Form.List = FormList;
Form.useForm = useForm;

export default Form;
