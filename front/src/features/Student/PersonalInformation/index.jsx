import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Flex } from "antd";
import { RightCircleTwoTone } from "@ant-design/icons";
import { getInfoThunk } from "../../../redux/action/student";
import "./index.scss";
const urlImage =
  "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const PersonalInformation = () => {
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoThunk()).then((res) => {
      console.log(res?.payload);
      setInfo(res?.payload);
    });
  }, []);
  return info ? (
    <div className="information-container">
      <Flex vertical gap="middle">
        <div className="image-container">
          <Image src={urlImage} style={{ maxWidth: "200px" }} />
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
    </div>
  ) : null;
};
export default PersonalInformation;
