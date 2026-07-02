import React from 'react';
import dayjs from 'dayjs';
import { TimePicker } from '../../src';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <TimePicker />
    <TimePicker placeholder="选择时间" />
    <TimePicker defaultValue={dayjs('09:30:00', 'HH:mm:ss')} />
  </div>
);
