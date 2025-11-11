import React, { useMemo, useState } from 'react';

type Role = 'Bí thư' | 'Phó Bí thư' | 'Uỷ viên';

interface Officer {
  id: number;
  name: string;
  role: Role;
  branch: string; // chi đoàn
  term: string; // nhiệm kỳ
  email: string;
  phone: string;
}

const OFFICERS: Officer[] = [
  {
    id: 1,
    name: 'Lê Văn Phong',
    role: 'Bí thư',
    branch: 'CTK14A',
    term: '2024-2025',
    email: 'a.nguyen@dnu.edu.vn',
    phone: '0987 000 111',
  },
  {
    id: 2,
    name: 'Lê Tuấn Anh',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 3,
    name: 'Nguyễn Thái Khánh',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 4,
    name: 'Trần Thị Thanh Nhàn',
    role: 'Phó Bí thư',
    branch: 'CTK14B',
    term: '2024-2025',
    email: 'b.tran@dnu.edu.vn',
    phone: '0987 000 222',
  },
  {
    id: 5,
    name: 'Nguyễn Thị Phương',
    role: 'Uỷ viên',
    branch: 'CTK15A',
    term: '2024-2025',
    email: 'c.le@dnu.edu.vn',
    phone: '0987 000 333',
  },
  {
    id: 6,
    name: 'Lê Thị Vân Anh',
    role: 'Uỷ viên',
    branch: 'CTK15B',
    term: '2023-2024',
    email: 'd.pham@dnu.edu.vn',
    phone: '0987 000 444',
  },
];

const TERMS = ['Tất cả', '2024-2025', '2023-2024'];
const BRANCHES = ['Tất cả', 'CTK14A', 'CTK14B', 'CTK15A', 'CTK15B'];

const ExecutiveBoardPage: React.FC = () => {
  const [term, setTerm] = useState('Tất cả');
  const [branch, setBranch] = useState('Tất cả');
  const [search, setSearch] = useState('');

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Tiêu đề */}
        <header className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">BAN CHẤP HÀNH CHI ĐOÀN</h1>
          <p className="text-gray-600">
            Thông tin Ban Chấp hành Liên chi đoàn Khoa Công nghệ thông tin.
          </p>
        </header>

        {/* Bộ lọc */}
        <section className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Nhiệm kỳ</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {TERMS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Chi đoàn</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full md:w-64">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Tìm theo họ tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên BCH..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Grid BCH */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Danh sách Ban Chấp hành</h2>
          {filteredOfficers.length === 0 ? (
            <p className="text-sm text-gray-500">Không tìm thấy BCH phù hợp với bộ lọc.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOfficers.map((o) => (
                <article
                  key={o.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                    {o.name
                      .split(' ')
                      .slice(-2)
                      .map((x) => x[0])
                      .join('')}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-gray-900">{o.name}</h3>
                    <p className="text-xs font-semibold text-blue-700 uppercase">{o.role}</p>
                    <p className="text-xs text-gray-500">
                      Chi đoàn: <span className="font-medium">{o.branch}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Nhiệm kỳ: <span className="font-medium">{o.term}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      📧 {o.email}
                      <br />
                      ☎️ {o.phone}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Nhiệm vụ & giờ trực */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Chức năng – nhiệm vụ</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Tổ chức, triển khai các phong trào Đoàn – Hội trong khoa.</li>
              <li>Kết nối giữa Nhà trường – Khoa – Đoàn viên, sinh viên.</li>
              <li>Hỗ trợ chi đoàn trong công tác tổ chức hoạt động.</li>
              <li>Theo dõi, tổng hợp điểm rèn luyện và đánh giá Đoàn viên.</li>
              <li>Tiếp nhận phản ánh, góp ý của sinh viên về công tác Đoàn.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Giờ trực BCH</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium">Thứ 2 – Thứ 6:</span> 11h00 – 13h00
              </li>
              <li>
                <span className="font-medium">Địa điểm:</span> Văn phòng Liên chi Đoàn Khoa CNTT
                (tầng 3, nhà A)
              </li>
              <li>
                <span className="font-medium">Kênh hỗ trợ online:</span> Fanpage LCĐ CNTT / Nhóm
                Zalo hỗ trợ sinh viên.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveBoardPage;
