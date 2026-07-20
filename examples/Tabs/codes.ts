// Tabs 示例代码字符串（react-live fallback）
export const basicCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
  ];
  return <Tabs items={items} />;
}`;

export const cardCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>卡片式标签一</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>卡片式标签二</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>卡片式标签三</div> },
  ];
  return <Tabs type="card" items={items} />;
}`;

export const positionCode = `() => {
  const [position, setPosition] = useState('top');
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24, minHeight: 100 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24, minHeight: 100 }}>标签二的内容</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24, minHeight: 100 }}>标签三的内容</div> },
  ];
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
        <Radio.Button value="top">top</Radio.Button>
        <Radio.Button value="bottom">bottom</Radio.Button>
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <Tabs tabPosition={position} items={items} />
    </Space>
  );
}`;

export const sizeCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 16 }}>内容一</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 16 }}>内容二</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 16 }}>内容三</div> },
  ];
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs size="small" items={items} />
      <Tabs size="middle" items={items} />
      <Tabs size="large" items={items} />
    </Space>
  );
}`;

export const extraCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
  ];
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs items={items} tabBarExtraContent={<Button type="primary" size="small">操作按钮</Button>} />
      <Tabs items={items} tabBarExtraContent={{ left: <Button size="small">左侧</Button>, right: <Button size="small">右侧</Button> }} />
    </Space>
  );
}`;

export const controlledCode = `() => {
  const [activeKey, setActiveKey] = useState('1');
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
    { key: '3', label: '标签三', disabled: true, children: <div style={{ padding: 24 }}>标签三（禁用）</div> },
  ];
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space>
        <Button size="small" onClick={() => setActiveKey('1')}>激活标签一</Button>
        <Button size="small" onClick={() => setActiveKey('2')}>激活标签二</Button>
      </Space>
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
    </Space>
  );
}`;

export const iconCode = `() => {
  const items = [
    { key: '1', label: '首页', icon: <Icon name="Home" size={16} />, children: <div style={{ padding: 24 }}>首页内容</div> },
    { key: '2', label: '设置', icon: <Icon name="Setting" size={16} />, children: <div style={{ padding: 24 }}>设置内容</div> },
    { key: '3', label: '消息', icon: <Icon name="Mail" size={16} />, children: <div style={{ padding: 24 }}>消息内容</div> },
  ];
  return <Tabs items={items} centered />;
}`;

export const themeCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>自定义主题标签一</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>自定义主题标签二</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>自定义主题标签三</div> },
  ];
  return (
    <ConfigProvider theme={{ primaryColor: '#722ed1', components: { Tabs: { colorPrimary: '#722ed1', fontSize: 15, borderRadius: 8, cardBg: '#f9f0ff' } } }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Tabs items={items} />
        <Tabs type="card" items={items} />
      </div>
    </ConfigProvider>
  );
}`;

export const editableCode = `() => {
  const [items, setItems] = useState([
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
  ]);
  const [activeKey, setActiveKey] = useState('1');
  const idx = React.useRef(4);

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      const key = String(idx.current++);
      setItems((prev) => [...prev, { key, label: '新标签 ' + key, children: <div style={{ padding: 24 }}>新标签 {key}</div> }]);
      setActiveKey(key);
    } else {
      const newItems = items.filter((item) => item.key !== targetKey);
      if (activeKey === targetKey && newItems.length > 0) {
        const index = items.findIndex((item) => item.key === targetKey);
        setActiveKey(newItems[Math.min(index, newItems.length - 1)].key);
      }
      setItems(newItems);
    }
  };

  return <Tabs type="editable-card" items={items} activeKey={activeKey} onChange={setActiveKey} onEdit={onEdit} />;
}`;

export const gutterCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 16 }}>内容一</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 16 }}>内容二</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 16 }}>内容三</div> },
    { key: '4', label: '标签四', children: <div style={{ padding: 16 }}>内容四</div> },
  ];
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs items={items} tabBarGutter={0} />
      <Tabs items={items} tabBarGutter={24} />
      <Tabs items={items} tabBarGutter={48} type="card" />
    </Space>
  );
}`;

export const destroyAndStyleCode = `() => {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
  ];
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs items={items} destroyInactiveTabPane />
      <Tabs type="card" items={items} tabBarStyle={{ background: '#fafafa', padding: '4px 8px 0', borderRadius: 6 }} />
    </Space>
  );
}`;

export const scrollCode = `() => {
  const items = Array.from({ length: 15 }, (_, i) => ({
    key: String(i + 1),
    label: '标签 ' + (i + 1),
    children: <div style={{ padding: 24 }}>标签 {i + 1} 的内容</div>,
  }));
  return <Tabs items={items} />;
}`;
