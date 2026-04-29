# Space 间距

用于设置组件之间的间距，使界面更加整洁美观。

## 何时使用

- 需要设置多个组件之间的间距时
- 需要控制水平或垂直方向的排列间距
- 需要在元素之间添加分隔符
- 需要块级布局的间距控制

## 代码演示

### 基础用法

基础的间距用法，默认为水平方向，中间距为 16px。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <Space>
    <Button type="primary">主要按钮</Button>
    <Button>默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="link">链接按钮</Button>
  </Space>
);
```

### 间距尺寸

支持 small、middle、large 三种预设尺寸，也可以使用数字自定义间距大小。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Space size="small">
      <Button>小间距 (8px)</Button>
      <Button>小间距 (8px)</Button>
      <Button>小间距 (8px)</Button>
    </Space>
    <Space size="middle">
      <Button>中间距 (16px)</Button>
      <Button>中间距 (16px)</Button>
      <Button>中间距 (16px)</Button>
    </Space>
    <Space size="large">
      <Button>大间距 (24px)</Button>
      <Button>大间距 (24px)</Button>
      <Button>大间距 (24px)</Button>
    </Space>
    <Space size={40}>
      <Button>自定义 40px</Button>
      <Button>自定义 40px</Button>
      <Button>自定义 40px</Button>
    </Space>
  </div>
);
```

### 排列方向

支持水平（horizontal）和垂直（vertical）两种排列方向。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: '40px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>水平方向（默认）</h4>
      <Space direction="horizontal">
        <Button>按钮 1</Button>
        <Button>按钮 2</Button>
        <Button>按钮 3</Button>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>垂直方向</h4>
      <Space direction="vertical">
        <Button>按钮 1</Button>
        <Button>按钮 2</Button>
        <Button>按钮 3</Button>
      </Space>
    </div>
  </div>
);
```

### 对齐方式

支持多种对齐方式，包括 start、center、end、baseline。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>顶部对齐</h4>
      <Space align="start" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
        <Button>短按钮</Button>
        <Button size="large">长文本按钮</Button>
        <Button size="small">小按钮</Button>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>居中对齐（默认）</h4>
      <Space align="center" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
        <Button>短按钮</Button>
        <Button size="large">长文本按钮</Button>
        <Button size="small">小按钮</Button>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>底部对齐</h4>
      <Space align="end" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
        <Button>短按钮</Button>
        <Button size="large">长文本按钮</Button>
        <Button size="small">小按钮</Button>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>基线对齐</h4>
      <Space align="baseline" style={{ background: '#fafafa', padding: '8px' }}>
        <span style={{ fontSize: '12px' }}>小文字</span>
        <span style={{ fontSize: '16px' }}>中文字</span>
        <span style={{ fontSize: '24px' }}>大文字</span>
      </Space>
    </div>
  </div>
);
```

### 自动换行

当设置 wrap 属性时，子元素超出容器宽度时会自动换行。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <Space wrap size="middle" style={{ maxWidth: '400px', background: '#fafafa', padding: '16px' }}>
    {Array.from({ length: 10 }).map((_, index) => (
      <Button key={index}>按钮 {index + 1}</Button>
    ))}
  </Space>
);
```

### 块级显示

通过 block 属性控制 Space 是否为块级元素。默认使用 inline-flex，设置 block 后变为 flex 占据整行。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h4 style={{ marginBottom: '8px' }}>非块级（inline-flex）</h4>
      <Space style={{ background: '#f0f0f0', padding: '8px' }}>
        <Button type="primary">按钮 1</Button>
        <Button>按钮 2</Button>
      </Space>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
        灰色背景区域仅包裹内容
      </p>
    </div>
    <div>
      <h4 style={{ marginBottom: '8px' }}>块级（flex，占据整行）</h4>
      <Space block style={{ background: '#e6f7ff', padding: '8px' }}>
        <Button type="primary">按钮 1</Button>
        <Button>按钮 2</Button>
      </Space>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
        蓝色背景区域占据整行
      </p>
    </div>
  </div>
);
```

### 分隔符

通过 split 属性在子元素之间添加分隔符，支持文本、符号或自定义元素。

```tsx
import { Space, Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>文本分隔符</h4>
      <Space split="|">
        <Button type="text">首页</Button>
        <Button type="text">产品</Button>
        <Button type="text">关于</Button>
        <Button type="text">联系</Button>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>自定义符号分隔符</h4>
      <Space split={<span style={{ color: '#1677ff', fontWeight: 'bold' }}>•</span>}>
        <span>选项一</span>
        <span>选项二</span>
        <span>选项三</span>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>垂直分隔线</h4>
      <Space
        direction="vertical"
        split={<div style={{ borderBottom: '1px solid #e8e8e8', width: '100%' }} />}
      >
        <div style={{ padding: '8px 0' }}>第一行内容</div>
        <div style={{ padding: '8px 0' }}>第二行内容</div>
        <div style={{ padding: '8px 0' }}>第三行内容</div>
      </Space>
    </div>
    <div>
      <h4 style={{ marginBottom: '12px' }}>组合使用：block + split</h4>
      <Space block split="-" style={{ padding: '12px', background: '#fafafa' }}>
        <Button type="link">链接 1</Button>
        <Button type="link">链接 2</Button>
        <Button type="link">链接 3</Button>
      </Space>
    </div>
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number` | `middle` | - |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `horizontal` | - |
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - | - |
| wrap | 是否自动换行 | `boolean` | `false` | - |
| block | 是否为块级元素 | `boolean` | `false` | - |
| split | 分隔符 | `ReactNode` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义内联样式 | `CSSProperties` | - | - |
| children | 子元素 | `ReactNode` | - | - |

