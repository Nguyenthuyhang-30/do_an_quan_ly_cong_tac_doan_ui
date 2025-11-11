import {
  CalendarOutlined,
  ReloadOutlined,
  RiseOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  ActivityData,
  dashboardMockService,
  DashboardStats,
  ScoreData,
  TypeData,
  UpcomingEvent,
} from '@services/api/mock';
import { Empty, Spin } from 'antd';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const OverviewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    members: 0,
    branches: 0,
    activities: 0,
    participation: 0,
  });
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [scoreData, setScoreData] = useState<ScoreData[]>([]);
  const [typeData, setTypeData] = useState<TypeData[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const loadDashboardData = async () => {
    try {
      const [statsRes, activityRes, scoreRes, typeRes, eventsRes] = await Promise.all([
        dashboardMockService.getStats(),
        dashboardMockService.getActivityData(),
        dashboardMockService.getScoreData(),
        dashboardMockService.getTypeData(),
        dashboardMockService.getUpcomingEvents(),
      ]);

      setStats(statsRes);
      setActivityData(activityRes);
      setScoreData(scoreRes);
      setTypeData(typeRes);
      setUpcomingEvents(eventsRes);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen animate-fadeIn">
      {/* ============ PHẦN 1: HEADER ============ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-gray-500 text-sm mt-1">Thống kê nhanh hoạt động Đoàn viên</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
        >
          <ReloadOutlined spin={refreshing} />
          <span className="text-sm font-medium">{refreshing ? 'Đang tải...' : 'Làm mới'}</span>
        </button>
      </div>

      {/* ============ PHẦN 2: THẺ THỐNG KÊ NHANH ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Tổng Đoàn viên</p>
              <p className="text-3xl font-bold mt-2">{stats.members}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <UserOutlined className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Chi đoàn</p>
              <p className="text-3xl font-bold mt-2">{stats.branches}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <TeamOutlined className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Hoạt động tháng này</p>
              <p className="text-3xl font-bold mt-2">{stats.activities}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <CalendarOutlined className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Tỷ lệ tham gia</p>
              <p className="text-3xl font-bold mt-2">{stats.participation}%</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <RiseOutlined className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* ============ PHẦN 3: BIỂU ĐỒ HOẠT ĐỘNG ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span>Số hoạt động theo tháng</span>
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span>Điểm rèn luyện trung bình</span>
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={scoreData}>
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
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, fill: '#10b981' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============ PHẦN 4: BIỂU ĐỒ PHÂN LOẠI ĐOÀN VIÊN + LỊCH HOẠT ĐỘNG ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Biểu đồ tròn */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🧩</span>
            <span>Phân loại Đoàn viên</span>
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeData as unknown as Record<string, unknown>[]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                }
              >
                {typeData.map((item, index) => (
                  <Cell key={`cell-${item.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lịch hoạt động sắp tới */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📅</span>
            <span>Hoạt động sắp tới</span>
          </h2>
          <div className="space-y-3 max-h-[280px] overflow-y-auto">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-100 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarOutlined />
                          {formatDate(event.date)}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : event.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {event.status === 'confirmed'
                        ? 'Đã xác nhận'
                        : event.status === 'pending'
                        ? 'Chờ xác nhận'
                        : 'Đã hủy'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="Chưa có hoạt động sắp tới" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
