import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, Button, Image, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RightCircleTwoTone } from "@ant-design/icons";
import { getTeacherInfoThunk } from "../../../redux/action/teacher";
import { getAvatarThunk } from "../../../redux/action/resources";
import "./index.scss";
const urlImage =
  "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(urlImage);
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(getTeacherInfoThunk()).then((res) => {
      setInfo(res?.payload);
    });
    dispatch(getAvatarThunk()).then((res) => {
      const blobData = res.payload.data;
      const blobUrl = URL.createObjectURL(blobData);
      setImage(blobUrl);
      setIsReceived(true);
    });
  }, [isReceived]);
  const handleUpdateInfo = () => {
    navigate("/teacher/update-teacher-info", {
      replace: true,
      state: { name: info?.name, email: info?.email, phone: info?.phone },
    });
  };

  //Sử lý hình ảnh để upload
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải có dung lượng nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
    if (info.file.status == "done") {
      setFileList([]);
      dispatch(getAvatarThunk()).then((res) => {
        const blobData = res.payload.data;
        const blobUrl = URL.createObjectURL(blobData);
        setImage(blobUrl);
      });
    }
  };
  //----------------------------------------------------------------
  return info ? (
    <div className="information-container">
      <Flex vertical={false} justify="space-between" align="flex-start">
        <Flex vertical>
          <div className="image-container">
            <Image
              src={image}
              style={{ maxWidth: "200px", borderRadius: "10%" }}
            />
            <Upload
              listType="picture"
              className="avatar-uploader"
              action="https://ltnc-production.up.railway.app/avatar"
              onChange={handleChange}
              withCredentials={true}
              headers={{
                Authorization: `Bearer ${Cookies.get("userPresent")}`,
              }}
              method="PUT"
              beforeUpload={beforeUpload}
              maxCount={1}
              fileList={fileList}
            >
              Cập nhật ảnh
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
          <div>
            <h3 className="information-title">
              <RightCircleTwoTone twoToneColor="#AC1818" />
              Bằng cấp
            </h3>
            <div className="information-content">
              {info.degrees ? (
                info.degrees.map((degree, key) => {
                  return (
                    <b key={key}>
                      {degree}
                      <br />
                    </b>
                  );
                })
              ) : (
                <b style={{ color: "#AC1818" }}>!Cần cập nhật bằng cấp</b>
              )}
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
