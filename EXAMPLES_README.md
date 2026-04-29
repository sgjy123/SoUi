# SoUi 组件示例结构说明

## 目录结构

```
SoUi/
├── examples/                    # 示例和演示工具目录
│   ├── DemoContainer/          # 演示容器组件（集成 react-live）
│   │   ├── index.tsx
│   │   └── style.less
│   ├── Button/                 # Button 组件示例
│   │   ├── Basic.tsx          # 基本类型示例
│   │   ├── Size.tsx           # 尺寸示例
│   │   ├── Status.tsx         # 状态示例
│   │   └── Shape.tsx          # 形状示例
│   ├── Icon/                   # Icon 组件示例
│   │   └── Basic.tsx          # 基本图标示例
│   └── Space/                  # Space 组件示例
│       ├── Basic.tsx          # 基本用法示例
│       ├── Size.tsx           # 间距尺寸示例
│       ├── Direction.tsx      # 排列方向示例
│       ├── Block.tsx          # 块级显示示例
│       ├── Split.tsx          # 分隔符示例
│       └── Align.tsx          # 对齐方式示例
├── src/
│   ├── components/             # 组件库目录（仅存放可复用组件）
│   │   ├── Button/
│   │   ├── Icon/
│   │   ├── Space/
│   │   └── ...
│   └── demo.tsx                # 演示入口文件
└── ...
```

## 核心功能

### 1. react-live 实时预览

使用 `react-live` 库实现代码的实时预览和编辑功能。每个示例都包含：
- **实时预览区域**：展示组件的实际效果
- **代码查看功能**：点击"查看代码"按钮可以查看对应的源代码
- **错误提示**：如果代码有错误，会显示错误信息

### 2. DemoContainer 组件

`DemoContainer` 是一个封装好的演示容器，提供以下功能：

```tsx
import DemoContainer from '../examples/DemoContainer';

<DemoContainer
  title="示例标题"
  description="示例描述（可选）"
  code={`// 示例代码字符串`}
/>
```

**Props 说明：**
- `title`: 示例标题（必填）
- `description`: 示例描述（可选）
- `code`: 示例代码字符串（必填），用于 react-live 渲染
- `scope`: 自定义作用域（可选），可以传入额外的组件或变量

### 3. 添加新示例的步骤

#### 步骤 1：创建示例文件

在对应的组件目录下创建新的示例文件，例如 `examples/Button/NewExample.tsx`：

```tsx
import React from 'react';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const NewExample: React.FC = () => {
  return (
    <Space>
      <Button type="primary">按钮1</Button>
      <Button>按钮2</Button>
    </Space>
  );
};

export default NewExample;
```

#### 步骤 2：在 demo.tsx 中添加代码字符串

在 `src/demo.tsx` 中添加对应的代码字符串：

**重要**：react-live 只需要 JSX 表达式，不需要 import 语句！组件已经在 DemoContainer 的 scope 中提供。

```tsx
const buttonNewExampleCode = `<Space>
  <Button type="primary">按钮1</Button>
  <Button>按钮2</Button>
</Space>`;
```

#### 步骤 3：在 demo.tsx 中使用 DemoContainer

在相应的位置添加 `DemoContainer`：

```tsx
<DemoContainer
  title="新示例标题"
  description="新示例的描述"
  code={buttonNewExampleCode}
/>
```

## 运行演示

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3001
```

## 技术栈

- **react-live**: 实时代码预览和编辑
- **prism-react-renderer**: 代码语法高亮
- **Vite**: 构建工具
- **React 18**: UI 框架
- **TypeScript**: 类型安全
- **Less**: CSS 预处理器

## 注意事项

1. **代码字符串格式**：确保 `code` 属性中的代码字符串是有效的 JSX 代码
2. **依赖引入**：在代码字符串中使用组件时，需要从 `@soui/ui` 导入
3. **样式隔离**：每个示例的样式应该独立，避免相互影响
4. **响应式设计**：示例应该考虑不同屏幕尺寸下的显示效果

## 扩展示例

如果要为其他组件添加示例，按照以下步骤操作：

1. 在 `examples/` 下创建新的组件文件夹
2. 在该文件夹中创建各个示例场景的文件
3. 在 `demo.tsx` 中导入并配置 `DemoContainer`
4. 确保代码字符串与实际示例保持一致

## 常见问题

### Q: 如何修改示例的代码？
A: 需要同时修改两个地方：
1. 实际运行的示例文件（`examples/xxx/xxx.tsx`）
2. demo.tsx 中对应的代码字符串

### Q: 为什么代码预览和实际效果不一致？
A: 请检查 `code` 字符串是否与示例文件的代码保持一致。

### Q: 如何添加新的组件到 scope 中？
A: 在 `DemoContainer/index.tsx` 的 `defaultScope` 中添加：

```tsx
const defaultScope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  YourComponent, // 添加新组件
  ...scope,
};
```
