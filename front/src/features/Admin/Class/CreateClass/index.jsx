import React, { useEffect, useState } from "react";
import { Input, Form, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllDaysThunk } from "../../../../redux/action/date";
import { facultiesListThunk } from "../../../../redux/action/resources";
import { createNewClassThunk } from "../../../../redux/action/admin";
import "./index.scss";

const CreateNewClass = () => {
  const [dateOptions, setDateOptions] = useState();
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [timeOptions, setTimeOptions] = useState();
  const [departments, setDepartments] = useState();
  const [faculties, setFaculties] = useState();
  const [canChooseFaculties, setCanChooseFaculties] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(facultiesListThunk()).then((res) => {
      const temp = res.payload.map((item) => item.name);
      setDepartments(temp);
      dispatch(getAllDaysThunk()).then((res) => {
        setDateOptions(res?.payload);
      });
    });
  }, []);

  const onFinish = (data) => {
    const dataSend = {
      name: data.name,
      subject: data.subject,
      day: data.day,
      time: data.time.map((time) => parseInt(time)),
      teacher: data.teacher,
    };
    dispatch(createNewClassThunk(dataSend)).then((res) => {
      if (res?.error) {
        toast.error("Tạo lớp học mới thất bại!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.success("Tạo lớp học mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  };
  const onSelect = (value) => {
    setIsSelectDisabled(false);
    dateOptions?.map((date) => {
      if (date?.day == value) setTimeOptions(date?.time);
      return null;
    });
  };
  const onSelectDepartment = (value) => {
    setCanChooseFaculties(false);
    departments?.map((department) => {
      if (department?.name == value) setFaculties(department?.subjects);
      return null;
    });
  };
  return (
    <div className="form-container">
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Select
          placeholder="Chọn khoa"
          options={departments?.map((department) => ({
            value: `${department.name}`,
            label: `Khoa ${department.name}`,
          }))}
          onSelect={onSelectDepartment}
          className="input-container"
        />
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã môn học!",
            },
          ]}
        >
          <Select
            placeholder="Chọn môn học"
            options={faculties?.map((facultie) => ({
              value: `${faculties}`,
              label: `Môn ${faculties}`,
            }))}
            disabled={canChooseFaculties}
            onSelect={onSelectDepartment}
            className="input-container"
          />
        </Form.Item>
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên môn học!",
            },
          ]}
        >
          <Input placeholder="Tên môn học" className="input-container"></Input>
        </Form.Item>
        <Form.Item
          name="day"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày!",
            },
          ]}
        >
          <Select
            placeholder="Ngày"
            options={dateOptions?.map((day) => ({
              value: `${day.day}`,
              label: `${day.day}`,
            }))}
            onSelect={onSelect}
            className="input-container"
          />
        </Form.Item>
        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn số tiết!",
            },
          ]}
        >
          <Select
            placeholder="Tiết học"
            disabled={isSelectDisabled}
            options={timeOptions?.map((time) => ({
              value: `${time}`,
              label: `Tiết ${time}`,
            }))}
            mode="multiple"
            className="input-container"
          />
        </Form.Item>
        <Form.Item
          name="teacher"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giáo viên phụ trách!",
            },
          ]}
        >
          <Input
            placeholder="Giáo viên phụ trách"
            className="input-container"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="submit-btn">
          Tạo mới
        </Button>
      </Form>
    </div>
  );
};

export default CreateNewClass;
