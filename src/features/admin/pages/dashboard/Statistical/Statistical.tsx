import { useState, useMemo, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Spin, Card, Statistic, Row, Col, Table } from 'antd';
import { TrophyOutlined, ReloadOutlined } from '@ant-design/icons';
import { dashboardMockService } from '@services/api/mock';

const StatisticalDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    year: '2025',
    semester: 'HK1',
    branch: 'all',
  });
  const [branchStats, setBranchStats] = useState<
    Array<{
      year: string;
      semester: string;
      branch: string;
      avgPoint: number;
      participation: number;
      activities: number;
    }>
  >([]);
  const [topMembers, setTopMembers] = useState<
    Array<{ name: string; branch: string; activities: number; point: number }>
  >([]);

  const years = ['2024', '2025'];
  const semesters = ['HK1', 'HK2'];
  const branches = ['CTK14A', 'CTK14B', 'CTK15A', 'CTK15B'];

  // Load data from mock service
  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, membersRes] = await Promise.all([
          dashboardMockService.getBranchStats(filters),
          dashboardMockService.getTopMembers(),
        ]);
        setBranchStats(statsRes);
        setTopMembers(membersRes);
      } catch (error) {
        console.error('Error loading statistical data:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    loadData();
  }, [filters]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Trigger reload by updating filters
    setFilters({ ...filters });
  };

  // ====== TÍNH TOÁN THEO BỘ LỌC ======
  const filteredBranchStats = useMemo(() => {
    return branchStats.filter((item) => {
      const matchYear = item.year === filters.year;
      const matchSem = item.semester === filters.semester;
      const matchBranch = filters.branch === 'all' ? true : item.branch === filters.branch;
      return matchYear && matchSem && matchBranch;
    });
  }, [branchStats, filters]);

  const semesterTrend = useMemo(() => {
    // 👇 ĐÁNH KIỂU RÕ RÀNG CHO GROUPED
    const grouped: Record<string, { semester: string; totalPoint: number; count: number }> = {};

    branchStats.forEach((item) => {
      if (item.year !== filters.year) return;
      if (filters.branch !== 'all' && item.branch !== filters.branch) return;

      const key = item.semester;
      if (!grouped[key]) {
        grouped[key] = { semester: key, totalPoint: 0, count: 0 };
      }
      grouped[key].totalPoint += item.avgPoint;
      grouped[key].count += 1;
    });

    return Object.values(grouped)
      .map((g) => ({
        semester: g.semester,
        avg: g.totalPoint / g.count,
      }))
      .sort((a, b) => (a.semester > b.semester ? 1 : -1));
  }, [branchStats, filters]);

  const summary = useMemo(() => {
    if (filteredBranchStats.length === 0) {
      return { avgPoint: 0, avgParticipation: 0, totalActivities: 0 };
    }
    const totalPoint = filteredBranchStats.reduce((sum, item) => sum + item.avgPoint, 0);
    const totalParticipation = filteredBranchStats.reduce(
      (sum, item) => sum + item.participation,
      0,
    );
    const totalActivities = filteredBranchStats.reduce((sum, item) => sum + item.activities, 0);
    const count = filteredBranchStats.length;

    return {
      avgPoint: (totalPoint / count).toFixed(1),
      avgParticipation: (totalParticipation / count).toFixed(1),
      totalActivities,
    };
  }, [filteredBranchStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Đang tải dữ liệu thống kê..." />
      </div>
    );
  }

  // ====== JSX GIAO DIỆN ======
  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Thống kê chi tiết</h1>
          <p className="text-gray-500 text-sm mt-1">
            Phân tích dữ liệu theo năm học, học kỳ, chi đoàn
          </p>
        </div>

        {/* Bộ lọc và nút refresh */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Năm học */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Năm học</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.year}
              onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            >
              {years.map((y) => (
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
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Chi đoàn */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Chi đoàn</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.branch}
              onChange={(e) => setFilters((prev) => ({ ...prev, branch: e.target.value }))}
            >
              <option value="all">Tất cả</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Nút refresh */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 flex items-center gap-2"
          >
            <ReloadOutlined spin={refreshing} />
            <span className="text-sm font-medium">{refreshing ? 'Đang tải...' : 'Làm mới'}</span>
          </button>
        </div>
      </div>

      {/* Thẻ tổng quan */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Điểm rèn luyện trung bình"
              value={summary.avgPoint}
              valueStyle={{ color: '#3b82f6' }}
              suffix="/ 100"
            />
            <p className="mt-2 text-xs text-gray-400">Trung bình của các chi đoàn trong bộ lọc</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Tỷ lệ tham gia trung bình"
              value={summary.avgParticipation}
              valueStyle={{ color: '#10b981' }}
              suffix="%"
            />
            <p className="mt-2 text-xs text-gray-400">Tính trên tổng số hoạt động đã tổ chức</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Tổng số hoạt động"
              value={summary.totalActivities}
              valueStyle={{ color: '#6366f1' }}
            />
            <p className="mt-2 text-xs text-gray-400">Các hoạt động được thống kê trong kỳ</p>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ 1: So sánh chi đoàn */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span>
              So sánh chi đoàn trong {filters.semester} - {filters.year}
            </span>
          </h2>
          <p className="text-xs text-gray-400">Hiển thị điểm rèn luyện & tỷ lệ tham gia</p>
        </div>

        {filteredBranchStats.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-10">
            Không có dữ liệu phù hợp với bộ lọc.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredBranchStats} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="branch" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="avgPoint" name="Điểm rèn luyện" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar
                dataKey="participation"
                name="Tỷ lệ tham gia (%)"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Biểu đồ 2 + Top Đoàn viên */}
      <Row gutter={[16, 16]}>
        {/* Xu hướng điểm theo học kỳ */}
        <Col xs={24} lg={12}>
          <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📈</span>
              <span>Xu hướng điểm rèn luyện ({filters.year})</span>
            </h2>
            {semesterTrend.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-10">
                Chưa có dữ liệu để thống kê xu hướng.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={semesterTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="semester" stroke="#666" />
                  <YAxis stroke="#666" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    name="Điểm trung bình"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#6366f1' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        {/* Top Đoàn viên tích cực */}
        <Col xs={24} lg={12}>
          <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrophyOutlined className="text-xl text-yellow-500" />
              <span>Top Đoàn viên tích cực</span>
            </h2>
            <Table
              dataSource={topMembers}
              rowKey="name"
              pagination={false}
              size="small"
              className="custom-table"
              columns={[
                {
                  title: '#',
                  key: 'index',
                  width: 50,
                  render: (_: unknown, __: unknown, index: number) => (
                    <span className="font-medium text-gray-500">{index + 1}</span>
                  ),
                },
                {
                  title: 'Họ tên',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string) => (
                    <span className="font-medium text-gray-800">{text}</span>
                  ),
                },
                {
                  title: 'Chi đoàn',
                  dataIndex: 'branch',
                  key: 'branch',
                },
                {
                  title: 'Hoạt động',
                  dataIndex: 'activities',
                  key: 'activities',
                  align: 'center' as const,
                },
                {
                  title: 'Điểm RL',
                  dataIndex: 'point',
                  key: 'point',
                  align: 'center' as const,
                  render: (point: number) => (
                    <span className="font-semibold text-emerald-600">{point}</span>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticalDashboard;
