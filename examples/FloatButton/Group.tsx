import React from 'react';
import { FloatButton } from '../../src';

export default () => (
  <FloatButton.Group vertical>
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
  </FloatButton.Group>
);
