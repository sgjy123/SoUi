import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Destroy: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="关闭后不销毁 DOM" destroyOnHidden={false}>
        <Button>不销毁（默认）</Button>
      </Tooltip>
      <Tooltip title="关闭后销毁 DOM" destroyOnHidden>
        <Button type="primary">销毁 DOM</Button>
      </Tooltip>
    </Space>
  );
};

export default Destroy;
