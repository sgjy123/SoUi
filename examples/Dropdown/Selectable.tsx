import React, { useState } from 'react';
import { Dropdown, Button } from '../../src';

const items = [
  { key: 'align-left', label: '左对齐' },
  { key: 'align-center', label: '居中对齐' },
  { key: 'align-right', label: '右对齐' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['align-center']);

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys,
        onClick: ({ key }) => setSelectedKeys([key]),
      }}
      trigger={['click']}
    >
      <Button>对齐方式：{selectedKeys[0]?.replace('align-', '')}</Button>
    </Dropdown>
  );
};
