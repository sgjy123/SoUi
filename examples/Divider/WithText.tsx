import React from 'react';
import { Divider } from '../../src';

export default () => (
  <>
    <p>文本内容</p>
    <Divider orientation="left">左对齐文字</Divider>
    <p>文本内容</p>
    <Divider orientation="right">右对齐文字</Divider>
    <p>文本内容</p>
  </>
);
