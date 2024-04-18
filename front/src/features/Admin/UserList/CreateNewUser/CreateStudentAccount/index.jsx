import React from "react";
import { Input ,Button,Form} from "antd";
import "./index.scss";

const onFinish = (values) => {
  console.log('Success:', values);
};

const CreateStudentAccount = () => {
  return (
    <div className ="frame">
      <Form onFinish={onFinish}>
        <Form.Item name = "name">
          <Input className = "input" placeholder= "Họ và tên" />
        </Form.Item>

        <Form.Item name = "email">
          <Input className = "input" placeholder= "Email" />
        </Form.Item>

        <Form.Item name = "phoneNumber">
          <Input className = "input" placeholder= "Số điện thoại" />
        </Form.Item>

        <Form.Item name = "userName">
          <Input className = "input" placeholder= "Tên đăng nhập" />
        </Form.Item>

        <Form.Item name = "password">
          <Input.Password className = "input" placeholder= "Mật khẩu" />
        </Form.Item>

        <Form.Item name = "passwordRepeat">
          <Input.Password className = "input" placeholder= "Xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item name= "submit">
          <Button className = "button" type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateStudentAccount;
