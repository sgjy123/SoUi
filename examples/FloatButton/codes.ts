// FloatButton example codes for react-live

export const basicCode = `<FloatButton icon="Plus" />`;

export const shapeCode = `<div style={{ display: 'flex', gap: '16px' }}>
  <FloatButton icon="Plus" shape="circle" />
  <FloatButton icon="Plus" shape="square" />
</div>`;

export const typeCode = `<Space size="large">
  <FloatButton icon="Plus" type="default" />
  <FloatButton icon="Plus" type="primary" />
  <FloatButton icon="Delete" type="primary" danger />
</Space>`;

export const groupCode = `<FloatButton.Group vertical>
  <FloatButton icon="Edit" tooltip="编辑" />
  <FloatButton icon="Copy" tooltip="复制" />
  <FloatButton icon="Share" tooltip="分享" />
</FloatButton.Group>`;

export const groupWithTriggerCode = `<FloatButton.Group
  icon="Plus"
  tooltip="快捷操作"
>
  <FloatButton icon="Edit" tooltip="编辑" />
  <FloatButton icon="Copy" tooltip="复制" />
  <FloatButton icon="Share" tooltip="分享" />
</FloatButton.Group>`;

export const groupControlledCode = `const [open, setOpen] = useState(false);

<div>
  <p>当前状态: {open ? '展开' : '收起'}</p>
  <FloatButton.Group
    open={open}
    onOpenChange={setOpen}
    icon="Menu"
    tooltip="菜单"
  >
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Delete" tooltip="删除" danger />
    <FloatButton icon="Download" tooltip="下载" />
  </FloatButton.Group>
</div>`;

export const groupHoverCode = `<FloatButton.Group
  trigger="hover"
  icon="More"
  tooltip="更多操作（悬停展开）"
>
  <FloatButton icon="Edit" tooltip="编辑" />
  <FloatButton icon="Copy" tooltip="复制" />
  <FloatButton icon="Share" tooltip="分享" />
  <FloatButton icon="Download" tooltip="下载" />
</FloatButton.Group>`;
