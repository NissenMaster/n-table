import React, { CSSProperties } from 'react';
export declare type OnRowChange = (keys: string[]) => void;
export declare type RowType = 'checkbox' | 'radio' | undefined | null;
export declare type RowSelection = {
    type?: RowType;
    selectRowKeys?: string[];
    onRowChange?: OnRowChange;
};
export declare type PageResult = {
    pageSize: number;
    pageNum: number;
};
export declare type ChangeOption = (arg: PageResult) => void;
export interface DataSource {
    asc?: boolean;
    dataList?: any[];
    pageSize?: number | string;
    pageNum?: number;
    needPagination?: boolean;
    offsetIndex?: number;
    pages?: number;
    sortField?: string;
    sortOrder?: string;
    total?: number | string;
}
export interface PaginationProps extends DataSource {
    changePagination?: ChangeOption;
    pageSizeOptions?: number[];
}
export declare type OnRowClick = ((keys: string[], data: any) => void) | undefined;
export interface CheckBoxProps {
    isAll?: boolean;
    className?: string;
    style?: CSSProperties;
    checked: boolean | undefined;
    onChange: (checked: boolean) => void;
    indeterminate?: boolean;
    disabled?: boolean;
}
export interface TableHeaderProps {
    title?: React.ReactNode;
}
export interface TableFooterProps {
    footer?: React.ReactNode;
}
export interface RTableProps {
    id?: string;
    rowKey?: string;
    columns: any[];
    dataSource: DataSource;
    loading?: boolean | undefined | null;
    style?: CSSProperties;
    className?: string;
    rowHeight?: number | (() => number);
    height?: number;
    autoHeight?: boolean | undefined;
    rowSelection?: RowSelection | undefined;
    onRowClick?: OnRowClick;
    pageSizeOptions?: number[];
    changePagination?: ChangeOption;
    bodyRef: any;
    title?: React.ReactNode;
    footer?: React.ReactNode;
}
