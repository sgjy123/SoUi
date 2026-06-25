// Basic 示例
export const basicCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input placeholder="请输入内容" />
  <Input defaultValue="默认值" />
  <Input placeholder="禁用状态" disabled />
  <Input placeholder="只读状态" readOnly defaultValue="只读内容" />
</div>`;

// Size 示例
export const sizeCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input size="small" placeholder="小号输入框" />
  <Input size="middle" placeholder="中号输入框（默认）" />
  <Input size="large" placeholder="大号输入框" />
</div>`;

// Status 示例
export const statusCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input placeholder="默认状态" />
  <Input status="success" placeholder="成功状态" />
  <Input status="warning" placeholder="警告状态" />
  <Input status="error" placeholder="错误状态" />
</div>`;

// PrefixSuffix 示例
export const prefixSuffixCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input prefix="🔍" placeholder="带前缀图标" />
  <Input suffix="元" placeholder="带后缀单位" />
  <Input prefix="📧" suffix="@example.com" placeholder="邮箱地址" />
  <Input
    prefix="💰"
    suffix="CNY"
    allowClear
    placeholder="金额输入框（支持清除）"
  />
</div>`;

// Addon 示例
export const addonCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input addonBefore="https://" addonAfter=".com" placeholder="域名输入" />
  <Input addonBefore="+" addonAfter="%" placeholder="百分比" />
  <Input
    addonBefore="¥"
    addonAfter="元"
    showCount
    maxLength={10}
    placeholder="金额（带计数）"
  />
</div>`;

// Count 示例
export const countCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input
    placeholder="请输入密码"
    type="password"
    showCount
    maxLength={20}
  />
  <Input
    defaultValue="123456789"
    showCount
    maxLength={10}
    placeholder="限制最大长度10"
  />
  <Input
    placeholder="自定义计数格式"
    showCount
    maxLength={50}
    countFormatter={(count, max) => \`\${count}/\${max}\`}
  />
</div>`;

// Bordered 示例
export const borderedCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input
    placeholder="无边框模式"
    bordered={false}
  />
  <Input
    placeholder="无边框 + 前缀"
    bordered={false}
    prefix="🔍"
  />
  <Input
    placeholder="无边框 + 后缀"
    bordered={false}
    suffix="元"
  />
</div>`;

// Search 示例
export const searchCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input.Search placeholder="搜索..." onSearch={(val) => alert(\`搜索: \${val}\`)} />
  <Input.Search
    placeholder="带按钮搜索"
    enterButton="搜索"
    onSearch={(val) => alert(\`搜索: \${val}\`)}
  />
  <Input.Search
    placeholder="加载状态"
    enterButton="搜索"
    loading
    onSearch={(val) => alert(\`搜索: \${val}\`)}
  />
</div>`;

// Password 示例
export const passwordCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input.Password placeholder="请输入密码" />
  <Input.Password placeholder="带默认值" defaultValue="password123" />
  <Input.Password
    placeholder="禁用状态"
    disabled
    defaultValue="password"
  />
</div>`;

// TextArea 示例
export const textAreaCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input.TextArea placeholder="请输入内容" rows={4} />
  <Input.TextArea placeholder="禁用状态" disabled rows={3} />
  <Input.TextArea placeholder="带字符计数" showCount maxLength={200} rows={4} />
  <Input.TextArea placeholder="成功状态" status="success" rows={3} />
  <Input.TextArea placeholder="错误状态" status="error" rows={3} />
  <Input.TextArea
    placeholder="自适应高度（最小2行，最大6行）"
    autoSize={{ minRows: 2, maxRows: 6 }}
  />
</div>`;
