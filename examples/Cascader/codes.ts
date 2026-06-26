export const basicCode = `const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
          { value: 'gulou', label: '鼓楼区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
        ],
      },
    ],
  },
];

const [value, setValue] = useState(['zhejiang', 'hangzhou', 'xihu']);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
    <Cascader options={options} placeholder="请选择地址" onChange={(val) => setValue(val)} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
    <Cascader options={options} value={value} onChange={(val) => setValue(val)} placeholder="请选择地址" />
    <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选: {value.join(' / ')}</p>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认值</p>
    <Cascader options={options} defaultValue={['jiangsu', 'nanjing', 'xuanwu']} placeholder="请选择地址" />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
    <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'binjiang']} disabled placeholder="请选择地址" />
  </div>
</div>`;

export const changeOnSelectCode = `const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      { value: 'ningbo', label: '宁波', children: [{ value: 'haishu', label: '海曙区' }] },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
    ],
  },
];

const [value1, setValue1] = useState([]);
const [value2, setValue2] = useState(['zhejiang', 'hangzhou']);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>选择即改变（可选父级）</p>
    <Cascader options={options} changeOnSelect value={value1} onChange={(val) => setValue1(val)} placeholder="请选择（可点击任意层级）" />
    <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选: {value1.join(' / ') || '无'}</p>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义显示渲染</p>
    <Cascader options={options} value={value2} onChange={(val) => setValue2(val)} displayRender={(labels) => labels.join(' > ')} placeholder="请选择地址" />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>悬停展开</p>
    <Cascader options={options} expandTrigger="hover" placeholder="鼠标悬停展开子级" />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>不同尺寸</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Cascader options={options} size="small" placeholder="小号" />
      <Cascader options={options} size="middle" placeholder="中号（默认）" />
      <Cascader options={options} size="large" placeholder="大号" />
    </div>
  </div>
</div>`;

export const searchableCode = `const options = [
  {
    value: 'zhejiang', label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }, { value: 'binjiang', label: '滨江区' }] },
      { value: 'ningbo', label: '宁波', children: [{ value: 'haishu', label: '海曙区' }] },
    ],
  },
  {
    value: 'jiangsu', label: '江苏',
    children: [
      { value: 'nanjing', label: '南京', children: [{ value: 'xuanwu', label: '玄武区' }, { value: 'qinhuai', label: '秦淮区' }] },
    ],
  },
  {
    value: 'fujian', label: '福建',
    children: [
      { value: 'fuzhou', label: '福州', children: [{ value: 'gulou', label: '鼓楼区' }, { value: 'taijiang', label: '台江区' }] },
    ],
  },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>可搜索</p>
    <Cascader options={options} showSearch placeholder="输入关键词搜索" />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>状态校验</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Cascader options={options} status="error" placeholder="错误状态" />
      <Cascader options={options} status="warning" placeholder="警告状态" />
    </div>
  </div>
</div>`;

export const themeCode = `const options = [
  {
    value: 'zhejiang', label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }, { value: 'binjiang', label: '滨江区' }] },
      { value: 'ningbo', label: '宁波', children: [{ value: 'haishu', label: '海曙区' }] },
    ],
  },
  {
    value: 'jiangsu', label: '江苏',
    children: [
      { value: 'nanjing', label: '南京', children: [{ value: 'xuanwu', label: '玄武区' }, { value: 'qinhuai', label: '秦淮区' }] },
    ],
  },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        primaryHoverColor: '#73d13d',
        components: { Cascader: { borderRadius: 8, optionSelectedBg: 'rgba(82, 196, 26, 0.08)' } },
      }}
    >
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder="请选择地址" showSearch />
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角</p>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        components: { Cascader: { borderRadius: 10, colorBorder: '#d3adf7', optionSelectedBg: 'rgba(114, 46, 209, 0.08)' } },
      }}
    >
      <Cascader options={options} defaultValue={['jiangsu', 'nanjing', 'xuanwu']} placeholder="请选择地址" />
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义尺寸</p>
    <ConfigProvider theme={{ components: { Cascader: { controlHeight: 36, fontSize: 15, borderRadius: 4 } } }}>
      <Cascader options={options} placeholder="自定义控件高度和字号" />
    </ConfigProvider>
  </div>
</div>`;

export const multipleCode = `const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
          { value: 'gulou', label: '鼓楼区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
        ],
      },
    ],
  },
  {
    value: 'fujian',
    label: '福建',
    children: [
      {
        value: 'fuzhou',
        label: '福州',
        children: [
          { value: 'gulou', label: '鼓楼区' },
          { value: 'taijiang', label: '台江区' },
        ],
      },
    ],
  },
];

const [value, setValue] = useState([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'xuanwu'],
]);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选模式</p>
    <Cascader
      multiple
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="请选择地区（可多选）"
    />
    <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选 {value.length} 项</p>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>限制标签数量 (maxTagCount=2)</p>
    <Cascader
      multiple
      options={options}
      defaultValue={[
        ['zhejiang', 'hangzhou', 'xihu'],
        ['zhejiang', 'hangzhou', 'binjiang'],
        ['jiangsu', 'nanjing', 'xuanwu'],
      ]}
      maxTagCount={2}
      placeholder="请选择地区"
    />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选 + 搜索</p>
    <Cascader multiple options={options} showSearch placeholder="搜索并多选地区" />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>选择即改变 + 多选</p>
    <Cascader multiple changeOnSelect options={options} placeholder="可选择任意层级" />
  </div>
</div>`;
