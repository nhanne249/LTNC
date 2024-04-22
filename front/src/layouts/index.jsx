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
  if (pathParts.length == 1) {
    if (pathParts[0].includes("admin")) title = "Danh sách người dùng";
    if (pathParts[0].includes("teacher")) title = "Thông tin cá nhân";
    if (pathParts[0].includes("student")) title = "Thông tin cá nhân";
  }
  if (pathParts.length == 2) {
    if (pathParts[1].includes("personal-information"))
      title = "Thông tin cá nhân";
    if (pathParts[1].includes("notification")) title = "Thông báo";
    if (pathParts[1].includes("education-program"))
      title = "Chương trình đào tạo";
    if (pathParts[1].includes("result")) title = "Kết quả học tập";
    if (pathParts[1].includes("course-register")) title = "Đăng ký khóa học";
    if (pathParts[1].includes("instructor-evaluate"))
      title = "Đánh giá giảng viên";
    if (pathParts[1].includes("users")) title = "Danh sách người dùng";
    if (pathParts[1].includes("courses")) title = "Danh sách khóa học";
    if (pathParts[1].includes("add-courses")) title = "Thêm khóa học mới";
    if (pathParts[1].includes("user-list")) title = "Danh sách người dùng";
    if (pathParts[1].includes("create-student-account"))
      title = "Thêm tài khoản học sinh";
    if (pathParts.includes("create-teacher-account"))
      title = "Thêm tài khoản giảng viên";
    if (pathParts.includes("update-teacher-info"))
      title = "Cập nhật tài khoản giảng viên";
    if (pathParts.includes("update-student-info"))
      title = "Cập nhật tài khoản sinh viên";
    if (pathParts[1].includes("class")) title = "Danh sách lớp học";
    if (pathParts[1].includes("create-class")) title = "Thêm lớp học mới";
    if (pathParts[1].includes("schedule")) title = "Thời khóa biểu";
    if (pathParts[1].includes("faculties")) title = "Chương trình đào tạo";
  }

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
