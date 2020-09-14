import React, { memo, FC } from 'react';
import { TableHeaderProps } from './types';

const TableHeader: FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const { title } = props;
  return <header>{title}</header>;
};

export default memo(TableHeader);
