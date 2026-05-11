import React from 'react';
import { Typography, Space } from '../../src';

const { Link } = Typography;

export default () => (
  <Space>
    <Link href="https://example.com" target="_blank">新窗口打开</Link>
    <Link disabled>禁用链接</Link>
  </Space>
);
