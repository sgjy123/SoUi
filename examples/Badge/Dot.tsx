import React from 'react';
import { Badge, Space, Icon } from '../../src';

export default () => (
  <Space size={32}>
    <Badge dot>
      <Icon name="Remind" size={20} />
    </Badge>
    <Badge dot>
      <a href="#" style={{ fontSize: 14 }}>
        消息通知
      </a>
    </Badge>
  </Space>
);
