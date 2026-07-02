export const basicCode = `const [targetKeys, setTargetKeys] = useState(['3', '4', '5']);
const [selectedKeys, setSelectedKeys] = useState([]);

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: \`内容 \${i + 1}\`,
  description: \`这是第 \${i + 1} 项的描述\`,
  disabled: i % 6 === 0,
}));

const onChange = (nextTargetKeys, direction, moveKeys) => {
  setTargetKeys(nextTargetKeys);
};

const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
};

<Transfer
  dataSource={mockData}
  titles={['待选项', '已选项']}
  targetKeys={targetKeys}
  selectedKeys={selectedKeys}
  onChange={onChange}
  onSelectChange={onSelectChange}
  render={(item) => item.title}
/>`;

export const searchCode = `const [targetKeys, setTargetKeys] = useState(['5', '6', '7']);
const [selectedKeys, setSelectedKeys] = useState([]);

const mockData = Array.from({ length: 30 }).map((_, i) => ({
  key: i.toString(),
  title: \`项目 \${i + 1}\`,
  description: \`项目 \${i + 1} 的详细描述信息\`,
  disabled: i % 7 === 0,
}));

const filterOption = (inputValue, item) => {
  return item.title.includes(inputValue) || item.description.includes(inputValue);
};

<Transfer
  dataSource={mockData}
  titles={['待选项', '已选项']}
  targetKeys={targetKeys}
  selectedKeys={selectedKeys}
  onChange={(keys) => setTargetKeys(keys)}
  onSelectChange={(src, tgt) => setSelectedKeys([...src, ...tgt])}
  showSearch
  filterOption={filterOption}
  render={(item) => \`\${item.title} - \${item.description}\`}
/>`;

export const oneWayCode = `const [targetKeys, setTargetKeys] = useState(['2', '3']);
const [selectedKeys, setSelectedKeys] = useState([]);

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: i.toString(),
  title: \`功能 \${i + 1}\`,
  description: \`功能 \${i + 1} 的说明\`,
  disabled: i === 0,
}));

<Transfer
  dataSource={mockData}
  titles={['可选功能', '已选功能']}
  targetKeys={targetKeys}
  selectedKeys={selectedKeys}
  onChange={(keys) => setTargetKeys(keys)}
  onSelectChange={(src, tgt) => setSelectedKeys([...src, ...tgt])}
  oneWay
  render={(item) => item.title}
/>`;

export const customRenderCode = `const [targetKeys, setTargetKeys] = useState(['1', '2']);
const [selectedKeys, setSelectedKeys] = useState([]);

const mockData = Array.from({ length: 12 }).map((_, i) => ({
  key: i.toString(),
  title: \`用户 \${i + 1}\`,
  description: ['管理员', '编辑者', '观察者', '访客'][i % 4],
  disabled: i === 0,
}));

const render = (item) => ({
  label: (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: \`hsl(\${(parseInt(item.key) * 47) % 360}, 60%, 70%)\`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 12, fontWeight: 600, flexShrink: 0,
      }}>
        {item.title.slice(-1)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500 }}>{item.title}</div>
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{item.description}</div>
      </div>
    </div>
  ),
  value: item.title,
});

<Transfer
  dataSource={mockData}
  titles={['待分配', '已分配']}
  targetKeys={targetKeys}
  selectedKeys={selectedKeys}
  onChange={(keys) => setTargetKeys(keys)}
  onSelectChange={(src, tgt) => setSelectedKeys([...src, ...tgt])}
  showSearch
  render={render}
  listStyle={{ width: 280, height: 360 }}
/>`;

export const themeConfigCode = `<ConfigProvider
  theme={{
    primaryColor: '#722ed1',
    primaryHoverColor: '#9254de',
    components: {
      Transfer: {
        borderRadius: 8,
        colorPrimary: '#722ed1',
        colorPrimaryHover: '#9254de',
        headerBg: '#f9f0ff',
        itemActiveBg: 'rgba(114, 46, 209, 0.08)',
      },
    },
  }}
>
  <Transfer
    dataSource={mockData}
    titles={['紫色主题 - 源', '紫色主题 - 目标']}
    targetKeys={targetKeys}
    selectedKeys={selectedKeys}
    onChange={(keys) => setTargetKeys(keys)}
    onSelectChange={(src, tgt) => setSelectedKeys([...src, ...tgt])}
    showSearch
    render={(item) => item.title}
  />
</ConfigProvider>

<ConfigProvider
  theme={{
    primaryColor: '#13c2c2',
    primaryHoverColor: '#36cfc9',
    components: {
      Transfer: {
        borderRadius: 10,
        colorPrimary: '#13c2c2',
        colorPrimaryHover: '#36cfc9',
        headerBg: '#e6fffb',
        itemActiveBg: 'rgba(19, 194, 194, 0.08)',
      },
    },
  }}
>
  <Transfer
    dataSource={mockData}
    titles={['青色主题 - 源', '青色主题 - 目标']}
    targetKeys={targetKeys}
    selectedKeys={selectedKeys}
    onChange={(keys) => setTargetKeys(keys)}
    onSelectChange={(src, tgt) => setSelectedKeys([...src, ...tgt])}
    render={(item) => item.title}
  />
</ConfigProvider>`;
