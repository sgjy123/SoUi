import React from 'react';
import { GlowBorder } from '../../src';

/** 旋转速度与方向 */
const DurationExample = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder duration={1}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        快速（1s）
      </div>
    </GlowBorder>
    <GlowBorder duration={6}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        慢速（6s）
      </div>
    </GlowBorder>
    <GlowBorder reverse>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        反向旋转
      </div>
    </GlowBorder>
    <GlowBorder paused>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        暂停动画
      </div>
    </GlowBorder>
  </div>
);

export default DurationExample;
