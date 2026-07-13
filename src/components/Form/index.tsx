import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  forwardRef,
  useImperativeHandle,
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

/** 表单项额外信息 */
export interface FormItemExtra {
  /** 校验状态 */
  status?: 'error' | 'warning' | 'success' | 'validating';
  /** 校验错误信息 */
  errors?: React.ReactNode[];
  /** 额外提示信息 */
  extra?: React.ReactNode;
}

/** 校验规则配置 */
export interface RuleConfig {
  /** 必填 */
  required?: boolean;
  /** 错误提示文本（配合 required 使用） */
  message?: string;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 最小值/最小长度 */
  min?: number;
  /** 最大值/最大长度 */
  max?: number;
  /** 校验类型：email | url | number | phone */
  type?: 'email' | 'url' | 'number' | 'phone';
  /** 自定义同步校验器 */
  validator?: (value: any, rule: RuleConfig) => Promise<void> | void;
  /** 自定义异步校验器 */
  asyncValidator?: (value: any, rule: RuleConfig) => Promise<void>;
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
  validator?: (value: any, rule: Rule) => Promise<void> | void;
  asyncValidator?: (value: any, rule: Rule) => Promise<void>;
  validateTrigger?: string[];
}

/** Form.Item 属性 */
export interface FormItemProps {
  /** 字段名，支持嵌套路径如 'user.name' 或数组索引如 'users.0.name' */
  name?: string | number | (string | number)[];
  /** 标签文本 */
  label?: React.ReactNode;
  /** 是否显示星号（默认跟随 Form.requiredMark） */
  required?: boolean;
  /** 依赖字段，变化时触发当前字段重新校验 */
  dependencies?: (string | number | (string | number)[])[];
  /** 校验规则 */
  rules?: RuleConfig[];
  /** 是否单独控制校验状态 */
  validateStatus?: 'error' | 'warning' | 'success' | 'validating';
  /** 额外提示信息 */
  extra?: React.ReactNode;
  /** 标签宽度（像素） */
  labelCol?: { span?: number; offset?: number };
  /** 控件宽度 */
  wrapperCol?: { span?: number; offset?: number };
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 标签与字段的上下/左右布局 */
  layout?: 'horizontal' | 'vertical';
  /** 初始值 */
  initialValue?: any;
  /** 移除表单项样式但保留值收集 */
  noStyle?: boolean;
  /** 字段值变化时触发重新渲染 */
  shouldUpdate?: boolean | ((prev: any, cur: any) => boolean);
  /** 值转换（如 Switch 的 checked → value） */
  valuePropName?: string;
  /** 是否使用额外渲染插槽 */
  hasFeedback?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

/** FormList 字段数据 */
export interface FormListFieldData {
  /** 字段名 */
  name: number;
  /** 唯一 key */
  key: number;
  /** 字段路径 */
  fieldKey: number;
}

/** FormList 操作方法 */
export interface FormListOperations {
  /** 添加一个空字段 */
  add: (defaultValue?: any) => void;
  /** 删除指定索引的字段 */
  remove: (index: number) => void;
  /** 移动字段位置 */
  move: (from: number, to: number) => void;
}

/** FormList 属性 */
export interface FormListProps {
  /** 字段名 */
  name: string | number | (string | number)[];
  /** 渲染函数 */
  children: (fields: FormListFieldData[], operations: FormListOperations) => React.ReactNode;
}

/** FormInstance - useForm 返回的表单实例 */
export interface FormInstance {
  /** 获取单个字段值 */
  getFieldValue: (name: string) => any;
  /** 获取所有字段值 */
  getFieldsValue: (nameList?: (string | number | (string | number)[])[]) => any;
  /** 获取全部原始值 */
  getFieldsValueRaw: () => any;
  /** 设置单个字段值 */
  setFieldValue: (name: string | (string | number)[], value: any) => void;
  /** 批量设置字段值 */
  setFieldsValue: (values: any) => void;
  /** 重置所有字段 */
  resetFields: (nameList?: (string | number | (string | number)[])[]) => void;
  /** 校验所有或指定字段 */
  validateFields: (nameList?: (string | number | (string | number)[])[]) => Promise<any>;
  /** 提交表单 */
  submit: () => Promise<any>;
  /** 滚动到指定字段 */
  scrollToField: (name: string | (string | number)[]) => void;
  /** 清除校验状态 */
  clearValidate: (nameList?: (string | number | (string | number)[])[]) => void;
}

/** Form 属性 */
export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /** 表单布局 */
  layout?: FormLayout;
  /** 表单尺寸 */
  size?: FormSize;
  /** 表单实例 */
  form?: FormInstance;
  /** 初始值 */
  initialValues?: Record<string, any>;
  /** 标签列宽（horizontal 布局） */
  labelCol?: { span?: number; offset?: number };
  /** 控件列宽（horizontal 布局） */
  wrapperCol?: { span?: number; offset?: number };
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 是否禁用 */
  disabled?: boolean;
  /** 必填标记模式 */
  requiredMark?: boolean | 'optional';
  /** 校验触发时机 */
  validateTrigger?: string | string[];
  /** 表单提交成功回调 */
  onFinish?: (values: any) => void;
  /** 表单提交失败回调 */
  onFinishFailed?: (info: { errorFields: any[] }) => void;
  /** 字段值变化回调 */
  onValuesChange?: (changed: any, all: any) => void;
  /** 子元素 */
  children?: React.ReactNode;
}

