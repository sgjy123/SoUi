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
