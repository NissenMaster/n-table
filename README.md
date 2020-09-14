## React 表格组件
> 基于 rsuite-table 的二次封装，功能更完善使用更方便

#### 1. 安装

* 使用 cnpm 或者 yarn 进行安装
```
$ cnpm i n-table --save
```
```
$ yarn add n-table
```
* 直接在 package.json 进行依赖添加，然后执行 cnpm i  或者  yarn
```
"n-table": "版本号"
```

#### 2. 使用示例

```typescript jsx
import NTable from 'n-table';
```
#### 3. API
| 参数                 | 说明                          | 类型    | 默认值 |
| :------------------- | :---------------------------- | :------ | :----- |
| style                | 显示样式                      | object  | 无     |
| className            | className                     | string  | 无     |
| loading              | loading                | boolean | false  |
| height               | 表格高度（设置之后表格自动切换为虚拟滚动） | number  | 无     |
| rowSelection               | 表格列属性 | object  | 无     |
| rowKey                | 表格数据唯一key值的属性                 | string  | 'key'     |
| id            | 表格id                     | string  | 无     |
| columns              | 表格列                | array | []  |
| onRowClick               | 表格行单击方法 | (keys: string[]) => {}  | 无     |
| dataSource               | 表格数组 | array  | 无     |
| pageSizeOptions               | 表格数据分页选择设置  | 无     |
| changePagination               | 表格分页触发方法 | (rowData: Record) => {}  | 无     |

#### 4. 变更记录
