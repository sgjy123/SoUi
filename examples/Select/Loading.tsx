import React, { useState } from 'react';
import { Select, Button } from '../../src';

export default () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const handleLoadData = () => {
    setLoading(true);
    // 模拟异步加载数据
    setTimeout(() => {
      setOptions([
        { label: '从服务器加载的选项 A', value: 'a' },
        { label: '从服务器加载的选项 B', value: 'b' },
        { label: '从服务器加载的选项 C', value: 'c' },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>加载中状态</p>
        <Select
          placeholder={loading ? '加载中...' : '点击按钮加载数据'}
          loading={loading}
          options={options}
        />
      </div>
      <Button onClick={handleLoadData} disabled={loading}>
        {loading ? '加载中...' : '加载数据'}
      </Button>
    </div>
  );
};
