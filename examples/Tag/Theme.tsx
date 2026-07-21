import React from 'react';
import { Tag, Space, ConfigProvider } from '../../src';

export default () => (
  <Space direction="vertical">
    <Space wrap>
      <Tag>默认主题</Tag>
      <Tag.CheckableTag checked>默认选中</Tag.CheckableTag>
    </Space>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: {
          Tag: {
            borderRadius: 11,
            defaultBg: '#f9f0ff',
            defaultColor: '#722ed1',
            defaultBorderColor: '#d3adf7',
          },
        },
      }}
    >
      <Space wrap>
        <Tag>紫色胶囊标签</Tag>
        <Tag closable>可关闭</Tag>
        <Tag.CheckableTag checked>紫色选中</Tag.CheckableTag>
      </Space>
    </ConfigProvider>
  </Space>
);
