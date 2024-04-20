import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Input, Button, Pagination } from "antd";
import { toast } from "react-toastify";
import {
  getAllClassesThunk,
  unenrollClassThunk,
} from "../../../redux/action/student";
import ".";

const Schedule = () => {
  const { Search } = Input;
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [dataShow, setDataShow] = useState();
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      setDataReceived(res?.payload);
      setDataShow(res?.payload);
      setIsReceived(true);
    });
  }, [isReceived]);

  const handleCancelClass = (value) => {
    dispatch(unenrollClassThunk(value?.name)).then((res) => {
      if (!res.error) {
        toast.success("Hủy lớp học thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(getAllClassesThunk()).then((res) => {
          setDataReceived(res?.payload);
          setDataShow(res?.payload);
        });
      } else {
        toast.error("Hủy lớp học thất bại!", {
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
          onClick={() => handleCancelClass(value)}
          style={{ border: "none", width: "fit-content", boxShadow: "none" }}
        >
          Hủy lớp
        </Button>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      console.log(res);
      setIsReceived(true);
    });
  }, [isReceived]);

  const onSearch = (data) => {
    if (data) {
      setDataShow(dataReceived?.filter((item) => item?.name == data));
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
    </div>
  );
};

export default Schedule;
