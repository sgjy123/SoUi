import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  cloneElement,
  isValidElement,
} from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 表单布局方式 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/** 表单尺寸 */
export type FormSize = 'large' | 'middle' | 'small';

/** 校验规则配置 */
export interface RuleConfig {
  /** 必填 */
  required?: boolean;
  /** 错误提示文本 */
  message?: string;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 最小值/最小长度 */
  min?: number;
  /** 最大值/最大长度 */
  max?: number;
  /** 校验类型 */
  type?: 'email' | 'url' | 'number' | 'phone';
  /** 不允许只有空格 */
  whitespace?: boolean;
  /** 自定义同步校验器 */
  validator?: (rule: RuleConfig, value: any) => Promise<void> | void;
  /** 自定义异步校验器 */
  asyncValidator?: (rule: RuleConfig, value: any) => Promise<void>;
  /** 校验触发时机 */
  validateTrigger?: string | string[];
}

/** 校验规则（内部展开后格式） */
export interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  type?: 'email' | 'url' | 'number' | 'phone';
  whitespace?: boolean;
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  asyncValidator?: (rule: Rule, value: any) => Promise<void>;
  validateTrigger?: string | string[];
}

/** Form.Item 属性 */
export interface FormItemProps {
  /** 字段名，支持嵌套路径 */
  name?: string | number | (string | number)[];
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否显示星号 */
  required?: boolean;
  /** 依赖字段，变化时触发当前字段重新校验 */
  dependencies?: (string | number | (string | number)[])[];
  /** 校验规则 */
  rules?: RuleConfig[];
  /** 单独控制校验状态 */
  validateStatus?: 'error' | 'warning' | 'success' | 'validating';
  /** 额外提示信息 */
  extra?: React.ReactNode;
  /** 标签列宽 */
  labelCol?: { span?: number; offset?: number };
  /** 控件列宽 */
  wrapperCol?: { span?: number; offset?: number };
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 布局覆盖 */
  layout?: 'horizontal' | 'vertical';
  /** 初始值 */
  initialValue?: any;
  /** 无样式模式，仅收集值 */
  noStyle?: boolean;
  /** 字段值变化时触发重新渲染 */
  shouldUpdate?: boolean | ((prev: any, cur: any) => boolean);
  /** 值属性名 */
  valuePropName?: string;
  /** 显示反馈图标 */
  hasFeedback?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode | ((form: any) => React.ReactNode);
}

/** FormList 字段数据 */
export interface FormListFieldData {
  name: number;
  key: number;
  fieldKey: number;
}

/** FormList 操作方法 */
export interface FormListOperations {
  add: (defaultValue?: any) => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
}

/** FormList 属性 */
export interface FormListProps {
  name: string | number | (string | number)[];
  children: (fields: FormListFieldData[], operations: FormListOperations) => React.ReactNode;
}

/** FormInstance */
export interface FormInstance {
  /** @internal */
  __store?: any;
  getFieldValue: (name: string | (string | number)[]) => any;
  getFieldsValue: (nameList?: (string | number | (string | number)[])[]) => any;
  getFieldsValueRaw: () => any;
  setFieldValue: (name: string | (string | number)[], value: any) => void;
  setFieldsValue: (values: any) => void;
  resetFields: (nameList?: (string | number | (string | number)[])[]) => void;
  validateFields: (nameList?: (string | number | (string | number)[])[]) => Promise<any>;
  submit: () => Promise<any>;
  scrollToField: (name: string | (string | number)[]) => void;
  clearValidate: (nameList?: (string | number | (string | number)[])[]) => void;
}

/** Form 属性 */
export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  layout?: FormLayout;
  size?: FormSize;
  form?: FormInstance;
  initialValues?: Record<string, any>;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  labelAlign?: 'left' | 'right';
  disabled?: boolean;
  requiredMark?: boolean | 'optional';
  validateTrigger?: string | string[];
  onFinish?: (values: any) => void;
  onFinishFailed?: (info: { errorFields: any[] }) => void;
  onValuesChange?: (changed: any, all: any) => void;
  children?: React.ReactNode;
}

// ==================== Utility Functions ====================

