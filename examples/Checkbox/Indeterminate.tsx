import React, { useState } from 'react';
import { Checkbox } from '../../src';

export default () => {
  const plainOptions = ['苹果', '橘子', '香蕉'];
  const [checkedList, setCheckedList] = useState<string[]>(['苹果']);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: Array<string | number | boolean>) => {
    setCheckedList(list as string[]);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>全选 / 半选</p>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
      </div>
      <div style={{ paddingLeft: 8 }}>
        <Checkbox.Group
          options={plainOptions.map((v) => ({ label: v, value: v }))}
          value={checkedList}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
