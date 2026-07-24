import React from 'react';
import { GlowBorder } from '../../src';

/** 外发光效果 */
const GlowExample = () => (
  <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 16 }}>
    <GlowBorder glow={8} colors={['#1677ff', '#36cfc9']}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=8
      </div>
    </GlowBorder>
    <GlowBorder glow={16} colors={['#722ed1', '#eb2f96']} borderWidth={3}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=16
      </div>
    </GlowBorder>
    <GlowBorder glow={24} colors={['#ff4d4f', '#faad14']} borderWidth={4} radius={20}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        glow=24
      </div>
    </GlowBorder>
  </div>
);

export default GlowExample;
