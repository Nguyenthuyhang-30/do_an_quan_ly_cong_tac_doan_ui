// src/pages/role-permission/RolePermissionPage.tsx
import React, { useState } from 'react';
import { Role } from './types';
import { MOCK_ROLES } from './mockData';
import PermissionTable from './PermissionTable';
import CreateRoleModal from './CreateRoleModal';
import EditRoleModal from './EditRoleModal';

const RolePermissionManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);

  const handleToggle = (id: number, key: keyof Role['permissions']) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              permissions: { ...r.permissions, [key]: !r.permissions[key] },
            }
          : r,
      ),
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quyền & Vai trò</h1>
          <p className="text-gray-500">Quản lý quyền truy cập (CRUD) theo từng loại tài khoản.</p>
        </div>

        {/* Nút thêm quyền mới – đổi màu giống hệ thống */}
        <button
          onClick={() => setModal('create')}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-all shadow-md"
          style={{
            background:
              'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(21, 26, 166, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 26, 166, 0.25)';
          }}
        >
          + Thêm quyền mới
        </button>
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <PermissionTable
          roles={roles}
          onToggle={handleToggle}
          onEdit={(role) => {
            setSelectedRole(role);
            setModal('edit');
          }}
        />
      </div>

      {/* Modals */}
      {modal === 'create' && (
        <CreateRoleModal
          onClose={() => setModal(null)}
          onSubmit={(newRole) => {
            setRoles([...roles, newRole]);
            setModal(null);
          }}
        />
      )}

      {modal === 'edit' && selectedRole && (
        <EditRoleModal
          role={selectedRole}
          onClose={() => setModal(null)}
          onSubmit={(updated) => {
            setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
            setModal(null);
          }}
        />
      )}
    </div>
  );
};

export default RolePermissionManagement;
