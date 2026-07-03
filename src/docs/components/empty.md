# Empty 空状态

空状态时的占位提示，用于信息不存在时的引导反馈。

## 何时使用

- 列表、表格等数据容器无数据时
- 搜索无结果时的友好提示
- 页面内容为空的引导提示
- 需要引导用户进行操作的场景

## 代码演示

### 基础用法

默认空状态，展示内置的 SVG 插图和"暂无数据"描述。

```tsx
import { Empty } from '@soui/ui';
```

### 简约模式

使用 `Empty.PRESENTED_IMAGE_SIMPLE` 展示更紧凑的简约插图。

```tsx
import { Empty } from '@soui/ui';
```

### 带操作按钮

通过 `children` 添加操作区，放置引导按钮。

```tsx
import { Empty, Button } from '@soui/ui';
```

### 自定义图片

支持传入 URL 字符串或 React 节点作为自定义图片。

```tsx
import { Empty } from '@soui/ui';
```

### 主题定制

通过 ConfigProvider 自定义空状态的插图颜色和尺寸。

```tsx
import { Empty, ConfigProvider } from '@soui/ui';
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| image | 自定义图片，支持 URL 字符串或 React 节点 | `ReactNode` | 内置 SVG | - |
| imageStyle | 图片区域样式 | `CSSProperties` | - | - |
| description | 自定义描述内容，传入 `null` 隐藏描述 | `ReactNode` | `'暂无数据'` | - |
| children | 底部操作区内容（如按钮） | `ReactNode` | - | - |

### 预设图片

| 名称 | 说明 |
|------|------|
| `Empty.PRESENTED_IMAGE_DEFAULT` | 默认复杂插图（184x152） |
| `Empty.PRESENTED_IMAGE_SIMPLE` | 简约插图（64x41），触发紧凑布局 |

## 主题定制

Empty 组件作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Empty` 针对空状态进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Empty: {
        fontSize: 14,
        descriptionColor: 'rgba(0, 0, 0, 0.65)',
        imageHeight: 120,
        iconColor: '#1677ff',
        iconBg: 'rgba(22, 119, 255, 0.08)',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fontSize | 字体大小（像素） | `number` | `14` |
| descriptionColor | 描述文本颜色 | `string` | `rgba(0,0,0,0.65)` |
| imageHeight | 图片区域高度（像素） | `number` | `120` |
| iconColor | 装饰图标颜色 | `string` | 主色 |
| iconBg | 装饰图标背景色 | `string` | `rgba(22,119,255,0.08)` |
| borderColor | 插图边框颜色 | `string` | `#d9d9d9` |
| panelBg | 插图面板背景色 | `string` | `#f5f5f5` |
| contentBg | 插图内容背景色 | `string` | `#f5f5f5` |
| detailColor | 插图细节线条颜色 | `string` | `#f0f0f0` |
| shadowColor | 插图阴影颜色 | `string` | `rgba(0,0,0,0.06)` |

## 无障碍访问

- 使用 `role="status"` 标记空状态区域
- 描述文本提供语义化信息，辅助屏幕阅读器理解

## 常见问题

### 如何完全隐藏描述文字？

传入 `description={null}` 即可隐藏描述区域。

### 如何自定义插图颜色？

通过 ConfigProvider 的 `components.Empty` 配置 `iconColor`、`iconBg`、`borderColor` 等属性，SVG 插图会自动跟随主题颜色。

### 简约模式和默认模式有什么区别？

使用 `Empty.PRESENTED_IMAGE_SIMPLE` 作为 `image` 时，组件自动切换为紧凑布局：图片高度缩小为 40px，字号减小，整体更适合作为列表项内的空状态提示。
