import React from 'react';
import { Popconfirm, Button, Space, Icon } from '../../src';

export default () => (
  <Space direction="vertical" size={16}>
    <Popconfirm
      title="确认删除"
      description="删除后将无法恢复，请确认是否继续？"
    >
      <Button danger>带描述的确认框</Button>
    </Popconfirm>

    <Popconfirm
      title="自定义图标"
      icon={<Icon name="Info" size={16} style={{ color: '#1677ff' }} />}
    >
      <Button>自定义图标</Button>
    </Popconfirm>

    <Popconfirm
      title="危险操作"
      description="此操作将永久删除所有数据！"
      icon={<Icon name="CloseOne" size={16} style={{ color: '#ff4d4f' }} />}
      okText="删除"
      okButtonProps={{ danger: true } as any}
    >
      <Button danger>危险操作确认</Button>
    </Popconfirm>

    <Popconfirm
      title="仅确认（无取消按钮）"
      showCancel={false}
      okText="我知道了"
    >
      <Button>仅确认按钮</Button>
    </Popconfirm>
  </Space>
);
