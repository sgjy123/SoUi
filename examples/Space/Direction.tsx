import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Direction: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>水平方向（默认）</h4>
        <Space direction="horizontal">
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>垂直方向</h4>
        <Space direction="vertical">
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </div>
    </div>
  );
};

export default Direction;
