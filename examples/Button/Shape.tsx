import React from 'react';
import { Button, Space, Icon } from '../../src';

export default () => (
  <Space wrap>
    <Button shape="circle" aria-label="圆形按钮">
      <Icon name="Home" size={16} />
    </Button>
    <Button shape="round" type="primary">椭圆按钮</Button>
    <Button shape="round">椭圆按钮</Button>
    <Button icon={<Icon name="Search" />} type="primary">搜索</Button>
    <Button icon={<Icon name="Search" />}>搜索</Button>
  </Space>
);
