import React from 'react';
import { Tag, Space } from '../../src';

export default () => (
  <Space direction="vertical">
    <Space>
      <Tag>默认标签</Tag>
      <Tag bordered={false}>无边框</Tag>
      <a href="#" onClick={(e) => e.preventDefault()}>
        <Tag>链接标签</Tag>
      </a>
    </Space>
  </Space>
);
