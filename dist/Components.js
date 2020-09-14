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
import React from 'react';
import { Cell, HeaderCell, Table } from 'rsuite-table';
// @ts-ignore
export var TsTable = function (props) { return React.createElement(Table, __assign({}, props)); };
export var TsHeaderCell = function (props) { return React.createElement(HeaderCell, __assign({}, props), props.children); };
export var TsCell = function (props) { return React.createElement(Cell, __assign({}, props), props.children); };
