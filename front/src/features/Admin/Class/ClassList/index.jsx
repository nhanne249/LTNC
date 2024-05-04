import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Flex,
  Pagination,
  Form,
  Modal,
  Select,
} from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllClassThunk,
  getClassThunk,
  deleteClassThunk,
  getTeacherListThunk,
  updateClassThunk,
} from "../../../../redux/action/admin";
import "./index.scss";

const ClassList = () => {
  const { Search } = Input;
  const [dataReceive, setDataReceive] = useState();
  const [dataChanged, setDataChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let className;

  useEffect(() => {
    dispatch(getAllClassThunk(1)).then((res) => {
      setDataReceive(res?.payload);
      setDataChanged(true);
    });
  }, [dataChanged]);
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
          {value?.map((data, key) => (
            <div style={{ display: "inline-flex" }} key={key}>
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
        <Flex vertical={false}>
          <Button
            onClick={() => handleDeleteClass(value)}
            style={{ border: "none", width: "fit-content", boxShadow: "none" }}
          >
            Xóa
          </Button>
          <Button
            onClick={() => openModal(value)}
            style={{ border: "none", width: "fit-content", boxShadow: "none" }}
          >
            Cập nhật
          </Button>
        </Flex>
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
      dispatch(getAllClassThunk(1)).then((res) => {
        setDataReceive(res?.payload);
      });
    }
  };
  const handleCreateNewClass = () => {
    navigate("/admin/create-class", { replace: true });
  };
  const openModal = (value) => {
    className = value.teacher;
    setOpen(true);
    dispatch(getTeacherListThunk()).then((res1) => setTeachers(res1.payload));
  };
  const onFinish = (value) => {
    dispatch(
      updateClassThunk({ className: className, teacher: value.teacher })
    );
    setOpen(false);
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
      <Modal
        title={`Tạo thêm khoa`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="500px"
        centered
      >
        <Form autoComplete="off" onFinish={onFinish}>
          <Form.Item
            label="Tên giảng viên"
            name="teacher"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giảng viên!",
              },
            ]}
          >
            <Select
              placeholder="Chọn giáo viên phụ trách"
              options={teachers?.map((teachers) => ({
                value: `${teachers.username}`,
                label: `${teachers.name}`,
              }))}
              className="input-container"
            />
          </Form.Item>
          <Form.Item>
            <Button type="submit" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassList;
