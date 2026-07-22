import React from 'react';
import { Image } from '../../src';

export default () => (
  <Image
    src="https://invalid-url.example/broken.png"
    fallback="https://picsum.photos/200/200?random=3"
    width={200}
    height={200}
    alt="加载失败示例"
  />
);
