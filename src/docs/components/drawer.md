# Drawer 抽屉

屏幕边缘滑出的浮层面板，用于在不离开当前页面的情况下展示额外内容。

## 何时使用

- 需要一个临时面板来展示详情、表单或操作区，而不跳转页面
- 需要比 Dialog 更大的展示空间，尤其是表单类场景
- 需要从屏幕四个方向（上、右、下、左）之一滑出面板

## 代码演示

### 基础用法

最基本的抽屉，通过 `open` 控制显示和隐藏。

```tsx
import { Drawer, Button, Space } from '@soui/ui';

const [open, setOpen] = useState(false);

<Space>
  <Button type="primary" onClick={() => setOpen(true)}>
    打开抽屉
  </Button>
  <Drawer
    title="基础抽屉"
    placement="right"
    open={open}
    onClose={() => setOpen(false)}
  >
    <p>这是抽屉的内容区域。</p>
    <p>抽屉从右侧滑出，适合展示详情、表单等信息。</p>
  </Drawer>
</Space>
```

### 弹出方向

支持 `top`、`right`、`bottom`、`left` 四个方向，默认为 `right`。

```tsx
import { Drawer, Button, Space } from '@soui/ui';

const [open, setOpen] = useState(false);
const [placement, setPlacement] = useState('right');

const showDrawer = (p) => {
  setPlacement(p);
  setOpen(true);
};

<Space>
  <Button onClick={() => showDrawer('top')}>顶部</Button>
  <Button onClick={() => showDrawer('right')}>右侧</Button>
  <Button onClick={() => showDrawer('bottom')}>底部</Button>
  <Button onClick={() => showDrawer('left')}>左侧</Button>
  <Drawer
    title={placement + ' 方向抽屉'}
    placement={placement}
    open={open}
    onClose={() => setOpen(false)}
  >
    <p>抽屉从 {placement} 方向滑出。</p>
  </Drawer>
</Space>
```

### 额外操作与底部

通过 `extra` 属性在标题右侧添加额外操作区，通过 `footer` 属性在底部添加操作按钮。

```tsx
import { Drawer, Button, Space } from '@soui/ui';

const [open, setOpen] = useState(false);

<Space>
  <Button type="primary" onClick={() => setOpen(true)}>
    打开抽屉
  </Button>
  <Drawer
    title="抽屉标题"
    placement="right"
    open={open}
    onClose={() => setOpen(false)}
    extra={
      <Space>
        <Button size="small" onClick={() => setOpen(false)}>取消</Button>
        <Button type="primary" size="small" onClick={() => setOpen(false)}>确定</Button>
      </Space>
    }
    footer={
      <Space>
        <Button onClick={() => setOpen(false)}>取消</Button>
        <Button type="primary" onClick={() => setOpen(false)}>提交</Button>
      </Space>
    }
  >
    <p>抽屉支持 extra 属性在标题右侧添加额外操作区。</p>
    <p>抽屉支持 footer 属性在底部添加操作按钮。</p>
  </Drawer>
</Space>
```

### 抽屉尺寸

通过 `size` 属性控制抽屉宽度或高度。预设 `default`（378px）和 `large`（736px），也支持自定义数值或字符串。

