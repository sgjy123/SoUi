import React from 'react';
import { Steps } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>标签垂直放置（水平方向）</h3>
    <Steps current={1} labelPlacement="vertical">
      <Steps.Step title="第一步" description="这是第一步的描述内容" />
      <Steps.Step title="第二步" description="这是第二步的描述内容" />
      <Steps.Step title="第三步" description="这是第三步的描述内容" />
      <Steps.Step title="第四步" description="这是第四步的描述内容" />
    </Steps>

    <h3 style={{ marginTop: '40px' }}>小尺寸 + 垂直标签</h3>
    <Steps current={2} size="small" labelPlacement="vertical">
      <Steps.Step title="登录" description="用户登录" />
      <Steps.Step title="验证" description="身份验证" />
      <Steps.Step title="完成" description="操作完成" />
    </Steps>
  </div>
);
