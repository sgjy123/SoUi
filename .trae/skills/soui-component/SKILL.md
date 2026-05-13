---
name: soui-component
description: SoUi 组件库开发指南。用于创建新组件、编写组件文档和示例。当用户要求"创建一个组件"、"添加新组件"或"实现 xxx 组件"时使用此 Skill。**重要：在开始开发前，必须询问用户是否希望参考主流 UI 框架（Ant Design、MUI、Chakra UI、Tailwind UI 或不参考）**。
---

# SoUi 组件开发 Skill

本 Skill 提供在 SoUi 项目中创建新组件的完整规范和流程。

## 项目结构

SoUi 是一个基于 React + TypeScript + Vite 的现代化 UI 组件库。

### 技术栈
- **框架**: React 18+
- **语言**: TypeScript 5.3+
- **构建工具**: Vite 4.5+
- **样式**: Less 4.2+
- **文档**: VitePress 1.0+
- **图标库**: @icon-park/react
- **工具库**: classnames

### 关键路径
```
SoUi/
├── src/
│   ├── index.ts                    # 主入口，导出所有组件
│   ├── demo.tsx                    # 演示页面入口
│   ├── components/                 # 组件目录
│   │   └── ComponentName/          # 单个组件目录
│   │       ├── index.tsx           # 组件主文件
│   │       └── style.less          # 组件样式
│   ├── styles/
│   │   └── variables.less          # LESS 设计变量
│   └── docs/
│       ├── components/             # 组件文档
│       │   └── component-name.md   # 组件文档文件
│       └── .vitepress/
│           └── config.ts           # 文档配置（侧边栏）
── examples/                       # 示例代码目录
│   ├── DemoContainer/              # 演示容器组件
│   │   └── index.tsx               # DemoContainer 主文件
│   └── ComponentName/
│       ├── Basic.tsx               # 基础用法示例
│       ├── Variant.tsx             # 变体示例
│       └── codes.ts                # 示例代码字符串（用于 react-live）
└── package.json
```

## 组件开发流程

当用户要求创建一个新组件时，按以下步骤执行：

### 步骤 0: 确定参考框架（可选）

在开始创建组件之前，询问用户是否需要参考主流 UI 框架的实现方式。

**询问模板：**
```
请问您希望这个组件参考哪个主流框架的实现方式？

选项：
1. Ant Design - 企业级中后台 UI 规范
2. Material-UI (MUI) - Google Material Design 风格
3. Chakra UI - 现代、可访问性优先的设计系统
4. Tailwind UI - 实用优先的 CSS 框架配套组件
5. 不参考特定框架，按照 SoUi 设计规范独立实现
6. 其他（请说明）
```

**如果用户选择参考框架：**
1. 研究选定框架的对应组件 API 设计
2. 分析其 Props 接口、默认值、变体等
3. 在保持 SoUi 设计风格的前提下，借鉴合理的 API 设计

**如果用户选择不参考：**
- 完全按照 SoUi 的设计规范和现有组件模式进行开发
- 确保与现有组件保持一致的设计语言

**使用 AskUserQuestion 工具示例：**
```typescript
{
  questions: [{
    question: "您希望这个组件参考哪个主流框架的实现方式？",
    options: [
      {
        label: "Ant Design",
        description: "企业级中后台 UI 规范，适合管理后台类组件"
      },
      {
        label: "Material-UI (MUI)",
        description: "Google Material Design 风格，现代化设计语言"
      },
      {
        label: "Chakra UI",
        description: "现代、可访问性优先的设计系统"
      },
      {
        label: "Tailwind UI",
        description: "实用优先的 CSS 框架配套组件"
      },
      {
        label: "不参考特定框架",
        description: "按照 SoUi 设计规范独立实现（推荐）"
      }
    ]
  }]
}
```

### 步骤 0.5: 查看主题样式和现有组件（重要！）

**⚠️ 在开始编写代码前，必须先查看以下内容：**

#### 1. 查看全局主题配置

阅读以下文件了解 SoUi 的主题系统设计：

- **`src/components/ConfigProvider/types.ts`** - 主题配置类型定义
  - 了解可用的全局主题变量（primaryColor、borderRadius、fontSize 等）
  - 了解组件级主题配置结构
  
