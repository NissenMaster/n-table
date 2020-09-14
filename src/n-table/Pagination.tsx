import React, { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { ChangeOption, PageResult, PaginationProps } from './types';
import { DEFAULT_ACTION_STYLE, DEFAULT_INPUT_STYLE, DEFAULT_MAIN_STYLE } from './style';
import last from './public/last.svg';
import next from './public/next.svg';
import { SIZE_OPTIONS } from './utils';

// input 页数输入框的 ref
const pageInputRef: React.RefObject<any> = React.createRef();

// select 条数下拉选的 ref
const pageSelectRef: React.RefObject<any> = React.createRef();

// 根据 ref 获取用户录入的页数和每页条数
const getPageOptions = (): PageResult => ({
  pageSize: Number(pageSelectRef?.current?.value || 10),
  pageNum: Number(pageInputRef?.current?.value || 1),
});

/**
 * 页数输入框值变化跟踪方法
 * @param changeValue - setNum 方法
 * @param max - setNum 方法
 */
const handleInputChange = (changeValue?: Dispatch<SetStateAction<number>>, max?: number): void => {
  let inputValue = pageInputRef?.current?.value || 1;
  if (max && inputValue > max) inputValue = max;
  if (inputValue < 1) inputValue = 1;
  changeValue && changeValue(inputValue);
};

/**
 * 每页数据条数下拉选变更跟踪方法（变更时触发外部传入查询方法）
 * @param changePagination - 外部传入方法
 */
const handleSelectChange = (changePagination?: ChangeOption): void => {
  changePagination && changePagination(getPageOptions());
};

/**
 * 按回车键触发外部传入方法，进行相关分页调整查询
 * @param e - Event
 * @param changePagination - 外部传入方法
 */
const onKeyPress = (e: any, changePagination?: ChangeOption): void => {
  e.key === 'Enter' && handleSelectChange(changePagination);
};

/**
 * 点击翻页触发方法
 * @param type - 按钮类型
 * @param pages - 总页数
 * @param changePagination - 翻页触发方法
 * @param changeValue - 内部更新页数显示数值
 */
const handleClick = (
  type: string,
  pages: number,
  changePagination?: ChangeOption,
  changeValue?: Dispatch<SetStateAction<number>>,
): any => {
  const { pageSize, pageNum } = getPageOptions();
  if (type === 'add' && pageNum === pages) return;
  if (type === 'subtract' && pageNum === 1) return;
  const newPageNum: number = type === 'add' ? Number(pageNum) + 1 : pageNum - 1;
  changeValue && changeValue(newPageNum);
  changePagination && changePagination({ pageSize, pageNum: newPageNum });
};

/**
 * 分页器组件
 * @param props - PaginationProps
 * @constructor
 */
const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  const {
    pageSize,
    pageNum = 1,
    total,
    changePagination,
    pageSizeOptions = SIZE_OPTIONS,
    pages = 1,
  } = props;

  const [num, setNum] = useState<number>(pageNum);

  return (
    <div style={DEFAULT_MAIN_STYLE}>
      <div style={{ display: 'flex' }}>
        <span>共计 {total} 条数据</span>
        <div
          style={{
            ...DEFAULT_ACTION_STYLE,
            ...{ cursor: Number(num) === 1 ? 'no-drop' : 'pointer' },
          }}
          onClick={() => handleClick('subtract', pages, changePagination, setNum)}
        >
          <img style={{ width: 12, height: 12 }} src={last} alt="" />
        </div>
        <input
          type="text"
          value={num || 0}
          ref={pageInputRef}
          style={DEFAULT_INPUT_STYLE}
          onKeyPress={(e: any) => onKeyPress(e, changePagination)}
          onChange={() => handleInputChange(setNum, pages)}
        />
        <div
          style={{
            ...DEFAULT_ACTION_STYLE,
            ...{ cursor: Number(num) === pages ? 'no-drop' : 'pointer' },
          }}
          onClick={() => handleClick('add', pages, changePagination, setNum)}
        >
          <img style={{ width: 12, height: 12 }} src={next} alt="" />
        </div>
        <select
          ref={pageSelectRef}
          onChange={() => handleSelectChange(changePagination)}
          value={pageSize}
        >
          {pageSizeOptions.map((size: number) => {
            return (
              <option key={size} value={size}>
                {size} 条/页
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default memo(Pagination);
