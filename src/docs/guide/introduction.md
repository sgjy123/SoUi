# 介绍

欢迎使用 SoUi！这是一个基于 React 18+、TypeScript 和 Vite 构建的现代化 UI 组件库。

## 什么是 SoUi？

SoUi 是一套专为企业级应用设计的 React 组件库，提供了丰富的 UI 组件和灵活的主题定制能力。

### 核心特性

🎨 **完整的设计系统**
- 精心设计的色彩系统
- 基于 4px 原则的间距系统
- 统一的排版和阴影规范

⚡ **现代化技术栈**
- React 18+ Hooks
- TypeScript 完整类型
- Vite 快速开发和构建
- Less 灵活的样式定制

♿ **无障碍访问**
- 遵循 WAI-ARIA 规范
- 键盘导航支持
- 屏幕阅读器友好
- WCAG 2.1 AA 标准

🎯 **主题定制**
- CSS Variables 动态主题
- ConfigProvider 全局配置
- 暗黑模式支持
- 组件级样式定制

📦 **开箱即用**
- 50+ 高质量组件
- 完整的文档和示例
- Tree Shaking 支持
- 按需加载

## 快速体验

### 本地运行

```bash
# 克隆项目
git clone https://github.com/sgjy123/SoUi.git
cd SoUi

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 核心组件

### 基础组件
- [Button](/components/button) - 按钮
- [FloatButton](/components/float-button) - 悬浮按钮
- [Icon](/components/icon) - 图标
- [Space](/components/space) - 间距
- [Typography](/components/typography) - 排版

### 布局组件
- [Grid](/components/grid) - 栅格布局（Row/Col）
- [Layout](/components/layout) - 布局
- [Tabs](/components/tabs) - 标签页
- [Dropdown](/components/dropdown) - 下拉菜单

### 导航组件
- [Menu](/components/menu) - 导航菜单
- [Breadcrumb](/components/breadcrumb) - 面包屑
- [Anchor](/components/anchor) - 锚点
- [Affix](/components/affix) - 固钉
- [Steps](/components/steps) - 步骤条
- [Tree](/components/tree) - 树形控件

### 数据录入
- [Input](/components/input) - 输入框
- [Select](/components/select) - 选择器
- [Radio](/components/radio) - 单选框
- [Segmented](/components/segmented) - 分段控制器
- [Checkbox](/components/checkbox) - 复选框
- [InputNumber](/components/input-number) - 数字输入框
- [Switch](/components/switch) - 开关
- [Cascader](/components/cascader) - 级联选择
- [TreeSelect](/components/tree-select) - 树选择
- [Rate](/components/rate) - 评分
- [ColorPicker](/components/color-picker) - 颜色选择器
- [DatePicker](/components/date-picker) - 日期选择
- [RangePicker](/components/range-picker) - 日期范围选择
- [TimePicker](/components/time-picker) - 时间选择
- [Transfer](/components/transfer) - 穿梭框
- [Slider](/components/slider) - 滑动输入条
- [Upload](/components/upload) - 上传
- [Form](/components/form) - 表单
- [AutoComplete](/components/auto-complete) - 自动完成
- [Mentions](/components/mentions) - 提及
- [Calendar](/components/calendar) - 日历

### 数据展示
- [Table](/components/table) - 表格
- [Pagination](/components/pagination) - 分页
- [Empty](/components/empty) - 空状态
- [Card](/components/card) - 卡片
- [Tag](/components/tag) - 标签
- [Badge](/components/badge) - 徽标
- [Avatar](/components/avatar) - 头像
- [Statistic](/components/statistic) - 统计数值
- [Timeline](/components/timeline) - 时间轴
- [Carousel](/components/carousel) - 走马灯
- [Descriptions](/components/descriptions) - 描述列表
- [Image](/components/image) - 图片
- [Collapse](/components/collapse) - 折叠面板
- [PopCard](/components/pop-card) - 弹出卡片
- [Waterfall](/components/waterfall) - 瀑布流

### 反馈组件
- [Alert](/components/alert) - 警告提示
- [Message](/components/message) - 全局提示
- [Progress](/components/progress) - 进度条
- [Notification](/components/notification) - 通知提醒
- [Dialog](/components/dialog) - 对话框
- [Drawer](/components/drawer) - 抽屉
- [Loading](/components/loading) - 加载中
- [Skeleton](/components/skeleton) - 骨架屏
- [Result](/components/result) - 结果
- [Popconfirm](/components/popconfirm) - 气泡确认框
- [Tooltip](/components/tooltip) - 文字提示

### 其他组件
- [Divider](/components/divider) - 分割线
- [Watermark](/components/watermark) - 水印
- [GlowBorder](/components/glow-border) - 发光边框
- [Tour](/components/tour) - 漫游式引导
- [InfiniteList](/components/infinite-list) - 无限滚动列表

## 设计理念

### 自然直观

组件的行为符合用户的直觉，减少学习成本。

```tsx
// 清晰的 API 设计
<Button type="primary" loading>
  提交
</Button>
```

### 确定性

一致的设计语言和可预测的交互反馈。

```tsx
// 统一的状态处理
<Button disabled title="权限不足">
  删除
</Button>
```

### 意义感

每个设计决策都有其目的，避免过度设计。

```tsx
// 合理的默认值
<Input placeholder="请输入用户名" />
```

## 技术架构

```
SoUi Architecture
├── Components (组件层)
│   ├── Base Components (基础组件)
│   ├── Layout Components (布局组件)
│   └── Business Components (业务组件)
├── Design System (设计系统)
│   ├── Colors (色彩)
│   ├── Spacing (间距)
│   ├── Typography (排版)
│   └── Shadows (阴影)
├── Theme System (主题系统)
│   ├── CSS Variables (CSS 变量)
│   ├── ConfigProvider (全局配置)
│   └── Algorithms (主题算法)
└── Utils (工具函数)
    ├── ClassNames (类名工具)
    └── Helpers (辅助函数)
```

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | >= 90 |
| Firefox | >= 88 |
| Safari | >= 14 |
| Edge | >= 90 |

## 社区资源

### 官方渠道

- [GitHub](https://github.com/sgjy123/SoUi)
- [NPM](https://www.npmjs.com/package/@soui/ui)
- [问题反馈](https://github.com/sgjy123/SoUi/issues)

### 学习资源

- [快速开始](/guide/quick-start) - 5 分钟上手
- [样式系统](/styles/overview) - 设计基础
- [主题定制](/theming/config-provider) - 自定义主题
- [组件文档](/components/button) - 完整 API

## 贡献指南

我们欢迎各种形式的贡献：

- 💡 提交功能建议
- 🐛 报告 Bug
- 📝 改进文档
- 🎨 分享使用案例
- 🔧 提交 Pull Request

### 开发环境搭建

```bash
# Fork 并克隆项目
git clone https://github.com/sgjy123/SoUi.git
cd SoUi

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

## 版本规范

SoUi 遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- **Major**: 不兼容的变更
- **Minor**: 向后兼容的新功能
- **Patch**: 向后兼容的问题修复

## 许可证

[MIT License](https://opensource.org/licenses/MIT)

## 致谢

SoUi 的设计和实现受到了以下优秀项目的启发：

- [Ant Design](https://ant.design/)
- [Material-UI](https://mui.com/)
- [Chakra UI](https://chakra-ui.com/)

---

**准备好开始了吗？**

[快速开始 →](/guide/quick-start)
