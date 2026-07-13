import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const Dependencies: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 密码确认联动 */}
      <div>
        <h4 style={{ marginBottom: 12 }}>密码确认联动</h4>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
          确认密码字段依赖密码字段，两次输入不一致时提示错误。
        </p>
        <div style={{ maxWidth: 420 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(v) => Message.success('密码设置成功')}
          >
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="确认密码"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                {
                  validator: (_rule, value) => {
                    const password = form.getFieldValue('password');
                    if (!value || password === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                },
              ]}
            >
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* 条件字段 */}
      <div>
        <h4 style={{ marginBottom: 12 }}>条件字段显示</h4>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
          根据 "注册类型" 的选择，动态显示不同的额外字段。
        </p>
        <div style={{ maxWidth: 420 }}>
          <Form layout="vertical" onFinish={(v) => Message.success('注册成功')}>
            <Form.Item
              name="accountType"
              label="注册类型"
              rules={[{ required: true, message: '请选择注册类型' }]}
            >
              <Select
                placeholder="请选择"
                options={[
                  { label: '个人', value: 'personal' },
                  { label: '企业', value: 'company' },
                ]}
              />
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prev, cur) => prev.accountType !== cur.accountType}>
              {() => {
                const accountType = form.getFieldValue('accountType');
                if (accountType === 'personal') {
                  return (
                    <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
                      <Input placeholder="请输入身份证号" />
                    </Form.Item>
                  );
                }
                if (accountType === 'company') {
                  return (
                    <>
                      <Form.Item name="companyName" label="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
                        <Input placeholder="请输入企业名称" />
                      </Form.Item>
                      <Form.Item name="taxId" label="税号" rules={[{ required: true, message: '请输入税号' }]}>
                        <Input placeholder="请输入税号" />
                      </Form.Item>
                    </>
                  );
                }
                return null;
              }}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* 表单联动 onValuesChange */}
      <div>
        <h4 style={{ marginBottom: 12 }}>onValuesChange 值变化回调</h4>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
          通过 onValuesChange 监听所有字段变化并实时更新外部状态。
        </p>
        <ValuesChangeDemo />
      </div>
    </div>
  );
};

const ValuesChangeDemo: React.FC = () => {
  const [log, setLog] = React.useState<string[]>([]);

  return (
    <div style={{ maxWidth: 420 }}>
      <Form
        layout="vertical"
        onValuesChange={(changed, all) => {
          const key = Object.keys(changed)[0];
          setLog((prev) => [
            `[${key}] = ${JSON.stringify(changed[key])}`,
            ...prev.slice(0, 9),
          ]);
        }}
      >
        <Form.Item name="name" label="姓名">
          <Input placeholder="输入任意内容" />
        </Form.Item>
        <Form.Item name="city" label="城市">
          <Select
            placeholder="选择城市"
            options={[
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' },
              { label: '广州', value: 'guangzhou' },
            ]}
          />
        </Form.Item>
      </Form>

      {log.length > 0 && (
        <div
          style={{
            padding: 12,
            background: '#f5f5f5',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'monospace',
            maxHeight: 160,
            overflow: 'auto',
          }}
        >
          <div style={{ color: '#999', marginBottom: 4 }}>变化日志（最近10条）：</div>
          {log.map((item, i) => (
            <div key={i} style={{ color: '#333' }}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dependencies;
