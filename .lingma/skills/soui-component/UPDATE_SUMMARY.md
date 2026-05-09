# soui-component Skill 更新总结

## 最新更新
**更新时间**: 2026-05-08  
**更新内容**: 添加三层设计令牌系统规范

### 更新原因
根据 Tooltip 组件主题化改造的经验，发现需要明确 CSS 变量的分层设计原则，避免变量命名混乱和重复定义。

### 主要更新内容

#### 1. SKILL.md 更新 - 三层设计令牌系统

##### **新增：步骤 0.5 中的设计令牌系统详解**

在“查看设计变量”部分，新增了完整的三层设计令牌系统说明：

**第1层 - 设计令牌 (Design Tokens)**
- 真正的全局变量，不带组件前缀
- 可被多个组件复用
- 示例：`--soui-color-bg-default`, `--soui-font-size-sm`

**第2层 - 组件配置点 (Component Configuration Points)**
- 引用设计令牌的配置接口
- 带组件前缀，允许通过 ConfigProvider 统一修改
- 示例：`--soui-tooltip-bg-color: var(--soui-color-bg-default)`

**第3层 - 组件级覆盖 (Component-Level Override)**
- 通过 `components.Tooltip` 自定义
- 添加 `-component` 后缀，优先级最高
- 示例：`--soui-tooltip-font-size-component`

##### **更新：CSS 变量命名规范**

从简单的命名规则升级为分层命名策略：

```less
/* 第1层 - 设计令牌（不带组件前缀） */
--soui-color-bg-default
--soui-font-size-sm

/* 第2层 - 组件配置点（带组件前缀） */
--soui-tooltip-bg-color
--soui-button-color-primary

/* 第3层 - 组件级覆盖（带-component后缀） */
--soui-tooltip-color-bg-default-component
```

**命名原则:**
- ✅ 能通用的变量 → 不带组件前缀，作为设计令牌
- ✅ 不能通用的变量 → 带组件前缀，作为组件配置点
- ✅ 组件级覆盖 → 添加 `-component` 后缀

##### **更新：主题集成完整流程示例**

提供了基于三层设计的完整代码示例：

```tsx
// ConfigProvider/index.tsx - 生成三层CSS变量
const componentStyle = {
  // 第1层: 设计令牌
  '--soui-color-bg-default': globalTheme?.tooltipBgColor,
  
  // 第2层: 组件配置点
  '--soui-component-bg-color': componentTheme?.colorBgDefault || globalTheme?.tooltipBgColor,
  
  // 第3层: 组件级覆盖
  '--soui-component-bg-color-component': componentTheme?.colorBgDefault,
};
```

```less
// style.less - 三层回退机制
.soui-component {
  // 第1层: 引用全局设计令牌
  --soui-color-bg-default: var(--soui-color-bg-default, @bg-color-base);
  
  // 第2层: 组件配置点（引用设计令牌）
  --soui-component-bg-color: var(--soui-color-bg-default);
  
  // 实际样式使用（三层回退）
  background: var(--soui-component-bg-color-component, var(--soui-component-bg-color));
}
```

##### **新增：设计变量参考章节**

在文档末尾添加了“三层设计令牌系统”说明，指导新组件开发时如何正确应用分层设计。

##### **更新：检查清单**

在主题集成检查项中，新增了三层设计令牌系统的验证：

```markdown
- [ ] **使用三层设计令牌系统**（重要！）
  - [ ] 第1层：定义全局设计令牌（不带组件前缀）
  - [ ] 第2层：组件配置点引用设计令牌
  - [ ] 第3层：组件级覆盖添加 `-component` 后缀
```

##### **更新：样式设计最佳实践**

强调遵循三层设计令牌系统的重要性：

```markdown
2. **遵循三层设计令牌系统**（重要！）
   - 能通用的变量 → 定义为第1层设计令牌（不带组件前缀）
   - 组件专属变量 → 定义为第2层配置点（带组件前缀）
   - 用户可覆盖的变量 → 生成第3层覆盖变量（带 `-component` 后缀）
```

---

## 之前更新
2026-05-07

## 更新原因
根据实际开发经验，发现创建组件时需要先查看主题样式和现有组件实现，以确保新组件与 SoUi 的主题系统良好集成。

## 主要更新内容

### 1. SKILL.md 更新

#### 新增步骤 0.5: 查看主题样式和现有组件（重要！）

在"步骤 0: 确定参考框架"之后，新增了详细的主题样式查看指南：

**包含内容：**
1. **查看全局主题配置**
   - `src/components/ConfigProvider/types.ts` - 主题配置类型定义
   - `src/components/ConfigProvider/index.tsx` - ConfigProvider 实现
   - `src/styles/global.less` - 全局样式和 CSS 变量

2. **查看设计变量**
   - `src/styles/variables.less` - 所有可用的 Less 变量
   - 颜色、尺寸、间距、过渡等变量的详细说明

3. **查看现有组件实现**
   - 基础组件参考：Button、Icon、Space
   - 复杂组件参考：Typography、Tooltip
   - 重点关注：主题变量应用模式、CSS 变量命名规范、样式优先级规则、组件结构设计

4. **主题集成检查清单**
   - 必须支持的配置项列表
   - 样式实现要求
   - TypeScript 类型定义要求
   - 完整的主题集成代码示例

#### 更新检查清单

