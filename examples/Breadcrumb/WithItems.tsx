import React from 'react';
import { Breadcrumb } from '../../src';

const items = [
  { title: '首页', href: '' },
  { title: '应用中心', href: '' },
  { title: '应用列表' },
];

export default () => <Breadcrumb items={items.map(item => ({ children: item.title, href: item.href }))} />;
