---
title: 暗黑模式
---

# 暗黑模式

本文介绍如何在 SoUi 中实现暗黑模式（暗色主题）。

## 重要说明

与 Ant Design 不同，**SoUi 没有内置的暗黑算法**（即不存在 `theme.darkAlgorithm`）。SoUi 的主题系统完全基于 CSS 变量和 `ConfigProvider` 构建，暗色主题需要通过**手动覆盖 CSS 变量**来实现。

这种方式虽然需要自行定义暗色变量值，但也提供了更高的灵活性和更细粒度的控制能力。

## 实现方案概述

SoUi 推荐的暗黑模式实现方案有两种，可以单独使用或组合使用：

| 方案 | 适用场景 | 优点 |
|------|---------|------|
| CSS 变量覆盖 | 全局暗色切换 | 简洁、性能好、可覆盖所有组件 |
| ConfigProvider 配置 | 局部暗色区域 | 类型安全、可与亮色主题共存 |

## 方案一：CSS 变量覆盖（推荐）

通过在一个暗色容器上重新定义 SoUi 的 CSS 变量值，实现全局暗色主题切换。

### 步骤 1：定义暗色 CSS 变量

在你的全局样式文件中，使用属性选择器或类名选择器覆盖 CSS 变量：

```css
/* 使用 data 属性切换 */
[data-theme="dark"] {
  /* 全局基础变量 */
  --soui-primary-color: #177ddc;
  --soui-primary-hover-color: #3c9ae8;
  --soui-primary-active-color: #1264b3;
  --soui-success-color: #49aa19;
  --soui-warning-color: #d89614;
  --soui-error-color: #d32029;
  --soui-info-color: #177ddc;

  /* 设计令牌 */
  --soui-color-bg-default: rgba(255, 255, 255, 0.85);
  --soui-color-text-inverse: #141414;
  --soui-font-size-sm: 12px;
  --soui-line-height-sm: 1.6667;

  /* 排版变量 */
  --soui-typography-color-text: rgba(255, 255, 255, 0.85);
  --soui-typography-color-text-secondary: rgba(255, 255, 255, 0.65);
  --soui-typography-color-text-disabled: rgba(255, 255, 255, 0.25);
  --soui-typography-color-link: #177ddc;
  --soui-typography-color-link-hover: #3c9ae8;
  --soui-typography-mark-bg-color: #594214;
  --soui-typography-code-bg-color: rgba(255, 255, 255, 0.08);
  --soui-typography-code-border-color: rgba(255, 255, 255, 0.12);

  /* 表单类组件 */
  --soui-input-color-bg: #141414;
  --soui-input-color-text: rgba(255, 255, 255, 0.85);
  --soui-input-color-border: #424242;
  --soui-input-color-border-hover: #177ddc;
  --soui-input-color-border-focus: #177ddc;
  --soui-input-color-bg-disabled: rgba(255, 255, 255, 0.08);
  --soui-input-color-text-disabled: rgba(255, 255, 255, 0.25);
  --soui-input-color-icon: rgba(255, 255, 255, 0.30);
  --soui-input-color-icon-hover: rgba(255, 255, 255, 0.45);
  --soui-input-color-addon-bg: rgba(255, 255, 255, 0.04);
  --soui-input-color-addon-text: rgba(255, 255, 255, 0.85);

  --soui-select-color-bg: #141414;
  --soui-select-color-text: rgba(255, 255, 255, 0.85);
  --soui-select-color-border: #424242;
  --soui-select-dropdown-bg: #1f1f1f;
  --soui-select-option-active-bg: rgba(255, 255, 255, 0.08);
  --soui-select-option-selected-bg: rgba(23, 125, 220, 0.20);
  --soui-select-tag-bg: rgba(255, 255, 255, 0.08);

  --soui-radio-color-bg: #141414;
  --soui-radio-color-text: rgba(255, 255, 255, 0.85);
  --soui-radio-color-border: #424242;
  --soui-radio-color-bg-disabled: rgba(255, 255, 255, 0.08);

  --soui-checkbox-color-bg: #141414;
  --soui-checkbox-color-text: rgba(255, 255, 255, 0.85);
  --soui-checkbox-color-border: #424242;
  --soui-checkbox-color-bg-disabled: rgba(255, 255, 255, 0.08);

  --soui-switch-color-bg: rgba(255, 255, 255, 0.25);
  --soui-switch-color-bg-hover: rgba(255, 255, 255, 0.35);

  /* Tooltip 和弹出层 */
  --soui-tooltip-bg-color: rgba(255, 255, 255, 0.85);
  --soui-tooltip-text-color: #141414;
  --soui-popconfirm-bg-color: #1f1f1f;
  --soui-popconfirm-title-color: rgba(255, 255, 255, 0.85);
  --soui-popconfirm-description-color: rgba(255, 255, 255, 0.65);

  /* 对话框和抽屉 */
  --soui-dialog-bg-color: #1f1f1f;
  --soui-dialog-mask-bg-color: rgba(0, 0, 0, 0.65);
  --soui-drawer-bg-color: #1f1f1f;
  --soui-drawer-mask-bg-color: rgba(0, 0, 0, 0.65);

  /* 表格 */
  --soui-table-header-bg: rgba(255, 255, 255, 0.04);
  --soui-table-row-hover-bg: rgba(255, 255, 255, 0.08);
  --soui-table-border-color: #303030;
  --soui-table-stripe-bg: rgba(255, 255, 255, 0.02);

  /* 菜单和导航 */
  --soui-menu-color-text: rgba(255, 255, 255, 0.85);
  --soui-menu-item-hover-bg: rgba(255, 255, 255, 0.08);
  --soui-menu-item-active-bg: rgba(255, 255, 255, 0.12);
  --soui-menu-item-selected-bg: rgba(23, 125, 220, 0.20);

  /* 分割线 */
  --soui-divider-color: #303030;

  /* 布局 */
  --soui-layout-color-bg: #141414;
  --soui-layout-header-color-bg: #1f1f1f;
  --soui-layout-header-color-text: rgba(255, 255, 255, 0.85);
  --soui-layout-sider-color-bg: #141414;
  --soui-layout-content-color-bg: #141414;
  --soui-layout-footer-color-bg: #1f1f1f;
  --soui-layout-footer-color-text: rgba(255, 255, 255, 0.65);

  /* 卡片和其他组件 */
  --soui-card-color-bg: #1f1f1f;
  --soui-card-border-color: #303030;
  --soui-skeleton-color-bg: rgba(255, 255, 255, 0.06);
  --soui-skeleton-color-highlight: rgba(255, 255, 255, 0.12);
  --soui-collapse-color-bg: #1f1f1f;
  --soui-collapse-border-color: #303030;
  --soui-notification-bg-color: #1f1f1f;
}
```

