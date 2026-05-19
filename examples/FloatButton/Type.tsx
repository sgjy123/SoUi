import React from 'react';
import { FloatButton, Space } from '../../src';

export default () => (
  <Space size="large">
    <FloatButton icon="Plus" type="default" position={{bottom: 140}}  />
    <FloatButton icon="Plus" type="primary" position={{bottom: 80}} />
    <FloatButton icon="Delete" type="primary" danger />
  </Space>
);
