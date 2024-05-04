import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Flex,
  Pagination,
  Input,
  Select,
  Modal,
  Form,
} from "antd";
import { toast } from "react-toastify";
import {
  getAllUserThunk,
  deleteUserThunk,
  getUserThunk,
  getAllTeachersThunk,
  getAllStudentsThunk,
} from "../../../redux/action/admin";
import { updateStudentPasswordThunk } from "../../../redux/action/student";
import { updateTeacherPasswordThunk } from "../../../redux/action/teacher";
import "./index.scss";

const UserList = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [total, setTotal] = useState();
  const [dataToUpdate, setDataToUpdate] = useState();
  const [openModal, setOpenModal] = useState(false);
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
        <Flex vertical={true} gap="small">
          <Button
            onClick={() => handleDeleteUsers(value)}
            style={{ border: "none", width: "fit-content", boxShadow: "none" }}
          >
            Xóa
          </Button>
          <Button
            onClick={() => handleUpdateUsers(value)}
            style={{ border: "none", width: "fit-content", boxShadow: "none" }}
          >
            Đổi mật khẩu
          </Button>
        </Flex>
      ),
    },
  ];

  const handleChangeCreate = (value) => {
    navigate(`/admin/${value}`);
  };

  const handleUpdateUsers = (value) => {
    setDataToUpdate(value);
    setOpenModal(true);
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
      setDataReceived(res?.payload?.content);
      setTotal(res?.payload?.totalElements);
    });
  };

  const handleDeleteUsers = (data) => {
    dispatch(deleteUserThunk(data.name)).then((res) => {
      if (!res.error) {
        toast.success("Xóa người dùng thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(getAllUserThunk(1)).then((res) => {
          setDataReceived(res?.payload?.content);
          setTotal(res?.payload?.totalElements);
        });
      } else {
        toast.error("Xóa người dùng thất bại!", {
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
  const onFinish = (values) => {
    if (dataToUpdate?.role == "TEACHER") {
      dispatch(
        updateTeacherPasswordThunk({
          username: dataToUpdate?.username,
          password: values,
        })
      ).then((res) => {
        if (!res.error) {
          toast.success("Đổi mật khẩu thành công!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          toast.error("Đổi mật khẩu thất bại!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      });
    }
    if (dataToUpdate?.role == "STUDENT") {
      dispatch(
        updateStudentPasswordThunk({
          username: dataToUpdate?.username,
          password: values,
        })
      ).then((res) => {
        if (!res.error) {
          toast.success("Đổi mật khẩu thành công!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          toast.error("Đổi mật khẩu thất bại!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      });
    }
    setOpenModal(false);
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
              label: "Lọc theo sinh viên",
            },
            {
              value: "teachers",
              label: "Lọc theo giáo viên",
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
      <Modal
        title={`Đổi mật khẩu tài khoản ${dataToUpdate?.username}`}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width="20vw"
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Không được để trống mật khẩu!" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              htmlType="submit"
              style={{
                height: "50px",
                width: "100%",
                background: "#0388B4",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                linezheight: "24px",
                color: "#ffffff",
              }}
            >
              Đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
