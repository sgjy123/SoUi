# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 何时使用

- 需要用户输入表单域内容时
- 提供组合型输入框，带前置/后置标签
- 提供文本域、密码框、搜索框等特定场景的输入

## 代码演示

### 基础用法

基础的输入框用法，支持禁用和只读状态。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input placeholder="基础输入框" />
    <Input placeholder="带有默认值" defaultValue="默认内容" />
    <Input placeholder="禁用状态" disabled />
    <Input placeholder="只读状态" readOnly value="只读内容" />
  </div>
);
```

### 不同尺寸

输入框有大（large）、中（middle）、小（small）三种尺寸。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input size="small" placeholder="Small 小尺寸" />
    <Input size="middle" placeholder="Middle 中尺寸（默认）" />
    <Input size="large" placeholder="Large 大尺寸" />
  </div>
);
```

### 输入状态

输入框支持 `error`、`warning`、`success` 三种状态。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input placeholder="默认状态" />
    <Input placeholder="错误状态" status="error" defaultValue="错误内容" />
    <Input placeholder="警告状态" status="warning" defaultValue="警告内容" />
  </div>
);
```

### 无边框模式

支持 `bordered={false}` 和 `borderless` 两种无边框模式。`bordered={false}` 适用于在有色背景容器中使用，`borderless` 则完全移除边框。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <Input placeholder="无边框输入框" bordered={false} style={{ background: '#fff', borderRadius: 6 }} />
    </div>
    <div style={{ padding: 16, background: '#e6f4ff', borderRadius: 8 }}>
      <Input placeholder="Bordered=false 在浅色背景上" bordered={false} />
    </div>
    <Input borderless placeholder="完全无边框（borderless）" />
  </div>
);
```

### 可清空

设置 `allowClear` 可以显示清空按钮，支持自定义清空图标。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input placeholder="可清空的输入框" allowClear defaultValue="点击右侧图标清空内容" />
    <Input
      placeholder="自定义清空图标"
      allowClear={{ clearIcon: <span style={{ color: 'red', fontWeight: 'bold' }}>×</span> }}
      defaultValue="自定义清除图标"
    />
  </div>
);
```

### 前缀与后缀

通过 `prefix` 和 `suffix` 在输入框前后添加图标或文字。

```tsx
import { Input, Icon } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input prefix={<Icon name="User" size={16} />} placeholder="用户名" />
    <Input suffix={<Icon name="Search" size={16} />} placeholder="搜索内容" />
    <Input prefix="¥" suffix="RMB" placeholder="金额" />
  </div>
);
```

### 前置/后置标签

通过 `addonBefore` 和 `addonAfter` 添加前置/后置标签，常用于域名、协议等场景。

```tsx
import { Input } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input addonBefore="https://" addonAfter=".com" placeholder="输入域名" />
    <Input addonBefore="¥" placeholder="输入金额" />
    <Input addonAfter="搜索" placeholder="请输入关键词" />
  </div>
);
```

### 输入框组合示例

同时使用前缀、后缀、清空、字数统计等功能。

```tsx
import { Input, Icon } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input
      placeholder="综合示例：带前缀和清空功能"
      prefix={<Icon name="User" size={16} />}
      allowClear
      defaultValue="Hello"
    />
    <Input
      placeholder="showCount + maxLength"
      showCount
      maxLength={20}
      defaultValue="已有8个字"
      allowClear
    />
    <Input
      placeholder="带前后置标签 + 前缀"
      addonBefore="https://"
      addonAfter=".com"
      prefix={<Icon name="Globe" size={16} />}
      allowClear
      defaultValue="example"
    />
  </div>
);
```

### 密码框

密码输入框，支持可见性切换。

```tsx
import { Input } from '@soui/ui';

const { Password } = Input;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Password placeholder="输入密码" defaultValue="123456" />
    <Password placeholder="输入密码(大尺寸)" size="large" />
    <Password placeholder="禁用状态" disabled defaultValue="123456" />
  </div>
);
```

### 搜索框

搜索输入框，支持带按钮和不带按钮两种模式，以及 loading 状态。

```tsx
import { useState } from 'react';
import { Input } from '@soui/ui';

const { Search } = Input;

export default () => {
  const [searchResult, setSearchResult] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Search
        placeholder="输入搜索关键词"
        onSearch={(value) => setSearchResult(`搜索: ${value}`)}
      />
      <Search
        placeholder="带搜索按钮"
        enterButton
        onSearch={(value) => setSearchResult(`搜索: ${value}`)}
      />
      <Search
        placeholder="自定义按钮文字"
        enterButton="搜索"
        size="large"
        onSearch={(value) => setSearchResult(`搜索: ${value}`)}
      />
      {searchResult && (
        <div style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 6, fontSize: 14, color: '#333' }}>
          {searchResult}
        </div>
      )}
    </div>
  );
};
```

### 文本域

多行文本输入框，支持自适应高度 `autoSize`、字数统计和清空功能。

```tsx
import { useState } from 'react';
import { Input } from '@soui/ui';

