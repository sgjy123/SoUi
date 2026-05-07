import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Style: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="绿色背景" color="#52c41a">
        <Button>自定义颜色</Button>
      </Tooltip>
      <Tooltip 
        title="无箭头" 
        arrow={false}
        overlayStyle={{ borderRadius: '8px' }}
      >
        <Button type="primary">隐藏箭头</Button>
      </Tooltip>
    </Space>
  );
};

export default Style;