- **`src/components/ConfigProvider/index.tsx`** - ConfigProvider 实现
  - 了解如何生成 CSS 变量
  - 了解 useTheme 和 useComponentTheme hooks

- **`src/styles/global.less`** - 全局样式和 CSS 变量
  - 查看 `:root` 中定义的 CSS 变量
  - 了解全局样式的设置方式

#### 2. 查看设计变量和设计令牌系统

SoUi 采用**三层设计令牌系统**，这是理解主题变量的关键：

##### **第1层: 设计令牌 (Design Tokens) - 真正的全局变量**

这些是不带组件前缀的全局变量，可被多个组件复用：

```less
/* 在 :root 中定义 */
--soui-color-bg-default: rgba(0, 0, 0, 0.88);      // 默认深色背景
--soui-color-text-inverse: #fff;                    // 反色文本(白色)
--soui-font-size-sm: 12px;                          // 小字号
--soui-line-height-sm: 1.6667;                      // 小行高
--soui-border-radius: 6px;                          // 基础圆角
--soui-box-shadow-secondary: 0 3px 6px ...;        // 次级阴影
--soui-z-index-popover: 1030;                       // 浮层层级
--soui-transition-duration: 0.2s;                   // 动画时长
```

**特点:**
- ✅ 不带组件前缀，是真正的全局变量
- ✅ 可以被 Button、Card、Tooltip 等多个组件复用
- ✅ 修改一个变量，所有使用该令牌的组件都会更新
- ✅ 符合 DRY 原则，避免重复定义

##### **第2层: 组件配置点 (Component Configuration Points)**

这些是引用设计令牌的配置接口，允许通过 ConfigProvider 统一修改组件：

```less
/* 在 :root 中定义，引用第1层 */
--soui-tooltip-bg-color: var(--soui-color-bg-default);
--soui-tooltip-text-color: var(--soui-color-text-inverse);
--soui-tooltip-font-size: var(--soui-font-size-sm);
--soui-tooltip-max-width: 250px;              // Tooltip专属
--soui-tooltip-arrow-size: 8px;               // Tooltip专属
```

**特点:**
- ✅ 大部分属性引用全局令牌，保持统一
- ✅ 少数专属属性（如 maxWidth、arrowSize）独立定义
- ✅ 用户可以通过 `theme.tooltipBgColor` 统一修改
- ✅ 作为 ConfigProvider 的配置接口

##### **第3层: 组件级覆盖 (Component-Level Override)**

通过 `components.Tooltip` 自定义特定配置，优先级最高：

```less
/* 在 ConfigProvider 中生成 */
--soui-tooltip-color-bg-default: #333;       // 用户自定义
--soui-tooltip-font-size-component: 14px;    // 用户自定义
```

**优先级规则:**
```
Props 属性 > 组件级配置 > 全局配置 > CSS 变量 > Less 变量
```

阅读 **`src/styles/variables.less`** 了解所有可用的 Less 变量（作为最终回退）：

```less
// 颜色变量
@primary-color: #1677ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;

// 尺寸变量
@border-radius-base: 6px;
@font-size-base: 14px;
@control-height-base: 32px;

// 间距变量（4px 基准）
@padding-xs: 4px;
@padding-sm: 8px;
@padding-md: 16px;
@padding-lg: 24px;

// 过渡变量
@transition-duration: 0.3s;
@transition-timing-function: ease-in-out;
```

#### 3. 查看现有组件实现

选择 2-3 个相似的现有组件作为参考，学习它们的实现模式：

**基础组件参考：**
- **Button** (`src/components/Button/`) - 学习主题变量应用、尺寸适配、状态管理
- **Icon** (`src/components/Icon/`) - 学习简单的展示型组件
- **Space** (`src/components/Space/`) - 学习布局类组件

**复杂组件参考：**
- **Typography** (`src/components/Typography/`) - 学习组合式组件、子组件设计
- **Tooltip** (`src/components/Tooltip/`) - 学习浮层组件、Portal 渲染

