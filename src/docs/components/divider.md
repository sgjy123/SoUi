# Divider 分割线

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分隔
- 在行内元素之间添加垂直分割线（如导航菜单）
- 带文字的分割线用于分组标题

## 代码演示

### 基础用法

简单的水平分割线和虚线样式。

```tsx
import { Divider } from '@soui/ui';

export default () => (
  <>
    <p>第一段内容</p>
    <Divider />
    <p>第二段内容</p>
    <Divider dashed />
    <p>第三段内容（虚线分割）</p>
  </>
);
```

### 带文字的分割线

可以在分割线中嵌入文字，支持居中、左对齐、右对齐。

```tsx
import { Divider } from '@soui/ui';

export default () => (
  <>
    <Divider>Center Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <Divider orientation="left" orientationMargin={20}>
      Custom Margin
    </Divider>
  </>
);
```

### 垂直分割线

用于分隔行内元素，如导航菜单或操作按钮组。

```tsx
import { Divider } from '@soui/ui';

export default () => (
  <>
    <span>Home</span>
    <Divider type="vertical" />
    <span>Products</span>
    <Divider type="vertical" />
    <span>About</span>
    <Divider type="vertical" />
    <span>Contact</span>
  </>
);
```

### 自定义颜色

通过 `color` 属性自定义分割线的颜色。

```tsx
import { Divider } from '@soui/ui';

export default () => (
  <>
    <p>Default color</p>
    <Divider />
    
    <p>Custom color</p>
    <Divider color="#1677ff" />
    
    <p>Dashed with custom color</p>
    <Divider dashed color="#52c41a" />
    
    <p>With text and custom color</p>
    <Divider color="#faad14">Custom Color Text</Divider>
  </>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 分割线方向，可选 `horizontal` 或 `vertical` | `string` | `horizontal` | - |
| dashed | 是否为虚线 | `boolean` | `false` | - |
| orientation | 文字位置（仅水平分割线有效），可选 `left`、`right` 或 `center` | `string` | `center` | - |
| orientationMargin | 文字与边缘的距离（像素或百分比） | `string \| number` | - | - |
| color | 分割线颜色 | `string` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

## 主题定制

Divider 组件支持通过 ConfigProvider 进行主题定制。

### 全局配置

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      borderColorBase: '#d9d9d9', // 边框颜色
      fontSize: 14, // 字体大小
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 组件级配置

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Divider: {
          colorBorder: '#e8e8e8', // 分割线颜色
          fontSize: 16, // 文字字号
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

## 设计原则

### ✅ 推荐用法

```tsx
// 使用分割线分隔不同内容区块
<p>第一段内容</p>
<Divider />
<p>第二段内容</p>

// 使用垂直分割线分隔导航项
<span>首页</span>
<Divider type="vertical" />
<span>产品</span>
```

### ❌ 避免使用

```tsx
// 不要过度使用分割线，避免视觉混乱
<Divider />
<Divider />
<Divider />

// 不要在不需要分隔的地方使用分割线
<Button>提交</Button>
<Divider />
<Button>取消</Button>
// 应该使用 Space 组件
```

## 无障碍访问

- 分割线使用 `role="separator"` 语义化标签
- 垂直分割线添加了 `aria-orientation` 属性
- 确保分割线有足够的对比度以满足 WCAG 标准

## FAQ

### 如何调整分割线的间距？

可以通过 `style` 属性设置 margin：

```tsx
<Divider style={{ margin: '24px 0' }} />
```

### 如何在分割线中使用富文本内容？

可以直接在 children 中使用 JSX 元素：

```tsx
<Divider>
  <strong>重要信息</strong>
</Divider>
```

### 垂直分割线的高度可以自定义吗？

可以通过 `style` 属性设置高度：

```tsx
<Divider type="vertical" style={{ height: 30 }} />
```

### 分割线的粗细可以调整吗？

目前不支持直接调整粗细，但可以通过 CSS 覆盖：

```tsx
<Divider style={{ borderTopWidth: 2 }} />
```

## 相关资源

- [Space 间距](/components/space) - 用于控制组件之间的间距
- [Typography 排版](/components/typography) - 用于文本展示
