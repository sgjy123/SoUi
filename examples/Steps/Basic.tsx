import React from 'react';
import { Steps } from '../../src';

export default () => (
  <Steps current={1}>
    <Steps.Step title="第一步" description="这是第一步的描述内容" />
    <Steps.Step title="第二步" description="这是第二步的描述内容" />
    <Steps.Step title="第三步" description="这是第三步的描述内容" />
    <Steps.Step title="第四步" description="这是第四步的描述内容" />
  </Steps>
);
