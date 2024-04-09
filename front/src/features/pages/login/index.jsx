import React from "react";
import { Input, Form, Button, Checkbox, Image, Row, Col } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../services/action/user";
import { toast } from "react-toastify";
import "./index.scss";
import background from "../../../assets/img/bk.jpg";
import logo from "../../../assets/img/logobkjpeg.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (data) => {
    const dataSend = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginThunk(dataSend)).then((res) => {
      console.log(res);
      // navigate("/student/personal-information");
      if (res.payload) {
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        if (data.isChecked) {
          Cookies.set("password", data.password, { expires: 7 });
          Cookies.set("name", data.username, { expires: 7 });
          Cookies.set("role", "admin", { expires: 7 });
        }
      } else {
        toast.error("Email hoặc mật khẩu không chính xác", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  };
  const onFinishFailed = (data) => {
    console.log(data);
  };
  const handleForgotPassword = () => {
    console.log("forgot password");
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
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="input_box" placeholder="Password" />
        </Form.Item>
        <Row className="options" justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              name="isChecked"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button onClick={() => handleForgotPassword()}>
              Forgot password?
            </Button>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login_button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