**重点关注：**
1. **主题变量应用模式**
   ```tsx
   // Button 组件的主题变量应用示例
   const buttonTheme = useComponentTheme('Button');
   const globalTheme = useTheme();
   
   const borderRadiusValue = buttonTheme?.borderRadius || globalTheme?.borderRadius;
   
   const buttonStyle: React.CSSProperties = {
     '--soui-button-border-radius': `${borderRadiusValue}px`,
   };
   ```

2. **CSS 变量命名规范**

   SoUi 采用分层命名策略：
   
   **第1层 - 设计令牌（不带组件前缀）:**
   ```less
   --soui-color-bg-default      // 全局背景色
   --soui-font-size-sm          // 全局小字号
   --soui-border-radius         // 全局圆角
   --soui-box-shadow-secondary  // 全局阴影
   ```
   
   **第2层 - 组件配置点（带组件前缀）:**
   ```less
   --soui-tooltip-bg-color      // Tooltip背景色配置点
   --soui-tooltip-max-width     // Tooltip最大宽度
   --soui-button-color-primary  // Button主色配置点
   ```
   
   **第3层 - 组件级覆盖（带-component后缀）:**
   ```less
   --soui-tooltip-color-bg-default-component  // Tooltip背景色覆盖
   --soui-tooltip-font-size-component         // Tooltip字号覆盖
   ```
   
   **命名原则:**
   - ✅ 能通用的变量 → 不带组件前缀，作为设计令牌
   - ✅ 不能通用的变量 → 带组件前缀，作为组件配置点
   - ✅ 组件级覆盖 → 添加 `-component` 后缀

3. **样式优先级规则**
   - 组件级配置 > 全局主题配置 > CSS 默认值 > Less 默认值
   - 使用 `var(--css-variable, @less-variable)` 实现回退

4. **组件结构设计**
   - 主组件 + 子组件的组合模式
   - Props 接口设计规范
   - 类名命名规范（BEM）

#### 4. 主题集成检查清单

在设计新组件时，必须考虑以下主题相关的问题：

**✅ 必须支持的配置：**
- [ ] 圆角配置（borderRadius）
- [ ] 字体大小配置（fontSize）
- [ ] 主色配置（colorPrimary / primaryColor）
- [ ] 悬停/激活状态颜色（hover/active colors）
- [ ] 控件高度配置（controlHeight）

**✅ 样式实现要求：**
- [ ] 使用 CSS 变量而非硬编码颜色值
- [ ] 支持全局主题和组件级主题两种配置方式
- [ ] 提供合理的默认值（从 variables.less 获取）
- [ ] 正确处理配置优先级
- [ ] 在 style.less 中使用 `var()` 函数引用 CSS 变量

**✅ TypeScript 类型定义：**
- [ ] 在 `ConfigProvider/types.ts` 中添加组件级配置类型
- [ ] 导出完整的 Props 类型
- [ ] 为枚举类型添加 JSDoc 注释

**示例：主题集成的完整流程（分层设计）**

```tsx
// 1. 在组件中获取主题配置
const componentTheme = useComponentTheme('ComponentName');
const globalTheme = useTheme();

// 2. 计算最终值（组件级优先，否则使用全局配置）
const borderRadiusValue = componentTheme?.borderRadius || globalTheme?.borderRadius;
const fontSizeValue = componentTheme?.fontSize || globalTheme?.fontSize;

// 3. 应用到样式 - 生成第1层和第2层CSS变量
const componentStyle: React.CSSProperties = {
  // === 第1层: 设计令牌 (如果该组件需要定义新的全局令牌) ===
  '--soui-color-bg-default': globalTheme?.tooltipBgColor,
  '--soui-font-size-sm': `${globalTheme?.tooltipFontSize}px`,
  
  // === 第2层: 组件配置点 (引用设计令牌或自定义) ===
  '--soui-component-bg-color': componentTheme?.colorBgDefault || globalTheme?.tooltipBgColor,
  '--soui-component-font-size': componentTheme?.fontSize ? `${componentTheme.fontSize}px` : undefined,
  '--soui-component-border-radius': borderRadiusValue ? `${borderRadiusValue}px` : undefined,
  
  // === 第3层: 组件级覆盖 (优先级最高) ===
  '--soui-component-bg-color-component': componentTheme?.colorBgDefault,
  '--soui-component-font-size-component': componentTheme?.fontSize ? `${componentTheme.fontSize}px` : undefined,
} as any;

// 4. 在 style.less 中使用 CSS 变量（三层回退）
.soui-component {
  // 第1层: 引用全局设计令牌
  --soui-color-bg-default: var(--soui-color-bg-default, @bg-color-base);
  --soui-font-size-sm: var(--soui-font-size-sm, @font-size-sm);
  
  // 第2层: 组件配置点（引用设计令牌）
  --soui-component-bg-color: var(--soui-color-bg-default);
  --soui-component-font-size: var(--soui-font-size-sm);
  --soui-component-border-radius: var(--soui-border-radius, @border-radius-base);
  
  // 实际样式使用（三层回退：组件级 > 全局 > Less）
  background: var(--soui-component-bg-color-component, var(--soui-component-bg-color));
  font-size: var(--soui-component-font-size-component, var(--soui-component-font-size));
  border-radius: var(--soui-component-border-radius-component, var(--soui-component-border-radius));
}
```

