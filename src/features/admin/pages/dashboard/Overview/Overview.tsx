import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const OverviewDashboard = () => {
  // Dữ liệu mẫu (sau này thay bằng dữ liệu thật từ API)
  const [stats] = useState({
    members: 482,
    branches: 12,
    activities: 18,
    participation: 86,
  });

  const activityData = [
    { month: 'T1', count: 4 },
    { month: 'T2', count: 5 },
    { month: 'T3', count: 8 },
    { month: 'T4', count: 6 },
    { month: 'T5', count: 9 },
    { month: 'T6', count: 7 },
  ];

  const scoreData = [
    { semester: 'HK1', avg: 78 },
    { semester: 'HK2', avg: 82 },
    { semester: 'HK3', avg: 84 },
    { semester: 'HK4', avg: 80 },
  ];

  const typeData = [
    { name: 'Xuất sắc', value: 145 },
    { name: 'Khá', value: 200 },
    { name: 'TB', value: 120 },
    { name: 'Yếu', value: 17 },
  ];

  const COLORS = ['#0ea5e9', '#3b82f6', '#a855f7', '#f97316'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* ============ PHẦN 1: TIÊU ĐỀ & THÔNG TIN TỔNG QUAN ============ */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Tổng quan hệ thống</h1>
        <p className="text-gray-500">Thống kê nhanh hoạt động Đoàn viên</p>
      </div>

      {/* ============ PHẦN 2: THẺ THỐNG KÊ NHANH ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
          <h3 className="text-sm font-medium text-gray-500">Tổng Đoàn viên</h3>
          <p className="text-3xl font-semibold text-blue-600 mt-1">{stats.members}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
          <h3 className="text-sm font-medium text-gray-500">Chi đoàn</h3>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">{stats.branches}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
          <h3 className="text-sm font-medium text-gray-500">Hoạt động tháng này</h3>
          <p className="text-3xl font-semibold text-purple-600 mt-1">{stats.activities}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
          <h3 className="text-sm font-medium text-gray-500">Tỷ lệ tham gia (%)</h3>
          <p className="text-3xl font-semibold text-emerald-600 mt-1">{stats.participation}%</p>
        </div>
      </div>

      {/* ============ PHẦN 3: BIỂU ĐỒ HOẠT ĐỘNG ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">📊 Số hoạt động theo tháng</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={activityData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">📈 Điểm rèn luyện trung bình</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={scoreData}>
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============ PHẦN 4: BIỂU ĐỒ PHÂN LOẠI ĐOÀN VIÊN + LỊCH HOẠT ĐỘNG ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ tròn */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">🧩 Phân loại Đoàn viên</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {/* ✅ Sửa lỗi TS6133: không dùng biến entry */}
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">📅 Hoạt động sắp tới</h2>
          <ul className="divide-y divide-gray-100">
            {[
              { title: 'Chiến dịch Mùa hè xanh', date: '15/11/2025', location: 'Khu phố 3 - ĐBP' },
              { title: 'Hiến máu nhân đạo', date: '25/11/2025', location: 'Hội trường A1' },
              {
                title: 'Tọa đàm Thanh niên và CĐS',
                date: '10/12/2025',
                location: 'Phòng SmartLab',
              },
            ].map((event, i) => (
              <li
                key={i}
                className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-gray-700">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {event.date} — {event.location}
                  </p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">Xem</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
