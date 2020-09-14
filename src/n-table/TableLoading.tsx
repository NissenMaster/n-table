import React, { FC, memo } from 'react';
import loading from './public/loading.svg';
import { DEFAULT_NOTICE_STYLE, DEFAULT_EMPTY_STYLE } from './style';

const TableLoading: FC = () => {
  return (
    <div style={DEFAULT_EMPTY_STYLE}>
      <div>
        <div style={DEFAULT_NOTICE_STYLE}>
          <img src={loading} alt="" style={{ height: 40, width: 40 }} />
        </div>
        <p style={DEFAULT_NOTICE_STYLE}>数据加载中，请稍后...</p>
      </div>
    </div>
  );
};

export default memo(TableLoading);
