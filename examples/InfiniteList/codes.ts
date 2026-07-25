export const basicCode = `const [data, setData] = useState(() =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: \`列表项 #\${i + 1}\`,
    description: \`这是第 \${i + 1} 条数据的描述内容。\`,
  })),
);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMore = () => {
  setLoading(true);
  setTimeout(() => {
    const newData = Array.from({ length: 10 }, (_, i) => ({
      id: data.length + i + 1,
      title: \`列表项 #\${data.length + i + 1}\`,
      description: \`这是第 \${data.length + i + 1} 条数据的描述内容。\`,
    }));
    setData((prev) => [...prev, ...newData]);
    setLoading(false);
    if (data.length + newData.length >= 50) setHasMore(false);
  }, 1000);
};

<InfiniteList
  dataSource={data}
  loading={loading}
  hasMore={hasMore}
  onLoadMore={loadMore}
  height={300}
  keyExtractor={(item) => item.id}
  renderItem={(item) => (
    <div>
      <div style={{ fontWeight: 600 }}>{item.title}</div>
      <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{item.description}</div>
    </div>
  )}
/>`;

export const customItemCode = `const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];
const [data, setData] = useState(() =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: \`user\${i + 1}@example.com\`,
  })),
);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMore = () => {
  setLoading(true);
  setTimeout(() => {
    const newData = Array.from({ length: 10 }, (_, i) => ({
      id: data.length + i + 1,
      name: names[(data.length + i) % names.length],
      email: \`user\${data.length + i + 1}@example.com\`,
    }));
    setData((prev) => [...prev, ...newData]);
    setLoading(false);
    if (data.length + newData.length >= 50) setHasMore(false);
  }, 800);
};

<InfiniteList
  dataSource={data}
  loading={loading}
  hasMore={hasMore}
  onLoadMore={loadMore}
  height={320}
  keyExtractor={(item) => item.id}
  renderItem={(item) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar>{item.name.charAt(0)}</Avatar>
      <div>
        <div style={{ fontWeight: 500 }}>{item.name}</div>
        <div style={{ color: '#888', fontSize: 13 }}>{item.email}</div>
      </div>
    </div>
  )}
/>`;

export const themeCode = `<ConfigProvider
  theme={{
    components: {
      InfiniteList: {
        colorBg: '#f6f8fa',
        colorBorder: '#d0d7de',
        itemHoverBg: '#eaeef2',
        borderRadius: 12,
      },
    },
  }}
>
  <InfiniteList
    dataSource={data}
    loading={loading}
    hasMore={hasMore}
    onLoadMore={loadMore}
    height={280}
    keyExtractor={(item) => item.id}
    renderItem={(item) => (
      <div style={{ fontWeight: 500 }}>{item.text}</div>
    )}
  />
</ConfigProvider>`;
