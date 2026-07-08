import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import Button from '../../src/components/Button';

const Basic: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '示例文件.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 'image/png',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>基础上传</h4>
        <Upload
          action="https://httpbin.org/post"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button type="primary">点击上传</Button>
        </Upload>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>多文件上传</h4>
        <Upload
          action="https://httpbin.org/post"
          multiple
          onChange={({ fileList }) => console.log('文件列表:', fileList)}
        >
          <Button>上传多个文件</Button>
        </Upload>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>禁用状态</h4>
        <Upload disabled>
          <Button disabled>禁用上传</Button>
        </Upload>
      </div>
    </div>
  );
};

export default Basic;
