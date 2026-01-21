import React, { useEffect, useMemo, useState } from 'react';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  TeamOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
  CalendarOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { Pagination, Modal, Descriptions, Tag, Avatar } from 'antd';

type Role = 'Bí thư' | 'Phó Bí thư' | 'Uỷ viên';

interface Officer {
  id: number;
  name: string;
  role: Role;
  branch: string; // chi đoàn / lớp
  term: string; // nhiệm kỳ
  email: string;
  phone: string;
  studentCode: string; // mã sinh viên
  cohort?: string; // khóa (extracted từ studentCode hoặc term)
  avatar?: string; // URL ảnh đại diện
}

const OFFICERS_FAKE: Officer[] = [
  {
    id: 1,
    name: 'Trần Thị Minh Hiền',
    role: 'Bí thư',
    branch: 'CNTT 1601',
    term: '2024-2025',
    email: 'hien.1604001@dnu.edu.vn',
    phone: '0987 000 111',
    studentCode: '1604001',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Nguyễn Thiên Thắng',
    role: 'Phó Bí thư',
    branch: 'CNTT 1601',
    term: '2024-2025',
    email: 'thang.nt1604002@dnu.edu.vn',
    phone: '0987 000 222',
    studentCode: '1604002',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: 'Trần Minh Huy',
    role: 'Uỷ viên',
    branch: 'CNTT 1601',
    term: '2024-2025',
    email: 'huy.tm1604003@dnu.edu.vn',
    phone: '0987 000 333',
    studentCode: '1604003',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 4,
    name: 'Nguyễn Hoàng Mai',
    role: 'Bí thư',
    branch: 'CNTT 1602',
    term: '2024-2025',
    email: 'mai.nh1605001@dnu.edu.vn',
    phone: '0987 000 444',
    studentCode: '1605004',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 5,
    name: 'Phạm Hồ Điệp',
    role: 'Phó Bí thư',
    branch: 'CNTT 1602',
    term: '2023-2024',
    email: 'diep.ph1605002@dnu.edu.vn',
    phone: '0987 000 555',
    studentCode: '1605005',
    avatar: 'https://i.pravatar.cc/150?img=21',
  },
  {
    id: 6,
    name: 'Phạm Xuân Dũng',
    role: 'Uỷ viên',
    branch: 'CNTT 1602',
    term: '2023-2024',
    email: 'dung.ph1605002@dnu.edu.vn',
    phone: '0987 000 555',
    studentCode: '1605006',
    avatar: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: 7,
    name: 'Phạm Minh Chiến',
    role: 'Bí thư',
    branch: 'CNTT 1603',
    term: '2023-2024',
    email: 'chien.ph1605002@dnu.edu.vn',
    phone: '0987 000 666',
    studentCode: '1605007',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: 8,
    name: 'Nguyễn Thị Tuyết',
    role: 'Phó Bí thư',
    branch: 'CNTT 1603',
    term: '2023-2024',
    email: 'tuyet.nt1605002@dnu.edu.vn',
    phone: '0987 000 777',
    studentCode: '1605008',
    avatar: 'https://i.pravatar.cc/150?img=24',
  },
  {
    id: 9,
    name: 'Trần Thanh Tâm',
    role: 'Uỷ viên',
    branch: 'CNTT 1603',
    term: '2023-2024',
    email: 'tam.tt1605002@dnu.edu.vn',
    phone: '0987 000 888',
    studentCode: '1605009',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: 10,
    name: 'Phạm Thị Hồng Ngọc',
    role: 'Bí thư',
    branch: 'CNTT 1604',
    term: '2023-2024',
    email: 'ngoc.pt1605002@dnu.edu.vn',
    phone: '0987 000 999',
    studentCode: '1605010',
    avatar: 'https://i.pravatar.cc/150?img=26',
  },
  {
    id: 11,
    name: 'Đặng Thanh Bình ',
    role: 'Phó Bí thư',
    branch: 'CNTT 1605',
    term: '2023-2024',
    email: 'binh.dt1605002@dnu.edu.vn',
    phone: '0987 000 101',
    studentCode: '1605011',
    avatar: 'https://i.pravatar.cc/150?img=27',
  },
  {
    id: 12,
    name: 'Nguyễn Tiến Đạt',
    role: 'Uỷ viên',
    branch: 'CNTT 1604',
    term: '2023-2024',
    email: 'dat.nt1605002@dnu.edu.vn',
    phone: '0987 000 102',
    studentCode: '1605012',
    avatar: 'https://i.pravatar.cc/150?img=28',
  },
  {
    id: 13,
    name: 'Trần Thanh Hằng',
    role: 'Bí thư',
    branch: 'CNTT 1605',
    term: '2023-2024',
    email: 'hang.tt1605002@dnu.edu.vn',
    phone: '0987 000 103',
    studentCode: '1605013',
    avatar: 'https://i.pravatar.cc/150?img=29',
  },
  {
    id: 14,
    name: 'Phạm Tuấn Anh',
    role: 'Phó Bí thư',
    branch: 'CNTT 1605',
    term: '2023-2024',
    email: 'tuan.ph1605002@dnu.edu.vn',
    phone: '0987 000 104',
    studentCode: '1605014',
    avatar: 'https://i.pravatar.cc/150?img=30',
  },
  {
    id: 15,
    name: 'Đặng Hồng Diệp',
    role: 'Uỷ viên',
    branch: 'CNTT 1605',
    term: '2023-2024',
    email: 'diep.ph1605002@dnu.edu.vn',
    phone: '0987 000 105',
    studentCode: '1605015',
    avatar: 'https://i.pravatar.cc/150?img=31',
  },
  {
    id: 16,
    name: 'Lương Minh Đức',
    role: 'Bí thư',
    branch: 'CNTT 1606',
    term: '2023-2024',
    email: 'duc.lm1605002@dnu.edu.vn',
    phone: '0987 000 106',
    studentCode: '1605016',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 17,
    name: 'Lê Thu Ngân',
    role: 'Phó Bí thư',
    branch: 'CNTT 1606',
    term: '2023-2024',
    email: 'ngan.lt1605002@dnu.edu.vn',
    phone: '0987 000 107',
    studentCode: '1605017',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 18,
    name: 'Cấn Văn Duy',
    role: 'Uỷ viên',
    branch: 'CNTT 1606',
    term: '2023-2024',
    email: 'duy.cv1605002@dnu.edu.vn',
    phone: '0987 000 108',
    studentCode: '1605018',
    avatar: 'https://i.pravatar.cc/150?img=34',
  },
];

