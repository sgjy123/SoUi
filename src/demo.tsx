import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';
import Icon from './components/Icon';
import ConfigProvider, { useConfig } from './components/ConfigProvider';
import Space from './components/Space';

const DemoContent: React.FC = () => {
  const { theme } = useConfig();

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>SoUi 组件库演示</h1>
      <p>当前主题色：{theme?.primaryColor}</p>

      {/* Button 组件演示 */}
      <div style={{ marginBottom: '24px' }}>
        <h2>Button 按钮</h2>
        <div style={{ marginBottom: '16px' }}>
          <Button type="default">默认</Button>
          <Button type="primary">主要</Button>
          <Button type="dashed">虚线</Button>
          <Button type="text">文本</Button>
          <Button type="link">链接</Button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Button size="large">大</Button>
          <Button>中</Button>
          <Button size="small">小</Button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Button loading>加载中</Button>
          <Button disabled>禁用</Button>
          <Button danger>危险</Button>
          <Button icon="Search">图标</Button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Button shape="circle" aria-label="circle">
            <Icon name="Home" size={16} />
          </Button>
          <Button shape="round">椭圆</Button>
          <Button onClick={() => alert('点击了！')}>触发 Alert</Button>
        </div>
      </div>

      {/* Icon 组件演示 */}
      <div style={{ marginBottom: '24px' }}>
        <h2>Icon 图标</h2>
        <p>以下图标使用主题色（未指定 fill 时）：</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Icon name="Home" size={24} theme="outline" />
          <Icon name="User" size={24} theme="outline" />
          <Icon name="Setting" size={24} theme="outline" />
          <Icon name="Search" size={24} theme="outline" />
          <Icon name="Loading" size={24} theme="outline" />
        </div>
        <p>以下图标使用自定义颜色：</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Icon name="CheckCorrect" size={24} theme="filled" fill="#52c41a" />
          <Icon name="Close" size={24} theme="filled" fill="#ff4d4f" />
          <Icon name="Info" size={24} theme="filled" fill="#1677ff" />
          <Icon name="Reminder" size={24} theme="filled" fill="#faad14" />
        </div>
      </div>
    </div>
  );
};

// 主题切换演示
const App: React.FC = () => {
  const [customTheme, setCustomTheme] = useState(false);

  const theme = customTheme ? {
    primaryColor: '#722ed1',
    primaryHoverColor: '#9254de',
    primaryActiveColor: '#531dab',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#f5222d',
    borderRadius: 8,
  } : undefined;

  return (
    <ConfigProvider theme={theme}>
      <div>
        <div style={{ padding: '20px', background: '#f5f5f5', marginBottom: '20px' }}>
          <Space>
            <Button 
              type={customTheme ? 'default' : 'primary'} 
              onClick={() => setCustomTheme(!customTheme)}
            >
              {customTheme ? '切换回默认主题' : '切换为紫色主题'}
            </Button>
            <span>当前主题：{customTheme ? '紫色主题' : '默认蓝色主题'}</span>
          </Space>
        </div>
        <DemoContent />
      </div>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
