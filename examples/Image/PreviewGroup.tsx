import React from 'react';
import { Image, Space } from '../../src';

export default () => (
  <Image.PreviewGroup>
    <Space size={16}>
      <Image src="https://picsum.photos/200/200?random=4" width={120} height={120} alt="图片 1" />
      <Image src="https://picsum.photos/200/200?random=5" width={120} height={120} alt="图片 2" />
      <Image src="https://picsum.photos/200/200?random=6" width={120} height={120} alt="图片 3" />
    </Space>
  </Image.PreviewGroup>
);
