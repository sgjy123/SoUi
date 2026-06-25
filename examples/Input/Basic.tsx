import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input placeholder="请输入内容" />
    <Input defaultValue="默认值" />
    <Input placeholder="禁用状态" disabled />
    <Input placeholder="只读状态" readOnly />
  </div>
);
