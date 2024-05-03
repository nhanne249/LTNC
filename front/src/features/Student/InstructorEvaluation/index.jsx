import React, { useEffect, useState } from "react";
import { Form, Button, Rate, Input, Flex, Menu, Space } from "antd";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllClassesThunk,
  instructorEvaluationThunk,
} from "../../../redux/action/student";
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
  let page = 1;
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
    dispatch(
      instructorEvaluationThunk({
        content: value.content,
        student: username,
        teacher: teacherUsernameToShow,
        rating: value.rating,
      })
    ).then((res) => {
      if (res?.error) {
        toast.error("Gặp lỗi khi gửi đánh giá!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Đánh giá đã được gửi!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(
          getAllReviewThunk({
            teacherUsername: teacherUsernameToShow,
            page: 1,
          })
        ).then((res) => {
          setReviewReceived(res.payload);
        });
      }
    });
  };

  const onClickMenu = (value) => {
    console.log(value);
    setTeacherUsernameToShow(value.key);
    dispatch(
      getAllReviewThunk({ teacherUsername: value.key, page: page })
    ).then((res) => {
      setReviewReceived(res.payload);
    });
  };
  const onMore = () => {
    page++;
    dispatch(
      getAllReviewThunk({ teacherUsername: teacherUsernameToShow, page: page })
    ).then((res) => {
      setReviewReceived((prevState) => ({
        ...prevState,
        content: [...prevState.content, res?.payload?.content],
      }));
    });
  };
  return (
    <div className="review-page">
      <Flex vertical={false} gap="middle">
        <div style={{ width: "fit-content" }}>
          <div style={divStyle}>Danh sách giảng viên đang học</div>
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
                <div style={divStyle}>
                  Đánh giá về giảng viên {teacherNameToShow}
                </div>
                {reviewReceived ? (
                  <div>
                    {reviewReceived.content.map((review, index) => {
                      return (
                        <div key={index} className="review">
                          <div className="review-header">
                            <b>{review.student}</b>
                            <Rate
                              disabled={true}
                              defaultValue={review.rating}
                            />
                          </div>
                          <div className="review-content">{review.content}</div>
                        </div>
                      );
                    })}
                    {reviewReceived.totalElements > page * 10 ? (
                      <Button type="text" onClick={onMore}>
                        Xem thêm
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <div>Chưa có đánh giá về giảng viên {teacherNameToShow}</div>
                )}
              </div>
              <div className="review-input">
                <Flex vertical={true}>
                  <Form
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <b>{username}</b>
                    <Form.Item
                      name="rating"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống phần chấm điểm!",
                        },
                      ]}
                    >
                      <Rate />
                    </Form.Item>
                    <Form.Item
                      name="content"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống phần đánh giá!",
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Đánh giá" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="submit"
                        className="submit-btn"
                      >
                        Gửi
                      </Button>
                    </Form.Item>
                  </Form>
                </Flex>
              </div>
            </div>
          ) : (
            <div style={divStyle}>Chọn giảng viên để xem đánh giá</div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default InstructorEvaluation;

const divStyle = {
  color: "#0388b4",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "18px",
  fontWeight: 400,
};
