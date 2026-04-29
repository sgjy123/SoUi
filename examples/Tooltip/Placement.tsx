import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Placement: React.FC = () => {
  const topPlacements = ['topLeft', 'top', 'topRight'] as const;
  const leftPlacements = ['leftTop', 'left', 'leftBottom'] as const;
  const rightPlacements = ['rightTop', 'right', 'rightBottom'] as const;
  const bottomPlacements = ['bottomLeft', 'bottom', 'bottomRight'] as const;

  return (
    <div style={{ padding: 50 }}>
      <Space direction="vertical" size="large">
        <Space>
          <span style={{ width: 80 }}></span>
          {topPlacements.map((p) => (
            <Tooltip key={p} title={p} placement={p}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 80 }}></span>
        </Space>
        <Space>
          {leftPlacements.map((p) => (
            <Tooltip key={p} title={p} placement={p}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 120 }}></span>
          {rightPlacements.map((p) => (
            <Tooltip key={p} title={p} placement={p}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
        </Space>
        <Space>
          <span style={{ width: 80 }}></span>
          {bottomPlacements.map((p) => (
            <Tooltip key={p} title={p} placement={p}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 80 }}></span>
        </Space>
      </Space>
    </div>
  );
};

export default Placement;
