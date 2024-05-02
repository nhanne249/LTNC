import React, { useEffect } from "react";
import { Input, Form, Button, Checkbox, Image, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../redux/action/authentication";
import { toast } from "react-toastify";
import "./index.scss";
import background from "../../../assets/img/login1.jpg";
import logo from "../../../assets/img/logobkjpeg.png";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (data) => {
    const dataSend = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginThunk(dataSend)).then((res) => {
      if (res?.payload?.token) {
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        if (data.isChecked) {
          Cookies.set("username", `${data.username}`, {
            expires: 7,
            path: "/",
            domain: "ltnc.vercel.app",
          });
          Cookies.set("role", `${res.payload.role}`, { maxAge: 604800000 });
          Cookies.set("userPresent", `${res.payload.token}`, {
            maxAge: 604800000,
          });
        } else {
          Cookies.set("username", `${data.username}`, {
            expires: 7,
            path: "/",
            domain: "ltnc.vercel.app",
          });
          Cookies.set("role", `${res.payload.role}`, {
            expires: 7,
            path: "/",
            domain: "ltnc.vercel.app",
          });
          Cookies.set("userPresent", `${res.payload.token}`, {
            expires: 7,
            path: "/",
            domain: "ltnc.vercel.app",
          });
        }
        navigate(`${res.payload.role.toLowerCase()}`);
        window.location.reload();
      } else {
        toast.error("Email hoặc mật khẩu không chính xác", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
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
        autoComplete="off"
        layout="vertical"
      >
        <Image src={logo} preview={false} width={200}></Image>
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
            <Form.Item name="isChecked" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div></div>
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
