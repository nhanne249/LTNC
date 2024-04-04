import React from "react";
import { Input, Form, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerStudentThunk } from "../../../services/action/user";
import "./index.scss";
import background from "../../../assets/img/bk.jpg";
import logo from "../../../assets/img/logobkjpeg.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (data) => {
    // let dataSend = {
    //   username: data.username,
    //   password: data.password,
    //   name: data.firstName + data.lastName,
    //   studentId: 1,
    //   email: data.email,
    //   phoneNumber: data.phone,
    // };
    // dispatch(registerStudentThunk(dataSend)).then((res) => {
    //   console.log(res);
    //   if (res.payload) {
    //     toast.success("Đăng nhập thành công", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       theme: "colored",
    //     });
    navigate("/admin");
    // } else {
    //   toast.error("Email hoặc mật khẩu không chính xác", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    // }
    // });
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
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                  )
                ) {
                  return Promise.reject(
                    new Error("Please enter a valid email adress!")
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
                if (!/[a-z]/.test(value)) {
                  return Promise.reject(
                    "Password must have at least one lowercase letter."
                  );
                }
                if (!/[A-Z]/.test(value)) {
                  return Promise.reject(
                    "Password must have at least one uppercase letter."
                  );
                }
                if (!/[0-9]/.test(value)) {
                  return Promise.reject(
                    "Password must have at least one number."
                  );
                }
                if (!/\W/.test(value)) {
                  return Promise.reject(
                    "Password must have at least one special character."
                  );
                }
                if (value.length < 8) {
                  return Promise.reject(
                    "Password must be at least 8 characters long."
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
                    new Error("The password that you entered do not match!")
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
