import { Table, theme } from "antd";
import './index.scss';

const Notification = () => {
    const dataSource = [
        {
          key: '1',
          content: 'Mike',
          sender: 'Nguyen Ngo Vu Nhan',
          time: '00/00/0000',
        },
        {
            key: '2',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
          },
        {
            key: '3',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '4',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '5',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '6',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '7',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '8',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '9',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
        {
            key: '10',
            content: 'Mike',
            sender: 'Nguyen Ngo Vu Nhan',
            time: '00/00/0000',
        },
      ];
      
      const columns = [
        {
          title: 'Nội dung',
          dataIndex: 'content',
          key: 'content',
          width: '60%',
        },
        {
          title: 'Người gửi',
          dataIndex: 'sender',
          key: 'sender',
          width: '25%',
          align: 'center',
        },
        {
          title: 'Thời gian gửi',
          dataIndex: 'time',
          key: 'time',
          width: '15%',
          align: 'center',
        },
      ];
    return (
        <div className="notification-table-container">
            <Table  theme={{
      token: {
        headerBg:  "#00b96b",
        borderColor: '#DADADA',
      },
    }} dataSource={dataSource} columns={columns} size="small"/>
        </div>
    );
}
export default Notification;