import React from 'react';
import { Input } from '../../src';

const SearchInput: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input.Search placeholder="搜索..." onSearch={(val) => alert(`搜索: ${val}`)} />
    <Input.Search
      placeholder="带按钮搜索"
      enterButton="搜索"
      onSearch={(val) => alert(`搜索: ${val}`)}
    />
    <Input.Search
      placeholder="加载状态"
      enterButton="搜索"
      loading
      onSearch={(val) => alert(`搜索: ${val}`)}
    />
  </div>
);

export default SearchInput;
