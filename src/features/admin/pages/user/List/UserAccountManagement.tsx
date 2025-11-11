// src/pages/user-account/UserAccountManagement.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import {
  LockOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BaseAntTable } from '../../../../../components/tables/BaseAntTable';
import { UserAccount } from './types';
import ResetPasswordModal from './ResetPasswordModal';
import ToggleStatusModal from './ToggleStatusModal';
import AssignRoleModal from './AssignRoleModal';
import CreateUserModal from './CreateUserModal';
import MemberService from '../../../../../services/api/member.service';
import type { YouthUnionMember } from '../../../../../types/youth-union-member';

const { Title } = Typography;
const { Search } = Input;

const UserAccountManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Modal states
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [toggleStatusModalVisible, setToggleStatusModalVisible] = useState(false);
  const [assignRoleModalVisible, setAssignRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  // Fetch users data - Sử dụng MemberService vì account và member dùng chung bảng
  const fetchUsers = useCallback(async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true);
      const response = await MemberService.searchMembers({
        page,
        limit,
        search: search.trim(),
      });

      // Map Member data to UserAccount type (focus on account/login features)
      const mappedUsers: UserAccount[] = response.data.list.map((member: YouthUnionMember) => {
        // Default role is member, có thể extend logic để detect admin/secretary
        const role: 'member' | 'admin' | 'secretary' = 'member';

        return {
          id: member.id,
          fullName: member.fullName,
          email: member.email,
          studentCode: member.phoneNumber || member.studentId || '-',
          role: role,
          roleId: undefined, // Sẽ được set qua AssignRoleModal
          branch: member.branch?.name || '-',
          status: member.status === 'active' ? ('active' as const) : ('locked' as const),
          lastLoginAt: undefined, // Member không track lastLoginAt
          createdAt: member.createdAt,
        };
      });

      setUsers(mappedUsers);
      setPagination({
        current: response.data.pagination.currentPage || page,
        pageSize: response.data.pagination.itemsPerPage || limit,
        total: response.data.pagination.totalItems || 0,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi tải dữ liệu';
      message.error(errorMessage);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      fetchUsers(1, pagination.pageSize, value);
    },
    [fetchUsers, pagination.pageSize],
  );

  // Handle table change (pagination)
  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    fetchUsers(paginationInfo.current, paginationInfo.pageSize, searchText);
  };

  // Handle reset password
  const handleResetPassword = (record: UserAccount) => {
    setSelectedUser(record);
    setResetPasswordModalVisible(true);
  };

  // Handle toggle status
  const handleToggleStatus = (record: UserAccount) => {
    setSelectedUser(record);
    setToggleStatusModalVisible(true);
  };

  // Handle assign role
  const handleAssignRole = (record: UserAccount) => {
    setSelectedUser(record);
    setAssignRoleModalVisible(true);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Define columns for table
  const columns: ColumnsType<UserAccount> = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 220,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 150,
      render: (text: string) => text || '-',
    },
    {
      title: 'Chi đoàn',
      dataIndex: 'branch',
      key: 'branch',
      width: 180,
      render: (text: string) => text || '-',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (role: string) => {
        const roleConfig = {
          admin: { text: 'Quản trị viên', color: 'red' },
          secretary: { text: 'Bí thư chi đoàn', color: 'blue' },
          member: { text: 'Đoàn viên', color: 'default' },
        };
        const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.member;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 220,
      render: (_: unknown, record: UserAccount) => (
        <Space size="small">
          <Tooltip title="Phân quyền">
            <Button
              type="link"
              size="small"
              icon={<UserOutlined />}
              onClick={() => handleAssignRole(record)}
            >
              Phân quyền
            </Button>
          </Tooltip>
          <Tooltip title="Đặt lại mật khẩu">
            <Button
              type="link"
              size="small"
              icon={<LockOutlined />}
              onClick={() => handleResetPassword(record)}
            >
              Reset MK
            </Button>
          </Tooltip>
          <Tooltip title={record.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}>
            <Popconfirm
              title={`Bạn có chắc muốn ${
                record.status === 'active' ? 'khóa' : 'mở khóa'
              } tài khoản này?`}
              onConfirm={() => handleToggleStatus(record)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button
                type="link"
                size="small"
                danger={record.status === 'active'}
                icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
              >
                {record.status === 'active' ? 'Khóa' : 'Mở khóa'}
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Header */}
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={3} style={{ margin: 0 }}>
                    Tài khoản người dùng
                  </Title>
                  <p style={{ margin: '8px 0 0', color: '#666' }}>
                    Quản lý tài khoản, phân quyền và trạng thái truy cập hệ thống
                  </p>
                </Col>
                <Col>
                  <Space>
                    <Tooltip title="Làm mới">
                      <Button icon={<ReloadOutlined />} onClick={() => fetchUsers()} />
                    </Tooltip>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setCreateModalVisible(true)}
                    >
                      Thêm tài khoản
                    </Button>
                  </Space>
                </Col>
              </Row>

              {/* Search */}
              <Row>
                <Col span={24}>
                  <Search
                    placeholder="Tìm kiếm theo họ tên, email, số điện thoại..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    style={{ maxWidth: 500 }}
                  />
                </Col>
              </Row>

              {/* Table */}
              <BaseAntTable
                columns={columns}
                data={users}
                loading={loading}
                rowKey="id"
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng số ${total} tài khoản`,
                }}
                onChange={handleTableChange}
                rowSelection={rowSelection}
                scroll={{ x: 1200 }}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      {createModalVisible && (
        <CreateUserModal
          onClose={() => {
            setCreateModalVisible(false);
            fetchUsers(pagination.current, pagination.pageSize, searchText);
          }}
        />
      )}

      {resetPasswordModalVisible && selectedUser && (
        <ResetPasswordModal
          user={selectedUser}
          onClose={() => {
            setResetPasswordModalVisible(false);
            setSelectedUser(null);
          }}
        />
      )}

      {toggleStatusModalVisible && selectedUser && (
        <ToggleStatusModal
          user={selectedUser}
          onClose={() => {
            setToggleStatusModalVisible(false);
            setSelectedUser(null);
            fetchUsers(pagination.current, pagination.pageSize, searchText);
          }}
        />
      )}

      {assignRoleModalVisible && selectedUser && (
        <AssignRoleModal
          user={selectedUser}
          onClose={() => {
            setAssignRoleModalVisible(false);
            setSelectedUser(null);
            fetchUsers(pagination.current, pagination.pageSize, searchText);
          }}
        />
      )}
    </div>
  );
};

export default UserAccountManagement;
