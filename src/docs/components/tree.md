# Tree 树形控件

多层次的结构列表，支持展开/收起、选择、勾选、搜索高亮和异步加载等功能。

## 何时使用

- 需要展示文件夹、组织架构、分类目录等层级结构数据时。
- 需要支持节点展开/收起、单选/多选、勾选等交互操作时。
- 需要异步加载子节点数据（懒加载）时。
- 需要对树节点进行搜索过滤和高亮时。

## 代码演示

### 基础用法

基本的树形控件，支持展开/收起和选中操作。可选开启连接线和节点图标。

```tsx
import { Tree } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';

const treeData: TreeNodeData[] = [
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

export default () => (
  <div>
    <h4>基础树形</h4>
    <Tree
      treeData={treeData}
      defaultExpandedKeys={['1', '1-1']}
      onSelect={(keys, info) => console.log('选中:', keys, info)}
    />

    <h4 style={{ marginTop: 24 }}>带连接线</h4>
    <Tree
      treeData={treeData}
      showLine
      defaultExpandedKeys={['1']}
    />

    <h4 style={{ marginTop: 24 }}>带图标</h4>
    <Tree
      treeData={treeData}
      showIcon
      defaultExpandedKeys={['1', '1-1']}
    />
  </div>
);
```

### 可勾选

支持勾选功能，默认父子节点联动。开启 `checkStrictly` 后父子节点不联动。

```tsx
import { Tree, Space, Switch } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';
import { useState } from 'react';

const treeData: TreeNodeData[] = [
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

export default () => {
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0-0']);
  const [checkStrictly, setCheckStrictly] = useState(false);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>严格模式（父子不联动）:</span>
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
    </div>
  );
};
```

### 搜索

配合 `Input` 组件实现搜索过滤，通过 `searchValue` 高亮匹配的节点文字。

```tsx
import { Tree, Input } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';
import { useState } from 'react';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '技术部',
    children: [
      {
        key: '1-1',
        title: '前端团队',
        children: [
          { key: '1-1-1', title: '张三' },
          { key: '1-1-2', title: '李四' },
        ],
      },
      {
        key: '1-2',
        title: '后端团队',
        children: [
          { key: '1-2-1', title: '王五' },
          { key: '1-2-2', title: '赵六' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '市场部',
    children: [
      { key: '2-1', title: '孙七' },
      { key: '2-2', title: '周八' },
      { key: '2-3', title: '吴九' },
    ],
  },
];

export default () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <Input
        placeholder="搜索节点"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        searchValue={searchValue}
      />
    </div>
  );
};
```

### 异步加载

通过 `loadData` 属性实现异步加载子节点数据，适用于大数据量场景。

```tsx
import { Tree } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';
import { useState } from 'react';

const initialData: TreeNodeData[] = [
  { key: '0', title: '根节点 0' },
  { key: '1', title: '根节点 1' },
  { key: '2', title: '根节点 2（叶子）', isLeaf: true },
];

function updateTreeChildren(data, key, children) {
  return data.map((node) => {
    if (node.key === key) return { ...node, children };
    if (node.children) {
      return { ...node, children: updateTreeChildren(node.children, key, children) };
    }
    return node;
  });
}

export default () => {
  const [treeData, setTreeData] = useState(initialData);
  const [loadedKeys, setLoadedKeys] = useState(new Set());

  const onLoadData = (node) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const children = [
          { key: node.key + '-0', title: `异步子节点 ${node.key}-0` },
          { key: node.key + '-1', title: `异步子节点 ${node.key}-1` },
          { key: node.key + '-2', title: `叶子节点 ${node.key}-2`, isLeaf: true },
        ];
        setTreeData((origin) => updateTreeChildren(origin, node.key, children));
        setLoadedKeys((prev) => new Set(prev).add(node.key));
        resolve();
      }, 1000);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        点击展开箭头可异步加载子节点（1秒延迟）。已加载:{' '}
        {loadedKeys.size > 0 ? Array.from(loadedKeys).join(', ') : '无'}
      </div>
      <Tree treeData={treeData} loadData={onLoadData} />
    </div>
  );
};
```

