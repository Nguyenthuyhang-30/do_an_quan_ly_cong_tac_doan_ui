// Branch List Page
import { useState, useEffect, useCallback } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useNavigate } from '@tanstack/react-router';
import { BaseAntTable } from '../../../../../components/tables/BaseAntTable';
import BranchService from '../../../../../services/api/branch.service';
import type {
  YouthUnionBranch,
  BranchStatistics,
} from '../../../../../app-types/youth-union-branch';
import type { BasePaginatedResponse } from '../../../../../base/models/basePaginated';

const { Title } = Typography;
const { Search } = Input;

export default function BranchListPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<YouthUnionBranch[]>([]);
  const [statistics, setStatistics] = useState<BranchStatistics | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Fetch branches data
  const fetchBranches = useCallback(async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true);
      const response: BasePaginatedResponse<YouthUnionBranch> = await BranchService.getList({
        page,
        limit,
        search,
      });

      setBranches(response.data.list);
      setPagination((prev) => ({
        ...prev,
        current: response.data.pagination.currentPage || page,
        pageSize: response.data.pagination.itemsPerPage || limit,
        total: response.data.pagination.totalItems || 0,
      }));
    } catch (error) {
      message.error('Không thể tải danh sách chi đoàn');
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const stats = await BranchService.getBranchStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
    fetchStatistics();
  }, [fetchBranches, fetchStatistics]);

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      fetchBranches(1, pagination.pageSize, value);
    },
    [fetchBranches, pagination.pageSize],
  );

  // Handle table change (pagination, sorting, filtering)
  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    fetchBranches(paginationInfo.current, paginationInfo.pageSize, searchText);
  };

  // Handle delete single branch
  const handleDelete = async (id: number) => {
    try {
      await BranchService.delete(id);
      message.success('Xóa chi đoàn thành công');

      // Nếu xóa item cuối cùng của trang hiện tại, quay về trang trước
      const newTotal = pagination.total - 1;
      const maxPage = Math.ceil(newTotal / pagination.pageSize);
      const targetPage = pagination.current > maxPage ? maxPage : pagination.current;

      fetchBranches(targetPage || 1, pagination.pageSize, searchText);
      fetchStatistics();
    } catch (error) {
      message.error('Không thể xóa chi đoàn');
      console.error('Error deleting branch:', error);
    }
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Table columns with enhanced styling
  const columns: ColumnsType<YouthUnionBranch> = [
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
      title: 'Mã chi đoàn',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm mã chi đoàn..."
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
        record.code.toLowerCase().includes((value as string).toLowerCase()),
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
      title: 'Tên chi đoàn',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm tên chi đoàn..."
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
        record.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'establishedDate',
      key: 'establishedDate',
      width: 140,
      responsive: ['md'],
      sorter: (a, b) => {
        const dateA = a.establishedDate ? new Date(a.establishedDate).getTime() : 0;
        const dateB = b.establishedDate ? new Date(b.establishedDate).getTime() : 0;
        return dateA - dateB;
      },
      render: (date: string) => (date ? new Date(date).toLocaleDateString('vi-VN') : '-'),
    },
    {
      title: 'Bí thư',
      dataIndex: 'secretary',
      key: 'secretary',
      width: 150,
      responsive: ['md'],
      render: (secretary: string) => secretary || '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate({ to: `/admin/branch/${record.id}` })}
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
              onClick={() => navigate({ to: `/admin/branch/${record.id}/edit` })}
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

          <Popconfirm
            title="Xóa chi đoàn"
            description="Bạn có chắc chắn muốn xóa chi đoàn này?"
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
    <div
      style={{ backgroundColor: 'var(--background-color)', minHeight: '100vh', padding: '24px' }}
    >
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Tìm kiếm theo mã hoặc tên chi đoàn..."
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
                Quản lý Chi đoàn
              </Title>
            </Col>
            <Col>
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate({ to: '/admin/branch/create' })}
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
                  Thêm mới
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => fetchBranches(pagination.current, pagination.pageSize, searchText)}
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
          rowSelection={rowSelection}
          columns={columns}
          data={branches}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          size="middle"
          responsive={true}
          compactOnMobile={true}
        />
      </Card>
    </div>
  );
}
