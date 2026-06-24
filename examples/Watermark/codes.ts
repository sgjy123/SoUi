export const basicCode = `<Watermark content="SoUi Watermark" />`;

export const multiLineCode = `<Watermark content={'SoUi\\nWatermark'} />`;

export const imageCode = `<Watermark
  image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-41d9-bbf3-fef0f6723923.svg"
  width={64}
  height={64}
/>`;

export const contentCode = `<Watermark content="SoUi Watermark">
  <div style={{ padding: 24 }}>
    <h2>被水印覆盖的内容</h2>
    <p>水印会覆盖在内容上方，但不影响内容的交互。</p>
    <button onClick={() => alert('点击成功')}>可点击的按钮</button>
  </div>
</Watermark>`;

export const customStyleCode = `<Watermark
  content="SoUi Watermark"
  fontColor="rgba(255, 0, 0, 0.3)"
  fontSize={20}
  fontWeight="bold"
  rotate={-45}
  gapX={150}
  gapY={150}
  opacity={0.3}
/>`;
