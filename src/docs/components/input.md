# Input 输入框

通过鼠标或键盘输入内容的表单控件。

## 何时使用

- 需要用户输入文本内容时
- 表单数据收集场景
- 搜索、过滤等交互场景
- 密码输入（配合 `type="password"`）

## 代码演示

### 基础用法

基本的单行文本输入框，支持禁用和只读状态。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input placeholder="请输入内容" />
    <Input defaultValue="默认值" />
    <Input placeholder="禁用状态" disabled />
    <Input placeholder="只读状态" readOnly />
  </div>
);
```

### 尺寸

提供大、中、小三种尺寸的输入框，适应不同的使用场景。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input size="small" placeholder="小号输入框" />
    <Input size="middle" placeholder="中号输入框（默认）" />
    <Input size="large" placeholder="大号输入框" />
  </div>
);
```

### 状态

输入框支持成功、警告、错误三种状态，用于表单验证反馈。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input placeholder="默认状态" />
    <Input status="success" placeholder="成功状态" />
    <Input status="warning" placeholder="警告状态" />
    <Input status="error" placeholder="错误状态" />
  </div>
);
```

### 前缀和后缀

在输入框前后添加图标、单位等内容，增强用户体验。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input prefix="" placeholder="带前缀图标" />
    <Input suffix="元" placeholder="带后缀单位" />
    <Input prefix="" suffix="@example.com" placeholder="邮箱地址" />
    <Input 
      prefix="💰" 
      suffix="CNY" 
      allowClear 
      placeholder="金额输入框（支持清除）" 
    />
  </div>
);
```

### 组合输入框

在输入框前后添加标签，形成组合式输入框。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input addonBefore="https://" addonAfter=".com" placeholder="域名输入" />
    <Input addonBefore="+" addonAfter="%" placeholder="百分比" />
    <Input 
      addonBefore="¥" 
      addonAfter="元" 
      showCount 
      maxLength={10}
      placeholder="金额（带计数）" 
    />
  </div>
);
```

### 字符计数

显示输入字符数，可设置最大长度限制。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input 
      placeholder="请输入密码" 
      type="password"
      showCount
      maxLength={20}
    />
    <Input 
      defaultValue="123456789"
      showCount
      maxLength={10}
      placeholder="限制最大长度10"
    />
    <Input 
      placeholder="自定义计数格式"
      showCount
      maxLength={50}
      countFormatter={(count, max) => `${count}/${max}`}
    />
  </div>
);
```

### 无边框模式

去除边框样式，适用于特殊设计需求。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input 
      placeholder="无边框模式"
      bordered={false}
    />
    <Input 
      placeholder="无边框 + 前缀"
      bordered={false}
      prefix=""
    />
    <Input 
      placeholder="无边框 + 后缀"
      bordered={false}
      suffix="元"
    />
  </div>
);
```

### 搜索框

带有搜索图标的输入框，支持一键清除。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input 
      placeholder="搜索框"
      prefix=""
      allowClear
    />
    <Input 
      placeholder="带清除按钮的输入框"
      allowClear
    />
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| size | 输入框尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| readOnly | 是否只读 | `boolean` | `false` | - |
| status | 输入框状态 | `'success' \| 'warning' \| 'error'` | - | - |
| value | 输入框值（受控） | `string` | - | - |
| defaultValue | 输入框默认值（非受控） | `string` | - | - |
| placeholder | 占位符文本 | `string` | - | - |
| maxLength | 最大长度 | `number` | - | - |
| showCount | 是否显示字符计数 | `boolean` | `false` | - |
| countFormatter | 自定义字符计数格式化函数 | `(count: number, max?: number) => string` | - | - |
| prefix | 前缀图标或内容 | `ReactNode` | - | - |
| suffix | 后缀图标或内容 | `ReactNode` | - | - |
| addonBefore | 前置标签 | `ReactNode` | - | - |
| addonAfter | 后置标签 | `ReactNode` | - | - |
| allowClear | 是否显示清除按钮 | `boolean` | `false` | - |
| bordered | 是否显示边框 | `boolean` | `true` | - |
| type | 原生 input 类型 | `string` | `'text'` | - |
| onFocus | 获取焦点时回调 | `FocusEventHandler<HTMLInputElement>` | - | - |
| onBlur | 失去焦点时回调 | `FocusEventHandler<HTMLInputElement>` | - | - |
| onChange | 值变化时回调 | `ChangeEventHandler<HTMLInputElement>` | - | - |
| onPressEnter | 按下回车键时回调 | `KeyboardEventHandler<HTMLInputElement>` | - | - |
| onKeyDown | 键盘事件回调 | `KeyboardEventHandler<HTMLInputElement>` | - | - |
| className | 类名 | `string` | - | - |
| style | 样式 | `CSSProperties` | - | - |

### Ref

| 方法 | 说明 | 类型 |
|------|------|------|
| focus | 聚焦输入框 | `() => void` |
| select | 选择输入框内容 | `() => void` |
| nativeElement | 原生 input 元素 | `HTMLInputElement \| null` |

## 主题定制

Input 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

**工作原理：** Input 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Input` 针对组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

