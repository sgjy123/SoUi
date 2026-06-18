import React from 'react';
import { Button, Space, Message } from '../../src';

const Duration: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button
          onClick={() => {
            Message.info('这条消息将在 1 秒后关闭', 1);
          }}
        >
          1 秒关闭
        </Button>
        <Button
          onClick={() => {
            Message.info('这条消息将在 5 秒后关闭', 5);
          }}
        >
          5 秒关闭
        </Button>
        <Button
          onClick={() => {
            Message.info('这条消息不会自动关闭（duration=0）', 0);
          }}
        >
          不自动关闭
        </Button>
      </Space>
    </Space>
  );
};

export default Duration;
