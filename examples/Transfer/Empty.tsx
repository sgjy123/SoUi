import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import type { TransferKey } from '../../src/components/Transfer';

const Empty: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[], direction: string, moveKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Transfer
      dataSource={[]}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
    />
  );
};

export default Empty;
