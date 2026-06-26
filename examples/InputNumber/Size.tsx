import React from 'react';
import { InputNumber } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>小尺寸 (small)</p>
      <InputNumber size="small" defaultValue={1} min={0} max={100} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>中尺寸 (middle)</p>
      <InputNumber size="middle" defaultValue={50} min={0} max={100} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>大尺寸 (large)</p>
      <InputNumber size="large" defaultValue={100} min={0} max={1000} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>带前缀</p>
      <InputNumber prefix="¥" defaultValue={100} min={0} style={{ width: 180 }} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>前后置标签</p>
      <InputNumber addonBefore="价格" addonAfter="元" defaultValue={99} min={0} style={{ width: 260 }} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>隐藏控制按钮</p>
      <InputNumber controls={false} defaultValue={10} />
    </div>
  </div>
);
