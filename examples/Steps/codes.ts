export const basicCode = `<Steps current={1}>
  <Steps.Step title="第一步" description="这是第一步的描述内容" />
  <Steps.Step title="第二步" description="这是第二步的描述内容" />
  <Steps.Step title="第三步" description="这是第三步的描述内容" />
  <Steps.Step title="第四步" description="这是第四步的描述内容" />
</Steps>`;

export const verticalCode = `<Steps current={1} direction="vertical">
  <Steps.Step title="第一步" description="这是垂直步骤条的第一步" />
  <Steps.Step title="第二步" description="这是垂直步骤条的第二步" />
  <Steps.Step title="第三步" description="这是垂直步骤条的第三步" />
</Steps>`;

export const withIconCode = `<Steps current={2}>
  <Steps.Step 
    title="登录" 
    description="用户登录系统"
    icon={<Icon name="User" size={16} />}
  />
  <Steps.Step 
    title="验证" 
    description="身份验证过程"
    icon={<Icon name="Shield" size={16} />}
  />
  <Steps.Step 
    title="完成" 
    description="操作已完成"
    icon={<Icon name="CheckCircle" size={16} />}
  />
</Steps>`;

export const smallSizeCode = `<Steps current={1} size="small">
  <Steps.Step title="第一步" />
  <Steps.Step title="第二步" />
  <Steps.Step title="第三步" />
</Steps>`;

export const controlledCode = `const [current, setCurrent] = useState(0);

const handleChange = (newCurrent: number) => {
  setCurrent(newCurrent);
};

<Steps current={current} onChange={handleChange}>
  <Steps.Step title="基本信息" description="填写个人基本信息" />
  <Steps.Step title="联系方式" description="验证手机号码和邮箱" />
  <Steps.Step title="身份认证" description="上传身份证件" />
  <Steps.Step title="完成注册" description="账户创建成功" />
</Steps>`;

export const progressDotCode = `<Steps current={1} progressDot>
  <Steps.Step title="第一步" description="这是第一步的描述内容" />
  <Steps.Step title="第二步" description="这是第二步的描述内容" />
  <Steps.Step title="第三步" description="这是第三步的描述内容" />
  <Steps.Step title="第四步" description="这是第四步的描述内容" />
</Steps>

// 自定义进度点
<Steps 
  current={2} 
  progressDot={(dot, { index, status }) => (
    <span style={{ 
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: status === 'finish' ? '#52c41a' : status === 'process' ? '#1890ff' : '#d9d9d9'
    }} />
  )}
>
  <Steps.Step title="登录" description="用户登录系统" />
  <Steps.Step title="验证" description="身份验证过程" />
  <Steps.Step title="完成" description="操作已完成" />
</Steps>`;

export const withSubtitleCode = `<Steps current={1}>
  <Steps.Step 
    title="账户信息" 
    subTitle="基本资料"
    description="填写您的基本信息" 
  />
  <Steps.Step 
    title="身份验证" 
    subTitle="安全认证"
    description="完成身份验证流程" 
  />
  <Steps.Step 
    title="设置完成" 
    subTitle="成功"
    description="您的账户已设置完成" 
  />
</Steps>

// 禁用状态
<Steps current={1}>
  <Steps.Step title="已完成" description="此步骤已完成" />
  <Steps.Step title="进行中" description="当前正在处理" />
  <Steps.Step title="待处理" description="等待开始" disabled />
  <Steps.Step title="未开始" description="尚未到达" disabled />
</Steps>`;

export const labelPlacementCode = `<Steps current={1} labelPlacement="vertical">
  <Steps.Step title="第一步" description="这是第一步的描述内容" />
  <Steps.Step title="第二步" description="这是第二步的描述内容" />
  <Steps.Step title="第三步" description="这是第三步的描述内容" />
  <Steps.Step title="第四步" description="这是第四步的描述内容" />
</Steps>`;
