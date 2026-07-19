// ==================== Basic Example ====================

export const basicCode = `const treeData = [
  {
    key: '1',
    title: '研发部',
    children: [
      {
        key: '1-1',
        title: '前端组',
        children: [
          { key: '1-1-1', title: '张三' },
          { key: '1-1-2', title: '李四' },
        ],
      },
      {
        key: '1-2',
        title: '后端组',
        children: [
          { key: '1-2-1', title: '王五' },
          { key: '1-2-2', title: '赵六', disabled: true },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部',
    children: [
      { key: '2-1', title: '孙七' },
      { key: '2-2', title: '周八' },
    ],
  },
  {
    key: '3',
    title: '设计部',
    isLeaf: true,
  },
];

<Tree
  treeData={treeData}
  defaultExpandedKeys={['1', '1-1']}
  onSelect={(keys, info) => console.log('选中:', keys, info)}
/>`;

// ==================== Checkable Example ====================

export const checkableCode = `const [checkedKeys, setCheckedKeys] = useState(['0-0-0-0']);
const [checkStrictly, setCheckStrictly] = useState(false);

const treeData = [
  {
    key: '0-0',
    title: '项目开发',
    children: [
      {
        key: '0-0-0',
        title: '前端开发',
        children: [
          { key: '0-0-0-0', title: 'React 组件开发' },
          { key: '0-0-0-1', title: '样式优化' },
        ],
      },
      {
        key: '0-0-1',
        title: '后端开发',
        children: [
          { key: '0-0-1-0', title: 'API 接口开发' },
          { key: '0-0-1-1', title: '数据库设计', disabled: true },
        ],
      },
      { key: '0-0-2', title: '测试' },
    ],
  },
  {
    key: '0-1',
    title: '文档编写',
    children: [
      { key: '0-1-0', title: '技术文档' },
      { key: '0-1-1', title: '用户手册' },
    ],
  },
];

<Space direction="vertical" size={16}>
  <Space>
    <span>严格模式:</span>
    <Switch checked={checkStrictly} onChange={() => setCheckStrictly(!checkStrictly)} />
  </Space>
  <Tree
    checkable
    checkStrictly={checkStrictly}
    treeData={treeData}
    checkedKeys={checkedKeys}
    onCheck={(keys) => setCheckedKeys(keys)}
    defaultExpandedKeys={['0-0', '0-0-0']}
  />
</Space>`;

// ==================== Searchable Example ====================

export const searchableCode = `const [expandedKeys, setExpandedKeys] = useState([]);
const [searchValue, setSearchValue] = useState('');

<Tree
  treeData={treeData}
  expandedKeys={expandedKeys}
  onExpand={(keys) => setExpandedKeys(keys)}
  searchValue={searchValue}
/>`;

// ==================== Async Load Example ====================

export const asyncLoadCode = `const [treeData, setTreeData] = useState(initialData);

const onLoadData = (node) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const children = [
        { key: node.key + '-0', title: '子节点 1' },
        { key: node.key + '-1', title: '子节点 2', isLeaf: true },
      ];
      setTreeData((origin) => updateTreeChildren(origin, node.key, children));
      resolve();
    }, 1000);
  });
};

<Tree treeData={treeData} loadData={onLoadData} />`;
