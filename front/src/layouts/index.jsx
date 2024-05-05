import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { AiFillRightCircle } from "react-icons/ai";
import HeaderPage from "./HeaderPage";
import SiderPage from "./SiderPage";
import FooterPage from "./FooterPage";
import "./style.scss";

const { Header, Footer, Sider, Content } = Layout;
const Layouts = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  // Extract the page title from the pathname (you might need custom logic here)
  const pathParts = pathname.split("/").filter(Boolean);
  let title = "";
  if (pathParts.length == 1) {
    if (pathParts[0] === "admin") title = "Danh sách người dùng";
    if (pathParts[0] === "teacher") title = "Thông tin cá nhân";
    if (pathParts[0] === "student") title = "Thông tin cá nhân";
  }
  if (pathParts.length == 2) {
    if (pathParts[1] === "personal-information") title = "Thông tin cá nhân";
    if (pathParts[1] === "notification") title = "Thông báo";
    if (pathParts[1] === "education-program") title = "Chương trình đào tạo";
    if (pathParts[1] === "result") title = "Kết quả học tập";
    if (pathParts[1] === "course-register") title = "Đăng ký khóa học";
    if (pathParts[1] === "instructor-evaluate") title = "Đánh giá giảng viên";
    if (pathParts[1] === "users") title = "Danh sách người dùng";
    if (pathParts[1] === "courses") title = "Danh sách khóa học";
    if (pathParts[1] === "add-courses") title = "Thêm khóa học mới";
    if (pathParts[1] === "user-list") title = "Danh sách người dùng";
    if (pathParts[1] === "create-student-account")
      title = "Thêm tài khoản học sinh";
    if (pathParts[1] === "create-teacher-account")
      title = "Thêm tài khoản giảng viên";
    if (pathParts[1] === "update-teacher-info")
      title = "Cập nhật tài khoản giảng viên";
    if (pathParts[1] === "update-student-info")
      title = "Cập nhật tài khoản sinh viên";
    if (pathParts[1] === "classes") title = "Danh sách lớp học";
    if (pathParts[1] === "create-class") title = "Thêm lớp học mới";
    if (pathParts[1] === "schedule") title = "Thời khóa biểu";
    if (pathParts[1] === "faculties") title = "Chương trình đào tạo";
    if (pathParts[1] === "resources") title = "Tài liệu học tập";
    if (pathParts[1] === "reviews") title = "Đánh giá";
  }

  return (
    <Layout className="page-layout">
      <Header className="header-page">
        <HeaderPage />
      </Header>
      <div className="main-content-container">
        <Layout hasSider className="main-container" id="content-layout">
          <Sider
            className="sider-page"
            width="15%"
            id="sider"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
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
