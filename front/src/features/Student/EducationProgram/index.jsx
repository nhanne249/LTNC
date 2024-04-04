import { Table, Row, Col, Card, Divider, Grid} from "antd";
import { RightOutlined, PauseOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";
import './index.scss';

const EducationProgram = () => {
    const dataSource = [
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
            <Row>
                <Col span={24}>
                    <div>
                        <h3>Chương trình đào tạo</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <div>
                        <h3>Năm học</h3>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <h3>Học kỳ</h3>
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <h3>Hệ điểm</h3>
                    </div>
                </Col>
            </Row>
            <Divider dashed/>
            <Card
                style={{
                    width: 800,
                }}
            >
                <h3>Chú ý:</h3>
                <p><CheckOutlined /><PauseOutlined rotate={90}/><RightOutlined />Học phần đạt</p>
                <p><CloseOutlined /><PauseOutlined rotate={90}/><RightOutlined />Học phần chưa đạt</p>
            </Card>
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                title={() => {
                    return (
                        <div className="title">Năm học: 2023 - Học kỳ: 1</div>
                    )
                }}
                footer={() => {
                    return (
                        <div>
                            <Row>
                                <Col span={12}>
                                    <div className="header">ĐVHT Đạt Học Kỳ: 16</div>
                                    <div className="header">Điểm TB Học Kỳ: 8.26</div>
                                    <div className="header">Điểm Rèn Luyện HK: 80</div>
                                </Col>
                                <Col span={12}>
                                    <div className="header">Tổng số ĐVHT Tích Lũy/Số ĐK: 110/110</div>
                                    <div className="header">Điểm TB chung: 7.54</div>
                                </Col>
                            </Row>
                        </div>
                    )
                }}
            />
        </div>
    );
} 
export default EducationProgram;