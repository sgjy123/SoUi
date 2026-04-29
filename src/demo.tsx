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
import * as typographyCodes from '../examples/Typography/codes';
import * as tooltipCodes from '../examples/Tooltip/codes';

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

          {/* Typography 组件演示 */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
              Typography 排版组件
            </h2>

            <DemoContainer
              title="基础用法"
              description="Typography 组件包含 Title、Paragraph、Text、Link 四个子组件，用于展示不同层级的文本内容。"
              code={typographyCodes.basicCode}
            />

            <DemoContainer
              title="文本样式"
              description="支持加粗、斜体、下划线、删除线、代码、高亮等多种文本装饰效果。"
              code={typographyCodes.textStyleCode}
            />

            <DemoContainer
              title="文本类型"
              description="提供 secondary、success、warning、danger 四种语义化的文本类型。"
              code={typographyCodes.textTypeCode}
            />

            <DemoContainer
              title="可复制文本"
              description="通过 copyable 属性启用文本复制功能，支持自定义复制内容和提示文本。"
              code={typographyCodes.copyableCode}
            />

            <DemoContainer
              title="可编辑文本"
              description="通过 editable 属性启用文本编辑功能，点击编辑图标即可修改文本内容。"
              code={typographyCodes.editableCode}
            />

            <DemoContainer
              title="文本省略"
              description="通过 ellipsis 属性实现文本溢出省略，支持单行/多行省略和展开功能。"
              code={typographyCodes.ellipsisCode}
            />

            <DemoContainer
              title="链接组件"
              description="Link 组件用于展示可点击的链接，支持新窗口打开和禁用状态。"
              code={typographyCodes.linksCode}
            />
          </section>

          {/* Tooltip 组件演示 */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #1677ff' }}>
              Tooltip 文字提示组件
            </h2>

            <DemoContainer
              title="基础用法"
              description="最简单的用法，鼠标悬停时显示提示文字。"
              code={tooltipCodes.basicCode}
            />

            <DemoContainer
              title="不同位置"
              description="支持 12 个不同的弹出位置，包括上、下、左、右及其组合方向。"
              code={tooltipCodes.placementCode}
            />

            <DemoContainer
              title="不同触发方式"
              description="支持 hover、focus、click 和 contextMenu 四种触发方式。"
              code={tooltipCodes.triggerCode}
            />

            <DemoContainer
              title="延迟显示/隐藏"
              description="设置鼠标移入后延时显示和移出后延时隐藏的时间。"
              code={tooltipCodes.delayCode}
            />

            <DemoContainer
              title="受控模式"
              description="通过 visible 属性控制提示框的显示和隐藏。"
              code={tooltipCodes.controlledCode}
            />

            <DemoContainer
              title="自定义颜色"
              description="通过 color 和 bgColor 属性自定义文字颜色和背景颜色。"
              code={tooltipCodes.colorCode}
            />
          </section>
        </div>
      </div>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
