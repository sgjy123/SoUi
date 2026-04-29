import React from 'react';
import Button from '../../src/components/Button';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

const Shape: React.FC = () => {
  return (
    <Space wrap>
      <Button shape="circle" aria-label="圆形按钮">
        <Icon name="Home" size={16} />
      </Button>
      <Button shape="round" type="primary">椭圆按钮</Button>
      <Button shape="round">椭圆按钮</Button>
      <Button icon="Search" type="primary">搜索</Button>
      <Button icon="Search">搜索</Button>
    </Space>
  );
};

export default Shape;
