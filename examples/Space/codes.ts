// Space 组件示例代码字符串

export const basicCode = `<Space>
  <Button type="primary">主要按钮</Button>
  <Button>默认按钮</Button>
  <Button type="dashed">虚线按钮</Button>
  <Button type="link">链接按钮</Button>
</Space>`;

export const sizeCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Space size="small">
    <Button>小间距</Button>
    <Button>小间距</Button>
    <Button>小间距</Button>
  </Space>
  <Space size="middle">
    <Button>中间距</Button>
    <Button>中间距</Button>
    <Button>中间距</Button>
  </Space>
  <Space size="large">
    <Button>大间距</Button>
    <Button>大间距</Button>
    <Button>大间距</Button>
  </Space>
  <Space size={40}>
    <Button>自定义40px</Button>
    <Button>自定义40px</Button>
    <Button>自定义40px</Button>
  </Space>
</div>`;

export const directionCode = `<div style={{ display: 'flex', gap: '40px' }}>
  <div>
    <h4 style={{ marginBottom: '12px' }}>水平方向（默认）</h4>
    <Space direction="horizontal">
      <Button>按钮1</Button>
      <Button>按钮2</Button>
      <Button>按钮3</Button>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '12px' }}>垂直方向</h4>
    <Space direction="vertical">
      <Button>按钮1</Button>
      <Button>按钮2</Button>
      <Button>按钮3</Button>
    </Space>
  </div>
</div>`;

export const blockCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <h4 style={{ marginBottom: '8px' }}>非块级（inline-flex）</h4>
    <Space style={{ background: '#f0f0f0', padding: '8px' }}>
      <Button type="primary">按钮1</Button>
      <Button>按钮2</Button>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '8px' }}>块级（flex，占据整行）</h4>
    <Space block style={{ background: '#e6f7ff', padding: '8px' }}>
      <Button type="primary">按钮1</Button>
      <Button>按钮2</Button>
    </Space>
  </div>
</div>`;

export const splitCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <div>
    <h4 style={{ marginBottom: '12px' }}>文本分隔符</h4>
    <Space split="|">
      <Button type="text">首页</Button>
      <Button type="text">产品</Button>
      <Button type="text">关于</Button>
      <Button type="text">联系</Button>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '12px' }}>自定义符号分隔符</h4>
    <Space split={<span style={{ color: '#1677ff', fontWeight: 'bold' }}>•</span>}>
      <span>选项一</span>
      <span>选项二</span>
      <span>选项三</span>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '12px' }}>垂直分隔线</h4>
    <Space
      direction="vertical"
      split={<div style={{ borderBottom: '1px solid #e8e8e8', width: '100%' }} />}
    >
      <div style={{ padding: '8px 0' }}>第一行内容</div>
      <div style={{ padding: '8px 0' }}>第二行内容</div>
      <div style={{ padding: '8px 0' }}>第三行内容</div>
    </Space>
  </div>
</div>`;

export const alignCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <div>
    <h4 style={{ marginBottom: '12px' }}>align="start"（顶部对齐）</h4>
    <Space align="start" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
      <Button>短按钮</Button>
      <Button size="large">长文本按钮</Button>
      <Button size="small">小按钮</Button>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '12px' }}>align="center"（居中对齐，默认）</h4>
    <Space align="center" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
      <Button>短按钮</Button>
      <Button size="large">长文本按钮</Button>
      <Button size="small">小按钮</Button>
    </Space>
  </div>
  <div>
    <h4 style={{ marginBottom: '12px' }}>align="end"（底部对齐）</h4>
    <Space align="end" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
      <Button>短按钮</Button>
      <Button size="large">长文本按钮</Button>
      <Button size="small">小按钮</Button>
    </Space>
  </div>
</div>`;
