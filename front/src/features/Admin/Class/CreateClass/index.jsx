import React, { useEffect, useState } from "react";
import { Input, Form, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllDaysThunk } from "../../../../redux/action/date";
import { facultiesListThunk } from "../../../../redux/action/resources";
import {
  createNewClassThunk,
  getTeacherListThunk,
} from "../../../../redux/action/admin";
import "./index.scss";

const CreateNewClass = () => {
  const [dateOptions, setDateOptions] = useState();
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [timeOptions, setTimeOptions] = useState();
  const [departments, setDepartments] = useState();
  const [faculties, setFaculties] = useState();
  const [canChooseFaculties, setCanChooseFaculties] = useState(true);
  const [teachers, setTeachers] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(facultiesListThunk()).then((res) => {
      setDepartments(res.payload);
      dispatch(getAllDaysThunk()).then((response) => {
        setDateOptions(response?.payload);
        dispatch(getTeacherListThunk()).then((res1) =>
          setTeachers(res1.payload)
        );
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
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã lớp!",
            },
          ]}
        >
          <Input placeholder="Mã lớp" className="input-container" />
        </Form.Item>
        <Form.Item
          name="department"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khoa!",
            },
          ]}
        >
          <Select
            placeholder="Chọn khoa"
            options={departments?.map((department) => ({
              value: `${department.name}`,
              label: `${department.name}`,
            }))}
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
          <Select
            placeholder="Chọn môn học"
            options={faculties?.map((faculty) => ({
              value: `${faculty}`,
              label: `Môn ${faculty}`,
            }))}
            disabled={canChooseFaculties}
            onSelect={onSelectDepartment}
            className="input-container"
          />
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
          <Select
            placeholder="Chọn giáo viên phụ trách"
            options={teachers?.map((teachers) => ({
              value: `${teachers.username}`,
              label: `${teachers.name}`,
            }))}
            onSelect={onSelectDepartment}
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
