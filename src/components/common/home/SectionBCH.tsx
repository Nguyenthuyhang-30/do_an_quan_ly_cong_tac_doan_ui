import '@features/home/pages/Home.css';
import { Table, Typography } from 'antd';

const { Title } = Typography;

interface ExecutiveBoardData {
  key: number;
  stt: number;
  name: string;
  role: string;
}

interface SectionBCHProps {
  data: ExecutiveBoardData[];
}

const SectionBCH = ({ data }: SectionBCHProps) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 80,
      align: 'center' as const,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-center mb-8">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl"
          >
            BAN CHẤP HÀNH LIÊN CHI ĐOÀN KHOA CNTT
          </Title>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered
            className="shadow-md"
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionBCH;
