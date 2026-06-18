import React, { useState } from 'react';
import { Button, Space, Message } from '../../src';

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    Message.loading('正在处理中，请稍候...');
    
    // 模拟异步操作
    setTimeout(() => {
      setLoading(false);
      Message.destroy();
      Message.success('处理完成！');
    }, 3000);
  };

  return (
    <Space direction="vertical" align="start">
      <Space>
        <Button loading={loading} type="primary" onClick={handleLoading}>
          显示加载状态
        </Button>
        <Button
          onClick={() => {
            Message.loading('持续显示的加载提示');
          }}
        >
          加载提示
        </Button>
      </Space>
    </Space>
  );
};

export default Loading;
