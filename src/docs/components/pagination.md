# Pagination 分页

采用分页的形式，分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时
- 可手动切换页码浏览数据

## 代码演示

### 基础用法

最基本的分页组件。

```tsx
import { Pagination } from '@soui/ui';

export default () => (
  <Pagination total={100} />
);
```

### 更多功能

切换每页条数、快速跳转、显示数据总量。

```tsx
import { Pagination } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Pagination
      total={500}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
    />
    <Pagination
      total={500}
      showSizeChanger
      pageSizeOptions={[5, 10, 20, 50]}
      showTotal={(total) => `共 ${total} 条`}
    />
  </div>
);
```

### 尺寸与简洁模式

支持默认和小尺寸，以及简洁模式。

```tsx
import { Pagination } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Pagination total={100} />
    <Pagination total={100} size="small" />
    <Pagination total={100} simple />
  </div>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前页码 | `number` | - |
| defaultCurrent | 默认当前页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | - |
| defaultPageSize | 默认每页条数 | `number` | `10` |
| total | 数据总数 | `number` | `0` |
| onChange | 页码或 pageSize 改变的回调 | `(page, pageSize) => void` | - |
| onShowSizeChange | pageSize 改变的回调 | `(current, size) => void` | - |
| showSizeChanger | 是否显示 pageSize 切换器 | `boolean` | `false` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showQuickJumper | 是否显示快速跳转 | `boolean` | `false` |
| showTotal | 用于显示数据总量的回调 | `(total, range) => ReactNode` | - |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| simple | 简洁模式 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnSinglePage | 只有一页时是否隐藏 | `boolean` | `false` |

## 主题定制

Pagination 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Pagination` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Pagination: {
        borderRadius: 6,
        fontSize: 14,
        itemBg: '#fff',
        colorPrimary: '#1677ff',
        borderColor: '#d9d9d9',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| itemBg | 页码项背景色 | `string` | `#fff` |
| colorPrimary | 主色（未设置时跟随全局主题 `primaryColor`） | `string` | `#1677ff` |
| borderColor | 边框颜色 | `string` | `#d9d9d9` |

## 无障碍访问

- 所有按钮具有 `aria-label` 属性
- 当前页使用 `aria-current="page"` 标记
- 省略号按钮支持点击跳转 5 页

## FAQ

### 如何与 Table 集成？

Table 组件内置了分页功能，通过 `pagination` 属性配置。也可以单独使用 Pagination 组件控制外部数据分页。

### 如何自定义页码按钮？

Pagination 暂不支持自定义渲染页码按钮，但可以通过 `showTotal` 回调自定义总数展示区域。
