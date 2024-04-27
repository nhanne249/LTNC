import React, { useEffect, useState } from "react";
import { Input, Form, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { getAllDaysThunk } from "../../../../redux/action/date";
import { createNewClassThunk } from "../../../../redux/action/admin";
import { toast } from "react-toastify";
import "./index.scss";

const CreateNewClass = () => {
  const [dateOptions, setDateOptions] = useState();
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [timeOptions, setTimeOptions] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDaysThunk()).then((res) => {
      console.log(res);
      setDateOptions(res?.payload);
    });
  }, []);

  const onFinish = (data) => {
    console.log(data);
    const dataSend = {
      name: data.name,
      subject: data.subject,
      day: data.day,
      time: data.time.map((time) => parseInt(time)),
      teacher: data.teacher,
    };
    dispatch(createNewClassThunk(dataSend)).then((res) => {
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
      }
    });
    console.log(dataSend);
  };
  const onSelect = (value) => {
    setIsSelectDisabled(false);
    dateOptions.map((date) => {
      if (date?.day == value) setTimeOptions(date?.time);
      return null;
    });
  };
  return (
    <div className="form-container">
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã môn học!",
            },
          ]}
        >
          <Input placeholder="Mã môn học" className="input-container"></Input>
        </Form.Item>
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên môn học!",
            },
          ]}
        >
          <Input placeholder="Tên môn học" className="input-container"></Input>
        </Form.Item>
        <Form.Item
          name="day"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày!",
            },
          ]}
        >
          <Select
            placeholder="Ngày"
            options={dateOptions?.map((day) => ({
              value: `${day.day}`,
              label: `${day.day}`,
            }))}
            onSelect={onSelect}
            className="input-container"
          />
        </Form.Item>
        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn số tiết!",
            },
          ]}
        >
          <Select
            placeholder="Tiết học"
            disabled={isSelectDisabled}
            options={timeOptions?.map((time) => ({
              value: `${time}`,
              label: `Tiết ${time}`,
            }))}
            mode="multiple"
            className="input-container"
          />
        </Form.Item>
        <Form.Item
          name="teacher"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giáo viên phụ trách!",
            },
          ]}
        >
          <Input
            placeholder="Giáo viên phụ trách"
            className="input-container"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="submit-btn">
          Tạo mới
        </Button>
      </Form>
    </div>
  );
};

export default CreateNewClass;