function normalizeName(name: string | number | (string | number)[]): string[] {
  if (name === undefined || name === null) return [];
  if (typeof name === 'number') return [String(name)];
  if (Array.isArray(name)) return name.map((n) => String(n));
  return [name];
}

function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key];
    return undefined;
  }, obj);
}

function setNestedValue(obj: any, path: string[], value: any): any {
  if (path.length === 0) return value;
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  const [head, ...rest] = path;
  result[head] = rest.length === 0 ? value : setNestedValue(result[head], rest, value);
  return result;
}

function deleteNestedKey(obj: any, path: string[]): any {
  if (path.length === 0) return obj;
  if (!obj) return obj;
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  const [head, ...rest] = path;
  if (rest.length === 0) {
    if (Array.isArray(result)) {
      result.splice(Number(head), 1);
      return result;
    }
    delete result[head];
    return result;
  }
  result[head] = deleteNestedKey(result[head], rest);
  return result;
}

// ==================== Validation Engine ====================

async function validateValue(value: any, rules: Rule[], label: string): Promise<string[]> {
  const errors: string[] = [];

  for (const rule of rules) {
    if (rule.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
      if (isEmpty) {
        errors.push(rule.message || `${label}不能为空`);
        continue;
      }
    }

    if (value === undefined || value === null || value === '') continue;

    // whitespace
    if (rule.whitespace && typeof value === 'string' && value.trim() === '') {
      errors.push(rule.message || `${label}不能只有空格`);
      continue;
    }

    if (rule.type === 'email') {
      const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRe.test(value)) errors.push(rule.message || '邮箱格式不正确');
    } else if (rule.type === 'url') {
      try { new URL(value); } catch { errors.push(rule.message || 'URL 格式不正确'); }
    } else if (rule.type === 'phone') {
      if (!/^1[3-9]\d{9}$/.test(value)) errors.push(rule.message || '手机号格式不正确');
    } else if (rule.type === 'number') {
      if (isNaN(Number(value))) errors.push(rule.message || '请输入数字');
    }

    if (rule.min !== undefined) {
      if (typeof value === 'string' && value.length < rule.min)
        errors.push(rule.message || `${label}至少${rule.min}个字符`);
      else if (typeof value === 'number' && value < rule.min)
        errors.push(rule.message || `${label}不能小于${rule.min}`);
    }
    if (rule.max !== undefined) {
      if (typeof value === 'string' && value.length > rule.max)
        errors.push(rule.message || `${label}最多${rule.max}个字符`);
      else if (typeof value === 'number' && value > rule.max)
        errors.push(rule.message || `${label}不能大于${rule.max}`);
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message || `${label}格式不正确`);
    }

    if (rule.validator) {
      try { await Promise.resolve(rule.validator(rule, value)); }
      catch (err: any) { errors.push(err.message || rule.message || '校验失败'); }
    }

    if (rule.asyncValidator) {
      try { await Promise.resolve(rule.asyncValidator(rule, value)); }
      catch (err: any) { errors.push(err.message || rule.message || '校验失败'); }
    }
  }

  return errors;
}

// ==================== Internal Store ====================

/**
 * Internal store that backs the FormInstance.
 * Created by useForm() and shared between the hook return value and the <Form> component.
 */
class FormStore {
  store: Record<string, any> = {};
  errors: Record<string, string[]> = {};
  fields: Record<string, { rules: Rule[]; label: string }> = {};
  itemRefs: Record<string, HTMLDivElement | null> = {};
  initialValues: Record<string, any> = {};
  validateTrigger: string[] = ['onChange'];
  onValuesChange?: (changed: any, all: any) => void;
  onFinish?: (values: any) => void;
  onFinishFailed?: (info: { errorFields: any[] }) => void;

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  setStore(initialValues: Record<string, any>) {
    this.store = JSON.parse(JSON.stringify(initialValues));
    this.initialValues = initialValues;
  }

  getFieldValue(name: string[]): any {
    return getNestedValue(this.store, name);
  }

  setFieldValue(name: string[], value: any) {
    this.store = setNestedValue(this.store, name, value);
    this.notify();
  }

  getFieldsValue(names?: string[][]): any {
    if (!names || names.length === 0) return JSON.parse(JSON.stringify(this.store));
    const result: Record<string, any> = {};
    for (const name of names) {
      result[name.join('.')] = getNestedValue(this.store, name);
    }
    return result;
  }

