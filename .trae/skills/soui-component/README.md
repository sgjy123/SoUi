# SoUi 组件开发 Skill

## 概述

这是一个用于在 SoUi 项目中创建新组件的完整指南。它包含了从 Typography 组件开发过程中总结的所有规范、模板和最佳实践。

## 文件结构

```
.lingma/skills/soui-component/
├── SKILL.md              # 主文档 - 完整的开发规范和模板
├── QUICK_REFERENCE.md    # 快速参考 - 常用规范速查
├── CONVERSATION_FLOW.md  # 对话流程 - 如何与用户交互收集需求
├── EXAMPLE.md            # 实例参考 - Typography 组件完整案例
└── README.md             # 本文件
```

## 何时使用

当用户提出以下需求时使用此 Skill：
- "创建一个 XXX 组件"
- "添加一个新组件"
- "实现 XXX 功能组件"
- "帮我写一个 XXX"

## 重要特性：参考主流框架

在创建新组件时，**必须询问用户是否希望参考主流 UI 框架**的实现方式。

支持的参考框架：
- **Ant Design** - 企业级中后台 UI 规范
- **Material-UI (MUI)** - Google Material Design 风格
- **Chakra UI** - 现代、可访问性优先的设计系统
- **Tailwind UI** - 实用优先的 CSS 框架配套组件
- **不参考特定框架** - 按照 SoUi 设计规范独立实现（推荐）

如果用户选择参考某个框架：
1. 研究该框架对应组件的 API 设计
2. 分析其 Props 接口、默认值、变体等
3. 在保持 SoUi 设计风格的前提下，借鉴合理的 API 设计
4. 在文档中注明参考来源

详见 [CONVERSATION_FLOW.md](./CONVERSATION_FLOW.md) 中的"关于参考框架的询问"部分。

## 使用方法

1. **阅读 SKILL.md** - 了解完整的开发流程和模板
2. **参考 QUICK_REFERENCE.md** - 快速查阅常用规范
3. **遵循 CONVERSATION_FLOW.md** - 与用户确认需求
4. **查看 EXAMPLE.md** - 参考实际案例

## 核心内容

### 0. 参考主流框架（重要！）
- **必须询问**：在开始开发前，必须询问用户是否希望参考主流框架
- **支持的框架**：Ant Design、Material-UI、Chakra UI、Tailwind UI 或不参考
- **如何参考**：研究目标框架的 API 设计，但保持 SoUi 的设计风格
- **文档注明**：如果参考了框架，必须在文档中添加“参考来源”章节

### 1. 组件开发流程
- 创建组件文件（index.tsx + style.less）
- 导出组件（src/index.ts）
- 编写文档（component-name.md）
- 创建示例（examples/ComponentName/）
- 验证构建（npm run build）

### 2. 代码规范
- 类名前缀：`soui-`
- 命名方式：PascalCase（组件）、kebab-case（CSS）
- TypeScript 类型定义
- JSDoc 注释要求

### 3. 设计系统
- 颜色变量
- 尺寸变量
- 间距系统（4px 基准）
- 过渡动画

### 4. 文档标准
- 标题格式
- API 表格
- 代码示例
- 设计原则
- 无障碍访问
- FAQ

### 5. 示例规范
- 示例文件结构
- codes.ts 格式
- 导入路径规范

## 快速开始

要创建一个新组件，至少需要：

1. **组件实现**
   ```
   src/components/ComponentName/
   ├── index.tsx
   └── style.less
   ```

2. **导出配置**
   ```typescript
   // src/index.ts
   export { default as ComponentName } from './components/ComponentName';
   export type { ComponentNameProps } from './components/ComponentName';
   ```

3. **文档**
   ```
   src/docs/components/component-name.md
   ```

4. **示例**
   ```
   examples/ComponentName/
   ├── Basic.tsx
   └── codes.ts
   ```

## 关键要点

✅ **必须做的**：
- **在开始开发前询问用户是否参考主流框架**
- 所有类名使用 `soui-` 前缀
- 样式文件导入 variables.less
- Props 添加 JSDoc 注释
- 文档包含完整 API 表格
- **如果参考了框架，必须在文档中添加“参考来源”章节**
- 运行 npm run build 验证

❌ **避免做的**：
- 硬编码颜色和尺寸（使用变量）
- 跳过文档编写
- 忽略 TypeScript 错误
- 缺少示例代码
- **忘记询问用户是否参考主流框架**

## 相关资源

- [SKILL.md](./SKILL.md) - 详细开发规范
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - 快速参考
- [CONVERSATION_FLOW.md](./CONVERSATION_FLOW.md) - 需求收集流程
- [EXAMPLE.md](./EXAMPLE.md) - Typography 组件案例

## 版本历史

- v1.1 (2026-05-07) - 添加参考主流框架功能，支持 Ant Design、MUI、Chakra UI、Tailwind UI 等
- v1.0 (2026-04-29) - 初始版本，基于 Typography 组件开发经验
