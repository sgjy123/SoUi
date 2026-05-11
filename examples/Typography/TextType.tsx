import React from 'react';
import { Typography, Space } from '../../src';

const { Text } = Typography;

export default () => (
  <Space direction="vertical">
    <Text type="secondary">次要文本</Text>
    <Text type="success">成功状态</Text>
    <Text type="warning">警告状态</Text>
    <Text type="danger">危险状态</Text>
  </Space>
);
