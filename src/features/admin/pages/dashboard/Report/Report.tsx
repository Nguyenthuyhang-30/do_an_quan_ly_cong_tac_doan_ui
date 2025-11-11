import { useMemo, useState } from 'react';
import { Card, Table, Tag, Button, Space, message } from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { dashboardMockService } from '@services/api/mock';

type ReportType = 'activity' | 'point' | 'member';

interface BranchReport {
  branch: string;
  activities: number;
  participants: number;
  avgPoint: number;
}

const BRANCH_REPORT_DATA: BranchReport[] = [
  { branch: 'CTK14A', activities: 14, participants: 220, avgPoint: 86 },
  { branch: 'CTK14B', activities: 11, participants: 185, avgPoint: 80 },
  { branch: 'CTK15A', activities: 15, participants: 245, avgPoint: 88 },
  { branch: 'CTK15B', activities: 10, participants: 170, avgPoint: 79 },
];

const YEARS = ['2024', '2025'];
const SEMESTERS = ['HK1', 'HK2'];

const ReportsDashboard = () => {
  const [exportingExcel, setExportingExcel] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [filters, setFilters] = useState<{
    year: string;
    semester: string;
    type: ReportType;
  }>({
    year: '2025',
    semester: 'HK1',
    type: 'activity',
  });

  // Tạm thời data không đổi theo filter, nhưng bạn có thể dùng filters để call API
  const filteredBranchReport = useMemo(() => {
    return BRANCH_REPORT_DATA;
  }, []);

  const summary = useMemo(() => {
    const totalActivities = filteredBranchReport.reduce((sum, r) => sum + r.activities, 0);
    const totalParticipants = filteredBranchReport.reduce((sum, r) => sum + r.participants, 0);
    const avgPoint =
      filteredBranchReport.reduce((sum, r) => sum + r.avgPoint, 0) / filteredBranchReport.length;

    return {
      totalActivities,
      totalParticipants,
      avgPoint: avgPoint.toFixed(1),
    };
  }, [filteredBranchReport]);

  const handleExportExcel = async () => {
    setExportingExcel(true);
    try {
      const result = await dashboardMockService.exportReport('excel', filters);
      message.success(`Xuất báo cáo Excel thành công! File: ${result.url}`);
      console.log('Export Excel:', result);
    } catch {
      message.error('Có lỗi khi xuất báo cáo Excel');
    } finally {
      setExportingExcel(false);
    }
  };

  const handleExportPDF = async () => {
    setExportingPdf(true);
    try {
      const result = await dashboardMockService.exportReport('pdf', filters);
      message.success(`Xuất báo cáo PDF thành công! File: ${result.url}`);
      console.log('Export PDF:', result);
    } catch {
      message.error('Có lỗi khi xuất báo cáo PDF');
    } finally {
      setExportingPdf(false);
    }
  };

  const handlePreview = () => {
    message.info('Đang mở xem trước báo cáo...');
    console.log('Preview report with filters:', filters);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Báo cáo</h1>
          <p className="text-gray-500 text-sm mt-1">
            Tổng hợp và xuất báo cáo hoạt động, điểm rèn luyện, Đoàn viên
          </p>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-3">
          {/* Mẫu báo cáo */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Mẫu báo cáo</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  type: e.target.value as ReportType,
                }))
              }
            >
              <option value="activity">Hoạt động & tham gia</option>
              <option value="point">Điểm rèn luyện theo chi đoàn</option>
              <option value="member">Danh sách Đoàn viên</option>
            </select>
          </div>

          {/* Năm học */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Năm học</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.year}
              onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y} - {parseInt(y, 10) + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Học kỳ */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Học kỳ</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.semester}
              onChange={(e) => setFilters((prev) => ({ ...prev, semester: e.target.value }))}
            >
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vùng nút Export */}
      <Card className="shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <p className="mb-1">Báo cáo sẽ lấy dữ liệu theo:</p>
            <div className="flex flex-wrap gap-2">
              <Tag color="blue">
                {filters.semester} - {filters.year}
              </Tag>
              <Tag color="green">
                {filters.type === 'activity'
                  ? 'Hoạt động & tham gia'
                  : filters.type === 'point'
                  ? 'Điểm rèn luyện'
                  : 'Danh sách Đoàn viên'}
              </Tag>
            </div>
          </div>

          <Space wrap>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>
              Xem trước
            </Button>
            <Button
              type="default"
              icon={<FileExcelOutlined />}
              onClick={handleExportExcel}
              loading={exportingExcel}
              style={{ backgroundColor: '#ecfdf5', borderColor: '#10b981', color: '#10b981' }}
            >
              Xuất Excel
            </Button>
            <Button
              type="default"
              icon={<FilePdfOutlined />}
              onClick={handleExportPDF}
              loading={exportingPdf}
              style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#ef4444' }}
            >
              Xuất PDF
            </Button>
          </Space>
        </div>
      </Card>

      {/* Thẻ tóm tắt */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-2">Tổng số hoạt động</p>
          <p className="text-3xl font-bold text-indigo-600">{summary.totalActivities}</p>
          <p className="mt-2 text-xs text-gray-400">Tính trên tất cả chi đoàn</p>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-2">Tổng lượt tham gia</p>
          <p className="text-3xl font-bold text-emerald-600">{summary.totalParticipants}</p>
          <p className="mt-2 text-xs text-gray-400">Lượt điểm danh trong kỳ</p>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-2">Điểm rèn luyện TB</p>
          <p className="text-3xl font-bold text-blue-600">{summary.avgPoint}</p>
          <p className="mt-2 text-xs text-gray-400">Trung bình của các chi đoàn</p>
        </Card>
      </div>

      {/* Bảng chi tiết */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <DownloadOutlined className="text-blue-500" />
            <span>
              {filters.type === 'activity' && 'Báo cáo hoạt động & tham gia theo chi đoàn'}
              {filters.type === 'point' && 'Báo cáo điểm rèn luyện theo chi đoàn'}
              {filters.type === 'member' && 'Báo cáo tổng hợp Đoàn viên theo chi đoàn'}
            </span>
          </h2>
          <Tag color="orange">Dữ liệu mẫu</Tag>
        </div>

        <Table
          dataSource={filteredBranchReport}
          rowKey="branch"
          pagination={false}
          size="middle"
          scroll={{ x: 800 }}
          columns={[
            {
              title: 'Chi đoàn',
              dataIndex: 'branch',
              key: 'branch',
              fixed: 'left',
              render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
            },
            ...(filters.type !== 'member'
              ? [
                  {
                    title: 'Số hoạt động',
                    dataIndex: 'activities',
                    key: 'activities',
                    align: 'center' as const,
                  },
                ]
              : []),
            {
              title: filters.type === 'member' ? 'Số Đoàn viên' : 'Lượt tham gia',
              dataIndex: 'participants',
              key: 'participants',
              align: 'center' as const,
              render: (_: unknown, record: BranchReport) =>
                filters.type === 'member'
                  ? Math.round(record.participants / 5)
                  : record.participants,
            },
            ...(filters.type === 'point' || filters.type === 'activity'
              ? [
                  {
                    title: 'Điểm RL TB',
                    dataIndex: 'avgPoint',
                    key: 'avgPoint',
                    align: 'center' as const,
                    render: (point: number) => (
                      <span className="font-semibold text-emerald-600">{point}</span>
                    ),
                  },
                ]
              : []),
          ]}
        />
      </Card>
    </div>
  );
};

export default ReportsDashboard;
