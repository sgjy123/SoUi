import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Icon from '../../src/components/Icon';
import Typography from '../../src/components/Typography';
import Tooltip from '../../src/components/Tooltip';
import Divider from '../../src/components/Divider';
import { Row, Col } from '../../src/components/Grid';
import Layout from '../../src/components/Layout';
import Menu from '../../src/components/Menu';
import './style.less';

interface DemoContainerProps {
  title: string;
  description?: string;
  code: string; // 通过 ?raw 导入的源码字符串
  component?: React.FC; // 可选：传入真实组件用于预览（性能更好）
  scope?: Record<string, any>;
}

const DemoContainer: React.FC<DemoContainerProps> = ({
  title,
  description,
  code,
  component: Component,
  scope = {},
}) => {
  const [showCode, setShowCode] = useState(false);

  // 默认的可用组件和库
  const defaultScope = {
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    Button,
    Space,
    Icon,
    Typography,
    Title: Typography.Title,
    Paragraph: Typography.Paragraph,
    Text: Typography.Text,
    Link: Typography.Link,
    Tooltip,
    Divider,
    Row,
    Col,
    Layout,
    Header: Layout.Header,
    Sider: Layout.Sider,
    Content: Layout.Content,
    Footer: Layout.Footer,
    Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
    MenuGroup: Menu.Group,
    ...scope,
  };

  return (
    <div className="soui-demo-container">
      <div className="soui-demo-header">
        <h3>{title}</h3>
      </div>

      {description && (
        <div className="soui-demo-description">
          <p>{description}</p>
        </div>
      )}

      {/* 如果传入了真实组件，优先渲染真实组件以获得更好的 HMR 体验 */}
      {Component ? (
        <div className="soui-demo-preview">
          <Component />
        </div>
      ) : (
        <LiveProvider code={code} scope={defaultScope}>
          <div className="soui-demo-preview">
            <LivePreview />
            <LiveError />
          </div>
        </LiveProvider>
      )}

      <div className="soui-demo-actions">
        <button
          className={`soui-demo-code-toggle ${showCode ? 'active' : ''}`}
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? '隐藏代码' : '查看代码'}
        </button>
      </div>

      {showCode && (
        <LiveProvider code={code} scope={defaultScope}>
          <div className="soui-demo-code">
            <LiveEditor />
          </div>
        </LiveProvider>
      )}
    </div>
  );
};

export default DemoContainer;
