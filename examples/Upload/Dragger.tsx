import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';

const Dragger: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>拖拽上传</h4>
        <Upload.Dragger
          action="https://httpbin.org/post"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          multiple
        />
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>限制文件类型</h4>
        <Upload.Dragger
          action="https://httpbin.org/post"
          accept="image/*"
          onChange={({ fileList }) => console.log('图片文件:', fileList)}
        >
          <div style={{ padding: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 16, margin: '8px 0' }}>点击或拖拽图片到此区域</p>
            <p style={{ fontSize: 12, color: '#999' }}>仅支持图片文件</p>
          </div>
        </Upload.Dragger>
      </div>
    </div>
  );
};

export default Dragger;
