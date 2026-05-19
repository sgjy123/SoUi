import React from 'react';
import { FloatButton } from '../../src';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <FloatButton icon="Plus" shape="circle" />
    <FloatButton icon="Plus" shape="square" />
  </div>
);
