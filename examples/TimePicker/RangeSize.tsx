import React from 'react';
import { TimePicker } from '../../src';

const RangePicker = TimePicker.RangePicker;

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flexDirection: 'column' }}>
    <RangePicker size="small" />
    <RangePicker size="middle" />
    <RangePicker size="large" />
  </div>
);