<ConfigProvider
  theme={{
    components: {
      Input: {
        borderRadius: 8,
        fontSize: 14,
        controlHeight: 32,
        colorBorder: '#d9d9d9',
        colorBorderHover: '#4096ff',
        colorBorderFocus: '#1677ff',
        colorBg: '#fff',
        colorText: 'rgba(0, 0, 0, 0.88)',
        colorBgDisabled: '#f5f5f5',
        colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
        colorError: '#ff4d4f',
        colorWarning: '#faad14',
        colorSuccess: '#52c41a',
        colorIcon: 'rgba(0, 0, 0, 0.45)',
        colorIconHover: 'rgba(0, 0, 0, 0.65)',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Input` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| controlHeight | 控件高度（像素） | `number` | `32` |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBorderHover | 悬停边框颜色 | `string` | `#4096ff` |
| colorBorderFocus | 聚焦边框颜色 | `string` | `#1677ff` |
| colorBg | 背景色 | `string` | `#fff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用状态背景色 | `string` | `#f5f5f5` |
| colorTextDisabled | 禁用状态文本颜色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorError | 错误状态边框颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态边框颜色 | `string` | `#faad14` |
| colorSuccess | 成功状态边框颜色 | `string` | `#52c41a` |
| colorIcon | 图标颜色 | `string` | `rgba(0, 0, 0, 0.45)` |
| colorIconHover | 图标悬停颜色 | `string` | `rgba(0, 0, 0, 0.65)` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Input 
  style={{
    '--soui-input-border-radius': '10px',
    '--soui-input-font-size': '16px',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 好的示例：使用 placeholder 提示用户
<Input placeholder="请输入用户名" />

// 好的示例：使用 status 提供视觉反馈
<Input status="error" placeholder="请输入正确的邮箱" />

// 好的示例：使用前缀/后缀增强语义
<Input prefix="" suffix="元" placeholder="金额" />
```

### ❌ 避免使用

```tsx
// 不好的示例：不要混用 addon 和 prefix/suffix
<Input 
  addonBefore="¥" 
  prefix="" 
  suffix="元"
/>

// 不好的示例：不要在禁用状态下使用 allowClear
<Input disabled allowClear />
```

## 无障碍访问

Input 组件遵循 WAI-ARIA 规范：

- 支持 `aria-label`、`aria-labelledby` 属性
- 支持 `aria-describedby` 关联描述信息
- 禁用状态使用 `aria-disabled="true"`
- 只读状态使用 `aria-readonly="true"`
- 错误状态可通过 `aria-invalid="true"` 标识
- 支持键盘导航和焦点管理

## FAQ

### 如何控制输入框的最大长度？

使用 `maxLength` 属性限制最大字符数，配合 `showCount` 显示当前字符数：

```tsx
<Input maxLength={100} showCount placeholder="最多输入100个字符" />
```

### 如何实现自定义的字符计数格式？

使用 `countFormatter` 函数自定义显示格式：

```tsx
<Input 
  maxLength={50}
  showCount
  countFormatter={(count, max) => `${count}/${max}`}
/>
```

### 如何处理组合输入框（addonBefore/addonAfter）？

当使用 `addonBefore` 或 `addonAfter` 时，输入框会自动调整为组合样式：

```tsx
<Input 
  addonBefore="https://" 
  addonAfter=".com" 
  placeholder="example"
/>
```

### 如何实现密码可见性切换？

目前 Input 组件未内置密码可见性切换功能，可以通过 `suffix` 自行实现：

```tsx
const [visible, setVisible] = useState(false);

<Input 
  type={visible ? 'text' : 'password'}
  suffix={
    <span onClick={() => setVisible(!visible)}>
      {visible ? '👁️' : '👁️🗨️'}
    </span>
  }
/>
```

### 如何与 Form 组件配合使用？

Input 组件设计时已考虑与未来的 Form 组件集成，所有表单相关组件都遵循统一的样式规范和主题系统，确保视觉一致性。

## 相关资源

- [Button 按钮](/components/button)
- [Space 间距](/components/space)
- [Form 表单](/components/form)（待实现）
