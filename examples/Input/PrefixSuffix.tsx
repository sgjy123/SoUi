import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input prefix="🔍" placeholder="带前缀图标" />
    <Input suffix="元" placeholder="带后缀单位" />
    <Input prefix="📧" suffix="@example.com" placeholder="邮箱地址" />
    <Input 
      prefix="💰" 
      suffix="CNY" 
      allowClear 
      placeholder="金额输入框（支持清除）" 
    />
  </div>
);
