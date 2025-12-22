// Registration List Page - Danh sách đăng ký
import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  Select,
  Tag,
  Tooltip,
  Modal,
  Descriptions,
  Row,
  Col,
  Typography,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  EditOutlined,
  InboxOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import ActivityService from '../../../../../services/api/activity.service';
import type { Activity, ActivityParticipant } from '../../../../../app-types/activity';
import type { BasePaginatedResponse } from '../../../../../base/models/basePaginated';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useRole } from '../../../../../hooks/useRole';
import { BaseAntTable } from '../../../../../components/tables/BaseAntTable';

const { Search } = Input;
const { Title } = Typography;

interface RegistrationRecord {
  id: number;
  activityId: number;
  activity: Activity;
  memberId: number;
  member: {
    id: number;
    code: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
  };
  registeredAt: string;
  attendanceStatus?: 'registered' | 'attended' | 'absent' | 'late';
  notes?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  isArchived?: boolean;
}

export default function RegistrationListPage() {
  const navigate = useNavigate();
  const { isAdmin, hasAnyRole } = useRole();
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationRecord | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<RegistrationRecord | null>(null);

  // Kiểm tra quyền duyệt (admin, bí thư, phó bí thư)
  const canApprove = isAdmin() || hasAnyRole(['BCH', 'MODERATOR']);

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activities.length > 0 || selectedActivity) {
      fetchRegistrations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, searchText, selectedActivity, activities.length]);

  const fetchActivities = async () => {
    try {
      const response: BasePaginatedResponse<Activity> = await ActivityService.getList({
        page: 1,
        limit: 1000,
      });
      setActivities(response.data.list);
      
      // Nếu không có activities, thêm dữ liệu giả lập
      if (!response.data.list || response.data.list.length === 0) {
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
          {
            id: 5,
            code: 'EVENT-005',
            name: 'Hội thao Đoàn viên',
            description: 'Giải đấu thể thao dành cho Đoàn viên',
            activityType: 'the-thao',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Sân vận động Đại Nam',
            status: 'planned',
          } as Activity,
        ];
        setActivities(mockActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Nếu lỗi, thêm dữ liệu giả lập
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
        {
          id: 5,
          code: 'EVENT-005',
          name: 'Hội thao Đoàn viên',
          description: 'Giải đấu thể thao dành cho Đoàn viên',
          activityType: 'the-thao',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Sân vận động Đại Nam',
          status: 'planned',
        } as Activity,
      ];
      setActivities(mockActivities);
    }
  };

  // Tạo dữ liệu giả lập
  const generateMockData = (): RegistrationRecord[] => {
    const mockActivities = [
      { id: 1, code: 'EVENT-001', name: 'Hiến máu nhân đạo 2025' },
      { id: 2, code: 'MEETING-002', name: 'Sinh hoạt Chi đoàn tháng 1' },
      { id: 3, code: 'VOLUNTEER-003', name: 'Chiến dịch Mùa hè xanh' },
      { id: 4, code: 'VOTE-004', name: 'Bình chọn BCH Chi đoàn' },
      { id: 5, code: 'EVENT-005', name: 'Hội thao Đoàn viên' },
    ];

    const mockMembers = [
      { id: 1, code: 'DV001', fullName: 'Nguyễn Văn An', email: 'nguyenvanan@example.com', phoneNumber: '0912345678' },
      { id: 2, code: 'DV002', fullName: 'Trần Thị Bình', email: 'tranthibinh@example.com', phoneNumber: '0923456789' },
      { id: 3, code: 'DV003', fullName: 'Lê Văn Cường', email: 'levancuong@example.com', phoneNumber: '0934567890' },
      { id: 4, code: 'DV004', fullName: 'Phạm Thị Dung', email: 'phamthidung@example.com', phoneNumber: '0945678901' },
      { id: 5, code: 'DV005', fullName: 'Hoàng Văn Em', email: 'hoangvanem@example.com', phoneNumber: '0956789012' },
      { id: 6, code: 'DV006', fullName: 'Vũ Thị Phương', email: 'vuthiphuong@example.com', phoneNumber: '0967890123' },
      { id: 7, code: 'DV007', fullName: 'Đỗ Văn Giang', email: 'dovangiang@example.com', phoneNumber: '0978901234' },
      { id: 8, code: 'DV008', fullName: 'Bùi Thị Hoa', email: 'buithihoa@example.com', phoneNumber: '0989012345' },
      { id: 9, code: 'DV009', fullName: 'Ngô Văn Hùng', email: 'ngovanhung@example.com', phoneNumber: '0990123456' },
      { id: 10, code: 'DV010', fullName: 'Đinh Thị Lan', email: 'dinhthilan@example.com', phoneNumber: '0901234567' },
      { id: 11, code: 'DV011', fullName: 'Võ Văn Minh', email: 'vovanminh@example.com', phoneNumber: '0912345679' },
      { id: 12, code: 'DV012', fullName: 'Lý Thị Nga', email: 'lythinga@example.com', phoneNumber: '0923456780' },
      { id: 13, code: 'DV013', fullName: 'Đặng Văn Oanh', email: 'dangvanoanh@example.com', phoneNumber: '0934567891' },
      { id: 14, code: 'DV014', fullName: 'Bạch Thị Phương', email: 'bachthiphuong@example.com', phoneNumber: '0945678902' },
      { id: 15, code: 'DV015', fullName: 'Phan Văn Quang', email: 'phanvanquang@example.com', phoneNumber: '0956789013' },
    ];

    const approvalStatuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
    const attendanceStatuses: ('registered' | 'attended' | 'absent' | 'late')[] = ['registered', 'attended', 'absent', 'late'];

    const mockRegistrations: RegistrationRecord[] = [];
    let registrationId = 1;

    mockActivities.forEach((activity, activityIndex) => {
      // Mỗi hoạt động có 3-5 đăng ký
      const numRegistrations = 3 + (activityIndex % 3);
      for (let i = 0; i < numRegistrations; i++) {
        const member = mockMembers[(activityIndex * 3 + i) % mockMembers.length];
        const approvalStatus = approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)];
        const attendanceStatus = attendanceStatuses[Math.floor(Math.random() * attendanceStatuses.length)];
        const isArchived = Math.random() > 0.85; // 15% được lưu trữ

        const registeredDate = new Date();
        registeredDate.setDate(registeredDate.getDate() - Math.floor(Math.random() * 30)); // Trong 30 ngày qua

        mockRegistrations.push({
          id: registrationId++,
          activityId: activity.id,
          activity: activity as Activity,
          memberId: member.id,
          member: {
            id: member.id,
            code: member.code,
            fullName: member.fullName,
            email: member.email,
            phoneNumber: member.phoneNumber,
          },
          registeredAt: registeredDate.toISOString(),
          attendanceStatus: attendanceStatus,
          notes: i === 0 ? 'Ghi chú đặc biệt cho đăng ký này' : undefined,
          approvalStatus: approvalStatus,
          isArchived: isArchived,
        });
      }
    });

    return mockRegistrations;
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      // Lấy tất cả đăng ký từ các hoạt động
      const allRegistrations: RegistrationRecord[] = [];

      let activitiesToFetch = activities;
      if (selectedActivity) {
        activitiesToFetch = activities.filter((a) => a.id === selectedActivity);
      }

      // Nếu không có activities hoặc activities rỗng, sử dụng dữ liệu giả lập
      if (activitiesToFetch.length === 0) {
        const mockData = generateMockData();
        allRegistrations.push(...mockData);
      } else {
        for (const activity of activitiesToFetch) {
          try {
            const participants = await ActivityService.getParticipants(activity.id);
            participants.forEach((participant) => {
              allRegistrations.push({
                id: participant.id,
                activityId: activity.id,
                activity: activity,
                memberId: participant.memberId,
                member: participant.member || {
                  id: participant.memberId,
                  code: '',
                  fullName: 'N/A',
                  email: '',
                },
                registeredAt: participant.registeredAt,
                attendanceStatus: participant.attendanceStatus,
                notes: participant.notes,
                approvalStatus: 'pending', // Default
                isArchived: false, // Default
              });
            });
          } catch (error) {
            console.error(`Error fetching participants for activity ${activity.id}:`, error);
            // Nếu lỗi, thêm dữ liệu giả lập cho activity này
            const mockData = generateMockData().filter((r) => r.activityId === activity.id);
            if (mockData.length === 0) {
              // Tạo mock data cho activity này
              const mockMembers = [
                { id: 1, code: 'DV001', fullName: 'Nguyễn Văn An', email: 'nguyenvanan@example.com' },
                { id: 2, code: 'DV002', fullName: 'Trần Thị Bình', email: 'tranthibinh@example.com' },
                { id: 3, code: 'DV003', fullName: 'Lê Văn Cường', email: 'levancuong@example.com' },
              ];
              mockMembers.forEach((member, index) => {
                allRegistrations.push({
                  id: Date.now() + index,
                  activityId: activity.id,
                  activity: activity,
                  memberId: member.id,
                  member: {
                    id: member.id,
                    code: member.code,
                    fullName: member.fullName,
                    email: member.email,
                  },
                  registeredAt: new Date().toISOString(),
                  attendanceStatus: 'registered',
                  approvalStatus: index === 0 ? 'approved' : index === 1 ? 'pending' : 'rejected',
                  isArchived: false,
                });
              });
            } else {
              allRegistrations.push(...mockData);
            }
          }
        }
      }

      // Lọc theo search text
      let filtered = allRegistrations;
      if (searchText) {
        const lower = searchText.toLowerCase();
        filtered = allRegistrations.filter(
          (r) =>
            r.member.fullName.toLowerCase().includes(lower) ||
            r.member.code.toLowerCase().includes(lower) ||
            r.member.email.toLowerCase().includes(lower) ||
            r.activity.name.toLowerCase().includes(lower) ||
            r.activity.code.toLowerCase().includes(lower),
        );
      }

      // Phân trang
      const startIndex = (pagination.current - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginated = filtered.slice(startIndex, endIndex);

      setRegistrations(paginated);
      setPagination((prev) => ({
        ...prev,
        total: filtered.length,
      }));
    } catch (error) {
      message.error('Không thể tải danh sách đăng ký');
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleActivityFilter = (value: number | undefined) => {
    setSelectedActivity(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    setPagination({
      current: paginationInfo.current || 1,
      pageSize: paginationInfo.pageSize || 10,
      total: paginationInfo.total || 0,
    });
  };

  const handleViewDetail = (record: RegistrationRecord) => {
    setSelectedRegistration(record);
    setDetailModalVisible(true);
  };

  const handleApprove = async (record: RegistrationRecord) => {
    try {
      // TODO: Gọi API duyệt đăng ký
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === record.id ? { ...r, approvalStatus: 'approved' as const } : r,
        ),
      );
      message.success('Duyệt đăng ký thành công');
    } catch (error) {
      message.error('Không thể duyệt đăng ký');
      console.error('Error approving registration:', error);
    }
  };

  const handleReject = async (record: RegistrationRecord) => {
    try {
      // TODO: Gọi API từ chối đăng ký
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === record.id ? { ...r, approvalStatus: 'rejected' as const } : r,
        ),
      );
      message.success('Từ chối đăng ký thành công');
    } catch (error) {
      message.error('Không thể từ chối đăng ký');
      console.error('Error rejecting registration:', error);
    }
  };

  const handleArchive = async (record: RegistrationRecord) => {
    try {
      // TODO: Gọi API lưu trữ đăng ký
      setRegistrations((prev) =>
        prev.map((r) => (r.id === record.id ? { ...r, isArchived: true } : r)),
      );
      message.success('Lưu trữ đăng ký thành công');
    } catch (error) {
      message.error('Không thể lưu trữ đăng ký');
      console.error('Error archiving registration:', error);
    }
  };

  const handleUnarchive = async (record: RegistrationRecord) => {
    try {
      // TODO: Gọi API hủy lưu trữ đăng ký
      setRegistrations((prev) =>
        prev.map((r) => (r.id === record.id ? { ...r, isArchived: false } : r)),
      );
      message.success('Hủy lưu trữ đăng ký thành công');
    } catch (error) {
      message.error('Không thể hủy lưu trữ đăng ký');
      console.error('Error unarchiving registration:', error);
    }
  };

  const handleEdit = (record: RegistrationRecord) => {
    setEditingRegistration(record);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async (values: any) => {
    try {
      // TODO: Gọi API cập nhật đăng ký
      setRegistrations((prev) =>
        prev.map((r) => (r.id === editingRegistration?.id ? { ...r, ...values } : r)),
      );
      message.success('Cập nhật đăng ký thành công');
      setEditModalVisible(false);
      setEditingRegistration(null);
    } catch (error) {
      message.error('Không thể cập nhật đăng ký');
      console.error('Error updating registration:', error);
    }
  };

  const getAttendanceStatusTag = (status?: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      registered: { color: 'blue', text: 'Đã đăng ký' },
      attended: { color: 'green', text: 'Đã tham gia' },
      absent: { color: 'red', text: 'Vắng mặt' },
      late: { color: 'orange', text: 'Đi muộn' },
    };
    const config = statusMap[status || 'registered'] || statusMap.registered;
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: ColumnsType<RegistrationRecord> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      responsive: ['sm'],
      render: (_, __, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: 'Mã hoạt động',
      dataIndex: ['activity', 'code'],
      key: 'activityCode',
      width: 120,
      sorter: (a, b) => a.activity.code.localeCompare(b.activity.code),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm mã hoạt động..."
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{
              marginBottom: 12,
              display: 'block',
              borderRadius: '8px',
            }}
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{
                width: 80,
                borderRadius: '6px',
                background:
                  'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                border: 'none',
              }}
              icon={<SearchOutlined />}
            >
              Tìm
            </Button>
            <Button
              onClick={() => clearFilters && clearFilters()}
              size="small"
              style={{
                width: 80,
                borderRadius: '6px',
                borderColor: '#e2e8f0',
              }}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.activity.code.toLowerCase().includes((value as string).toLowerCase()),
      render: (code: string) => (
        <Tag
          color="blue"
          style={{
            fontWeight: '600',
            borderRadius: '8px',
            padding: '4px 12px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            border: '1px solid #93c5fd',
            color: '#1e40af',
            fontSize: '12px',
          }}
        >
          {code}
        </Tag>
      ),
    },
    {
      title: 'Tên hoạt động',
      dataIndex: ['activity', 'name'],
      key: 'activityName',
      width: 200,
      sorter: (a, b) => a.activity.name.localeCompare(b.activity.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm tên hoạt động..."
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{
              marginBottom: 12,
              display: 'block',
              borderRadius: '8px',
            }}
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{
                width: 80,
                borderRadius: '6px',
                background:
                  'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                border: 'none',
              }}
              icon={<SearchOutlined />}
            >
              Tìm
            </Button>
            <Button
              onClick={() => clearFilters && clearFilters()}
              size="small"
              style={{
                width: 80,
                borderRadius: '6px',
                borderColor: '#e2e8f0',
              }}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.activity.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Mã đoàn viên',
      dataIndex: ['member', 'code'],
      key: 'memberCode',
      width: 120,
      sorter: (a, b) => a.member.code.localeCompare(b.member.code),
    },
    {
      title: 'Họ tên',
      dataIndex: ['member', 'fullName'],
      key: 'memberName',
      width: 180,
      sorter: (a, b) => a.member.fullName.localeCompare(b.member.fullName),
    },
    {
      title: 'Email',
      dataIndex: ['member', 'email'],
      key: 'memberEmail',
      width: 200,
      responsive: ['lg'],
      sorter: (a, b) => a.member.email.localeCompare(b.member.email),
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      width: 150,
      responsive: ['md'],
      sorter: (a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime(),
      render: (date: string) =>
        date ? new Date(date).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      width: 120,
      render: (status: string) => getAttendanceStatusTag(status),
    },
    {
      title: 'Duyệt',
      dataIndex: 'approvalStatus',
      key: 'approvalStatus',
      width: 120,
      render: (status: string, record: RegistrationRecord) => {
        if (record.isArchived) {
          return <Tag color="default">Đã lưu trữ</Tag>;
        }
        const statusMap: Record<string, { color: string; text: string }> = {
          pending: { color: 'orange', text: 'Chờ duyệt' },
          approved: { color: 'green', text: 'Đã duyệt' },
          rejected: { color: 'red', text: 'Từ chối' },
        };
        const config = statusMap[status || 'pending'] || statusMap.pending;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: RegistrationRecord) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
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
              onClick={() => handleEdit(record)}
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
          {canApprove && record.approvalStatus !== 'approved' && (
            <Tooltip title="Duyệt">
              <Popconfirm
                title="Duyệt đăng ký"
                description="Bạn có chắc chắn muốn duyệt đăng ký này?"
                onConfirm={() => handleApprove(record)}
                okText="Duyệt"
                cancelText="Hủy"
                okButtonProps={{
                  style: {
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
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
                <Button
                  type="primary"
                  size="small"
                  icon={<CheckOutlined />}
                  style={{
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
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
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 196, 26, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Popconfirm>
            </Tooltip>
          )}

          {canApprove && record.approvalStatus !== 'rejected' && (
            <Popconfirm
              title="Từ chối đăng ký"
              description="Bạn có chắc chắn muốn từ chối đăng ký này?"
              onConfirm={() => handleReject(record)}
              okText="Từ chối"
              cancelText="Hủy"
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
              <Tooltip title="Từ chối">
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<CloseCircleOutlined />}
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
          )}

          {record.isArchived ? (
            <Popconfirm
              title="Hủy lưu trữ"
              description="Bạn có chắc chắn muốn hủy lưu trữ đăng ký này?"
              onConfirm={() => handleUnarchive(record)}
              okText="Hủy lưu trữ"
              cancelText="Không"
              okButtonProps={{
                style: {
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
              <Tooltip title="Hủy lưu trữ">
                <Button
                  type="default"
                  size="small"
                  icon={<InboxOutlined />}
                  style={{
                    borderRadius: '8px',
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
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 26, 166, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Lưu trữ đăng ký"
              description="Bạn có chắc chắn muốn lưu trữ đăng ký này?"
              onConfirm={() => handleArchive(record)}
              okText="Lưu trữ"
              cancelText="Không"
              okButtonProps={{
                style: {
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
              <Tooltip title="Lưu trữ">
                <Button
                  type="default"
                  size="small"
                  icon={<InboxOutlined />}
                  style={{
                    borderRadius: '8px',
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
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 26, 166, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{ backgroundColor: 'var(--background-color)', minHeight: '100vh', padding: '24px' }}
    >
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Tìm kiếm theo tên, mã đoàn viên, email hoặc tên hoạt động..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      background:
                        'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                      border: 'none',
                      borderRadius: '0 8px 8px 0',
                    }}
                  />
                }
                onSearch={handleSearch}
                loading={loading}
                style={{
                  borderRadius: '10px',
                }}
                className="modern-search"
              />
            </Col>
            <Col>
              <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
                Danh sách đăng ký
              </Title>
            </Col>
            <Col>
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate({ to: '/admin/activity-management/registration/select-type' })}
                  style={{
                    borderRadius: '10px',
                    background:
                      'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                    border: 'none',
                    fontWeight: '600',
                    height: '40px',
                    padding: '0 20px',
                    boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
                    transition: 'all 0.3s ease',
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
                  Tạo phiếu đăng ký
                </Button>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate({ to: '/admin/activity-management/registration' })}
                  style={{
                    borderRadius: '10px',
                    borderColor: '#e2e8f0',
                    color: '#64748b',
                    fontWeight: '500',
                    height: '40px',
                    padding: '0 20px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 26, 166, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Quay lại
                </Button>
                <Select
                  placeholder="Lọc theo hoạt động"
                  style={{ width: 200 }}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={handleActivityFilter}
                  filterOption={(input, option) =>
                    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {activities.map((activity) => (
                    <Select.Option key={activity.id} value={activity.id} label={activity.name}>
                      {activity.code} - {activity.name}
                    </Select.Option>
                  ))}
                </Select>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchRegistrations}
                  loading={loading}
                  style={{
                    borderRadius: '10px',
                    borderColor: '#e2e8f0',
                    color: '#64748b',
                    fontWeight: '500',
                    height: '40px',
                    padding: '0 20px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 26, 166, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Tải lại
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        <BaseAntTable
          columns={columns}
          data={registrations}
          rowKey={(record) => `${record.activityId}-${record.memberId}`}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đăng ký`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
          size="middle"
          responsive={true}
          compactOnMobile={true}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết Đăng ký"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedRegistration && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Hoạt động">
              <Space>
                <Tag color="blue">{selectedRegistration.activity.code}</Tag>
                <span>{selectedRegistration.activity.name}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Đoàn viên">
              <Space>
                <UserOutlined />
                <span>
                  {selectedRegistration.member.code} - {selectedRegistration.member.fullName}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Email">{selectedRegistration.member.email}</Descriptions.Item>
            {selectedRegistration.member.phoneNumber && (
              <Descriptions.Item label="Số điện thoại">
                {selectedRegistration.member.phoneNumber}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Ngày đăng ký">
              <Space>
                <CalendarOutlined />
                <span>
                  {new Date(selectedRegistration.registeredAt).toLocaleString('vi-VN', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {getAttendanceStatusTag(selectedRegistration.attendanceStatus)}
            </Descriptions.Item>
            {selectedRegistration.notes && (
              <Descriptions.Item label="Ghi chú">{selectedRegistration.notes}</Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Sửa đăng ký"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingRegistration(null);
        }}
        onOk={() => {
          // Handle save
          if (editingRegistration) {
            handleSaveEdit({});
          }
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        {editingRegistration && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Hoạt động">
              <Space>
                <Tag color="blue">{editingRegistration.activity.code}</Tag>
                <span>{editingRegistration.activity.name}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Đoàn viên">
              <Space>
                <UserOutlined />
                <span>
                  {editingRegistration.member.code} - {editingRegistration.member.fullName}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú">
              <Input.TextArea
                rows={3}
                defaultValue={editingRegistration.notes}
                placeholder="Nhập ghi chú..."
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

