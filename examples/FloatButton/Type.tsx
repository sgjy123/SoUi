import React from 'react';
import { FloatButton, Space } from '../../src';

export default () => (
  <Space size="large">
    <FloatButton icon="Plus" type="default" />
    <FloatButton icon="Plus" type="primary" />
    <FloatButton icon="Delete" type="primary" danger />
  </Space>
);
