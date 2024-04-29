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
      <svg style={{ width: "400", height: "100" }}>
        <text
          style={{
            fill: "white",
            fillOpacity: "0.4",
            fontSize: "80",
            x: "200",
            y: "70",
            textAnchor: "middle",
            stroke: "black",
          }}
        >
          Not Found
        </text>
      </svg>
      <svg style={{ width: "400", height: "100" }}>
        <text
          style={{
            fill: "white",
            fillOpacity: "0.4",
            fontSize: "80",
            x: "200",
            y: "70",
            textAnchor: "middle",
            stroke: "black",
          }}
        >
          404
        </text>
      </svg>
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
