import React from 'react';
import { Waterfall } from '../../src';
import type { WaterfallItem } from '../../src';

// 模拟图片画廊数据（使用纯色块模拟不同高度的图片）
const galleryItems: WaterfallItem[] = [
  { key: 'img-1', height: 200, color: '#667eea', label: '风景' },
  { key: 'img-2', height: 150, color: '#f093fb', label: '人物' },
  { key: 'img-3', height: 260, color: '#4facfe', label: '建筑' },
  { key: 'img-4', height: 180, color: '#43e97b', label: '自然' },
  { key: 'img-5', height: 220, color: '#fa709a', label: '美食' },
  { key: 'img-6', height: 140, color: '#a18cd1', label: '动物' },
  { key: 'img-7', height: 190, color: '#fccb90', label: '旅行' },
  { key: 'img-8', height: 240, color: '#96e6a1', label: '城市' },
  { key: 'img-9', height: 160, color: '#d4fc79', label: '花卉' },
  { key: 'img-10', height: 210, color: '#84fab0', label: '海洋' },
  { key: 'img-11', height: 170, color: '#cfd9df', label: '山脉' },
  { key: 'img-12', height: 230, color: '#f6d365', label: '日落' },
];

export default () => (
  <Waterfall
    columns={4}
    gutter={[12, 12]}
    items={galleryItems}
    renderItem={(item) => (
      <div
        style={{
          height: item.height,
          background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700 }}>{item.label}</span>
        <span style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>{item.height}px</span>
      </div>
    )}
  />
);
