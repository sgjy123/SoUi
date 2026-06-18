// Basic 示例代码
export const basicCode = `<div>
  <h4 style={{ marginBottom: 16 }}>基础占位</h4>
  <Skeleton />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>无标题</h4>
  <Skeleton title={false} paragraph={{ rows: 4 }} />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>小段落</h4>
  <Skeleton paragraph={{ rows: 2 }} />
</div>`;

// Active 示例代码
export const activeCode = `<div>
  <h4 style={{ marginBottom: 16 }}>带动画效果</h4>
  <Skeleton active />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>带动画 + 圆角</h4>
  <Skeleton active round />
</div>`;

// Complex 示例代码
export const complexCode = `<div>
  <h4 style={{ marginBottom: 16 }}>带头像的占位</h4>
  <Skeleton avatar />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>带头像 + 动画</h4>
  <Skeleton avatar active />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>方形头像</h4>
  <Skeleton avatar={{ shape: 'square', size: 'large' }} active />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>自定义标题宽度</h4>
  <Skeleton avatar title={{ width: '50%' }} paragraph={{ rows: 4, width: ['100%', '80%', '60%', '40%'] }} active />
</div>`;

// SubComponents 示例代码
export const subComponentsCode = `<div>
  <h4 style={{ marginBottom: 16 }}>按钮占位</h4>
  <Space size={16}>
    <Skeleton.Button size="small" />
    <Skeleton.Button />
    <Skeleton.Button size="large" />
    <Skeleton.Button shape="round" />
    <Skeleton.Button shape="circle" />
  </Space>

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>头像占位</h4>
  <Space size={16}>
    <Skeleton.Avatar size="small" />
    <Skeleton.Avatar />
    <Skeleton.Avatar size="large" />
    <Skeleton.Avatar shape="square" />
  </Space>

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>输入框占位</h4>
  <Space direction="vertical" size={16}>
    <Skeleton.Input size="small" />
    <Skeleton.Input />
    <Skeleton.Input size="large" />
  </Space>

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>图片占位</h4>
  <Skeleton.Image />

  <h4 style={{ marginTop: 24, marginBottom: 16 }}>带动画效果</h4>
  <Space size={16}>
    <Skeleton.Button active />
    <Skeleton.Avatar active />
    <Skeleton.Input active />
    <Skeleton.Image active />
  </Space>
</div>`;
