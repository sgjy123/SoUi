import React from 'react';
import { Collapse } from '../../src';

export default () => (
  <Collapse defaultActiveKey={['1']}>
    <Collapse.Panel key="1" header="面板标题一">
      这是第一个面板的内容。可以放置任意 React 节点。
    </Collapse.Panel>
    <Collapse.Panel key="2" header="面板标题二">
      这是第二个面板的内容。
    </Collapse.Panel>
    <Collapse.Panel key="3" header="面板标题三" disabled>
      这是被禁用的面板。
    </Collapse.Panel>
  </Collapse>
);
