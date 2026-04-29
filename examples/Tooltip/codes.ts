export const basicCode = `<Tooltip title="这是提示文字">
  <Button type="primary">悬停显示提示</Button>
</Tooltip>`;

export const placementCode = `<Space direction="vertical" size="large">
  <Space>
    <span style={{ width: 80 }}></span>
    {['topLeft', 'top', 'topRight'].map(p => (
      <Tooltip key={p} title={p} placement={p as any}>
        <Button>{p}</Button>
      </Tooltip>
    ))}
    <span style={{ width: 80 }}></span>
  </Space>
  <Space>
    {['leftTop', 'left', 'leftBottom'].map(p => (
      <Tooltip key={p} title={p} placement={p as any}>
        <Button>{p}</Button>
      </Tooltip>
    ))}
    <span style={{ width: 120 }}></span>
    {['rightTop', 'right', 'rightBottom'].map(p => (
      <Tooltip key={p} title={p} placement={p as any}>
        <Button>{p}</Button>
      </Tooltip>
    ))}
  </Space>
  <Space>
    <span style={{ width: 80 }}></span>
    {['bottomLeft', 'bottom', 'bottomRight'].map(p => (
      <Tooltip key={p} title={p} placement={p as any}>
        <Button>{p}</Button>
      </Tooltip>
    ))}
    <span style={{ width: 80 }}></span>
  </Space>
</Space>`;

export const triggerCode = `<Space wrap>
  <Tooltip title="悬停触发" trigger="hover">
    <Button>Hover</Button>
  </Tooltip>
  <Tooltip title="聚焦触发" trigger="focus">
    <Button>Focus</Button>
  </Tooltip>
  <Tooltip title="点击触发" trigger="click">
    <Button>Click</Button>
  </Tooltip>
  <Tooltip title="右键触发" trigger="contextMenu">
    <Button>Context Menu</Button>
  </Tooltip>
</Space>`;

export const delayCode = `<Tooltip
  title="延迟显示的提示"
  mouseEnterDelay={0.5}
  mouseLeaveDelay={0.3}
>
  <Button type="primary">延迟显示/隐藏</Button>
</Tooltip>`;

export const controlledCode = `() => {
  const [visible, setVisible] = useState(false);

  return (
    <Space direction="vertical">
      <Tooltip
        title="受控模式的提示"
        visible={visible}
        onVisibleChange={setVisible}
        trigger="click"
      >
        这种一般用于需要手动控制提示框显示隐藏的场景
      </Tooltip>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? '隐藏' : '显示'}提示框
      </Button>
    </Space>
  );
}`;

export const colorCode = `<Space wrap>
  <Tooltip title="成功提示" color="#fff" bgColor="#52c41a">
    <Button type="primary">成功</Button>
  </Tooltip>
  <Tooltip title="警告提示" color="#fff" bgColor="#faad14">
    <Button type="primary">警告</Button>
  </Tooltip>
  <Tooltip title="错误提示" color="#fff" bgColor="#ff4d4f">
    <Button type="primary">错误</Button>
  </Tooltip>
  <Tooltip title="信息提示" color="#fff" bgColor="#1677ff">
    <Button type="primary">信息</Button>
  </Tooltip>
</Space>`;
