import React from 'react';
import { Select } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="禁用选择器"
      disabled
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
    <Select
      placeholder="部分选项禁用"
      options={[
        { label: '可选择', value: 'enabled' },
        { label: '不可选择', value: 'disabled', disabled: true },
        { label: '可选择', value: 'enabled2' },
      ]}
    />
  </div>
);