```tsx
import { Drawer, Button, Space } from '@soui/ui';

const [openDefault, setOpenDefault] = useState(false);
const [openLarge, setOpenLarge] = useState(false);
const [openCustom, setOpenCustom] = useState(false);

<Space>
  <Button onClick={() => setOpenDefault(true)}>默认尺寸 (378px)</Button>
  <Button onClick={() => setOpenLarge(true)}>大尺寸 (736px)</Button>
  <Button onClick={() => setOpenCustom(true)}>自定义 (500px)</Button>

  <Drawer
    title="默认尺寸"
    placement="right"
    size="default"
    open={openDefault}
    onClose={() => setOpenDefault(false)}
  >
    <p>默认宽度为 378px。</p>
  </Drawer>

  <Drawer
    title="大尺寸"
    placement="right"
    size="large"
    open={openLarge}
    onClose={() => setOpenLarge(false)}
  >
    <p>大尺寸宽度为 736px。</p>
  </Drawer>

  <Drawer
    title="自定义宽度"
    placement="right"
    size={500}
    open={openCustom}
    onClose={() => setOpenCustom(false)}
  >
    <p>自定义宽度为 500px。</p>
  </Drawer>
</Space>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| open | 抽屉是否可见（受控模式） | `boolean` | `false` | - |
| placement | 抽屉弹出方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | - |
| size | 抽屉宽度（left/right）或高度（top/bottom），支持预设或自定义值 | `'default' \| 'large' \| number \| string` | `'default'` | - |
| title | 抽屉标题 | `ReactNode` | - | - |
| extra | 抽屉右上角额外操作区 | `ReactNode` | - | - |
| footer | 抽屉底部内容 | `ReactNode` | - | - |
| closable | 是否显示关闭按钮 | `boolean` | `true` | - |
| closeIcon | 自定义关闭图标 | `ReactNode` | `<Close />` | - |
| mask | 是否显示遮罩层 | `boolean` | `true` | - |
| maskClosable | 点击遮罩层是否关闭抽屉 | `boolean` | `true` | - |
| keyboard | 是否支持 ESC 键关闭 | `boolean` | `true` | - |
| destroyOnHidden | 关闭后销毁子元素 | `boolean` | `false` | - |
| forceRender | 预渲染内容（即使隐藏时也保留 DOM） | `boolean` | `false` | - |
| zIndex | 设置 Drawer 的 z-index | `number` | `1030` | - |
| getContainer | 指定 Drawer 挂载的 HTML 节点 | `() => HTMLElement` | `() => document.body` | - |
| bodyStyle | 自定义抽屉内容区样式 | `CSSProperties` | - | - |
| headerStyle | 自定义抽屉头部样式 | `CSSProperties` | - | - |
| footerStyle | 自定义抽屉底部样式 | `CSSProperties` | - | - |
| style | 自定义抽屉面板样式 | `CSSProperties` | - | - |
| className | 自定义抽屉面板类名 | `string` | - | - |
| maskClassName | 自定义遮罩层类名 | `string` | - | - |
| wrapClassName | 自定义包裹层类名 | `string` | - | - |
| drawerRender | 自定义渲染包装函数 | `(node: ReactNode) => ReactNode` | - | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onClose | 关闭抽屉时的回调 | `(e: React.MouseEvent \| KeyboardEvent) => void` |
| afterClose | 抽屉关闭动画结束后的回调 | `() => void` |

## 主题定制

Drawer 作为 Portal 组件，通过 `createPortal` 渲染在 ConfigProvider 的 DOM 树之外，通过 DOM 桥接机制（`getComputedStyle` 读取 `.soui-config-provider` 上的 CSS 变量并复制到容器）来实现主题同步。

### 组件级配置

通过 `theme.components.Drawer` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Drawer: {
        borderRadius: 8,
        titleFontSize: 18,
        colorBg: '#fafafa',
        headerPadding: '16px 24px',
        bodyPadding: '20px 24px',
        footerPadding: '12px 24px',
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
2. **组件级配置** - `theme.components.Drawer` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `8` |
| titleFontSize | 标题字号（像素） | `number` | `16` |
| colorBg | 背景色 | `string` | `#fff` |
| maskBgColor | 遮罩背景色 | `string` | `rgba(0, 0, 0, 0.45)` |
| headerPadding | 头部内边距 | `string` | `12px 20px` |
| bodyPadding | 内容区内边距 | `string` | `16px 20px` |
| footerPadding | 底部内边距 | `string` | `10px 20px` |
| zIndex | z-index 层级 | `number` | `1030` |
| boxShadow | 阴影 | `string` | `-6px 0 16px 0 rgba(0,0,0,0.08), ...` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Drawer
  style={{
    '--soui-drawer-border-radius': '12px',
    '--soui-drawer-bg-color': '#f5f5f5',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 使用受控模式管理抽屉状态
const [open, setOpen] = useState(false);
<Drawer open={open} onClose={() => setOpen(false)} title="详情">
  {/* 内容 */}
</Drawer>

// 使用 size 属性控制尺寸
<Drawer size="large" title="大抽屉" open={open} onClose={handleClose}>
  {/* 更多内容 */}
</Drawer>

// 使用 extra 和 footer 提供操作入口
<Drawer
  title="编辑表单"
  extra={<Button size="small">更多</Button>}
  footer={<Button type="primary">提交</Button>}
>
  {/* 表单内容 */}
</Drawer>
```

### 避免使用

```tsx
// 避免不使用 open 属性直接控制显隐
// Drawer 是受控组件，必须通过 open 属性控制

// 避免在抽屉中放置过多内容
// 如果内容过多，考虑使用嵌套抽屉或分步表单
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 使用 `role="dialog"` 和 `aria-modal="true"` 标识对话框语义
- 标题通过 `aria-labelledby` 关联
- 关闭按钮提供 `aria-label="关闭抽屉"`
- 支持 ESC 键关闭（通过 `keyboard` 属性控制）
- 打开时锁定背景滚动，防止误操作

## FAQ

### Drawer 和 Dialog 有什么区别？

Drawer 从屏幕边缘滑出，适合展示较多内容或表单，不会打断用户当前的操作流程。Dialog 居中弹出，更适合需要用户确认或简短交互的场景。

### 如何自定义抽屉的宽度或高度？

使用 `size` 属性，支持三种方式：预设值 `'default'`（378px）和 `'large'`（736px）、数字（如 `500`）、字符串（如 `'50vw'`）。对于 `left`/`right` 方向，size 控制宽度；对于 `top`/`bottom` 方向，size 控制高度。

### 抽屉打开后页面还能滚动吗？

不能。Drawer 打开时会自动锁定 body 的滚动，关闭后恢复。这是为了防止用户在操作抽屉时误滚动背景页面。

### 如何监听抽屉关闭动画结束？

使用 `afterClose` 回调，它会在关闭动画（300ms）完成后触发，适合用于延迟数据加载或清理操作。

## 相关资源

- [Dialog 对话框](/components/dialog)
- [Tooltip 文字提示](/components/tooltip)
