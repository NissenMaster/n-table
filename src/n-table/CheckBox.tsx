import React, { FC, memo, useEffect, useMemo } from 'react';
import { Column } from 'rsuite-table';
import { TsCell, TsHeaderCell } from './Components';
import { CheckBoxProps, OnRowChange, RowSelection } from './types';

/**
 * CheckBox 组件 多选
 * 用来处理表格组件选择使用的
 */
export const CheckBox: FC<CheckBoxProps> = memo((props: CheckBoxProps) => {
  const { className, style, checked = false, onChange, indeterminate, isAll, disabled } = props;

  const handleChange = () => onChange && onChange(!checked);

  useEffect(() => {
    if (isAll) {
      const ic: any = document.getElementById('input-checkbox');
      if (ic) ic.indeterminate = indeterminate;
    }
  });

  return (
    <input
      disabled={disabled}
      id="input-checkbox"
      className={className}
      onChange={handleChange}
      style={style}
      type="checkbox"
      checked={checked}
    />
  );
});

/**
 * RadioBox 组件 单选（todo：未启用）
 * 用来处理表格组件选择使用的
 */
export const RadioBox: FC<CheckBoxProps> = memo((props: CheckBoxProps) => {
  const { className, style } = props;
  return <input className={className} style={style} type="radio" />;
});

/**
 * 检测当前数据页是否为全选
 * @param keyList - 已选数据唯一 kry 值数组
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 */
const checkAllChecked = (keyList: string[] = [], data: any[], rowKey: string): boolean => {
  const dataKeyList = data.map((record: any) => record[rowKey]);
  return dataKeyList.length > 0 && dataKeyList.every((key: string) => keyList.includes(key));
};

/**
 * 表格当前页数据全选方法
 * @param checked - 表格左上角全选的 checkbox 当前状态
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 * @param onRowChange - 单行否选矿勾选方法
 */
const handleSelectAll = (checked: any, data: any[], rowKey: string, onRowChange?: OnRowChange) => {
  onRowChange && onRowChange(checked ? data.map((record: any) => record[rowKey]) : []);
};

/**
 * 表格当前页数据当行数据勾选方法
 * @param checked - 表格当前选中数据的 checkbox 当前状态
 * @param key - 当前选中数据的唯一标识
 * @param keyList - 已选中数据的 唯一标识的数组
 * @param onRowChange - 复选框勾选触发方法
 * @param isCheckbox - 是否是多选类型
 */
const handleSelect = (
  checked: boolean,
  key: any,
  keyList: string[],
  onRowChange?: OnRowChange,
  isCheckbox?: boolean,
): void => {
  let newSelectedKeys: string[] = [];
  if (isCheckbox) {
    newSelectedKeys = checked
      ? [...keyList, key]
      : keyList.filter((selectedKey: string) => selectedKey !== key);
  } else {
    newSelectedKeys = checked ? [key] : [];
  }
  onRowChange && onRowChange(newSelectedKeys);
};

/**
 * 表格左侧的选择列的渲染内容
 * @param rowSelection - 行设置睡醒
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 * @constructor
 */
const CheckSelect = (rowSelection: RowSelection, data: any[], rowKey: string): React.ReactNode => {
  if (rowSelection && JSON.stringify(rowSelection) !== '{}') {
    const { selectRowKeys = [], onRowChange, type = 'checkbox' } = rowSelection;
    const isAllChecked: boolean = useMemo(() => checkAllChecked(selectRowKeys, data, rowKey), [
      selectRowKeys,
      data,
    ]);

    const isCheckbox: boolean = useMemo(() => type === 'checkbox', [type]);

    return (
      <Column fixed="left" key="selectBox" width={40}>
        <TsHeaderCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckBox
            isAll
            disabled={!isCheckbox}
            checked={isAllChecked}
            indeterminate={selectRowKeys.length > 0 && selectRowKeys.length !== data.length}
            onChange={(checked: boolean) => handleSelectAll(checked, data, rowKey, onRowChange)}
          />
        </TsHeaderCell>
        <TsCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(rowData: any) => (
            <CheckBox
              checked={selectRowKeys.includes(rowData[rowKey])}
              onChange={(checked: boolean) =>
                handleSelect(checked, rowData[rowKey], selectRowKeys, onRowChange, isCheckbox)
              }
            />
          )}
        </TsCell>
      </Column>
    );
  }
  return null;
};

export default CheckSelect;
