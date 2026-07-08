import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import ConfigProvider from '../../src/components/ConfigProvider';
import Button from '../../src/components/Button';

const ThemeConfig: React.FC = () => {
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>紫色主题</h4>
        <ConfigProvider
          theme={{
            components: {
              Upload: {
                colorPrimary: '#722ed1',
                colorPrimaryHover: '#9254de',
                borderRadius: 8,
                colorBorder: '#d3adf7',
              },
            },
          }}
        >
          <Upload
            action="https://httpbin.org/post"
            fileList={fileList1}
            onChange={({ fileList }) => setFileList1(fileList)}
          >
            <Button>紫色主题上传</Button>
          </Upload>
        </ConfigProvider>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>绿色主题 + 大圆角</h4>
        <ConfigProvider
          theme={{
            components: {
              Upload: {
                colorPrimary: '#52c41a',
                colorPrimaryHover: '#73d13d',
                borderRadius: 12,
                colorBorder: '#b7eb8f',
              },
            },
          }}
        >
          <Upload.Dragger
            action="https://httpbin.org/post"
            fileList={fileList2}
            onChange={({ fileList }) => setFileList2(fileList)}
            multiple
          >
            <div style={{ padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 16, margin: '8px 0' }}>绿色主题拖拽上传</p>
              <p style={{ fontSize: 12, color: '#999' }}>自定义边框颜色和圆角</p>
            </div>
          </Upload.Dragger>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ThemeConfig;
