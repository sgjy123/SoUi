import React from 'react';
import { TreeSelect, ConfigProvider } from '../../src';

const treeData = [
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
        ],
      },
      {
        title: '后端组',
        value: 'backend',
        children: [
          { title: '赵六', value: 'zhaoliu' },
        ],
      },
    ],
  },
  {
    title: '产品部',
    value: 'product',
    children: [
      { title: '周八', value: 'zhouba' },
    ],
  },
];

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ConfigProvider
        theme={{
          components: {
            TreeSelect: {
              borderRadius: 8,
              colorBorder: '#91caff',
              colorBorderHover: '#1677ff',
              optionSelectedBg: '#e6f4ff',
            },
          },
        }}
      >
        <TreeSelect
          treeData={treeData}
          placeholder="自定义主题（蓝色系）"
          style={{ width: 300 }}
          treeDefaultExpandAll
          allowClear
        />
      </ConfigProvider>
      <ConfigProvider
        theme={{
          components: {
            TreeSelect: {
              borderRadius: 0,
              controlHeight: 36,
              fontSize: 13,
            },
          },
        }}
      >
        <TreeSelect
          treeData={treeData}
          placeholder="自定义主题（方角大尺寸）"
          style={{ width: 300 }}
          treeDefaultExpandAll
        />
      </ConfigProvider>
      <div style={{ display: 'flex', gap: 12 }}>
        <TreeSelect
          treeData={treeData}
          placeholder="小尺寸"
          size="small"
          style={{ width: 200 }}
          treeDefaultExpandAll
        />
        <TreeSelect
          treeData={treeData}
          placeholder="默认尺寸"
          style={{ width: 200 }}
          treeDefaultExpandAll
        />
        <TreeSelect
          treeData={treeData}
          placeholder="大尺寸"
          size="large"
          style={{ width: 200 }}
          treeDefaultExpandAll
        />
      </div>
    </div>
  );
};
