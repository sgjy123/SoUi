export const basicCode = `<Pagination total={100} />`;

export const changerCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <Pagination
    total={500}
    showSizeChanger
    showQuickJumper
    showTotal={(total, range) => \`第 \${range[0]}-\${range[1]} 条 / 共 \${total} 条\`}
  />
  <Pagination
    total={500}
    showSizeChanger
    pageSizeOptions={[5, 10, 20, 50]}
    showTotal={(total) => \`共 \${total} 条\`}
  />
</div>`;

export const sizesCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <div style={{ marginBottom: 8, color: '#666' }}>默认尺寸</div>
    <Pagination total={100} />
  </div>
  <div>
    <div style={{ marginBottom: 8, color: '#666' }}>小尺寸</div>
    <Pagination total={100} size="small" />
  </div>
  <div>
    <div style={{ marginBottom: 8, color: '#666' }}>简洁模式</div>
    <Pagination total={100} simple />
  </div>
</div>`;
