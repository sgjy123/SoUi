import React, { useState, useCallback } from 'react';
import { InfiniteList, ConfigProvider } from '../../src';

/** 主题定制 */
const ThemeExample = () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      text: `主题定制项 #${i + 1}`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 5 }, (_, i) => ({
        id: data.length + i + 1,
        text: `主题定制项 #${data.length + i + 1}`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 25) {
        setHasMore(false);
      }
    }, 800);
  }, [data.length]);

  return (
    <ConfigProvider
      theme={{
        components: {
          InfiniteList: {
            colorBg: '#f6f8fa',
            colorBorder: '#d0d7de',
            itemHoverBg: '#eaeef2',
            borderRadius: 12,
          },
        },
      }}
    >
      <InfiniteList
        dataSource={data}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        height={280}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <div style={{ fontWeight: 500 }}>{item.text}</div>
        )}
      />
    </ConfigProvider>
  );
};

export default ThemeExample;
