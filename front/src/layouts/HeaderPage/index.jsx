import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import "./index.scss";

const HeaderPage = () => {
  const [cookies, removeCookie] = useCookies([
    "username",
    "role",
    "userPresent",
  ]);
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (cookies.role == "ADMIN") {
      setMenuItems([
        {
          label: "Trang chủ",
          key: "main",
        },
      ]);
      setItems([
        {
          key: null,
          label: <div className="infor-name">{cookies.username}</div>,
          children: [
            {
              key: "logout",
              label: "Đăng xuất",
            },
          ],
        },
      ]);
    }
    if (cookies.role == "STUDENT") {
      setMenuItems([
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
      ]);

      setItems([
        {
          key: null,
          label: <div className="infor-name">{cookies.username}</div>,
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
      ]);
    }
    if (cookies.role == "TEACHER") {
      setMenuItems([
        {
          label: "Trang chủ",
          key: "main",
        },
      ]);

      setItems([
        {
          key: null,
          label: <div className="infor-name">{cookies.username}</div>,
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
      ]);
    }
  }, []);

  const onHeaderMenuClick = (value) => {
    if (value.key === "main") {
      navigate("");
    } else {
      navigate(value.key);
    }
  };
  const onInforMenuClick = (value) => {
    if (value.key === "logout") {
      Cookies.remove("username", { path: "/", domain: "ltnc.vercel.app" });
      Cookies.remove("role", { path: "/", domain: "ltnc.vercel.app" });
      Cookies.remove("userPresent", { path: "/", domain: "ltnc.vercel.app" });
      navigate("/");
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
