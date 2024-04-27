import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form, Checkbox } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createNewStudentThunk } from "../../../../../redux/action/admin";
import "./index.scss";

const CreateStudentAccount = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const dataSend = {
      name: values.name,
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
    };
    dispatch(createNewStudentThunk(dataSend)).then((res) => {
      if (res?.error) {
        toast.error("Tạo học sinh mới thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Tạo học sinh mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        if (!checked) navigate("/admin/users", { replace: true });
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
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập!",
            },
          ]}
        >
          <Input className="input-area" placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              validator(__, value) {
                if (!/[A-Z]/.test(value)) {
                  return Promise.reject(
                    new Error("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa")
                  );
                } else if (!/[a-z]/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường"
                    )
                  );
                } else if (!/\d/.test(value)) {
                  return Promise.reject(
                    new Error("Mật khẩu phải chứa ít nhất 1 chữ số!")
                  );
                } else if (!/[@$!%*?&]/.test(value)) {
                  return Promise.reject(
                    new Error("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!")
                  );
                } else if (value.length < 8) {
                  return Promise.reject(
                    new Error("Mật khẩu phải có ít nhất 8 ký tự")
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <Input.Password className="input-area" placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu bạn vừa nhập không chính xác!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="input-area"
            placeholder="Xác nhận mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={() => setChecked(!checked)}>
            Bạn có muốn tạo thêm?
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className="submit-button" type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateStudentAccount;
