export const basicCode = `const [top, setTop] = React.useState(10);
const [bottom, setBottom] = React.useState(10);

<div style={{ height: 600, overflow: 'auto', border: '1px solid #d9d9d9', borderRadius: 6, padding: 16 }}>
  <div style={{ height: 200, background: '#f5f5f5', borderRadius: 4, padding: 16, marginBottom: 16 }}>
    <p style={{ margin: 0, color: '#666' }}>向下滚动查看效果 ↓</p>
  </div>

  <Affix offsetTop={top}>
    <Button type="primary" onClick={() => setTop(top + 10)}>
      Affix top - 固定在顶部 {top}px
    </Button>
  </Affix>

  <div style={{ height: 800, background: '#fafafa', borderRadius: 4, padding: 16, margin: '16px 0' }}>
    <p style={{ color: '#999' }}>长内容区域（800px）</p>
    <p style={{ color: '#ccc' }}>滚动时按钮会固定在顶部</p>
  </div>

  <Affix offsetBottom={bottom}>
    <Button type="primary" onClick={() => setBottom(bottom + 10)}>
      Affix bottom - 固定在底部 {bottom}px
    </Button>
  </Affix>

  <div style={{ height: 400, background: '#f5f5f5', borderRadius: 4, padding: 16, marginTop: 16 }}>
    <p style={{ color: '#999' }}>底部内容区域</p>
  </div>
</div>`;

export const targetCode = `const [container, setContainer] = React.useState(null);

<div
  ref={setContainer}
  style={{
    width: '100%',
    height: 100,
    overflow: 'auto',
    boxShadow: '0 0 0 1px #1677ff',
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
  }}
>
  <div style={{ width: '100%', height: 1000 }}>
    <Affix offsetTop={20} target={() => container || window}>
      <Button type="primary">固定在容器顶部</Button>
    </Affix>
  </div>
</div>`;

export const callbackCode = `const [affixed, setAffixed] = React.useState(false);

<Affix offsetTop={20} onChange={(state) => setAffixed(state)}>
  <Button type="primary">
    {affixed ? '已固定' : '未固定'}
  </Button>
</Affix>`;
