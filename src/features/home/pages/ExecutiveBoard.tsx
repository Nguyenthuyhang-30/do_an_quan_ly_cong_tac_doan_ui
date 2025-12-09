import React, { useMemo, useState } from 'react';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  TeamOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';

type Role = 'Bí thư' | 'Phó Bí thư' | 'Uỷ viên';

interface Officer {
  id: number;
  name: string;
  role: Role;
  branch: string; // chi đoàn
  term: string; // nhiệm kỳ
  email: string;
  phone: string;
  avatar?: string; // thêm avatar optional
}

const OFFICERS: Officer[] = [
  {
    id: 1,
    name: 'Lê Văn Phong',
    role: 'Bí thư',
    branch: 'CTK14A',
    term: '2024-2025',
    email: 'a.nguyen@dnu.edu.vn',
    phone: '0987 000 111',
  },
  {
    id: 2,
    name: 'Lê Tuấn Anh',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 3,
    name: 'Nguyễn Thái Khánh',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 4,
    name: 'Trần Thị Thanh Nhàn',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 5,
    name: 'Nguyễn Thị Phương',
    role: 'Uỷ viên',
    branch: 'CTK15A',
    term: '2024-2025',
    email: 'c.le@dnu.edu.vn',
    phone: '0987 000 333',
  },
  {
    id: 6,
    name: 'Lê Thị Vân Anh',
    role: 'Uỷ viên',
    branch: 'CTK15B',
    term: '2023-2024',
    email: 'd.pham@dnu.edu.vn',
    phone: '0987 000 444',
  },
];

const TERMS = ['Tất cả', '2024-2025', '2023-2024'];
const BRANCHES = ['Tất cả', 'CTK14A', 'CTK14B', 'CTK15A', 'CTK15B'];

// Helper function to get role badge styling
const getRoleBadge = (role: Role) => {
  const styles = {
    'Bí thư': 'bg-red-100 text-red-700 border-red-200',
    'Phó Bí thư': 'bg-blue-100 text-blue-700 border-blue-200',
    'Uỷ viên': 'bg-green-100 text-green-700 border-green-200',
  };
  return styles[role];
};

// Helper function to get role icon
const getRoleIcon = (role: Role) => {
  if (role === 'Bí thư') return '⭐';
  if (role === 'Phó Bí thư') return '★';
  return '●';
};

