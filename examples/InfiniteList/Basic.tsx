import React, { useState, useCallback } from 'react';
import { InfiniteList } from '../../src';

/** 基础用法：无限加载列表 */
const BasicExample = () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `列表项 #${i + 1}`,
      description: `这是第 ${i + 1} 条数据的描述内容。`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: data.length + i + 1,
        title: `列表项 #${data.length + i + 1}`,
        description: `这是第 ${data.length + i + 1} 条数据的描述内容。`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 50) {
        setHasMore(false);
      }
    }, 1000);
  }, [data.length]);

  return (
    <InfiniteList
      dataSource={data}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
      height={300}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{item.description}</div>
        </div>
      )}
    />
  );
};

export default BasicExample;
