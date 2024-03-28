import React, { useState, useEffect } from "react";
import { Row, Col, Image, FLex, Flex } from "antd";
import "./index.scss";
const urlImage =
  "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

const PersonalInformation = () => {
  return (
    <Row>
      <Col>
        <Flex vertical>
          <Image src={urlImage} />
          <div>
            <div>
              Mã sinh viên:<b>123456789</b>
            </div>
            <div>
              Họ tên:<b>Nguyễn Văn A</b>
            </div>
            <div>
              Giới tính:<b>Nam</b>
            </div>
            <div>
              CCCD:<b>123456789</b>
            </div>
            <div>
              Ngày sinh:<b>00/00/0000</b>
            </div>
            <div>
              Nơi sinh:<b>Hồ Chí Minh</b>
            </div>
            <div>
              Tình trạng:<b>Đang học</b>
            </div>
            <div>
              Email:<b>nguyenvana@gmail.com</b>
            </div>
            <div>
              Địa chỉ thường trú:<b>abcsadasdasdasdad</b>
            </div>
          </div>
          <div>
            Thông tin và người liên hệ
            <div>
              Họ tên người liên hệ:<b>dấdadsdasdasd</b>
            </div>
            <div>
              Số điện thoại:<b>123456789</b>
            </div>
            <div>
              Địa chỉ liên hệ: <b>adsdasdasdasdad</b>
            </div>
          </div>
        </Flex>
      </Col>
      <Col>
        <div>
          Thông tin khóa học
          <div>Khóa học: K20</div>
          <div>
            Chức vụ: <b></b>
          </div>
          <div>
            Loại hình đào tạo: <b>Chính quy</b>
          </div>
          <div>
            Chủ nhiệm: <b>sadasdaasdas</b>
          </div>
          <div>
            Số điện thoại liên hệ: <b>1234567890</b>
          </div>
          <div>
            Lớp: <b>DT20XXXX</b>
          </div>
          <div>
            Năm kết thúc đào tạo: <b>2030</b>
          </div>
        </div>
      </Col>
      <Col>
        <div>
          Thông tin cá nhân
          <div>
            Dân tộc: <b>Kinh</b>
          </div>
          <div>
            Tôn giáo: <b>Không</b>
          </div>
          <div>
            Quốc tịch: <b>Việt Nam</b>
          </div>
          <div>
            Tỉnh thành: <b>HCM</b>
          </div>
          <div>
            Quận huyện: <b>Q10</b>
          </div>
          <div>Số điện thoại:1234567890</div>
        </div>
      </Col>
    </Row>
  );
};
export default PersonalInformation;
