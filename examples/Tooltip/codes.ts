// ==================== Basic Example ====================

export const basicCode = `<Space wrap>
  <Tooltip title="这是一个提示">
    <Button>悬停显示提示</Button>
  </Tooltip>
  <Tooltip title="点击触发" trigger="click">
    <Button type="primary">点击显示</Button>
  </Tooltip>
</Space>`;

// ==================== Placement Example ====================

export const placementCode = `<Space wrap>
  <Tooltip title="上方" placement="top">
    <Button>top</Button>
  </Tooltip>
  <Tooltip title="左上方" placement="topLeft">
    <Button>topLeft</Button>
  </Tooltip>
  <Tooltip title="右上方" placement="topRight">
    <Button>topRight</Button>
  </Tooltip>
  <Tooltip title="左侧" placement="left">
    <Button>left</Button>
  </Tooltip>
  <Tooltip title="右侧" placement="right">
    <Button>right</Button>
  </Tooltip>
  <Tooltip title="下方" placement="bottom">
    <Button>bottom</Button>
  </Tooltip>
  <Tooltip title="左下方" placement="bottomLeft">
    <Button>bottomLeft</Button>
  </Tooltip>
  <Tooltip title="右下方" placement="bottomRight">
    <Button>bottomRight</Button>
  </Tooltip>
</Space>`;

// ==================== Trigger Example ====================

export const triggerCode = `<Space wrap>
  <Tooltip title="悬停触发" trigger="hover">
    <Button>hover</Button>
  </Tooltip>
  <Tooltip title="点击触发" trigger="click">
    <Button type="primary">click</Button>
  </Tooltip>
  <Tooltip title="聚焦触发" trigger="focus">
    <Button type="dashed">focus</Button>
  </Tooltip>
  <Tooltip title="右键触发" trigger="contextMenu">
    <Button type="text">contextMenu</Button>
  </Tooltip>
</Space>`;

// ==================== Controlled Example ====================

export const controlledCode = `const [open, setOpen] = useState(false);

return (
  <Space direction="vertical">
    <Tooltip
      title="受控模式的提示框"
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
    >
      <Button>受控模式（当前：{open ? '显示' : '隐藏'}）</Button>
    </Tooltip>
    <Button onClick={() => setOpen(!open)}>
      切换显示状态
    </Button>
  </Space>
)`;

// ==================== Delay Example ====================

export const delayCode = `<Space wrap>
  <Tooltip title="延迟 0.5 秒显示" mouseEnterDelay={0.5}>
    <Button>延迟显示</Button>
  </Tooltip>
  <Tooltip title="延迟 1 秒隐藏" mouseLeaveDelay={1}>
    <Button type="primary">延迟隐藏</Button>
  </Tooltip>
</Space>`;

// ==================== Destroy Example ====================

export const destroyCode = `<Space wrap>
  <Tooltip title="关闭后不销毁 DOM" destroyOnHidden={false}>
    <Button>不销毁（默认）</Button>
  </Tooltip>
  <Tooltip title="关闭后销毁 DOM" destroyOnHidden>
    <Button type="primary">销毁 DOM</Button>
  </Tooltip>
</Space>`;
