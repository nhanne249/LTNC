import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  Input,
  Modal,
  Pagination,
  Button,
  Form,
  Row,
  Col,
  Flex,
} from "antd";
import {
  getAllClassThunk,
  getClassThunk,
  giveScoreAllClassThunk,
} from "../../../redux/action/teacher";
import "./index.scss";

const Class = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [dataReceived, setDataReceived] = useState();
  const [open, setOpen] = useState(false);
  const [dataShow, setDataShow] = useState();
  const [studentList, setStudentList] = useState([]);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [classNameOnShow, setClassNameOnShow] = useState();
  const [isInputScore, setIsInputScore] = useState(false);
  const [subjectToSend, setSubjectToSend] = useState();
  useEffect(() => {
    dispatch(getAllClassThunk()).then((res) => {
      setDataReceived(res?.payload);
      setDataShow(res?.payload);
      setIsDataLoad(true);
    });
  }, [isDataLoad]);

  const handleShowStudentList = (value) => {
    setOpen(true);
    setSubjectToSend(value.subject);
    setClassNameOnShow(value.name);
    const dataSend = {
      name: value.name,
      page: 1,
    };
    dispatch(getClassThunk(dataSend)).then((res) => {
      setStudentList(res?.payload);
    });
  };
  const onInputScore = (value) => {
    console.log(value);
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
          Thông tin lớp
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
      render: (value) => {
        isInputScore ? (
          <Search onSearch={onInputScore} />
        ) : (
          <div>
            {value.scores.some((obj) =>
              Object.prototype.hasOwnProperty.call(obj, subjectToSend)
            )
              ? value.scores.find((obj) =>
                  Object.prototype.hasOwnProperty.call(obj, subjectToSend)
                )
              : "Chưa có điểm"}
          </div>
        );
      },
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
  const handleOnChangePagination = (value) => {
    const dataSend = {
      name: classNameOnShow,
      page: value,
    };
    dispatch(getClassThunk(dataSend)).then((res) => {
      setStudentList(res?.payload);
    });
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
        title="Thông tin lớp"
        open={open}
        onCancel={handleCancelModal}
        footer={null}
        width="80vw"
      >
        <Row justify="space-between">
          <Col span={16}>
            <Button onClick={() => setIsInputScore(true)}>Nhập điểm</Button>
            <Table
              bordered
              columns={columnsForList}
              dataSource={studentList?.content}
              pagination={false}
            />
            <Pagination
              defaultCurrent={1}
              total={studentList?.totalElements}
              onChange={handleOnChangePagination}
              defaultPageSize={10}
            />
          </Col>
          <Col span={8}>
            <div>Tài liệu</div>
            <Button>Thêm tài liệu</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Class;
