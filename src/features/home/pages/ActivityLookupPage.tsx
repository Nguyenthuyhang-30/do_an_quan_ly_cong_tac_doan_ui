// Activity Lookup Page - Tra cứu hoạt động bằng mã sinh viên
import { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  message,
  Empty,
  Space,
  Typography,
  Tag,
  Modal,
} from 'antd';
import { SearchOutlined, LoginOutlined, LogoutOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import ActivityService from '../../../services/api/activity.service';
import MemberService from '../../../services/api/member.service';
import { ActivityStatusBadge } from '../../../components/common/ActivityStatusBadge';
import { AttendanceStatusBadge } from '../../../components/common/AttendanceStatusBadge';
import type {
  Activity,
  ActivityParticipant,
  ActivityStatus,
  AttendanceStatus,
} from '../../../app-types/activity';
import type { YouthUnionMember } from '../../../app-types/youth-union-member';

const { Title, Text } = Typography;

export default function ActivityLookupPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState<YouthUnionMember | null>(null);
  const [activities, setActivities] = useState<(Activity & ActivityParticipant)[]>([]);
  const [searchedCode, setSearchedCode] = useState('');

  const handleSearch = async (values: { studentCode: string }) => {
    try {
      setLoading(true);
      setSearchedCode(values.studentCode);

      // Tìm member bằng student code
      const memberResponse = await MemberService.searchMembers({
        search: values.studentCode,
        page: 1,
        limit: 1,
      });

      if (memberResponse.data.list.length === 0) {
        message.warning('Không tìm thấy đoàn viên với mã sinh viên này');
        setMember(null);
        setActivities([]);
        return;
      }

      const foundMember = memberResponse.data.list[0];
      setMember(foundMember);

      // Lấy danh sách hoạt động đã đăng ký
      const activitiesResponse = await ActivityService.getMemberActivities(foundMember.id, {
        page: 1,
        limit: 100,
      });

      setActivities(activitiesResponse.data.list as (Activity & ActivityParticipant)[]);

      if (activitiesResponse.data.list.length === 0) {
        message.info('Đoàn viên chưa đăng ký hoạt động nào');
      }
    } catch (error) {
      message.error('Không thể tra cứu thông tin');
      console.error('Error searching activities:', error);
      setMember(null);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (activityId: number, memberId: number) => {
    try {
      await ActivityService.checkInMember(activityId, memberId);
      message.success('Check-in thành công');
      // Refresh activities
      handleSearch({ studentCode: searchedCode });
    } catch (error) {
      message.error('Không thể check-in');
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (activityId: number, memberId: number) => {
    try {
      await ActivityService.checkOutMember(activityId, memberId);
      message.success('Check-out thành công');
      // Refresh activities
      handleSearch({ studentCode: searchedCode });
    } catch (error) {
      message.error('Không thể check-out');
      console.error('Error checking out:', error);
    }
  };

  const showCheckInConfirm = (activity: Activity & ActivityParticipant) => {
    Modal.confirm({
      title: 'Xác nhận Check-in',
      content: `Bạn có muốn check-in cho hoạt động "${activity.name}"?`,
      icon: <LoginOutlined />,
      okText: 'Check-in',
      cancelText: 'Hủy',
      onOk: () => handleCheckIn(activity.activityId, member?.id || 0),
    });
  };

  const showCheckOutConfirm = (activity: Activity & ActivityParticipant) => {
    Modal.confirm({
      title: 'Xác nhận Check-out',
      content: `Bạn có muốn check-out cho hoạt động "${activity.name}"?`,
      icon: <LogoutOutlined />,
      okText: 'Check-out',
      cancelText: 'Hủy',
      onOk: () => handleCheckOut(activity.activityId, member?.id || 0),
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
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: ActivityStatus) => <ActivityStatusBadge status={status} />,
    },
    {
      title: 'Trạng thái điểm danh',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      width: 150,
      render: (status: AttendanceStatus) => <AttendanceStatusBadge status={status} />,
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      width: 150,
      render: (date: string) =>
        date ? new Date(date).toLocaleString('vi-VN', { dateStyle: 'short' }) : '-',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: Activity & ActivityParticipant) => {
        const canCheckIn = record.attendanceStatus === 'registered';
        const canCheckOut = record.attendanceStatus === 'attended';

        return (
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<LoginOutlined />}
              disabled={!canCheckIn}
              onClick={() => showCheckInConfirm(record)}
            >
              Check-in
            </Button>
            <Button
              size="small"
              icon={<LogoutOutlined />}
              disabled={!canCheckOut}
              onClick={() => showCheckOutConfirm(record)}
            >
              Check-out
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2}>Tra cứu Hoạt động</Title>
          <Text type="secondary">Nhập mã sinh viên để tra cứu các hoạt động đã đăng ký</Text>
        </div>

        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ justifyContent: 'center', marginBottom: '32px' }}
        >
          <Form.Item
            name="studentCode"
            rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên' }]}
          >
            <Input
              placeholder="Nhập mã sinh viên..."
              size="large"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" loading={loading}>
              Tra cứu
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              size="large"
              icon={<QrcodeOutlined />}
              onClick={() => navigate({ to: '/check-in/qr' })}
            >
              Quét QR Code
            </Button>
          </Form.Item>
        </Form>

        {member && (
          <Card
            style={{ marginBottom: '24px', backgroundColor: '#f0f5ff' }}
            title="Thông tin đoàn viên"
          >
            <Space direction="vertical" size="small">
              <Text>
                <strong>Họ và tên:</strong> {member.fullName}
              </Text>
              <Text>
                <strong>Mã đoàn viên:</strong> {member.code}
              </Text>
              <Text>
                <strong>Mã sinh viên:</strong> {member.studentId}
              </Text>
              <Text>
                <strong>Email:</strong> {member.email}
              </Text>
              <Text>
                <strong>Chi đoàn:</strong> {member.branch?.name || '-'}
              </Text>
              <Text>
                <strong>Trạng thái:</strong>{' '}
                <Tag color={member.status === 'active' ? 'green' : 'red'}>
                  {member.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </Text>
            </Space>
          </Card>
        )}

        {activities.length > 0 ? (
          <Card title={`Danh sách hoạt động đã đăng ký (${activities.length})`}>
            <Table
              columns={columns}
              dataSource={activities}
              loading={loading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        ) : (
          searchedCode && (
            <Empty
              description="Chưa có hoạt động nào được đăng ký"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )
        )}
      </Card>
    </div>
  );
}
