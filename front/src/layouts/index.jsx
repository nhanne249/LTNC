import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Image } from "antd";
import { AiFillRightCircle } from "react-icons/ai";
import HeaderPage from "./HeaderPage";
import SiderPage from "./SiderPage";
import FooterPage from "./FooterPage";
import "./style.scss";
import logobk from "../assets/img/logobkjpeg.png";

const { Header, Footer, Sider, Content } = Layout;
const Layouts = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Extract the page title from the pathname (you might need custom logic here)
  const pathParts = pathname.split("/").filter(Boolean);
  let title = "";
  if (pathParts.includes("personal-information")) title = "Thông tin cá nhân";
  if (pathParts.includes("notification")) title = "Thông báo";
  if (pathParts.includes("education-program")) title = "Chương trình đào tạo";
  if (pathParts.includes("result")) title = "Kết quả học tập";
  if (pathParts.includes("course-register")) title = "Đăng ký khóa học";
  if (pathParts.includes("instructor-evaluate")) title = "Đánh giá giảng viên";
  if (pathParts.includes("users")) title = "Danh sách người dùng";
  if (pathParts.includes("add-users")) title = "Thêm người dùng mới";
  if (pathParts.includes("teacher-list")) title = "Danh sách giảng viên";
  if (pathParts.includes("student-list")) title = "Danh sách sinh viên";
  if (pathParts.includes("courses")) title = "Danh sách khóa học";
  if (pathParts.includes("add-courses")) title = "Thêm khóa học mới";
  return (
    <Layout className="page-layout">
      <Image
        preview={false}
        src={logobk}
        style={{ maxWidth: "120px" }}
        className="logo"
      />
      <Header className="header-page">
        <HeaderPage />
      </Header>
      <div className="main-content-container">
        <Layout hasSider className="main-container" id="content-layout">
          <Sider className="sider-page" width="20%" id="sider">
            <SiderPage />
          </Sider>
          <Content className="content-page">
            <div className="title-of-content">
              <AiFillRightCircle
                style={{ height: "auto", alignSelf: "center" }}
              />
              {title}
            </div>
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer className="footer-page">
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default Layouts;
