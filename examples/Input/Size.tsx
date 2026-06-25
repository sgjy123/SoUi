import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input size="small" placeholder="小号输入框" />
    <Input size="middle" placeholder="中号输入框（默认）" />
    <Input size="large" placeholder="大号输入框" />
  </div>
);
