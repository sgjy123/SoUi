import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import type { TransferKey } from '../../src/components/Transfer';

const mockData = Array.from({ length: 30 }).map((_, i) => ({
  key: i.toString(),
  title: `项目 ${i + 1}`,
  description: `项目 ${i + 1} 的详细描述信息`,
  disabled: i % 7 === 0,
}));

const Search: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>(['5', '6', '7']);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const filterOption = (inputValue: string, item: any) => {
    return item.title.includes(inputValue) || item.description.includes(inputValue);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      showSearch
      filterOption={filterOption}
      render={(item) => `${item.title} - ${item.description}`}
    />
  );
};

export default Search;
