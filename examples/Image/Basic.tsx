import React from 'react';
import { Image, Space } from '../../src';

export default () => (
  <Space size={16}>
    <Image src="https://picsum.photos/200/200?random=1" width={200} height={200} alt="示例图片" />
    <Image src="https://picsum.photos/200/200?random=2" width={200} height={200} alt="示例图片" />
  </Space>
);
