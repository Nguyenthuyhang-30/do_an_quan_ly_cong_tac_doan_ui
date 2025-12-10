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
  Modal,
  Form,
  DatePicker,
  Descriptions,
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
import dayjs from 'dayjs';
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

  // --------- NEW: state cho modal ----------
  const [selectedMember, setSelectedMember] = useState<YouthUnionMember | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

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

  // ---------- NEW: hàm mở modal Xem / Sửa + cập nhật ----------
  const openViewModal = (member: YouthUnionMember) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const openEditModal = (member: YouthUnionMember) => {
    setSelectedMember(member);
    form.setFieldsValue({
      code: member.code,
      fullName: member.fullName,
      email: member.email,
      phoneNumber: member.phoneNumber,
      joinDate: member.joinDate ? dayjs(member.joinDate) : null,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = async (values: any) => {
    if (!selectedMember) return;
    try {
      await MemberService.update(selectedMember.id, {
        ...selectedMember,
        ...values,
        joinDate: values.joinDate ? values.joinDate.toISOString() : null,
      });
      message.success('Cập nhật đoàn viên thành công');
      setIsEditModalOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Error updating member:', error);
      message.error('Không thể cập nhật đoàn viên');
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
      width: 200,
      align: 'center' as const,
      render: (_: unknown, record: YouthUnionMember) => (
        <Space size="middle">
          {/* Xem → modal chi tiết */}
          <Button
            icon={<EyeOutlined />}
            onClick={() => openViewModal(record)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              borderColor: '#1677ff',
              color: '#1677ff',
              backgroundColor: '#E6F4FF',
              padding: 0,
            }}
          />

          {/* Sửa → modal cập nhật */}
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              borderColor: '#fa8c16',
              color: '#fa8c16',
              backgroundColor: '#FFF7E6',
              padding: 0,
            }}
          />

          {/* Xóa → Popconfirm giống hình 3 */}
          <Popconfirm
            title="Xóa đoàn viên"
            description="Bạn có chắc chắn muốn xóa đoàn viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            okButtonProps={{ danger: true, type: 'primary' }}
            cancelButtonProps={{ type: 'default' }}
          >
            <Button
              icon={<DeleteOutlined />}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                borderColor: '#ff4d4f',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                padding: 0,
              }}
            />
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

      {/* --------- MODAL XEM CHI TIẾT (giống hình 1) --------- */}
      <Modal
        open={isViewModalOpen && !!selectedMember}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        centered
        width={720}
        title={null}
      >
        {selectedMember && (
          <>
            <div
              style={{
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 22, fontWeight: 600 }}>
                  {selectedMember.fullName || 'Chưa có tên'}
                </div>
                <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>
                  Mã ĐV: {selectedMember.code || 'Chưa có'}
                </div>
              </div>
              <Tag
                color={getStatusColor(selectedMember.status)}
                style={{
                  borderRadius: 999,
                  padding: '6px 16px',
                  background: '#fff',
                  color: '#ff4d4f',
                  fontWeight: 500,
                }}
              >
                {getStatusText(selectedMember.status)}
              </Tag>
            </div>

            <Card
              title="Thông tin chi tiết"
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              <Descriptions column={2} bordered>
                <Descriptions.Item label="Mã ĐV">
                  {selectedMember.code || 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="MSSV">
                  {selectedMember.studentId || 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedMember.email || 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {selectedMember.phoneNumber || 'Chưa có'}
                </Descriptions.Item>
                <Descriptions.Item label="Chi đoàn" span={2}>
                  {selectedMember.branch?.name || 'Chưa có thông tin'}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày vào Đoàn" span={2}>
                  {selectedMember.joinDate
                    ? new Date(selectedMember.joinDate).toLocaleDateString('vi-VN')
                    : 'Chưa có thông tin'}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </>
        )}
      </Modal>

      {/* --------- MODAL CẬP NHẬT (giống hình 2) --------- */}
      <Modal
        open={isEditModalOpen && !!selectedMember}
        onCancel={() => setIsEditModalOpen(false)}
        centered
        width={720}
        okText="Cập nhật"
        cancelText="Hủy"
        title="Cập nhật đoàn viên"
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateMember}>
          <Form.Item
            label="Mã Đoàn viên"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã Đoàn viên' }]}
          >
            <Input placeholder="VD: CNTT1604-001" />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Ngày vào Đoàn" name="joinDate">
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              placeholder="Chọn ngày vào Đoàn"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
