import React, { FC } from 'react';
import { CheckBoxProps, RowSelection } from './types';
/**
 * CheckBox 组件 多选
 * 用来处理表格组件选择使用的
 */
export declare const CheckBox: FC<CheckBoxProps>;
/**
 * RadioBox 组件 单选（todo：未启用）
 * 用来处理表格组件选择使用的
 */
export declare const RadioBox: FC<CheckBoxProps>;
/**
 * 表格左侧的选择列的渲染内容
 * @param rowSelection - 行设置睡醒
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 * @constructor
 */
declare const CheckSelect: (rowSelection: RowSelection, data: any[], rowKey: string) => React.ReactNode;
export default CheckSelect;