### 步骤 2：在应用中切换主题

使用 React 状态控制 `data-theme` 属性：

```tsx
import { useState, useEffect } from 'react';
import { ConfigProvider } from '@soui/ui';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // 从 localStorage 读取用户偏好
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // 在根元素上设置 data-theme 属性
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        primaryColor: isDark ? '#177ddc' : '#1677ff',
        components: {
          Button: {
            colorPrimary: isDark ? '#177ddc' : '#1677ff',
          },
        },
      }}
    >
      <div className={isDark ? 'dark-theme' : ''}>
        {/* 你的应用内容 */}
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? '切换亮色' : '切换暗色'}
        </button>
      </div>
    </ConfigProvider>
  );
}
```

### 步骤 3：确保页面背景适配

暗色模式需要页面本身的背景色也做相应调整：

```css
/* 全局暗色背景 */
[data-theme="dark"] {
  background-color: #141414;
  color: rgba(255, 255, 255, 0.85);
}

/* 或使用类名 */
.dark-theme {
  background-color: #141414;
  color: rgba(255, 255, 255, 0.85);
  min-height: 100vh;
}
```

## 方案二：ConfigProvider 局部暗色

如果你只需要在页面的某个区域使用暗色主题，可以通过嵌套 `ConfigProvider` 实现：

