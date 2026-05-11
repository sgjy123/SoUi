import React from 'react';
import { Icon, Space } from '../../src';

export default () => (
  <Space wrap>
    <Icon name="CheckCircle" color="primary" />
    <Icon name="InfoCircle" color="success" />
    <Icon name="ExclamationCircle" color="warning" />
    <Icon name="CloseCircle" color="error" />
    <Icon name="QuestionCircle" color="info" />
  </Space>
);
