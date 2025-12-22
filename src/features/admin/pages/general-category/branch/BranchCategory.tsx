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
import React, { useCallback, useEffect, useState } from 'react';
import { BaseAntTable } from '../../../../../components/tables/BaseAntTable';
import { branchService } from '@services/api';
import type { YouthUnionBranch } from '../../../../../app-types/youth-union-branch';
import CreateBranchModal from './modals/CreateBranchModal';
import UpdateBranchModal from './modals/UpdateBranchModal';
import DeleteBranchModal from './modals/DeleteBranchModal';
import ViewBranchModal from './modals/ViewBranchModal';
import { Branch } from './types';

const { Title } = Typography;
const { Search } = Input;

const BranchCategory: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<{
    totalBranches: number;
    activeBranches: number;
    inactiveBranches: number;
    totalMembers: number;
  } | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Modal states
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Fetch branches data
  const fetchBranches = useCallback(async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true);
      // Call API with pagination and search as per postman doc
      const response = await branchService.getList({
        page,
        limit,
        search,
      });

      // Map API response to local Branch type
      const mappedBranches: Branch[] = response.data.list.map((branch: YouthUnionBranch) => ({
        id: branch.id,
        code: branch.code,
        name: branch.name,
        course: 'N/A', // Not available in API
        secretary: branch.secretary || 'Chưa có',
        viceSecretary: branch.viceSecretary,
        description: branch.description,
        establishedDate: branch.establishedDate,
        members: 0, // Will be fetched from statistics if needed
        status: branch.status === 'active' ? 'active' : 'inactive',
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
      }));

      setBranches(mappedBranches);
      setPagination({
        current: response.data.pagination.currentPage,
        pageSize: response.data.pagination.itemsPerPage,
        total: response.data.pagination.totalItems,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi tải dữ liệu';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

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
      await branchService.delete(id);
      message.success('Xóa chi đoàn thành công');

      // Nếu xóa item cuối cùng của trang hiện tại, quay về trang trước
      const newTotal = pagination.total - 1;
      const maxPage = Math.ceil(newTotal / pagination.pageSize);
      const targetPage = pagination.current > maxPage ? maxPage : pagination.current;

      fetchBranches(targetPage || 1, pagination.pageSize, searchText);
      fetchStatistics();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi xóa chi đoàn';
      message.error(errorMessage);
      console.error('Error deleting branch:', error);
    }
  };

  // Handle delete multiple branches
  const handleDeleteMultiple = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một chi đoàn để xóa');
      return;
    }
    setDeleteModalVisible(true);
  };

  // Handle edit
  const handleEdit = (record: Branch) => {
    setSelectedBranch(record);
    setUpdateModalVisible(true);
  };

  // Handle view
  const handleView = (record: Branch) => {
    setSelectedBranch(record);
    setViewModalVisible(true);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const stats = await branchService.getBranchStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
    fetchStatistics();
  }, [fetchBranches, fetchStatistics]);

  // Table columns with enhanced sort and filter
  const columns: ColumnsType<Branch> = [
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
      width: 250,
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
      title: 'Bí thư',
      dataIndex: 'secretary',
      key: 'secretary',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Số đoàn viên',
      dataIndex: 'members',
      key: 'members',
      width: 120,
      align: 'center',
      responsive: ['lg'],
      sorter: (a, b) => a.members - b.members,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Ngừng hoạt động', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag
          color={status === 'active' ? 'green' : 'red'}
          style={{
            fontWeight: '600',
            borderRadius: '8px',
            padding: '4px 12px',
            fontSize: '12px',
          }}
        >
          {status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      responsive: ['lg'],
      sorter: (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
      render: (date: string) => (date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa có'),
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
              onClick={() => handleView(record)}
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
      <Title level={3} style={{ marginBottom: 24 }}>
        Quản lý Chi đoàn
      </Title>

      {/* Statistics Cards */}
      {statistics && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              }}
            >
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Tổng chi đoàn</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
                  {statistics.totalBranches}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Đang hoạt động</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
                  {statistics.activeBranches}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              }}
            >
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Không hoạt động</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
                  {statistics.inactiveBranches}
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              }}
            >
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Tổng đoàn viên</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>
                  {statistics.totalMembers}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}

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
                Quản lý chi đoàn
              </Title>
            </Col>
            <Col>
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateModalVisible(true)}
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
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteMultiple}
                  disabled={selectedRowKeys.length === 0}
                  style={{
                    borderRadius: '10px',
                    background:
                      selectedRowKeys.length === 0
                        ? '#f1f5f9'
                        : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    border: 'none',
                    fontWeight: '600',
                    height: '40px',
                    padding: '0 20px',
                    color: selectedRowKeys.length === 0 ? '#94a3b8' : 'white',
                    boxShadow:
                      selectedRowKeys.length === 0 ? 'none' : '0 4px 12px rgba(220, 38, 38, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedRowKeys.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRowKeys.length > 0) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)';
                    }
                  }}
                >
                  Xóa nhiều ({selectedRowKeys.length})
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

      <CreateBranchModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={() => {
          setCreateModalVisible(false);
          fetchBranches(pagination.current, pagination.pageSize, searchText);
          fetchStatistics();
        }}
      />

      <UpdateBranchModal
        visible={updateModalVisible}
        branch={selectedBranch}
        onCancel={() => {
          setUpdateModalVisible(false);
          setSelectedBranch(null);
        }}
        onSuccess={() => {
          setUpdateModalVisible(false);
          setSelectedBranch(null);
          fetchBranches(pagination.current, pagination.pageSize, searchText);
          fetchStatistics();
        }}
      />

      <DeleteBranchModal
        visible={deleteModalVisible}
        branchIds={selectedRowKeys as number[]}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedRowKeys([]);
        }}
        onSuccess={() => {
          setDeleteModalVisible(false);
          setSelectedRowKeys([]);
          fetchBranches(pagination.current, pagination.pageSize, searchText);
          fetchStatistics();
        }}
      />

      <ViewBranchModal
        visible={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />
    </div>
  );
};

export default BranchCategory;
