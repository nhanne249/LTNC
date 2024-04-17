import React, { useState, useEffect } from "react";
import { Table, Input, Button, Flex, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllClassThunk,
  getClassThunk,
} from "../../../../redux/action/admin";
import TablePagination from "./TablePagination";
import "./index.scss";

const ClassList = () => {
  const [dataReceive, setDataReceive] = useState([]);
  const { Search } = Input;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClassThunk(page)).then((res) => {
      setDataReceive(res.payload.content);
    });
  }, []);
  const columns = [
    {
      title: "Tên môn học",
      dataIndex: "subject",
      key: "subject",
      width: "10%",
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
      width: "50%",
      render: (value) => (
        <>
          {value.map((data, index) => (
            <text key={index}>[{data}]</text>
          ))}
        </>
      ),
    },
  ];
  const handleOnChange = (value) => {
    dispatch(getAllClassThunk(value)).then((res) => {
      setDataReceive(res.payload.content);
    });
  };
  const onSearch = (data) => {
    if (data) {
      dispatch(getClassThunk(data)).then((res) => {
        setDataReceive([res.payload]);
      });
    } else {
      dispatch(getAllClassThunk(page)).then((res) => {
        setDataReceive(res.payload.content);
      });
    }
  };
  const handleCreateNewClass = () => {
    navigate("/admin/create-class", { replace: true });
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
        <Button
          className="create-class-btn"
          onClick={() => handleCreateNewClass()}
        >
          <b>THÊM LỚP MỚI</b>
        </Button>
      </Flex>
      <div className="table-container">
        <Table
          bordered
          columns={columns}
          dataSource={dataReceive}
          pagination={TablePagination(
            1,
            dataReceive?.size ? dataReceive.size : 1,
            dataReceive?.totalPages ? dataReceive.totalPages : 1,
            handleOnChange
          )}
        />
      </div>
    </div>
  );
};

export default ClassList;
