import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ConfigProvider from './components/ConfigProvider';
import Space from './components/Space';
import Button from './components/Button';
import DemoContainer from '../examples/DemoContainer';

// 导入各组件的示例代码
import * as buttonCodes from '../examples/Button/codes';
import * as iconCodes from '../examples/Icon/codes';
import * as spaceCodes from '../examples/Space/codes';

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
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        {/* 顶部导航栏 */}
        <div style={{
          padding: '20px 40px',
          background: '#fff',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>SoUi 组件库演示</h1>
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

        {/* 主要内容区域 */}
        <div style={{ padding: '0 40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Button 组件演示 */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
              Button 按钮组件
            </h2>

            <DemoContainer
              title="基本类型"
              description="按钮的基本类型：主要按钮、默认按钮、虚线按钮、文本按钮和链接按钮。"
              code={buttonCodes.basicCode}
            />

            <DemoContainer
              title="按钮尺寸"
              description="按钮有大、中、小三种尺寸，默认为中等尺寸。"
              code={buttonCodes.sizeCode}
            />

            <DemoContainer
              title="按钮状态"
              description="按钮可以设置为加载中、禁用或危险状态。"
              code={buttonCodes.statusCode}
            />

            <DemoContainer
              title="按钮形状"
              description="按钮支持圆形、椭圆形以及带图标的按钮。"
              code={buttonCodes.shapeCode}
            />
          </section>

          {/* Icon 组件演示 */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
              Icon 图标组件
            </h2>

            <DemoContainer
              title="基本图标"
              description="展示不同类型的图标，包括轮廓图标和填充图标。未指定 fill 时使用主题色。"
              code={iconCodes.basicCode}
            />
          </section>

          {/* Space 组件演示 */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
              Space 间距组件
            </h2>

            <DemoContainer
              title="基本用法"
              description="Space 组件用于设置子元素之间的间距。"
              code={spaceCodes.basicCode}
            />

            <DemoContainer
              title="间距尺寸"
              description="支持 small、middle、large 三种预设尺寸，也可以自定义数值（像素）。"
              code={spaceCodes.sizeCode}
            />

            <DemoContainer
              title="排列方向"
              description="支持水平和垂直两种排列方向，默认为水平方向。"
              code={spaceCodes.directionCode}
            />

            <DemoContainer
              title="块级显示"
              description="通过 block 属性控制 Space 是否为块级元素。默认 inline-flex，设置 block 后变为 flex 占据整行。"
              code={spaceCodes.blockCode}
            />

            <DemoContainer
              title="分隔符"
              description="通过 split 属性在子元素之间添加分隔符，支持文本、符号或自定义元素。"
              code={spaceCodes.splitCode}
            />

            <DemoContainer
              title="对齐方式"
              description="支持 start、center、end、baseline 四种对齐方式。"
              code={spaceCodes.alignCode}
            />
          </section>
        </div>
      </div>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