**关键要点:**
- ✅ **第1层**: 定义真正的全局变量，不带组件前缀
- ✅ **第2层**: 组件配置点引用第1层，大部分属性复用设计令牌
- ✅ **第3层**: 组件级覆盖添加 `-component` 后缀
- ✅ **样式文件**: 使用 `var()` 实现三层回退机制

### 步骤 1: 创建组件文件

#### 1.0 研究参考框架（如果用户选择了参考框架）

如果用户在步骤0中选择了参考某个主流框架，需要先研究该框架的对应组件：

1. **查阅官方文档**：了解组件的 API 设计、Props 接口、默认值等
2. **分析设计思路**：理解组件的设计哲学和使用场景
3. **提取可借鉴点**：找出适合 SoUi 的 API 设计元素
4. **保持 SoUi 风格**：确保最终设计与 SoUi 的整体风格一致

**研究要点：**
- Props 命名和类型
- 默认值设置
- 变体和状态
- 子组件结构
- 交互行为
- 无障碍支持

#### 1.1 创建组件目录
```bash
mkdir -p SoUi/src/components/ComponentName
```

#### 1.2 创建组件主文件 `index.tsx`

**标准组件模板：**

```tsx
import React from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

export interface ComponentProps {
  /** 属性说明 */
  propName?: Type;
}

// ==================== Sub-components (如有) ====================

const SubComponent: React.FC<SubProps> = ({ ... }) => {
  return <div>...</div>;
};

// ==================== Main Component ====================

const Component: React.FC<ComponentProps & React.HTMLAttributes<HTMLElement>> = ({
  prop1 = defaultValue,
  className,
  style,
  children,
  ...props
}) => {
  // 内部逻辑

  const componentClassName = classNames(
    'soui-component',
    `soui-component-variant`,
    {
      'soui-component-modifier': condition,
    },
    className
  );

  return (
    <div className={componentClassName} style={style} {...props}>
      {children}
    </div>
  );
};

// 附加子组件（如有）
Component.SubComponent = SubComponent;

export default Component;
```

**关键规范：**
1. 所有类名前缀为 `soui-`
2. 使用 `classNames` 库处理条件类名
3. Props 接口继承原生 HTML 属性（使用 `Omit` 排除冲突属性）
4. 支持 JSDoc 注释（`/** 说明 */`）
5. 通过 `& { SubComponent: ... }` 语法附加子组件
6. 解构 props 时设置默认值

#### 1.3 创建样式文件 `style.less`

**标准样式模板：**

```less
@import '../../styles/variables.less';  // 必须导入变量

// Keyframes（如有动画）
@keyframes soui-animation-name {
  from { ... }
  to { ... }
}

// Mixins（如有复用样式）
.mixin-name(@param) { ... }

// 主类名
.soui-component {
  // 基础样式
  color: @text-color;
  font-size: @font-size-base;

  // 变体
  &-variant1 { ... }
  &-variant2 { ... }

  // 状态
  &-disabled { ... }
  &-loading { ... }

  // 子元素
  &-inner { ... }
  &-content { ... }

  // 修饰符
  &--large { ... }
  &--small { ... }
}
```

