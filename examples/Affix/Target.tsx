import React from 'react';
import { Affix, Button } from '../../src';

export default () => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      style={{
        width: '100%',
        height: 100,
        overflow: 'auto',
        boxShadow: '0 0 0 1px #1677ff',
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
      }}
    >
      <div style={{ width: '100%', height: 1000 }}>
        <Affix offsetTop={20} target={() => container || window}>
          <Button type="primary">固定在容器顶部</Button>
        </Affix>
      </div>
    </div>
  );
};
