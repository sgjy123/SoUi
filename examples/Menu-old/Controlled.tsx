import React, { useState } from 'react';
import { Menu, Space } from '../../src';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [openKeys, setOpenKeys] = useState<string[]>(['2']);

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>当前选中: {selectedKeys.join(', ')}</div>
        <div>当前展开: {openKeys.join(', ')}</div>
        
        <Menu
          mode="vertical"
          theme="light"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={({ key }) => setSelectedKeys([key])}
          onOpenChange={(keys) => setOpenKeys(keys)}
        >
          <Menu.Item key="1" label="首页" icon="Home" />
          <Menu.SubMenu key="2" title="产品管理" icon="Apps">
            <Menu.Item key="2-1" label="产品列表" />
            <Menu.Item key="2-2" label="产品分类" />
            <Menu.Item key="2-3" label="产品标签" />
          </Menu.SubMenu>
          <Menu.SubMenu key="3" title="订单管理" icon="FileText">
            <Menu.Item key="3-1" label="订单列表" />
            <Menu.Item key="3-2" label="退款管理" />
          </Menu.SubMenu>
          <Menu.Item key="4" label="数据统计" icon="ChartBar" />
        </Menu>
      </Space>
    </div>
  );
};
