import React from 'react';
import { Input } from '../../src';

const AddonInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
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

export default AddonInput;