```tsx
import { ConfigProvider, Card, Button, Input } from '@soui/ui';

function App() {
  return (
    <ConfigProvider theme={{ primaryColor: '#1677ff' }}>
      {/* 亮色区域 */}
      <Card title="亮色区域">
        <Button type="primary">亮色按钮</Button>
        <Input placeholder="亮色输入框" />
      </Card>

      {/* 暗色区域 */}
      <div style={{ backgroundColor: '#141414', padding: 24 }}>
        <ConfigProvider
          theme={{
            primaryColor: '#177ddc',
            components: {
              Button: {
                colorPrimary: '#177ddc',
              },
              Input: {
                colorBg: '#141414',
                colorText: 'rgba(255, 255, 255, 0.85)',
                colorBorder: '#424242',
                colorBorderHover: '#177ddc',
                colorBorderFocus: '#177ddc',
              },
              Card: {
                colorBg: '#1f1f1f',
                borderColor: '#303030',
              },
            },
          }}
        >
          <Card title="暗色区域">
            <Button type="primary">暗色按钮</Button>
            <Input placeholder="暗色输入框" />
          </Card>
        </ConfigProvider>
      </div>
    </ConfigProvider>
  );
}
```

## 监听系统主题偏好

可以结合 `prefers-color-scheme` 媒体查询，自动跟随操作系统的暗色模式设置：

```tsx
import { useState, useEffect } from 'react';
import { ConfigProvider } from '@soui/ui';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        primaryColor: isDark ? '#177ddc' : '#1677ff',
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## 暗色主题设计建议

实现暗色主题时，注意以下几点设计原则：

### 颜色对比度

- 暗色背景下的文本色建议使用 `rgba(255, 255, 255, 0.85)` 作为主要文本色，`rgba(255, 255, 255, 0.65)` 作为次要文本色。避免使用纯白 `#fff` 作为正文色，以免造成视觉疲劳。
- 确保文本与背景的对比度符合 WCAG 2.0 AA 标准（至少 4.5:1）。

### 背景层次

暗色模式下的背景色需要保持层次感，不要全部使用同一个颜色：

```
页面背景:     #141414   (最深)
容器/卡片背景: #1f1f1f   (次深)
悬停/选中背景: rgba(255, 255, 255, 0.08)  (半透明白色)
表头背景:     rgba(255, 255, 255, 0.04)  (最浅)
```

### 阴影处理

暗色模式下阴影效果不明显，建议使用边框替代阴影来区分层次，或加深阴影颜色：

```css
[data-theme="dark"] {
  --soui-dialog-box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.32),
                            0 3px 6px -4px rgba(0, 0, 0, 0.48),
                            0 9px 28px 8px rgba(0, 0, 0, 0.20);
  --soui-card-hover-shadow: 0 2px 8px rgba(0, 0, 0, 0.36);
}
```

### 主色调调整

暗色模式下，亮色主题的主色通常饱和度过高，直接用在暗色背景上会显得刺眼。建议将主色适当调亮、降低饱和度：

```
亮色主色: #1677ff
暗色主色: #177ddc (略亮、略偏青)
```

### 图片与图标

- 暗色模式下的插图、Logo 等资源可能需要提供专门的暗色版本，或使用 CSS `filter` 降低亮度：

```css
[data-theme="dark"] img.logo {
  filter: brightness(0.8);
}
```

- 图标颜色可以直接使用 CSS 变量，确保在暗色模式下自动适配：

```css
[data-theme="dark"] {
  --soui-icon-color-default: rgba(255, 255, 255, 0.85);
}
```

## 完整的暗色主题切换示例

