# SoUi 组件开发示例

本文件展示一个完整的组件开发案例，以 Typography 组件为例。

## 需求分析

**用户需求**：创建一个排版组件，用于展示标题、段落、文本等内容。

**功能需求**：
- 支持多级标题（h1-h5）
- 支持段落文本
- 支持普通文本和链接
- 支持文本装饰（加粗、斜体、下划线、删除线等）
- 支持文本复制功能
- 支持文本编辑功能
- 支持文本省略显示

## 实施过程

### 1. 创建组件文件

#### index.tsx
位置：`SoUi/src/components/Typography/index.tsx`

主要实现：
- Text 组件：基础文本
- Title 组件：标题（h1-h5）
- Paragraph 组件：段落
- Link 组件：链接
- 辅助组件：OperationButton（操作按钮）

关键设计决策：
- 使用组合模式，Typography.Text / Typography.Title 等
- 支持 copyable、editable、ellipsis 等高级功能
- 使用 ResizeObserver 检测文本溢出

#### style.less
位置：`SoUi/src/components/Typography/style.less`

样式要点：
- 导入 variables.less
- 定义标题层级字体大小
- 定义文本类型颜色（secondary, success, warning, danger）
- 定义操作按钮样式和 tooltip
- 定义编辑输入框样式
- 响应式适配

### 2. 导出组件

在 `src/index.ts` 中添加：
```typescript
export { default as Typography } from './components/Typography';
export type {
  TypographyProps,
  TextType,
  CopyConfig,
  EditableConfig,
  EllipsisConfig,
  BaseProps,
  TitleProps,
  ParagraphProps,
  LinkProps,
} from './components/Typography';
```

### 3. 编写文档

位置：`SoUi/src/docs/components/typography.md`

文档结构：
- 何时使用
- 代码演示（8个示例）
- API 表格（Title, Paragraph, Text, Link, CopyConfig, EditableConfig, EllipsisConfig）
- 设计原则（推荐/避免）
- 无障碍访问
- FAQ
- 相关资源

更新侧边栏配置：
```typescript
// .vitepress/config.ts
{ text: 'Typography 排版', link: 'typography' }
```

### 4. 创建示例

目录：`SoUi/examples/Typography/`

创建的示例文件：
- Basic.tsx - 基础用法
- TextStyle.tsx - 文本样式
- TextType.tsx - 文本类型
- Copyable.tsx - 可复制文本
- Editable.tsx - 可编辑文本
- Ellipsis.tsx - 文本省略
- Links.tsx - 链接组件
- codes.ts - 代码字符串

### 5. 验证构建

```bash
cd SoUi && npm run build
```

结果：构建成功，无错误。

## 遇到的问题及解决方案

### 问题 1: TypeScript 类型错误
**现象**：HeadingTag 动态标签类型推断错误

**解决**：
```typescript
// 错误写法
const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

// 正确写法
const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
```

### 问题 2: onClick 事件类型不匹配
**现象**：子组件 onClick 类型与父组件不兼容

**解决**：使用 `Omit` 排除冲突属性，将 onClick 传递给内部 Text 组件

### 问题 3: 示例文件导入路径错误
**现象**：`Cannot find module '../../index'`

**解决**：改为直接导入组件文件
```typescript
// 错误
import { Typography } from '../../index';

// 正确
import Typography from '../../src/components/Typography';
```

## 最终成果

### 文件清单
```
src/components/Typography/
├── index.tsx (615行)
└── style.less (230行)

src/docs/components/
└── typography.md (408行)

examples/Typography/
├── Basic.tsx
├── TextStyle.tsx
├── TextType.tsx
├── Copyable.tsx
├── Editable.tsx
├── Ellipsis.tsx
├── Links.tsx
└── codes.ts
```

### 功能特性
- ✅ 5级标题
- ✅ 段落文本
- ✅ 文本装饰（strong, italic, underline, delete, code, mark）
- ✅ 文本类型（secondary, success, warning, danger）
- ✅ 复制功能（自定义内容和提示）
- ✅ 编辑功能（onStart, onChange, onCancel, onFinish）
- ✅ 省略功能（单行/多行/展开/tooltip）
- ✅ 链接组件（新窗口/禁用）
- ✅ 主题集成
- ✅ 无障碍支持

### 文档质量
- ✅ 完整的 API 表格
- ✅ 8个代码示例
- ✅ 设计原则对比
- ✅ FAQ 常见问题
- ✅ 相关资源链接

## 经验总结

### 成功经验
1. 先阅读现有组件了解模式
2. 严格按照项目规范命名
3. 及时修复 TypeScript 错误
4. 文档示例要全面且可运行
5. 构建验证不可省略

### 改进建议
1. 可以先创建简单的 MVP 版本
2. 逐步添加高级功能
3. 每个功能都要有对应示例
4. 考虑添加单元测试

## 复用指南

基于此案例，创建新组件时：

1. **参考现有实现**：阅读 Button、Icon、Typography 等组件
2. **遵循命名规范**：类名 `soui-` 前缀，PascalCase 组件名
3. **完整导出类型**：Props、枚举、配置接口都要导出
4. **文档要详细**：API、示例、设计原则缺一不可
5. **示例要实用**：覆盖常见使用场景
6. **构建要验证**：确保无编译错误

---

此案例可作为后续组件开发的参考模板。
