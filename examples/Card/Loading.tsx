import React, { useState } from 'react';
import { Card, Button, Switch, Space } from '../../src';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Space direction="vertical" size={16}>
      <Space>
        <Switch checked={loading} onChange={setLoading} />
        <span>加载中</span>
      </Space>
      <Card title="数据卡片" loading={loading} style={{ width: 400 }}>
        <p>这里是加载完成后展示的内容。</p>
        <p>加载期间显示骨架屏占位。</p>
      </Card>
    </Space>
  );
};
