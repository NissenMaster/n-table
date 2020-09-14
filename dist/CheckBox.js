var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { memo, useEffect, useMemo } from 'react';
import { Column } from 'rsuite-table';
import { TsCell, TsHeaderCell } from './Components';
/**
 * CheckBox 组件 多选
 * 用来处理表格组件选择使用的
 */
export var CheckBox = memo(function (props) {
    var className = props.className, style = props.style, _a = props.checked, checked = _a === void 0 ? false : _a, onChange = props.onChange, indeterminate = props.indeterminate, isAll = props.isAll, disabled = props.disabled;
    var handleChange = function () { return onChange && onChange(!checked); };
    useEffect(function () {
        if (isAll) {
            var ic = document.getElementById('input-checkbox');
            if (ic)
                ic.indeterminate = indeterminate;
        }
    });
    return (React.createElement("input", { disabled: disabled, id: "input-checkbox", className: className, onChange: handleChange, style: style, type: "checkbox", checked: checked }));
});
/**
 * RadioBox 组件 单选（todo：未启用）
 * 用来处理表格组件选择使用的
 */
export var RadioBox = memo(function (props) {
    var className = props.className, style = props.style;
    return React.createElement("input", { className: className, style: style, type: "radio" });
});
/**
 * 检测当前数据页是否为全选
 * @param keyList - 已选数据唯一 kry 值数组
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 */
var checkAllChecked = function (keyList, data, rowKey) {
    if (keyList === void 0) { keyList = []; }
    var dataKeyList = data.map(function (record) { return record[rowKey]; });
    return dataKeyList.length > 0 && dataKeyList.every(function (key) { return keyList.includes(key); });
};
/**
 * 表格当前页数据全选方法
 * @param checked - 表格左上角全选的 checkbox 当前状态
 * @param data - 数据源
 * @param rowKey - 约定唯一 key 值属性
 * @param onRowChange - 单行否选矿勾选方法
 */
var handleSelectAll = function (checked, data, rowKey, onRowChange) {
    onRowChange && onRowChange(checked ? data.map(function (record) { return record[rowKey]; }) : []);
};
/**
 * 表格当前页数据当行数据勾选方法
 * @param checked - 表格当前选中数据的 checkbox 当前状态
 * @param key - 当前选中数据的唯一标识
 * @param keyList - 已选中数据的 唯一标识的数组
 * @param onRowChange - 复选框勾选触发方法
 * @param isCheckbox - 是否是多选类型
 */
var handleSelect = function (checked, key, keyList, onRowChange, isCheckbox) {
    var newSelectedKeys = [];
    if (isCheckbox) {
        newSelectedKeys = checked
            ? __spreadArrays(keyList, [key]) : keyList.filter(function (selectedKey) { return selectedKey !== key; });
    }
    else {
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
var CheckSelect = function (rowSelection, data, rowKey) {
    if (rowSelection && JSON.stringify(rowSelection) !== '{}') {
        var _a = rowSelection.selectRowKeys, selectRowKeys_1 = _a === void 0 ? [] : _a, onRowChange_1 = rowSelection.onRowChange, _b = rowSelection.type, type_1 = _b === void 0 ? 'checkbox' : _b;
        var isAllChecked = useMemo(function () { return checkAllChecked(selectRowKeys_1, data, rowKey); }, [
            selectRowKeys_1,
            data,
        ]);
        var isCheckbox_1 = useMemo(function () { return type_1 === 'checkbox'; }, [type_1]);
        return (React.createElement(Column, { fixed: "left", key: "selectBox", width: 40 },
            React.createElement(TsHeaderCell, { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(CheckBox, { isAll: true, disabled: !isCheckbox_1, checked: isAllChecked, indeterminate: selectRowKeys_1.length > 0 && selectRowKeys_1.length !== data.length, onChange: function (checked) { return handleSelectAll(checked, data, rowKey, onRowChange_1); } })),
            React.createElement(TsCell, { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }, function (rowData) { return (React.createElement(CheckBox, { checked: selectRowKeys_1.includes(rowData[rowKey]), onChange: function (checked) {
                    return handleSelect(checked, rowData[rowKey], selectRowKeys_1, onRowChange_1, isCheckbox_1);
                } })); })));
    }
    return null;
};
export default CheckSelect;
