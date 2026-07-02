import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import type { TransferKey } from '../../src/components/Transfer';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `内容 ${i + 1}`,
  description: `这是第 ${i + 1} 项的描述`,
  disabled: i % 6 === 0,
}));

const Basic: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>(['3', '4', '5']);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[], direction: string, moveKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={(item) => item.title}
    />
  );
};

export default Basic;
