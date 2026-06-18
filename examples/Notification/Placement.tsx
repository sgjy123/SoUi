import React from 'react';
import { Button, Space, Notification } from '../../src';

export default () => {
  const openNotification = (placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    Notification.open({
      message: `Placement ${placement}`,
      description: 'This notification appears in the specified position.',
      placement,
    });
  };

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => openNotification('topLeft')}>Top Left</Button>
        <Button onClick={() => openNotification('topRight')}>Top Right</Button>
      </Space>
      <Space>
        <Button onClick={() => openNotification('bottomLeft')}>Bottom Left</Button>
        <Button onClick={() => openNotification('bottomRight')}>Bottom Right</Button>
      </Space>
    </Space>
  );
};
