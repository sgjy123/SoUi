import React from 'react';
import { Button, Dialog, Space } from '../../src';

export default () => {
  const [dialog, contextHolder] = Dialog.useDialog();

  const showConfirm = () => {
    dialog.confirm({
      title: '确认操作',
      content: '使用 useDialog Hook 可以继承 ConfigProvider 的主题上下文。',
      onOk() {
        // 关闭弹窗
        console.log('确认');
      },
    });
  };

  const showSuccess = () => {
    dialog.success({
      title: '操作成功',
      content: '这是通过 useDialog Hook 调用的成功提示。',
    });
  };

  const showWarning = () => {
    dialog.warning({
      title: '警告',
      content: '这是通过 useDialog Hook 调用的警告提示。',
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={showConfirm}>确认框</Button>
        <Button onClick={showSuccess}>成功</Button>
        <Button onClick={showWarning}>警告</Button>
      </Space>
    </>
  );
};
