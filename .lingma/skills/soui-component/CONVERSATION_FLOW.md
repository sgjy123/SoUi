# SoUi 组件开发对话流程

当用户请求创建新组件时，按以下流程执行：

## 第一步：收集需求

使用 AskUserQuestion 工具确认以下信息：

1. **组件名称**（英文 PascalCase）
2. **组件功能描述**（用途、场景）
3. **是否有参考组件**（如 Ant Design 的对应组件）
4. **需要哪些变体/状态**（尺寸、类型等）

示例问题：
```
请问您要创建的组件：
1. 英文名称是什么？（如 Button, Input, Card）
2. 主要用途是什么？
3. 需要支持哪些类型/尺寸/状态？
4. 是否有参考的设计规范或现有组件？
```

## 第二步：设计方案

根据需求设计：
- Props 接口定义
- 子组件结构（如有）
- 样式变体
- 交互行为

## 第三步：实施开发

按照以下顺序创建文件：

1. **组件实现**
   - `src/components/ComponentName/index.tsx`
   - `src/components/ComponentName/style.less`

2. **导出配置**
   - 更新 `src/index.ts`

3. **文档编写**
   - `src/docs/components/component-name.md`
   - 更新 `src/docs/.vitepress/config.ts`

4. **示例代码**
   - `examples/ComponentName/Basic.tsx`
   - `examples/ComponentName/codes.ts`
   - 其他示例文件

5. **验证构建**
   - 运行 `npm run build`

## 第四步：交付说明

向用户说明：
- 组件已创建的文件列表
- 组件的主要功能和使用方法
- 如何查看文档和示例
- 后续可扩展的方向

## 注意事项

1. **不要过度设计**：只实现用户明确要求的功能
2. **保持一致性**：遵循项目现有的代码风格
3. **完整性检查**：确保所有文件都正确创建
4. **构建验证**：必须通过 TypeScript 编译和 Vite 构建
5. **文档完整**：API 表格、示例、设计原则缺一不可

## 常见组件类型参考

### 基础展示类
- Text, Title, Paragraph (Typography)
- Icon, Avatar, Badge

### 交互操作类
- Button, Link, Dropdown
- Input, Select, Checkbox, Radio

### 布局容器类
- Card, Panel, Collapse
- Grid, Space, Divider

### 反馈提示类
- Alert, Message, Notification
- Modal, Drawer, Tooltip

### 数据展示类
- Table, List, Tree
- Tag, Timeline, Progress

根据不同类型，选择合适的模式和参考组件。