### 文本提示

通过 `tooltip` 属性开启 Tooltip 提示，鼠标悬停在截断的节点标题上时显示完整内容。默认关闭，开启后仅对字符串类型的 title 生效。即使关闭 Tooltip，节点也会通过原生 `title` 属性提供浏览器原生提示。

```tsx
import { Tree, Space, Switch } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';
import { useState } from 'react';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '这是一个非常长的部门名称用于演示文本截断效果和 Tooltip 提示功能',
    children: [
      {
        key: '1-1',
        title: '前端开发团队 - 负责所有前端相关的技术栈和项目开发工作',
        children: [
          { key: '1-1-1', title: '张三（React 高级工程师，5年经验）' },
          { key: '1-1-2', title: '李四（Vue 高级工程师，3年经验）' },
          { key: '1-1-3', title: '短名称' },
        ],
      },
      {
        key: '1-2',
        title: '后端开发团队',
        children: [
          { key: '1-2-1', title: '王五（Java 架构师）' },
          { key: '1-2-2', title: '赵六（Go 高级工程师，负责微服务架构设计与实现）' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部',
    children: [
      { key: '2-1', title: '孙七（产品经理，负责B端产品线规划与需求管理）' },
      { key: '2-2', title: '周八' },
    ],
  },
  {
    key: '3',
    title: '设计部（UI/UX 设计团队，包含视觉设计、交互设计、用户研究）',
    isLeaf: true,
  },
];

export default () => {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>启用 Tooltip:</span>
        <Switch checked={tooltip} onChange={() => setTooltip(!tooltip)} />
        <span style={{ color: '#999', fontSize: 12 }}>
          （关闭后仍可通过浏览器原生 title 属性查看完整标题）
        </span>
      </Space>

      <div style={{ maxWidth: 400, border: '1px solid #f0f0f0', borderRadius: 6, padding: 12 }}>
        <Tree
          treeData={treeData}
          tooltip={tooltip}
          defaultExpandedKeys={['1', '1-1']}
        />
      </div>
    </div>
  );
};
```

### 自定义渲染

通过 `titleRender` 自定义节点的渲染内容，支持添加图标、标签、徽章等富文本元素。

```tsx
import { Tree } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '技术中心',
    icon: '🏢',
    children: [
      {
        key: '1-1',
        title: '前端团队',
        icon: '💻',
        children: [
          { key: '1-1-1', title: '张三', icon: '👨‍💻', extra: '高级工程师' },
          { key: '1-1-2', title: '李四', icon: '👩‍💻', extra: '中级工程师' },
        ],
      },
      {
        key: '1-2',
        title: '后端团队',
        icon: '⚙️',
        children: [
          { key: '1-2-1', title: '王五', icon: '👨‍💻', extra: '架构师' },
          { key: '1-2-2', title: '赵六', icon: '👩‍💻', extra: '高级工程师' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品中心',
    icon: '📋',
    children: [
      { key: '2-1', title: '孙七', icon: '👤', extra: 'B端产品经理' },
      { key: '2-2', title: '周八', icon: '👤', extra: 'C端产品经理' },
    ],
  },
];

export default () => {
  const titleRender = (node) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {node.icon && <span style={{ fontSize: 16 }}>{node.icon}</span>}
      <span>{node.title}</span>
      {node.extra && (
        <span style={{
          fontSize: 11,
          color: '#999',
          background: '#f5f5f5',
          padding: '1px 6px',
          borderRadius: 3,
        }}>
          {node.extra}
        </span>
      )}
    </span>
  );

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        通过 titleRender 自定义节点内容，支持图标、标签等富文本展示。
      </div>
      <Tree treeData={treeData} titleRender={titleRender} defaultExpandAll />
    </div>
  );
};
```

### 禁用

通过 `disabled` 属性禁用整棵树或单个节点，禁用节点不可选中、不可勾选。通过节点级 `disableCheckbox` 可以仅禁用复选框而保留选中能力。

