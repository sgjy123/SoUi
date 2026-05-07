# SoUi 组件开发快速参考

## ⚠️ 重要提醒：创建组件前必须询问

在开始创建新组件之前，**必须询问用户是否希望参考主流 UI 框架**：

```
您希望这个组件参考哪个主流框架的实现方式？
- Ant Design（企业级中后台）
- Material-UI（Google Material Design）
- Chakra UI（可访问性优先）
- Tailwind UI（实用优先）
- 不参考特定框架（推荐，按 SoUi 规范独立实现）
```

**如果用户选择参考框架：**
- 研究该框架的 API 设计
- 借鉴合理的 Props 接口和默认值
- **但必须保持 SoUi 的设计风格和使用 SoUi 的设计变量**
- 在文档中注明参考来源

详见 [CONVERSATION_FLOW.md](./CONVERSATION_FLOW.md)

## 文件结构清单

创建新组件时需要创建的文件：

```
SoUi/
├── src/
│   ├── components/ComponentName/
│   │   ├── index.tsx          # 组件主文件
│   │   └── style.less         # 组件样式
│   ├── docs/components/
│   │   └── component-name.md  # 组件文档
│   └── index.ts               # 添加导出（已存在）
├── examples/ComponentName/
│   ├── Basic.tsx              # 基础示例
│   └── codes.ts               # 示例代码字符串
└── src/docs/.vitepress/
    └── config.ts              # 添加侧边栏配置（已存在）
```

## 关键规范速查

### 0. 参考框架（重要！）
- **必须先询问**：在开始开发前，必须询问用户是否希望参考主流框架
- **如果参考**：研究目标框架的 API 设计，但保持 SoUi 的设计风格
- **文档注明**：如果参考了框架，必须在文档中添加“参考来源”章节
- **使用 SoUi 变量**：即使参考了其他框架，也必须使用 SoUi 的设计变量

### 1. 类名规范
- 前缀: `soui-`
- 格式: `soui-component-name--modifier`
- 示例: `.soui-button`, `.soui-button-primary`, `.soui-button--large`

### 2. Props 命名
- 接口: `{ComponentName}Props`
- 枚举: `{ComponentName}{Property}`，如 `ButtonType`
- 必须加 JSDoc: `/** 说明 */`

### 3. 样式导入
```less
@import '../../styles/variables.less';  // 必须
```

### 4. 导出格式
```typescript
// src/index.ts
export { default as ComponentName } from './components/ComponentName';
export type { ComponentNameProps } from './components/ComponentName';
```

### 5. 文档标题
```markdown
# ComponentName 中文名称
```

### 6. 示例导入路径
```tsx
import ComponentName from '../../src/components/ComponentName';
import Space from '../../src/components/Space';
```

## 常用设计变量

```less
// 颜色
@primary-color: #1677ff
@success-color: #52c41a
@warning-color: #faad14
@error-color: #ff4d4f

// 文本
@text-color: rgba(0, 0, 0, 0.88)
@text-color-secondary: rgba(0, 0, 0, 0.65)

// 尺寸
@font-size-base: 14px
@border-radius-base: 6px
@control-height-base: 32px

// 间距
@padding-sm: 8px
@padding-md: 16px
@margin-sm: 8px
@margin-md: 16px

// 过渡
@transition-duration: 0.3s
```

## codes.ts 重要限制

**react-live 不支持变量声明！**

```typescript
// ❌ 错误 - 会报 SyntaxError
export const code = `const text = 'hello';
<Component>{text}</Component>`;

// ✅ 正确 - 直接内联值
export const code = `<Component>hello</Component>`;
```

## 验证命令

```bash
cd SoUi && npm run build
```
