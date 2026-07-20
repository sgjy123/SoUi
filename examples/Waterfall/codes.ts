export const basicCode = `const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'];

const items = Array.from({ length: 12 }, (_, i) => ({
  key: \`item-\${i}\`,
  height: 80 + Math.floor(Math.random() * 120),
  color: colors[i % colors.length],
  title: \`卡片 \${i + 1}\`,
}));

<Waterfall
  columns={3}
  gutter={16}
  items={items}
  renderItem={(item) => (
    <div
      style={{
        height: item.height,
        background: item.color,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
      }}
    >
      {item.title}
    </div>
  )}
/>`;

export const responsiveCode = `const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16', '#2f54eb', '#a0d911'];

const items = Array.from({ length: 16 }, (_, i) => ({
  key: \`item-\${i}\`,
  height: 60 + Math.floor(Math.random() * 140),
  color: colors[i % colors.length],
  title: \`\${i + 1}\`,
}));

<div>
  <p style={{ marginBottom: 12, color: 'rgba(0,0,0,0.45)', fontSize: 13 }}>
    缩放浏览器窗口查看响应式列数变化：xs=1, sm=2, md=3, lg=4, xl=5
  </p>
  <Waterfall
    columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    gutter={12}
    items={items}
    renderItem={(item) => (
      <div
        style={{
          height: item.height,
          background: item.color,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {item.title}
      </div>
    )}
  />
</div>`;

export const gutterCode = `const items = Array.from({ length: 9 }, (_, i) => ({
  key: \`item-\${i}\`,
  height: 80 + (i % 3) * 50,
  title: \`Item \${i + 1}\`,
}));

<div>
  <h4 style={{ marginBottom: 8 }}>水平间距 24px，垂直间距 8px</h4>
  <Waterfall
    columns={3}
    gutter={[24, 8]}
    items={items}
    renderItem={(item) => (
      <div
        style={{
          height: item.height,
          background: '#f0f5ff',
          border: '1px solid #adc6ff',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1677ff',
          fontWeight: 500,
        }}
      >
        {item.title}
      </div>
    )}
  />
</div>`;

export const imageGalleryCode = `const galleryItems = [
  { key: 'img-1', height: 200, color: '#667eea', label: '风景' },
  { key: 'img-2', height: 150, color: '#f093fb', label: '人物' },
  { key: 'img-3', height: 260, color: '#4facfe', label: '建筑' },
  { key: 'img-4', height: 180, color: '#43e97b', label: '自然' },
  { key: 'img-5', height: 220, color: '#fa709a', label: '美食' },
  { key: 'img-6', height: 140, color: '#a18cd1', label: '动物' },
  { key: 'img-7', height: 190, color: '#fccb90', label: '旅行' },
  { key: 'img-8', height: 240, color: '#96e6a1', label: '城市' },
  { key: 'img-9', height: 160, color: '#d4fc79', label: '花卉' },
  { key: 'img-10', height: 210, color: '#84fab0', label: '海洋' },
  { key: 'img-11', height: 170, color: '#cfd9df', label: '山脉' },
  { key: 'img-12', height: 230, color: '#f6d365', label: '日落' },
];

<Waterfall
  columns={4}
  gutter={[12, 12]}
  items={galleryItems}
  renderItem={(item) => (
    <div
      style={{
        height: item.height,
        background: \`linear-gradient(135deg, \${item.color}, \${item.color}88)\`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ fontSize: 24, fontWeight: 700 }}>{item.label}</span>
      <span style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>{item.height}px</span>
    </div>
  )}
/>`;

export const infiniteLoadCode = `const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'];
let globalId = 0;

function generateItems(count) {
  return Array.from({ length: count }, () => {
    globalId += 1;
    return {
      key: \`item-\${globalId}\`,
      height: 100 + Math.floor(Math.random() * 150),
      color: colors[globalId % colors.length],
      title: \`#\${globalId}\`,
    };
  });
}

const [items, setItems] = useState(() => generateItems(12));
const [loading, setLoading] = useState(false);
const sentinelRef = React.useRef(null);

const loadMore = useCallback(() => {
  if (loading) return;
  setLoading(true);
  setTimeout(() => {
    setItems((prev) => [...prev, ...generateItems(8)]);
    setLoading(false);
  }, 800);
}, [loading]);

useEffect(() => {
  const sentinel = sentinelRef.current;
  if (!sentinel) return;
  const observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) loadMore(); },
    { rootMargin: '200px' },
  );
  observer.observe(sentinel);
  return () => observer.disconnect();
}, [loadMore]);

<div>
  <Waterfall
    columns={4}
    gutter={[12, 12]}
    items={items}
    renderItem={(item) => (
      <div
        style={{
          height: item.height,
          background: item.color,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {item.title}
      </div>
    )}
  />
  <div ref={sentinelRef} style={{ height: 1 }} />
  {loading && (
    <div style={{ textAlign: 'center', padding: '16px 0', color: 'rgba(0,0,0,0.45)' }}>
      加载中...
    </div>
  )}
</div>`;