**关键规范：**
1. 必须 `@import '../../styles/variables.less'`
2. 使用 BEM 命名规范（`.soui-component--modifier`）
3. 使用 CSS 变量支持主题定制
4. 过渡动画使用 `@transition-duration` 和 `@transition-timing-function`

### 步骤 2: 导出组件

在 `src/index.ts` 中添加导出：

```typescript
// ComponentName Component
export { default as ComponentName } from './components/ComponentName';
export type { ComponentNameProps, OtherType } from './components/ComponentName';
```

### 步骤 3: 创建组件文档

#### 3.1 创建文档文件 `src/docs/components/component-name.md`

**标准文档模板：**

```markdown
# ComponentName 中文名称

简短描述组件用途。

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

**文档要点：**
1. 标题格式：`# ComponentName 中文名称`
2. 必须有"何时使用"章节
3. 代码演示要有说明文字
4. API 表格要完整
5. 包含设计原则（推荐/避免）
6. 包含无障碍访问说明
7. 包含 FAQ
8. 链接到相关组件

#### 3.2 更新侧边栏配置

在 `src/docs/.vitepress/config.ts` 的 `sidebarComponents()` 函数中添加：

function sidebarComponents() {
  return [
    {
      text: '基础组件',  // 选择合适的分组
      collapsed: false,
      items: [
        // ... 现有组件
        { text: 'ComponentName 中文名', link: 'component-name' },
      ],
    },
  ]
}

### 步骤 4: 创建示例代码

**⚠️ 重要提醒：需要同时创建 .tsx 实例文件和 codes.ts！**

SoUi 项目中，`demo.tsx` 使用 `DemoContainer` 组件通过 `react-live` 渲染示例代码。为了支持更复杂的示例（如使用 state、hooks 等），需要同时创建：

1. **`.tsx` 实例文件** - 包含完整的 React 组件实现，用于复杂逻辑
2. **`codes.ts`** - 包含代码字符串，用于 react-live 实时预览

#### 4.1 创建示例目录和实例文件

```bash
mkdir -p SoUi/examples/ComponentName
```

为每个示例创建一个 `.tsx` 文件：

**Basic.tsx 示例：**
```typescript
// examples/ComponentName/Basic.tsx
import React from 'react';
import { ComponentName } from '../../src';

export default () => (
  <ComponentName prop="value">
    内容
  </ComponentName>
);
```

**WithState.tsx 示例（展示如何使用 state）：**
```typescript
// examples/ComponentName/WithState.tsx
import React, { useState } from 'react';
import { ComponentName, Button } from '../../src';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>Toggle</Button>
      <ComponentName visible={visible}>
        动态内容
      </ComponentName>
    </div>
  );
};
```

**实例文件规范：**
1. 每个示例对应一个独立的 `.tsx` 文件
2. 文件名采用 PascalCase 命名（如 `Basic.tsx`, `WithSider.tsx`）
3. 必须正确导入所需的组件和 hooks
4. 导出默认函数组件
5. 保持代码简洁清晰

#### 4.2 创建 codes.ts（代码字符串文件）

在创建了所有 `.tsx` 实例文件后，创建对应的 `codes.ts` 文件：

```typescript
// examples/ComponentName/codes.ts

export const basicCode = `<ComponentName prop="value">
  内容
</ComponentName>`;

export const withStateCode = `const [visible, setVisible] = useState(false);

<div>
  <Button onClick={() => setVisible(!visible)}>Toggle</Button>
  <ComponentName visible={visible}>
    动态内容
  </ComponentName>
</div>`;

// ... 其他示例代码字符串
```

**codes.ts 规范：**
1. 每个示例对应一个导出的字符串常量
2. 命名格式：`{exampleName}Code`（与 `.tsx` 文件名对应）
3. 字符串内容是可直接运行的 JSX 代码
4. 保持与 `.tsx` 实例文件同步
5. 如果示例使用了 state/hooks，需要在代码字符串中包含相关声明

**⚠️ react-live 代码格式重要限制：**

