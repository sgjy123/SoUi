import React from 'react';
import { Button, Space, Message } from '../../src';

const Types: React.FC = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Button
          type="primary"
          onClick={() => {
            Message.open({
              content: (
                <span>
                  这是一条使用 <strong>open</strong> 方法打开的自定义消息，
                  支持传入 <strong>ReactNode</strong> 作为内容。
                </span>
              ),
              type: 'success',
              duration: 5,
            });
          }}
        >
          自定义内容
        </Button>
        <Button
          onClick={() => {
            Message.open({
              content: '带自定义图标的消息',
              type: 'info',
              icon: <span style={{ color: '#1677ff', fontSize: 16 }}>★</span>,
            });
          }}
        >
          自定义图标
        </Button>
      </Space>
    </Space>
  );
};

export default Types;
