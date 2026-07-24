import React, { useState } from 'react';
import { Avatar, Icon } from '../../src';

export default () => {
  const [src, setSrc] = useState('https://invalid.example.com/broken.png');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          图片加载失败回退到文字 / 图标
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Avatar src={src}>FB</Avatar>
          <Avatar src={src} icon={<Icon name="User" />} />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          onError 返回 false 阻止默认回退
        </p>
        <Avatar
          src={src}
          onError={() => {
            setSrc('https://api.dicebear.com/7.x/miniavs/svg?seed=Fixed');
            return false;
          }}
        >
          FB
        </Avatar>
      </div>
    </div>
  );
};
