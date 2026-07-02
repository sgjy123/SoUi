import React, { useState } from 'react';
import Transfer from '../../src/components/Transfer';
import ConfigProvider from '../../src/components/ConfigProvider';
import type { TransferKey } from '../../src/components/Transfer';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: i.toString(),
  title: `项目 ${i + 1}`,
  description: `描述 ${i + 1}`,
  disabled: i % 5 === 0,
}));

const ThemeConfig: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferKey[]>(['2', '3', '4']);
  const [selectedKeys, setSelectedKeys] = useState<TransferKey[]>([]);

  const onChange = (nextTargetKeys: TransferKey[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: TransferKey[], targetSelectedKeys: TransferKey[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <ConfigProvider
        theme={{
          primaryColor: '#722ed1',
          primaryHoverColor: '#9254de',
          components: {
            Transfer: {
              borderRadius: 8,
              colorPrimary: '#722ed1',
              colorPrimaryHover: '#9254de',
              headerBg: '#f9f0ff',
              itemActiveBg: 'rgba(114, 46, 209, 0.08)',
            },
          },
        }}
      >
        <Transfer
          dataSource={mockData}
          titles={['紫色主题 - 源', '紫色主题 - 目标']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          showSearch
          render={(item) => item.title}
        />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          primaryColor: '#13c2c2',
          primaryHoverColor: '#36cfc9',
          components: {
            Transfer: {
              borderRadius: 10,
              colorPrimary: '#13c2c2',
              colorPrimaryHover: '#36cfc9',
              headerBg: '#e6fffb',
              itemActiveBg: 'rgba(19, 194, 194, 0.08)',
            },
          },
        }}
      >
        <Transfer
          dataSource={mockData}
          titles={['青色主题 - 源', '青色主题 - 目标']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          render={(item) => item.title}
        />
      </ConfigProvider>
    </div>
  );
};

export default ThemeConfig;
