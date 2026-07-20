import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Waterfall } from '../../src';
import type { WaterfallItem } from '../../src';

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'];

let globalId = 0;

function generateItems(count: number): WaterfallItem[] {
  return Array.from({ length: count }, () => {
    globalId += 1;
    return {
      key: `item-${globalId}`,
      height: 100 + Math.floor(Math.random() * 150),
      color: colors[globalId % colors.length],
      title: `#${globalId}`,
    };
  });
}

export default () => {
  const [items, setItems] = useState<WaterfallItem[]>(() => generateItems(12));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    // 模拟网络请求
    setTimeout(() => {
      setItems((prev) => [...prev, ...generateItems(8)]);
      setLoading(false);
    }, 800);
  }, [loading]);

  // IntersectionObserver 监听哨兵元素
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <Waterfall
        columns={4}
        gutter={[12, 12]}
        items={items}
        renderItem={(item) => (
          <div
            style={{
              height: item.height,
              background: item.color,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {item.title}
          </div>
        )}
      />
      {/* 哨兵元素：进入视口时触发加载 */}
      <div ref={sentinelRef} style={{ height: 1 }} />
      {loading && (
        <div style={{ textAlign: 'center', padding: '16px 0', color: 'rgba(0,0,0,0.45)' }}>
          加载中...
        </div>
      )}
    </div>
  );
};
