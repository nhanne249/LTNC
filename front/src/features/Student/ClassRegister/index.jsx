import React, { useState, useEffect } from "react";
import { Table, Input, Button, Pagination } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllClassThunk, getClassThunk } from "../../../redux/action/admin";
import { enrollClassThunk } from "../../../redux/action/student";
import "./index.scss";

const ClassRegister = () => {
  const { Search } = Input;
  const [dataReceive, setDataReceive] = useState();
  const [dataChanged, setDataChanged] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClassThunk(page)).then((res) => {
      setDataReceive(res?.payload);
      setDataChanged(true);
    });
  }, [dataChanged]);
  const handleRegisterClass = (value) => {
    dispatch(enrollClassThunk(value?.name)).then((res) => {
      if (!res.error) {
        toast.success("Đăng ký lớp học thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(getAllClassThunk(1)).then((res) => {
          setDataReceive(res?.payload);
        });
      } else {
        toast.error("Đăng ký lớp học thất bại!", {
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
          {value?.map((data, index) => (
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
      width: "15%",
      render: (value) => (
        <Button
          onClick={() => handleRegisterClass(value)}
          style={{ border: "none", width: "fit-content", boxShadow: "none" }}
        >
          Đăng ký
        </Button>
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
        setDataReceive(res?.payload);
      });
    } else {
      dispatch(getAllClassThunk(page)).then((res) => {
        setDataReceive(res?.payload);
      });
    }
  };
  return (
    <div className="class-list-container">
      <Search
        placeholder="Nhập mã lớp cần tìm"
        enterButton="TÌM KIẾM "
        size="large"
        onSearch={onSearch}
        className="input-search"
      />
      <div className="table-container">
        <Table
          bordered
          columns={columns}
          dataSource={dataReceive?.content ? dataReceive?.content : dataReceive}
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

export default ClassRegister;
