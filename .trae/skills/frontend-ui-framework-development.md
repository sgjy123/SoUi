# 前端 UI 框架开发技能指南

## 📋 概述

本技能文档总结了开发企业级 React UI 组件库的核心技能、最佳实践和规范，基于 Sui 和 Ant Design 的参考实践出来。

## 🎯 核心技术栈

### 基础技术
- **React 18+**: 使用最新 React 特性（Hooks、Context、并发渲染）
- **TypeScript**: 完整的类型系统和类型定义
- **Vite**: 快速的开发构建工具
- **Less/Sass**: CSS 预处理器
- **CSS-in-JS**: 动态样式方案（可选）

### 开发工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Jest/Vitest**: 单元测试
- **Testing Library**: React 组件测试
- **Storybook**: 组件文档和展示

## 📦 项目结构设计

### SoUi 项目结构详解

```
SoUi/
├── src/                          # 源代码目录
│   ├── components/               # 组件库核心
│   │   ├── Alert/                # 警告提示组件
│   │   │   ├── index.tsx         # 组件主文件（实现+导出）
│   │   │   └── style.less        # 组件样式
│   │   ├── Badge/                # 徽标组件
│   │   ├── Button/               # 按钮组件
│   │   ├── Card/                 # 卡片组件
│   │   ├── ConfigProvider/       # 全局配置提供者
│   │   │   ├── index.tsx         # ConfigProvider 组件
│   │   │   ├── context.ts        # Context 定义
│   │   │   └── types.ts          # 类型定义
│   │   ├── Grid/                 # 栅格布局
│   │   │   ├── index.tsx         # 组件主文件
│   │   │   ├── style.less        # 组件样式
│   │   │   └── types.ts          # 类型定义
│   │   ├── Icon/                 # 图标组件
│   │   ├── Input/                # 输入框组件
│   │   ├── Message/              # 全局提示组件
│   │   ├── Modal/                # 对话框组件
│   │   ├── Space/                # 间距组件
│   │   ├── Tag/                  # 标签组件
│   │   └── Typography/           # 排版组件
│   ├── hooks/                    # 自定义 Hooks
│   │   └── useMessage.ts         # Message Hook
│   ├── styles/                   # 全局样式
│   │   ├── variables.less        # Less 变量
│   │   ├── mixins.less           # Less 混入
│   │   ├── global.less           # 全局样式和 CSS 变量
│   │   └── index.less            # 样式入口
│   ├── utils/                    # 工具函数
│   │   └── classnames.ts         # 类名工具
│   ├── demo.tsx                  # 演示示例入口
│   ├── index.ts                  # 统一导出入口
│   └── docs/                     # 文档目录
│       ├── components/           # 组件文档
│       │   └── button.md         # 组件文档文件
│       └── .vitepress/           # VitePress 配置
│           └── config.ts         # 文档配置（侧边栏）
├── examples/                     # 示例代码目录
│   ├── DemoContainer/            # 演示容器组件
│   │   └── index.tsx             # DemoContainer 主文件
│   └── Button/                   # 组件示例
│       ├── Basic.tsx             # 基础示例
│       └── codes.ts              # 示例代码字符串
├── dist/                         # 构建输出目录
│   ├── soui.umd.js              # UMD 格式
│   ├── soui.es.js               # ES Module 格式
│   ├── soui.css                 # 打包后的样式
│   └── types/                   # TypeScript 类型定义
├── .eslintrc.cjs                 # ESLint 配置
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── vite.config.ts                # Vite 配置
├── index.html                    # 开发入口 HTML
└── README.md                     # 项目文档
```

### 标准组件目录结构

```
SoUi/src/components/
├── ComponentName/          # 单个组件目录（PascalCase）
│   ├── index.tsx          # 组件主文件（实现+导出）
│   ├── style.less         # 组件样式（统一命名）
│   └── types.ts           # 类型定义（可选）
└── ...
```

**组件命名规范：**

| 项目 | 命名规则 | 示例 |
|------|---------|------|
| 组件目录 | PascalCase | `Button`, `ConfigProvider` |
| 组件文件名 | index.tsx | `index.tsx` |
| 样式文件名 | style.less | `style.less` |
| CSS 类名 | kebab-case with prefix | `.soui-button`, `.soui-button-primary` |
| 文档文件 | kebab-case | `button.md`, `config-provider.md` |
| 示例目录 | PascalCase | `Button`, `ConfigProvider` |
| 示例文件 | PascalCase | `Basic.tsx`, `Size.tsx` |

