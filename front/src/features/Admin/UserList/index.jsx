import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table, Flex, Pagination, Input, Select } from "antd";
import { toast } from "react-toastify";
import {
  getAllUserThunk,
  deleteUserThunk,
  getUserThunk,
  getAllTeachersThunk,
  getAllStudentsThunk,
} from "../../../redux/action/admin";
import "./index.scss";

const UserList = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [total, setTotal] = useState();
  let page = 1;
  useEffect(() => {
    dispatch(getAllUserThunk(page)).then((res) => {
      setDataReceived(res?.payload?.content);
      setTotal(res?.payload?.totalElements);
      setIsReceived(true);
    });
  }, [isReceived]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: "23%",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
    {
      title: "Tên đăng nhập",
      key: "username",
      dataIndex: "username",
      width: "17%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "35%",
    },
    {
      title: "Hành động",
      key: null,
      dataIndex: null,
      width: "10%",
      render: (value) => (
        <Button
          onClick={() => handleDeleteUsers(value)}
          style={{ border: "none", width: "fit-content", boxShadow: "none" }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleChangeCreate = (value) => {
    navigate(`/admin/${value}`);
  };

  const handleChangeFilter = (value) => {
    if (value == "teachers") {
      dispatch(getAllTeachersThunk(1)).then((res) => {
        setDataReceived(res?.payload?.content);
        setTotal(res?.payload?.totalElements);
      });
    }
    if (value == "students") {
      dispatch(getAllStudentsThunk(1)).then((res) => {
        setDataReceived(res?.payload?.content);
        setTotal(res?.payload?.totalElements);
      });
    }
    if (value == "all") {
      dispatch(getAllUserThunk(1)).then((res) => {
        setDataReceived(res?.payload?.content);
        setTotal(res?.payload?.totalElements);
      });
    }
  };

  const handleOnChange = (value) => {
    console.log(value);
    dispatch(getAllUserThunk(value)).then((res) => {
      setDataReceived(res?.payload);
      setTotal(res?.payload?.totalElements);
    });
  };

  const handleDeleteUsers = (data) => {
    dispatch(deleteUserThunk(data.name)).then((res) => {
      if (!res.error) {
        toast.success("Xóa lớp học thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(getAllUserThunk(1)).then((res) => {
          setDataReceived(res?.payload?.content);
          setTotal(res?.payload?.totalElements);
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

  const onSearch = (value) => {
    if (value) {
      dispatch(getUserThunk(value)).then((res) => {
        setDataReceived([res?.payload]);
        setTotal(1);
      });
    } else {
      dispatch(getAllUserThunk(1)).then((res) => {
        setDataReceived(res?.payload?.content);
        setTotal(res?.payload?.totalElements);
      });
    }
  };

  return (
    <div className="user-list-container">
      <Flex justify="space-between">
        <Search
          placeholder="Nhập tên đăng nhập cần tìm"
          enterButton="TÌM KIẾM "
          size="large"
          className="input-search"
          onSearch={onSearch}
        />

        <Select
          className="sort-search"
          defaultValue="Xem toàn bộ danh sách"
          onChange={handleChangeFilter}
          options={[
            {
              value: "students",
              label: "Tìm kiếm sinh viên",
            },
            {
              value: "teachers",
              label: "Tìm kiếm giáo viên",
            },
            {
              value: "all",
              label: "Xem toàn bộ danh sách",
            },
          ]}
        />

        <Select
          className="create-user-select"
          defaultValue="Thêm người dùng mới"
          onChange={handleChangeCreate}
          options={[
            {
              value: "create-student-account",
              label: "Thêm sinh viên mới",
            },
            {
              value: "create-teacher-account",
              label: "Thêm giáo viên mới",
            },
          ]}
        />
      </Flex>
      <div className="table-container">
        <Table
          bordered
          columns={columns}
          dataSource={dataReceived}
          pagination={false}
        />
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={handleOnChange}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
