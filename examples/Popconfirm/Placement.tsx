import React from 'react';
import { Popconfirm, Button, Space } from '../../src';

const positions: Array<{ label: string; placement: any }> = [
  { label: '上方', placement: 'top' },
  { label: '左上', placement: 'topLeft' },
  { label: '右上', placement: 'topRight' },
  { label: '下方', placement: 'bottom' },
  { label: '左下', placement: 'bottomLeft' },
  { label: '右下', placement: 'bottomRight' },
  { label: '左侧', placement: 'left' },
  { label: '左上对齐', placement: 'leftTop' },
  { label: '左下对齐', placement: 'leftBottom' },
  { label: '右侧', placement: 'right' },
  { label: '右上对齐', placement: 'rightTop' },
  { label: '右下对齐', placement: 'rightBottom' },
];

export default () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 500 }}>
    {positions.map(({ label, placement }) => (
      <Popconfirm
        key={placement}
        title={`弹出方向：${label}`}
        placement={placement}
      >
        <Button style={{ width: '100%' }}>{label}</Button>
      </Popconfirm>
    ))}
  </div>
);
