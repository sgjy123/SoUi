import React, { useState } from 'react';
import { Checkbox } from '../../src';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
        <Checkbox>默认选项</Checkbox>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中</p>
        <Checkbox defaultChecked>默认选中</Checkbox>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          受控选项（{checked ? '已选中' : '未选中'}）
        </Checkbox>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Checkbox disabled>禁用未选</Checkbox>
          <Checkbox disabled defaultChecked>禁用已选</Checkbox>
        </div>
      </div>
    </div>
  );
};
