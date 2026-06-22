import React from 'react';
import { Button, Dialog, Space } from '../../src';

export default () => {
  const showConfirm = () => {
    Dialog.confirm({
      title: '确认操作',
      content: '你确定要执行这个操作吗？此操作不可撤销。',
      onOk() {
        console.log('确认');
      },
      onCancel() {
        console.log('取消');
      },
    });
  };

  const showInfo = () => {
    Dialog.info({
      title: '提示信息',
      content: '这是一条信息提示。',
    });
  };

  const showSuccess = () => {
    Dialog.success({
      title: '操作成功',
      content: '数据已成功保存！',
    });
  };

  const showWarning = () => {
    Dialog.warning({
      title: '警告',
      content: '该操作可能存在风险，请谨慎操作。',
    });
  };

  const showError = () => {
    Dialog.error({
      title: '操作失败',
      content: '服务器连接异常，请稍后重试。',
    });
  };

  return (
    <Space>
      <Button onClick={showConfirm}>确认框</Button>
      <Button onClick={showInfo}>信息</Button>
      <Button onClick={showSuccess}>成功</Button>
      <Button onClick={showWarning}>警告</Button>
      <Button onClick={showError}>错误</Button>
    </Space>
  );
};
