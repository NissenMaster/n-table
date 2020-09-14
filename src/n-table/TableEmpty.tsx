import React, { memo, FC } from 'react';
import empty from './public/empty.png';
import { DEFAULT_NOTICE_STYLE, DEFAULT_EMPTY_STYLE } from './style';

const TableEmpty: FC = () => {
  return (
    <div style={DEFAULT_EMPTY_STYLE}>
      <div>
        <img src={empty} alt="" style={{ height: 100, width: 100 }} />
        <p style={DEFAULT_NOTICE_STYLE}>暂无数据</p>
      </div>
    </div>
  );
};

export default memo(TableEmpty);
