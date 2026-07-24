import React from 'react';
import { GlowBorder } from '../../src';

/** 深色背景与透明背景 */
const BackgroundExample = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 16, background: '#141414', borderRadius: 8 }}>
    <GlowBorder background="#1f1f1f" colors={['#1677ff', '#36cfc9']} borderWidth={2}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        深色背景
      </div>
    </GlowBorder>
    <GlowBorder background="transparent" colors={['#722ed1', '#eb2f96']} borderWidth={2}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        透明背景
      </div>
    </GlowBorder>
    <GlowBorder background="#1f1f1f" colors={['#ff4d4f', '#faad14']} borderWidth={2} glow={12}>
      <div style={{ padding: '24px 40px', textAlign: 'center', color: '#fff' }}>
        深色 + 外发光
      </div>
    </GlowBorder>
  </div>
);

export default BackgroundExample;
