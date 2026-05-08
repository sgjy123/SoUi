# SoUi 组件开发对话流程

当用户请求创建新组件时，按以下流程执行：

## 第一步：收集需求

使用 AskUserQuestion 工具确认以下信息：

1. **组件名称**（英文 PascalCase）
2. **组件功能描述**（用途、场景）
3. **是否参考主流框架**（重要！）
4. **是否有参考组件**（如 Ant Design 的对应组件）
5. **需要哪些变体/状态**（尺寸、类型等）

### 关于参考框架的询问

在开始开发前，必须询问用户是否希望参考主流 UI 框架的实现方式：

```typescript
// 使用 AskUserQuestion 工具
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

**如果用户选择参考框架：**
- 研究选定框架的对应组件 API 设计
- 分析其 Props 接口、默认值、变体等
- 在保持 SoUi 设计风格的前提下，借鉴合理的 API 设计
- 在文档中注明参考来源

**如果用户选择不参考：**
- 完全按照 SoUi 的设计规范和现有组件模式进行开发
- 确保与现有组件保持一致的设计语言

示例问题：
```
请问您要创建的组件：
1. 英文名称是什么？（如 Button, Input, Card）
2. 主要用途是什么？
3. 需要支持哪些类型/尺寸/状态？
4. 是否有参考的设计规范或现有组件？
5. 【重要】是否希望参考某个主流框架的实现方式？
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

1. **必须询问参考框架**：在开始开发前，必须询问用户是否希望参考主流框架
2. **不要过度设计**：只实现用户明确要求的功能
3. **保持一致性**：遵循项目现有的代码风格
4. **完整性检查**：确保所有文件都正确创建
5. **构建验证**：必须通过 TypeScript 编译和 Vite 构建
6. **文档完整**：API 表格、示例、设计原则缺一不可
7. **如果参考了框架**：必须在文档中添加“参考来源”章节

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

**参考框架建议：**
- **Ant Design**：适合企业级中后台组件（Table、Form、Tree 等）
- **Material-UI**：适合现代化、动画丰富的组件（Button、Card、Dialog 等）
- **Chakra UI**：适合注重可访问性的组件（Modal、Tooltip、Popover 等）
- **Tailwind UI**：适合实用优先的布局组件（Grid、Flex、Container 等）