const { TextArea } = Input;

export default () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <TextArea placeholder="输入多行文本" rows={3} />
      <TextArea placeholder="自适应高度" autoSize />
      <TextArea
        placeholder="限制最小3行、最大6行的自适应高度"
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
      <TextArea placeholder="显示字数统计" showCount maxLength={100} />
      <TextArea placeholder="可清空" allowClear value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
```

## API

### Input

基础输入框组件。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| size | 输入框尺寸 | `'large' \| 'middle' \| 'small'` | `middle` | - |
| status | 输入框验证状态 | `'error' \| 'warning' \| 'success'` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| bordered | 是否显示边框 | `boolean` | `true` | - |
| borderless | 无边框模式 | `boolean` | `false` | - |
| readOnly | 是否只读 | `boolean` | `false` | - |
| prefix | 前缀内容 | `ReactNode` | - | - |
| suffix | 后缀内容 | `ReactNode` | - | - |
| addonBefore | 前置标签 | `ReactNode` | - | - |
| addonAfter | 后置标签 | `ReactNode` | - | - |
| allowClear | 是否允许清空 | `boolean \| { clearIcon?: ReactNode }` | `false` | - |
| maxLength | 最大长度 | `number` | - | - |
| showCount | 是否显示字数统计 | `boolean \| ((count: number, maxLength?: number) => ReactNode)` | `false` | - |
| value | 受控值 | `string` | - | - |
| defaultValue | 非受控默认值 | `string` | - | - |
| onChange | 值变化回调 | `(e: ChangeEvent<HTMLInputElement>) => void` | - | - |
| onPressEnter | 按 Enter 键的回调 | `(e: KeyboardEvent<HTMLInputElement>) => void` | - | - |
| onClear | 点击清除按钮的回调 | `() => void` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义内联样式 | `CSSProperties` | - | - |

Input 同时继承 `React.InputHTMLAttributes<HTMLInputElement>` 的所有原生属性，如 `placeholder`、`type`、`name`、`id` 等。

### TextArea

多行文本域组件。通过 `Input.TextArea` 访问。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| size | 输入框尺寸 | `'large' \| 'middle' \| 'small'` | `middle` | - |
| bordered | 是否显示边框 | `boolean` | `true` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| rows | 行数 | `number` | `3` | - |
| autoSize | 自适应内容高度 | `boolean \| { minRows?: number; maxRows?: number }` | `false` | - |
| allowClear | 是否允许清空 | `boolean` | `false` | - |
| maxLength | 最大长度 | `number` | - | - |
| showCount | 是否显示字数统计 | `boolean \| ((count: number, maxLength?: number) => ReactNode)` | `false` | - |
| value | 受控值 | `string` | - | - |
| defaultValue | 非受控默认值 | `string` | - | - |
| onChange | 值变化回调 | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | - | - |
| onPressEnter | 按 Enter 键的回调 | `(e: KeyboardEvent<HTMLTextAreaElement>) => void` | - | - |
| onClear | 点击清除按钮的回调 | `() => void` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义内联样式 | `CSSProperties` | - | - |

TextArea 同时继承 `React.TextareaHTMLAttributes<HTMLTextAreaElement>` 的所有原生属性。

### Password

密码框组件。通过 `Input.Password` 访问，继承 `InputProps`（排除 `type` 和 `suffix`）。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| visibilityToggle | 是否显示密码可见性切换按钮 | `boolean` | `true` | - |
| iconRender | 自定义密码可见性切换图标 | `(visible: boolean) => ReactNode` | - | - |

### Search

搜索框组件。通过 `Input.Search` 访问，继承 `InputProps`（排除 `suffix`）。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| enterButton | 是否有确认按钮，可设为按钮文字 | `boolean \| ReactNode` | `false` | - |
| loading | 搜索 loading 状态 | `boolean` | `false` | - |
| onSearch | 点击搜索图标/按钮或按下回车时的回调 | `(value: string, event?: MouseEvent \| KeyboardEvent) => void` | - | - |

## 主题定制

Input 组件支持全局主题和组件级主题定制，通过 CSS 变量实现样式覆盖。

### 组件级主题

通过 `ConfigProvider` 的 `theme.components.Input` 配置：

```tsx
import { ConfigProvider, Input } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            borderRadius: 8,
            fontSize: 16,
            colorBorder: '#d9d9d9',
            colorBorderHover: '#4096ff',
            colorBorderFocus: '#1677ff',
            colorBg: '#ffffff',
            colorText: '#000000',
            colorBgDisabled: '#f5f5f5',
            colorTextDisabled: '#bfbfbf',
            colorError: '#ff4d4f',
            colorWarning: '#faad14',
            colorSuccess: '#52c41a',
            colorIcon: 'rgba(0, 0, 0, 0.45)',
            colorIconHover: 'rgba(0, 0, 0, 0.65)',
          },
        },
      }}
    >
      <Input placeholder="自定义主题输入框" />
    </ConfigProvider>
  );
}
```

### 组件级主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 输入框圆角（单位 px） | `number` | 继承全局 `borderRadius`（6） |
| fontSize | 字体大小（单位 px） | `number` | 继承全局 `fontSize`（14） |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBorderHover | 悬停边框颜色 | `string` | `#4096ff` |
| colorBorderFocus | 聚焦边框颜色 | `string` | `#1677ff` |
| colorBg | 背景颜色 | `string` | `#ffffff` |
| colorText | 文字颜色 | `string` | `#000000` |
| colorBgDisabled | 禁用背景颜色 | `string` | `#f5f5f5` |
| colorTextDisabled | 禁用文字颜色 | `string` | `#bfbfbf` |
| colorError | 错误状态颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态颜色 | `string` | `#faad14` |
| colorSuccess | 成功状态颜色 | `string` | `#52c41a` |
| colorIcon | 图标颜色 | `string` | `rgba(0, 0, 0, 0.45)` |
| colorIconHover | 图标悬停颜色 | `string` | `rgba(0, 0, 0, 0.65)` |

