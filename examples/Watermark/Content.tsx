import React from 'react';
import Watermark from '../../src/components/Watermark';

const ContentWatermark: React.FC = () => {
  return (
    <Watermark content="SoUi Watermark">
      <div style={{ padding: 24 }}>
        <h2>被水印覆盖的内容</h2>
        <p>水印会覆盖在内容上方，但不影响内容的交互。</p>
        <button onClick={() => alert('点击成功')}>可点击的按钮</button>
      </div>
    </Watermark>
  );
};

export default ContentWatermark;