由于 `react-live` 将代码字符串作为组件渲染，必须遵守以下规则：

✅ **正确写法** - 直接写 JSX 表达式或包含必要的声明：
```typescript
// 简单示例
export const exampleCode = `<ComponentName>
  直接写内容
</ComponentName>`;

// 带 state 的示例
export const withStateCode = `const [count, setCount] = useState(0);

<Button onClick={() => setCount(count + 1)}>
  Count: {count}
</Button>`;
```

❌ **错误写法** - 不要使用 import 语句或复杂的模块语法：
```typescript
// ❌ 这会导致错误
export const exampleCode = `import React from 'react';
import { ComponentName } from '@soui/ui';
<ComponentName />`;
```

**最佳实践：**
- 对于简单示例，直接在 codes.ts 中编写简化的 JSX
- 对于复杂示例，先在 `.tsx` 文件中实现完整逻辑，然后在 codes.ts 中提取核心代码
- 确保 codes.ts 中的代码可以在 react-live 环境中运行

### 步骤 5: 更新 DemoContainer（重要！）

如果项目使用 `react-live` 进行实时演示，需要在 `examples/DemoContainer/index.tsx` 中添加新组件：

```typescript
import NewComponent from '../../src/components/NewComponent';

const defaultScope = {
  React,
  useState: React.useState,
  // ... 其他组件
  NewComponent,
  // 如果有子组件
  SubComponent: NewComponent.SubComponent,
  ...scope,
};
```

**注意：** 这一步非常重要，否则示例代码在演示页面中会报错找不到组件！

### 步骤 6: 更新演示页面（demo.tsx）

在 `src/demo.tsx` 中添加新组件的演示：

#### 6.1 导入示例代码

在文件顶部添加导入语句：

```typescript
import * as componentNameCodes from '../examples/ComponentName/codes';
```

#### 6.2 添加演示区块

在 `<div>` 主容器中添加新的 section：

```tsx
{/* ComponentName 组件演示 */}
<section style={{ marginBottom: '48px' }}>
  <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
    ComponentName 中文名称
  </h2>

  <DemoContainer
    title="基础用法"
    description="示例说明文字。"
    code={componentNameCodes.basicCode}
  />

  <DemoContainer
    title="另一个示例"
    description="更多示例说明。"
    code={componentNameCodes.anotherCode}
  />
</section>
```

**注意事项：**
- 每个 DemoContainer 需要有唯一的 `title`
- `description` 应该简洁明了地说明示例用途
- `code` 对应 `codes.ts` 中导出的代码字符串常量
- section 之间使用 `marginBottom: '48px'` 保持间距

### 步骤 7: 丰富文档内容（可选但推荐）

在创建基础文档后，建议添加更多实用示例以提升文档质量：

#### 7.1 添加高级用法示例

在文档的"代码演示"部分添加更多场景：

- **多行文本** - 展示如何处理长文本
- **富文本内容** - 展示如何在 title 中使用 HTML 元素
- **禁用状态处理** - 展示如何为禁用元素添加 Tooltip
- **组合触发方式** - 展示如何使用多种触发方式
- **实际应用场景** - 结合其他组件的实际用例

#### 7.2 完善 FAQ

根据组件特性，添加常见问题解答，例如：

- 组件与其他类似组件的区别
- 常见问题的解决方案
- 最佳实践和注意事项
- 特殊场景的使用方法

#### 7.3 添加设计原则

提供正反示例对比，帮助开发者正确使用组件：

```markdown
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
```

### 步骤 8: 验证构建

```bash
cd SoUi && npm run build
```

确保没有 TypeScript 错误和构建错误。

## 设计变量参考

从 `src/styles/variables.less` 中可用的变量：

**注意**：即使参考了其他框架的设计，也必须使用 SoUi 的设计变量，保持项目一致性。

### 三层设计令牌系统

SoUi 采用分层设计，新组件开发时应遵循以下原则：

