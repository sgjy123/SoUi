# SoUi 组件开发快速参考

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
