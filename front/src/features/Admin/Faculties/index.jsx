import React, { useState, useEffect } from "react";
import { Flex, Card, Button, Modal, Input, Form, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  facultiesListThunk,
  createFacultyThunk,
  createSubjectThunk,
} from "../../../redux/action/resources";
import "./index.scss";

const Faculties = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState();
  const [dataInModal, setDataInModal] = useState();
  const [isCreate, setIsCreate] = useState(false);
  useEffect(() => {
    dispatch(facultiesListThunk()).then((res) => {
      setIsReceived(true);
      setDataReceived(res?.payload);
    });
  }, [isReceived]);

  const handleCancelCreateModal = () => {
    setIsCreate(false);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };
  const openModalInfo = (data1) => {
    setOpenModal(true);
    setDataInModal(data1);
  };

  const updateModal = (data) => {
    setOpenUpdateModal(true);
    setOpenModal(false);
    setDataToUpdate(data);
  };

  const onCreate = (value) => {
    dispatch(createFacultyThunk(value)).then((res) => {
      if (res?.error) {
        toast.error("Tạo khoa mới thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Tạo khoa mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        dispatch(facultiesListThunk()).then((res) => {
          setDataReceived(res?.payload);
        });
      }
    });
  };

  const onFinishUpdateForm = (data) => {
    dispatch(
      createSubjectThunk({ faculty: dataToUpdate, subject: data.subject })
    ).then((res) => {
      if (res?.error) {
        toast.error("Thêm môn học mới thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Thêm môn học mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setOpenUpdateModal(false);
        dispatch(facultiesListThunk()).then((res) => {
          setDataReceived(res?.payload);
        });
      }
    });
  };
  return (
    <div className="faculties-container">
      <Flex vertical={true} justify="space-between" gap="large">
        <Button
          className="create-faculty-btn"
          onClick={() => setIsCreate(true)}
        >
          Thêm khoa mới
        </Button>
        <Flex wrap="wrap" gap="large">
          {dataReceived ? (
            dataReceived.map((data) => {
              return (
                <Card
                  style={{
                    width: 350,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "17px",
                    userSelect: "none",
                  }}
                  className="faculty-card"
                  extra={
                    <Button
                      onClick={() => {
                        openModalInfo(data);
                      }}
                      style={{
                        border: "none",
                        height: "30px",
                        width: "auto",
                        margin: "0 0 26px 0",
                        borderTopRightRadius: "17px",
                        borderBottomLeftRadius: "17px",
                        borderTopLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Xem thêm
                    </Button>
                  }
                  hoverable
                  key={data.id}
                  title={`Khoa ${data.name}`}
                >
                  {data?.subjects && data?.subjects?.length > 0 ? (
                    data?.subjects
                      .slice(0, 3)
                      .map((subject) => <p key={subject}>{subject}</p>)
                  ) : (
                    <p>Không có dữ liệu</p>
                  )}
                </Card>
              );
            })
          ) : (
            <div>Chưa có dữ liệu</div>
          )}
        </Flex>
        <Modal
          title={`Tạo thêm khoa`}
          open={isCreate}
          onCancel={handleCancelCreateModal}
          footer={null}
          width="500px"
          centered
        >
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            name="dynamic_form_complex"
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
            initialValues={{
              items: [{}],
            }}
            onFinish={onCreate}
          >
            <Form.Item label="Tên khoa" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Môn học">
              <Form.List name="subjects">
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 16,
                    }}
                  >
                    {subFields.map((subField) => (
                      <Space key={subField.key}>
                        <Form.Item
                          noStyle
                          name={[subField.name]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên môn học!",
                            },
                          ]}
                        >
                          <Input placeholder="Tên môn học" />
                        </Form.Item>
                        <CloseOutlined
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + Thêm
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item>
              <Button
                type="submit"
                htmlType="submit"
                onClick={() => {
                  form.resetFields();
                }}
              >
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={
            <Flex vertical={false} justify="space-around">
              Danh sách môn học khoa {dataInModal?.name}
              <Button
                onClick={() => updateModal(dataInModal?.name)}
                className="update-faculty-btn"
              >
                Thêm môn học mới
              </Button>
            </Flex>
          }
          open={openModal}
          onCancel={handleCancelModal}
          footer={null}
          width="600px"
          centered
        >
          {dataInModal?.subjects?.length > 0 ? (
            dataInModal?.subjects.map((subject) => (
              <p key={subject}>{subject}</p>
            ))
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </Modal>
      </Flex>
      <Modal
        title={`Thêm môn học khoa ${dataToUpdate}`}
        open={openUpdateModal}
        onCancel={() => setOpenUpdateModal(false)}
        footer={null}
        width="600px"
        centered
      >
        <Form
          onFinish={onFinishUpdateForm}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên môn học!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button
              type="submit"
              htmlType="submit"
              onClick={() => {
                form.resetFields();
              }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Faculties;