1. **第1层 - 设计令牌**: 如果组件需要新的全局变量（如颜色、字号），在 `global.less` 的 `:root` 中添加不带组件前缀的变量
2. **第2层 - 组件配置点**: 在 `global.less` 和 `ConfigProvider/style.less` 中添加带组件前缀的配置点，引用第1层的设计令牌
3. **第3层 - 组件级覆盖**: 在 `ConfigProvider/index.tsx` 中生成带 `-component` 后缀的覆盖变量

**示例:**
```less
/* global.less - 第1层和第2层 */
:root {
  /* 第1层: 设计令牌 */
  --soui-color-bg-default: rgba(0, 0, 0, 0.88);
  
  /* 第2层: 组件配置点 */
  --soui-tooltip-bg-color: var(--soui-color-bg-default);
}

/* ConfigProvider/style.less - 回退值 */
.soui-config-provider {
  --soui-color-bg-default: rgba(0, 0, 0, 0.88);
  --soui-tooltip-bg-color: var(--soui-color-bg-default);
}
```

### 颜色
```less
@primary-color: #1677ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #ff4d4f;
@text-color: rgba(0, 0, 0, 0.88);
@text-color-secondary: rgba(0, 0, 0, 0.65);
@text-color-disabled: rgba(0, 0, 0, 0.25);
```

### 尺寸
```less
@border-radius-base: 6px;
@font-size-base: 14px;
@control-height-base: 32px;
@control-height-sm: 24px;
@control-height-lg: 40px;
```

### 间距（4px 基准）
```less
@padding-xs: 4px;
@padding-sm: 8px;
@padding-md: 16px;
@padding-lg: 24px;
@margin-xs: 4px;
@margin-sm: 8px;
@margin-md: 16px;
@margin-lg: 24px;
```

### 过渡
```less
@transition-duration: 0.3s;
@transition-timing-function: ease-in-out;
```

## 组件命名规范

| 项目 | 命名规则 | 示例 |
|------|---------|------|
| 组件目录 | PascalCase | `Button`, `ConfigProvider` |
| 组件文件名 | index.tsx | `index.tsx` |
| 样式文件名 | style.less | `style.less` |
| CSS 类名 | kebab-case with prefix | `.soui-button`, `.soui-button-primary` |
| 文档文件 | kebab-case | `button.md`, `config-provider.md` |
| 示例目录 | PascalCase | `Button`, `ConfigProvider` |
| 示例实例文件 | PascalCase | `Basic.tsx`, `Size.tsx`, `WithSider.tsx` |
| 示例代码字符串文件 | codes.ts | `codes.ts` |

**注意**：即使参考了其他框架，也必须遵循 SoUi 的命名规范，保持项目一致性。

## TypeScript 类型规范

1. **Props 接口命名**: `{ComponentName}Props`
2. **枚举类型命名**: `{ComponentName}{PropertyName}`，如 `ButtonType`, `ButtonSize`
3. **使用 JSDoc 注释**: 每个属性都要有说明
4. **继承原生属性**: 使用 `Omit<React.HTMLAttributes<Element>, 'conflict'>`
5. **如果参考了框架**：可以参考其 Props 命名和类型设计，但要保持 SoUi 的命名规范

```typescript
export type ButtonType = 'default' | 'primary' | 'dashed';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small';
}
```

## 最佳实践

### 组件设计
1. **在开始开发前询问用户是否参考主流框架**
2. 保持组件单一职责
3. 提供合理的默认值
4. 支持受控和非受控模式
5. 考虑无障碍访问（ARIA 属性）
6. 支持键盘操作

### 参考框架的最佳实践
- **何时参考**：当用户对 API 设计有特定偏好，或需要与某个生态系统兼容时
- **如何参考**：研究目标框架的 Props 接口、默认值、变体等，但保持 SoUi 的设计风格
- **何时不参考**：基础组件或 SoUi 已有明确设计规范时，建议独立实现以保持一致性

### 样式设计
1. **即使参考了其他框架，也必须使用 SoUi 的设计变量**
2. **遵循三层设计令牌系统**（重要！）
   - 能通用的变量 → 定义为第1层设计令牌（不带组件前缀）
   - 组件专属变量 → 定义为第2层配置点（带组件前缀）
   - 用户可覆盖的变量 → 生成第3层覆盖变量（带 `-component` 后缀）
