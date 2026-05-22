import React from 'react';
import { Steps } from '../../src';

export default () => (
  <Steps current={1} size="small">
    <Steps.Step title="第一步" description="这是垂直步骤条的第一步" />
    <Steps.Step title="第二步" description="这是垂直步骤条的第二步" />
    <Steps.Step title="第三步" description="这是垂直步骤条的第三步" />
  </Steps>
);
