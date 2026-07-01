export const basicCode = `const [value, setValue] = useState(3);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate value={value} onChange={setValue} />
  <span>{value} 星</span>
</div>`;

export const halfCode = `const [value, setValue] = useState(2.5);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate allowHalf value={value} onChange={setValue} />
  <span>{value} 星</span>
</div>`;

export const customCharacterCode = `const [value, setValue] = useState(3);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>心形：</span>
    <Rate character="❤" value={value} onChange={setValue} />
  </div>
  <div>
    <span>拇指：</span>
    <Rate character="👍" value={value} onChange={setValue} />
  </div>
  <div>
    <span>字母：</span>
    <Rate character="A" value={value} onChange={setValue} />
  </div>
</div>`;

export const disabledCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>默认：</span>
    <Rate defaultValue={3} />
  </div>
  <div>
    <span>禁用：</span>
    <Rate defaultValue={3} disabled />
  </div>
  <div>
    <span>只读：</span>
    <Rate defaultValue={4} allowHalf disabled />
  </div>
</div>`;

export const sizeCode = `const [value, setValue] = useState(3);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <Rate size="small" value={value} onChange={setValue} />
  </div>
  <div>
    <span>中号：</span>
    <Rate size="medium" value={value} onChange={setValue} />
  </div>
  <div>
    <span>大号：</span>
    <Rate size="large" value={value} onChange={setValue} />
  </div>
</div>`;

export const tooltipsCode = `const descriptions = ['极差', '差', '一般', '好', '极好'];
const [value, setValue] = useState(0);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate tooltips={descriptions} value={value} onChange={setValue} />
  {value ? <span>{descriptions[value - 1]}</span> : null}
</div>`;
