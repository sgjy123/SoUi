// Basic 示例代码
export const basicCode = `<Space size={40}>
  <div style={{ textAlign: 'center' }}>
    <Loading size="small" />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Small</div>
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Default</div>
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading size="large" />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Large</div>
  </div>
</Space>`;

// Nested 示例代码
export const nestedCode = `const [loading, setLoading] = useState(false);

<Space direction="vertical" size={16}>
  <Button onClick={() => setLoading(!loading)} type="primary">
    {loading ? '停止加载' : '开始加载'}
  </Button>
  <Loading spinning={loading} tip="加载中...">
    <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 6 }}>
      <h3 style={{ marginBottom: 12 }}>卡片标题</h3>
      <p>这是一段内容，当加载状态激活时，内容会被模糊化并显示加载指示器。</p>
      <p>可以模拟数据加载的场景。</p>
    </div>
  </Loading>
</Space>`;

// Custom 示例代码
export const customCode = `<Space size={40}>
  <div style={{ textAlign: 'center' }}>
    <Loading tip="加载中..." />
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading
      indicator={<Icon name="LoadingThree" size={24} fill="#1677ff" />}
      tip="自定义图标"
    />
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading size="large" tip="正在加载数据..." />
  </div>
</Space>`;
