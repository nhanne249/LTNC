import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, Button, Tooltip, Avatar, Upload } from "antd";
import { RightCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStudentInfoThunk } from "../../../redux/action/student";
import "./index.scss";
const urlImage =
  "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [imageUrl, setImageUrl] = useState(urlImage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentInfoThunk()).then((res) => {
      setInfo(res?.payload);
    });
  }, []);

  const handleUpdateInfo = () => {
    navigate(
      "/student/update-student-info",
      { replace: true },
      { state: { name: info?.name, email: info?.email, phone: info?.phone } }
    );
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  return info ? (
    <div className="information-container">
      <Flex vertical={false} justify="space-between" align="flex-start">
        <Flex vertical>
          <div className="">
            <Upload
              name="avatar"
              listType="picture-card"
              className="image-container"
              showUploadList={false}
              onChange={handleChange}
            >
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            </Upload>
          </div>
          <div>
            <h3 className="information-title">
              <RightCircleTwoTone twoToneColor="#AC1818" />
              Thông tin cá nhân
            </h3>
            <div className="information-content">
              Họ tên: <b>{info?.name}</b>
            </div>
            <div className="information-content">
              Chức vụ: <b>{info?.role}</b>
            </div>
            <h3 className="information-title">
              <RightCircleTwoTone twoToneColor="#AC1818" />
              Thông tin liên lạc
            </h3>
            <div className="information-content">
              Email: <b>{info?.email}</b>
            </div>
            <div className="information-content">
              Phone: <b>{info?.phone}</b>
            </div>
          </div>
        </Flex>
        <Button onClick={handleUpdateInfo} className="update-info-btn">
          Cập nhật thông tin cá nhân
        </Button>
      </Flex>
    </div>
  ) : null;
};
export default PersonalInformation;
