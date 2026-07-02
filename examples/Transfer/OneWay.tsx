import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import type { TransferKey } from '../../src/components/Transfer';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: i.toString(),
  title: `功能 ${i + 1}`,
  description: `功能 ${i + 1} 的说明`,
  disabled: i === 0,
}));

const OneWay: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>(['2', '3']);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['可选功能', '已选功能']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      oneWay
      render={(item) => item.title}
    />
  );
};

export default OneWay;
