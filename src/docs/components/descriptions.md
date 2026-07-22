# Descriptions 描述列表

成组展示多个只读字段，常见于详情页的信息展示。

## 何时使用

- 详情页中需要展示多项字段信息时
- 替代 Table 进行更轻量的只读字段展示
- 需要以标签-内容配对形式展示元数据时

## 代码演示

### 基础用法

默认水平布局，每行三列。

```tsx
import { Descriptions } from '@soui/ui';

export default () => (
  <Descriptions title="用户信息">
    <Descriptions.Item label="用户名">Zhang San</Descriptions.Item>
    <Descriptions.Item label="手机号">138****8888</Descriptions.Item>
    <Descriptions.Item label="居住地">杭州</Descriptions.Item>
    <Descriptions.Item label="备注">无</Descriptions.Item>
    <Descriptions.Item label="地址">浙江省杭州市西湖区</Descriptions.Item>
  </Descriptions>
);
```

### 带边框

`bordered` 显示边框样式。

```tsx
import { Descriptions, Badge } from '@soui/ui';

export default () => (
  <Descriptions title="订单信息" bordered column={2}>
    <Descriptions.Item label="订单号">SOUI-20260722</Descriptions.Item>
    <Descriptions.Item label="状态">
      <Badge status="processing" text="处理中" />
    </Descriptions.Item>
    <Descriptions.Item label="金额">￥ 1,299.00</Descriptions.Item>
    <Descriptions.Item label="收货地址" span={2}>
      浙江省杭州市西湖区文三路 100 号
    </Descriptions.Item>
  </Descriptions>
);
```

### 垂直布局

`layout="vertical"` 标签在上、内容在下。

```tsx
import { Descriptions } from '@soui/ui';

export default () => (
  <Descriptions title="项目信息" layout="vertical">
    <Descriptions.Item label="项目名称">SoUi 组件库</Descriptions.Item>
    <Descriptions.Item label="负责人">张三</Descriptions.Item>
    <Descriptions.Item label="状态">进行中</Descriptions.Item>
  </Descriptions>
);
```

### 尺寸

支持 `default`、`middle`、`small` 三种尺寸。

```tsx
import { Descriptions } from '@soui/ui';

export default () => (
  <Descriptions title="订单详情" bordered size="small">
    <Descriptions.Item label="订单号">SOUI-20260722</Descriptions.Item>
    <Descriptions.Item label="金额">￥ 1,299.00</Descriptions.Item>
  </Descriptions>
);
```

### 主题定制

通过 ConfigProvider 自定义描述列表主题。

```tsx
import { Descriptions, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Descriptions: {
          colorLabelBg: '#f0f5ff',
          borderColor: '#adc6ff',
        },
      },
    }}
  >
    <Descriptions title="自定义主题" bordered>
      <Descriptions.Item label="用户名">Li Si</Descriptions.Item>
      <Descriptions.Item label="部门">研发部</Descriptions.Item>
    </Descriptions>
  </ConfigProvider>
);
```

## API

### Descriptions 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| extra | 标题右侧操作区 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `false` |
| column | 每行列数（支持响应式对象） | `number \| { xxl, xl, lg, md, sm, xs }` | `3` |
| size | 尺寸 | `'default' \| 'middle' \| 'small'` | `'default'` |
| layout | 布局方式 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| colon | 标签后是否显示冒号（无边框水平布局生效） | `boolean` | `true` |
| labelStyle | 标签统一样式 | `CSSProperties` | - |
| contentStyle | 内容统一样式 | `CSSProperties` | - |

### Descriptions.Item 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签文字 | `ReactNode` | - |
| span | 占用的列数 | `number` | `1` |
| labelStyle | 标签自定义样式 | `CSSProperties` | - |
| contentStyle | 内容自定义样式 | `CSSProperties` | - |

## 主题定制

Descriptions 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Descriptions` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Descriptions: {
        colorLabelBg: '#fafafa',
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
2. **组件级配置** - `theme.components.Descriptions` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorLabelBg | 标签背景色（有边框时） | `string` | `@bg-color-layout` |
| borderColor | 边框颜色 | `string` | `@border-color-split` |
| fontSize | 字体大小（像素） | `number` | `14` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量：

```tsx
<Descriptions
  bordered
  style={{
    '--soui-descriptions-label-bg': '#fff7e6',
    '--soui-descriptions-border-color': '#ffd591',
  }}
>
  ...
</Descriptions>
```

## 设计原则

- 标签保持简洁，避免超长文本折行
- 同一描述列表内保持信息密度一致
- `bordered` 适合信息密度较高的场景

## 无障碍访问

- 使用语义化的 `<th>` 和 `<td>` 结构，屏幕阅读器可正常解析标签与内容的对应关系

## 相关资源

- [Card 卡片](/components/card)
- [Badge 徽章数](/components/badge)
