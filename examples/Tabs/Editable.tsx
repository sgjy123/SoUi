import React, { useState, useRef } from 'react';
import { Tabs } from '../../src';
import type { TabItem, EditAction } from '../../src';

const initialItems: TabItem[] = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => {
  const [items, setItems] = useState<TabItem[]>(initialItems);
  const [activeKey, setActiveKey] = useState('1');
  const newTabIndex = useRef(4);

  const onEdit = (targetKey: string | React.MouseEvent, action: EditAction) => {
    if (action === 'add') {
      const key = String(newTabIndex.current++);
      setItems((prev) => [
        ...prev,
        { key, label: `新标签 ${key}`, children: <div style={{ padding: 24 }}>新标签 {key} 的内容</div> },
      ]);
      setActiveKey(key);
    } else {
      const key = targetKey as string;
      const newItems = items.filter((item) => item.key !== key);
      if (activeKey === key && newItems.length > 0) {
        const index = items.findIndex((item) => item.key === key);
        const nextKey = newItems[Math.min(index, newItems.length - 1)].key;
        setActiveKey(nextKey);
      }
      setItems(newItems);
    }
  };

  return (
    <Tabs
      type="editable-card"
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
};
