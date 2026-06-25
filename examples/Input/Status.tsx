import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input placeholder="默认状态" />
    <Input status="success" placeholder="成功状态" />
    <Input status="warning" placeholder="警告状态" />
    <Input status="error" placeholder="错误状态" />
  </div>
);
