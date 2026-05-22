import React, { useState } from 'react';
import { Steps } from '../../src';

export default () => {
  const [current, setCurrent] = useState(0);

  const handleChange = (newCurrent: number) => {
    setCurrent(newCurrent);
    console.log(`跳转到第 ${newCurrent + 1} 步`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>可点击切换步骤</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        当前步骤: {current + 1} / 4（点击步骤可跳转）
      </p>
      
      <Steps current={current} onChange={handleChange}>
        <Steps.Step 
          title="基本信息" 
          description="填写个人基本信息" 
        />
        <Steps.Step 
          title="联系方式" 
          description="验证手机号码和邮箱" 
        />
        <Steps.Step 
          title="身份认证" 
          description="上传身份证件" 
        />
        <Steps.Step 
          title="完成注册" 
          description="账户创建成功" 
        />
      </Steps>

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
            opacity: current === 0 ? 0.5 : 1
          }}
        >
          上一步
        </button>
        <button 
          onClick={() => setCurrent(Math.min(3, current + 1))}
          disabled={current === 3}
          style={{
            padding: '8px 16px',
            cursor: current === 3 ? 'not-allowed' : 'pointer',
            opacity: current === 3 ? 0.5 : 1
          }}
        >
          下一步
        </button>
      </div>
    </div>
  );
};
