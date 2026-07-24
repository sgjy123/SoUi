import React from 'react';
import { Avatar } from '../../src';

const seeds = ['Lily', 'Leo', 'Mia', 'Tom', 'Amy', 'Jack'];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>头像组</p>
      <Avatar.Group>
        {seeds.slice(0, 4).map((s) => (
          <Avatar key={s} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${s}`} />
        ))}
      </Avatar.Group>
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>maxCount 收起超出部分</p>
      <Avatar.Group maxCount={3} maxStyle={{ background: '#1677ff' }}>
        {seeds.map((s) => (
          <Avatar key={s} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${s}`} />
        ))}
      </Avatar.Group>
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>方形头像组</p>
      <Avatar.Group shape="square" maxCount={3}>
        {seeds.map((s) => (
          <Avatar key={s} style={{ background: '#52c41a' }}>{s[0]}</Avatar>
        ))}
      </Avatar.Group>
    </div>
  </div>
);
