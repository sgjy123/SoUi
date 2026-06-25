import React from 'react';
import { Input } from '../../src';

const SizeInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input size="small" placeholder="小号输入框" />
    <Input size="middle" placeholder="中号输入框（默认）" />
    <Input size="large" placeholder="大号输入框" />
  </div>
);

export default SizeInput;
