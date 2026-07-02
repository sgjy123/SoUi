import React from 'react';
import { TimePicker } from '../../src';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
    <TimePicker size="small" />
    <TimePicker size="middle" />
    <TimePicker size="large" />
  </div>
);
