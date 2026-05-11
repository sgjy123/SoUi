import React from 'react';
import { Typography } from '../../src';

const { Paragraph } = Typography;

export default () => (
  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
    这是一段很长的文本，用于测试省略号功能。当文本超过指定行数时，会自动显示省略号并提供展开按钮。
    这是第二行文本内容。这是第三行文本内容，应该被省略掉。
  </Paragraph>
);
