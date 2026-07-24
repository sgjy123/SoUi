import React from 'react';
import { Timeline, Icon } from '../../src';

/** 自定义时间轴点 */
const CustomDotExample = () => (
  <Timeline
    items={[
      {
        dot: <Icon name="CheckCorrect" size={16} style={{ color: '#52c41a' }} />,
        children: '需求确认完成',
        color: 'green',
      },
      {
        dot: <Icon name="CheckCorrect" size={16} style={{ color: '#52c41a' }} />,
        children: 'UI 设计完成',
        color: 'green',
      },
      {
        dot: <Icon name="Time" size={16} style={{ color: '#1677ff' }} />,
        children: '开发进行中',
        color: 'blue',
      },
      {
        dot: <Icon name="Attention" size={16} style={{ color: '#faad14' }} />,
        children: '待测试验收',
        color: 'gray',
      },
    ]}
  />
);

export default CustomDotExample;
