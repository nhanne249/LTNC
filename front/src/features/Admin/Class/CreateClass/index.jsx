import React, { useEffect, useState } from "react";
import { Input, Form, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { getAllDaysThunk } from "../../../../redux/action/date";
import "./index.scss";

const CreateNewClass = () => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDaysThunk()).then((res) => {
      console.log(res);
    });
  }, []);

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form
        name="form_container"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="classId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã môn học!",
            },
          ]}
        >
          <Input placeholder="Mã môn học"></Input>
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
          <Input placeholder="Tên môn học"></Input>
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
          <Select placeholder="Ngày"></Select>
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
          <Select placeholder="Tiết học"></Select>
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
          <Input placeholder="Giáo viên phụ trách"></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit"></Button>
      </Form>
    </div>
  );
};

export default CreateNewClass;
