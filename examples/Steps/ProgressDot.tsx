import React from 'react';
import { Steps } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>默认进度点</h3>
    <Steps current={1} progressDot>
      <Steps.Step title="第一步" description="这是第一步的描述内容" />
      <Steps.Step title="第二步" description="这是第二步的描述内容" />
      <Steps.Step title="第三步" description="这是第三步的描述内容" />
      <Steps.Step title="第四步" description="这是第四步的描述内容" />
    </Steps>

    <h3 style={{ marginTop: '40px' }}>自定义进度点</h3>
    <Steps 
      current={1}
      progressDot={(dot, { index, status }) => {
        // 自定义不同状态的进度点样式
        const customStyles: React.CSSProperties = {
          display: 'inline-block',
          alignItems: 'center',
          width: status === 'process' ? '16px' : '16px',
          height: status === 'process' ? '16px' : '16px',
          borderRadius: status === 'finish' ? '2px' : '50%',
          backgroundColor: status === 'finish' ? '#52c41a' : status === 'process' ? '#1890ff' : '#d9d9d9',
          boxShadow: status === 'process' ? '0 0 0 4px rgba(24, 144, 255, 0.2)' : 'none',
          transition: 'all 0.3s ease-in-out',
          fontSize: '10px',
          color: '#fff',
          fontWeight: 'bold',
          flexShrink: 0,
          textAlign: 'center',
        };

        // 在处理中状态显示数字
        const content = status === 'process' ? (index + 1) : (status === 'finish' ? '✓' : '');
        
        return <span style={customStyles}>{content}</span>;
      }}
    >
      <Steps.Step title="登录" description="用户登录系统" />
      <Steps.Step title="验证" description="身份验证过程" />
      <Steps.Step title="完成" description="操作已完成" />
    </Steps>
  </div>
);
