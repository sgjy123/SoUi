# Icon 图标

语义化的矢量图标组件，基于 [@icon-park/react](https://iconpark.oceanengine.com/) 图标库。

## 何时使用

- 需要添加视觉标识来增强界面表达
- 作为按钮、菜单项的辅助图标
- 展示状态信息（成功、警告、错误等）
- 品牌标识或功能图标

## 代码演示

### 基础用法

通过 name 属性指定图标名称，默认为 outline 主题。

```tsx
import { Icon, Space } from '@soui/ui';

export default () => (
  <Space wrap size="large">
    <Icon name="Home" size={24} />
    <Icon name="User" size={24} />
    <Icon name="Setting" size={24} />
    <Icon name="Search" size={24} />
    <Icon name="Loading" size={24} />
  </Space>
);
```

### 主题样式

支持 outline（轮廓）和 filled（填充）两种主题样式。

```tsx
import { Icon, Space } from '@soui/ui';

export default () => (
  <Space wrap size="large">
    <Icon name="Home" size={32} theme="outline" />
    <Icon name="Home" size={32} theme="filled" />
    <Icon name="User" size={32} theme="outline" />
    <Icon name="User" size={32} theme="filled" />
    <Icon name="Setting" size={32} theme="outline" />
    <Icon name="Setting" size={32} theme="filled" />
  </Space>
);
```

### 自定义颜色

通过 fill 属性自定义图标颜色，支持任意 CSS 颜色值。

```tsx
import { Icon, Space } from '@soui/ui';

export default () => (
  <Space wrap size="large">
    <Icon name="CheckCorrect" size={24} fill="#52c41a" />
    <Icon name="Close" size={24} fill="#ff4d4f" />
    <Icon name="Info" size={24} fill="#1677ff" />
    <Icon name="Reminder" size={24} fill="#faad14" />
    <Icon name="Star" size={24} fill="#722ed1" />
  </Space>
);
```

### 主题色适配

未指定 fill 时，图标会自动使用 ConfigProvider 配置的主题色。

```tsx
import { Icon, Space, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider theme={{ primaryColor: '#722ed1' }}>
    <Space wrap size="large">
      <Icon name="Home" size={24} />
      <Icon name="User" size={24} />
      <Icon name="Setting" size={24} />
    </Space>
  </ConfigProvider>
);
```

### 不同尺寸

通过 size 属性设置图标大小，单位为像素。

```tsx
import { Icon, Space } from '@soui/ui';

export default () => (
  <Space wrap align="end">
    <Icon name="Home" size={16} />
    <Icon name="Home" size={24} />
    <Icon name="Home" size={32} />
    <Icon name="Home" size={48} />
    <Icon name="Home" size={64} />
  </Space>
);
```

### 点击交互

支持 onClick 事件，可以配合其他操作使用。

```tsx
import { Icon, Space, Message } from '@soui/ui';

export default () => (
  <Space size="large">
    <Icon
      name="Like"
      size={24}
      onClick={() => Message.success('已点赞')}
      style={{ cursor: 'pointer' }}
    />
    <Icon
      name="Share"
      size={24}
      onClick={() => Message.info('分享功能')}
      style={{ cursor: 'pointer' }}
    />
    <Icon
      name="Download"
      size={24}
      onClick={() => Message.loading('下载中...')}
      style={{ cursor: 'pointer' }}
    />
  </Space>
);
```

### 配合按钮使用

图标常与按钮组合使用，增强视觉识别。

```tsx
import { Icon, Button, Space } from '@soui/ui';

export default () => (
  <Space>
    <Button icon={<Icon name="Search" size={16} />}>搜索</Button>
    <Button type="primary" icon={<Icon name="Download" size={16} fill="#fff" />}>
      下载
    </Button>
    <Button type="dashed" icon={<Icon name="Upload" size={16} />}>
      上传
    </Button>
  </Space>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| name | 图标名称 | `string` | - | - |
| theme | 图标主题 | `'outline' \| 'filled'` | `outline` | - |
| size | 图标大小 | `number` | `24` | - |
| fill | 填充颜色 | `string` | 主题色 | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义内联样式 | `CSSProperties` | - | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onClick | 点击事件 | `(e: MouseEvent) => void` |

## 图标列表

Icon 组件基于 [@icon-park/react](https://iconpark.oceanengine.com/) 图标库，支持 2000+ 图标。

### 常用图标

| 图标名称 | 预览 | 说明 |
|---------|------|------|
| Home | 🏠 | 首页 |
| User | 👤 | 用户 |
| Setting | ⚙️ | 设置 |
| Search | 🔍 | 搜索 |
| Loading | 🔄 | 加载 |
| CheckCorrect | ✅ | 正确 |
| Close | ❌ | 关闭 |
| Info | ℹ️ | 信息 |
| Reminder | ⚠️ | 提醒 |
| Download | ⬇️ | 下载 |
| Upload | ⬆️ | 上传 |
| Edit | ✏️ | 编辑 |
| Delete | 🗑️ | 删除 |
| Add | ➕ | 添加 |
| More | ⋯ | 更多 |
| ArrowLeft | ← | 左箭头 |
| ArrowRight | → | 右箭头 |
| ArrowUp | ↑ | 上箭头 |
| ArrowDown | ↓ | 下箭头 |
| Star | ⭐ | 收藏 |
| Heart | ❤️ | 喜欢 |
| Eye | 👁️ | 查看 |
| Lock | 🔒 | 锁定 |
| Unlock | 🔓 | 解锁 |

> 💡 **提示**：完整图标列表请访问 [IconPark 官网](https://iconpark.oceanengine.com/) 查看。

## 设计原则

### ✅ 推荐用法

```tsx
// 1. 使用语义化的图标名称
<Icon name="Search" />  // 清晰表达搜索功能
<Icon name="Download" /> // 清晰表达下载功能

// 2. 保持一致的尺寸
<Space>
  <Icon name="Home" size={24} />
  <Icon name="User" size={24} />
  <Icon name="Setting" size={24} />
</Space>

// 3. 使用主题色保持一致性
<Icon name="Info" /> // 自动使用主题色

// 4. 功能色表达状态
<Icon name="CheckCorrect" fill="#52c41a" /> // 成功
<Icon name="Close" fill="#ff4d4f" />       // 错误
<Icon name="Reminder" fill="#faad14" />    // 警告
```

### ❌ 避免使用

```tsx
// 1. 避免使用不存在的图标名称
<Icon name="NonExistentIcon" /> // 会在控制台警告

// 2. 避免在同一场景混用不同尺寸
<Space>
  <Icon name="Home" size={16} />
  <Icon name="User" size={32} />  // 尺寸不统一
</Space>

// 3. 避免滥用彩色图标
<Space>
  <Icon name="Home" fill="red" />
  <Icon name="User" fill="blue" />   // 颜色过多显得杂乱
  <Icon name="Setting" fill="green" />
</Space>

// 4. 避免过大的图标
<Icon name="Home" size={200} /> // 尺寸过大影响布局
```

## 最佳实践

### 状态图标

```tsx
<Space>
  <Icon name="CheckCorrect" size={20} fill="#52c41a" />
  <span>操作成功</span>
</Space>

<Space>
  <Icon name="Close" size={20} fill="#ff4d4f" />
  <span>操作失败</span>
</Space>

<Space>
  <Icon name="Loading" size={20} fill="#1677ff" />
  <span>处理中...</span>
</Space>
```

### 导航图标

```tsx
<nav>
  <Space direction="vertical">
    <Space>
      <Icon name="Home" size={20} />
      <span>首页</span>
    </Space>
    <Space>
      <Icon name="User" size={20} />
      <span>个人中心</span>
    </Space>
    <Space>
      <Icon name="Setting" size={20} />
      <span>系统设置</span>
    </Space>
  </Space>
</nav>
```

### 操作按钮组

```tsx
<Space>
  <Button type="text" icon={<Icon name="Edit" size={16} />}>
    编辑
  </Button>
  <Button type="text" icon={<Icon name="Copy" size={16} />}>
    复制
  </Button>
  <Button type="text" danger icon={<Icon name="Delete" size={16} />}>
    删除
  </Button>
</Space>
```

## 无障碍访问

Icon 组件遵循 WAI-ARIA 规范：

- 自动添加 `role="img"` 语义
- 使用图标名称作为 `aria-label`
- 支持键盘操作（配合 onClick 时）

```tsx
// 默认 aria-label 为图标名称
<Icon name="Home" />
// 渲染为: <span role="img" aria-label="Home">...</span>

// 如需自定义 aria-label，可以使用外层包装
<span role="img" aria-label="返回首页">
  <Icon name="Home" />
</span>
```

## FAQ

### 如何查看所有可用图标？

访问 [@icon-park/react 官网](https://iconpark.oceanengine.com/) 查看所有可用图标及其名称。

```tsx
// 也可以打印所有可用图标
import * as Icons from '@icon-park/react';
console.log(Object.keys(Icons));
```

### 图标不显示怎么办？

1. 检查图标名称是否正确（区分大小写）
2. 检查控制台是否有警告信息
3. 确认 @icon-park/react 已正确安装

```tsx
// 错误的名称会显示警告
<Icon name="home" /> // ❌ 首字母需大写
<Icon name="Home" /> // ✅ 正确
```

### 如何自定义图标颜色？

```tsx
// 方法 1: 使用 fill 属性
<Icon name="Home" fill="#1677ff" />

// 方法 2: 使用 CSS 变量
<Icon name="Home" style={{ color: 'var(--primary-color)' }} />

// 方法 3: 继承父元素颜色
<Icon name="Home" fill="currentColor" />
```

### 如何实现旋转动画？

```tsx
<Icon
  name="Loading"
  size={24}
  style={{
    animation: 'spin 1s linear infinite',
  }}
/>

// 在 CSS 中定义动画
// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
```

### 如何与其他组件配合使用？

```tsx
// 与按钮配合
<Button icon={<Icon name="Search" size={16} />}>搜索</Button>

// 与输入框配合
<Input prefix={<Icon name="Search" size={16} />} placeholder="搜索" />

// 与菜单配合
<Menu icon={<Icon name="Home" size={16} />}>首页</Menu>
```

## 相关资源

- [@icon-park/react 官网](https://iconpark.oceanengine.com/) - 完整图标库
- [Button 按钮](/components/button) - 图标常与按钮配合使用
- [ConfigProvider 全局配置](/theming/config-provider) - 配置主题色
