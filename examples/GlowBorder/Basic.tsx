import React from 'react';
import { GlowBorder } from '../../src';

/** 基础用法 */
const BasicExample = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <GlowBorder>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        流光边框
      </div>
    </GlowBorder>
    <GlowBorder borderWidth={3} radius={16}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        更粗边框 + 更大圆角
      </div>
    </GlowBorder>
  </div>
);

export default BasicExample;
