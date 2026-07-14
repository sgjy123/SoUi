export const basicCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区' },
];

<Table columns={columns} dataSource={dataSource} />`;

export const sorterCode = `const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区' },
];

<Table columns={columns} dataSource={dataSource} />`;

export const selectionCode = `const [selectedKeys, setSelectedKeys] = useState([]);

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区' },
  { key: '5', name: '孙七', age: 25, address: '杭州市西湖区' },
];

const rowSelection = {
  selectedRowKeys: selectedKeys,
  onChange: (keys) => setSelectedKeys(keys),
};

<div>
  <p style={{ marginBottom: 8 }}>已选择 {selectedKeys.length} 项</p>
  <Table
    columns={columns}
    dataSource={dataSource}
    rowSelection={rowSelection}
  />
</div>`;

export const borderedCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
];

<Table columns={columns} dataSource={dataSource} bordered />`;

export const sizeCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <h4 style={{ marginBottom: 8 }}>小尺寸</h4>
    <Table columns={columns} dataSource={dataSource} size="small" bordered />
  </div>
  <div>
    <h4 style={{ marginBottom: 8 }}>默认尺寸</h4>
    <Table columns={columns} dataSource={dataSource} size="middle" bordered />
  </div>
  <div>
    <h4 style={{ marginBottom: 8 }}>大尺寸</h4>
    <Table columns={columns} dataSource={dataSource} size="large" bordered />
  </div>
</div>`;

export const expandableCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区', description: '软件工程师，5年经验' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区', description: '产品经理，10年经验' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区', description: '前端开发，3年经验' },
];

<Table
  columns={columns}
  dataSource={dataSource}
  expandable={{
    expandedRowRender: (record) => (
      <p style={{ margin: 0 }}>
        <strong>详细信息：</strong>{record.description}
      </p>
    ),
  }}
/>`;

export const paginationCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: String(i + 1),
  name: \`用户\${i + 1}\`,
  age: 20 + (i % 40),
  address: \`地址 \${i + 1} 号\`,
}));

<Table
  columns={columns}
  dataSource={dataSource}
  pagination={{
    pageSize: 10,
    show: true,
  }}
/>`;

export const loadingCode = `const [loading, setLoading] = useState(false);

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

const handleFetchData = () => {
  setLoading(true);
  setTimeout(() => setLoading(false), 2000);
};

<div>
  <Space style={{ marginBottom: 16 }}>
    <Button onClick={handleFetchData} type="primary">
      加载数据
    </Button>
  </Space>
  <Table
    columns={columns}
    dataSource={dataSource}
    loading={loading}
    emptyText="暂无数据"
  />
</div>`;

export const fixedHeaderCode = `const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 100 },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '电话', dataIndex: 'phone', key: 'phone', width: 150 },
  { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区建国路88号', phone: '138****1234', email: 'zhangsan@example.com' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区世纪大道100号', phone: '139****5678', email: 'lisi@example.com' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区珠江新城', phone: '137****9012', email: 'wangwu@example.com' },
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区科技园', phone: '136****3456', email: 'zhaoliu@example.com' },
  { key: '5', name: '孙七', age: 25, address: '杭州市西湖区文三路', phone: '135****7890', email: 'sunqi@example.com' },
];

<Table
  columns={columns}
  dataSource={dataSource}
  scroll={{ x: 800 }}
  bordered
/>`;

export const multiSorterCode = `const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    multiple: 2,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    multiple: 1,
  },
  {
    title: '分数',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
    multiple: 3,
  },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, score: 88, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, score: 92, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, score: 88, address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, score: 95, address: '深圳市南山区' },
];

<Table columns={columns} dataSource={dataSource} />`;

export const filterCode = `const columns = [
  { title: '姓名', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: '年龄', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: '部门',
    dataIndex: 'department',
    filters: [
      { text: '技术部', value: 'tech' },
      { text: '产品部', value: 'product' },
      { text: '设计部', value: 'design' },
    ],
    onFilter: (value, record) => record.department === value,
    filterSearch: true,
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, gender: 'male', department: 'tech' },
  { key: '2', name: '李四', age: 42, gender: 'female', department: 'product' },
  { key: '3', name: '王五', age: 28, gender: 'male', department: 'design' },
];

<Table columns={columns} dataSource={dataSource} />`;

