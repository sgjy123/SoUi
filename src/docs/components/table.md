# Table 表格

表格用于展示结构化数据，支持排序、筛选、分页等功能。

## 何时使用

- 需要展示大量结构化数据时
- 需要对数据进行排序、筛选等操作时
- 需要对表格数据进行行选择时
- 需要展示可展开的详细信息时

## 代码演示

### 基础用法

最基本的表格用法，通过 `columns` 定义列配置，`dataSource` 传入数据源。

```tsx
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
];

<Table columns={columns} dataSource={dataSource} />
```

### 排序

为列添加 `sorter` 属性即可启用排序功能。点击表头可在升序、降序、取消之间切换。

```tsx
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  { title: '地址', dataIndex: 'address' },
];

<Table columns={columns} dataSource={dataSource} />
```

### 行选择

通过 `rowSelection` 配置行选择功能，支持 checkbox 和 radio 两种模式。

```tsx
const [selectedKeys, setSelectedKeys] = useState([]);

const rowSelection = {
  selectedRowKeys: selectedKeys,
  onChange: (keys) => setSelectedKeys(keys),
};

<Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} />
```

### 带边框

设置 `bordered` 属性显示带边框的表格。

```tsx
<Table columns={columns} dataSource={dataSource} bordered />
```

### 尺寸

通过 `size` 属性设置表格尺寸，支持 `small`、`middle`、`large` 三种尺寸。

```tsx
<Table columns={columns} dataSource={dataSource} size="small" bordered />
<Table columns={columns} dataSource={dataSource} size="middle" bordered />
<Table columns={columns} dataSource={dataSource} size="large" bordered />
```

### 展开行

通过 `expandable` 配置可展开的行，展示额外的详细信息。

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  expandable={{
    expandedRowRender: (record) => (
      <p>详细信息：{record.description}</p>
    ),
  }}
/>
```

### 分页

通过 `pagination` 配置分页功能。

```tsx
<Table
  columns={columns}
  dataSource={largeDataSource}
  pagination={{ pageSize: 10, show: true }}
/>
```

### 加载中

设置 `loading` 属性显示加载状态。

```tsx
<Table columns={columns} dataSource={dataSource} loading />
```

### 固定表头与滚动

通过 `scroll` 属性设置表格的滚动区域，支持横向和纵向滚动。

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  scroll={{ x: 800 }}
  bordered
/>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| columns | 列配置 | `ColumnType[]` | `[]` | - |
| dataSource | 数据源 | `RecordType[]` | `[]` | - |
| rowKey | 行 key 字段 | `string \| ((record) => string \| number)` | `'key'` | - |
| size | 表格尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` | - |
| bordered | 是否显示边框 | `boolean` | `false` | - |
| showHeader | 是否显示表头 | `boolean` | `true` | - |
| striped | 是否显示斑马纹 | `boolean` | `false` | - |
| loading | 是否加载中 | `boolean` | `false` | - |
| emptyText | 空数据展示 | `ReactNode` | `'暂无数据'` | - |
| scroll | 滚动配置 | `{ x?: number \| string; y?: number \| string }` | - | - |
| pagination | 分页配置，设为 `false` 禁用 | `PaginationConfig \| false` | - | - |
| rowSelection | 行选择配置 | `RowSelectionConfig` | - | - |
| expandable | 展开行配置 | `ExpandableConfig` | - | - |
| title | 表格标题 | `(data) => ReactNode` | - | - |
| footer | 表格底部 | `(data) => ReactNode` | - | - |
| summary | 表格总结栏 | `(data) => ReactNode` | - | - |
| onRow | 行事件 | `(record, index) => HTMLAttributes` | - | - |
| onChange | 排序/分页变化回调 | `(pagination, sorter) => void` | - | - |

### ColumnType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 列头显示文字 | `ReactNode` | - | - |
| dataIndex | 数据索引 | `string` | - | - |
| key | 列 key | `string` | - | - |
| width | 列宽度 | `number \| string` | - | - |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | - | - |
| fixed | 是否固定列 | `'left' \| 'right' \| boolean` | - | - |
| sorter | 排序函数 | `((a, b) => number) \| boolean` | - | - |
| render | 自定义渲染 | `(text, record, index) => ReactNode` | - | - |
| ellipsis | 是否省略溢出内容 | `boolean` | `false` | - |
| children | 子列（分组表头） | `ColumnType[]` | - | - |
| className | 列自定义类名 | `string` | - | - |
| onCell | 单元格属性 | `(record, index) => TdHTMLAttributes` | - | - |
| onHeaderCell | 表头单元格属性 | `(column) => ThHTMLAttributes` | - | - |

### PaginationConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| current | 当前页码 | `number` | `1` | - |
| pageSize | 每页条数 | `number` | `10` | - |
| total | 总条数 | `number` | - | - |
| show | 是否显示分页 | `boolean` | `true` | - |
| onChange | 页码改变回调 | `(page, pageSize) => void` | - | - |

### RowSelectionConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| selectedRowKeys | 选中的行 keys | `(string \| number)[]` | - | - |
| onChange | 选中改变回调 | `(keys, rows) => void` | - | - |
| type | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` | - |
| columnWidth | 选择列宽度 | `number` | `48` | - |
| columnTitle | 选择列标题 | `ReactNode` | - | - |
| fixed | 固定选择列 | `boolean` | - | - |
| getCheckboxProps | 获取复选框属性 | `(record) => { disabled?: boolean }` | - | - |

### ExpandableConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| expandedRowKeys | 展开的行 keys | `(string \| number)[]` | - | - |
| onExpandedRowsChange | 展开改变回调 | `(keys) => void` | - | - |
| expandedRowRender | 自定义展开渲染 | `(record, index) => ReactNode` | - | - |
| rowExpandable | 是否可展开 | `(record) => boolean` | - | - |
| columnWidth | 展开列宽度 | `number` | `48` | - |

## 主题定制

Table 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Table` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Table: {
        borderRadius: 8,
        fontSize: 14,
        headerBg: '#f0f2f5',
        headerColor: 'rgba(0, 0, 0, 0.88)',
        rowHoverBg: '#f5f5f5',
        borderColor: '#f0f0f0',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Table` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| headerBg | 表头背景色 | `string` | `#fafafa` |
| headerColor | 表头文字颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| rowHoverBg | 行悬停背景色 | `string` | `#f5f5f5` |
| borderColor | 边框颜色 | `string` | `#f0f0f0` |
| stripeBg | 斑马纹背景色 | `string` | `#fafafa` |
| selectedRowBg | 选中行背景色 | `string` | `#e6f4ff` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Table
  style={{
    '--soui-table-border-radius': '10px',
    '--soui-table-header-bg': '#f0f2f5',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 为每行数据提供唯一 key
const dataSource = data.map(item => ({ ...item, key: item.id }));

// 使用 rowKey 指定唯一字段
<Table columns={columns} dataSource={dataSource} rowKey="id" />

// 大数据量时启用分页
<Table columns={columns} dataSource={largeData} pagination={{ pageSize: 20 }} />
```

### ❌ 避免使用

```tsx
// 避免不提供 key 导致性能问题
<Table columns={columns} dataSource={dataWithoutKey} />

// 避免在 render 中每次创建新的 columns 引用
const columns = [{ title: 'Name', dataIndex: 'name' }]; // 每次 render 都是新数组
// 应使用 useMemo 或将 columns 提取到组件外部
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 表格使用语义化的 `<table>`、`<thead>`、`<tbody>` 标签
- 选择框提供 `aria-label` 描述
- 展开按钮提供 `role="button"` 和 `aria-label`
- 分页按钮支持键盘操作和禁用状态
- 排序列支持点击交互

## FAQ

### 如何自定义列的渲染内容？

使用 `columns` 中的 `render` 属性：

```tsx
const columns = [
  {
    title: '操作',
    dataIndex: 'action',
    render: (_, record) => (
      <Space>
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    ),
  },
];
```

### 如何实现服务端排序？

使用 `onChange` 回调获取排序信息，然后请求服务端数据：

```tsx
<Table
  columns={columns}
  dataSource={data}
  onChange={(pagination, sorter) => {
    fetchData({ sortField: sorter.field, sortOrder: sorter.order });
  }}
/>
```

### 如何固定表头？

使用 `scroll` 属性设置 `y` 值：

```tsx
<Table columns={columns} dataSource={data} scroll={{ y: 400 }} />
```

## 相关资源

- [ConfigProvider 主题定制](/theming/config-provider)
- [Space 间距](/components/space)
- [Button 按钮](/components/button)
