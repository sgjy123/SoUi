import React from 'react';
import { Badge, Space, Icon } from '../../src';

const avatarStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 8,
  background: '#e6f4ff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default () => (
  <Space size={32}>
    <Badge count={5}>
      <span style={avatarStyle}>
        <Icon name="Message" size={20} color="primary" />
      </span>
    </Badge>
    <Badge count={0} showZero>
      <span style={avatarStyle}>
        <Icon name="Mail" size={20} color="primary" />
      </span>
    </Badge>
    <Badge count={<Icon name="Time" size={14} fill="#fff" />}>
      <span style={avatarStyle}>
        <Icon name="Remind" size={20} color="primary" />
      </span>
    </Badge>
  </Space>
);
