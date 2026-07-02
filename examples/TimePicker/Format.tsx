import React from 'react';
import { TimePicker } from '../../src';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <TimePicker format="HH:mm" hideSeconds placeholder="时:分" />
    <TimePicker use12Hours format="hh:mm A" hideSeconds placeholder="12小时制" />
    <TimePicker hourStep={2} minuteStep={15} secondStep={10} placeholder="自定义步长" />
  </div>
);
