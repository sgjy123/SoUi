// ==================== Basic 示例代码 ====================

export const basicCode = `<Space>
  <Button type="primary" onClick={() => Message.success('操作成功完成！')}>
    成功
  </Button>
  <Button onClick={() => Message.info('这是一条普通信息提示。')}>
    信息
  </Button>
  <Button onClick={() => Message.warning('请注意，这是一条警告提示！')}>
    警告
  </Button>
  <Button danger onClick={() => Message.error('操作失败，请稍后重试。')}>
    错误
  </Button>
</Space>`;

// ==================== Types 示例代码 ====================

export const typesCode = `<Space direction="vertical">
  <Space>
    <Button
      type="primary"
      onClick={() => {
        Message.open({
          content: (
            <span>
              这是一条使用 <strong>open</strong> 方法打开的自定义消息，
              支持传入 <strong>ReactNode</strong> 作为内容。
            </span>
          ),
          type: 'success',
          duration: 5,
        });
      }}
    >
      自定义内容
    </Button>
    <Button
      onClick={() => {
        Message.open({
          content: '带自定义图标的消息',
          type: 'info',
          icon: <span style={{ color: '#1677ff', fontSize: 16 }}>★</span>,
        });
      }}
    >
      自定义图标
    </Button>
  </Space>
</Space>`;

// ==================== Duration 示例代码 ====================

export const durationCode = `<Space direction="vertical">
  <Space>
    <Button
      onClick={() => {
        Message.info('这条消息将在 1 秒后关闭', 1);
      }}
    >
      1 秒关闭
    </Button>
    <Button
      onClick={() => {
        Message.info('这条消息将在 5 秒后关闭', 5);
      }}
    >
      5 秒关闭
    </Button>
    <Button
      onClick={() => {
        Message.info('这条消息不会自动关闭（duration=0）', 0);
      }}
    >
      不自动关闭
    </Button>
  </Space>
</Space>`;

// ==================== Loading 示例代码 ====================

export const loadingCode = `<Space direction="vertical" align="start">
  <Space>
    <Button type="primary" onClick={() => {
      Message.loading('正在处理中，请稍候...');
      setTimeout(() => {
        Message.destroy();
        Message.success('处理完成！');
      }, 3000);
    }}>
      显示加载状态
    </Button>
    <Button
      onClick={() => {
        Message.loading('持续显示的加载提示');
      }}
    >
      加载提示
    </Button>
  </Space>
</Space>`;
