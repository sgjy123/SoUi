import React from 'react';
import { Input } from '../../src';

const StatusInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="默认状态" />
    <Input status="success" placeholder="成功状态" />
    <Input status="warning" placeholder="警告状态" />
    <Input status="error" placeholder="错误状态" />
  </div>
);

export default StatusInput;
