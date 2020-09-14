import React, { memo, FC } from 'react';
import { TableFooterProps } from './types';

const TableFooter: FC<TableFooterProps> = (props: TableFooterProps) => {
  const { footer } = props;
  return <footer>{footer}</footer>;
};

export default memo(TableFooter);
