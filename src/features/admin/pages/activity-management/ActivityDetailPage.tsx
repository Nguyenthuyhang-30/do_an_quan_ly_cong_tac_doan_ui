// Activity Detail Page - Chi tiết hoạt động
import { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Spin,
  message,
  Tag,
  Row,
  Col,
  Statistic,
  Tabs,
  Table,
  Avatar,
} from 'antd';
import {
  EditOutlined,
  ArrowLeftOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from '@tanstack/react-router';
import ActivityService from '../../../../services/api/activity.service';
import { ActivityStatusBadge } from '../../../../components/common/ActivityStatusBadge';
import { AttendanceStatusBadge } from '../../../../components/common/AttendanceStatusBadge';
import type {
  Activity,
  ActivityAttendanceStatistics,
  ActivityParticipant,
} from '../../../../app-types/activity';
import dayjs from 'dayjs';

export default function ActivityDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/activity-management/$id' });
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [statistics, setStatistics] = useState<ActivityAttendanceStatistics | null>(null);
  const [participants, setParticipants] = useState<ActivityParticipant[]>([]);

  useEffect(() => {
    if (id) {
      fetchActivityDetail();
      fetchStatistics();
      fetchParticipants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      setLoading(true);
      const response = await ActivityService.getById(Number(id));
      setActivity(response);
    } catch (error) {
      message.error('Không thể tải thông tin hoạt động');
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await ActivityService.getActivityAttendanceStatistics(Number(id));
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await ActivityService.getRegisteredMembers(Number(id), {
        page: 1,
        limit: 100,
      });
      setParticipants(response.data.list);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 60,
      render: (avatar: string, record: ActivityParticipant) => (
        <Avatar src={avatar} icon={<UserOutlined />} size={40}>
          {record.member?.fullName?.charAt(0)}
        </Avatar>
      ),
    },
    {
      title: 'Mã ĐV',
      dataIndex: ['member', 'code'],
      key: 'memberCode',
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: ['member', 'fullName'],
      key: 'fullName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: ['member', 'email'],
      key: 'email',
      width: 200,
    },
    {
      title: 'Trạng thái điểm danh',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      width: 150,
      render: (status: 'registered' | 'attended' | 'absent' | 'late') => (
        <AttendanceStatusBadge status={status} />
      ),
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      width: 150,
      render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-'),
    },
    {
      title: 'Check-in',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      width: 150,
      render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-'),
    },
    {
      title: 'Check-out',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      width: 150,
      render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-'),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!activity) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p>Không tìm thấy hoạt động</p>
          <Button onClick={() => navigate({ to: '/admin/activity-management' })}>
            Quay lại danh sách
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate({ to: '/admin/activity-management' })}
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/admin/activity-management/${id}/edit` })}
          >
            Chỉnh sửa
          </Button>
          <Button
            icon={<UsergroupAddOutlined />}
            onClick={() => navigate({ to: `/admin/activity-management/${id}/registration` })}
          >
            Quản lý đăng ký
          </Button>
          <Button
            icon={<CheckCircleOutlined />}
            onClick={() => navigate({ to: `/admin/activity-management/${id}/attendance` })}
          >
            Điểm danh
          </Button>
        </Space>
      </div>

      {/* Statistics */}
      {statistics && (
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng đăng ký"
                value={statistics.totalRegistered}
                prefix={<UsergroupAddOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Đã điểm danh"
                value={statistics.totalAttended}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Vắng mặt"
                value={statistics.totalAbsent}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tỷ lệ tham gia"
                value={statistics.attendanceRate}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Main Content */}
      <Tabs
        defaultActiveKey="info"
        items={[
          {
            key: 'info',
            label: 'Thông tin chung',
            children: (
              <Card>
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Mã hoạt động">{activity.code}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <ActivityStatusBadge status={activity.status} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Tên hoạt động" span={2}>
                    {activity.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại hoạt động">
                    <Tag color="blue">{activity.activityType}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Số lượng tối đa">
                    {activity.maxParticipants || 'Không giới hạn'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian bắt đầu">
                    {activity.startDate
                      ? dayjs(activity.startDate).format('DD/MM/YYYY HH:mm')
                      : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian kết thúc">
                    {activity.endDate ? dayjs(activity.endDate).format('DD/MM/YYYY HH:mm') : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa điểm" span={2}>
                    {activity.location || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Đã đăng ký">
                    {statistics?.totalRegistered || 0} / {activity.maxParticipants || '∞'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tỷ lệ điểm danh">
                    {statistics?.attendanceRate || 0}%
                  </Descriptions.Item>
                  <Descriptions.Item label="Mô tả" span={2}>
                    {activity.description || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">
                    {activity.createdAt
                      ? dayjs(activity.createdAt).format('DD/MM/YYYY HH:mm')
                      : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cập nhật lần cuối">
                    {activity.updatedAt
                      ? dayjs(activity.updatedAt).format('DD/MM/YYYY HH:mm')
                      : '-'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ),
          },
          {
            key: 'participants',
            label: `Danh sách đăng ký (${participants.length})`,
            children: (
              <Card>
                <Table
                  columns={columns}
                  dataSource={participants}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 1200 }}
                />
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
