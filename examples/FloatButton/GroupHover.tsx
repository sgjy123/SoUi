import React from 'react';
import { FloatButton } from '../../src';

export default () => (
  <FloatButton.Group
    trigger="hover"
    icon="More"
    tooltip="更多操作（悬停展开）"
  >
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
    <FloatButton icon="Download" tooltip="下载" />
  </FloatButton.Group>
);
