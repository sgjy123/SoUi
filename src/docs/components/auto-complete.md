---
title: AutoComplete 自动完成
---

# AutoComplete 自动完成

输入建议，根据输入内容自动匹配选项。

## 何时使用

- 需要根据输入内容给出建议选项
- 搜索框、邮箱补全、城市选择等场景

## 代码示例

### 基础用法

<code src="../../examples/AutoComplete/Basic.tsx"></code>

### 本地过滤

<code src="../../examples/AutoComplete/Filter.tsx"></code>

### 尺寸与状态

<code src="../../examples/AutoComplete/SizeStatus.tsx"></code>

### Form 表单集成

<code src="../../examples/AutoComplete/Form.tsx"></code>

## API

### AutoComplete

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | string | - |
| defaultValue | 默认值 | string | `''` |
| options | 选项数据 | `(AutoCompleteOption \| string)[]` | `[]` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSelect | 选中选项回调 | `(value: string, option: AutoCompleteOption) => void` | - |
| onSearch | 搜索回调 | `(value: string) => void` | - |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` | - |
| onFocus | 聚焦回调 | `(e: FocusEvent) => void` | - |
| placeholder | 占位符 | string | - |
| disabled | 是否禁用 | boolean | `false` |
| allowClear | 允许清空 | boolean | `false` |
| filterOption | 是否本地过滤 | boolean \| `((input, option) => boolean)` | `true` |
| dropdownRender | 自定义下拉面板 | `(menu: ReactNode) => ReactNode` | - |
| notFoundContent | 空状态内容 | ReactNode | `'暂无数据'` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| prefix | 前缀图标 | ReactNode | - |

### AutoCompleteOption

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | string |
| label | 选项标签 | ReactNode |
| disabled | 是否禁用 | boolean |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.AutoComplete` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色 | string | `'#1677ff'` |
| borderRadius | 圆角（像素） | number | `6` |
| fontSize | 字体大小（像素） | number | `14` |
| dropdownBg | 下拉面板背景色 | string | `'#fff'` |
