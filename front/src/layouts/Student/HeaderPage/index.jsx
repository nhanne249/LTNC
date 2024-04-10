import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { useCookies } from "react-cookie";
import "./index.scss";

const HeaderPage = () => {
  const [cookies, removeCookie] = useCookies(["role", "userPresent", "name"]);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Trang chủ",
      key: "main",
    },
    {
      label: "Tra cứu học phần",
      key: "search-term",
    },
    {
      label: "Thời khóa biểu",
      key: "schedule",
    },
  ];

  const items = [
    {
      key: null,
      label: <div className="infor-name">{cookies.role}</div>,
      children: [
        {
          key: "personal-information",
          label: "Xem thông tin cá nhân",
        },
        {
          key: "logout",
          label: "Đăng xuất",
        },
      ],
    },
  ];
  const onHeaderMenuClick = (value) => {
    console.log(value);
  };
  const onInforMenuClick = (value) => {
    if (value.key === "logout") {
      removeCookie("userPresent");
      removeCookie("role");
      removeCookie("name");
    } else {
      navigate(value.key);
    }
  };
  return (
    <div className="header-container">
      <Menu
        theme={{
          token: {
            activeBarBorderWidth: 0,
            horizontalItemHoverColor: "none",
            horizontalItemSelectedColor: "none",
          },
        }}
        mode="horizontal"
        items={menuItems}
        className="header-menu"
        onClick={onHeaderMenuClick}
      />
      <Menu
        mode="inline"
        items={items}
        className="header-infor"
        onClick={onInforMenuClick}
      />
    </div>
  );
};
export default HeaderPage;
