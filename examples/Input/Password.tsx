import React from 'react';
import { Input } from '../../src';

const PasswordInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input.Password placeholder="请输入密码" />
    <Input.Password placeholder="带默认值" defaultValue="password123" />
    <Input.Password
      placeholder="禁用状态"
      disabled
      defaultValue="password"
    />
  </div>
);

export default PasswordInput;
