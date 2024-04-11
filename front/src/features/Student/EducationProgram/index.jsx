import { Table, Row, Col, Card, message, Button, Dropdown, Space, Flex } from "antd";
import { RightOutlined, PauseOutlined, CheckOutlined, CloseOutlined, DownOutlined, UserOutlined, DownloadOutlined } from "@ant-design/icons";
import './index.scss';

const EducationProgram = () => {
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
    ];
    const menuProps = {
    items,
    onClick: handleMenuClick,
    };
    const dataSource = [
        {
            key: '1',
            id: '1',
            courseId: 'ABC123',
            courseName: 'Name asdad asdasd asdasda asdasdasd asdasdad asdasdasd asdad adasdad',
            credit: '3',
            pointByNumber: '9.5',
            pointByLetter: 'A+',
            summary: <CheckOutlined />,
            note: '',
            detail: '',
        },
        {
            key: '1',
            id: '1',
            courseId: 'ABC123',
            courseName: 'Name',
            credit: '3',
            pointByNumber: '9.5',
            pointByLetter: 'A+',
            summary: <CheckOutlined />,
            note: '',
            detail: '',
        },
    ];
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '3%',
        },
        {
            title: 'Mã môn học',
            dataIndex: 'courseId',
            key: 'courseId',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Tên môn học',
            dataIndex: 'courseName',
            key: 'courseName',
            width: '31%',
        },
        {
            title: 'Số TC',
            dataIndex: 'credit',
            key: 'credit',
            align: 'center',
            width: '7%',
        },
        {
            title: 'Điểm số',
            dataIndex: 'pointByNumber',
            key: 'pointByNumber',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Điểm chữ',
            dataIndex: 'pointByLetter',
            key: 'pointByLetter',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Kết quả',
            dataIndex: 'summary',
            key: 'summary',
            align: 'center',
            width: '8%',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: '8%',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            key: 'detail',
            width: '8%',
        },
    ];
    return (
        <div className="educationProgram-table-container">
            <Flex vertical gap="middle">
                <Row>
                    <Col span={24}>
                        <div>
                            <h3>Chương trình đào tạo <b></b>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            Khoa học máy tính - K19
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div>
                            <h3>Năm học <b></b>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            2023
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </h3>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <h3>Học kỳ <b></b>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            Học kỳ 1
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </h3>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <h3>Hệ điểm <b></b>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            10
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </h3>
                        </div>
                    </Col>
                        <div width="100%" className="button-container">
                            <Button type="link" icon={<DownloadOutlined />}>
                                In bảng điểm
                            </Button>
                        </div>
                </Row>
                <hr className="dashed"></hr>
                <Card
                    style={{
                        width: 800,
                    }}
                    className="card-container"
                >
                    <h3 className="note-title">Chú ý:</h3>
                    <p className="note-content"><CheckOutlined className="pass-sign"/><PauseOutlined rotate={90}/><RightOutlined />Học phần đạt</p>
                    <p className="note-content"><CloseOutlined className="fail-sign"/><PauseOutlined rotate={90}/><RightOutlined />Học phần chưa đạt</p>
                </Card>
                <Table
                    className="table-container"
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    title={() => {
                        return (
                            <div className="table-header">Năm học: 2023 - Học kỳ: 1</div>
                        )
                    }}
                    footer={() => {
                        return (
                            <div className="table-footer">
                                <Row>
                                    <Col span={12}>
                                        <div className="table-title">ĐVHT Đạt Học Kỳ: <b>16</b></div>
                                        <div className="table-title">Điểm TB Học Kỳ: <b>8.26</b></div>
                                        <div className="table-title">Điểm Rèn Luyện HK: <b>80</b></div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="table-title">Tổng số ĐVHT Tích Lũy/Số ĐK: <b>110/110</b></div>
                                        <div className="table-title">Điểm TB chung: <b>7.54</b></div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }}
                />
            </Flex>
        </div>
    );
} 
export default EducationProgram;