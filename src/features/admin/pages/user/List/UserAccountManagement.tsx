// src/pages/user-account/UserAccountManagement.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { message } from 'antd';
import { UserAccount } from './types';
import { MOCK_USERS } from './mockData';
// import CreateUserModal from './CreateUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import ToggleStatusModal from './ToggleStatusModal';
import AssignRoleModal from './AssignRoleModal';
import CreateUserModal from './CreateUserModal';
import AccountService from '../../../../../services/api/account.service';
import { Account } from '../../../../../types/account';

const UserAccountManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<UserAccount | null>(null);
  const [modal, setModal] = useState<
    'create' | 'resetPassword' | 'toggleStatus' | 'assignRole' | null
  >(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AccountService.getList({
        page: 1,
        limit: 100,
        search: search.trim(),
      });

      // Map API data to UserAccount type
      const mappedUsers: UserAccount[] = response.data.list.map((account: Account) => {
        let role: 'member' | 'admin' | 'secretary' = 'member';
        const roleName = account.role?.name?.toLowerCase();
        if (roleName === 'admin') role = 'admin';
        else if (roleName === 'secretary' || roleName?.includes('secretary')) role = 'secretary';

        return {
          id: account.id,
          fullName: account.fullName,
          email: account.email,
          studentCode: account.phoneNumber || '-',
          role: role,
          branch: '-',
          status: account.status === 'active' ? ('active' as const) : ('locked' as const),
        };
      });

      setUsers(mappedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Không thể tải danh sách người dùng');
      // Fallback to mock data on error
      setUsers(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const key = (u.fullName + u.studentCode + u.email).toLowerCase().trim();
        return key.includes(search.toLowerCase().trim());
      }),
    [users, search],
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Tài khoản người dùng</h1>
          <p className="text-gray-500">
            Quản lý tài khoản, phân quyền và trạng thái truy cập hệ thống.
          </p>
        </div>
        <button
          onClick={() => setModal('create')}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          + Thêm tài khoản
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Tìm kiếm (Họ tên / MSSV / email)
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          placeholder="Nhập từ khóa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bảng tài khoản */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {loading && <div className="text-center py-4 text-gray-500">Đang tải...</div>}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-2">Họ tên</th>
              <th>Email</th>
              <th>MSSV</th>
              <th>Vai trò</th>
              <th>Chi đoàn</th>
              <th>Trạng thái</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td className="py-4 text-center text-gray-500" colSpan={7}>
                  Không tìm thấy tài khoản phù hợp.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-800">{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.studentCode || '-'}</td>
                  <td className="capitalize">
                    {u.role === 'admin'
                      ? 'Quản trị viên'
                      : u.role === 'secretary'
                      ? 'Bí thư chi đoàn'
                      : 'Đoàn viên'}
                  </td>
                  <td>{u.branch}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                    >
                      {u.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button
                      className="text-xs text-indigo-600 hover:underline"
                      onClick={() => {
                        setSelected(u);
                        setModal('assignRole');
                      }}
                    >
                      Phân quyền
                    </button>
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => {
                        setSelected(u);
                        setModal('resetPassword');
                      }}
                    >
                      Đặt lại MK
                    </button>
                    <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => {
                        setSelected(u);
                        setModal('toggleStatus');
                      }}
                    >
                      {u.status === 'active' ? 'Khóa' : 'Mở khóa'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal === 'create' && <CreateUserModal onClose={() => setModal(null)} />}

      {modal === 'resetPassword' && selected && (
        <ResetPasswordModal user={selected} onClose={() => setModal(null)} />
      )}

      {modal === 'toggleStatus' && selected && (
        <ToggleStatusModal user={selected} onClose={() => setModal(null)} />
      )}

      {modal === 'assignRole' && selected && (
        <AssignRoleModal user={selected} onClose={() => setModal(null)} />
      )}
    </div>
  );
};

export default UserAccountManagement;
