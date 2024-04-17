import React from "react";
import { Pagination } from "antd";

const TablePagination = (
  defaultPage,
  pageItemSize,
  totalPage,
  handleOnChange
) => {
  const onChange = (page, pageSize) => {
    handleOnChange(page);
  };
  return (
    <Pagination
      defaultCurrent={defaultPage}
      total={totalPage}
      pageSize={pageItemSize}
      onChange={onChange}
    />
  );
};

export default TablePagination;