```tsx
import { Tree, Space, Switch } from '@soui/ui';
import type { TreeNodeData } from '@soui/ui';
import { useState } from 'react';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '可用部门',
    children: [
      {
        key: '1-1',
        title: '前端组',
        children: [
          { key: '1-1-1', title: '张三' },
          { key: '1-1-2', title: '李四（不可选）', disabled: true },
          { key: '1-1-3', title: '王五（不可勾选）', disableCheckbox: true },
        ],
      },
      {
        key: '1-2',
        title: '后端组',
        disabled: true,
        children: [
          { key: '1-2-1', title: '赵六' },
          { key: '1-2-2', title: '钱七' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部（整棵禁用）',
    disabled: true,
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

export default () => {
  const [treeDisabled, setTreeDisabled] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState(['1-1-1']);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>整棵树禁用:</span>
        <Switch checked={treeDisabled} onChange={() => setTreeDisabled(!treeDisabled)} />
      </Space>

      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        disabled 节点不可选、不可勾选、样式置灰。disableCheckbox 仅禁用复选框，节点仍可选中。
      </div>

      <Tree
        checkable
        treeData={treeData}
        disabled={treeDisabled}
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys)}
        defaultExpandedKeys={['1', '1-1', '1-2', '2']}
      />
    </div>
  );
};
```

### 自定义字段

通过 `fieldNames` 映射自定义字段名到标准字段，适配不同的后端数据结构。

```tsx
import { Tree } from '@soui/ui';

const treeData = [
  {
    id: 'dept-1',
    name: '技术中心',
    subordinates: [
      {
        id: 'dept-1-1',
        name: '前端团队',
        subordinates: [
          { id: 'emp-001', name: '张三', leaf: true },
          { id: 'emp-002', name: '李四', leaf: true },
        ],
      },
      {
        id: 'dept-1-2',
        name: '后端团队',
        subordinates: [
          { id: 'emp-003', name: '王五', leaf: true },
          { id: 'emp-004', name: '赵六', leaf: true },
        ],
      },
    ],
  },
  {
    id: 'dept-2',
    name: '产品中心',
    subordinates: [
      { id: 'emp-005', name: '孙七', leaf: true },
      { id: 'emp-006', name: '周八', leaf: true },
    ],
  },
];

export default () => (
  <div>
    <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
      通过 fieldNames 映射字段名：name → title, id → key, subordinates → children, leaf → isLeaf。
    </div>
    <Tree
      treeData={treeData}
      fieldNames={{ title: 'name', key: 'id', children: 'subordinates', isLeaf: 'leaf' }}
      defaultExpandAll
    />
  </div>
);
```

## API

### Tree

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| treeData | 树形数据 | `TreeNodeData[]` | `[]` | - |
| defaultExpandAll | 默认展开所有节点 | `boolean` | `false` | - |
| defaultExpandedKeys | 默认展开的节点 keys | `React.Key[]` | `-` | - |
| expandedKeys | 受控展开的节点 keys | `React.Key[]` | `-` | - |
| onExpand | 展开/收起回调 | `(expandedKeys, { expanded, node }) => void` | `-` | - |
| selectable | 是否可选中 | `boolean` | `true` | - |
| multiple | 是否多选 | `boolean` | `false` | - |
| defaultSelectedKeys | 默认选中的节点 keys | `React.Key[]` | `-` | - |
| selectedKeys | 受控选中的节点 keys | `React.Key[]` | `-` | - |
| onSelect | 选中回调 | `(selectedKeys, { selected, node, nativeEvent }) => void` | `-` | - |
| checkable | 是否可勾选 | `boolean` | `false` | - |
| checkStrictly | 勾选是否严格（父子不联动） | `boolean` | `false` | - |
| defaultCheckedKeys | 默认勾选的节点 keys | `React.Key[]` | `-` | - |
| checkedKeys | 受控勾选的节点 keys | `React.Key[]` | `-` | - |
| onCheck | 勾选回调 | `(checkedKeys, { checked, node, halfCheckedKeys }) => void` | `-` | - |
| disabled | 是否禁用整棵树 | `boolean` | `false` | - |
| showLine | 显示连接线 | `boolean` | `false` | - |
| showIcon | 显示节点图标 | `boolean` | `false` | - |
| switcherIcon | 自定义展开图标 | `ReactNode \| ({ expanded }) => ReactNode` | `-` | - |
| loadData | 异步加载数据 | `(node: TreeNodeData) => Promise<void>` | `-` | - |
| loadIcon | 加载中图标 | `ReactNode` | `-` | - |
| fieldNames | 自定义字段名映射 | `TreeFieldNames` | `-` | - |
| searchValue | 搜索关键词（高亮匹配文字） | `string` | `-` | - |
| blockNode | 块级节点（整行可选中/悬停） | `boolean` | `false` | - |
| titleRender | 自定义节点渲染 | `(node: TreeNodeData) => ReactNode` | `-` | - |
| emptyText | 空状态显示 | `ReactNode` | `'暂无数据'` | - |
| nodeIndent | 缩进宽度（像素） | `number` | `24` | - |
| tooltip | 悬停节点时显示 Tooltip 完整标题 | `boolean` | `false` | - |

