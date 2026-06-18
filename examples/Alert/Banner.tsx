import React from 'react';
import { Alert } from '../../src';

export default () => (
  <div>
    <Alert message="Banner 模式提示" type="info" banner />
    <div style={{ height: 8 }} />
    <Alert message="Banner 警告模式" description="这是一个 banner 模式的警告提示，默认去掉左右边框和圆角。" type="warning" banner showIcon />
  </div>
);
