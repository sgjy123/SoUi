import React from 'react';
import { Avatar, Icon } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>预设尺寸 large / middle / small</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar size="large" icon={<Icon name="User" />} />
        <Avatar size="middle" icon={<Icon name="User" />} />
        <Avatar size="small" icon={<Icon name="User" />} />
      </div>
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义像素尺寸</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar size={24}>U</Avatar>
        <Avatar size={40}>U</Avatar>
        <Avatar size={64}>U</Avatar>
        <Avatar size={80} src="https://api.dicebear.com/7.x/miniavs/svg?seed=Mia" />
      </div>
    </div>
  </div>
);
