import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./style.scss";
import { Layout, Image } from "antd";
import HeaderPage from "./HeaderPage";
import SiderPage from "./SiderPage";
import FooterPage from "./FooterPage";
import ContentPage from "./ContentPage";
import logobk from "../../assets/img/logobkjpeg.png";

const { Header, Footer, Sider, Content } = Layout;
const AdminLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Extract the page title from the pathname (you might need custom logic here)
  const pathParts = pathname.split("/").filter(Boolean);
  return (
    <Layout className="admin-page-layout">
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

export default AdminLayout;
