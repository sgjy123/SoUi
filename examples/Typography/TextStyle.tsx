import React from 'react';
import { Typography, Space } from '../../src';

const { Text } = Typography;

export default () => (
  <Space direction="vertical">
    <Text strong>加粗文本</Text>
    <Text italic>斜体文本</Text>
    <Text underline>下划线文本</Text>
    <Text delete>删除线文本</Text>
    <Text code>代码片段</Text>
    <Text mark>高亮文本</Text>
  </Space>
);
