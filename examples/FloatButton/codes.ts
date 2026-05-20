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

export const positionCode = `<div>
  {/* 右上角 */}
  <FloatButton 
    icon="Plus" 
    position={{ bottom: 200, right: 24 }}
    tooltip="右上角"
  />
  
  {/* 右下角（默认） */}
  <FloatButton 
    icon="Plus" 
    tooltip="右下角"
  />
  
  {/* 自定义 bottom */}
  <FloatButton 
    icon="Plus" 
    position={{ bottom: 100 }}
    tooltip="bottom: 100px"
  />
  
  {/* 自定义 right */}
  <FloatButton 
    icon="Plus" 
    position={{ right: 100 }}
    tooltip="right: 100px"
  />
</div>`;

export const groupPositionCode = `<FloatButton.Group
  position={{ bottom: 100, right: 24 }}
  icon="Menu"
  tooltip="菜单"
>
  <FloatButton icon="Edit" tooltip="编辑" />
  <FloatButton icon="Copy" tooltip="复制" />
  <FloatButton icon="Share" tooltip="分享" />
</FloatButton.Group>`;

export const zIndexCode = `<div>
  {/* 默认层级 */}
  <FloatButton 
    icon="Plus" 
    position={{ bottom: 200, right: 24 }}
    tooltip="默认层级"
  />
  
  {/* 高层级 */}
  <FloatButton 
    icon="Star" 
    type="primary"
    position={{ bottom: 100, right: 24 }}
    zIndex={9999}
    tooltip="高层级"
  />
  
  {/* 低层级 */}
  <FloatButton 
    icon="Setting" 
    position={{ bottom: 24, right: 24 }}
    zIndex={100}
    tooltip="低层级"
  />
</div>`;
