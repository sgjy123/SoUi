import React from 'react';
import { Steps, Icon } from '../../src';

export default () => (
  <Steps current={2}>
    <Steps.Step 
      title="登录" 
      description="用户登录系统"
      icon={<Icon name="User" size={16} />}
    />
    <Steps.Step 
      title="验证" 
      description="身份验证过程"
      icon={<Icon name="Shield" size={16} />}
    />
    <Steps.Step 
      title="完成" 
      description="操作已完成"
      icon={<Icon name="CheckOne" size={16} />}
    />
  </Steps>
);
