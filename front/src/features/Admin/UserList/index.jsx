import React from "react";
import { Button, Table,Flex ,Pagination,Input,Select} from "antd";
import "./index.scss";


const UserList = () => {
    const { Search } = Input;

    const columns = [
        {
          title: 'Họ và tên',
          dataIndex: 'name',
          key: 'name',
          width: "25%",
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: "25%",
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
          width: "15%",
        },
        {
          title: 'Tên đăng nhập',
          key: 'userName',
          dataIndex: 'userName',
          width: "25%",
        },
        {
          title: 'Hành động',
          key: null,
          dataIndex:null,
          width: "10%",
        },
      ];
    
    const data = [
        {
          key: '1',
          name: 'John Brown',
          email: 's1@mail.com',
          phoneNumber: '0000000000',
          userName: 'stud1',
        },
        {
          key: '2',
          name: 'Jim Green',
          email: 's2@mail.com',
          phoneNumber: '0000000000',
          userName: 'stud2',
        },
        {
          key: '3',
          name: 'Joe Black',
          email: 's3@mail.com',
          phoneNumber: '0000000000',
          userName: 'stud3',
        },
      ];

      const handleChange = (value) => {
        console.log(`selected ${value}`);
      }; 

    return (
    <div className="class-list-container" >
        <Flex justify="space-between">

        <Search
          placeholder="Nhập tên người dùng cần tìm"
          enterButton="TÌM KIẾM "
          size="large"
          className="input-search"
        />

        <Select className="sort-search"
        defaultValue="Lọc"
        onChange={handleChange}
        options={[
            {
            value: 'student',
            label: 'Tìm kiếm sinh viên',
            },
            {
            value: 'teacher',
            label: 'Tìm kiếm giáo viên',
            },
        ]}
        />

        <Select className="create-user-select"
        defaultValue="Thêm người dùng mới"
        onChange={handleChange}
        options={[
            {
            value: 'student',
            label: 'Thêm sinh viên mới',
            },
            {
            value: 'teacher',
            label: 'Thêm giáo viên mới',
            },
        ]}
        />

        </Flex>
        <div className="table-container">
        <Table
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            // total={dataReceive?.totalElements}
            // onChange={handleOnChange}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>);
}

export default UserList;