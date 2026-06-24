import React from 'react';
import { Result, Button, Icon } from '../../src';

export default () => (
  <Result
    icon={<Icon name="SmilingFace" size={72} color="success" />}
    title="自定义图标"
    subTitle="您可以通过 icon 属性自定义图标"
    extra={[
      <Button key="back" type="primary">返回</Button>,
    ]}
  />
);
