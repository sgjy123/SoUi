import React from 'react';
import Watermark from '../../src/components/Watermark';

const CustomStyleWatermark: React.FC = () => {
  return (
    <Watermark
      content="SoUi Watermark"
      fontColor="rgba(255, 0, 0, 0.3)"
      fontSize={20}
      fontWeight="bold"
      rotate={-45}
      gapX={150}
      gapY={150}
      opacity={0.3}
    />
  );
};

export default CustomStyleWatermark;