import React from 'react';
import { Input } from '../../src';

const PrefixSuffixInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
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

export default PrefixSuffixInput;
