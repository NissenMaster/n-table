import React, { FC, memo, useMemo } from 'react';
import { Column } from 'rsuite-table';
import { TsCell, TsHeaderCell, TsTable } from './Components';
import 'rsuite-table/lib/less/index.less';
import CheckSelect from './CheckBox';
import { OnRowClick, RowType, RTableProps } from './types';
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
const getTotWidth = (columns: any[]): number => columns.reduce((sum, next) => sum + next.width, 0);

/**
 * 计算表格每列宽度
 * @param width - columns 指定宽度
 * @param totalWidth - 总长度
 * @param bodyRef
 */
const getColumnsWidth = (width: number, totalWidth: number, bodyRef: any): number => {
  return (bodyRef?.current?.clientWidth || window.innerWidth) * (width / totalWidth);
};

/**
 * 单击行触发方法，内部做了数据选中处理并执行外部传入 click 方法
 * @param row - 所点击行的数据
 * @param key - 表格约束唯一 key 值的属性
 * @param keys - 已选中数据唯一 key 值数组
 * @param click - 外部传入行单击方法
 * @param type - 列属性
 */
const handleClick = (row: any, key: string, keys: string[], click?: OnRowClick, type?: RowType) => {
  let newSelectedKeys: string[] = [];
  const recordKey = row?.[key];
  if (type === 'checkbox') {
    newSelectedKeys = !keys.includes(recordKey)
      ? [...keys, recordKey]
      : keys.filter((selectedKey: string) => selectedKey !== recordKey);
  } else {
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
const renderSelectedRow = (rowData: any, selectRowKeys: string[], rowKey: string): string => {
  return rowData && selectRowKeys.includes(rowData[rowKey]) ? 'row-selected-class' : '';
};

/**
 * 表格主体
 * @param props - RTableProps
 * @constructor
 */
const Table: FC<RTableProps> = (props: RTableProps) => {
  const {
    columns,
    dataSource,
    loading,
    className,
    style,
    id,
    rowKey = 'id',
    rowSelection = {},
    rowHeight = 32,
    height,
    autoHeight,
    onRowClick,
    pageSizeOptions,
    changePagination,
    bodyRef,
    title,
    footer,
    ...otherProps
  } = props;

  // @ts-ignore
  const { selectRowKeys = [], type = 'checkbox' } = rowSelection;

  const { dataList = [], pageNum, pageSize, total, pages } = dataSource;

  const totalWidth: number = useMemo(() => getTotWidth(columns), [columns]);

  return (
    <div className={className} style={style}>
      {title ? <TableHeader /> : null}
      <TsTable
        id={id}
        bordered
        data={dataList}
        height={height}
        loading={loading}
        rowHeight={rowHeight}
        virtualized={!!height}
        renderEmpty={() => <TableEmpty />}
        locale={{ loading: '数据加载中，请稍后' }}
        rowClassName={(rowData: any) => renderSelectedRow(rowData, selectRowKeys, rowKey)}
        onRowClick={(rowData: any) => handleClick(rowData, rowKey, selectRowKeys, onRowClick, type)}
        {...otherProps}
        // renderLoading={() => <TableLoading />}
      >
        {[CheckSelect(rowSelection, dataList, rowKey)].concat(
          columns.map((column) => {
            return (
              <Column
                resizable
                key={column.dataIndex || column.key}
                fixed={column.fixed}
                width={getColumnsWidth(column.width, totalWidth, bodyRef)}
              >
                <TsHeaderCell style={DEFAULT_HEADER_STYLE}>{column.title}</TsHeaderCell>
                <TsCell dataKey={column.dataIndex} style={DEFAULT_CELL_STYLE}>
                  {(rowData: any) =>
                    column.render
                      ? column.render(rowData?.[column.dataIndex] || rowData)
                      : rowData[column.dataIndex]
                  }
                </TsCell>
              </Column>
            );
          }),
        )}
      </TsTable>
      {footer ? <TableFooter /> : null}
      <Pagination
        total={total}
        pageNum={pageNum}
        pageSize={pageSize}
        pages={pages}
        pageSizeOptions={pageSizeOptions}
        changePagination={changePagination}
      />
    </div>
  );
};

export default memo(Table);
