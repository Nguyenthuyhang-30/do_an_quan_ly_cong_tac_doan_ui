import '@features/home/pages/Home.css';
import { Table, Typography, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';

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
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl uppercase"
          >
            Cán bộ đoàn các Chi đoàn
          </Title>
        </div>
        <PaginatedTable data={data} columns={columns} />
      </div>
    </section>
  );
};

// A small client-side paginated table wrapper
function PaginatedTable({
  data,
  columns,
}: {
  data: BranchOfficerData[];
  columns: ColumnsType<BranchOfficerData>;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // If no data or data is small, synthesize more fake rows for demo
  const fullData = useMemo(() => {
    if (data && data.length >= 24) return data;
    const base = data && data.length ? data : [];
    const generated: BranchOfficerData[] = [];
    const start = base.length ? base.length + 1 : 1;
    for (let i = start; i <= 48; i++) {
      generated.push({
        key: i,
        stt: i,
        class: `Chi đoàn ${Math.ceil(i % 12) + 1}`,
        name: `Nguyễn Văn A ${i}`,
        role: i % 3 === 0 ? 'Bí thư' : i % 3 === 1 ? 'Phó bí thư' : 'Ủy viên',
      });
    }
    return [...base, ...generated];
  }, [data]);

  const startIdx = (page - 1) * pageSize;
  const pageData = fullData.slice(startIdx, startIdx + pageSize);

  return (
    <div>
      <div className="overflow-x-auto overflow-y-visible">
        <Table
          dataSource={pageData}
          columns={columns}
          pagination={false}
          bordered
          className="shadow-md"
          scroll={{ x: 'max-content' }}
          rowKey={(r: BranchOfficerData) => r.key}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={fullData.length}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default SectionCanBoChiDoan;
