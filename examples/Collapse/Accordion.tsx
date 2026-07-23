import React from 'react';
import { Collapse } from '../../src';

export default () => (
  <Collapse accordion>
    <Collapse.Panel key="1" header="手风琴面板一">
      同时只能展开一个面板。
    </Collapse.Panel>
    <Collapse.Panel key="2" header="手风琴面板二">
      点击其他面板时当前面板会自动收起。
    </Collapse.Panel>
    <Collapse.Panel key="3" header="手风琴面板三">
      适合信息分组展示的场景。
    </Collapse.Panel>
  </Collapse>
);