  setFieldsValue(values: any) {
    if (values && typeof values === 'object') {
      this.store = { ...this.store, ...values };
      if (this.onValuesChange) {
        this.onValuesChange(values, this.store);
      }
      this.notify();
    }
  }

  resetFields(names?: string[][]) {
    if (!names || names.length === 0) {
      this.store = JSON.parse(JSON.stringify(this.initialValues));
      this.errors = {};
    } else {
      for (const name of names) {
        const initial = getNestedValue(this.initialValues, name);
        this.store = setNestedValue(this.store, name, initial);
        delete this.errors[name.join('.')];
      }
    }
    this.notify();
  }

  clearValidate(names?: string[][]) {
    if (!names || names.length === 0) {
      this.errors = {};
    } else {
      for (const name of names) {
        delete this.errors[name.join('.')];
      }
    }
    this.notify();
  }

  registerField(name: string[], rules: Rule[], label: string): () => void {
    const key = name.join('.');
    this.fields[key] = { rules, label };
    return () => {
      delete this.fields[key];
      delete this.errors[key];
    };
  }

  registerItemRef(name: string[], ref: React.MutableRefObject<HTMLDivElement | null>) {
    const key = name.join('.');
    this.itemRefs[key] = ref.current;
  }

  unregisterItemRef(name: string[]) {
    delete this.itemRefs[name.join('.')];
  }

  async validateFields(names?: string[][]): Promise<any> {
    let fieldsToValidate: string[][];
    if (!names || names.length === 0) {
      fieldsToValidate = Object.keys(this.fields).map((k) => k.split('.'));
    } else {
      fieldsToValidate = names;
    }

    const errorFields: any[] = [];
    const allValues = JSON.parse(JSON.stringify(this.store));

    for (const name of fieldsToValidate) {
      const key = name.join('.');
      const field = this.fields[key];
      if (!field) continue;

      const value = getNestedValue(this.store, name);
      if (field.rules.length > 0) {
        const errs = await validateValue(value, field.rules, field.label);
        if (errs.length > 0) {
          this.errors[key] = errs;
          errorFields.push({ name: key, errors: errs });
        } else {
          delete this.errors[key];
        }
      }
    }

    this.notify();

    if (errorFields.length > 0) {
      const err: any = new Error('Form validation failed');
      err.errorFields = errorFields;
      err.values = allValues;
      return Promise.reject(err);
    }
    return Promise.resolve(allValues);
  }

  async validateField(name: string[]): Promise<string[]> {
    const key = name.join('.');
    const field = this.fields[key];
    if (!field) return [];

    const value = getNestedValue(this.store, name);
    const errs = await validateValue(value, field.rules, field.label);
    if (errs.length > 0) {
      this.errors[key] = errs;
    } else {
      delete this.errors[key];
    }
    this.notify();
    return errs;
  }

  async submit(): Promise<any> {
    try {
      const values = await this.validateFields();
      if (this.onFinish) this.onFinish(values);
      return values;
    } catch (err: any) {
      if (this.onFinishFailed && err.errorFields) {
        this.onFinishFailed({ errorFields: err.errorFields });
      }
      // Don't re-throw — validation failure is already communicated via onFinishFailed callback.
      // The caller (handleSubmit) has no .catch() and this would cause an unhandled rejection.
    }
  }

