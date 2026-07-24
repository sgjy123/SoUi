import React from 'react';
import { Avatar, Icon } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>图片头像</p>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=Lily" />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>图标头像</p>
      <Avatar icon={<Icon name="User" />} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>文字头像（自动缩放）</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Avatar>U</Avatar>
        <Avatar style={{ background: '#1677ff' }}>USER</Avatar>
        <Avatar style={{ background: '#52c41a' }}>张三</Avatar>
      </div>
    </div>
  </div>
);
