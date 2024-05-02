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
  const [teacherNameToShow, setTeacherNameToShow] = useState(null);
  const [page, setPage] = useState(1);
  const [reviewReceived, setReviewReceived] = useState();
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      Promise.all(
        res?.payload.map((data) => {
          return dispatch(getUserThunk(data.teacher)).then((response) => {
            setTeacherNameToShow(response.payload.name);
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
    setTeacherUsernameToShow(value.key);
    dispatch(
      getAllReviewThunk({ teacherUsername: value.key, page: page })
    ).then((res) => {
      setReviewReceived(res.payload.content);
    });
  };

  return (
    <div className="review-page">
      <Flex vertical={false} gap="small">
        <div style={{ width: "fit-content" }}>
          <div
            style={{
              color: "#0388b4",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            Danh sách giảng viên đang học
          </div>
          <Menu
            theme="light"
            mode="vertical"
            items={dataReceived}
            onClick={(key) => onClickMenu(key)}
            style={{ width: "250px" }}
          />
        </div>

        <div className="review-content-container">
          {teacherUsernameToShow ? (
            <div className="reviews-container">
              <div className="review-list">
                {reviewReceived ? (
                  reviewReceived.map((review, index) => {
                    return (
                      <div key={index} className="review">
                        <b className="review-header">{review.student}</b>
                        <Rate disabled={true} defaultValue={review.rating} />
                        <div className="review-content">{review.content}</div>
                      </div>
                    );
                  })
                ) : (
                  <div>Chưa có đánh giá về giảng viên {teacherNameToShow}</div>
                )}
              </div>
              <div className="review-input"></div>
              <Flex vertical={true}>
                <Form onFinish={onFinish} autoComplete="off" layout="vertical">
                  <div
                    style={{
                      color: "#0388b4",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "18px",
                      fontWeight: 400,
                    }}
                  >
                    Đánh giá về giảng viên {teacherNameToShow}
                  </div>
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
          ) : (
            <div>Chọn giảng viên để xem đánh giá</div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default InstructorEvaluation;
