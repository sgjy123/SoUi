import React from 'react';
import { TimePicker } from '../../src';

// 禁用上午 9 点之前的所有小时
const disabledHours = () => {
  const hours = [];
  for (let i = 0; i < 9; i++) hours.push(i);
  return hours;
};

// 根据选中小时禁用分钟
const disabledMinutes = (selectedHour: number) => {
  if (selectedHour === 9) {
    // 9 点时禁用 0-29 分钟
    const minutes = [];
    for (let i = 0; i < 30; i++) minutes.push(i);
    return minutes;
  }
  return [];
};

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <TimePicker
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      placeholder="9点后，9:30前不可选"
    />
    <TimePicker hideSeconds placeholder="隐藏秒列" />
    <TimePicker disabled placeholder="禁用状态" />
  </div>
);
