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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import ActivityService from '../../../../services/api/activity.service';
import { ActivityStatusBadge } from '../../../../components/common/ActivityStatusBadge';
import type { Activity, ActivityStatistics, ActivityStatus } from '../../../../types/activity';
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

      setActivities(response.data.list);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pagination.totalItems,
      }));
    } catch (error) {
      message.error('Không thể tải danh sách hoạt động');
      console.error('Error fetching activities:', error);
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
        <span>
          {record.currentParticipants || 0} / {record.maxParticipants || '∞'}
        </span>
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
      width: 250,
      fixed: 'right' as const,
      render: (_: unknown, record: Activity) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate({ to: `/admin/activity/${record.id}` })}
          >
            Xem
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/admin/activity/${record.id}/edit` })}
          >
            Sửa
          </Button>
          <Button
            type="link"
            size="small"
            icon={<UsergroupAddOutlined />}
            onClick={() => navigate({ to: `/admin/activity/${record.id}/registration` })}
          >
            ĐK
          </Button>
          <Button
            type="link"
            size="small"
            icon={<CheckCircleOutlined />}
            onClick={() => navigate({ to: `/admin/activity/${record.id}/attendance` })}
          >
            Điểm danh
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa hoạt động này?"
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
              enterButton={<SearchOutlined />}
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
              icon={<PlusOutlined />}
              onClick={() => navigate({ to: '/admin/activity/create' })}
            >
              Thêm hoạt động
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