// ==================== Utility Functions ====================

/** 将字段名标准化为字符串数组 */
function normalizeName(name: string | number | (string | number)[]): string[] {
  if (name === undefined || name === null) return [];
  if (typeof name === 'number') return [String(name)];
  if (Array.isArray(name)) return name.map((n) => String(n));
  return [name];
}

/** 获取嵌套值 */
function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key];
    return undefined;
  }, obj);
}

/** 设置嵌套值（返回新对象） */
function setNestedValue(obj: any, path: string[], value: any): any {
  if (path.length === 0) return value;
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  const [head, ...rest] = path;
  result[head] = rest.length === 0 ? value : setNestedValue(result[head], rest, value);
  return result;
}

/** 删除嵌套键（返回新对象） */
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

/** 校验单个值 */
async function validateValue(
  value: any,
  rules: Rule[],
  label: string
): Promise<string[]> {
  const errors: string[] = [];

  for (const rule of rules) {
    // Required check
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

    // Skip further validation if value is empty and not required
    if (value === undefined || value === null || value === '') {
      continue;
    }

    // Type validation
    if (rule.type === 'email') {
      const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRe.test(value)) {
        errors.push(rule.message || '邮箱格式不正确');
      }
    } else if (rule.type === 'url') {
      try {
        new URL(value);
      } catch {
        errors.push(rule.message || 'URL 格式不正确');
      }
    } else if (rule.type === 'phone') {
      const phoneRe = /^1[3-9]\d{9}$/;
      if (!phoneRe.test(value)) {
        errors.push(rule.message || '手机号格式不正确');
      }
    } else if (rule.type === 'number') {
      if (isNaN(Number(value))) {
        errors.push(rule.message || '请输入数字');
      }
    }

    // Min/Max
    if (rule.min !== undefined) {
      if (typeof value === 'string' && value.length < rule.min) {
        errors.push(rule.message || `${label}至少${rule.min}个字符`);
      } else if (typeof value === 'number' && value < rule.min) {
        errors.push(rule.message || `${label}不能小于${rule.min}`);
      }
    }
    if (rule.max !== undefined) {
      if (typeof value === 'string' && value.length > rule.max) {
        errors.push(rule.message || `${label}最多${rule.max}个字符`);
      } else if (typeof value === 'number' && value > rule.max) {
        errors.push(rule.message || `${label}不能大于${rule.max}`);
      }
    }

    // Pattern
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message || `${label}格式不正确`);
    }

    // Custom sync validator
    if (rule.validator) {
      try {
        await Promise.resolve(rule.validator(value, rule));
      } catch (err: any) {
        errors.push(err.message || rule.message || '校验失败');
      }
    }

    // Custom async validator
    if (rule.asyncValidator) {
      try {
        await Promise.resolve(rule.asyncValidator(value, rule));
      } catch (err: any) {
        errors.push(err.message || rule.message || '校验失败');
      }
    }
  }

  return errors;
}

