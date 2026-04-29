import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';

const Basic: React.FC = () => {
  return (
    <Tooltip title="这是提示文字">
      <Button type="primary">悬停显示提示</Button>
    </Tooltip>
  );
};

export default Basic;
