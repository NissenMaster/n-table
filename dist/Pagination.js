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
import React, { memo, useState } from 'react';
import { DEFAULT_ACTION_STYLE, DEFAULT_INPUT_STYLE, DEFAULT_MAIN_STYLE } from './style';
import last from './public/last.svg';
import next from './public/next.svg';
import { SIZE_OPTIONS } from './utils';
// input 页数输入框的 ref
var pageInputRef = React.createRef();
// select 条数下拉选的 ref
var pageSelectRef = React.createRef();
// 根据 ref 获取用户录入的页数和每页条数
var getPageOptions = function () {
    var _a, _b, _c, _d;
    return ({
        pageSize: Number(((_b = (_a = pageSelectRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.value) || 10),
        pageNum: Number(((_d = (_c = pageInputRef) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.value) || 1),
    });
};
/**
 * 页数输入框值变化跟踪方法
 * @param changeValue - setNum 方法
 * @param max - setNum 方法
 */
var handleInputChange = function (changeValue, max) {
    var _a, _b;
    var inputValue = ((_b = (_a = pageInputRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.value) || 1;
    if (max && inputValue > max)
        inputValue = max;
    if (inputValue < 1)
        inputValue = 1;
    changeValue && changeValue(inputValue);
};
/**
 * 每页数据条数下拉选变更跟踪方法（变更时触发外部传入查询方法）
 * @param changePagination - 外部传入方法
 */
var handleSelectChange = function (changePagination) {
    changePagination && changePagination(getPageOptions());
};
/**
 * 按回车键触发外部传入方法，进行相关分页调整查询
 * @param e - Event
 * @param changePagination - 外部传入方法
 */
var onKeyPress = function (e, changePagination) {
    e.key === 'Enter' && handleSelectChange(changePagination);
};
/**
 * 点击翻页触发方法
 * @param type - 按钮类型
 * @param pages - 总页数
 * @param changePagination - 翻页触发方法
 * @param changeValue - 内部更新页数显示数值
 */
var handleClick = function (type, pages, changePagination, changeValue) {
    var _a = getPageOptions(), pageSize = _a.pageSize, pageNum = _a.pageNum;
    if (type === 'add' && pageNum === pages)
        return;
    if (type === 'subtract' && pageNum === 1)
        return;
    var newPageNum = type === 'add' ? Number(pageNum) + 1 : pageNum - 1;
    changeValue && changeValue(newPageNum);
    changePagination && changePagination({ pageSize: pageSize, pageNum: newPageNum });
};
/**
 * 分页器组件
 * @param props - PaginationProps
 * @constructor
 */
var Pagination = function (props) {
    var pageSize = props.pageSize, _a = props.pageNum, pageNum = _a === void 0 ? 1 : _a, total = props.total, changePagination = props.changePagination, _b = props.pageSizeOptions, pageSizeOptions = _b === void 0 ? SIZE_OPTIONS : _b, _c = props.pages, pages = _c === void 0 ? 1 : _c;
    var _d = useState(pageNum), num = _d[0], setNum = _d[1];
    return (React.createElement("div", { style: DEFAULT_MAIN_STYLE },
        React.createElement("div", { style: { display: 'flex' } },
            React.createElement("span", null,
                "\u5171\u8BA1 ",
                total,
                " \u6761\u6570\u636E"),
            React.createElement("div", { style: __assign(__assign({}, DEFAULT_ACTION_STYLE), { cursor: Number(num) === 1 ? 'no-drop' : 'pointer' }), onClick: function () { return handleClick('subtract', pages, changePagination, setNum); } },
                React.createElement("img", { style: { width: 12, height: 12 }, src: last, alt: "" })),
            React.createElement("input", { type: "text", value: num || 0, ref: pageInputRef, style: DEFAULT_INPUT_STYLE, onKeyPress: function (e) { return onKeyPress(e, changePagination); }, onChange: function () { return handleInputChange(setNum, pages); } }),
            React.createElement("div", { style: __assign(__assign({}, DEFAULT_ACTION_STYLE), { cursor: Number(num) === pages ? 'no-drop' : 'pointer' }), onClick: function () { return handleClick('add', pages, changePagination, setNum); } },
                React.createElement("img", { style: { width: 12, height: 12 }, src: next, alt: "" })),
            React.createElement("select", { ref: pageSelectRef, onChange: function () { return handleSelectChange(changePagination); }, value: pageSize }, pageSizeOptions.map(function (size) {
                return (React.createElement("option", { key: size, value: size },
                    size,
                    " \u6761/\u9875"));
            })))));
};
export default memo(Pagination);