// ==================== Form Context ====================

interface FormContextValue {
  form?: FormInstance;
  layout: FormLayout;
  size: FormSize;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  labelAlign: 'left' | 'right';
  disabled: boolean;
  requiredMark: boolean | 'optional';
  validateTrigger: string[];
  registerField: (name: string[], ruleList: Rule[], label: string) => () => void;
  getFieldValue: (name: string[]) => any;
  setFieldValue: (name: string[], value: any) => void;
  getFieldsValue: (names?: string[][]) => any;
  setFieldsValue: (values: any) => void;
  resetFields: (names?: string[][]) => void;
  validateFields: (names?: string[][]) => Promise<any>;
  submit: () => Promise<any>;
  clearValidate: (names?: string[][]) => void;
  registerFormItem: (name: string[], itemRef: React.MutableRefObject<HTMLDivElement | null>) => void;
  unregisterFormItem: (name: string[]) => void;
  onValuesChange?: (changed: any, all: any) => void;
  __storeRef: React.MutableRefObject<Record<string, any>>;
  __errorsRef: React.MutableRefObject<Record<string, string[]>>;
  __fieldsRef: React.MutableRefObject<Record<string, { rules: Rule[]; label: string }>>;
  __itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  __setForceUpdate: () => void;
}

const FormContext = React.createContext<FormContextValue | null>(null);

function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('Form must be used within a Form.Provider or wrapped by useForm');
  }
  return ctx;
}

// ==================== useForm Hook ====================

export function useForm(form?: FormInstance): [FormInstance] {
  const formRef = useRef<FormInstance | null>(null);

  if (!formRef.current) {
    // Create a stub that will be replaced by InternalForm
    formRef.current = form || {
      getFieldValue: () => undefined,
      getFieldsValue: () => ({}),
      getFieldsValueRaw: () => ({}),
      setFieldValue: () => {},
      setFieldsValue: () => {},
      resetFields: () => {},
      validateFields: () => Promise.reject(new Error('Form not initialized')),
      submit: () => Promise.reject(new Error('Form not initialized')),
      scrollToField: () => {},
      clearValidate: () => {},
    };
  }

  return [formRef.current as FormInstance];
}

// ==================== Internal Form ====================

interface InternalFormProps extends FormProps {
  _form?: FormInstance;
}

