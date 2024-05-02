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
      setDataReceived([
        res?.payload.forEach((data) => {
          dispatch(getUserThunk(data.teacher)).then((response) => {
            return { key: data.teacher, label: response.payload.name };
          });
        }),
      ]);
      setIsReceived(true);
    });
  }, [isReceived]);
  console.log(dataReceived);
  const username = Cookies.get("username");
  //Gửi review
  const onFinish = (value) => {
    console.log(value);
    console.log(dataReceived);
  };

  const onClickMenu = (value) => {
    setTeacherUsernameToShow(value);
    dispatch(getAllReviewThunk(value)).then((res) => {
      console.log(res.payload);
      setReviewReceived(res.payload);
    });
  };

  return (
    <div className="evaluate-input">
      <Flex vertical={false}>
        <Menu
          theme="light"
          mode="horizontal"
          items={dataReceived}
          onClick={(key) => onClickMenu(key)}
        />
        {teacherUsernameToShow ? (
          <Flex vertical={true}>
            <Form onFinish={onFinish} autoComplete="off" layout="vertical">
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
          <div>Bảng đánh giá</div>
        )}
      </Flex>
    </div>
  );
};

export default InstructorEvaluation;
