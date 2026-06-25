import React from 'react';
import { Input } from '../../src';

const CountInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input
      placeholder="请输入密码"
      type="password"
      showCount
      maxLength={20}
    />
    <Input
      defaultValue="123456789"
      showCount
      maxLength={10}
      placeholder="限制最大长度10"
    />
    <Input
      placeholder="自定义计数格式"
      showCount
      maxLength={50}
      countFormatter={(count, max) => `${count}/${max}`}
    />
  </div>
);

export default CountInput;