### 尺寸说明

| 尺寸 | 数值 |
|------|------|
| small | 8px |
| middle | 16px |
| large | 24px |
| number | 自定义像素值 |

## 设计原则

### ✅ 推荐用法

```tsx
// 1. 使用预设尺寸保持一致性
<Space size="middle">
  <Button>按钮 1</Button>
  <Button>按钮 2</Button>
</Space>

// 2. 合理使用 block 属性
<Space block style={{ padding: '16px', background: '#f5f5f5' }}>
  <span>左侧内容</span>
  <span>右侧内容</span>
</Space>

// 3. 分隔符增强视觉层次
<Space split="|">
  <Button type="text">编辑</Button>
  <Button type="text">删除</Button>
</Space>

// 4. 垂直布局使用方向属性
<Space direction="vertical" size="large">
  <Input placeholder="用户名" />
  <Input.Password placeholder="密码" />
  <Button type="primary">登录</Button>
</Space>
```

### ❌ 避免使用

```tsx
// 1. 避免过度嵌套 Space
<Space>
  <Space>
    <Space>  {/* 不推荐 */}
      <Button>按钮</Button>
    </Space>
  </Space>
</Space>

// 2. 避免滥用分隔符
<Space split="|">
  <Button>按钮 1</Button>
  <Button>按钮 2</Button>
  <Button>按钮 3</Button>
  <Button>按钮 4</Button>
  <Button>按钮 5</Button>  {/* 太多分隔符会显得杂乱 */}
</Space>

// 3. 避免与 margin 混用造成间距混乱
<Space style={{ margin: '20px' }}>  {/* 不推荐 */}
  <Button>按钮</Button>
</Space>

// 应改为：
<div style={{ margin: '20px' }}>
  <Space>
    <Button>按钮</Button>
  </Space>
</div>
```

## 最佳实践

### 表单布局

```tsx
<Space direction="vertical" size="large" block>
  <Input placeholder="请输入用户名" />
  <Input.Password placeholder="请输入密码" />
  <Space>
    <Button type="primary">登录</Button>
    <Button>注册</Button>
  </Space>
</Space>
```

### 操作按钮组

```tsx
<Space split={<div style={{ width: '1px', height: '12px', background: '#e8e8e8' }} />}>
  <Button type="text">编辑</Button>
  <Button type="text">复制</Button>
  <Button type="text" danger>删除</Button>
</Space>
```

### 响应式布局

```tsx
<Space wrap size={[16, 16]}>
  {tags.map((tag) => (
    <Tag key={tag}>{tag}</Tag>
  ))}
</Space>
```

## 无障碍访问

Space 组件遵循 WAI-ARIA 规范：

- 使用 CSS gap 属性实现间距，不影响文档流
- 分隔符使用 `<span>` 标签，不会干扰屏幕阅读器
- 支持自定义 `role` 和 `aria-*` 属性

```tsx
<Space role="toolbar" aria-label="操作工具栏">
  <Button aria-label="编辑">编辑</Button>
  <Button aria-label="删除">删除</Button>
</Space>
```

## FAQ

### 如何设置不同方向的间距？

当前版本支持统一的间距设置。如果需要水平垂直不同间距，可以使用 style 属性：

```tsx
<Space
  size={16}
  style={{ gap: '16px 24px' }}  // rowGap columnGap
>
  <Button>按钮 1</Button>
  <Button>按钮 2</Button>
</Space>
```

### 分隔符如何自定义样式？

可以传入任意 ReactNode 作为分隔符：

```tsx
<Space
  split={
    <span style={{
      color: '#1677ff',
      fontWeight: 'bold',
      padding: '0 4px'
    }}>
      •
    </span>
  }
>
  <Button type="text">选项 1</Button>
  <Button type="text">选项 2</Button>
</Space>
```

### block 属性和 style 中的 display 冲突怎么办？

block 属性优先级高于 style 中的 display。如果设置了 `block={true}`，组件会强制使用 `display: flex`：

```tsx
// block 生效，display 为 flex
<Space block style={{ display: 'inline-flex' }}>
  <Button>按钮</Button>
</Space>
```

### 如何处理空子元素？

Space 组件会自动过滤 null 和 undefined 的子元素：

```tsx
<Space>
  <Button>按钮 1</Button>
  {showExtra && <Button>额外按钮</Button>}  {/* 条件渲染安全 */}
  <Button>按钮 2</Button>
</Space>
```

## 相关资源

- [Button 按钮](/components/button) - 配合 Space 使用的常见组件
- [ConfigProvider 全局配置](/theming/config-provider) - 全局主题配置
- [样式间距规范](/styles/spacing) - 设计系统中的间距规范
