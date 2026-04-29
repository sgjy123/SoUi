# 📚 SoUi 文档系统

## 🎉 建设完成！

SoUi 组件库的文档系统已经搭建完成，采用 **VitePress** 作为文档生成框架。

---

## 🚀 快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run docs:dev

# 3. 访问 http://localhost:5173
```

详细步骤请查看 **[START.md](START.md)**

---

## 📋 文档导航

| 文档 | 说明 | 链接 |
|------|------|------|
| 🚀 **快速启动** | 从这里开始 | [START.md](START.md) |
| 📖 **使用指南** | 完整文档系统说明 | [GUIDE.md](src/docs/GUIDE.md) |
| 📊 **项目总结** | 建设成果和计划 | [SUMMARY.md](src/docs/SUMMARY.md) |
| 🗺️ **项目结构** | 完整目录树 | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |

---

## ✅ 已完成内容

### 📖 核心文档（9 篇）

#### 指南系列
- ✅ SoUi 介绍
- ✅ 快速开始
- ✅ 安装指南

#### 样式系列
- ✅ 设计基础概览
- ✅ 色彩系统（完整）
- ✅ 间距系统（完整）

#### 主题系列
- ✅ ConfigProvider（完整 API）

#### 组件系列
- ✅ Button（完整示例）

#### 资源系列
- ✅ 更新日志

### ⚙️ 配置完成

- ✅ VitePress 配置
- ✅ 主题定制
- ✅ 导航栏和侧边栏
- ✅ 搜索功能
- ✅ 暗黑模式

### 🎨 技术栈

- ✅ VitePress 1.0+
- ✅ React 18+
- ✅ TypeScript
- ✅ Less

---

## 📂 文档位置

所有文档位于：
```
SoUi/src/docs/
```

主要文件：
```
docs/
├── GUIDE.md           # 使用指南
├── SUMMARY.md         # 总结文档
├── guide/             # 新手指南
├── styles/            # 样式系统
├── theming/           # 主题定制
├── components/        # 组件文档
└── resources/         # 资源文档
```

---

## 🛠️ 可用命令

```bash
# 开发
npm run docs:dev      # 启动开发服务器

# 构建
npm run docs:build    # 构建生产版本
npm run docs:preview  # 预览构建结果
```

---

## 📊 下一步计划

### 短期（1-2 周）
- [ ] 完善其他组件文档（Input, Card, Modal...）
- [ ] 添加交互式组件示例
- [ ] 优化移动端体验

### 中期（2-4 周）
- [ ] 代码沙箱集成
- [ ] SEO 优化
- [ ] 多语言支持

### 长期（1-2 月）
- [ ] Playground 在线编辑
- [ ] 主题可视化生成器
- [ ] PWA 支持

---

## 💡 如何贡献

### 添加新组件文档

1. 在 `docs/components/` 创建文件
2. 参考 `button.md` 的格式
3. 在 `config.ts` 中添加路由

### 修改现有文档

直接编辑对应的 `.md` 文件，保存后自动热更新。

### 自定义样式

编辑 `.vitepress/theme/styles/custom.css`

---

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Ant Design](https://ant.design/)
- [Material-UI](https://mui.com/)

---

## 📞 获取帮助

1. 查看 [GUIDE.md](src/docs/GUIDE.md) - 详细使用指南
2. 查看 [SUMMARY.md](src/docs/SUMMARY.md) - 完整总结
3. 查看 [START.md](START.md) - 快速启动指南

---

## 🎯 立即开始

```bash
npm run docs:dev
```

然后打开浏览器访问 **http://localhost:5173**

**祝您使用愉快！** ✨

---

*最后更新：2024-03-19*  
*维护团队：SoUi Team*
