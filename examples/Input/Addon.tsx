import React from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input addonBefore="https://" addonAfter=".com" placeholder="域名输入" />
    <Input addonBefore="+" addonAfter="%" placeholder="百分比" />
    <Input 
      addonBefore="¥" 
      addonAfter="元" 
      showCount 
      maxLength={10}
      placeholder="金额（带计数）" 
    />
  </div>
);
