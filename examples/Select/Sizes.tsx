import React from 'react';
import { Select } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      size="small"
      placeholder="小尺寸"
      options={[
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]}
    />
    <Select
      size="middle"
      placeholder="中尺寸（默认）"
      options={[
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]}
    />
    <Select
      size="large"
      placeholder="大尺寸"
      options={[
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]}
    />
  </div>
);
