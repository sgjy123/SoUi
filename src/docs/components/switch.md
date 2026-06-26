# Switch 开关

开关选择器，通过切换开启与关闭状态来响应用户操作。

## 何时使用

- 需要表示开/关两种互斥状态时
- 需要立即触发状态变化并产生即时反馈时（如开启/关闭某项功能）
- 在设置面板中用于控制功能的启用或禁用
- 替代需要二选一的 Checkbox 场景，提供更直观的视觉反馈

## 代码演示

### 基础用法

最简单的开关，支持默认选中、受控模式和禁用状态。

```tsx
import { useState } from 'react';
import { Switch } from '@soui/ui';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch />
      <Switch defaultChecked />
      <Switch checked={checked} onChange={(val) => setChecked(val)} />
      <span>{checked ? '开' : '关'}</span>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>
    </div>
  );
};
```

### 尺寸与内容

通过 `size` 控制开关尺寸，通过 `checkedChildren` / `unCheckedChildren` 添加文字或图标。

```tsx
import { useState } from 'react';
import { Switch } from '@soui/ui';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch defaultChecked />
        <Switch defaultChecked size="small" />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch
          checked={checked}
          onChange={setChecked}
          checkedChildren="开"
          unCheckedChildren="关"
        />
        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch checkedChildren="1" unCheckedChildren="0" size="small" />
      </div>
    </div>
  );
};
```

### 加载状态

通过 `loading` 属性设置加载状态，加载中的开关无法点击。

```tsx
import { useState } from 'react';
import { Switch } from '@soui/ui';

export default () => {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch loading defaultChecked />
        <Switch loading />
        <Switch loading size="small" defaultChecked />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch loading={loading} checked={checked} onChange={setChecked} />
        <button onClick={() => setLoading(!loading)}>
          {loading ? '关闭加载' : '开启加载'}
        </button>
      </div>
    </div>
  );
};
```

### 主题定制

通过 `ConfigProvider` 自定义 Switch 的主题样式。

```tsx
import { Switch, ConfigProvider } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <p>绿色主题</p>
      <ConfigProvider
        theme={{
          primaryColor: '#52c41a',
          components: { Switch: { borderRadius: 12 } },
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <Switch defaultChecked checkedChildren="开" unCheckedChildren="关" />
          <Switch defaultChecked size="small" />
          <Switch />
        </div>
      </ConfigProvider>
    </div>
    <div>
      <p>紫色主题 + 方角</p>
      <ConfigProvider
        theme={{
          primaryColor: '#722ed1',
          components: { Switch: { borderRadius: 4, colorBg: 'rgba(0,0,0,0.15)' } },
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
          <Switch defaultChecked size="small" />
        </div>
      </ConfigProvider>
    </div>
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| checked | 是否选中（受控） | `boolean` | - | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| loading | 是否加载中 | `boolean` | `false` | - |
| size | 尺寸 | `'default' \| 'small'` | `'default'` | - |
| checkedChildren | 选中时的内容 | `ReactNode` | - | - |
| unCheckedChildren | 未选中时的内容 | `ReactNode` | - | - |
| autoFocus | 自动聚焦 | `boolean` | `false` | - |
| onChange | 选中变化回调 | `(checked: boolean) => void` | - | - |

## 主题定制

Switch 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

Switch 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Switch` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Switch: {
        colorPrimary: '#52c41a',
        colorPrimaryHover: '#73d13d',
        borderRadius: 12,
        colorBg: 'rgba(0, 0, 0, 0.25)',
        colorBgHover: 'rgba(0, 0, 0, 0.35)',
        colorText: '#fff',
      },
    },
  }}
>
  <Switch defaultChecked />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Switch` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（开启态背景） | `string` | 继承全局 `primaryColor`（#1677ff） |
| colorPrimaryHover | 悬停主色 | `string` | 继承全局 `primaryHoverColor`（#4096ff） |
| borderRadius | 圆角大小（单位 px） | `number` | `11`（默认尺寸）/ `8`（小尺寸） |
| colorBg | 关闭态背景色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorBgHover | 关闭态悬停背景色 | `string` | `rgba(0, 0, 0, 0.35)` |
| colorText | 文字颜色 | `string` | `#fff` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Switch
  defaultChecked
  style={{
    '--soui-switch-color-primary': '#52c41a',
    '--soui-switch-border-radius': '4px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 1. 需要即时反馈的开/关场景
<Switch checked={enabled} onChange={setEnabled} checkedChildren="开" unCheckedChildren="关" />

// 2. 设置面板中启用/禁用功能项
{settings.map(item => (
  <div key={item.key}>
    <span>{item.label}</span>
    <Switch checked={item.value} onChange={item.onChange} />
  </div>
))}

// 3. 异步操作时配合 loading 状态
<Switch loading={saving} checked={enabled} onChange={handleChange} />
```

### 避免使用

```tsx
// 1. 不要用于多选场景（应使用 Checkbox）
<Switch /> // 多个 Switch 无法表示多个可共存的选项

// 2. 不要在无明确开/关语义时使用 Switch
<Switch checked={visible} onChange={setVisible} />
// 应考虑使用 Checkbox: "显示高级选项"
```

## 无障碍访问

Switch 组件遵循 WAI-ARIA 规范：

- 使用 `<button role="switch">` 元素，语义明确
- `aria-checked` 属性反映当前开/关状态
- `aria-disabled` 属性传达禁用状态
- 支持 Tab 键聚焦和 Enter/Space 键切换状态
- 加载状态同时设置 `disabled` 防止误操作
- `focus-visible` 提供键盘聚焦时的视觉反馈

## FAQ

### Switch 和 Checkbox 的区别？

`Switch` 用于开/关两种互斥状态的切换，操作后通常立即生效。`Checkbox` 用于从一组选项中选择一项或多项，通常需要配合提交按钮使用。当需要"启用/禁用"语义时，优先使用 `Switch`。

### 如何在 Switch 中添加图标？

通过 `checkedChildren` 和 `unCheckedChildren` 属性可以传入任意 ReactNode，包括图标组件：

```tsx
<Switch
  checkedChildren={<CheckOutlined />}
  unCheckedChildren={<CloseOutlined />}
/>
```

### 加载中的 Switch 能被点击吗？

不能。设置 `loading` 后，Switch 内部会同时设置 `disabled`，点击事件不会触发 `onChange` 回调。

## 相关资源

- [Checkbox 多选框](/components/checkbox) — 多选场景
- [Radio 单选框](/components/radio) — 互斥选项选择
