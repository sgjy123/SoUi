import React from 'react';
import { Anchor } from '../../src';

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <h2 id="anchor-basic-demo" style={{ margin: '0 0 16px' }}>基础用法</h2>
      <div id="section-1" style={{ padding: '24px', margin: '0 0 16px', background: '#f0f5ff', borderRadius: '8px', border: '1px solid #d6e4ff', height: '300px' }}>
        <h3>第一部分</h3>
        <p>这是第一个锚点对应的内容区域。锚点组件可以帮助用户快速定位到页面的不同区域。</p>
      </div>
      <div id="section-2" style={{ padding: '24px', margin: '0 0 16px', background: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', height: '300px' }}>
        <h3>第二部分</h3>
        <p>这是第二个锚点对应的内容区域。滚动页面或点击锚点链接即可快速跳转。</p>
      </div>
      <div id="section-3" style={{ padding: '24px', margin: '0 0 16px', background: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591', height: '300px' }}>
        <h3>第三部分</h3>
        <p>这是第三个锚点对应的内容区域。锚点支持嵌套结构，可以展示多层次的文档目录。</p>
      </div>
      <div id="section-4" style={{ padding: '24px', margin: '0 0 16px', background: '#fff0f6', borderRadius: '8px', border: '1px solid #ffadd2', height: '300px' }}>
        <h3>第四部分</h3>
        <p>这是第四个锚点对应的内容区域。每个锚点链接都对应页面中的一个具体位置。</p>
      </div>
    </div>
    <div style={{ width: '160px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor
        items={[
          { key: '1', href: '#section-1', title: '第一部分' },
          { key: '2', href: '#section-2', title: '第二部分' },
          { key: '3', href: '#section-3', title: '第三部分' },
          { key: '4', href: '#section-4', title: '第四部分' },
        ]}
      />
    </div>
  </div>
);
