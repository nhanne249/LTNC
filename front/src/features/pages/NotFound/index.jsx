import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role").toLowerCase();
  return (
    <div className="not-found-page">
      <div className="content">Not found</div>
      <div className="content">404</div>
      <Button
        className="not-found-btn"
        onClick={() => navigate(`/${role}`, { replace: true })}
      >
        Trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
