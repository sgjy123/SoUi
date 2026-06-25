import React, { useState } from 'react';
import { Input, Space, Button } from '../../src';

const { Search } = Input;

export default () => {
  const [searchResult, setSearchResult] = useState('');

  return (
    <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
      <Search
        placeholder="输入搜索关键词"
        onSearch={(value: string) => setSearchResult(`搜索: ${value}`)}
      />
      <Search
        placeholder="带搜索按钮"
        enterButton
        onSearch={(value: string) => setSearchResult(`搜索: ${value}`)}
      />
      <Search
        placeholder="自定义按钮文字"
        enterButton="搜索"
        size="large"
        onSearch={(value: string) => setSearchResult(`搜索: ${value}`)}
      />
      {searchResult && (
        <div style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 6, fontSize: 14, color: '#333' }}>
          {searchResult}
        </div>
      )}
    </Space>
  );
};
