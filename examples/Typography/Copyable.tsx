import React from 'react';
import { Typography } from '../../src';

const { Text } = Typography;

export default () => (
  <Text copyable={{ text: '这是要复制的内容' }}>可复制的文本（点击图标复制）</Text>
);
