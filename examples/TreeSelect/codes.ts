const treeDataCode = `const treeData = [
  {
    title: '技术部',
    value: 'tech',
    children: [
      {
        title: '前端组',
        value: 'frontend',
        children: [
          { title: '张三', value: 'zhangsan' },
          { title: '李四', value: 'lisi' },
          { title: '王五', value: 'wangwu' },
        ],
      },
      {
        title: '后端组',
        value: 'backend',
        children: [
          { title: '赵六', value: 'zhaoliu' },
          { title: '孙七', value: 'sunqi' },
        ],
      },
    ],
  },
  {
    title: '产品部',
    value: 'product',
    children: [
      { title: '周八', value: 'zhouba' },
      { title: '吴九', value: 'wujiu' },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    disabled: true,
    children: [
      { title: '郑十', value: 'zhengshi' },
    ],
  },
];`;

export const basicCode = `${treeDataCode}

const [value, setValue] = useState();

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <TreeSelect
    treeData={treeData}
    value={value}
    onChange={(val) => setValue(val)}
    placeholder="请选择部门成员"
    style={{ width: 300 }}
    treeDefaultExpandAll
  />
  <TreeSelect
    treeData={treeData}
    defaultValue="lisi"
    placeholder="默认选中李四"
    style={{ width: 300 }}
    treeDefaultExpandAll
  />
  <TreeSelect
    treeData={treeData}
    placeholder="禁用状态"
    disabled
    style={{ width: 300 }}
  />
</div>`;

export const multipleCode = `${treeDataCode}

const [value, setValue] = useState(['zhangsan']);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <TreeSelect
    treeData={treeData}
    value={value}
    onChange={(val) => setValue(val)}
    placeholder="请选择成员（多选）"
    multiple
    style={{ width: 400 }}
    treeDefaultExpandAll
    allowClear
  />
  <TreeSelect
    treeData={treeData}
    defaultValue={['lisi', 'sunqi']}
    placeholder="多选带默认值和标签限制"
    multiple
    style={{ width: 400 }}
    treeDefaultExpandAll
    allowClear
    maxTagCount={2}
  />
</div>`;

export const checkableCode = `${treeDataCode}

const [value, setValue] = useState([]);

<div>
  <TreeSelect
    treeData={treeData}
    value={value}
    onChange={(val) => setValue(Array.isArray(val) ? val : [val])}
    placeholder="可勾选（SHOW_PARENT）"
    treeCheckable
    multiple
    showCheckedStrategy="SHOW_PARENT"
    style={{ width: 400 }}
    treeDefaultExpandAll
    allowClear
  />
  <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
    选中值: {JSON.stringify(value)}
  </div>
</div>`;

export const searchableCode = `${treeDataCode}

const [value, setValue] = useState();

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <TreeSelect
    treeData={treeData}
    value={value}
    onChange={(val) => setValue(val)}
    placeholder="搜索选择（输入关键词过滤）"
    showSearch
    treeNodeFilterProp="title"
    style={{ width: 300 }}
    treeDefaultExpandAll
    allowClear
  />
  <TreeSelect
    treeData={treeData}
    placeholder="错误状态"
    status="error"
    style={{ width: 300 }}
    treeDefaultExpandAll
  />
  <TreeSelect
    treeData={treeData}
    placeholder="警告状态"
    status="warning"
    style={{ width: 300 }}
    treeDefaultExpandAll
  />
</div>`;

export const themeCode = `const treeData = [
  {
    title: '技术部', value: 'tech',
    children: [
      { title: '前端组', value: 'frontend', children: [{ title: '张三', value: 'zhangsan' }, { title: '李四', value: 'lisi' }] },
      { title: '后端组', value: 'backend', children: [{ title: '赵六', value: 'zhaoliu' }] },
    ],
  },
  { title: '产品部', value: 'product', children: [{ title: '周八', value: 'zhouba' }] },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <ConfigProvider theme={{ components: { TreeSelect: { borderRadius: 8, colorBorder: '#91caff', optionSelectedBg: '#e6f4ff' } } }}>
    <TreeSelect treeData={treeData} placeholder="自定义主题（蓝色系）" style={{ width: 300 }} treeDefaultExpandAll allowClear />
  </ConfigProvider>
  <div style={{ display: 'flex', gap: 12 }}>
    <TreeSelect treeData={treeData} placeholder="小尺寸" size="small" style={{ width: 200 }} treeDefaultExpandAll />
    <TreeSelect treeData={treeData} placeholder="默认尺寸" style={{ width: 200 }} treeDefaultExpandAll />
    <TreeSelect treeData={treeData} placeholder="大尺寸" size="large" style={{ width: 200 }} treeDefaultExpandAll />
  </div>
</div>`;
