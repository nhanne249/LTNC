import React, { useEffect } from "react";
import { Input, Form, Button, Checkbox, Image, Row, Col } from "antd";
import { useCookies, withCookies } from "react-cookie";
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
  const [cookies, setCookie] = useCookies(["name", "role", "userPresent"]);
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
          setCookie("username", `${data.username}`, { maxAge: 604800000 });
          setCookie("role", `${res.payload.role}`, { maxAge: 604800000 });
          setCookie("userPresent", `${res.payload.token}`, {
            maxAge: 604800000,
          });
        } else {
          setCookie("username", `${data.username}`, { path: "/" });
          setCookie("role", `${res.payload.role}`, { path: "/" });
          setCookie("userPresent", `${res.payload.token}`, { path: "/" });
        }
      } else {
        toast.error("Email hoặc mật khẩu không chính xác", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        if (
          Cookies.get("role") &&
          Cookies.get("username" && Cookies.get("userPresent"))
        ) {
          const path = Cookies.get("role").toLowerCase();
          console.log(path);
          navigate(path);
        }
      }
    });
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
