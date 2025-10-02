import '@features/home/pages/Home.css';
import { Table, Typography } from 'antd';

const { Title } = Typography;

interface BranchOfficerData {
  key: number;
  stt: number;
  class: string;
  name: string;
  role: string;
}

interface SectionCanBoChiDoanProps {
  data: BranchOfficerData[];
}

const SectionCanBoChiDoan = ({ data }: SectionCanBoChiDoanProps) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 80,
      align: 'center' as const,
    },
    {
      title: 'Chi đoàn',
      dataIndex: 'class',
      key: 'class',
      width: 150,
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
      width: 150,
    },
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-8">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl"
          >
            Cán bộ đoàn các Chi đoàn
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

export default SectionCanBoChiDoan;
