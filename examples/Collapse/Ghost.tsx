import React from 'react';
import { Collapse } from '../../src';

export default () => (
  <Collapse ghost defaultActiveKey={['1']}>
    <Collapse.Panel key="1" header="无边框面板一">
      ghost 模式去除边框和背景，适合嵌入其他容器。
    </Collapse.Panel>
    <Collapse.Panel key="2" header="无边框面板二">
      内容区域无左侧缩进。
    </Collapse.Panel>
  </Collapse>
);