const ExecutiveBoardPage: React.FC = () => {
  const [term, setTerm] = useState('Tất cả');
  const [branch, setBranch] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredOfficers = useMemo(
    () =>
      OFFICERS.filter((o) => {
        const matchTerm = term === 'Tất cả' || o.term === term;
        const matchBranch = branch === 'Tất cả' || o.branch === branch;
        const matchSearch = o.name.toLowerCase().includes(search.toLowerCase());
        return matchTerm && matchBranch && matchSearch;
      }),
    [term, branch, search],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8">
        {/* Tiêu đề với banner effect */}
        <header className="relative bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl shadow-lg p-6 md:p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <TeamOutlined style={{ fontSize: '120px' }} />
          </div>
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <StarFilled className="text-yellow-300" style={{ fontSize: '28px' }} />
              <h1 className="text-2xl md:text-4xl font-bold">BAN CHẤP HÀNH CHI ĐOÀN</h1>
            </div>
            <p className="text-blue-50 text-sm md:text-base max-w-2xl">
              Thông tin Ban Chấp hành Liên chi đoàn Khoa Công nghệ thông tin - Nhiệm kỳ{' '}
              {term !== 'Tất cả' ? term : '2024-2025'}
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>{filteredOfficers.length} thành viên</span>
              </div>
              <div className="flex items-center gap-2">
                <TeamOutlined />
                <span>Liên chi đoàn Khoa CNTT</span>
              </div>
            </div>
          </div>
        </header>

        {/* Bộ lọc nâng cao */}
        <section className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FilterOutlined className="text-blue-600" />
              Bộ lọc & Tìm kiếm
            </h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {isFilterOpen ? 'Thu gọn' : 'Mở rộng'}
            </button>
          </div>

          <div className={`space-y-4 ${isFilterOpen || 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <CalendarOutlined className="text-blue-600" />
                  Nhiệm kỳ
                </label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  {TERMS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <TeamOutlined className="text-green-600" />
                  Chi đoàn
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <SearchOutlined className="text-purple-600" />
                  Tìm theo họ tên
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập tên Ban Chấp hành..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick reset */}
            {(term !== 'Tất cả' || branch !== 'Tất cả' || search) && (
              <button
                onClick={() => {
                  setTerm('Tất cả');
                  setBranch('Tất cả');
                  setSearch('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </section>

        {/* Grid BCH với thiết kế cải tiến */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UserOutlined className="text-blue-600" />
              Danh sách Ban Chấp hành
              <span className="text-sm font-normal text-gray-500">
                ({filteredOfficers.length} thành viên)
              </span>
            </h2>
          </div>

          {filteredOfficers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-300 mb-4">
                <UserOutlined style={{ fontSize: '64px' }} />
              </div>
              <p className="text-gray-500 font-medium">
                Không tìm thấy Ban Chấp hành phù hợp với bộ lọc.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm khác.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOfficers.map((o) => (
                <article
                  key={o.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden"
                >
                  {/* Role indicator bar */}
                  <div
                    className={`h-1.5 ${
                      o.role === 'Bí thư'
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : o.role === 'Phó Bí thư'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                  />

                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Avatar with role indicator */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all">
                          {o.name
                            .split(' ')
                            .slice(-2)
                            .map((x) => x[0])
                            .join('')}
                        </div>
                        <div className="absolute -bottom-1 -right-1 text-xl">
                          {getRoleIcon(o.role)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base mb-1.5 truncate group-hover:text-blue-600 transition-colors">
                          {o.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadge(
                            o.role,
                          )}`}
                        >
                          {getRoleIcon(o.role)} {o.role}
                        </span>
                      </div>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-gray-600">
                        <TeamOutlined className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="font-medium text-gray-700">Chi đoàn:</span> {o.branch}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600">
                        <CalendarOutlined className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="font-medium text-gray-700">Nhiệm kỳ:</span> {o.term}
                        </span>
                      </div>
                    </div>

                    {/* Contact buttons */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      <a
                        href={`mailto:${o.email}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
                        title={o.email}
                      >
                        <MailOutlined />
                        Email
                      </a>
                      <a
                        href={`tel:${o.phone.replace(/\s/g, '')}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium"
                        title={o.phone}
                      >
                        <PhoneOutlined />
                        Gọi
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Nhiệm vụ & giờ trực với thiết kế cải tiến */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <TeamOutlined className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Chức năng – nhiệm vụ</h2>
            </div>
            <ul className="space-y-3">
              {[
                'Tổ chức, triển khai các phong trào Đoàn – Hội trong khoa',
                'Kết nối giữa Nhà trường – Khoa – Đoàn viên, sinh viên',
                'Hỗ trợ chi đoàn trong công tác tổ chức hoạt động',
                'Theo dõi, tổng hợp điểm rèn luyện và đánh giá Đoàn viên',
                'Tiếp nhận phản ánh, góp ý của sinh viên về công tác Đoàn',
              ].map((task, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                <ClockCircleOutlined className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Giờ trực BCH</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <ClockCircleOutlined className="text-green-600 text-lg mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Thời gian:</p>
                  <p className="text-gray-600">
                    Thứ 2 – Thứ 6: <span className="font-medium text-green-600">11h00 – 13h00</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <EnvironmentOutlined className="text-blue-600 text-lg mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Địa điểm:</p>
                  <p className="text-gray-600">
                    Văn phòng Liên chi Đoàn Khoa CNTT
                    <br />
                    <span className="text-xs">(Tầng 3, nhà A)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <WhatsAppOutlined className="text-orange-600 text-lg mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Kênh hỗ trợ online:</p>
                  <p className="text-gray-600">Fanpage LCĐ CNTT / Nhóm Zalo hỗ trợ sinh viên</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                      Facebook
                    </button>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors">
                      Zalo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveBoardPage;
