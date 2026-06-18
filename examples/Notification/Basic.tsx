import React from 'react';
import { Button, Space, Notification } from '../../src';

export default () => {
  const openNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
    Notification[type]({
      message: `Notification ${type}`,
      description: 'This is a notification message.',
    });
  };

  return (
    <Space>
      <Button onClick={() => openNotification('success')} type="primary">Success</Button>
      <Button onClick={() => openNotification('info')}>Info</Button>
      <Button onClick={() => openNotification('warning')}>Warning</Button>
      <Button onClick={() => openNotification('error')}>Error</Button>
    </Space>
  );
};
