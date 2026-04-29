# 更新日志

记录 SoUi 的所有重要更新。

## [1.0.0] - 2024-03-19

### ✨ 新增功能

#### 基础组件
- **Button** - 按钮组件，支持多种类型、尺寸和状态
- **Icon** - 图标组件，基于 @icon-park/react
- **Typography** - 排版组件，包含 Title、Text、Paragraph

#### 布局组件
- **Grid** - 栅格布局系统（Row, Col）
- **Space** - 间距组件，控制元素之间的间距

#### 数据录入
- **Input** - 输入框组件，支持多种变体

#### 数据展示
- **Card** - 卡片容器组件
- **Tag** - 标签组件
- **Badge** - 徽标组件

#### 反馈组件
- **Modal** - 对话框组件
- **Message** - 全局提示组件
- **Alert** - 警告提示组件

#### 配置组件
- **ConfigProvider** - 全局主题配置提供者

### 🎨 设计系统

#### 样式系统
- 完整的色彩系统
- 基于 4px 的间距系统
- 排版系统
- 阴影系统
- Mixins 工具库

#### 主题定制
- 支持亮色/暗色主题切换
- CSS Variables 动态主题
- ConfigProvider 全局配置
- 组件级主题定制

### 📚 文档

#### 指南
- 快速开始指南
- 安装指南
- 介绍文档

#### 样式文档
- 设计基础概览
- 色彩系统详细说明
- 间距系统使用指南
- 阴影系统说明

#### 主题文档
- ConfigProvider 使用指南
- CSS Variables 说明
- 暗黑模式实现

#### 组件文档
- Button 完整 API 文档
- 所有组件的使用示例
- 最佳实践说明

### 🔧 技术栈

- React 18+
- TypeScript 5.3+
- Vite 4.5+
- Less 4.2+
- VitePress 1.0+

### 📦 构建优化

- 支持 Tree Shaking
- ESM 和 UMD 双格式输出
- 完整的 TypeScript 类型定义
- 按需加载支持

### ♿ 无障碍访问

- 遵循 WAI-ARIA 规范
- 键盘导航支持
- 屏幕阅读器友好
- 颜色对比度符合 WCAG 2.1 AA 标准

---

## 版本说明

### 版本号规则

SoUi 遵循语义化版本规范（Semantic Versioning）：

- **主版本号（Major）**：不兼容的 API 变更
- **次版本号（Minor）**：向后兼容的功能新增
- **修订号（Patch）**：向后兼容的问题修复

### 发布周期

- **主版本**：根据重大功能更新决定
- **次版本**：每 2-4 周
- **修订版**：根据需要随时发布

### 升级建议

#### 小版本升级
通常可以直接升级，注意查看新增功能的 API 变化。

```bash
npm install @soui/ui@latest
```

#### 主版本升级
需要仔细阅读迁移指南，可能需要修改部分代码。

---

## 已知问题

### v1.0.0

- 部分组件的暗黑模式适配还不完善
- TypeScript 类型定义在极少数场景下可能不够精确
- 文档站点还在持续完善中

---

## 计划中的功能

### v1.1.0（预计 2024-04）
- [ ] Form 表单组件增强
- [ ] Select 选择器组件
- [ ] DatePicker 日期选择器
- [ ] Table 表格组件
- [ ] Menu 菜单组件

### v1.2.0（预计 2024-05）
- [ ] 动画系统
- [ ] 更多主题算法
- [ ] 国际化支持完善
- [ ] 性能优化

---

## 贡献者

感谢所有为 SoUi 做出贡献的开发者！

特别感谢：
- 核心开发团队
- 文档贡献者
- Bug 报告者
- 功能建议者

---

## 相关链接

- [GitHub Repository](https://github.com/souI/ui)
- [NPM Package](https://www.npmjs.com/package/@soui/ui)
- [问题反馈](https://github.com/souI/ui/issues)
- [迁移指南](/resources/migration)
