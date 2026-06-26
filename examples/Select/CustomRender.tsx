import React from 'react';
import { Select, Divider } from '../../src';
import Icon from '../../src/components/Icon';

export default () => {
  const options = [
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' },
    { label: '选项四', value: 'option4' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 300 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义后缀图标</p>
        <Select
          placeholder="自定义图标"
          suffixIcon={<Icon name="ColorFilter" size={14} theme="outline" />}
          options={options}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义选项渲染（optionRender）</p>
        <Select
          placeholder="带描述的选项"
          optionRender={(option) => (
            <div>
              <div style={{ fontWeight: 500 }}>{option.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                这是 {option.label} 的描述信息
              </div>
            </div>
          )}
          options={options}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义下拉菜单（dropdownRender）</p>
        <Select
          placeholder="底部带操作按钮"
          options={options}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ padding: '4px 12px 8px', textAlign: 'center' }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--soui-primary-color, #1677ff)' }}>
                  + 添加新选项
                </a>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
};
