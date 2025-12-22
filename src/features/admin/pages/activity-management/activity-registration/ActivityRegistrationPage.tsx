// Activity Registration Page - Quản lý Đăng ký Hoạt động
import { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Input,
  Space,
  Row,
  Col,
  Select,
  Tag,
  Modal,
  Descriptions,
  Typography,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  CalendarOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import ActivityService from '../../../../../services/api/activity.service';
import type { Activity, ActivityParticipant, ActivityStatus } from '../../../../../app-types/activity';
import type { BasePaginatedResponse } from '../../../../../base/models/basePaginated';
import { ActivityStatusBadge } from '../../../../../components/common/ActivityStatusBadge';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
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

export default function ActivityRegistrationPage() {
  const navigate = useNavigate();
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
      if (response.data.list && response.data.list.length > 0) {
      setActivities(response.data.list);
      } else {
        // Mock activities nếu không có dữ liệu
        const mockActivities: Activity[] = [
          {
            id: 1,
            code: 'EVENT-001',
            name: 'Hội nghị Đoàn viên 2024',
            description: 'Hội nghị tổng kết năm 2024',
            activityType: 'van-hoa',
            startDate: '2024-12-15T08:00:00Z',
            endDate: '2024-12-15T17:00:00Z',
            location: 'Hội trường A',
            maxParticipants: 200,
            currentParticipants: 0,
            status: 'planned',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-01T00:00:00Z',
            modified_at: '2024-11-01T00:00:00Z',
          },
          {
            id: 2,
            code: 'VOL-002',
            name: 'Tình nguyện dọn dẹp môi trường',
            description: 'Hoạt động tình nguyện bảo vệ môi trường',
            activityType: 'tinh-nguyen',
            startDate: '2024-12-20T07:00:00Z',
            endDate: '2024-12-20T11:00:00Z',
            location: 'Công viên thành phố',
            maxParticipants: 50,
            currentParticipants: 0,
            status: 'planned',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-05T00:00:00Z',
            modified_at: '2024-11-05T00:00:00Z',
          },
          {
            id: 3,
            code: 'MEET-003',
            name: 'Sinh hoạt chi đoàn tháng 12',
            description: 'Sinh hoạt định kỳ chi đoàn',
            activityType: 'hoc-tap',
            startDate: '2024-12-10T14:00:00Z',
            endDate: '2024-12-10T16:00:00Z',
            location: 'Phòng học 101',
            maxParticipants: 30,
            currentParticipants: 0,
            status: 'ongoing',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-10T00:00:00Z',
            modified_at: '2024-11-10T00:00:00Z',
          },
        ];
        setActivities(mockActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Nếu có lỗi, sử dụng mock activities
      const mockActivities: Activity[] = [
        {
          id: 1,
          code: 'EVENT-001',
          name: 'Hội nghị Đoàn viên 2024',
          description: 'Hội nghị tổng kết năm 2024',
          activityType: 'van-hoa',
          startDate: '2024-12-15T08:00:00Z',
          endDate: '2024-12-15T17:00:00Z',
          location: 'Hội trường A',
          maxParticipants: 200,
          currentParticipants: 0,
          status: 'planned',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-01T00:00:00Z',
          modified_at: '2024-11-01T00:00:00Z',
        },
        {
          id: 2,
          code: 'VOL-002',
          name: 'Tình nguyện dọn dẹp môi trường',
          description: 'Hoạt động tình nguyện bảo vệ môi trường',
          activityType: 'tinh-nguyen',
          startDate: '2024-12-20T07:00:00Z',
          endDate: '2024-12-20T11:00:00Z',
          location: 'Công viên thành phố',
          maxParticipants: 50,
          currentParticipants: 0,
          status: 'planned',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-05T00:00:00Z',
          modified_at: '2024-11-05T00:00:00Z',
        },
        {
          id: 3,
          code: 'MEET-003',
          name: 'Sinh hoạt chi đoàn tháng 12',
          description: 'Sinh hoạt định kỳ chi đoàn',
          activityType: 'hoc-tap',
          startDate: '2024-12-10T14:00:00Z',
          endDate: '2024-12-10T16:00:00Z',
          location: 'Phòng học 101',
          maxParticipants: 30,
          currentParticipants: 0,
          status: 'ongoing',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-10T00:00:00Z',
          modified_at: '2024-11-10T00:00:00Z',
        },
      ];
      setActivities(mockActivities);
    }
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      // Lấy tất cả đăng ký từ các hoạt động - CHỈ LẤY CÁC ĐĂNG KÝ ĐÃ ĐƯỢC DUYỆT
      const allRegistrations: RegistrationRecord[] = [];

      let activitiesToFetch = activities;
      if (selectedActivity) {
        activitiesToFetch = activities.filter((a) => a.id === selectedActivity);
      }

      for (const activity of activitiesToFetch) {
        try {
          const participants = await ActivityService.getParticipants(activity.id);
          participants.forEach((participant) => {
            const registration: RegistrationRecord = {
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
              approvalStatus: participant.approvalStatus || 'pending',
            };
            // CHỈ THÊM CÁC ĐĂNG KÝ ĐÃ ĐƯỢC DUYỆT VÀ CHƯA LƯU TRỮ
            if (registration.approvalStatus === 'approved' && !registration.isArchived) {
              allRegistrations.push(registration);
            }
          });
        } catch (error) {
          console.error(`Error fetching participants for activity ${activity.id}:`, error);
        }
      }

      // Nếu không có dữ liệu từ API, sử dụng mock data
      if (allRegistrations.length === 0) {
        // Mock activities nếu chưa có
        const mockActivities: Activity[] = activities.length > 0 ? activities : [
          {
            id: 1,
            code: 'EVENT-001',
            name: 'Hội nghị Đoàn viên 2024',
            description: 'Hội nghị tổng kết năm 2024',
            activityType: 'van-hoa',
            startDate: '2024-12-15T08:00:00Z',
            endDate: '2024-12-15T17:00:00Z',
            location: 'Hội trường A',
            maxParticipants: 200,
            currentParticipants: 0,
            status: 'planned',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-01T00:00:00Z',
            modified_at: '2024-11-01T00:00:00Z',
          },
          {
            id: 2,
            code: 'VOL-002',
            name: 'Tình nguyện dọn dẹp môi trường',
            description: 'Hoạt động tình nguyện bảo vệ môi trường',
            activityType: 'tinh-nguyen',
            startDate: '2024-12-20T07:00:00Z',
            endDate: '2024-12-20T11:00:00Z',
            location: 'Công viên thành phố',
            maxParticipants: 50,
            currentParticipants: 0,
            status: 'planned',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-05T00:00:00Z',
            modified_at: '2024-11-05T00:00:00Z',
          },
          {
            id: 3,
            code: 'MEET-003',
            name: 'Sinh hoạt chi đoàn tháng 12',
            description: 'Sinh hoạt định kỳ chi đoàn',
            activityType: 'hoc-tap',
            startDate: '2024-12-10T14:00:00Z',
            endDate: '2024-12-10T16:00:00Z',
            location: 'Phòng học 101',
            maxParticipants: 30,
            currentParticipants: 0,
            status: 'ongoing',
            isRequiredCheckin: true,
            note: '',
            documents: [],
            created_at: '2024-11-10T00:00:00Z',
            modified_at: '2024-11-10T00:00:00Z',
          },
        ];

        // Mock members
        const mockMembers = [
          { id: 1, code: 'DV001', fullName: 'Nguyễn Văn An', email: 'nguyenvanan@example.com', phoneNumber: '0901234567' },
          { id: 2, code: 'DV002', fullName: 'Trần Thị Bình', email: 'tranthibinh@example.com', phoneNumber: '0901234568' },
          { id: 3, code: 'DV003', fullName: 'Lê Văn Cường', email: 'levancuong@example.com', phoneNumber: '0901234569' },
          { id: 4, code: 'DV004', fullName: 'Phạm Thị Dung', email: 'phamthidung@example.com', phoneNumber: '0901234570' },
          { id: 5, code: 'DV005', fullName: 'Hoàng Văn Em', email: 'hoangvanem@example.com', phoneNumber: '0901234571' },
          { id: 6, code: 'DV006', fullName: 'Vũ Thị Phương', email: 'vuthiphuong@example.com', phoneNumber: '0901234572' },
          { id: 7, code: 'DV007', fullName: 'Đỗ Văn Giang', email: 'dovangiang@example.com', phoneNumber: '0901234573' },
          { id: 8, code: 'DV008', fullName: 'Bùi Thị Hoa', email: 'buithihoa@example.com', phoneNumber: '0901234574' },
          { id: 9, code: 'DV009', fullName: 'Đặng Văn Hùng', email: 'dangvanhung@example.com', phoneNumber: '0901234575' },
          { id: 10, code: 'DV010', fullName: 'Ngô Thị Lan', email: 'ngothilan@example.com', phoneNumber: '0901234576' },
        ];

        // Mock registrations - CHỈ CÁC ĐĂNG KÝ ĐÃ ĐƯỢC DUYỆT
        const mockRegistrations: RegistrationRecord[] = [
          {
            id: 1,
            activityId: 1,
            activity: mockActivities[0],
            memberId: 1,
            member: mockMembers[0],
            registeredAt: '2024-11-15T10:30:00Z',
            attendanceStatus: 'registered',
            approvalStatus: 'approved',
            isArchived: false,
          },
          {
            id: 2,
            activityId: 1,
            activity: mockActivities[0],
            memberId: 2,
            member: mockMembers[1],
            registeredAt: '2024-11-16T09:15:00Z',
            attendanceStatus: 'attended',
            approvalStatus: 'approved',
            isArchived: false,
          },
          {
            id: 3,
            activityId: 1,
            activity: mockActivities[0],
            memberId: 3,
            member: mockMembers[2],
            registeredAt: '2024-11-17T14:20:00Z',
            attendanceStatus: 'absent',
            approvalStatus: 'approved',
            isArchived: false,
          },
          {
            id: 8,
            activityId: 1,
            activity: mockActivities[0],
            memberId: 8,
            member: mockMembers[7],
            registeredAt: '2024-11-22T10:00:00Z',
            attendanceStatus: 'attended',
            approvalStatus: 'approved',
            isArchived: false,
          },
          {
            id: 9,
            activityId: 2,
            activity: mockActivities[1],
            memberId: 9,
            member: mockMembers[8],
            registeredAt: '2024-11-23T09:30:00Z',
            attendanceStatus: 'registered',
            approvalStatus: 'approved',
            isArchived: false,
          },
        ];

        // Cập nhật activities nếu chưa có
        if (activities.length === 0) {
          setActivities(mockActivities);
        }

        // Lọc theo activity nếu có
        let filteredRegistrations = mockRegistrations;
        if (selectedActivity) {
          filteredRegistrations = mockRegistrations.filter((r) => r.activityId === selectedActivity);
        }

        // Lọc theo search text
        if (searchText) {
          const lower = searchText.toLowerCase();
          filteredRegistrations = filteredRegistrations.filter(
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
        const paginated = filteredRegistrations.slice(startIndex, endIndex);

        setRegistrations(paginated);
        setPagination((prev) => ({
          ...prev,
          total: filteredRegistrations.length,
        }));
        return;
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
      // Nếu có lỗi, sử dụng mock data
      console.error('Error fetching registrations:', error);
      
      // Mock activities nếu chưa có
      const mockActivities: Activity[] = activities.length > 0 ? activities : [
        {
          id: 1,
          code: 'EVENT-001',
          name: 'Hội nghị Đoàn viên 2024',
          description: 'Hội nghị tổng kết năm 2024',
          activityType: 'van-hoa',
          startDate: '2024-12-15T08:00:00Z',
          endDate: '2024-12-15T17:00:00Z',
          location: 'Hội trường A',
          maxParticipants: 200,
          currentParticipants: 0,
          status: 'planned',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-01T00:00:00Z',
          modified_at: '2024-11-01T00:00:00Z',
        },
        {
          id: 2,
          code: 'VOL-002',
          name: 'Tình nguyện dọn dẹp môi trường',
          description: 'Hoạt động tình nguyện bảo vệ môi trường',
          activityType: 'tinh-nguyen',
          startDate: '2024-12-20T07:00:00Z',
          endDate: '2024-12-20T11:00:00Z',
          location: 'Công viên thành phố',
          maxParticipants: 50,
          currentParticipants: 0,
          status: 'planned',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-05T00:00:00Z',
          modified_at: '2024-11-05T00:00:00Z',
        },
        {
          id: 3,
          code: 'MEET-003',
          name: 'Sinh hoạt chi đoàn tháng 12',
          description: 'Sinh hoạt định kỳ chi đoàn',
          activityType: 'hoc-tap',
          startDate: '2024-12-10T14:00:00Z',
          endDate: '2024-12-10T16:00:00Z',
          location: 'Phòng học 101',
          maxParticipants: 30,
          currentParticipants: 0,
          status: 'ongoing',
          isRequiredCheckin: true,
          note: '',
          documents: [],
          created_at: '2024-11-10T00:00:00Z',
          modified_at: '2024-11-10T00:00:00Z',
        },
      ];

      // Mock members
      const mockMembers = [
        { id: 1, code: 'DV001', fullName: 'Nguyễn Văn An', email: 'nguyenvanan@example.com', phoneNumber: '0901234567' },
        { id: 2, code: 'DV002', fullName: 'Trần Thị Bình', email: 'tranthibinh@example.com', phoneNumber: '0901234568' },
        { id: 3, code: 'DV003', fullName: 'Lê Văn Cường', email: 'levancuong@example.com', phoneNumber: '0901234569' },
        { id: 4, code: 'DV004', fullName: 'Phạm Thị Dung', email: 'phamthidung@example.com', phoneNumber: '0901234570' },
        { id: 5, code: 'DV005', fullName: 'Hoàng Văn Em', email: 'hoangvanem@example.com', phoneNumber: '0901234571' },
        { id: 6, code: 'DV006', fullName: 'Vũ Thị Phương', email: 'vuthiphuong@example.com', phoneNumber: '0901234572' },
        { id: 7, code: 'DV007', fullName: 'Đỗ Văn Giang', email: 'dovangiang@example.com', phoneNumber: '0901234573' },
        { id: 8, code: 'DV008', fullName: 'Bùi Thị Hoa', email: 'buithihoa@example.com', phoneNumber: '0901234574' },
        { id: 9, code: 'DV009', fullName: 'Đặng Văn Hùng', email: 'dangvanhung@example.com', phoneNumber: '0901234575' },
        { id: 10, code: 'DV010', fullName: 'Ngô Thị Lan', email: 'ngothilan@example.com', phoneNumber: '0901234576' },
      ];

      // Mock registrations - CHỈ CÁC ĐĂNG KÝ ĐÃ ĐƯỢC DUYỆT
      const mockRegistrations: RegistrationRecord[] = [
        {
          id: 1,
          activityId: 1,
          activity: mockActivities[0],
          memberId: 1,
          member: mockMembers[0],
          registeredAt: '2024-11-15T10:30:00Z',
          attendanceStatus: 'registered',
          approvalStatus: 'approved',
          isArchived: false,
        },
        {
          id: 2,
          activityId: 1,
          activity: mockActivities[0],
          memberId: 2,
          member: mockMembers[1],
          registeredAt: '2024-11-16T09:15:00Z',
          attendanceStatus: 'attended',
          approvalStatus: 'approved',
          isArchived: false,
        },
        {
          id: 3,
          activityId: 1,
          activity: mockActivities[0],
          memberId: 3,
          member: mockMembers[2],
          registeredAt: '2024-11-17T14:20:00Z',
          attendanceStatus: 'absent',
          approvalStatus: 'approved',
          isArchived: false,
        },
        {
          id: 8,
          activityId: 1,
          activity: mockActivities[0],
          memberId: 8,
          member: mockMembers[7],
          registeredAt: '2024-11-22T10:00:00Z',
          attendanceStatus: 'attended',
          approvalStatus: 'approved',
          isArchived: false,
        },
        {
          id: 9,
          activityId: 2,
          activity: mockActivities[1],
          memberId: 9,
          member: mockMembers[8],
          registeredAt: '2024-11-23T09:30:00Z',
          attendanceStatus: 'registered',
          approvalStatus: 'approved',
          isArchived: false,
        },
      ];

      // Cập nhật activities nếu chưa có
      if (activities.length === 0) {
        setActivities(mockActivities);
      }

      // Lọc theo activity nếu có
      let filteredRegistrations = mockRegistrations;
      if (selectedActivity) {
        filteredRegistrations = mockRegistrations.filter((r) => r.activityId === selectedActivity);
      }

      // Lọc theo search text
      if (searchText) {
        const lower = searchText.toLowerCase();
        filteredRegistrations = filteredRegistrations.filter(
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
      const paginated = filteredRegistrations.slice(startIndex, endIndex);

      setRegistrations(paginated);
      setPagination((prev) => ({
        ...prev,
        total: filteredRegistrations.length,
      }));
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
                Danh sách Đăng ký Đã Duyệt
              </Title>
            </Col>
            <Col>
              <Space size="middle">
                <Select
                  placeholder="Lọc theo hoạt động"
                  style={{ width: 200 }}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  onChange={handleActivityFilter}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {activities.map((activity) => (
                    <Select.Option key={activity.id} value={activity.id} label={activity.name}>
                      {activity.code} - {activity.name}
                    </Select.Option>
                  ))}
                </Select>
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
                  onClick={() => navigate({ to: '/admin/activity-management/registration-list' })}
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
                  Quản lý đăng ký
                </Button>
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

    </div>
  );
}

