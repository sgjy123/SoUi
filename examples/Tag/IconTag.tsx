import React from 'react';
import { Tag, Icon, Space } from '../../src';

export default () => (
  <Space wrap>
    <Tag icon={<Icon name="Twitter" size={12} />} color="#55acee">
      Twitter
    </Tag>
    <Tag icon={<Icon name="Youtube" size={12} />} color="#cd201f">
      Youtube
    </Tag>
    <Tag icon={<Icon name="Github" size={12} />}>
      GitHub
    </Tag>
    <Tag icon={<Icon name="Time" size={12} />} color="processing">
      运行中
    </Tag>
    <Tag icon={<Icon name="CheckOne" size={12} />} color="success">
      已完成
    </Tag>
  </Space>
);