const BRANCHES = ['Tất cả', 'CNTT 1604', 'CNTT 1605', 'CNTT 1601', 'CNTT 1602', 'CNTT 1603'];
const ROLES: Role[] = ['Bí thư', 'Phó Bí thư', 'Uỷ viên'];
const PAGE_SIZE = 10;

// Helper function to extract cohort from studentCode or term
const extractCohort = (officer: Officer): string => {
  // Extract từ nhiệm kỳ (term): "2024-2025" -> "2024"
  if (officer.term) {
    const year = officer.term.split('-')[0];
    return `Khóa ${year}`;
  }
  // Hoặc extract từ studentCode: "1604001" -> "2016" (nếu 16 là năm nhập học)
  if (officer.studentCode && officer.studentCode.length >= 2) {
    const prefix = officer.studentCode.substring(0, 2);
    // Giả sử 16 -> 2016, 17 -> 2017, etc.
    const year = `20${prefix}`;
    return `Khóa ${year}`;
  }
  return 'Không xác định';
};

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
  const [branch, setBranch] = useState('Tất cả');
  const [cohort, setCohort] = useState('Tất cả');
  const [role, setRole] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [officers, setOfficers] = useState<Officer[]>(OFFICERS_FAKE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract và thêm cohort vào officers
  const officersWithCohort = useMemo(() => {
    return officers.map((o) => ({
      ...o,
      cohort: extractCohort(o),
    }));
  }, [officers]);

  // Lấy danh sách khóa duy nhất từ dữ liệu
  const cohorts = useMemo(() => {
    const uniqueCohorts = Array.from(
      new Set(officersWithCohort.map((o) => o.cohort || 'Không xác định')),
    ).sort();
    return ['Tất cả', ...uniqueCohorts];
  }, [officersWithCohort]);

  useEffect(() => {
    const HAS_API = false;

    if (!HAS_API) {
      setOfficers(OFFICERS_FAKE);
      return;
    }

    const fetchOfficers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/executive-board'); // TODO: thay bằng endpoint thật
        if (!res.ok) throw new Error('Không thể lấy dữ liệu từ API');

        const data: Officer[] = await res.json();
        setOfficers(data);
      } catch (err: any) {
        console.error(err);
        setError('Lỗi tải dữ liệu từ API. Đang sử dụng dữ liệu giả lập.');
        setOfficers(OFFICERS_FAKE); // fallback về fake
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  // ================== LỌC DỮ LIỆU ==================
  const filteredOfficers = useMemo(
    () =>
      officersWithCohort.filter((o) => {
        const matchBranch = branch === 'Tất cả' || o.branch === branch;
        const matchCohort = cohort === 'Tất cả' || o.cohort === cohort;
        const matchRole = role === 'Tất cả' || o.role === role;
        const lower = search.toLowerCase();
        const matchSearch =
          !lower ||
          o.name.toLowerCase().includes(lower) ||
          o.studentCode.toLowerCase().includes(lower) ||
          o.phone.replace(/\s/g, '').includes(lower);

        return matchBranch && matchCohort && matchRole && matchSearch;
      }),
    [branch, cohort, role, search, officersWithCohort],
  );

  // ================== PHÂN TRANG ==================
  const paginatedOfficers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredOfficers.slice(startIndex, endIndex);
  }, [filteredOfficers, currentPage]);

  const totalPages = Math.ceil(filteredOfficers.length / PAGE_SIZE);

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
              <h1 className="text-2xl md:text-4xl font-bold">DANH SÁCH BAN CHẤP HÀNH CHI ĐOÀN</h1>
            </div>
            <p className="text-blue-50 text-sm md:text-base max-w-2xl">
              Thông tin Ban Chấp hành các chi đoàn – Liên chi đoàn Khoa Công nghệ Thông tin theo
              từng lớp.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>{filteredOfficers.length} thành viên BCH</span>
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
              Bộ lọc &amp; Tìm kiếm
            </h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {isFilterOpen ? 'Thu gọn' : 'Mở rộng'}
            </button>
          </div>

          <div className={`space-y-4 ${isFilterOpen || 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <CalendarOutlined className="text-orange-600" />
                  Khóa
                </label>
                <select
                  value={cohort}
                  onChange={(e) => {
                    setCohort(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                >
                  {cohorts.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <TeamOutlined className="text-green-600" />
                  Chi đoàn (lớp)
                </label>
                <select
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  <CrownOutlined className="text-yellow-600" />
                  Chức vụ
                </label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                >
                  <option value="Tất cả">Tất cả</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <SearchOutlined className="text-purple-600" />
                  Tìm theo tên / MSSV / SĐT
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập họ tên, mã sinh viên hoặc số điện thoại..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full border-2 border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick reset */}
            {(branch !== 'Tất cả' || cohort !== 'Tất cả' || role !== 'Tất cả' || search) && (
              <button
                onClick={() => {
                  setBranch('Tất cả');
                  setCohort('Tất cả');
                  setRole('Tất cả');
                  setSearch('');
                  setCurrentPage(1);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Xóa bộ lọc
              </button>
            )}

            {loading && <p className="text-xs text-gray-500 italic">Đang tải dữ liệu từ API...</p>}
            {error && <p className="text-xs text-red-500 italic">{error}</p>}
          </div>
        </section>

        {/* Bảng BCH theo lớp */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UserOutlined className="text-blue-600" />
              Danh sách Ban Chấp hành Chi đoàn
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
                Không tìm thấy thành viên BCH phù hợp với bộ lọc.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        STT
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Avatar
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Chi đoàn (lớp)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Chức vụ
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Mã sinh viên
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Họ tên
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Liên hệ (SĐT)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedOfficers.map((o, index) => {
                      const globalIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
                      return (
                        <tr key={`${o.id}-${globalIndex}`} className="hover:bg-blue-50/60 transition-colors">
                          <td className="px-4 py-3 text-gray-700 font-medium">{globalIndex}</td>
                          <td className="px-4 py-3">
                            <Avatar
                              src={o.avatar}
                              size={48}
                              className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                              onClick={() => {
                                setSelectedOfficer(o);
                                setIsDetailModalOpen(true);
                              }}
                              icon={<UserOutlined />}
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {o.branch}
                          </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadge(
                              o.role,
                            )}`}
                          >
                            {getRoleIcon(o.role)} {o.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-mono">{o.studentCode}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {o.name}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          <div className="flex items-center gap-1 text-sm">
                            <MailOutlined className="text-gray-400" />
                            <a
                              href={`mailto:${o.email}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[250px]"
                              title={o.email}
                            >
                              {o.email}
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${o.phone.replace(/\s/g, '')}`}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs hover:bg-green-100 transition-colors"
                              title={o.phone}
                            >
                              <PhoneOutlined />
                              {o.phone}
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 pb-4">
                  <Pagination
                    current={currentPage}
                    total={filteredOfficers.length}
                    pageSize={PAGE_SIZE}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} của ${total} cán bộ`
                    }
                    className="custom-pagination"
                  />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Nhiệm vụ & giờ trực (giữ lại, chỉnh wording nhẹ) */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <TeamOutlined className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Chức năng – nhiệm vụ BCH</h2>
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
                    <span className="text-xs">(Tầng 3, toà Center Building)</span>
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

      {/* Modal xem chi tiết */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <UserOutlined className="text-blue-600" style={{ fontSize: '24px' }} />
            <span className="text-xl font-bold">Thông tin chi tiết Ban Chấp hành</span>
          </div>
        }
        open={isDetailModalOpen}
        onCancel={() => {
          setIsDetailModalOpen(false);
          setSelectedOfficer(null);
        }}
        footer={null}
        width={700}
        centered
      >
        {selectedOfficer && (
          <div className="space-y-6">
            {/* Header với avatar và tên */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <Avatar
                src={selectedOfficer.avatar}
                size={100}
                icon={<UserOutlined />}
                className="ring-4 ring-blue-100"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedOfficer.name}</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${getRoleBadge(
                      selectedOfficer.role,
                    )}`}
                  >
                    {getRoleIcon(selectedOfficer.role)} {selectedOfficer.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Mã sinh viên" labelStyle={{ fontWeight: 600, width: '40%' }}>
                <span className="font-mono">{selectedOfficer.studentCode}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Chi đoàn (lớp)" labelStyle={{ fontWeight: 600 }}>
                {selectedOfficer.branch}
              </Descriptions.Item>
              <Descriptions.Item label="Khóa" labelStyle={{ fontWeight: 600 }}>
                {selectedOfficer.cohort || extractCohort(selectedOfficer)}
              </Descriptions.Item>
              <Descriptions.Item label="Nhiệm kỳ" labelStyle={{ fontWeight: 600 }}>
                {selectedOfficer.term}
              </Descriptions.Item>
              <Descriptions.Item label="Email" labelStyle={{ fontWeight: 600 }}>
                <a
                  href={`mailto:${selectedOfficer.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {selectedOfficer.email}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" labelStyle={{ fontWeight: 600 }}>
                <a
                  href={`tel:${selectedOfficer.phone.replace(/\s/g, '')}`}
                  className="text-green-600 hover:text-green-800 hover:underline"
                >
                  {selectedOfficer.phone}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExecutiveBoardPage;