## 🔧 组件开发规范

### 1. 组件基础结构

```tsx
import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './style.less';

export interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  /** 属性说明 */
  prop1?: string;
  prop2?: boolean;
}

export const Component: FC<ComponentProps> = ({
  prop1 = 'default',
  prop2 = false,
  className,
  children,
  ...restProps
}) => {
  const prefixCls = 'soui-component';
  const classes = classNames(prefixCls, className);

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};

export default Component;
```

### 2. TypeScript 类型定义

```typescript
// types.ts
import { ReactNode, CSSProperties } from 'react';

// 尺寸类型
export type SizeType = 'small' | 'middle' | 'large';

// 状态类型
export type StatusType = 'success' | 'error' | 'warning' | 'info';

// 通用 Props
export interface CommonProps {
  className?: string;
  style?: CSSProperties;
  size?: SizeType;
  disabled?: boolean;
  children?: ReactNode;
}
```

### 3. 样式规范

**Less 变量管理：**
```less
// styles/variables.less
@primary-color: #1677ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;
@text-color: rgba(0, 0, 0, 0.88);
@text-color-secondary: rgba(0, 0, 0, 0.65);

@font-size-base: 14px;
@border-radius-base: 6px;
@control-height-base: 32px;

@padding-xs: 4px;
@padding-sm: 8px;
@padding-md: 16px;
@padding-lg: 24px;

@transition-duration: 0.3s;
@transition-timing-function: ease-in-out;

// 混入
.border-box() {
  box-sizing: border-box;
}

.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**组件样式（style.less）：**
```less
@import '../../styles/variables.less';  // 必须导入变量

@soui-prefix: soui;

