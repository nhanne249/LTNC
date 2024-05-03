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
          <Input className="input-area" placeholder="Họ và tên" />
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
          <Input className="input-area" placeholder="Email" />
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
          <Input className="input-area" placeholder="Số điện thoại" />
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
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 1 ? "Bằng cấp" : ""}
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
