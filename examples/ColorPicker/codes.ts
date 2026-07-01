export const basicCode = `const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} />
  <span>{color}</span>
</div>`;

export const sizeCode = `const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <ColorPicker size="small" value={color} onChange={setColor} />
  </div>
  <div>
    <span>中号：</span>
    <ColorPicker size="medium" value={color} onChange={setColor} />
  </div>
  <div>
    <span>大号：</span>
    <ColorPicker size="large" value={color} onChange={setColor} />
  </div>
</div>`;

export const variantCode = `const [color, setColor] = useState('');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>可清除：</span>
    <ColorPicker value={color} onChange={setColor} allowClear />
  </div>
  <div>
    <span>显示文本：</span>
    <ColorPicker value="#52C41A" showText />
  </div>
  <div>
    <span>禁用：</span>
    <ColorPicker value="#1677FF" disabled />
  </div>
  <div>
    <span>无透明度：</span>
    <ColorPicker value="#1677FF" disabledAlpha />
  </div>
</div>`;

export const formatCode = `const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} format="rgb" showText />
  <span>{color}</span>
</div>`;
