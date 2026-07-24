import React from 'react';
import { GlowBorder } from '../../src';

/** 自定义流光颜色 */
const ColorsExample = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder colors={['#ff4d4f', '#faad14']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        红黄渐变
      </div>
    </GlowBorder>
    <GlowBorder colors={['#52c41a', '#13c2c2', '#1677ff']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        三色流光
      </div>
    </GlowBorder>
    <GlowBorder colors={['#722ed1', '#eb2f96']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        紫粉渐变
      </div>
    </GlowBorder>
  </div>
);

export default ColorsExample;
