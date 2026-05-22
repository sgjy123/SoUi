import React from 'react';
import { Steps } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>带子标题的步骤条</h3>
    <Steps current={1}>
      <Steps.Step 
        title="账户信息" 
        subTitle="基本资料"
        description="填写您的基本信息" 
      />
      <Steps.Step 
        title="身份验证" 
        subTitle="安全认证"
        description="完成身份验证流程" 
      />
      <Steps.Step 
        title="设置完成" 
        subTitle="成功"
        description="您的账户已设置完成" 
      />
    </Steps>

    <h3 style={{ marginTop: '40px' }}>禁用状态</h3>
    <Steps current={1}>
      <Steps.Step title="已完成" description="此步骤已完成" />
      <Steps.Step title="进行中" description="当前正在处理" />
      <Steps.Step title="待处理" description="等待开始" disabled />
      <Steps.Step title="未开始" description="尚未到达" disabled />
    </Steps>
  </div>
);
