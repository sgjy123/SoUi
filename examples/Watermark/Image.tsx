import React from 'react';
import Watermark from '../../src/components/Watermark';

const ImageWatermark: React.FC = () => {
  return (
    <Watermark
      image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-41d9-bbf3-fef0f6723923.svg"
      width={64}
      height={64}
    />
  );
};

export default ImageWatermark;