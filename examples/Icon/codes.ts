// Icon 组件示例代码字符串

export const basicCode = `<Space wrap size="large">
  <Icon name="Home" size={24} theme="outline" />
  <Icon name="User" size={24} theme="outline" />
  <Icon name="Setting" size={24} theme="outline" />
  <Icon name="Search" size={24} theme="outline" />
  <Icon name="Loading" size={24} theme="outline" />
  <Icon name="CheckCorrect" size={24} theme="filled" fill="#52c41a" />
  <Icon name="Close" size={24} theme="filled" fill="#ff4d4f" />
  <Icon name="Info" size={24} theme="filled" fill="#1677ff" />
  <Icon name="Reminder" size={24} theme="filled" fill="#faad14" />
</Space>`;

export const themeCode = `<Space wrap size="large">
  <Icon name="Home" size={32} theme="outline" />
  <Icon name="Home" size={32} theme="filled" />
  <Icon name="User" size={32} theme="outline" />
  <Icon name="User" size={32} theme="filled" />
  <Icon name="Setting" size={32} theme="outline" />
  <Icon name="Setting" size={32} theme="filled" />
</Space>`;

export const colorCode = `<>\n  <h4>预设颜色</h4>\n  <Space wrap size="large">\n    <Icon name="CheckCorrect" size={24} color="primary" />\n    <Icon name="CheckCorrect" size={24} color="success" />\n    <Icon name="Reminder" size={24} color="warning" />\n    <Icon name="Close" size={24} color="error" />\n    <Icon name="Info" size={24} color="info" />\n  </Space>\n\n  <h4>自定义颜色</h4>\n  <Space wrap size="large">\n    <Icon name="Star" size={24} fill="#722ed1" />\n    <Icon name="Heart" size={24} fill="#eb2f96" />\n    <Icon name="Trophy" size={24} fill="#fa8c16" />\n    <Icon name="Thunderbolt" size={24} fill="#52c41a" />\n  </Space>\n</>`;

export const sizeCode = `<Space wrap align="end">
  <Icon name="Home" size={12} />
  <Icon name="Home" size={16} />
  <Icon name="Home" size={20} />
  <Icon name="Home" size={24} />
  <Icon name="Home" size={32} />
  <Icon name="Home" size={48} />
  <Icon name="Home" size={64} />
</Space>`;

export const interactiveCode = `<Space size="large">
  <Icon
    name="Like"
    size={24}
    clickable
    onClick={() => alert('已点赞')}
  />
  <Icon
    name="Dislike"
    size={24}
    clickable
    onClick={() => alert('已点踩')}
  />
  <Icon
    name="Share"
    size={24}
    clickable
    onClick={() => alert('分享功能')}
  />
  <Icon
    name="Download"
    size={24}
    clickable
    onClick={() => alert('下载中...')}
  />
  <Icon
    name="Star"
    size={24}
    clickable
    onClick={() => alert('已收藏')}
  />
</Space>`;
