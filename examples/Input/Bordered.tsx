import React from 'react';
import { Input } from '../../src';

const BorderedInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input
      placeholder="无边框模式"
      bordered={false}
    />
    <Input
      placeholder="无边框 + 前缀"
      bordered={false}
      prefix="🔍"
    />
    <Input
      placeholder="无边框 + 后缀"
      bordered={false}
      suffix="元"
    />
  </div>
);

export default BorderedInput;
