import React from 'react';
import { Button, Space, Message } from '../../src';

const Basic: React.FC = () => {
  const showMessage = (type: 'success' | 'info' | 'warning' | 'error') => {
    const messages = {
      success: '操作成功完成！',
      info: '这是一条普通信息提示。',
      warning: '请注意，这是一条警告提示！',
      error: '操作失败，请稍后重试。',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Message as any)[type](messages[type]);
  };

  return (
    <Space>
      <Button type="primary" onClick={() => showMessage('success')}>成功</Button>
      <Button onClick={() => showMessage('info')}>信息</Button>
      <Button onClick={() => showMessage('warning')}>警告</Button>
      <Button danger onClick={() => showMessage('error')}>错误</Button>
    </Space>
  );
};

export default Basic;
