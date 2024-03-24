import React from "react";
import { Input, Form, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "./index.scss";
import background from "../../../assets/img/bk.jpg";
import logo from "../../../assets/img/logobkjpeg.jpeg";

const Register = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const onFinish = (data) => {
    navigate("/admin");
    console.log(data);
  };
  const onFinishFailed = (data) => {
    console.log(data);
  };
  return (
    <div className="main_page page_container">
      <Image src={background} alt="" preview={false} height={"100vh"} />
      <Form
        name="form_container"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Image src={logo} preview={false}></Image>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input className="input_box" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input className="input_box" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input className="input_box" placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              validator(_, value) {
                if (
                  !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error("Please enter a valid phone number (10 digits)!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input className="input_box" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
            {
              validator(_, value) {
                if (!/^(?=(?:.*\d){10})(?=(?:.*\d){11,})?.{10,}$/.test(value)) {
                  return Promise.reject(
                    new Error("Please enter a valid phone number (10 digits)!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input className="input_box" placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator(_, value) {
                if (
                  !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error(
                      "The new password that you entered must have at least one lowercase letter, one uppercase letter, one number, one special character"
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password className="input_box" placeholder="Password" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("password") !== value) {
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            className="input_box"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login_button">
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
