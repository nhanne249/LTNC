import { useState, useEffect } from "react";
import { Menu, Flex, Button } from "antd";
import { useDispatch } from "react-redux";
import { getAllClassesThunk } from "../../../redux/action/student";
import { getAllClassResourceThunk } from "../../../redux/action/resources";
import "./index.scss";
import resources from "./../../../redux/api/resources";

const Resources = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [resources, setResources] = useState();
  const [className, setClassName] = useState([]);
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      console.log(res);
      const newClasses = res?.payload?.map((item) => {
        item.name;
      });
      setDataReceived(newClasses);
      setIsReceived(true);
    });
  }, [isReceived]);
  console.log(dataReceived);
  const onClickMenu = (value) => {
    setClassName(value.key);
    dispatch(getAllClassResourceThunk(value.key)).then((res) => {
      setResources(res.payload);
      console.log(res.payload);
    });
  };

  return (
    <div className="class-resources-page">
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
        <div className="resources-content-container">
          {resources ? (
            <div className="resources-container">
              <div className="resources-list">
                <div style={divStyle}>Tài liệu lớp {className}</div>
                {resources ? (
                  <div>
                    {resources.map((resource, index) => {
                      return (
                        <div key={index} className="resource">
                          <div className="resource-content">{resource}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>Chưa có tài liệu</div>
                )}
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
export default Resources;

const divStyle = {
  color: "#0388b4",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "18px",
  fontWeight: 400,
};
