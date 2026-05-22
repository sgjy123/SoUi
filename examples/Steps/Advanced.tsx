import React from 'react';
import { Steps, Icon } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>完整功能展示</h3>
    
    <h4 style={{ marginTop: '30px', marginBottom: '15px' }}>1. 带图标的步骤条</h4>
    <Steps current={2}>
      <Steps.Step 
        title="账户创建" 
        subTitle="注册"
        description="创建您的账户"
        icon={<Icon name="UserPlus" size={16} />}
      />
      <Steps.Step 
        title="邮箱验证" 
        subTitle="验证"
        description="验证您的邮箱地址"
        icon={<Icon name="Mail" size={16} />}
      />
      <Steps.Step 
        title="个人资料" 
        subTitle="完善"
        description="填写个人信息"
        icon={<Icon name="Edit" size={16} />}
      />
      <Steps.Step 
        title="完成" 
        subTitle="成功"
        description="设置已完成"
        icon={<Icon name="CheckCircle" size={16} />}
      />
    </Steps>

    <h4 style={{ marginTop: '40px', marginBottom: '15px' }}>2. 进度点模式 + 垂直标签</h4>
    <Steps current={1} progressDot labelPlacement="vertical">
      <Steps.Step title="准备" description="准备工作" />
      <Steps.Step title="进行中" description="正在处理" />
      <Steps.Step title="审核" description="等待审核" />
      <Steps.Step title="完成" description="全部完成" />
    </Steps>

    <h4 style={{ marginTop: '40px', marginBottom: '15px' }}>3. 小尺寸 + 禁用状态</h4>
    <Steps current={1} size="small">
      <Steps.Step title="第一步" description="已完成" />
      <Steps.Step title="第二步" description="进行中" />
      <Steps.Step title="第三步" description="待处理" disabled />
      <Steps.Step title="第四步" description="未开始" disabled />
    </Steps>

    <h4 style={{ marginTop: '40px', marginBottom: '15px' }}>4. 错误状态</h4>
    <Steps current={1}>
      <Steps.Step title="步骤一" description="已完成" />
      <Steps.Step title="步骤二" description="出现错误" status="error" />
      <Steps.Step title="步骤三" description="等待中" />
    </Steps>
  </div>
);
