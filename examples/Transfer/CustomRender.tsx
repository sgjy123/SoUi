import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import type { TransferKey } from '../../src/components/Transfer';

const mockData = Array.from({ length: 12 }).map((_, i) => ({
  key: i.toString(),
  title: `用户 ${i + 1}`,
  description: ['管理员', '编辑者', '观察者', '访客'][i % 4],
  disabled: i === 0,
}));

const CustomRender: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>(['1', '2']);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const render = (item: any) => ({
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: `hsl(${(parseInt(item.key) * 47) % 360}, 60%, 70%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {item.title.slice(-1)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500 }}>{item.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{item.description}</div>
        </div>
      </div>
    ),
    value: item.title,
  });

  return (
    <Transfer
      dataSource={mockData}
      titles={['待分配', '已分配']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      showSearch
      render={render}
      listStyle={{ width: 280, height: 360 }}
    />
  );
};

export default CustomRender;
