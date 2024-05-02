import React, { useEffect, useState } from "react";
import { Form, Button, Rate, Input, Flex, Menu } from "antd";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getAllClassesThunk } from "../../../redux/action/student";
import { getUserThunk } from "../../../redux/action/admin";
import { getAllReviewThunk } from "../../../redux/action/review";
import "./index.scss";

const InstructorEvaluation = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [teacherUsernameToShow, setTeacherUsernameToShow] = useState(null);
  const [reviewReceived, setReviewReceived] = useState();
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      Promise.all(
        res?.payload.map((data) => {
          return dispatch(getUserThunk(data.teacher)).then((response) => {
            return { key: data.teacher, label: response.payload.name };
          });
        })
      ).then((resolvedData) => {
        setDataReceived(resolvedData);
        setIsReceived(true);
      });
    });
  }, [isReceived]);
  const username = Cookies.get("username");
  //Gửi review
  const onFinish = (value) => {
    console.log(value);
    console.log(dataReceived);
  };

  const onClickMenu = (value) => {
    console.log(value);
    setTeacherUsernameToShow(value);
    dispatch(getAllReviewThunk(value)).then((res) => {
      console.log(res.payload);
      setReviewReceived(res.payload);
    });
  };

  return (
    <div className="evaluate-input">
      <Flex vertical={false} gap="small">
        <Menu
          theme="light"
          mode="vertical"
          items={dataReceived}
          onClick={(key) => onClickMenu(key)}
          style={{ width: "250px" }}
        />
        <div className="review-container">
          {teacherUsernameToShow ? (
            <Flex vertical={true}>
              <Form onFinish={onFinish} autoComplete="off" layout="vertical">
                <div>Đánh giá về giảng viên {dataReceived.label}</div>
                <div>{username}</div>
                <Form.Item name="rating">
                  <Rate />
                </Form.Item>
                <Form.Item name="content">
                  <TextArea rows={4} placeholder="Đánh giá" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="submit">
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          ) : (
            <div>Chọn giảng viên để xem đánh giá</div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default InstructorEvaluation;
