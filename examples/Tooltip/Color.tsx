import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Color: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="成功提示" color="#fff" bgColor="#52c41a">
        <Button type="primary">成功</Button>
      </Tooltip>
      <Tooltip title="警告提示" color="#fff" bgColor="#faad14">
        <Button type="primary">警告</Button>
      </Tooltip>
      <Tooltip title="错误提示" color="#fff" bgColor="#ff4d4f">
        <Button type="primary">错误</Button>
      </Tooltip>
      <Tooltip title="信息提示" color="#fff" bgColor="#1677ff">
        <Button type="primary">信息</Button>
      </Tooltip>
    </Space>
  );
};

export default Color;