在原有的检查清单基础上，新增了以下检查项：

```markdown
- [ ] **在编写代码前已查看主题样式和现有组件实现**（重要！）
  - [ ] 已阅读 `ConfigProvider/types.ts` 了解主题配置类型
  - [ ] 已阅读 `ConfigProvider/index.tsx` 了解主题实现方式
  - [ ] 已阅读 `styles/variables.less` 了解可用的设计变量
  - [ ] 已参考 2-3 个相似的现有组件实现
- [ ] **主题集成已完成**（重要！）
  - [ ] 支持圆角配置（borderRadius）
  - [ ] 支持字体大小配置（fontSize）
  - [ ] 支持主色配置（colorPrimary / primaryColor）
  - [ ] 使用 CSS 变量而非硬编码颜色值
  - [ ] 正确处理配置优先级（组件级 > 全局 > CSS 默认 > Less 默认）
  - [ ] 在 style.less 中使用 `var()` 函数引用 CSS 变量
  - [ ] 在 `ConfigProvider/types.ts` 中添加了组件级配置类型
```

### 2. QUICK_REFERENCE.md 更新

#### 重构重要提醒部分

将原来的单一提醒拆分为两个明确的步骤：

**步骤 1: 询问参考框架**
- 保持原有的询问流程
- 明确如果选择参考框架的注意事项

**步骤 2: 查看主题样式和现有组件（新增）**
- 必读文件清单（4个关键文件）
- 必参组件清单（4个典型组件）
- 主题集成要点代码示例

#### 新增关键规范速查 0.5

在原有的"0. 参考框架"之后，新增：

```markdown
### 0.5. 主题集成（重要！）
- **查看主题配置**：阅读 `ConfigProvider/types.ts` 和 `index.tsx`
- **查看设计变量**：阅读 `styles/variables.less`
- **参考现有组件**：选择 2-3 个相似组件学习实现模式
- **支持配置项**：borderRadius、fontSize、colorPrimary、controlHeight
- **使用 CSS 变量**：避免硬编码颜色值，使用 `var()` 函数
- **优先级规则**：组件级 > 全局 > CSS 默认 > Less 默认
```

### 3. EXAMPLE.md 更新

#### 新增"主题样式查看"章节

在"参考框架选择"之后，新增详细的主题样式查看过程记录：

```markdown
### 主题样式查看

在开始编写代码前，我们查看了以下内容：

#### 1. 查看主题配置
- 阅读 `ConfigProvider/types.ts` 了解可用的主题配置项
- 阅读 `ConfigProvider/index.tsx` 了解 useTheme 和 useComponentTheme hooks

#### 2. 查看设计变量
- 阅读 `styles/variables.less` 了解所有可用的 Less 变量
- 记录需要用到的颜色、尺寸、间距等变量

#### 3. 参考现有组件
- **Button 组件** - 学习主题变量的应用模式
- **Typography 不需要复杂的主题配置**，主要使用全局主题色

#### 4. 主题集成决策
由于 Typography 是展示型组件，决定：
- 使用全局主题色（primaryColor、successColor 等）
- 支持 fontSize 配置
- 不使用组件级特殊配置
```

#### 更新经验总结

在"成功经验"部分新增：
- 第2条：**查看主题样式**：在编写代码前，必须查看主题配置和设计变量
- 第3条：**参考现有组件**：选择 2-3 个相似组件学习实现模式
- 第9条：**主题集成**：确保组件支持全局和组件级主题配置

新增"关于主题集成的经验"章节：
```markdown
### 关于主题集成的经验
- **必须先查看**：ConfigProvider 的类型定义和实现方式
- **使用 CSS 变量**：避免硬编码颜色值，使用 `var()` 函数
- **优先级规则**：组件级配置 > 全局配置 > CSS 默认值 > Less 默认值
- **完整支持**：borderRadius、fontSize、colorPrimary、controlHeight 等常用配置
- **类型定义**：在 ConfigProvider/types.ts 中添加组件级配置类型
```

#### 更新复用指南

将原来的9步扩展为12步，新增：
- 第2步：**第二步：查看主题样式**
- 第3步：**第三步：参考现有组件**
- 第4步：**第四步：主题集成设计**
- 第12步：**主题要测试**：验证全局和组件级主题配置都能正常工作

## 更新效果

通过这次更新，soui-component Skill 现在能够：

1. ✅ **强制开发者在编写代码前查看主题系统**，避免硬编码样式
2. ✅ **提供完整的主题集成指南**，包括代码示例和检查清单
3. ✅ **强调参考现有组件的重要性**，保持项目一致性
4. ✅ **明确主题配置的优先级规则**，减少配置冲突
5. ✅ **提供实用的主题集成代码模板**，加快开发速度

## 后续建议

1. 可以考虑添加一个主题集成的视频教程或截图说明
2. 可以创建一个主题集成的单元测试模板
3. 可以添加常见主题集成问题的 FAQ
4. 可以提供一个主题配置的检查工具脚本

## 相关文件

- `.lingma/skills/soui-component/SKILL.md` - 主技能文档
- `.lingma/skills/soui-component/QUICK_REFERENCE.md` - 快速参考
- `.lingma/skills/soui-component/EXAMPLE.md` - 示例文档
- `.lingma/skills/soui-component/UPDATE_SUMMARY.md` - 本更新总结
