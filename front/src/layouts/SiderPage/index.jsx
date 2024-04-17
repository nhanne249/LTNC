import { useEffect, useState } from "react";
import { TiThSmall } from "react-icons/ti";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./index.scss";

const SiderPage = () => {
  const navigate = useNavigate();
  const [menuMode, setMenuMode] = useState("inline");
  const [cookies, removeCookie] = useCookies(["role"]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (cookies.role == "ADMIN") {
      setItems([
        {
          label: "Người dùng",
          key: "users",
          children: [
            { label: "Danh sách giảng viên", key: "teacher-list" },
            { label: "Danh sách học viên", key: "student-list" },
          ],
          type: "group",
        },
        {
          label: "Lớp học",
          key: "class",
        },
      ]);
    }
    if (cookies.role == "STUDENT") {
      setItems([
        {
          label: "Trang cá nhân",
          key: null,
          children: [
            { label: "Thông tin cá nhân", key: "personal-information" },
            { label: "Thông báo", key: "notification" },
          ],
          type: "group",
        },
        {
          label: "Tra cứu thông tin",
          key: null,
          children: [
            { label: "Chương trình đào tạo", key: "education-program" },
            { label: "Kết quả học tập", key: "result" },
          ],
          type: "group",
        },
        {
          label: "Chức năng trực tuyến",
          key: null,
          children: [
            { label: "Đăng ký học phần", key: "course-register" },
            { label: "Đánh giá giảng viên", key: "instructor-evaluate" },
          ],
          type: "group",
        },
      ]);
    }
    if (cookies.role == "TEACHER") {
      setItems([
        {
          label: "Trang cá nhân",
          key: null,
          children: [
            { label: "Thông tin cá nhân", key: "personal-information" },
            { label: "Thông báo", key: "notification" },
          ],
          type: "group",
        },
        {
          label: "Khóa học",
          key: "course",
        },
      ]);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const elementSider = document.getElementById("content-layout");
      const siderHeight = elementSider.offsetHeight;
      const windowHeight = window.innerHeight;
      if (siderHeight < 436 || windowHeight < 624) {
        setItems(items.map((item) => ({ ...item, type: "" })));
        setMenuMode("vertical");
      } else {
        setItems(items.map((item) => ({ ...item, type: "group" })));
        setMenuMode("inline");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuMode]);

  const siderWidth = document.getElementById("sider");
  const onClick = (value) => {
    console.log(value.key);
    navigate(value.key);
  };

  return (
    <div className="sider-content-container">
      <div className="menu-name">
        <TiThSmall />
        <b> Chức năng</b>
      </div>
      <Menu onClick={onClick} mode={menuMode} items={items} />
    </div>
  );
};
export default SiderPage;
