import React, { useState, useCallback } from 'react';
import { InfiniteList, Avatar } from '../../src';

/** 自定义列表项：带头像的联系人列表 */
const CustomItemExample = () => {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];
  const [data, setData] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      email: `user${i + 1}@example.com`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: data.length + i + 1,
        name: names[(data.length + i) % names.length],
        email: `user${data.length + i + 1}@example.com`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 50) {
        setHasMore(false);
      }
    }, 800);
  }, [data.length]);

  return (
    <InfiniteList
      dataSource={data}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
      height={320}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar>{item.name.charAt(0)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{item.name}</div>
            <div style={{ color: '#888', fontSize: 13 }}>{item.email}</div>
          </div>
        </div>
      )}
    />
  );
};

export default CustomItemExample;
