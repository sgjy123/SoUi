import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input placeholder="基础输入框" />
    <Input placeholder="带有默认值" defaultValue="默认内容" />
    <Input placeholder="禁用状态" disabled />
    <Input placeholder="只读状态" readOnly value="只读内容" />
  </div>
);
