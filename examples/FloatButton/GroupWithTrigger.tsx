import React from 'react';
import { FloatButton } from '../../src';

export default () => (
  <FloatButton.Group
    icon="Plus"
    tooltip="快捷操作"
  >
    <FloatButton icon="Edit" />
    <FloatButton icon="Copy" />
    <FloatButton icon="Share" />
  </FloatButton.Group>
);
