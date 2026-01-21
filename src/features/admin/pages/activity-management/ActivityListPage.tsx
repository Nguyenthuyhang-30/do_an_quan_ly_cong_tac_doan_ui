// Activity List Page - Quản lý Hoạt động
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  Row,
  Col,
  Statistic,
  Select,
  Tag,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import ActivityService from '../../../../services/api/activity.service';
import { ActivityStatusBadge } from '../../../../components/common/ActivityStatusBadge';
import type { Activity, ActivityStatistics, ActivityStatus } from '../../../../app-types/activity';
import type { BasePaginatedResponse } from '../../../../base/models/basePaginated';

const { Search } = Input;

export default function ActivityListPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [statistics, setStatistics] = useState<ActivityStatistics | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | undefined>();

  useEffect(() => {
    fetchActivities();
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, searchText, statusFilter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response: BasePaginatedResponse<Activity> = await ActivityService.getList({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText,
        status: statusFilter,
      });

      // Nếu backend trả về danh sách, dùng dữ liệu thật
      if (response.data.list && response.data.list.length > 0) {
        setActivities(response.data.list);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination.totalItems,
        }));
      } else {
        // Nếu chưa có dữ liệu (hoặc backend chưa triển khai), dùng dữ liệu mẫu
        const mockActivities: Activity[] = [
          {
            id: 1,
            code: 'EVENT-001',
            name: 'Hiến máu nhân đạo 2025',
            description: 'Hoạt động hiến máu nhân đạo tại bệnh viện',
            activityType: 'tinh-nguyen',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Bệnh viện Đại Nam',
            status: 'planned',
          } as Activity,
          {
            id: 2,
            code: 'MEETING-002',
            name: 'Sinh hoạt Chi đoàn tháng 1',
            description: 'Buổi sinh hoạt định kỳ của Chi đoàn',
            activityType: 'hoc-tap',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            location: 'Phòng A101',
            status: 'planned',
          } as Activity,
          {
            id: 3,
            code: 'VOLUNTEER-003',
            name: 'Chiến dịch Mùa hè xanh',
            description: 'Hoạt động tình nguyện tại các xã vùng sâu',
            activityType: 'tinh-nguyen',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Xã A, Huyện B',
            status: 'planned',
          } as Activity,
          {
            id: 4,
            code: 'VOTE-004',
            name: 'Bình chọn BCH Chi đoàn',
            description: 'Cuộc bình chọn Ban Chấp hành Chi đoàn nhiệm kỳ mới',
            activityType: 'thi-dua',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'planned',
          } as Activity,
        ];

        setActivities(mockActivities);
        setPagination((prev) => ({
          ...prev,
          total: mockActivities.length,
        }));
      }
    } catch (error) {
      // Nếu lỗi khi gọi API, hiển thị cảnh báo và dùng dữ liệu mẫu
      message.error('Không thể tải danh sách hoạt động. Đang hiển thị dữ liệu mẫu.');
      console.error('Error fetching activities:', error);

      const mockActivities: Activity[] = [
        {
          id: 1,
          code: 'EVENT-001',
          name: 'Hiến máu nhân đạo 2025',
          description: 'Hoạt động hiến máu nhân đạo tại bệnh viện',
          activityType: 'tinh-nguyen',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Bệnh viện Đại Nam',
          status: 'planned',
        } as Activity,
        {
          id: 2,
          code: 'MEETING-002',
          name: 'Sinh hoạt Chi đoàn tháng 1',
          description: 'Buổi sinh hoạt định kỳ của Chi đoàn',
          activityType: 'hoc-tap',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          location: 'Phòng A101',
          status: 'planned',
        } as Activity,
        {
          id: 3,
          code: 'VOLUNTEER-003',
          name: 'Chiến dịch Mùa hè xanh',
          description: 'Hoạt động tình nguyện tại các xã vùng sâu',
          activityType: 'tinh-nguyen',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Xã A, Huyện B',
          status: 'planned',
        } as Activity,
        {
          id: 4,
          code: 'VOTE-004',
          name: 'Bình chọn BCH Chi đoàn',
          description: 'Cuộc bình chọn Ban Chấp hành Chi đoàn nhiệm kỳ mới',
          activityType: 'thi-dua',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'planned',
        } as Activity,
      ];

      setActivities(mockActivities);
      setPagination((prev) => ({
        ...prev,
        total: mockActivities.length,
      }));
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await ActivityService.getActivityStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await ActivityService.delete(id);
      message.success('Xóa hoạt động thành công');
      fetchActivities();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể xóa hoạt động');
      console.error('Error deleting activity:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleStatusFilter = (value: ActivityStatus | undefined) => {
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

  const columns = [
    {
      title: 'Mã hoạt động',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: 'Tên hoạt động',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Loại hoạt động',
      dataIndex: 'activityType',
      key: 'activityType',
      width: 130,
      render: (type: string) => {
        const typeMap: Record<string, string> = {
          'tinh-nguyen': 'Tình nguyện',
          'hoc-tap': 'Học tập',
          'the-thao': 'Thể thao',
          'van-hoa': 'Văn hóa',
          'thi-dua': 'Thi đua',
          khac: 'Khác',
        };
        return <Tag>{typeMap[type] || type}</Tag>;
      },
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
      render: (date: string) =>
        date
          ? new Date(date).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })
          : '-',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Số người tham gia',
      key: 'participants',
      width: 130,
      render: (_: unknown, record: Activity) => (
        <span>{record.currentParticipants ?? 0}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: ActivityStatus) => <ActivityStatusBadge status={status} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      fixed: 'right' as const,
      render: (_: unknown, record: Activity) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate({ to: `/admin/activity-management/${record.id}` })}
              style={{
                borderRadius: '8px',
                borderColor: '#1890ff',
                color: '#1890ff',
                fontWeight: '500',
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1890ff';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1890ff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate({ to: `/admin/activity-management/${record.id}/edit` })}
              style={{
                borderRadius: '8px',
                borderColor: '#fa8c16',
                color: '#fa8c16',
                fontWeight: '500',
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fa8c16';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(250, 140, 22, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fa8c16';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </Tooltip>

          <Tooltip title="Quản lý đăng ký">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<UsergroupAddOutlined />}
              onClick={() =>
                navigate({ to: `/admin/activity-management/registration-list` })
              }
              style={{
                borderRadius: '8px',
                borderColor: '#10b981',
                color: '#10b981',
                fontWeight: '500',
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </Tooltip>

          <Tooltip title="Quản lý điểm danh">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() =>
                navigate({ to: `/admin/activity-management/${record.id}/attendance` })
              }
              style={{
                borderRadius: '8px',
                borderColor: '#3b82f6',
                color: '#3b82f6',
                fontWeight: '500',
                width: '32px',
                height: '32px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Xóa hoạt động"
            description="Bạn có chắc chắn muốn xóa hoạt động này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            okButtonProps={{
              style: {
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                border: 'none',
                borderRadius: '6px',
              },
            }}
            cancelButtonProps={{
              style: {
                borderRadius: '6px',
                borderColor: '#e2e8f0',
              },
            }}
          >
            <Tooltip title="Xóa">
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
                style={{
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  border: 'none',
                  fontWeight: '500',
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <h2>Quản lý Hoạt động</h2>
        </div>

        {statistics && (
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng số hoạt động" value={statistics.totalActivities} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đang diễn ra"
                  value={statistics.ongoingActivities}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đã hoàn thành"
                  value={statistics.completedActivities}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng lượt tham gia" value={statistics.totalParticipants} />
              </Card>
            </Col>
          </Row>
        )}

        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="Tìm kiếm hoạt động..."
              allowClear
              enterButton={
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                    border: 'none',
                    borderRadius: 8,
                    height: 36,
                  }}
                />
              }
              style={{ width: 300 }}
              onSearch={handleSearch}
            />
            <Select
              placeholder="Lọc theo trạng thái"
              style={{ width: 180 }}
              allowClear
              onChange={handleStatusFilter}
            >
              <Select.Option value="planned">Đã lên kế hoạch</Select.Option>
              <Select.Option value="ongoing">Đang diễn ra</Select.Option>
              <Select.Option value="completed">Đã hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Space>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchActivities}>
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => navigate({ to: '/admin/activity-management/registration' })}
              style={{
                background:
                  'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                border: 'none',
                borderRadius: 10,
                height: 40,
                padding: '0 20px',
                boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
              }}
            >
              Đăng ký hoạt động
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={activities}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
        />
      </Card>
    </div>
  );
}