### TreeNodeData

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 节点唯一标识 | `React.Key` | `-` |
| title | 显示文本 | `ReactNode` | `-` |
| children | 子节点 | `TreeNodeData[]` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| selectable | 是否可选 | `boolean` | `true` |
| checkable | 是否可勾选 | `boolean` | `true` |
| disableCheckbox | 是否禁用复选框 | `boolean` | `false` |
| icon | 自定义图标 | `ReactNode` | `-` |
| isLeaf | 是否为叶子节点 | `boolean` | `-` |

### TreeFieldNames

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题字段名 | `string` | `'title'` |
| key | 键值字段名 | `string` | `'key'` |
| children | 子节点字段名 | `string` | `'children'` |
| isLeaf | 叶子节点字段名 | `string` | `'isLeaf'` |

## 主题定制

Tree 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Tree` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Tree: {
        fontSize: 14,
        colorPrimary: '#1677ff',
        nodeHeight: 32,
        nodeHoverBg: 'rgba(0, 0, 0, 0.04)',
        nodeSelectedBg: 'rgba(22, 119, 255, 0.1)',
        switcherColor: 'rgba(0, 0, 0, 0.45)',
        iconColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: 6,
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
2. **组件级配置** - `theme.components.Tree` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fontSize | 字体大小（像素） | `number` | `14` |
| colorPrimary | 主色 | `string` | `#1677ff` |
| nodeHeight | 节点高度（像素） | `number` | `26` |
| nodeHoverBg | 节点悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` |
| nodeSelectedBg | 节点选中背景色 | `string` | `rgba(22, 119, 255, 0.1)` |
| switcherColor | 展开图标颜色 | `string` | `rgba(0, 0, 0, 0.45)` |
| iconColor | 节点图标颜色 | `string` | `rgba(0, 0, 0, 0.45)` |
| borderRadius | 边框圆角（像素） | `number` | `6` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Tree
  style={{
    '--soui-tree-font-size': '16px',
    '--soui-tree-node-height': '32px',
    '--soui-tree-color-primary': '#722ed1',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 使用 treeData 数据驱动
<Tree treeData={data} />

// 受控模式
<Tree
  expandedKeys={expandedKeys}
  onExpand={setExpandedKeys}
  selectedKeys={selectedKeys}
  onSelect={setSelectedKeys}
  treeData={data}
/>
```

### 避免使用

```tsx
// 避免在大数据量下不使用异步加载
<Tree treeData={hugeData} />

// 推荐配合 loadData 使用
<Tree treeData={data} loadData={onLoadData} />
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 树形结构使用 `role="tree"` 语义化标签
- 节点使用 `role="treeitem"` 标识
- 展开/折叠状态通过 `aria-expanded` 属性标识
- 支持键盘导航（上下箭头、回车、空格）