const InternalForm: React.FC<InternalFormProps> = ({
  layout = 'horizontal',
  size = 'middle',
  labelCol,
  wrapperCol,
  labelAlign = 'right',
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

  const __storeRef = useRef<Record<string, any>>(initialValues);
  const __errorsRef = useRef<Record<string, string[]>>({});
  const __fieldsRef = useRef<Record<string, { rules: Rule[]; label: string }>>({});
  const __itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [, forceUpdate] = useState({});

  // Deep clone initial values to avoid mutation
  useEffect(() => {
    __storeRef.current = JSON.parse(JSON.stringify(initialValues));
  }, []);

  const __setForceUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  // Resolve validate trigger
  const validateTriggerList = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];

  // ==================== Field Operations ====================

  const getFieldValue = useCallback((name: string[]): any => {
    return getNestedValue(__storeRef.current, name);
  }, []);

  const setFieldValue = useCallback((name: string[], value: any) => {
    __storeRef.current = setNestedValue(__storeRef.current, name, value);
    __setForceUpdate();
  }, []);

  const getFieldsValue = useCallback((names?: string[][]): any => {
    if (!names || names.length === 0) {
      return JSON.parse(JSON.stringify(__storeRef.current));
    }
    const result: Record<string, any> = {};
    for (const name of names) {
      result[name.join('.')] = getNestedValue(__storeRef.current, name);
    }
    return result;
  }, []);

  const setFieldsValue = useCallback((values: any) => {
    if (values && typeof values === 'object') {
      const merged = { ...__storeRef.current, ...values };
      __storeRef.current = merged;
      if (onValuesChange) {
        onValuesChange(values, merged);
      }
      __setForceUpdate();
    }
  }, []);

  const resetFields = useCallback((names?: string[][]) => {
    if (!names || names.length === 0) {
      __storeRef.current = JSON.parse(JSON.stringify(initialValues));
      __errorsRef.current = {};
      __setForceUpdate();
    } else {
      for (const name of names) {
        const key = name.join('.');
        const initial = getNestedValue(initialValues, name);
        __storeRef.current = setNestedValue(__storeRef.current, name, initial);
        delete __errorsRef.current[key];
      }
      __setForceUpdate();
    }
  }, []);

  const clearValidate = useCallback((names?: string[][]) => {
    if (!names || names.length === 0) {
      __errorsRef.current = {};
    } else {
      for (const name of names) {
        delete __errorsRef.current[name.join('.')];
      }
    }
    __setForceUpdate();
  }, []);

  const scrollToField = useCallback((name: string | (string | number)[]) => {
    const key = normalizeName(name as any).join('.');
    const el = __itemRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const validateFields = useCallback(async (names?: string[][]): Promise<any> => {
    // Determine which fields to validate
    let fieldsToValidate: string[][];
    if (!names || names.length === 0) {
      fieldsToValidate = Object.keys(__fieldsRef.current).map((k) => k.split('.'));
    } else {
      fieldsToValidate = names;
    }

    const errorFields: any[] = [];
    const values: Record<string, any> = {};

    // Collect all values
    const allValues = JSON.parse(JSON.stringify(__storeRef.current));

    for (const name of fieldsToValidate) {
      const key = name.join('.');
      const field = __fieldsRef.current[key];
      if (!field) continue;

      const value = getNestedValue(__storeRef.current, name);
      values[key] = value;

      if (field.rules.length > 0) {
        const errors = await validateValue(value, field.rules, field.label);
        if (errors.length > 0) {
          __errorsRef.current[key] = errors;
          errorFields.push({ name: key, errors });
        } else {
          delete __errorsRef.current[key];
        }
      }
    }

    __setForceUpdate();

    if (errorFields.length > 0) {
      const err: any = new Error('Form validation failed');
      err.errorFields = errorFields;
      err.values = allValues;
      return Promise.reject(err);
    }

    return Promise.resolve(allValues);
  }, []);

  const submit = useCallback(async (): Promise<any> => {
    try {
      const values = await validateFields();
      if (onFinish) {
        onFinish(values);
      }
      return values;
    } catch (err: any) {
      if (onFinishFailed && err.errorFields) {
        onFinishFailed({ errorFields: err.errorFields });
      }
      throw err;
    }
  }, [validateFields, onFinish, onFinishFailed]);

  // ==================== Field Registration ====================

  const registerField = useCallback((
    name: string[],
    rules: Rule[],
    label: string
  ): (() => void) => {
    const key = name.join('.');
    __fieldsRef.current[key] = { rules, label };
    return () => {
      delete __fieldsRef.current[key];
      delete __errorsRef.current[key];
    };
  }, []);

  const registerFormItem = useCallback((
    name: string[],
    itemRef: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    const key = name.join('.');
    __itemRefs.current[key] = itemRef.current;
  }, []);

  const unregisterFormItem = useCallback((name: string[]) => {
    const key = name.join('.');
    delete __itemRefs.current[key];
  }, []);

  // ==================== Form Instance ====================

  const formInstance: FormInstance = useMemo(() => ({
    getFieldValue: (name: string) => getFieldValue(normalizeName(name)),
    getFieldsValue: (nameList) => {
      if (!nameList) return getFieldsValue();
      return getFieldsValue(nameList.map(normalizeName));
    },
    getFieldsValueRaw: () => JSON.parse(JSON.stringify(__storeRef.current)),
    setFieldValue: (name, value) => setFieldValue(normalizeName(name), value),
    setFieldsValue: (values) => setFieldsValue(values),
    resetFields: (nameList) => {
      if (!nameList) return resetFields();
      resetFields(nameList.map(normalizeName));
    },
    validateFields: (nameList) => {
      if (!nameList) return validateFields();
      return validateFields(nameList.map(normalizeName));
    },
    submit,
    scrollToField: (name) => scrollToField(name),
    clearValidate: (nameList) => {
      if (!nameList) return clearValidate();
      clearValidate(nameList.map(normalizeName));
    },
  }), [getFieldValue, setFieldValue, getFieldsValue, setFieldsValue, resetFields, validateFields, submit, scrollToField, clearValidate]);

  // Expose form instance to parent via ref
  const contextValue: FormContextValue = useMemo(() => ({
    form: formInstance,
    layout,
    size,
    labelCol,
    wrapperCol,
    labelAlign,
    disabled,
    requiredMark,
    validateTrigger: validateTriggerList,
    registerField,
    getFieldValue,
    setFieldValue,
    getFieldsValue,
    setFieldsValue,
    resetFields,
    validateFields,
    submit,
    clearValidate,
    registerFormItem,
    unregisterFormItem,
    onValuesChange,
    __storeRef,
    __errorsRef,
    __fieldsRef,
    __itemRefs,
    __setForceUpdate,
  }), [formInstance, layout, size, labelCol, wrapperCol, labelAlign, disabled, requiredMark, validateTriggerList, registerField, getFieldValue, setFieldValue, getFieldsValue, setFieldsValue, resetFields, validateFields, submit, clearValidate, registerFormItem, unregisterFormItem, onValuesChange]);

  // CSS variables from theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (formTheme.borderRadius !== undefined) {
    cssVars['--soui-form-border-radius'] = `${formTheme.borderRadius}px`;
  }
  if (formTheme.fontSize !== undefined) {
    cssVars['--soui-form-font-size'] = `${formTheme.fontSize}px`;
  }
  if (formTheme.colorPrimary !== undefined) {
    cssVars['--soui-form-color-primary'] = formTheme.colorPrimary;
  }
  if (formTheme.colorError !== undefined) {
    cssVars['--soui-form-color-error'] = formTheme.colorError;
  }
  if (formTheme.labelFontSize !== undefined) {
    cssVars['--soui-form-label-font-size'] = `${formTheme.labelFontSize}px`;
  }
  if (formTheme.labelWidth !== undefined) {
    cssVars['--soui-form-label-width'] = `${formTheme.labelWidth}px`;
  }
  if (formTheme.labelColor !== undefined) {
    cssVars['--soui-form-label-color'] = formTheme.labelColor;
  }

  const mergedStyle = { ...cssVars, ...style };

  const formClassName = classNames(
    'soui-form',
    `soui-form-${layout}`,
    `soui-form-${size}`,
    { 'soui-form-disabled': disabled },
    className
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={formClassName}
        style={mergedStyle}
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
  const itemRef = useRef<HTMLDivElement>(null);
  const isRegisteredRef = useRef(false);

  const namePath = name !== undefined ? normalizeName(name) : [];
  const nameKey = namePath.join('.');

  // Register field
  useEffect(() => {
    if (namePath.length === 0) return;

    const ruleList: Rule[] = (rules || []).map((r) => ({
      ...r,
      validateTrigger: r.validateTrigger
        ? Array.isArray(r.validateTrigger)
          ? r.validateTrigger
          : [r.validateTrigger]
        : ctx.validateTrigger,
    }));

    const unregister = ctx.registerField(namePath, ruleList, String(label || nameKey));

    // If there's an initial value, set it
    if (initialValue !== undefined) {
      const current = getNestedValue(ctx.__storeRef.current, namePath);
      if (current === undefined) {
        const updated = setNestedValue(ctx.__storeRef.current, namePath, initialValue);
        ctx.__storeRef.current = updated;
      }
    }

    isRegisteredRef.current = true;
    return () => {
      isRegisteredRef.current = false;
      unregister();
      ctx.unregisterFormItem(namePath);
    };
  }, [namePath.join('.'), rules, ctx.validateTrigger]);

  // Register item ref
  useEffect(() => {
    if (namePath.length > 0) {
      ctx.registerFormItem(namePath, itemRef);
    }
  }, [namePath.join('.')]);

  // Should update logic
  const [, forceUpdate] = useState({});
  const prevValuesRef = useRef<any>(null);

  if (shouldUpdate) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const prev = prevValuesRef.current;
      const curr = ctx.__storeRef.current;
      const should =
        typeof shouldUpdate === 'function'
          ? shouldUpdate(prev || {}, curr || {})
          : prev !== curr;
      prevValuesRef.current = curr;
      if (should) {
        forceUpdate({});
      }
    }, [ctx.__storeRef.current]);
  }

  // Get value
  const value = namePath.length > 0 ? ctx.getFieldValue(namePath) : undefined;

  // Get errors
  const errors = nameKey ? (ctx.__errorsRef.current[nameKey] || []) : [];

  // Determine status
  const status = validateStatus || (errors.length > 0 ? 'error' : undefined);

  // Determine if required
  const isRequired = required !== undefined
    ? required
    : rules?.some((r) => r.required) || false;

  // Required mark
  const showRequiredMark =
    ctx.requiredMark === true ||
    (ctx.requiredMark !== false && isRequired);

  // Layout
  const itemLayout = layout || ctx.layout;
  const mergedLabelCol = labelCol !== undefined ? labelCol : ctx.labelCol;
  const mergedWrapperCol = wrapperCol !== undefined ? wrapperCol : ctx.wrapperCol;
  const mergedLabelAlign = labelAlign !== undefined ? labelAlign : ctx.labelAlign;

  // Handle value change from child
  const triggerChange = useCallback((changedValue: any) => {
    if (namePath.length === 0) return;
    ctx.setFieldValue(namePath, changedValue);
    if (ctx.onValuesChange) {
      const all = ctx.getFieldsValue();
      ctx.onValuesChange({ [nameKey]: changedValue }, all);
    }
  }, [namePath]);

  // Clone child with value/onChange
  const getControlled = (child: React.ReactNode): React.ReactNode => {
    if (!isValidElement(child) || namePath.length === 0) return child;

    const childProps: Record<string, any> = {};

    const propName = valuePropName || 'value';
    childProps[propName] = value;

    childProps.onChange = (...args: any[]) => {
      const val = args[0];
      const extracted =
        val && typeof val === 'object' && 'target' in val
          ? val.target.value
          : val;
      triggerChange(extracted);

      // Also call child's original onChange if any
      if ((child.props as any).onChange) {
        (child.props as any).onChange(...args);
      }
    };

    if (ctx.disabled) {
      childProps.disabled = true;
    }

    return cloneElement(child as React.ReactElement, childProps);
  };

  const controlledChildren = getControlled(children);

  if (noStyle) {
    return <>{controlledChildren}</>;
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
  if (itemLayout === 'horizontal') {
    if (mergedWrapperCol?.span) {
      wrapperStyle.flex = `0 0 ${(mergedWrapperCol.span / 24) * 100}%`;
      wrapperStyle.maxWidth = `${(mergedWrapperCol.span / 24) * 100}%`;
    }
    if (mergedWrapperCol?.offset) {
      wrapperStyle.marginLeft = `${(mergedWrapperCol.offset / 24) * 100}%`;
    }
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
          <label
            className={classNames({
              'soui-form-item-required': showRequiredMark,
              'soui-form-item-no-colon': ctx.requiredMark === 'optional',
            })}
          >
            {label}
            {ctx.requiredMark === 'optional' && !showRequiredMark && (
              <span className="soui-form-item-optional">(可选)</span>
            )}
          </label>
        </div>
      )}

      <div
        className={classNames('soui-form-item-control', {
          'soui-form-item-has-error': errors.length > 0,
          [`soui-form-item-${status}`]: status,
        })}
        style={mergedWrapperCol?.span ? wrapperStyle : undefined}
      >
        {itemLayout === 'vertical' && label && (
          <div
            className={classNames('soui-form-item-label soui-form-item-label-vertical', {
              [`soui-form-item-label-${mergedLabelAlign}`]: true,
            })}
          >
            <label
              className={classNames({
                'soui-form-item-required': showRequiredMark,
              })}
            >
              {label}
              {ctx.requiredMark === 'optional' && !showRequiredMark && (
                <span className="soui-form-item-optional">(可选)</span>
              )}
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
              <div className="soui-form-item-explain-error">
                {errors[0]}
              </div>
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
  const ctx = useFormContext();
  const namePath = normalizeName(name);
  const nameKey = namePath.join('.');

  const list: any[] = getNestedValue(ctx.__storeRef.current, namePath) || [];

  const operations: FormListOperations = {
    add: (defaultValue?: any) => {
      const newList = [...list, defaultValue !== undefined ? defaultValue : ''];
      ctx.setFieldValue(namePath, newList);
    },
    remove: (index: number) => {
      const newList = list.filter((_, i) => i !== index);
      ctx.setFieldValue(namePath, newList);
    },
    move: (from: number, to: number) => {
      const newList = [...list];
      const [removed] = newList.splice(from, 1);
      newList.splice(to, 0, removed);
      ctx.setFieldValue(namePath, newList);
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

const FormProvider: React.FC<FormProviderProps> = ({
  onFormChange,
  onFormFinish,
  children,
}) => {
  const formContext = useContext(FormContext);
  const providerRef = useRef({ onFormChange, onFormFinish });

  useEffect(() => {
    providerRef.current = { onFormChange, onFormFinish };
  }, [onFormChange, onFormFinish]);

  return (
    <FormContext.Provider
      value={formContext || {
        layout: 'horizontal',
        size: 'middle',
        labelAlign: 'right',
        disabled: false,
        requiredMark: true,
        validateTrigger: ['onChange'],
        registerField: () => () => {},
        getFieldValue: () => undefined,
        setFieldValue: () => {},
        getFieldsValue: () => ({}),
        setFieldsValue: () => {},
        resetFields: () => {},
        validateFields: () => Promise.resolve({}),
        submit: () => Promise.resolve({}),
        clearValidate: () => {},
        registerFormItem: () => {},
        unregisterFormItem: () => {},
        __storeRef: { current: {} },
        __errorsRef: { current: {} },
        __fieldsRef: { current: {} },
        __itemRefs: { current: {} },
        __setForceUpdate: () => {},
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// ==================== useWatch Hook ====================

export function useWatch(
  dependencyPath?: string | number | (string | number)[]
): any {
  const ctx = useFormContext();
  const [value, setValue] = useState(() =>
    dependencyPath ? ctx.getFieldValue(normalizeName(dependencyPath)) : undefined
  );

  useEffect(() => {
    const path = dependencyPath ? normalizeName(dependencyPath) : [];
    if (path.length === 0) return;

    const interval = setInterval(() => {
      const current = ctx.getFieldValue(path);
      setValue((prev: any) => {
        if (prev !== current) {
          return current;
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [dependencyPath]);

  return value;
}

// ==================== Compound Components ====================

interface CompoundedComponent extends React.FC<InternalFormProps> {
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
export type { FormInstance, FormItemProps, FormListProps, FormListFieldData, FormListOperations };
