import React, { useState, useEffect } from "react";
import { Table, Input, Button, Flex, Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllClassThunk,
  getClassThunk,
  deleteClassThunk,
} from "../../../../redux/action/admin";
import "./index.scss";

const ClassList = () => {
  const [dataReceive, setDataReceive] = useState([]);
  const { Search } = Input;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClassThunk(page)).then((res) => {
      setDataReceive(res?.payload);
    });
  }, []);
  const handleDeleteClass = (data) => {
    dispatch(deleteClassThunk(data.name)).then((res) => {
      if (!res.error) {
        toast.success("Xóa lớp học thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(getAllClassThunk(1)).then((res) => {
          setDataReceive(res?.payload);
        });
      } else {
        toast.error("Xóa lớp học thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  };
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
      width: "35%",
      render: (value) => (
        <>
          {value.map((data, index) => (
            <div style={{ display: "inline-flex" }} key={index}>
              [{data}]
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      key: null,
      dataIndex: null,
      width: "10%",
      render: (value) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClass(value)}
          style={{ border: "none" }}
        />
      ),
    },
  ];
  const handleOnChange = (value) => {
    dispatch(getAllClassThunk(value)).then((res) => {
      setDataReceive(res?.payload);
    });
  };
  const onSearch = (data) => {
    if (data) {
      dispatch(getClassThunk(data)).then((res) => {
        setDataReceive([res?.payload]);
      });
    } else {
      dispatch(getAllClassThunk(page)).then((res) => {
        setDataReceive(res?.payload);
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
          dataSource={dataReceive.content ? dataReceive.content : dataReceive}
          pagination={false}
        />
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            total={dataReceive?.totalElements}
            onChange={handleOnChange}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassList;
