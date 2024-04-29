import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Input, Modal, Pagination, Button } from "antd";
import { getAllClassThunk } from "../../../redux/action/teacher";
import { getUserThunk } from "../../../redux/action/admin";
import "./index.scss";

const Class = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [dataReceived, setDataReceived] = useState();
  const [open, setOpen] = useState(false);
  const [dataShow, setDataShow] = useState();
  const [studentList, setStudentList] = useState([]);
  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(() => {
    dispatch(getAllClassThunk()).then((res) => {
      setDataReceived(res?.payload);
      setDataShow(res?.payload);
      setIsDataLoad(true);
    });
  }, [isDataLoad]);

  const handleShowStudentList = (value) => {
    const promises = value.students.map((item) => {
      return dispatch(getUserThunk(item)).then((res) => {
        return res?.payload;
      });
    });

    Promise.all(promises).then((results) => {
      setStudentList(results);
      setOpen(true);
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
      width: "15%",
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
      width: "10%",
      render: (value) => (
        <Button
          onClick={() => handleShowStudentList(value)}
          style={{ border: "none", width: "fit-content", boxShadow: "none" }}
        >
          Thông tin
        </Button>
      ),
    },
  ];
  const columnsForList = [
    {
      title: "Tên sinh viên",
      key: "name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Số điện thoại liên lạc",
      key: "phone",
      dataIndex: "phone",
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "45%",
    },
    {
      title: "Hành động",
      key: null,
      dataIndex: null,
      width: "15%",
      render: (value) => (
        <Button
          onClick={() => console.log(value)}
          style={{ border: "none", width: "fit-content", boxShadow: "none" }}
        >
          Thông tin
        </Button>
      ),
    },
  ];

  const handleCancelModal = () => {
    setOpen(false);
    setStudentList([]);
  };
  const onSearch = (data) => {
    if (data != "") {
      setDataShow(dataReceived?.filter((item) => item.name == data));
    } else setDataShow(dataReceived);
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
      <Modal
        title="Danh sách học sinh"
        open={open}
        onCancel={handleCancelModal}
        footer={null}
        width="60vw"
      >
        <Table
          bordered
          columns={columnsForList}
          dataSource={studentList}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default Class;
