# Checkbox 多选框

在一组可选项中进行多项选择。

## 何时使用

- 在一组可选项中进行多个独立的选择
- 需要标记某个状态（如同意协议、记住密码等）
- 实现全选 / 半选 / 取消全选的联动控制

## 代码演示

### 基础用法

最基本的用法，支持默认选中、受控模式和禁用状态。

```tsx
import { Checkbox } from '@soui/ui';

export default () => (
  <Checkbox>默认选项</Checkbox>
);
```

### 多选组

使用 `Checkbox.Group` 管理一组多选选项，支持数据驱动和子组件两种方式。

```tsx
import { Checkbox } from '@soui/ui';

export default () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  return (
    <Checkbox.Group
      options={options}
      defaultValue={['react']}
      onChange={(values) => console.log(values)}
    />
  );
};
```

### 半选状态

通过 `indeterminate` 属性实现半选效果，常与全选联动使用。

```tsx
import { Checkbox } from '@soui/ui';

export default () => (
  <Checkbox indeterminate>半选状态</Checkbox>
);
```

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| checked | 是否选中（受控） | `boolean` | - | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| indeterminate | 半选状态（仅影响样式） | `boolean` | `false` | - |
| value | 选项值（用于 Group 标识） | `string \| number \| boolean` | - | - |
| name | 原生 name 属性 | `string` | - | - |
| onChange | 选中变化回调 | `(e: CheckboxChangeEvent) => void` | - | - |

### Checkbox.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| value | 当前选中的值数组（受控） | `Array<string \| number \| boolean>` | - | - |
| defaultValue | 默认选中的值数组 | `Array<string \| number \| boolean>` | `[]` | - |
| options | 选项数据 | `Array<{ label: ReactNode; value: string \| number; disabled?: boolean }>` | - | - |
| disabled | 是否禁用整组 | `boolean` | `false` | - |
| name | 名称 | `string` | - | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` | - |
| onChange | 选中变化回调 | `(checkedValues: Array<string \| number \| boolean>) => void` | - | - |

### 事件类型

```typescript
interface CheckboxChangeEvent {
  target: {
    value: any;
    checked: boolean;
  };
  nativeEvent: React.ChangeEvent<HTMLInputElement>;
}
```

## 主题定制

Checkbox 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Checkbox` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Checkbox: {
        colorPrimary: '#52c41a',
        borderRadius: 6,
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
2. **组件级配置** - `theme.components.Checkbox` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 选中时的主色 | `string` | `#1677ff` |
| colorPrimaryHover | 悬停时的主色 | `string` | `#4096ff` |
| colorBorder | 未选中时的边框颜色 | `string` | `#d9d9d9` |
| borderRadius | 圆角大小（像素） | `number` | `4` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorBg | 背景色 | `string` | `#fff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用时的背景色 | `string` | `#f5f5f5` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Checkbox
  style={{
    '--soui-checkbox-color-primary': '#722ed1',
    '--soui-checkbox-border-radius': '8px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 明确的标签文本
<Checkbox>我已阅读并同意服务协议</Checkbox>

// 使用 Group 管理关联选项
<Checkbox.Group options={options} />

// 全选联动使用 indeterminate
<Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAll}>
  全选
</Checkbox>
```

### 避免使用

```tsx
// 避免无标签的 Checkbox
<Checkbox />

// 互斥选项应使用 Radio 而非 Checkbox
<Checkbox.Group options={mutuallyExclusiveOptions} />
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- `Checkbox.Group` 使用 `role="group"` 标识选项组
- 支持键盘操作：Tab 聚焦、Space 切换选中
- 隐藏的原生 `<input type="checkbox">` 确保屏幕阅读器可识别

## FAQ

### Checkbox 和 Radio 的区别？

Checkbox 允许多选，Radio 只允许单选。Checkbox.Group 的 value 是数组类型，Radio.Group 的 value 是单一值。

### indeterminate 和 checked 的关系？

`indeterminate` 仅控制视觉样式，不影响 `checked` 的实际值。当 `indeterminate` 为 `true` 时，即使 `checked` 为 `true`，也会显示半选样式而非选中样式。通常需要在业务逻辑中自行管理两者的联动。

### Checkbox.Group 的 onChange 和 Checkbox 的 onChange 有什么区别？

`Checkbox.Group` 的 `onChange` 接收选中的值数组 `Array<string | number | boolean>`，而单独的 `Checkbox` 的 `onChange` 接收 `CheckboxChangeEvent` 对象，包含 `target.checked` 和 `target.value`。

## 相关资源

- [Radio 单选框](/components/radio)
- [Select 选择器](/components/select)