.@{soui-prefix}-button {
  .border-box();
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  // 使用 CSS 变量支持主题定制
  --soui-button-color-primary: var(--soui-primary-color, @primary-color);
  
  &--primary {
    background-color: var(--soui-button-color-primary);
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**CSS 变量命名规范：**
- 全局变量：`--soui-{variable-name}`（如 `--soui-primary-color`）
- 组件变量：`--soui-{component}-{variable}`（如 `--soui-button-color-primary`）
- 使用 `var(--css-variable, @less-variable)` 实现优雅降级

### 4. 组件设计原则

#### ✅ 应该做的：
- 保持组件单一职责
- 提供清晰的 Props 接口
- 支持受控和非受控模式
- 提供完整的 TypeScript 类型
- 考虑无障碍访问（A11Y）
- 支持键盘导航
- 提供默认值和合理的 fallback
- 使用 React.forwardRef 转发 ref

#### ❌ 不应该做的：
- 避免组件过度复杂
- 不要直接修改 props
- 避免硬编码样式值
- 不要忽略边界情况

## 🎨 主题系统设计

### 1. Design Token 系统

```typescript
// src/styles/variables.less（Less 变量）
@primary-color: #1677ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;

@font-size-base: 14px;
@border-radius-base: 6px;
@control-height-base: 32px;

@transition-duration: 0.3s;
```

### 2. ConfigProvider 实现

```tsx
// src/components/ConfigProvider/types.ts
export interface ThemeConfig {
  primaryColor?: string;
  borderRadius?: number;
  fontSize?: number;
  controlHeight?: number;
  components?: Record<string, ComponentThemeConfig>;
}

export interface ComponentThemeConfig {
  [key: string]: any;
}
```

```tsx
// src/components/ConfigProvider/index.tsx
import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeConfig } from './types';

const ConfigContext = createContext<ThemeConfig>({});

export const ConfigProvider: React.FC<{
  theme?: ThemeConfig;
  children: React.ReactNode;
}> = ({ theme = {}, children }) => {
  const cssVariables = useMemo(() => {
    const variables: React.CSSProperties = {};
    
    if (theme.primaryColor) {
      variables['--soui-primary-color'] = theme.primaryColor;
    }
    if (theme.borderRadius) {
      variables['--soui-border-radius'] = `${theme.borderRadius}px`;
    }
    if (theme.fontSize) {
      variables['--soui-font-size'] = `${theme.fontSize}px`;
    }
    if (theme.controlHeight) {
      variables['--soui-control-height'] = `${theme.controlHeight}px`;
    }
    
    return variables;
  }, [theme]);

  return (
    <ConfigContext.Provider value={theme}>
      <style>{`
        :root {
          --soui-primary-color: ${theme.primaryColor || '#1677ff'};
          --soui-border-radius: ${theme.borderRadius || 6}px;
          --soui-font-size: ${theme.fontSize || 14}px;
          --soui-control-height: ${theme.controlHeight || 32}px;
        }
      `}</style>
      <div style={cssVariables}>{children}</div>
    </ConfigContext.Provider>
  );
};

export const useTheme = () => useContext(ConfigContext);

export const useComponentTheme = (componentName: string) => {
  const theme = useTheme();
  return theme.components?.[componentName];
};
```

### 3. 主题集成流程

在组件中使用主题变量的标准方式：

```tsx
// src/components/Button/index.tsx
import React from 'react';
import { useTheme, useComponentTheme } from '../ConfigProvider';
import './style.less';

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  const globalTheme = useTheme();
  const buttonTheme = useComponentTheme('Button');
  
  const borderRadiusValue = buttonTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = buttonTheme?.fontSize || globalTheme?.fontSize;
  
  const buttonStyle: React.CSSProperties = {
    ...(borderRadiusValue && {
      '--soui-button-border-radius': `${borderRadiusValue}px`,
    }),
    ...(fontSizeValue && {
      '--soui-button-font-size': `${fontSizeValue}px`,
    }),
  } as any;

  return (
    <button className="soui-button" style={buttonStyle} {...props}>
      {children}
    </button>
  );
};
```

**主题配置优先级（从高到低）：**
1. 组件级配置（通过 `components.Button` 设置）
2. 全局主题配置（通过 ConfigProvider `theme` 属性）
3. CSS 默认值（通过 `:root` 设置）
4. Less 默认值（通过 `variables.less`）

## 🧪 测试策略

### 1. 单元测试

```tsx
// components/Button/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../index';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### 2. 视觉回归测试

- 使用 Chromatic 或 Percy
- 捕获组件快照
- 检测视觉变化

## 📚 文档规范

### 1. 组件文档模板（`src/docs/components/component-name.md`）

```markdown
# ComponentName 中文名称

简短描述组件用途。

## 参考来源（如果参考了某个框架）

本组件参考了 [Ant Design](https://ant.design/) 的 XXX 组件设计，在保持 SoUi 设计风格的前提下，借鉴了其 API 设计思路。

## 何时使用

- 使用场景1
- 使用场景2
- 使用场景3

## 代码演示

### 基础用法

示例说明文字。

```tsx
import { ComponentName } from '@soui/ui';

export default () => (
  <ComponentName prop="value">内容</ComponentName>
);
```

### 另一个示例

更多示例说明。

```tsx
import { ComponentName } from '@soui/ui';

export default () => (
  <ComponentName variant="secondary">内容</ComponentName>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| prop1 | 属性说明 | `type` | `default` | - |
| prop2 | 属性说明 | `type` | `default` | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onClick | 点击事件 | `(e: Event) => void` |

## 设计原则

### ✅ 推荐用法

```tsx
// 好的示例
<ComponentName prop="value" />
```

### ❌ 避免使用

```tsx
// 不好的示例
<ComponentName invalidProp="value" />
```

## 无障碍访问

组件遵循 WAI-ARIA 规范的说明。

## FAQ

### 常见问题1？

解答...

### 常见问题2？

解答...

## 相关资源

- [Related Component](/components/related)
```

### 2. 侧边栏配置（`src/docs/.vitepress/config.ts`）

```typescript
function sidebarComponents() {
  return [
    {
      text: '基础组件',
      collapsed: false,
      items: [
        // ... 现有组件
        { text: 'ComponentName 中文名', link: 'component-name' },
      ],
    },
  ];
}
```

### 3. 示例代码目录（`examples/ComponentName/`）

```
examples/ComponentName/
├── Basic.tsx        # 基础用法
├── Size.tsx         # 不同尺寸
├── Status.tsx       # 不同状态
├── Variant.tsx      # 不同变体
├── Advanced.tsx     # 高级用法
└── codes.ts         # 示例代码字符串
```

**codes.ts 示例：**
```typescript
export const basicCode = `<ComponentName>
  内容
</ComponentName>`;

export const sizeCode = `<Space>
  <ComponentName size="small">小</ComponentName>
  <ComponentName size="middle">中</ComponentName>
  <ComponentName size="large">大</ComponentName>
</Space>`;
```

**注意**：`codes.ts` 中的代码字符串用于 `react-live` 实时演示，**不支持变量声明**，必须直接内联值。

## 🚀 构建和发布

### 1. Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SoUi',
      fileName: (format) => `soui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### 2. package.json 配置

```json
{
  "name": "@soui/ui",
  "version": "1.0.0",
  "main": "dist/soui.umd.js",
  "module": "dist/soui.es.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/soui.es.js",
      "require": "./dist/soui.umd.js",
      "types": "./dist/types/index.d.ts"
    }
  },
  "files": ["dist", "src"],
  "sideEffects": ["dist/*", "*.less"],
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx",
    "preview": "vite preview"
  }
}
```

### 3. 演示页面配置（`src/demo.tsx`）

```tsx
import React from 'react';
import DemoContainer from '../examples/DemoContainer';
import * as buttonCodes from '../examples/Button/codes';
import * as inputCodes from '../examples/Input/codes';

