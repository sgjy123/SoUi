import React, { useState, useCallback, useEffect } from 'react';
import { Table } from '../../src';

// 模拟 200 条后端数据
const allData = Array.from({ length: 200 }).map((_, i) => ({
  key: String(i + 1),
  name: `用户${i + 1}`,
  age: 20 + (i % 40),
  gender: i % 3 === 0 ? 'female' : 'male',
  department: ['技术部', '产品部', '设计部', '市场部'][i % 4],
  salary: 8000 + Math.floor(Math.random() * 30000),
}));

// 模拟 API 请求
function fetchData(params: {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, any[]>;
}): Promise<{ data: any[]; total: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      let result = [...allData];

      // 应用过滤
      if (params.filters) {
        Object.entries(params.filters).forEach(([field, values]) => {
          if (values.length > 0) {
            result = result.filter(item => values.includes(item[field as keyof typeof item]));
          }
        });
      }

      // 应用排序
      if (params.sortField && params.sortOrder) {
        result.sort((a: any, b: any) => {
          const valA = a[params.sortField!];
          const valB = b[params.sortField!];
          const cmp = typeof valA === 'string' ? valA.localeCompare(valB) : valA - valB;
          return params.sortOrder === 'descend' ? -cmp : cmp;
        });
      }

      const total = result.length;
      const start = (params.page - 1) * params.pageSize;
      const data = result.slice(start, start + params.pageSize);

      resolve({ data, total });
    }, 800);
  });
}

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    filters: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
    ],
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    filters: [
      { text: '技术部', value: 'tech' },
      { text: '产品部', value: 'product' },
      { text: '设计部', value: 'design' },
      { text: '市场部', value: 'marketing' },
    ],
    filterSearch: true,
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    key: 'salary',
    sorter: true,
    render: (v: number) => `¥${v.toLocaleString()}`,
  },
];

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [sortInfo, setSortInfo] = useState<{ field?: string; order?: string }>({});
  const [filterInfo, setFilterInfo] = useState<Record<string, any[]>>({});

  const loadData = useCallback(async (page: number, pageSize: number, sort?: any, filters?: any) => {
    setLoading(true);
    try {
      const result = await fetchData({
        page,
        pageSize,
        sortField: sort?.field,
        sortOrder: sort?.order,
        filters: filters || filterInfo,
      });
      setData(result.data);
      setPagination(prev => ({ ...prev, current: page, pageSize, total: result.total }));
    } finally {
      setLoading(false);
    }
  }, [filterInfo]);

  useEffect(() => {
    loadData(1, 10);
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        show: true,
        onChange: (page, pageSize) => {
          loadData(page, pageSize, sortInfo, filterInfo);
        },
      }}
      onChange={(pag, sorter: any) => {
        const sort = Array.isArray(sorter) ? sorter[0] : sorter;
        if (sort) {
          setSortInfo({ field: sort.field, order: sort.order || undefined });
          loadData(pagination.current, pagination.pageSize, sort, filterInfo);
        }
      }}
      bordered
    />
  );
};
