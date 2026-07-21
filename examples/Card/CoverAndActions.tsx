import React from 'react';
import { Card, Icon } from '../../src';

export default () => (
  <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <div
        style={{
          height: 160,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 32,
        }}
      >
        <Icon name="Picture" size={48} />
      </div>
    }
    actions={[
      <Icon name="Setting" size={16} key="setting" />,
      <Icon name="Edit" size={16} key="edit" />,
      <Icon name="Share" size={16} key="share" />,
    ]}
  >
    <Card.Meta
      avatar={
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#1677ff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          S
        </div>
      }
      title="SoUi 组件库"
      description="现代化 React UI 组件库，提供丰富的企业级组件。"
    />
  </Card>
);