const App: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px' }}>SoUi 组件库演示</h1>

      {/* Button 组件演示 */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
          Button 按钮
        </h2>
        <DemoContainer
          title="基础用法"
          description="按钮的基础用法。"
          code={buttonCodes.basicCode}
        />
      </section>

      {/* Input 组件演示 */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
          Input 输入框
        </h2>
        <DemoContainer
          title="基础用法"
          description="输入框的基础用法。"
          code={inputCodes.basicCode}
        />
      </section>
    </div>
  );
};

export default App;
```

### 4. DemoContainer 配置（`examples/DemoContainer/index.tsx`）

```tsx
import React from 'react';
import { LiveProvider, LiveEditor, LivePreview } from 'react-live';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
import Space from '../../src/components/Space';

const defaultScope = {
  React,
  useState: React.useState,
  Button,
  Input,
  Space,
};

interface DemoContainerProps {
  title: string;
  description?: string;
  code: string;
}

const DemoContainer: React.FC<DemoContainerProps> = ({ title, description, code }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        {title}
      </h3>
      {description && (
        <p style={{ marginBottom: '16px', color: 'rgba(0, 0, 0, 0.65)' }}>
          {description}
        </p>
      )}
      <LiveProvider code={code} scope={defaultScope}>
        <LivePreview style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '12px' }} />
        <LiveEditor style={{ fontSize: '14px', borderRadius: '8px' }} />
      </LiveProvider>
    </div>
  );
};

export default DemoContainer;
```

## 🎯 性能优化

### 1. 按需加载

- 支持 Tree Shaking
- 提供 ESM 和 CJS 格式
- 避免循环依赖

### 2. 代码分割

```typescript
// 动态导入重型组件
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 3. 样式优化

- 提取公共样式
- 使用 CSS 变量
- 避免样式重复

## ♿ 无障碍访问 (A11Y)

### 关键要点

1. **语义化 HTML**: 使用正确的标签
2. **键盘导航**: 支持 Tab、Enter、Esc 等
3. **ARIA 属性**: 提供必要的 ARIA 标签
4. **焦点管理**: 合理的焦点顺序
5. **屏幕阅读器**: 提供文本替代

```tsx
<button
  role="button"
  aria-label="Close dialog"
  aria-disabled={disabled}
  tabIndex={0}
>
  Close
</button>
```

## 🔄 版本管理

### SemVer 规范

- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修复

### CHANGELOG

```markdown
## [1.0.0] - 2024-01-01

### Added
- ✨ 新增 Button 组件
- ✨ 新增 Input 组件

### Fixed
- 🐛 修复 Modal 关闭动画问题

### Changed
- 💄 优化 Button 样式
- 🔄 更新 TypeScript 版本
```

## 📈 质量控制

### Code Review Checklist

