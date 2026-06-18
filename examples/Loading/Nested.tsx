import React, { useState } from 'react';
import { Loading, Button, Space } from '../../src';

export default () => {
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setLoading(!loading);
  };

  return (
    <Space direction="vertical" size={16}>
      <Button onClick={handleToggle} type="primary">
        {loading ? '停止加载' : '开始加载'}
      </Button>
      <Loading spinning={loading} tip="加载中...">
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 6 }}>
          <h3 style={{ marginBottom: 12 }}>卡片标题</h3>
          <p>这是一段内容，当加载状态激活时，内容会被模糊化并显示加载指示器。</p>
          <p>可以模拟数据加载的场景。</p>
        </div>
      </Loading>
    </Space>
  );
};