  scrollToField(name: string | (string | number)[]) {
    const key = normalizeName(name as any).join('.');
    const el = this.itemRefs[key];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ==================== Form Context ====================

interface FormContextValue {
  store: FormStore;
  layout: FormLayout;
  size: FormSize;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  labelAlign: 'left' | 'right';
  disabled: boolean;
  requiredMark: boolean | 'optional';
  validateTrigger: string[];
}

const FormContext = React.createContext<FormContextValue | null>(null);

function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('Form.Item must be used within a Form component');
  return ctx;
}

// ==================== useForm Hook ====================

export function useForm(form?: FormInstance): [FormInstance] {
  const storeRef = useRef<FormStore>(new FormStore());
  const store = storeRef.current;

  const instance: FormInstance = useMemo(() => ({
    __store: store,
    getFieldValue: (name) => store.getFieldValue(normalizeName(name)),
    getFieldsValue: (nameList) => {
      if (!nameList) return store.getFieldsValue();
      return store.getFieldsValue(nameList.map(normalizeName));
    },
    getFieldsValueRaw: () => JSON.parse(JSON.stringify(store.store)),
    setFieldValue: (name, value) => store.setFieldValue(normalizeName(name), value),
    setFieldsValue: (values) => store.setFieldsValue(values),
    resetFields: (nameList) => {
      if (!nameList) return store.resetFields();
      store.resetFields(nameList.map(normalizeName));
    },
    validateFields: (nameList) => {
      if (!nameList) return store.validateFields();
      return store.validateFields(nameList.map(normalizeName));
    },
    submit: () => store.submit(),
    scrollToField: (name) => store.scrollToField(name),
    clearValidate: (nameList) => {
      if (!nameList) return store.clearValidate();
      store.clearValidate(nameList.map(normalizeName));
    },
  }), [store]);

  return [form || instance];
}

// ==================== Internal Form ====================

const InternalForm: React.FC<FormProps> = ({
  form,
  layout = 'horizontal',
  size = 'middle',
  labelCol,
  wrapperCol,
  labelAlign = 'left',
  disabled = false,
  requiredMark = true,
  validateTrigger = 'onChange',
  initialValues = {},
  onFinish,
  onFinishFailed,
  onValuesChange,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const formTheme = (context?.components?.Form || {}) as Record<string, any>;

  // Use the store from useForm() or create a new one
  const [localStore] = useState(() => new FormStore());
  const store: FormStore = form?.__store || localStore;

  // Initialize store with current values
  useEffect(() => {
    store.setStore(initialValues);
    store.notify();
  }, []);

  // Keep callbacks in sync
  useEffect(() => {
    store.onFinish = onFinish;
    store.onFinishFailed = onFinishFailed;
    store.onValuesChange = onValuesChange;
    store.validateTrigger = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
  });

  const [, forceUpdate] = useState({});

  // Subscribe to store changes
  useEffect(() => {
    return store.subscribe(() => forceUpdate({}));
  }, [store]);

  const validateTriggerList = store.validateTrigger;

  const contextValue: FormContextValue = useMemo(() => ({
    store,
    layout,
    size,
    labelCol,
    wrapperCol,
    labelAlign,
    disabled,
    requiredMark,
    validateTrigger: validateTriggerList,
  }), [store, layout, size, labelCol, wrapperCol, labelAlign, disabled, requiredMark, validateTriggerList]);

  // CSS variables from theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (formTheme.borderRadius !== undefined) cssVars['--soui-form-border-radius'] = `${formTheme.borderRadius}px`;
  if (formTheme.fontSize !== undefined) cssVars['--soui-form-font-size'] = `${formTheme.fontSize}px`;
  if (formTheme.colorPrimary !== undefined) cssVars['--soui-form-color-primary'] = formTheme.colorPrimary;
  if (formTheme.colorError !== undefined) cssVars['--soui-form-color-error'] = formTheme.colorError;
  if (formTheme.labelFontSize !== undefined) cssVars['--soui-form-label-font-size'] = `${formTheme.labelFontSize}px`;
  if (formTheme.labelWidth !== undefined) cssVars['--soui-form-label-width'] = `${formTheme.labelWidth}px`;
  if (formTheme.labelColor !== undefined) cssVars['--soui-form-label-color'] = formTheme.labelColor;

  const formClassName = classNames(
    'soui-form',
    `soui-form-${layout}`,
    `soui-form-${size}`,
    { 'soui-form-disabled': disabled },
    className
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.submit().catch(() => {});
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={formClassName}
        style={{ ...cssVars, ...style }}
        onSubmit={handleSubmit}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// ==================== Form.Item ====================

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  required,
  dependencies,
  rules,
  validateStatus,
  extra,
  labelCol,
  wrapperCol,
  labelAlign,
  layout,
  initialValue,
  noStyle,
  shouldUpdate,
  valuePropName,
  hasFeedback,
  className,
  style,
  children,
}) => {
  const ctx = useFormContext();
  const { store } = ctx;
  const itemRef = useRef<HTMLDivElement>(null);

  const namePath = name !== undefined ? normalizeName(name) : [];
  const nameKey = namePath.join('.');

  // Register field
  useEffect(() => {
    if (namePath.length === 0) return;

    const ruleList: Rule[] = (rules || []).map((r) => ({
      ...r,
      whitespace: r.whitespace,
      validateTrigger: r.validateTrigger
        ? Array.isArray(r.validateTrigger) ? r.validateTrigger : [r.validateTrigger]
        : ctx.validateTrigger,
    }));

    // Auto-inject required rule when `required` prop is set and no rule already covers it
    if (required && !ruleList.some((r) => r.required)) {
      ruleList.unshift({
        required: true,
        message: `${label || nameKey}不能为空`,
        validateTrigger: ctx.validateTrigger,
      });
    }

    const unregister = store.registerField(namePath, ruleList, String(label || nameKey));

    // Set initial value if provided
    if (initialValue !== undefined) {
      const current = getNestedValue(store.store, namePath);
      if (current === undefined) {
        store.store = setNestedValue(store.store, namePath, initialValue);
        store.notify();
      }
    }

    return () => {
      unregister();
      store.unregisterItemRef(namePath);
    };
  }, [namePath.join('.'), rules, required, label, ctx.validateTrigger]);

  // Register item ref
  useEffect(() => {
    if (namePath.length > 0) store.registerItemRef(namePath, itemRef);
  }, [namePath.join('.')]);

  // Subscribe to store for re-renders
  const [, forceUpdate] = useState({});
  useEffect(() => {
    return store.subscribe(() => forceUpdate({}));
  }, [store]);

  // Dependencies: re-validate when dependency fields change
  useEffect(() => {
    if (!dependencies || dependencies.length === 0 || namePath.length === 0) return;

    // When dependencies change, re-validate this field
    const unsub = store.subscribe(() => {
      // Simple: just trigger re-render (validation will happen on next validate call)
    });
    return unsub;
  }, [dependencies?.map((d) => normalizeName(d).join('.')).join(',')]);

  // Handle render-function children (for shouldUpdate / dependencies pattern)
  if (typeof children === 'function') {
    // Build a mini form instance for the render function — this points to the
    // Form that owns this FormItem, NOT any outer useForm() instance.
    const renderForm = {
      getFieldValue: (n: string) => store.getFieldValue(normalizeName(n)),
      getFieldsValue: (nList?: any[]) => {
        if (!nList) return store.getFieldsValue();
        return store.getFieldsValue(nList.map(normalizeName));
      },
      setFieldValue: (n: string, v: any) => store.setFieldValue(normalizeName(n), v),
      setFieldsValue: (v: any) => store.setFieldsValue(v),
      resetFields: (nList?: any[]) => {
        if (!nList) return store.resetFields();
        store.resetFields(nList.map(normalizeName));
      },
    };

    const rendered = (children as Function)(renderForm);

    if (noStyle) {
      return <>{rendered}</>;
    }

    return (
      <div ref={itemRef} className={classNames('soui-form-item', className)} style={style}>
        {rendered}
      </div>
    );
  }

  // Get value
  const value = namePath.length > 0 ? (store.getFieldValue(namePath) ?? null) : undefined;

  // Get errors
  const errors = nameKey ? (store.errors[nameKey] || []) : [];

  // Determine status
  const status = validateStatus || (errors.length > 0 ? 'error' : undefined);

  // Determine if required
  const isRequired = required !== undefined
    ? required
    : rules?.some((r) => r.required) || false;

  let showRequiredMark = false;
  let showOptionalMark = false;
  if (ctx.requiredMark === 'optional') {
    // 'optional' mode: no asterisk, show "(选填)" on non-required fields that have a name
    showOptionalMark = !isRequired && namePath.length > 0;
  } else {
    showRequiredMark = isRequired && ctx.requiredMark !== false;
  }

  // Layout
  const itemLayout = layout || ctx.layout;
  const mergedLabelCol = labelCol !== undefined ? labelCol : ctx.labelCol;
  const mergedWrapperCol = wrapperCol !== undefined ? wrapperCol : ctx.wrapperCol;
  const mergedLabelAlign = labelAlign !== undefined ? labelAlign : ctx.labelAlign;

  // Handle value change from child
  const triggerChange = useCallback((changedValue: any) => {
    if (namePath.length === 0) return;
    store.setFieldValue(namePath, changedValue);
    if (store.onValuesChange) {
      const all = store.getFieldsValue();
      store.onValuesChange({ [nameKey]: changedValue }, all);
    }

    // Auto-validate on change if configured
    const fieldRules = store.fields[nameKey]?.rules || [];
    const shouldValidateOnChange = fieldRules.some(
      (r) => r.validateTrigger?.includes('onChange')
    );
    if (shouldValidateOnChange) {
      setTimeout(() => store.validateField(namePath), 0);
    }
  }, [namePath]);

  // Handle blur for onBlur validation
  const handleBlur = useCallback(() => {
    if (namePath.length === 0) return;
    const fieldRules = store.fields[nameKey]?.rules || [];
    const shouldValidateOnBlur = fieldRules.some(
      (r) => r.validateTrigger?.includes('onBlur')
    );
    if (shouldValidateOnBlur) {
      store.validateField(namePath);
    }
  }, [namePath]);

  // Clone child with value/onChange
  const getControlled = (child: React.ReactNode): React.ReactNode => {
    if (!isValidElement(child)) return child;

    const childProps: Record<string, any> = {};

    // Propagate form size and disabled to all child controls
    if (ctx.size && !(child.props as any).size) {
      childProps.size = ctx.size;
    }
    if (ctx.disabled) childProps.disabled = true;

    // Value/onChange/onBlur only for named fields
    if (namePath.length > 0) {
      const propName = valuePropName || 'value';
      childProps[propName] = value;

      childProps.onChange = (...args: any[]) => {
        const val = args[0];
        let extracted: any;
        if (val && typeof val === 'object' && 'target' in val) {
          // Native input event: { target: { value: ... } }
          extracted = val.target.value;
        } else if (propName === 'fileList' && val && typeof val === 'object' && 'fileList' in val) {
          // Upload onChange: { file, fileList }
          extracted = val.fileList;
        } else {
          extracted = val;
        }
        triggerChange(extracted);
        if ((child.props as any).onChange) {
          (child.props as any).onChange(...args);
        }
      };

      childProps.onBlur = (...args: any[]) => {
        handleBlur();
        if ((child.props as any).onBlur) {
          (child.props as any).onBlur(...args);
        }
      };
    }

    // If nothing to inject, return original child
    if (Object.keys(childProps).length === 0) return child;

    return cloneElement(child as React.ReactElement, childProps);
  };

  const controlledChildren = getControlled(children);

  if (noStyle) {
    return (
      <>
        <div style={{ display: 'block' }}>{controlledChildren}</div>
        {errors.length > 0 && (
          <div
            className="soui-form-item soui-form-item-no-style-explain"
            style={{ marginBottom: 0, display: 'block' }}
          >
            <div className="soui-form-item-explain">
              <div className="soui-form-item-explain-error">{errors[0]}</div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Form item class names
  const itemClassName = classNames(
    'soui-form-item',
    `soui-form-item-${itemLayout}`,
    {
      'soui-form-item-has-error': errors.length > 0,
      'soui-form-item-is-validating': status === 'validating',
      'soui-form-item-has-feedback': hasFeedback && status,
    },
    className
  );

  // Label style
  const labelStyle: React.CSSProperties = {};
  if (mergedLabelCol?.span) {
    labelStyle.flex = `0 0 ${(mergedLabelCol.span / 24) * 100}%`;
    labelStyle.maxWidth = `${(mergedLabelCol.span / 24) * 100}%`;
  }
  if (mergedLabelCol?.offset) {
    labelStyle.marginLeft = `${(mergedLabelCol.offset / 24) * 100}%`;
  }

  // Wrapper style
  const wrapperStyle: React.CSSProperties = {};
  if (itemLayout === 'horizontal' && mergedWrapperCol?.span) {
    wrapperStyle.flex = `0 0 ${(mergedWrapperCol.span / 24) * 100}%`;
    wrapperStyle.maxWidth = `${(mergedWrapperCol.span / 24) * 100}%`;
  }
  if (itemLayout === 'horizontal' && mergedWrapperCol?.offset) {
    wrapperStyle.marginLeft = `${(mergedWrapperCol.offset / 24) * 100}%`;
  }

  return (
    <div
      ref={itemRef}
      className={itemClassName}
      style={style}
      data-status={status}
    >
      {label && itemLayout !== 'vertical' && (
        <div
          className={classNames('soui-form-item-label', {
            [`soui-form-item-label-${mergedLabelAlign}`]: true,
          })}
          style={mergedLabelCol?.span ? labelStyle : undefined}
        >
          <label className={classNames({ 'soui-form-item-required': showRequiredMark })} title={typeof label === 'string' ? label : undefined}>
            {label}
            {showOptionalMark && <span className="soui-form-item-optional">(选填)</span>}
          </label>
        </div>
      )}

      <div
        className={classNames('soui-form-item-control', {
          [`soui-form-item-${status}`]: status,
        })}
        style={mergedWrapperCol?.span ? wrapperStyle : undefined}
      >
        {itemLayout === 'vertical' && label && (
          <div
            className={classNames('soui-form-item-label', 'soui-form-item-label-vertical', {
              [`soui-form-item-label-${mergedLabelAlign}`]: true,
            })}
          >
            <label className={classNames({ 'soui-form-item-required': showRequiredMark })} title={typeof label === 'string' ? label : undefined}>
              {label}
              {showOptionalMark && <span className="soui-form-item-optional">(选填)</span>}
            </label>
          </div>
        )}

        <div className="soui-form-item-control-input">
          <div className="soui-form-item-control-input-content">
            {controlledChildren}
          </div>
        </div>

        {(errors.length > 0 || extra) && (
          <div className="soui-form-item-explain">
            {errors.length > 0 && (
              <div className="soui-form-item-explain-error">{errors[0]}</div>
            )}
            {extra && !errors.length && (
              <div className="soui-form-item-explain-extra">{extra}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Form.List ====================

const FormList: React.FC<FormListProps> = ({ name, children }) => {
  const { store } = useFormContext();
  const namePath = normalizeName(name);
  const list: any[] = getNestedValue(store.store, namePath) || [];

  const operations: FormListOperations = {
    add: (defaultValue?: any) => {
      const newList = [...list, defaultValue !== undefined ? defaultValue : ''];
      store.setFieldValue(namePath, newList);
    },
    remove: (index: number) => {
      const newList = list.filter((_, i) => i !== index);
      store.setFieldValue(namePath, newList);
    },
    move: (from: number, to: number) => {
      const newList = [...list];
      const [removed] = newList.splice(from, 1);
      newList.splice(to, 0, removed);
      store.setFieldValue(namePath, newList);
    },
  };

  const fields: FormListFieldData[] = list.map((_, index) => ({
    name: index,
    key: index,
    fieldKey: index,
  }));

  return <>{children(fields, operations)}</>;
};

// ==================== Form.Provider ====================

interface FormProviderProps {
  onFormChange?: (name: string, changed: any, all: any) => void;
  onFormFinish?: (name: string, values: any) => void;
  children?: React.ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const formContext = useContext(FormContext);
  const [dummyStore] = useState(() => new FormStore());

  return (
    <FormContext.Provider
      value={formContext || {
        store: dummyStore,
        layout: 'horizontal',
        size: 'middle',
        labelAlign: 'left',
        disabled: false,
        requiredMark: true,
        validateTrigger: ['onChange'],
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// ==================== useWatch Hook ====================

export function useWatch(dependencyPath?: string | number | (string | number)[]): any {
  const { store } = useFormContext();
  const [value, setValue] = useState(() =>
    dependencyPath ? store.getFieldValue(normalizeName(dependencyPath)) : undefined
  );

  useEffect(() => {
    const path = dependencyPath ? normalizeName(dependencyPath) : [];
    if (path.length === 0) return;

    return store.subscribe(() => {
      const current = store.getFieldValue(path);
      setValue((prev: any) => (prev !== current ? current : prev));
    });
  }, [dependencyPath]);

  return value;
}

// ==================== Compound Components ====================

interface CompoundedComponent extends React.FC<FormProps> {
  Item: typeof FormItem;
  List: typeof FormList;
  Provider: typeof FormProvider;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
}

const Form = InternalForm as CompoundedComponent;
Form.Item = FormItem;
Form.List = FormList;
Form.Provider = FormProvider;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;