### 优先级

CSS 变量的优先级从高到低：

1. **组件级主题** (`theme.components.Input.*`) — 通过 `--soui-input-*` CSS 变量注入
2. **全局主题** (`theme.*`) — `borderRadius`、`fontSize` 可从全局继承
3. **Less 变量** (`variables.less`) — 最终回退值

## 设计原则

### ✅ 推荐用法

```tsx
// 1. 禁用状态加 tooltip 说明原因
<Input disabled placeholder="请输入" title="权限不足" />

// 2. 字数统计配合 maxLength
<Input showCount maxLength={20} placeholder="最多输入20字" />

// 3. 表单验证配合 status
<Input status="error" placeholder="请输入正确的邮箱" />

// 4. 受控组件模式
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### ❌ 避免使用

```tsx
// 1. 不要在只读输入框使用 allowClear
<Input readOnly allowClear value="只读内容" /> {/* readOnly 下清空按钮不显示 */}

// 2. 不要在禁用的输入框使用 status
<Input disabled status="error" /> {/* disabled 会覆盖 status 样式 */}

// 3. 不要同时使用 bordered={false} 和 borderless
<Input bordered={false} borderless /> {/* 功能重叠 */}
```

## 无障碍访问

Input 组件遵循 WAI-ARIA 规范：

- 清除图标支持键盘操作（Enter 和 Space 触发）
- 清除图标带有 `role="button"` 和 `aria-label="清除"`
- 密码可见性切换按钮带有对应的 `aria-label`
- 禁用状态自动传递 `disabled` 属性到原生 input

## FAQ

### 如何使用受控和非受控模式？

```tsx
// 受控模式 — 通过 value + onChange
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// 非受控模式 — 通过 defaultValue
<Input defaultValue="初始值" />
```

### 如何自定义字数统计格式？

```tsx
<Input
  showCount={(count, maxLength) => `已输入 ${count} 字，剩余 ${maxLength! - count} 字`}
  maxLength={100}
/>
```

### 如何监听回车键？

```tsx
<Input
  placeholder="按回车触发"
  onPressEnter={(e) => console.log('回车键被按下')}
/>
```

### TextArea 如何限制最小/最大行数？

```tsx
<TextArea
  autoSize={{ minRows: 3, maxRows: 6 }}
  placeholder="最少显示3行，最多显示6行"
/>
```

### Search 如何获取 loading 状态的 value？

```tsx
const [value, setValue] = useState('');
const [loading, setLoading] = useState(false);

<Input.Search
  value={value}
  onChange={(e) => setValue(e.target.value)}
  loading={loading}
  enterButton
  onSearch={async (val) => {
    setLoading(true);
    await fetchResults(val);
    setLoading(false);
  }}
/>
```

## 相关资源

- [Icon 图标](/components/icon) — 配合 prefix/suffix 使用图标
- [Space 间距](/components/space) — 多个输入框的间距控制
- [Button 按钮](/components/button) — 配合 Search 使用
