import React from 'react';
import { TimePicker } from '../../src';

const RangePicker = TimePicker.RangePicker;

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flexDirection: 'column' }}>
    <RangePicker hideSeconds placeholder={['上班', '下班']} />
    <RangePicker disabled />
    <RangePicker disabled={[false, true]} placeholder={['开始时间', '结束（已禁用）']} />
    <RangePicker use12Hours format="hh:mm A" hideSeconds />
  </div>
);
