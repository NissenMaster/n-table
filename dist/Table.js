var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { memo, useMemo } from 'react';
import { Column } from 'rsuite-table';
import { TsCell, TsHeaderCell, TsTable } from './Components';
import 'rsuite-table/lib/less/index.less';
import CheckSelect from './CheckBox';
import TableEmpty from './TableEmpty';
import Pagination from './Pagination';
import { DEFAULT_CELL_STYLE, DEFAULT_HEADER_STYLE } from './style';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import './TableStyle.css';
// import TableLoading from './TableLoading';
/**
 * 获取表格列总长度
 * @param columns - 表格列
 */
var getTotWidth = function (columns) { return columns.reduce(function (sum, next) { return sum + next.width; }, 0); };
/**
 * 计算表格每列宽度
 * @param width - columns 指定宽度
 * @param totalWidth - 总长度
 * @param bodyRef
 */
var getColumnsWidth = function (width, totalWidth, bodyRef) {
    var _a, _b;
    return (((_b = (_a = bodyRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.clientWidth) || window.innerWidth) * (width / totalWidth);
};
/**
 * 单击行触发方法，内部做了数据选中处理并执行外部传入 click 方法
 * @param row - 所点击行的数据
 * @param key - 表格约束唯一 key 值的属性
 * @param keys - 已选中数据唯一 key 值数组
 * @param click - 外部传入行单击方法
 * @param type - 列属性
 */
var handleClick = function (row, key, keys, click, type) {
    var _a;
    var newSelectedKeys = [];
    var recordKey = (_a = row) === null || _a === void 0 ? void 0 : _a[key];
    if (type === 'checkbox') {
        newSelectedKeys = !keys.includes(recordKey)
            ? __spreadArrays(keys, [recordKey]) : keys.filter(function (selectedKey) { return selectedKey !== recordKey; });
    }
    else {
        newSelectedKeys = !keys.includes(recordKey) ? [recordKey] : [];
    }
    click && click(newSelectedKeys, row);
};
/**
 * 渲染表格选中数据样式
 * @param rowData - 表格单行数据
 * @param selectRowKeys - 表格已选数据
 * @param rowKey - 外部约束唯一 key 值属性
 */
var renderSelectedRow = function (rowData, selectRowKeys, rowKey) {
    return rowData && selectRowKeys.includes(rowData[rowKey]) ? 'row-selected-class' : '';
};
/**
 * 表格主体
 * @param props - RTableProps
 * @constructor
 */
var Table = function (props) {
    var columns = props.columns, dataSource = props.dataSource, loading = props.loading, className = props.className, style = props.style, id = props.id, _a = props.rowKey, rowKey = _a === void 0 ? 'id' : _a, _b = props.rowSelection, rowSelection = _b === void 0 ? {} : _b, _c = props.rowHeight, rowHeight = _c === void 0 ? 32 : _c, height = props.height, autoHeight = props.autoHeight, onRowClick = props.onRowClick, pageSizeOptions = props.pageSizeOptions, changePagination = props.changePagination, bodyRef = props.bodyRef, title = props.title, footer = props.footer, otherProps = __rest(props, ["columns", "dataSource", "loading", "className", "style", "id", "rowKey", "rowSelection", "rowHeight", "height", "autoHeight", "onRowClick", "pageSizeOptions", "changePagination", "bodyRef", "title", "footer"]);
    // @ts-ignore
    var _d = rowSelection.selectRowKeys, selectRowKeys = _d === void 0 ? [] : _d, _e = rowSelection.type, type = _e === void 0 ? 'checkbox' : _e;
    var _f = dataSource.dataList, dataList = _f === void 0 ? [] : _f, pageNum = dataSource.pageNum, pageSize = dataSource.pageSize, total = dataSource.total, pages = dataSource.pages;
    var totalWidth = useMemo(function () { return getTotWidth(columns); }, [columns]);
    return (React.createElement("div", { className: className, style: style },
        title ? React.createElement(TableHeader, null) : null,
        React.createElement(TsTable, __assign({ id: id, bordered: true, data: dataList, height: height, loading: loading, rowHeight: rowHeight, virtualized: !!height, renderEmpty: function () { return React.createElement(TableEmpty, null); }, locale: { loading: '数据加载中，请稍后' }, rowClassName: function (rowData) { return renderSelectedRow(rowData, selectRowKeys, rowKey); }, onRowClick: function (rowData) { return handleClick(rowData, rowKey, selectRowKeys, onRowClick, type); } }, otherProps), [CheckSelect(rowSelection, dataList, rowKey)].concat(columns.map(function (column) {
            return (React.createElement(Column, { resizable: true, key: column.dataIndex || column.key, fixed: column.fixed, width: getColumnsWidth(column.width, totalWidth, bodyRef) },
                React.createElement(TsHeaderCell, { style: DEFAULT_HEADER_STYLE }, column.title),
                React.createElement(TsCell, { dataKey: column.dataIndex, style: DEFAULT_CELL_STYLE }, function (rowData) {
                    var _a;
                    return column.render
                        ? column.render(((_a = rowData) === null || _a === void 0 ? void 0 : _a[column.dataIndex]) || rowData)
                        : rowData[column.dataIndex];
                })));
        }))),
        footer ? React.createElement(TableFooter, null) : null,
        React.createElement(Pagination, { total: total, pageNum: pageNum, pageSize: pageSize, pages: pages, pageSizeOptions: pageSizeOptions, changePagination: changePagination })));
};
export default memo(Table);
