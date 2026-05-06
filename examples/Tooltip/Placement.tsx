import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

import type { TooltipPlacement } from '../../src/components/Tooltip';

const Placement: React.FC = () => {
  const placements: TooltipPlacement[] = [
    'top', 'topLeft', 'topRight',
    'left', 'right',
    'bottom', 'bottomLeft', 'bottomRight',
  ];

  return (
    <Space wrap direction="vertical" style={{ width: '100%' }}>
      <Space wrap>
        {placements.map((placement) => (
          <Tooltip key={placement} title={`位置: ${placement}`} placement={placement}>
            <Button>{placement}</Button>
          </Tooltip>
        ))}
      </Space>
    </Space>
  );
};

export default Placement;
