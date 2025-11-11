// Member List Page - Example Implementation
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Statistic,
  Select,
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import MemberService from '../../../../services/api/member.service';
import { BranchSelector } from '../../../../components/common/BranchSelector';
import type { YouthUnionMember, MemberStatistics } from '../../../../types/youth-union-member';
import type { BasePaginatedResponse } from '../../../../base/models/basePaginated';

const { Search } = Input;

export default function MemberListPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<YouthUnionMember[]>([]);
  const [statistics, setStatistics] = useState<MemberStatistics | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [branchFilter, setBranchFilter] = useState<number | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  useEffect(() => {
    fetchMembers();
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, searchText, branchFilter, statusFilter]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response: BasePaginatedResponse<YouthUnionMember> = await MemberService.searchMembers({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText,
        branchId: branchFilter,
        // status: statusFilter,
      });

      setMembers(response.data.list);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pagination.totalItems,
      }));
    } catch (error) {
      message.error('Không thể tải danh sách đoàn viên');
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await MemberService.getMemberStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await MemberService.delete(id);
      message.success('Xóa đoàn viên thành công');

      // Nếu xóa item cuối cùng của trang hiện tại, quay về trang trước
      const newTotal = pagination.total - 1;
      const maxPage = Math.ceil(newTotal / pagination.pageSize);
      const targetPage = pagination.current > maxPage ? maxPage : pagination.current;

      setPagination((prev) => ({ ...prev, current: targetPage || 1 }));
      fetchMembers();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể xóa đoàn viên');
      console.error('Error deleting member:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleBranchFilter = (value: number | undefined) => {
    setBranchFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleStatusFilter = (value: string | undefined) => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (newPagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  }) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: newPagination.total || 0,
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'graduated':
        return 'blue';
      case 'transferred':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'graduated':
        return 'Đã tốt nghiệp';
      case 'transferred':
        return 'Đã chuyển';
      default:
        return 'Không xác định';
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: YouthUnionMember) => (
        <Avatar src={avatar} icon={<UserOutlined />} size={40}>
          {record.fullName?.charAt(0)}
        </Avatar>
      ),
    },
    {
      title: 'Mã ĐV',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: 'MSSV',
      dataIndex: 'studentId',
      key: 'studentId',
      width: 110,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 130,
    },
    {
      title: 'Chi đoàn',
      dataIndex: ['branch', 'name'],
      key: 'branch',
      width: 180,
      render: (name: string) => name || '-',
    },
    {
      title: 'Ngày vào Đoàn',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 130,
      render: (date: string) => (date ? new Date(date).toLocaleDateString('vi-VN') : '-'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 220,
      fixed: 'right' as const,
      render: (_: unknown, record: YouthUnionMember) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate({ to: `/admin/member-management/${record.id}` })}
          >
            Xem
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/admin/member-management/${record.id}/edit` })}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa đoàn viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <h2>Quản lý Đoàn viên</h2>
        </div>

        {statistics && (
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng số đoàn viên" value={statistics.totalMembers} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đang hoạt động"
                  value={statistics.activeMembers}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đã tốt nghiệp"
                  value={statistics.graduatedMembers}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Không hoạt động"
                  value={statistics.inactiveMembers}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
          </Row>
        )}

        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="Tìm kiếm đoàn viên..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 300 }}
              onSearch={handleSearch}
            />
            <BranchSelector
              placeholder="Lọc theo chi đoàn"
              style={{ width: 200 }}
              allowClear
              onChange={handleBranchFilter}
            />
            <Select
              placeholder="Lọc theo trạng thái"
              style={{ width: 180 }}
              allowClear
              onChange={handleStatusFilter}
            >
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
              <Select.Option value="graduated">Đã tốt nghiệp</Select.Option>
              <Select.Option value="transferred">Đã chuyển</Select.Option>
            </Select>
          </Space>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchMembers}>
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate({ to: '/admin/member-management/create' })}
            >
              Thêm đoàn viên
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={members}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1600 }}
        />
      </Card>
    </div>
  );
}
