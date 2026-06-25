import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input 
      placeholder="搜索框"
      prefix="🔍"
      allowClear
    />
    <Input 
      placeholder="带清除按钮的输入框"
      allowClear
    />
  </div>
);
