---
title: GlowBorder 流光边框
---

# GlowBorder 流光边框

装饰性流光边框组件，通过旋转 conic-gradient 实现流光动画效果，可自定义颜色、速度、外发光等。

## 何时使用

- 需要为卡片、按钮、图片等元素添加流光装饰效果
- 活动入口、重点区域的视觉强调

## 代码示例

### 基础用法

```tsx
import { GlowBorder } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        流光边框
      </div>
    </GlowBorder>
    <GlowBorder borderWidth={3} radius={16}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        更粗边框 + 更大圆角
      </div>
    </GlowBorder>
  </div>
);
```

### 自定义颜色

```tsx
import { GlowBorder } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder colors={['#ff4d4f', '#faad14']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        红黄渐变
      </div>
    </GlowBorder>
    <GlowBorder colors={['#52c41a', '#13c2c2', '#1677ff']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        三色流光
      </div>
    </GlowBorder>
    <GlowBorder colors={['#722ed1', '#eb2f96']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        紫粉渐变
      </div>
    </GlowBorder>
  </div>
);
```

### 旋转速度与方向

```tsx
import { GlowBorder } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder duration={1}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        快速（1s）
      </div>
    </GlowBorder>
    <GlowBorder duration={6}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        慢速（6s）
      </div>
    </GlowBorder>
    <GlowBorder reverse>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        反向旋转
      </div>
    </GlowBorder>
    <GlowBorder paused>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        暂停动画
      </div>
    </GlowBorder>
  </div>
);
```

### 外发光效果

```tsx
import { GlowBorder } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 16 }}>
    <GlowBorder glow={8} colors={['#1677ff', '#36cfc9']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=8
      </div>
    </GlowBorder>
    <GlowBorder glow={16} colors={['#722ed1', '#eb2f96']} borderWidth={3}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=16
      </div>
    </GlowBorder>
    <GlowBorder glow={24} colors={['#ff4d4f', '#faad14']} borderWidth={4} radius={20}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=24
      </div>
    </GlowBorder>
  </div>
);
```

### 深色/透明背景

```tsx
import { GlowBorder } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 16, background: '#141414', borderRadius: 8 }}>
    <GlowBorder background="#1f1f1f" colors={['#1677ff', '#36cfc9']} borderWidth={2}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        深色背景
      </div>
    </GlowBorder>
    <GlowBorder background="transparent" colors={['#722ed1', '#eb2f96']} borderWidth={2}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        透明背景
      </div>
    </GlowBorder>
    <GlowBorder background="#1f1f1f" colors={['#ff4d4f', '#faad14']} borderWidth={2} glow={12}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        深色 + 外发光
      </div>
    </GlowBorder>
  </div>
);
```

### 主题定制

```tsx
import { GlowBorder, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        GlowBorder: {
          colorPrimary: '#ff4d4f',
          colorSecondary: '#faad14',
          background: '#fff7e6',
          borderRadius: 16,
        },
      },
    }}
  >
    <GlowBorder glow={8} borderWidth={3}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        主题定制
      </div>
    </GlowBorder>
  </ConfigProvider>
);
```

## API

### GlowBorder

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 内容 | ReactNode | - |
| colors | 流光渐变颜色数组 | string[] | `['#1677ff', '#36cfc9']` |
| borderWidth | 边框宽度（像素） | number | `2` |
| radius | 圆角（像素） | number | `8` |
| duration | 旋转一圈耗时（秒） | number | `3` |
| reverse | 是否反向旋转 | boolean | `false` |
| paused | 是否暂停动画 | boolean | `false` |
| glow | 外发光模糊半径（像素），0 为不发光 | number | `0` |
| background | 内容区背景色 | string | `'#fff'` |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.GlowBorder` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色（流光渐变色1） | string | `'#1677ff'` |
| colorSecondary | 副色（流光渐变色2） | string | `'#36cfc9'` |
| background | 内容区背景色 | string | `'#fff'` |
| borderRadius | 圆角（像素） | number | `8` |