export const customRenderCode = `const statusColors = { active: 'green', inactive: 'red', pending: 'orange' };

const columns = [
  {
    title: '用户', dataIndex: 'name',
    render: (_, record) => (
      <Space>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: record.avatar, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 14,
        }}>
          {record.name[0]}
        </div>
        <span>{record.name}</span>
      </Space>
    ),
  },
  {
    title: '状态', dataIndex: 'status',
    render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
  },
  {
    title: '完成度', dataIndex: 'progress',
    render: (val) => <Progress percent={val} size="small" />,
  },
  {
    title: '操作',
    render: () => (
      <Space>
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    ),
  },
];

<Table columns={columns} dataSource={dataSource} />`;

export const fixedColumnCode = `const columns = [
  { title: '姓名', dataIndex: 'name', width: 120, fixed: 'left' },
  { title: '年龄', dataIndex: 'age', width: 80 },
  { title: '部门', dataIndex: 'department', width: 120 },
  { title: '职位', dataIndex: 'position', width: 150 },
  { title: '薪资', dataIndex: 'salary', width: 120,
    render: (v) => \`¥\${v.toLocaleString()}\` },
  { title: '操作', width: 150, fixed: 'right',
    render: () => <Space>
      <Button type="link" size="small">查看</Button>
      <Button type="link" size="small">编辑</Button>
    </Space>,
  },
];

<Table columns={columns} dataSource={dataSource} scroll={{ x: 1100 }} bordered />`;

export const colSpanCode = `const getRowSpan = (data, field, index) => {
  const current = data[index][field];
  if (index > 0 && data[index - 1][field] === current) return 0;
  let count = 1;
  for (let i = index + 1; i < data.length; i++) {
    if (data[i][field] === current) count++;
    else break;
  }
  return count;
};

const columns = [
  {
    title: '姓名', dataIndex: 'name',
    onCell: (_, index) => ({ rowSpan: getRowSpan(dataSource, 'name', index) }),
  },
  { title: '区域', dataIndex: 'district' },
  { title: '电话', dataIndex: 'phone' },
];

<Table columns={columns} dataSource={dataSource} bordered />`;

export const summaryCode = `<Table
  columns={columns}
  dataSource={dataSource}
  bordered
  summary={() => (
    <tr className="soui-table-tr" style={{ fontWeight: 600 }}>
      <td colSpan={2} className="soui-table-td" style={{ textAlign: 'right' }}>合计</td>
      <td className="soui-table-td" style={{ textAlign: 'right' }}>{totalQty}</td>
      <td className="soui-table-td" style={{ textAlign: 'right' }}>{totalAmount}</td>
    </tr>
  )}
/>`;

export const stripedCode = `const [data, setData] = useState(fullData);

<Table
  columns={columns}
  dataSource={data}
  striped
  bordered
  emptyText={<Empty description="暂无数据" />}
/>`;

export const selectionActionCode = `const [selectedKeys, setSelectedKeys] = useState([]);
const rowSelection = {
  selectedRowKeys: selectedKeys,
  onChange: (keys) => setSelectedKeys(keys),
  getCheckboxProps: (record) => ({ disabled: record.status === '离职' }),
};

{selectedKeys.length > 0 && (
  <Space style={{ marginBottom: 16, padding: '8px 16px', background: '#e6f4ff' }}>
    <span>已选择 {selectedKeys.length} 项</span>
    <Button size="small" type="primary">批量导出</Button>
    <Button size="small" danger>批量删除</Button>
  </Space>
)}

<Table columns={columns} dataSource={data} rowSelection={rowSelection} bordered />`;

export const serverDataCode = `const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const loadData = async (page, pageSize, sort, filters) => {
  setLoading(true);
  const result = await fetchData({ page, pageSize, ...sort, filters });
  setData(result.data);
  setLoading(false);
};

<Table
  columns={columns}
  dataSource={data}
  loading={loading}
  pagination={{ current: pagination.current, total: pagination.total }}
  onChange={(pag, sorter) => loadData(pag.current, pag.pageSize, sorter)}
  bordered
/>`;

export const dynamicCode = `const [columnConfig, setColumnConfig] = useState(allColumns);
const visibleColumns = columnConfig.filter(c => c.visible);

<Space style={{ marginBottom: 16 }}>
  {columnConfig.map(col => (
    <Checkbox
      key={col.key}
      checked={col.visible}
      onChange={() => setColumnConfig(prev =>
        prev.map(c => c.key === col.key ? { ...c, visible: !c.visible } : c)
      )}
    >
      {col.title}
    </Checkbox>
  ))}
</Space>

<Table columns={visibleColumns} dataSource={dataSource} bordered />`;
