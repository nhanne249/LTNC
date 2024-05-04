import { useState, useEffect } from "react";
import { Menu, Flex, Button } from "antd";
import { useDispatch } from "react-redux";
import { getAllClassesThunk } from "../../../redux/action/student";
import {
  getAllClassResourceThunk,
  getResourceThunk,
} from "../../../redux/action/resources";
import "./index.scss";

const Resources = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [resources, setResources] = useState();
  const [className, setClassName] = useState([]);
  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      const newClasses = res?.payload?.map((item) => ({
        key: item.name,
        label: item.name,
      }));
      setDataReceived(newClasses);
      setIsReceived(true);
    });
  }, [isReceived]);
  const onClickMenu = (value) => {
    setClassName(value.key);
    dispatch(getAllClassResourceThunk(value.key)).then((res) => {
      setResources(res.payload);
    });
  };
  const onResourceClick = (resource) => {
    dispatch(getResourceThunk({ class: className, name: resource })).then(
      (res) => {
        console.log(resource);
        const pdfUrl = URL.createObjectURL(res.payload.data);
        console.log(pdfUrl);
      }
    );
  };
  return (
    <div className="class-resources-page">
      <Flex vertical={false} gap="middle">
        <div style={{ width: "fit-content" }}>
          <div style={divStyle}>Danh sách lớp đang học</div>
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
                  <Flex vertical={false} gap="middle">
                    {resources.map((resource, index) => {
                      return (
                        <Button
                          key={index}
                          className="resource"
                          onClick={() => onResourceClick(resource)}
                        >
                          {resource}
                        </Button>
                      );
                    })}
                  </Flex>
                ) : (
                  <div>Chưa có tài liệu</div>
                )}
              </div>
            </div>
          ) : (
            <div style={divStyle}>Chọn lớp để xem tài liệu</div>
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
