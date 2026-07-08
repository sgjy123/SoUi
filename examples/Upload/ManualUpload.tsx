import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import Button from '../../src/components/Button';

const ManualUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleManualUpload = () => {
    // 这里可以手动触发上传逻辑
    alert('手动上传功能，需要配合后端接口使用');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>手动上传</h4>
        <Upload
          action="https://httpbin.org/post"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          manualUpload
        >
          <Button>选择文件</Button>
        </Upload>
        <Button
          type="primary"
          style={{ marginTop: 12 }}
          onClick={handleManualUpload}
          disabled={fileList.filter(f => f.status === 'uploading').length === 0}
        >
          开始上传
        </Button>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>上传前校验</h4>
        <Upload
          action="https://httpbin.org/post"
          beforeUpload={(file) => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              alert('文件大小不能超过 2MB！');
            }
            return isLt2M;
          }}
          onChange={({ fileList }) => console.log('文件列表:', fileList)}
        >
          <Button>上传小于2MB的文件</Button>
        </Upload>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>限制上传数量</h4>
        <Upload
          action="https://httpbin.org/post"
          maxCount={3}
          onChange={({ fileList }) => console.log('文件列表:', fileList)}
        >
          <Button>最多上传3个文件</Button>
        </Upload>
      </div>
    </div>
  );
};

export default ManualUpload;
