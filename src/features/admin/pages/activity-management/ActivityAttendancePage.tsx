// Activity Attendance Page - Quản lý điểm danh
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  message,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  Avatar,
  Popconfirm,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from '@tanstack/react-router';
import ActivityService from '../../../../services/api/activity.service';
import { AttendanceStatusBadge } from '../../../../components/common/AttendanceStatusBadge';
import QRCodeGenerator from '../../../../components/common/QRCodeGenerator';
import type {
  ActivityParticipant,
  ActivityAttendanceStatistics,
  Activity,
} from '../../../../app-types/activity';
import dayjs from 'dayjs';

const { Search } = Input;

export default function ActivityAttendancePage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/activity-management/$id/attendance' });
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<ActivityParticipant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<ActivityParticipant[]>([]);
  const [statistics, setStatistics] = useState<ActivityAttendanceStatistics | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      fetchActivity();
      fetchParticipants();
      fetchStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchActivity = async () => {
    try {
      const response = await ActivityService.getById(Number(id));
      setActivity(response);
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  useEffect(() => {
    // Filter participants based on search
    if (searchText) {
      const filtered = participants.filter((p) => {
        const searchKey =
          `${p.member?.code} ${p.member?.fullName} ${p.member?.email}`.toLowerCase();
        return searchKey.includes(searchText.toLowerCase());
      });
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants(participants);
    }
  }, [searchText, participants]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await ActivityService.getRegisteredMembers(Number(id), {
        page: 1,
        limit: 1000,
      });
      setParticipants(response.data.list);
      setFilteredParticipants(response.data.list);
    } catch (error) {
      message.error('Không thể tải danh sách đăng ký');
      console.error('Error fetching participants:', error);
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

  const handleCheckIn = async (memberId: number) => {
    try {
      await ActivityService.checkInMember(Number(id), memberId);
      message.success('Check-in thành công');
      fetchParticipants();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể check-in');
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (memberId: number) => {
    try {
      await ActivityService.checkOutMember(Number(id), memberId);
      message.success('Check-out thành công');
      fetchParticipants();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể check-out');
      console.error('Error checking out:', error);
    }
  };

  const handleBulkCheckIn = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một đoàn viên');
      return;
    }

    try {
      setLoading(true);
      await ActivityService.bulkCheckIn(Number(id), selectedRowKeys as number[]);
      message.success(`Check-in thành công ${selectedRowKeys.length} đoàn viên`);
      setSelectedRowKeys([]);
      fetchParticipants();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể check-in hàng loạt');
      console.error('Error bulk check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAttendanceStatus = async (
    memberId: number,
    status: 'attended' | 'absent' | 'late',
  ) => {
    try {
      // Map string status to number: 0-Vắng, 1-Có mặt, 3-Trễ
      const statusMap = {
        attended: 1,
        absent: 0,
        late: 3,
      };

      await ActivityService.updateAttendanceStatus(Number(id), memberId, statusMap[status]);
      message.success('Cập nhật trạng thái thành công');
      fetchParticipants();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể cập nhật trạng thái');
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 60,
      render: (_: string, record: ActivityParticipant) => (
        <Avatar icon={<UserOutlined />} size={40}>
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
      title: 'Trạng thái',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      width: 130,
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
    {
      title: 'Thao tác',
      key: 'action',
      width: 300,
      fixed: 'right' as const,
      render: (_: unknown, record: ActivityParticipant) => {
        const canCheckIn = record.attendanceStatus === 'registered';
        const canCheckOut = record.attendanceStatus === 'attended';

        return (
          <Space size="small" wrap>
            <Button
              type="primary"
              size="small"
              icon={<LoginOutlined />}
              disabled={!canCheckIn}
              onClick={() => handleCheckIn(record.memberId)}
            >
              Check-in
            </Button>
            <Button
              size="small"
              icon={<LogoutOutlined />}
              disabled={!canCheckOut}
              onClick={() => handleCheckOut(record.memberId)}
            >
              Check-out
            </Button>
            <Select
              size="small"
              style={{ width: 120 }}
              value={record.attendanceStatus === 'registered' ? undefined : record.attendanceStatus}
              placeholder="Chọn trạng thái"
              onChange={(value: 'attended' | 'absent' | 'late') =>
                handleUpdateAttendanceStatus(record.memberId, value)
              }
            >
              <Select.Option value="attended">Có mặt</Select.Option>
              <Select.Option value="absent">Vắng</Select.Option>
              <Select.Option value="late">Trễ</Select.Option>
            </Select>
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: ActivityParticipant) => ({
      disabled: record.attendanceStatus !== 'registered',
    }),
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate({ to: `/admin/activity-management/${id}` })}
          >
            Quay lại
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
                prefix={<UserOutlined />}
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
                prefix={<CloseCircleOutlined />}
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
      <Card title="Quản lý điểm danh">
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="Tìm kiếm đoàn viên..."
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Space>
            <Button
              type="default"
              icon={<QrcodeOutlined />}
              onClick={() => setQrModalVisible(true)}
            >
              Hiển thị QR Code
            </Button>
            <Button icon={<ReloadOutlined />} onClick={fetchParticipants}>
              Làm mới
            </Button>
            <Popconfirm
              title="Check-in hàng loạt"
              description={`Bạn có chắc chắn muốn check-in ${selectedRowKeys.length} đoàn viên đã chọn?`}
              onConfirm={handleBulkCheckIn}
              okText="Xác nhận"
              cancelText="Hủy"
              disabled={selectedRowKeys.length === 0}
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                disabled={selectedRowKeys.length === 0}
              >
                Check-in hàng loạt ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredParticipants}
          loading={loading}
          rowKey="memberId"
          rowSelection={rowSelection}
          pagination={{ pageSize: 20 }}
          scroll={{ x: 1600 }}
        />
      </Card>

      {/* QR Code Generator Modal */}
      <QRCodeGenerator
        activityId={Number(id)}
        activityName={activity?.name || 'Hoạt động'}
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
      />
    </div>
  );
}
