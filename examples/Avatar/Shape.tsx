import React from 'react';
import { Avatar, Icon } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>圆形（默认）</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Avatar shape="circle" src="https://api.dicebear.com/7.x/miniavs/svg?seed=Leo" />
        <Avatar shape="circle" icon={<Icon name="User" />} />
        <Avatar shape="circle">U</Avatar>
      </div>
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>方形</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=Leo" />
        <Avatar shape="square" icon={<Icon name="User" />} />
        <Avatar shape="square">U</Avatar>
      </div>
    </div>
  </div>
);
