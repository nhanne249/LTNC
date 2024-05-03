import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateStudentThunk } from "../../../../redux/action/student";
import "./index.scss";

const UpdateStudentInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state;
  const onFinish = (values) => {
    const dataSend = {
      name: values.name,
      email: values.email,
      phone: values.phone,
    };
    dispatch(updateStudentThunk(dataSend)).then((res) => {
      if (res?.error) {
        toast.error("Cập nhật thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Cập nhật thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/student/personal-information", { replace: true });
      }
    });
  };
  return (
    <div className="form-cointainer">
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
              message: "Vui lòng nhập Họ và tên!",
            },
            {
              validator(__, value) {
                if (
                  !/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐa-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]*$/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error("Họ và tên không được chứa số!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            className="input-area"
            placeholder="Họ và tên"
            defaultValue={info.name}
            value={info.name}
            disabled
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
            {
              validator(__, value) {
                if (
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error("Email phải đúng định dạng!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            className="input-area"
            placeholder="Email"
            defaultValue={info.email}
            value={info.email}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              validator(__, value) {
                if (!/\d/.test(value)) {
                  return Promise.reject(
                    new Error("Số điện thoại phải chứa chữ số!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            className="input-area"
            placeholder="Số điện thoại"
            defaultValue={info.phone}
            value={info.phone}
          />
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateStudentInfo;
