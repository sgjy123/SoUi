import React from 'react';
import Empty from '../../src/components/Empty';
import Button from '../../src/components/Button';

const WithAction: React.FC = () => {
  return (
    <Empty
      description="暂无数据，请添加内容"
    >
      <Button type="primary">立即添加</Button>
    </Empty>
  );
};

export default WithAction;
