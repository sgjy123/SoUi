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
│   │   ├── Alert/               # 警告提示组件
│   │   │   ├── index.tsx        # 组件入口和导出
│   │   │   └── Alert.tsx        # 组件实现（如需要）
│   │   ├── Badge/               # 徽标组件
│   │   ├── Button/              # 按钮组件
│   │   ├── Card/                # 卡片组件
│   │   ├── ConfigProvider/      # 全局配置提供者
│   │   │   ├── index.tsx        # ConfigProvider 组件
│   │   │   ├── context.ts       # Context 定义
│   │   │   └── types.ts         # 类型定义
│   │   ├── Grid/                # 栅格布局
│   │   │   ├── Row.tsx          # 行组件
│   │   │   └── Col.tsx          # 列组件
│   │   ├── Icon/                # 图标组件
│   │   ├── Input/               # 输入框组件
│   │   ├── Message/             # 全局提示组件
│   │   ├── Modal/               # 对话框组件
│   │   ├── Space/               # 间距组件
│   │   ├── Tag/                 # 标签组件
│   │   └── Typography/          # 排版组件
│   ├── hooks/                    # 自定义 Hooks
│   │   └── useMessage.ts        # Message Hook
│   ├── styles/                   # 全局样式
│   │   ├── variables.less       # Less 变量
│   │   ├── mixins.less          # Less 混入
│   │   └── index.less           # 样式入口
│   ├── utils/                    # 工具函数
│   │   └── classnames.ts        # 类名工具
│   ├── demo.tsx                  # 演示示例
│   └── index.ts                  # 统一导出入口
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
component-library/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Button/         # 单个组件
│   │   │   ├── index.tsx   # 组件入口
│   │   │   ├── Button.tsx  # 组件实现
│   │   │   ├── Button.less # 组件样式
│   │   │   ├── types.ts    # 类型定义
│   │   │   └── __tests__/  # 测试文件
│   │   └── ...
│   ├── hooks/              # 自定义 Hooks
│   ├── styles/             # 全局样式
│   ├── utils/              # 工具函数
│   ├── theme/              # 主题配置
│   └── index.ts            # 统一导出
├── dist/                   # 构建输出
├── docs/                   # 文档
└── tests/                  # 测试配置
```

## 🔧 组件开发规范

### 1. 组件基础结构

```tsx
import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './Component.less';

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

@font-size-base: 14px;
@border-radius-base: 6px;
@spacing-unit: 8px;

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

**组件样式：**
```less
@soui-prefix: soui;

.@{soui-prefix}-button {
  .border-box();
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &--primary {
    background-color: @primary-color;
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

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
// theme/design-tokens.ts
export const designTokens = {
  colors: {
    primary: '#1677ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  borderRadius: {
    small: '4px',
    medium: '6px',
    large: '8px',
  },
};
```

### 2. ConfigProvider 实现

```tsx
// components/ConfigProvider/index.tsx
import React, { createContext, useContext } from 'react';

interface ThemeConfig {
  primaryColor?: string;
  borderRadius?: number;
  components?: Record<string, any>;
}

const ConfigContext = createContext<ThemeConfig>({});

export const ConfigProvider: FC<{
  theme: ThemeConfig;
  children: ReactNode;
}> = ({ theme, children }) => {
  return (
    <ConfigContext.Provider value={theme}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
```

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

### 1. README 模板

```markdown
# Component Name

组件描述...

## Installation

```bash
npm install @soui/ui
```

## Usage

```tsx
import { Component } from '@soui/ui';

function App() {
  return <Component prop="value" />;
}
```

## API

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| prop1 | 说明 | `string` | - |
| prop2 | 说明 | `boolean` | `false` |

## Examples

更多示例...
```

### 2. Storybook 故事

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    type: 'primary',
  },
};
```

## 🚀 构建和发布

### 1. Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
  "sideEffects": ["dist/*", "*.less"]
}
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
