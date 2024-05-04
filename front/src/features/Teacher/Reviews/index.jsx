import { useState, useEffect } from "react";
import { Flex, Rate, Button } from "antd";
import { useDispatch } from "react-redux";
import { getAllReviewThunk } from "../../../redux/action/review";
import Cookies from "js-cookie";
import "./index.scss";

const teacherUsername = Cookies.get("username");

const Reviews = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  let page = 1;
  useEffect(() => {
    dispatch(
      getAllReviewThunk({ teacherUsername: teacherUsername, page: page })
    ).then((res) => {
      setDataReceived(res.payload);
      setIsReceived(true);
    });
  }, [isReceived]);
  const onMore = () => {
    page++;
    dispatch(
      getAllReviewThunk({ teacherUsername: teacherUsername, page: page })
    ).then((res) => {
      setDataReceived((prevState) => ({
        ...prevState,
        content: [...prevState.content, res?.payload?.content],
      }));
    });
  };

  return (
    <div className="review-page">
      {dataReceived ? (
        <Flex vertical={true}>
          {dataReceived.content.map((review, index) => {
            return (
              <div key={index} className="review">
                <div className="review-header">
                  <b>{review.student}</b>
                  <Rate disabled={true} defaultValue={review.rating} />
                </div>
                <div className="review-content">{review.content}</div>
              </div>
            );
          })}
          {dataReceived.totalElements > page * 10 ? (
            <Button type="text" onClick={onMore}>
              Xem thêm
            </Button>
          ) : null}
        </Flex>
      ) : (
        <div>Chưa có đánh giá</div>
      )}
    </div>
  );
};

export default Reviews;