3. 使用 CSS 变量支持主题定制
4. 考虑响应式适配
5. 添加过渡动画提升体验

### 文档编写
1. 示例代码要可运行
2. API 文档要完整准确
3. 提供正反示例对比
4. 包含常见问题解答

## 检查清单

创建组件后，确认完成以下事项：

- [ ] **在开始开发前已询问用户是否参考主流框架**（重要！）
- [ ] **在编写代码前已查看主题样式和现有组件实现**（重要！）
  - [ ] 已阅读 `ConfigProvider/types.ts` 了解主题配置类型
  - [ ] 已阅读 `ConfigProvider/index.tsx` 了解主题实现方式
  - [ ] 已阅读 `styles/variables.less` 了解可用的设计变量
  - [ ] 已参考 2-3 个相似的现有组件实现
- [ ] **主题集成已完成**（重要！）
  - [ ] 支持圆角配置（borderRadius）
  - [ ] 支持字体大小配置（fontSize）
  - [ ] 支持主色配置（colorPrimary / primaryColor）
  - [ ] **使用三层设计令牌系统**（重要！）
    - [ ] 第1层：定义全局设计令牌（不带组件前缀）
    - [ ] 第2层：组件配置点引用设计令牌
    - [ ] 第3层：组件级覆盖添加 `-component` 后缀
  - [ ] 正确处理配置优先级（组件级 > 全局 > CSS 默认 > Less 默认）
  - [ ] 在 style.less 中使用 `var()` 实现三层回退
  - [ ] 在 `ConfigProvider/types.ts` 中添加了组件级配置类型
- [ ] 如果用户选择参考框架，已研究该框架的 API 设计
- [ ] 即使参考了其他框架，也使用了 SoUi 的设计变量和命名规范
- [ ] 组件文件 `src/components/ComponentName/index.tsx` 已创建
- [ ] 样式文件 `src/components/ComponentName/style.less` 已创建
- [ ] 已在 `src/index.ts` 中导出组件和类型
- [ ] 文档文件 `src/docs/components/component-name.md` 已创建
- [ ] 已在 `.vitepress/config.ts` 中添加侧边栏配置
- [ ] 示例目录 `examples/ComponentName/` 已创建
- [ ] **已为每个示例创建对应的 `.tsx` 实例文件**（重要！）
  - [ ] Basic.tsx - 基础用法示例
  - [ ] 其他示例文件根据组件特性创建
- [ ] **已创建 `codes.ts` 文件，包含所有示例的代码字符串**（重要！）
  - [ ] 代码字符串与 `.tsx` 实例文件保持同步
  - [ ] 示例代码字符串包含美观的样式（背景色、边框、圆角等）
- [ ] **已在 `examples/DemoContainer/index.tsx` 中添加组件到 scope**（重要！）
- [ ] **已在 `src/demo.tsx` 中添加演示区块**（重要！）
- [ ] **文档已添加高级用法示例**（推荐）
- [ ] **文档已完善 FAQ**（推荐）
- [ ] 运行 `npm run build` 无错误
- [ ] 组件类名前缀为 `soui-`
- [ ] 样式导入了 `variables.less`
- [ ] Props 有 JSDoc 注释
- [ ] 文档包含 API 表格
- [ ] 文档包含设计原则

## 快速开始模板

**⚠️ 重要提醒**：在开始创建组件之前，必须先询问用户是否希望参考主流 UI 框架的实现方式。

复制以下模板快速开始新组件开发：

### index.tsx 模板
```tsx
import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface ComponentNameProps {
  /** 属性说明 */
  propName?: string;
}

const ComponentName: React.FC<ComponentNameProps & React.HTMLAttributes<HTMLDivElement>> = ({
  propName = 'default',
  className,
  style,
  children,
  ...props
}) => {
  const componentClassName = classNames(
    'soui-component',
    className
  );

  return (
    <div className={componentClassName} style={style} {...props}>
      {children}
    </div>
  );
};

export default ComponentName;
```

### style.less 模板
```less
@import '../../styles/variables.less';

.soui-component {
  color: @text-color;
  font-size: @font-size-base;
}
```

### 文档模板
见上方的"标准文档模板"部分。
