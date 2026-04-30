---
name: soui-component
description: SoUi 组件库开发指南。用于创建新组件、编写组件文档和示例。当用户要求"创建一个组件"、"添加新组件"或"实现 xxx 组件"时使用此 Skill。
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
├── examples/                       # 示例代码目录
│   ├── DemoContainer/              # 演示容器组件
│   │   └── index.tsx               # DemoContainer 主文件
│   └── ComponentName/
│       ├── Basic.tsx               # 基础示例
│       ├── codes.ts                # 示例代码字符串
│       └── ...                     # 其他示例文件
└── package.json
```

## 组件开发流程

当用户要求创建一个新组件时，按以下步骤执行：

### 步骤 1: 创建组件文件

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

#### 4.1 创建示例目录
```bash
mkdir -p SoUi/examples/ComponentName
```

#### 4.2 创建示例文件

每个示例是一个独立的 `.tsx` 文件：

```tsx
// examples/ComponentName/Basic.tsx
import React from 'react';
import ComponentName from '../../src/components/ComponentName';
import Space from '../../src/components/Space';

const Basic: React.FC = () => {
  return (
    <Space wrap>
      <ComponentName>内容</ComponentName>
    </Space>
  );
};

export default Basic;
```

**常见示例类型：**
- `Basic.tsx` - 基础用法
- `Size.tsx` - 不同尺寸
- `Status.tsx` - 不同状态
- `Variant.tsx` - 不同变体
- `Advanced.tsx` - 高级用法

#### 4.3 创建 codes.ts

```typescript
// examples/ComponentName/codes.ts

export const basicCode = `<ComponentName>
  内容
</ComponentName>`;

export const sizeCode = `<Space>
  <ComponentName size="small">小</ComponentName>
  <ComponentName size="middle">中</ComponentName>
  <ComponentName size="large">大</ComponentName>
</Space>`;

// ... 其他示例代码字符串
```

**codes.ts 规范：**
1. 每个示例对应一个导出的字符串常量
2. 命名格式：`{exampleName}Code`
3. 字符串内容是可直接运行的 JSX 代码
4. 保持与示例文件同步

**️ react-live 代码格式重要限制：**

由于 `react-live` 将代码字符串作为组件渲染，必须遵守以下规则：

✅ **正确写法** - 直接写 JSX 表达式：
```typescript
export const exampleCode = `<ComponentName>
  直接写内容，不要用变量
</ComponentName>`;
```

❌ **错误写法** - 不要使用变量声明：
```typescript
// ❌ 这会导致 SyntaxError
export const exampleCode = `const text = 'some text';
<ComponentName>{text}</ComponentName>`;
```

**替代方案：**
- 直接内联值，不使用变量
- 如果需要复杂逻辑，在示例组件文件（Basic.tsx）中实现，codes.ts 只展示简化的 JSX

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
| 示例文件 | PascalCase | `Basic.tsx`, `Size.tsx` |

## TypeScript 类型规范

1. **Props 接口命名**: `{ComponentName}Props`
2. **枚举类型命名**: `{ComponentName}{PropertyName}`，如 `ButtonType`, `ButtonSize`
3. **使用 JSDoc 注释**: 每个属性都要有说明
4. **继承原生属性**: 使用 `Omit<React.HTMLAttributes<Element>, 'conflict'>`

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
1. 保持组件单一职责
2. 提供合理的默认值
3. 支持受控和非受控模式
4. 考虑无障碍访问（ARIA 属性）
5. 支持键盘操作

### 样式设计
1. 使用设计变量，避免硬编码
2. 支持主题定制（CSS 变量）
3. 考虑响应式适配
4. 添加过渡动画提升体验

### 文档编写
1. 示例代码要可运行
2. API 文档要完整准确
3. 提供正反示例对比
4. 包含常见问题解答

## 检查清单

创建组件后，确认完成以下事项：

- [ ] 组件文件 `src/components/ComponentName/index.tsx` 已创建
- [ ] 样式文件 `src/components/ComponentName/style.less` 已创建
- [ ] 已在 `src/index.ts` 中导出组件和类型
- [ ] 文档文件 `src/docs/components/component-name.md` 已创建
- [ ] 已在 `.vitepress/config.ts` 中添加侧边栏配置
- [ ] 示例目录 `examples/ComponentName/` 已创建
- [ ] 至少创建了 `Basic.tsx` 示例
- [ ] 创建了 `codes.ts` 代码字符串文件
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
