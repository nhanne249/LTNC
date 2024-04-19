import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Input, Flex, Pagination } from "antd";
import { getAllClassThunk } from "../../../redux/action/teacher";
import "./index.scss";

const Class = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [dataReceived, setDataReceived] = useState();
  const [dataShow, setDataShow] = useState();
  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(() => {
    dispatch(getAllClassThunk()).then((res) => {
      setDataReceived(res?.payload);
      setDataShow(res?.payload);
      console.log(res);
      setIsDataLoad(true);
    });
  }, [isDataLoad]);
  const columns = [
    {
      title: "Tên môn học",
      dataIndex: "subject",
      key: "subject",
      width: "15%",
    },
    {
      title: "Mã lớp",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Giáo viên phụ trách",
      dataIndex: "teacher",
      key: "teacher",
      width: "20%",
    },
    {
      title: "Thứ",
      key: "day",
      dataIndex: "day",
      width: "10%",
    },
    {
      title: "Tiết",
      key: "time",
      dataIndex: "time",
      width: "45%",
      render: (value) => (
        <>
          {value?.map((data, index) => (
            <div style={{ display: "inline-flex" }} key={index}>
              [{data}]
            </div>
          ))}
        </>
      ),
    },
  ];
  const onSearch = (data) => {
    if (data) {
      setDataShow(dataReceived?.filter((item) => item?.name == data));
    } else setDataShow(dataReceived);
  };
  return (
    <div className="class-list-container">
      <Flex justify="space-between">
        <Search
          placeholder="Nhập mã lớp cần tìm"
          enterButton="TÌM KIẾM "
          size="large"
          onSearch={onSearch}
          className="input-search"
        />
      </Flex>
      <div className="table-container">
        <Table
          bordered
          columns={columns}
          dataSource={dataShow?.content ? dataShow?.content : dataShow}
          pagination={false}
        />
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            total={dataShow?.totalElements}
            onChange={dataShow}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Class;
