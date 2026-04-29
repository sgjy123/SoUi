import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Icon from '../../src/components/Icon';
import './style.less';

interface DemoContainerProps {
  title: string;
  description?: string;
  code: string;
  scope?: Record<string, any>;
}

const DemoContainer: React.FC<DemoContainerProps> = ({
  title,
  description,
  code,
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

      <LiveProvider code={code} scope={defaultScope}>
        <div className="soui-demo-preview">
          <LivePreview />
          <LiveError />
        </div>

        <div className="soui-demo-actions">
          <button
            className={`soui-demo-code-toggle ${showCode ? 'active' : ''}`}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? '隐藏代码' : '查看代码'}
          </button>
        </div>

        {showCode && (
          <div className="soui-demo-code">
            <LiveEditor />
          </div>
        )}
      </LiveProvider>
    </div>
  );
};

export default DemoContainer;
