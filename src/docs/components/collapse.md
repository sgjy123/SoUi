# Collapse 折叠面板

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和收折，保持页面整洁
- 手风琴模式：同时只展开一个面板，适合互斥的信息分组
- 需要渐进式披露详细内容时

## 代码演示

### 基础用法

可以同时展开多个面板，`disabled` 禁用某个面板。

```tsx
import { Collapse } from '@soui/ui';

export default () => (
  <Collapse defaultActiveKey={['1']}>
    <Collapse.Panel key="1" header="面板标题一">
      这是第一个面板的内容。
    </Collapse.Panel>
    <Collapse.Panel key="2" header="面板标题二">
      这是第二个面板的内容。
    </Collapse.Panel>
    <Collapse.Panel key="3" header="面板标题三" disabled>
      这是被禁用的面板。
    </Collapse.Panel>
  </Collapse>
);
```

### 手风琴

`accordion` 模式下同时只能展开一个面板。

```tsx
import { Collapse } from '@soui/ui';

export default () => (
  <Collapse accordion>
    <Collapse.Panel key="1" header="面板一">内容一</Collapse.Panel>
    <Collapse.Panel key="2" header="面板二">内容二</Collapse.Panel>
    <Collapse.Panel key="3" header="面板三">内容三</Collapse.Panel>
  </Collapse>
);
```

### 幽灵模式

`ghost` 去除边框和背景，适合嵌入其他容器。

```tsx
import { Collapse } from '@soui/ui';

export default () => (
  <Collapse ghost defaultActiveKey={['1']}>
    <Collapse.Panel key="1" header="无边框面板">内容</Collapse.Panel>
  </Collapse>
);
```

### items 配置

通过 `items` 属性配置面板，`expandIconPosition="end"` 将箭头放到右侧。

```tsx
import { Collapse, Tag } from '@soui/ui';

const items = [
  { key: '1', label: '配置项', children: '通过 items 配置面板。' },
  { key: '2', label: '带额外内容', extra: <Tag color="green">新</Tag>, children: '面板头右侧 extra。' },
];

export default () => <Collapse items={items} expandIconPosition="end" />;
```

### 主题定制

通过 ConfigProvider 自定义折叠面板主题。

```tsx
import { Collapse, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Collapse: {
          colorBg: '#f0f5ff',
          headerBg: '#e6f4ff',
          borderColor: '#adc6ff',
        },
      },
    }}
  >
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel key="1" header="自定义主题">内容</Collapse.Panel>
    </Collapse>
  </ConfigProvider>
);
```

## API

### Collapse 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| activeKey | 当前激活的面板 key（受控） | `string \| string[]` | - |
| defaultActiveKey | 默认激活的面板 key | `string \| string[]` | - |
| accordion | 手风琴模式 | `boolean` | `false` |
| bordered | 是否有边框 | `boolean` | `true` |
| ghost | 幽灵模式（无边框无背景） | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| expandIconPosition | 展开图标位置 | `'start' \| 'end'` | `'start'` |
| expandIcon | 自定义展开图标 | `(props: { isActive: boolean }) => ReactNode` | - |
| destroyInactivePanel | 折叠时销毁内容 | `boolean` | `false` |
| onChange | 切换回调 | `(key: string \| string[]) => void` | - |
| items | 面板配置（与 children 二选一） | `CollapseItemConfig[]` | - |

### Collapse.Panel 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标识 | `string` | - |
| header | 面板头内容 | `ReactNode` | - |
| collapsible | 可折叠触发区域 | `'header' \| 'icon' \| 'disabled'` | `'header'` |
| disabled | 是否禁用 | `boolean` | `false` |
| extra | 面板头右侧额外内容 | `ReactNode` | - |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| forceRender | 强制渲染内容 | `boolean` | `false` |

### CollapseItemConfig

| 参数 | 说明 | 类型 |
|------|------|------|
| key | 唯一标识 | `string` |
| label | 面板头内容 | `ReactNode` |
| children | 内容 | `ReactNode` |
| collapsible / disabled / extra / showArrow / forceRender | 同 Panel | - |

## 主题定制

Collapse 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Collapse` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Collapse: {
        colorBg: '#fafafa',
        headerBg: '#f5f5f5',
        borderColor: '#f0f0f0',
        fontSize: 14,
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Collapse` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBg | 面板背景色 | `string` | `@bg-color-layout` |
| headerBg | 面板头背景色 | `string` | 透明 |
| borderColor | 边框颜色 | `string` | `@border-color-split` |
| fontSize | 字体大小（像素） | `number` | `14` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量：

```tsx
<Collapse
  style={{
    '--soui-collapse-color-bg': '#fffbe6',
    '--soui-collapse-border-color': '#ffe58f',
  }}
>
  ...
</Collapse>
```

## 设计原则

- 面板标题保持简洁，详细内容放在面板体内
- 手风琴模式适合互斥的信息分组
- `destroyInactivePanel` 适合内容较重、无需保留状态的场景

## 无障碍访问

- 面板头使用 `role="button"` 和 `aria-expanded` 表示展开状态
- 禁用面板设置 `aria-disabled` 和 `tabIndex={-1}`
- 支持键盘操作：Enter / 空格 切换面板

## 相关资源

- [Tabs 标签页](/components/tabs)
- [Card 卡片](/components/card)
