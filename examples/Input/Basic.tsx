import React from 'react';
import { Input } from '../../src';

const BasicInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="请输入内容" />
    <Input defaultValue="默认值" />
    <Input placeholder="禁用状态" disabled />
    <Input placeholder="只读状态" readOnly defaultValue="只读内容" />
  </div>
);

export default BasicInput;
