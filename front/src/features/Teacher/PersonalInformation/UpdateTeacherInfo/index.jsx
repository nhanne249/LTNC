import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { updateTeacherInfoThunk } from "../../../../redux/action/teacher";
import "./index.scss";

const UpdateTeacherInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;

  const onFinish = (values) => {
    const dataSend = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      degrees: values.degrees,
    };
    dispatch(updateTeacherInfoThunk(dataSend)).then((res) => {
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
        navigate("/teacher/personal-information", { replace: true });
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
        <Form.Item name="name" initialValue={info.name}>
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
                if (value.length == 0) {
                  return Promise.reject(new Error("Vui lòng nhập email!"));
                }
                return Promise.resolve();
              },
            },
          ]}
          initialValue={info.email}
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
              validator(__, value) {
                if (!/\d/.test(value)) {
                  return Promise.reject(
                    new Error("Số điện thoại phải chứa chữ số!")
                  );
                }
                if (value.length == 0) {
                  return Promise.reject(
                    new Error("Vui lòng nhập số điện thoại!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          initialValue={info.phone}
        >
          <Input
            className="input-area"
            placeholder="Số điện thoại"
            defaultValue={info.phone}
            value={info.phone}
          />
        </Form.Item>
        <Form.List
          name="degrees"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error("Phải có ít nhất 1 bằng"));
                }
              },
            },
          ]}
          initialValue={info.degrees}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Bằng cấp" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Vui lòng nhập bằng cấp!",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Loại bằng" className="input-area" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "30vw",
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm bằng cấp
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateTeacherInfo;