以下是一个包含暗色模式切换的完整应用示例：

```tsx
import { useState, useEffect, createContext, useContext } from 'react';
import {
  ConfigProvider, Button, Card, Input, Select, Switch,
  Space, Typography, Divider,
} from '@soui/ui';

// 主题上下文
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

// 暗色 CSS 变量配置
const darkThemeOverrides = `
[data-theme="dark"] {
  --soui-primary-color: #177ddc;
  --soui-primary-hover-color: #3c9ae8;
  --soui-primary-active-color: #1264b3;
  --soui-typography-color-text: rgba(255, 255, 255, 0.85);
  --soui-typography-color-text-secondary: rgba(255, 255, 255, 0.65);
  --soui-input-color-bg: #141414;
  --soui-input-color-text: rgba(255, 255, 255, 0.85);
  --soui-input-color-border: #424242;
  --soui-select-color-bg: #141414;
  --soui-select-color-text: rgba(255, 255, 255, 0.85);
  --soui-select-dropdown-bg: #1f1f1f;
  --soui-card-color-bg: #1f1f1f;
  --soui-card-border-color: #303030;
  --soui-dialog-bg-color: #1f1f1f;
  --soui-divider-color: #303030;
  background-color: #141414;
  color: rgba(255, 255, 255, 0.85);
}
`;

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}
    >
      {/* 注入暗色 CSS 覆盖 */}
      <style dangerouslySetInnerHTML={{ __html: darkThemeOverrides }} />

      <ConfigProvider
        theme={{
          primaryColor: isDark ? '#177ddc' : '#1677ff',
          components: {
            Button: {
              colorPrimary: isDark ? '#177ddc' : '#1677ff',
            },
          },
        }}
      >
        <div style={{ padding: 24, minHeight: '100vh' }}>
          <Card title="主题切换示例">
            <Space direction="vertical" size="large">
              <Space>
                <Typography.Text>暗黑模式</Typography.Text>
                <Switch
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                />
              </Space>

              <Divider />

              <Space>
                <Button type="primary">主要按钮</Button>
                <Button>默认按钮</Button>
              </Space>

              <Input placeholder="请输入内容" />
              <Select
                placeholder="请选择"
                options={[
                  { label: '选项一', value: '1' },
                  { label: '选项二', value: '2' },
                ]}
              />
            </Space>
          </Card>
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
```

## 常见问题

### Q: 为什么不能使用 `theme.darkAlgorithm`？

SoUi 的主题系统与 Ant Design 不同，没有内置的主题算法机制。所有样式定制都通过 CSS 变量实现，暗色主题需要手动覆盖这些变量。这种方式虽然需要更多配置，但提供了完全的灵活性。

### Q: 暗色模式下某些组件没有正确变色怎么办？

检查是否遗漏了对应组件的 CSS 变量覆盖。SoUi 的组件配置点变量命名规则为 `--soui-{组件名}-{属性名}`，例如 `--soui-table-header-bg`。你可以在 [CSS 变量](/theming/css-variables) 文档中查看完整的变量列表。

### Q: 如何持久化用户的主题偏好？

推荐使用 `localStorage` 保存主题状态，在应用初始化时读取：

```tsx
const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
});

useEffect(() => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);
```

### Q: 暗色模式下如何处理 Portal 组件（Dialog、Notification 等）？

Portal 类组件渲染在 `document.body` 下，可能不在你的暗色容器内。建议在 `document.documentElement` 上设置 `data-theme` 属性，并在 CSS 中使用 `[data-theme="dark"]` 选择器覆盖全局变量，这样可以确保 Portal 组件也能正确应用暗色样式。

## 相关文档

- [CSS 变量](/theming/css-variables) - 了解 SoUi 的 CSS 变量体系和完整变量列表
- [ConfigProvider 全局配置](/theming/config-provider) - 了解主题配置的完整 API
- [色彩系统](/styles/colors) - 了解 SoUi 的颜色规范
