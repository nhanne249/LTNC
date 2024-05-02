import React, { useEffect, useState } from "react";
import { Form, Button, Rate, Input, Flex, Menu } from "antd";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getAllClassesThunk } from "../../../redux/action/student";
import "./index.scss";

const InstructorEvaluation = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      console.log(res);
      setDataReceived([
        res?.payload.map((data) => {
          return { key: data.teacher, label: data.teacher };
        }),
      ]);
      setIsReceived(true);
    });
  }, [isReceived]);
  const username = Cookies.get("username");
  //Gửi review
  const onFinish = (value) => {
    console.log(value);
    console.log(dataReceived);
  };

  return (
    <div className="evaluate-input">
      <Flex vertical={false}>
        <Menu></Menu>
        <Flex vertical={true}>
          <div>adsadsda</div>
        </Flex>
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
    </div>
  );
};

export default InstructorEvaluation;
