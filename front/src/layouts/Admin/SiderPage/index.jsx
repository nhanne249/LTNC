import { useEffect, useState } from "react";
import { TiThSmall } from "react-icons/ti";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const SiderPage = () => {
  const navigate = useNavigate();
  const [menuMode, setMenuMode] = useState("inline");
  const [items, setItems] = useState([
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
        { label: "Chương trình đào tạo", key: "educationProgram" },
        { label: "Kết quả học tập", key: "result" },
      ],
      type: "group",
    },
    {
      label: "Chức năng trực tuyến",
      key: null,
      children: [
        { label: "Đăng ký học phần", key: "courseRegister" },
        { label: "Đánh giá giảng viên", key: "instructorsEvaluate" },
      ],
      type: "group",
    },
  ]);
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

    // Return a function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
