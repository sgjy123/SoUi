export const basicCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="Info Text" type="info" />
  <Alert message="Success Text" type="success" />
  <Alert message="Warning Text" type="warning" />
  <Alert message="Error Text" type="error" />
</Space>`;

export const descriptionCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="信息提示" description="这是信息类型的警告提示，用于一般性提示信息。" type="info" showIcon />
  <Alert message="操作成功" description="恭喜！您的操作已成功完成，数据已保存。" type="success" showIcon />
  <Alert message="注意警告" description="请检查您的输入信息，部分内容可能需要修改。" type="warning" showIcon />
  <Alert message="操作失败" description="很抱歉，提交过程中出现了错误，请稍后重试。" type="error" showIcon />
</Space>`;

export const closableCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="可关闭的提示" type="info" closable />
  <Alert message="自定义关闭图标" type="success" closable closeIcon="✕" />
  <Alert message="带描述的关闭提示" description="这是一个带有描述文字的可关闭警告提示。" type="warning" closable showIcon />
</Space>`;

export const withIconCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="带图标的信息提示" type="info" showIcon />
  <Alert message="带图标的成功提示" type="success" showIcon />
  <Alert message="带图标的警告提示" type="warning" showIcon />
  <Alert message="带图标的错误提示" type="error" showIcon />
</Space>`;

export const descriptionIconCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="Info Text" description="Additional description and information." type="info" showIcon />
  <Alert message="Success Text" description="Additional description and information." type="success" showIcon />
  <Alert message="Warning Text" description="Additional description and information." type="warning" showIcon />
  <Alert message="Error Text" description="Additional description and information." type="error" showIcon />
</Space>`;

export const actionCode = `<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="操作成功" type="success" action={<button style={{ padding: '2px 8px', fontSize: 12 }}>查看详情</button>} />
  <Alert
    message="系统通知"
    description="系统将于今晚 22:00 进行维护，预计持续 2 小时。"
    type="warning"
    action={<button style={{ padding: '4px 12px' }}>知道了</button>}
    showIcon
  />
</Space>`;

export const bannerCode = `<div>
  <Alert message="Banner 模式提示" type="info" banner />
  <div style={{ height: 8 }} />
  <Alert message="Banner 警告模式" description="这是一个 banner 模式的警告提示，默认去掉左右边框和圆角。" type="warning" banner showIcon />
</div>`;
