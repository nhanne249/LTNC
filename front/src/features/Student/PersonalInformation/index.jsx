import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Image, Flex } from "antd";
import "./index.scss";
import { getAllUserByAdminThunk } from "./../../../services/action/admin";
const urlImage =
  "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const PersonalInformation = () => {
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserByAdminThunk()).then((res) => {
      console.log(res);
      setInfo(res);
    });
  }, []);
  return info ? (
    <div className="information-container">
      <Row justify="space-between">
        <Col>
          <Flex vertical gap="middle">
            <div className="image-container">
              <Image src={urlImage} style={{ maxWidth: "100px" }} />
            </div>
            <div>
              <div className="information-content">
                Mã sinh viên: <b>123456789</b>
              </div>
              <div className="information-content">
                Họ tên: <b>Nguyễn Văn A</b>
              </div>
              <div className="information-content">
                Giới tính: <b>Nam</b>
              </div>
              <div className="information-content">
                CCCD: <b>123456789</b>
              </div>
              <div className="information-content">
                Ngày sinh: <b>00/00/0000</b>
              </div>
              <div className="information-content">
                Nơi sinh: <b>Hồ Chí Minh</b>
              </div>
              <div className="information-content">
                Tình trạng: <b>Đang học</b>
              </div>
              <div className="information-content">
                Email: <b>nguyenvana@gmail.com</b>
              </div>
              <div className="information-content">
                Địa chỉ thường trú: <b>abcsadasdasdasdad</b>
              </div>
            </div>
            <div>
              <h3 className="information-title">Thông tin và người liên hệ</h3>
              <div className="information-content">
                Họ tên người liên hệ: <b>dấdadsdasdasd</b>
              </div>
              <div className="information-content">
                Số điện thoại: <b>123456789</b>
              </div>
              <div className="information-content">
                Địa chỉ liên hệ: <b>adsdasdasdasdad</b>
              </div>
            </div>
          </Flex>
        </Col>
        <Col>
          <div>
            <h3 className="information-title">Thông tin khóa học</h3>
            <div className="information-content">
              Khóa học: <b>K20</b>
            </div>
            <div className="information-content">
              Chức vụ: <b></b>
            </div>
            <div className="information-content">
              Loại hình đào tạo: <b>Chính quy</b>
            </div>
            <div className="information-content">
              Chủ nhiệm: <b>sadasdaasdas</b>
            </div>
            <div className="information-content">
              Số điện thoại liên hệ: <b>1234567890</b>
            </div>
            <div className="information-content">
              Lớp: <b>DT20XXXX</b>
            </div>
            <div className="information-content">
              Năm kết thúc đào tạo: <b>2030</b>
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <h3 className="information-title">Thông tin cá nhân</h3>
            <div className="information-content">
              Dân tộc: <b>Kinh</b>
            </div>
            <div className="information-content">
              Tôn giáo: <b>Không</b>
            </div>
            <div className="information-content">
              Quốc tịch: <b>Việt Nam</b>
            </div>
            <div className="information-content">
              Tỉnh thành: <b>HCM</b>
            </div>
            <div className="information-content">
              Quận huyện: <b>Q10</b>
            </div>
            <div className="information-content">
              Số điện thoại: <b>1234567890</b>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  ) : null;
};
export default PersonalInformation;
