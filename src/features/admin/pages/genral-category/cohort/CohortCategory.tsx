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
import cohortService from '../../../../../services/api/cohort.service';
import type { Cohort } from '../../../../../types/general-category/cohort';
import CreateCohortModal from './CreateCohortModal';
import DeleteCohortModal from './DeleteCohortModal';
import UpdateCohortModal from './UpdateCohortModal';
import ViewCohortModal from './ViewCohortModal';



const { Title } = Typography;
const { Search } = Input;

const CohortCategory: React.FC = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(false);
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
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);

  // Fetch cohorts data
  const fetchCohorts = useCallback(async (page = 1, limit = 10, search = '') => {
    try {
      setLoading(true);
      const response = await cohortService.getList({
        page,
        limit,
        search,
      });
      if (response.success) {
        setCohorts(response.data.list as Cohort[]);
        setPagination((prev) => ({
          ...prev,
          current: response.data.pagination.currentPage || page,
          pageSize: response.data.pagination.itemsPerPage || limit,
          total: response.data.pagination.totalItems || 0,
        }));
      } else {
        message.error(response.message || 'Lỗi khi tải dữ liệu');
      }
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
      fetchCohorts(1, pagination.pageSize, value);
    },
    [fetchCohorts, pagination.pageSize],
  );

  // Handle table change (pagination, sorting, filtering)
  const handleTableChange = (paginationInfo: TablePaginationConfig) => {
    fetchCohorts(paginationInfo.current, paginationInfo.pageSize, searchText);
  };

  // Handle delete single cohort
  const handleDelete = async (id: number) => {
    try {
      const response = await cohortService.deleteById(id);
      if (response.success) {
        message.success('Xóa khóa học thành công');
        fetchCohorts(pagination.current, pagination.pageSize, searchText);
      } else {
        message.error(response.message || 'Lỗi khi xóa khóa học');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi xóa khóa học';
      message.error(errorMessage);
    }
  };

  // Handle delete multiple cohorts
  const handleDeleteMultiple = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một khóa học để xóa');
      return;
    }
    setDeleteModalVisible(true);
  };

  // Handle edit
  const handleEdit = (record: Cohort) => {
    setSelectedCohort(record);
    setUpdateModalVisible(true);
  };

  // Handle view
  const handleView = (record: Cohort) => {
    setSelectedCohort(record);
    setViewModalVisible(true);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  useEffect(() => {
    fetchCohorts();
  }, [fetchCohorts]);

  // Table columns with enhanced sort and filter
  const columns: ColumnsType<Cohort> = [
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
      title: 'Mã khóa',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      sorter: (a, b) => a.code.localeCompare(b.code),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm mã khóa..."
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
      title: 'Tên khóa',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 16 }}>
          <Input
            placeholder="Tìm tên khóa..."
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
      title: 'Năm bắt đầu',
      dataIndex: 'start_year',
      key: 'start_year',
      width: 120,
      align: 'center',
      responsive: ['md'],
      sorter: (a, b) => a.start_year - b.start_year,
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'end_year',
      key: 'end_year',
      width: 120,
      align: 'center',
      responsive: ['md'],
      sorter: (a, b) => a.end_year - b.end_year,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      responsive: ['lg'],
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
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
            title="Xóa khóa học"
            description="Bạn có chắc chắn muốn xóa khóa học này?"
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
            <Col>
              <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
                Quản lý khóa
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
                  onClick={() => fetchCohorts(pagination.current, pagination.pageSize, searchText)}
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

        <div style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Tìm kiếm theo mã hoặc tên khóa..."
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
          </Row>
        </div>

        <BaseAntTable
          rowSelection={rowSelection}
          columns={columns}
          data={cohorts}
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

      <CreateCohortModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={() => {
          setCreateModalVisible(false);
          fetchCohorts(pagination.current, pagination.pageSize, searchText);
        }}
      />

      <UpdateCohortModal
        visible={updateModalVisible}
        cohort={selectedCohort}
        onCancel={() => {
          setUpdateModalVisible(false);
          setSelectedCohort(null);
        }}
        onSuccess={() => {
          setUpdateModalVisible(false);
          setSelectedCohort(null);
          fetchCohorts(pagination.current, pagination.pageSize, searchText);
        }}
      />

      <DeleteCohortModal
        visible={deleteModalVisible}
        cohortIds={selectedRowKeys as number[]}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedRowKeys([]);
        }}
        onSuccess={() => {
          setDeleteModalVisible(false);
          setSelectedRowKeys([]);
          fetchCohorts(pagination.current, pagination.pageSize, searchText);
        }}
      />

      <ViewCohortModal
        visible={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setSelectedCohort(null);
        }}
        cohort={selectedCohort}
      />
    </div>
  );
};

export default CohortCategory;
