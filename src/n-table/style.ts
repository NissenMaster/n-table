import { CSSProperties } from 'react';

export const DEFAULT_MAIN_STYLE: CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 12,
  height: 24,
  alignItems: 'center',
};

export const DEFAULT_ACTION_STYLE: CSSProperties = {
  height: 24,
  width: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const DEFAULT_INPUT_STYLE: CSSProperties = {
  border: '1px solid #898989',
  height: 24,
  width: 32,
  paddingLeft: 4,
  borderRadius: 4,
};

// 默认的表格列样式
export const DEFAULT_HEADER_STYLE: CSSProperties = {
  height: 38,
  fontWeight: 'bold',
  color: '#333333',
  fontSize: 14,
};

// 表格单元格默认样式
export const DEFAULT_CELL_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

export const DEFAULT_EMPTY_STYLE: CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const DEFAULT_NOTICE_STYLE: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 4,
};
