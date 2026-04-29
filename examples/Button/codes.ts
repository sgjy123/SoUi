// Button 组件示例代码字符串

export const basicCode = `<Space wrap>
  <Button type="primary">主要按钮</Button>
  <Button>默认按钮</Button>
  <Button type="dashed">虚线按钮</Button>
  <Button type="text">文本按钮</Button>
  <Button type="link">链接按钮</Button>
</Space>`;

export const sizeCode = `<Space direction="vertical">
  <Space>
    <Button size="large" type="primary">大按钮</Button>
    <Button size="large">大按钮</Button>
    <Button size="large" type="dashed">大按钮</Button>
  </Space>
  <Space>
    <Button type="primary">中等按钮</Button>
    <Button>中等按钮</Button>
    <Button type="dashed">中等按钮</Button>
  </Space>
  <Space>
    <Button size="small" type="primary">小按钮</Button>
    <Button size="small">小按钮</Button>
    <Button size="small" type="dashed">小按钮</Button>
  </Space>
</Space>`;

export const statusCode = `<Space wrap>
  <Button loading type="primary">加载中</Button>
  <Button loading>加载中</Button>
  <Button disabled type="primary">禁用</Button>
  <Button disabled>禁用</Button>
  <Button danger type="primary">危险</Button>
  <Button danger>危险</Button>
</Space>`;

export const shapeCode = `<Space wrap>
  <Button shape="circle" aria-label="圆形按钮">
    <Icon name="Home" size={16} />
  </Button>
  <Button shape="round" type="primary">椭圆按钮</Button>
  <Button shape="round">椭圆按钮</Button>
  <Button icon="Search" type="primary">搜索</Button>
  <Button icon="Search">搜索</Button>
</Space>`;