- [ ] 代码符合 ESLint 规则
- [ ] TypeScript 类型正确
- [ ] 单元测试通过
- [ ] 文档完整
- [ ] 示例可运行
- [ ] 无障碍访问检查
- [ ] 浏览器兼容性验证

### CI/CD 流程

1. Lint 检查
2. 类型检查
3. 单元测试
4. 构建验证
5. 自动发布

## 🎓 学习资源

### 参考项目

- [Ant Design](https://github.com/ant-design/ant-design)
- [Material-UI](https://github.com/mui/material-ui)
- [Chakra UI](https://github.com/chakra-ui/chakra-ui)
- [Headless UI](https://github.com/tailwindlabs/headlessui)

### 推荐阅读

- React 官方文档
- TypeScript 手册
- Web Accessibility Initiative (WAI)
- Design Systems Handbook

## 💡 最佳实践总结

1. **始于简单**: 从最基础的组件开始
2. **类型优先**: 先定义类型再实现
3. **测试驱动**: 编写可测试的代码
4. **文档伴随**: 组件和文档同步更新
5. **用户导向**: 站在使用者角度思考
6. **持续改进**: 收集反馈不断优化

---

**最后更新**: 2024-03-19  
**维护团队**: SoUi Team

## 📁 SoUi 文件夹操作指南

### 1. 创建新组件

#### 步骤 1: 创建组件目录结构

```bash
# 在 SoUi/src/components 下创建新组件目录
cd SoUi/src/components
mkdir MyComponent
cd MyComponent

# 创建必要的文件
New-Item -Path "index.tsx" -ItemType File
New-Item -Path "MyComponent.tsx" -ItemType File
New-Item -Path "MyComponent.less" -ItemType File
New-Item -Path "types.ts" -ItemType File
```

#### 步骤 2: 实现组件代码

**index.tsx** - 组件入口文件：
```tsx
export { default as MyComponent } from './MyComponent';
export type { MyComponentProps } from './types';
```

**MyComponent.tsx** - 组件实现：
```tsx
import React, { FC } from 'react';
import classNames from 'classnames';
import { MyComponentProps } from './types';
import './MyComponent.less';

const MyComponent: FC<MyComponentProps> = ({
  className,
  children,
  ...restProps
}) => {
  const prefixCls = 'soui-my-component';
  const classes = classNames(prefixCls, className);

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};

export default MyComponent;
```

**types.ts** - 类型定义：
```typescript
import { ReactNode, CSSProperties } from 'react';

export interface MyComponentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
}
```

#### 步骤 3: 更新主入口

编辑 `SoUi/src/index.ts`，添加新组件导出：
```typescript
// 添加新组件导出
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent/types';
```

### 2. 样式文件操作

#### 创建/编辑 Less 文件

**SoUi/src/styles/variables.less** - 全局变量：
```less
// 品牌色
@primary-color: #1677ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;

// 尺寸
@font-size-base: 14px;
@border-radius-base: 6px;
@spacing-unit: 8px;

// 前缀
@soui-prefix: soui;
```

**组件样式文件** (`MyComponent.less`)：
```less
@import '../../styles/variables.less';

.@{soui-prefix}-my-component {
  display: inline-block;
  padding: @spacing-unit;
  border-radius: @border-radius-base;
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 3. 配置文件管理

#### package.json 常用命令

```json
{
  "scripts": {
    "dev": "vite",                    // 启动开发服务器
    "build": "tsc && vite build",     // 构建生产版本
    "lint": "eslint . --ext ts,tsx",  // 代码检查
    "preview": "vite preview",        // 预览构建结果
    "clean": "rimraf dist lib es"     // 清理构建产物
  }
}
```

#### 使用 PowerShell 操作

```powershell
# 进入 SoUi 目录
cd d:\JavaWorkSpace\myWork\ant-design-master\SoUi

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 查看构建产物
dir dist

# 清理构建产物
npm run clean
```

### 4. 组件测试文件

#### 创建测试文件

**SoUi/src/components/MyComponent/__tests__/MyComponent.test.tsx**：
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../index';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Test Content</MyComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles props correctly', () => {
    render(<MyComponent disabled>Disabled</MyComponent>);
    expect(screen.getByText('Disabled')).toHaveClass('soui-my-component--disabled');
  });
});
```

### 5. 文档编写

#### 创建组件 README

**SoUi/src/components/MyComponent/README.md**：
```markdown
# MyComponent

组件描述...

## 何时使用

- 使用场景 1
- 使用场景 2

## 代码演示

### 基本用法

```tsx
import { MyComponent } from '@soui/ui';

export default () => (
  <MyComponent>内容</MyComponent>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| className | 样式类名 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
```

### 6. 构建和发布流程

#### PowerShell 脚本示例

**build.ps1** - 自动化构建脚本：
```powershell
# 设置严格模式
$ErrorActionPreference = "Stop"

# 进入项目目录
Set-Location "d:\JavaWorkSpace\myWork\ant-design-master\SoUi"

# 清理旧的构建产物
Write-Host "Cleaning..." -ForegroundColor Yellow
npm run clean

# 安装依赖
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# 类型检查
Write-Host "Type checking..." -ForegroundColor Cyan
npx tsc --noEmit

# 构建
Write-Host "Building..." -ForegroundColor Green
npm run build

# 验证构建产物
if (Test-Path "dist") {
    Write-Host "Build successful!" -ForegroundColor Green
    Get-ChildItem "dist" | Select-Object Name, Length
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
```

### 7. 批量操作技巧

#### 批量创建组件模板

**create-component.ps1** - 组件生成脚本：
```powershell
param(
    [Parameter(Mandatory=$true)]
    [string]$ComponentName
)

$componentPath = "src\components\$ComponentName"

# 创建目录
New-Item -ItemType Directory -Force -Path $componentPath

# 创建文件模板
$files = @{
    "index.tsx" = "export { default as $ComponentName } from './$ComponentName';`nexport type { ${ComponentName}Props } from './types';`n";
    "$ComponentName.tsx" = "import React, { FC } from 'react';`nimport classNames from 'classnames';`nimport { ${ComponentName}Props } from './types';`nimport './$ComponentName.less';`n`nconst ${ComponentName}: FC<${ComponentName}Props> = ({`n  className,`n  children,`n  ...restProps`n}) => {`n  const prefixCls = 'soui-$($ComponentName.ToLower())';`n  const classes = classNames(prefixCls, className);`n`n  return (`n    <div className={classes} {...restProps}>`n      {children}`n    </div>`n  );`n};`n`nexport default ${ComponentName};`n";
    "$ComponentName.less" = "@import '../../styles/variables.less';`n`n.@{soui-prefix}-$($ComponentName.ToLower()) {`n  // Component styles here`n}`n";
    "types.ts" = "import { ReactNode, CSSProperties } from 'react';`n`nexport interface ${ComponentName}Props {`n  className?: string;`n  style?: CSSProperties;`n  children?: ReactNode;`n}`n";
}

foreach ($file in $files.Keys) {
    $filePath = Join-Path $componentPath $file
    Set-Content -Path $filePath -Value $files[$file]
    Write-Host "Created: $filePath" -ForegroundColor Green
}

Write-Host "`nComponent '$ComponentName' created successfully!" -ForegroundColor Green
```

使用方法：
```powershell
# 创建新组件
.\create-component.ps1 -ComponentName "Dropdown"
```

### 8. Git 操作

#### 提交规范

```powershell
# 添加新组件
git add src/components/Dropdown

# 提交信息遵循约定式提交
git commit -m "feat(components): add Dropdown component

- 实现基础下拉功能
- 支持键盘导航
- 添加完整 TypeScript 类型"
```

### 9. 调试技巧

#### 开发环境调试

1. 启动开发服务器：
```powershell
npm run dev
```

2. 在 `SoUi/src/demo.tsx` 中测试组件：
```tsx
import { MyComponent } from './components/MyComponent';

const App = () => (
  <div>
    <h1>组件调试</h1>
    <MyComponent>测试内容</MyComponent>
  </div>
);

export default App;
```

3. 访问 `http://localhost:5173` 查看效果

### 10. 性能分析

#### 构建产物分析

```powershell
# 安装分析工具
npm install --save-dev rollup-plugin-visualizer

# 修改 vite.config.ts 添加可视化插件
# 然后运行构建
npm run build

# 打开生成的统计文件
Start-Process "dist\stats.html"
```

---

**提示**: 所有 PowerShell 命令都需要在 SoUi 项目根目录下执行。
