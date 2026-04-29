# ConfigProvider 全局配置

为所有内嵌组件提供统一的主题配置。

## 何时使用

- 需要统一修改组件库的主题色、圆角等设计变量
- 实现暗黑模式切换
- 自定义组件的样式表现
- 多品牌、多主题的应用场景

## 基础用法

```tsx
import { ConfigProvider, Button, Input } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1677ff',
        borderRadius: 6,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
      }}
    >
      <Button type="primary">主要按钮</Button>
      <Input placeholder="请输入" />
    </ConfigProvider>
  );
}
```

## API

### ConfigProvider Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| theme | 全局主题配置 | `ThemeConfig` | - |
| locale | 语言包配置 | `Locale` | `zh_CN` |
| getPopupContainer | 弹出层渲染容器 | `(triggerNode: HTMLElement) => HTMLElement` | `() => document.body` |
| prefixCls | 自定义类名前缀 | `string` | `soui` |
| iconPrefixCls | 图标类名前缀 | `string` | `soui-icon` |

### ThemeConfig

```typescript
interface ThemeConfig {
  // 基础配置
  primaryColor?: string;
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
  infoColor?: string;
  
  // 尺寸配置
  borderRadius?: number;
  fontSize?: number;
  lineHeight?: number;
  
  // 间距配置
  spacingUnit?: number;
  
  // 算法配置
  algorithm?: Algorithm | Algorithm[];
  
  // 组件级配置
  components?: {
    Button?: ComponentTheme;
    Input?: ComponentTheme;
    Card?: ComponentTheme;
    // ... 其他组件
  };
}
```

## 主题算法

SoUi 提供了内置的主题算法，用于快速切换主题风格。

### 默认算法（亮色主题）

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### 暗黑算法（暗色主题）

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### 紧凑算法（小尺寸）

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### 组合使用算法

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## 完整示例

### 多主题切换

```tsx
import { useState } from 'react';
import { ConfigProvider, Switch, Card, Button, Space } from '@soui/ui';

const themes = {
  light: {
    algorithm: theme.defaultAlgorithm,
    primaryColor: '#1677ff',
  },
  dark: {
    algorithm: theme.darkAlgorithm,
    primaryColor: '#177ddc',
  },
  compact: {
    algorithm: theme.compactAlgorithm,
  },
};

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <ConfigProvider theme={themes[currentTheme]}>
      <Card>
        <Space direction="vertical">
          <div>
            <span>当前主题：</span>
            <Switch
              checked={currentTheme === 'dark'}
              onChange={(checked) => 
                setCurrentTheme(checked ? 'dark' : 'light')
              }
              checkedChildren="暗色"
              unCheckedChildren="亮色"
            />
          </div>
          
          <Button type="primary">主要按钮</Button>
          <Button>默认按钮</Button>
        </Space>
      </Card>
    </ConfigProvider>
  );
}
```

### 组件级定制

针对特定组件进行样式定制：

```tsx
import { ConfigProvider, Button } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: {
          Button: {
            colorPrimary: '#722ed1',
            borderRadius: 8,
            controlHeight: 40,
            fontSize: 16,
          },
          Input: {
            colorBorder: '#d9d9d9',
            borderRadius: 4,
          },
        },
      }}
    >
      <Button type="primary">紫色按钮</Button>
    </ConfigProvider>
  );
}
```

### 动态主题配置

根据用户偏好动态调整主题：

```tsx
import { useEffect, useState } from 'react';
import { ConfigProvider } from '@soui/ui';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        primaryColor: isDark ? '#177ddc' : '#1677ff',
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## CSS 变量模式

ConfigProvider 会自动生成 CSS 变量，您可以在任何地方使用：

```tsx
<div style={{ 
  backgroundColor: 'var(--soui-primary-color)',
  color: 'white',
  padding: '16px'
}}>
  使用主题色的背景
</div>
```

### 可用的 CSS 变量

```css
:root {
  /* 颜色变量 */
  --soui-primary-color: #1677ff;
  --soui-primary-hover-color: #4096ff;
  --soui-primary-active-color: #0958d9;
  --soui-success-color: #52c41a;
  --soui-warning-color: #faad14;
  --soui-error-color: #ff4d4f;
  --soui-info-color: #1677ff;
  
  /* 文本变量 */
  --soui-text-color: rgba(0, 0, 0, 0.88);
  --soui-text-color-secondary: rgba(0, 0, 0, 0.65);
  --soui-text-color-disabled: rgba(0, 0, 0, 0.25);
  
  /* 背景变量 */
  --soui-bg-color: #ffffff;
  --soui-bg-color-layout: #f5f5f5;
  
  /* 边框变量 */
  --soui-border-color: #d9d9d9;
  --soui-border-radius: 6px;
  
  /* 阴影变量 */
  --soui-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

## 最佳实践

### ✅ 推荐用法

```tsx
// 1. 在应用顶层使用 ConfigProvider
function Root() {
  return (
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  );
}

// 2. 使用算法切换主题
<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
  <App />
</ConfigProvider>

// 3. 结合 localStorage 保存主题偏好
const savedTheme = localStorage.getItem('theme') || 'light';
const [theme, setTheme] = useState(savedTheme);

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

### ❌ 避免使用

```tsx
// 1. 避免嵌套多层 ConfigProvider
<ConfigProvider theme={theme1}>
  <ConfigProvider theme={theme2}> {/* 不推荐 */}
    <App />
  </ConfigProvider>
</ConfigProvider>

// 2. 避免在内联样式中硬编码颜色
<Button style={{ backgroundColor: '#1677ff' }}> {/* 不推荐 */}
  按钮
</Button>

// 3. 避免频繁切换主题（性能考虑）
// 应该在用户明确操作时才切换主题
```

## 与 Less 变量配合

如果您使用 Less，可以配合使用：

```less
@import '@soui/ui/dist/soui.css';

.my-component {
  background-color: @primary-color;
  border-radius: @border-radius-base;
  padding: @padding-md;
}
```

## 无障碍支持

ConfigProvider 会确保所有组件保持无障碍访问特性：

- 自动管理焦点
- 支持键盘导航
- 提供 ARIA 属性
- 保证颜色对比度

## 相关资源

- [CSS 变量](/theming/css-variables) - 深入了解 CSS 变量
- [暗黑模式](/theming/dark-mode) - 实现暗黑主题
- [色彩系统](/styles/colors) - 了解颜色规范
