import React from 'react';
import { Table } from '../../src';

const columns = [
  { title: '产品名称', dataIndex: 'product', key: 'product' },
  { title: '类别', dataIndex: 'category', key: 'category' },
  { title: '单价 (¥)', dataIndex: 'price', key: 'price', align: 'right' as const },
  { title: '数量', dataIndex: 'quantity', key: 'quantity', align: 'right' as const },
  { title: '小计 (¥)', dataIndex: 'subtotal', key: 'subtotal', align: 'right' as const,
    render: (_: any, record: any) => (record.price * record.quantity).toLocaleString(),
  },
];

const dataSource = [
  { key: '1', product: 'MacBook Pro', category: '电脑', price: 14999, quantity: 2 },
  { key: '2', product: 'iPhone 15 Pro', category: '手机', price: 8999, quantity: 5 },
  { key: '3', product: 'AirPods Pro', category: '耳机', price: 1899, quantity: 10 },
  { key: '4', product: 'iPad Air', category: '平板', price: 4799, quantity: 3 },
  { key: '5', product: 'Apple Watch', category: '手表', price: 2999, quantity: 4 },
];

export default () => {
  const totalAmount = dataSource.reduce((sum, r) => sum + r.price * r.quantity, 0);
  const totalQty = dataSource.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      summary={() => (
        <tr className="soui-table-tr" style={{ fontWeight: 600, background: '#fafafa' }}>
          <td colSpan={2} className="soui-table-td" style={{ textAlign: 'right', fontWeight: 600 }}>
            合计
          </td>
          <td className="soui-table-td" style={{ textAlign: 'right' }}>—</td>
          <td className="soui-table-td" style={{ textAlign: 'right' }}>{totalQty}</td>
          <td className="soui-table-td" style={{ textAlign: 'right' }}>{totalAmount.toLocaleString()}</td>
        </tr>
      )}
    />
  );
};
