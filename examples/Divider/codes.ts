// Divider 示例代码字符串

export const basicCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <p>第一段内容</p>
  <Divider />
  <p>第二段内容</p>
  <Divider dashed />
  <p>第三段内容（虚线分割）</p>
</Space>`;

export const withTextCode = `<div>
  <Divider>Center Text</Divider>
  <Divider orientation="left">Left Text</Divider>
  <Divider orientation="right">Right Text</Divider>
  <Divider orientation="left" orientationMargin={20}>
    Custom Margin
  </Divider>
</div>`;

export const verticalCode = `<div>
  <span>Home</span>
  <Divider type="vertical" />
  <span>Products</span>
  <Divider type="vertical" />
  <span>About</span>
  <Divider type="vertical" />
  <span>Contact</span>
</div>`;

export const customColorCode = `<div>
  <p>Default color</p>
  <Divider />
  
  <p>Custom color</p>
  <Divider color="#1677ff" />
  
  <p>Dashed with custom color</p>
  <Divider dashed color="#52c41a" />
  
  <p>With text and custom color</p>
  <Divider color="#faad14">Custom Color Text</Divider>
</div>`;
