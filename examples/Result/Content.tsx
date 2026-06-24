import React from 'react';
import { Result, Button, Typography } from '../../src';

const { Paragraph } = Typography;

export default () => (
  <Result
    status="info"
    title="您需要完成以下步骤"
    extra={[
      <Button key="primary" type="primary">开始操作</Button>,
    ]}
  >
    <Paragraph>
      1. 首先，您需要完善个人资料信息。
    </Paragraph>
    <Paragraph>
      2. 然后，完成身份验证流程。
    </Paragraph>
    <Paragraph>
      3. 最后，设置您的偏好选项。
    </Paragraph>
  </Result>
);
