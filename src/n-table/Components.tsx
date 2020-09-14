import React from 'react';
import { Cell, HeaderCell, Table } from 'rsuite-table';

// @ts-ignore
export const TsTable = (props: any) => <Table {...props} />;

export const TsHeaderCell = (props: any) => <HeaderCell {...props}>{props.children}</HeaderCell>;

export const TsCell = (props: any) => <Cell {...props}>{props.children}</Cell>;
