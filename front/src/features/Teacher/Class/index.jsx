import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  Input,
  Modal,
  Pagination,
  Button,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import {
  getAllClassThunk,
  getClassThunk,
  giveScoreForStudentThunk,
} from "../../../redux/action/teacher";
import { getAllClassResourceThunk } from "../../../redux/action/resources";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
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
  const [fileList, setFileList] = useState([]);
  let usernameToSend;

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
    dispatch(
      giveScoreForStudentThunk({
        username: usernameToSend,
        dataInBody: {
          [subjectToSend]: value,
        },
      })
    ).then((res) => {
      if (res?.error) {
        toast.error("Tạo lớp học mới thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Tạo lớp học mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        const dataSend = {
          name: classNameOnShow,
          page: 1,
        };
        dispatch(getClassThunk(dataSend)).then((res) => {
          setStudentList(res?.payload);
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
        return isInputScore ? (
          <Search
            onSearch={(data) => {
              usernameToSend = value.username;
              onInputScore(data);
            }}
            enterButton="Thêm"
            size="small"
            disabled={
              value.scores.some((obj) =>
                Object.prototype.hasOwnProperty.call(obj, subjectToSend)
              )
                ? true
                : false
            }
            defaultValue={
              value.scores.some((obj) =>
                Object.prototype.hasOwnProperty.call(obj, subjectToSend)
              )
                ? value.scores.find((obj) =>
                    Object.prototype.hasOwnProperty.call(obj, subjectToSend)
                  )[subjectToSend]
                : 0
            }
          />
        ) : (
          <div>
            {value.scores.some((obj) =>
              Object.prototype.hasOwnProperty.call(obj, subjectToSend)
            )
              ? value.scores.find((obj) =>
                  Object.prototype.hasOwnProperty.call(obj, subjectToSend)
                )[subjectToSend]
              : "Chưa có điểm"}
          </div>
        );
      },
    },
  ];

  const handleCancelModal = () => {
    setOpen(false);
    setStudentList([]);
    setIsInputScore(false);
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
  //Upload tài liệu
  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = (100 * file.size) / 1024 / 1024 < 200;
    if (!isLt2M) {
      message.error("File phải có dung lượng nhỏ hơn 200MB!");
    }
    return isPDF && isLt2M;
  };
  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
    if (info.file.status == "done") {
      setFileList([]);
      dispatch(getAllClassResourceThunk(classNameOnShow)).then((res) => {
        console.log(res);
        const blobData = res.payload.data;
        const blobUrl = URL.createObjectURL(blobData);
        console.log(blobUrl);
      });
    }
  };
  //----------------------------------------------------------------
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
          <Col span={15}>
            <Button
              onClick={() => setIsInputScore(!isInputScore)}
              style={{
                background: "#0388B4",
                color: "white",
                margin: "10px 0 10px 0",
              }}
            >
              {isInputScore ? "Hủy nhập điểm" : "Nhập điểm"}
            </Button>
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
          <Col span={7}>
            <div>Tài liệu</div>
            <Upload
              listType="text"
              action={`https://ltnc-production.up.railway.app/resources/${classNameOnShow}`}
              onChange={handleChange}
              withCredentials={true}
              headers={{
                Authorization: `Bearer ${Cookies.get("userPresent")}`,
              }}
              method="POST"
              beforeUpload={beforeUpload}
              maxCount={1}
              fileList={fileList}
            >
              Thêm tài liệu
            </Upload>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Class;
