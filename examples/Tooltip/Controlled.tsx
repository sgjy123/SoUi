import React, { useState } from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Controlled: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Space direction="vertical">
      <Tooltip
        title="受控模式的提示"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button onClick={() => setVisible(!visible)}>
          {visible ? '隐藏' : '显示'}提示框
        </Button>
      </Tooltip>
    </Space>
  );
};

export default Controlled;
