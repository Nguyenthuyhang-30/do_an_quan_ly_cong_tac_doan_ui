import {
  DeleteOutlined,
  EditOutlined,
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
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import cohortService from '../../../../services/api/cohort.service';
import type { Cohort } from '../../../../types/general-category/cohort';
import CreateCohortModal from './CreateCohortModal';
import DeleteCohortModal from './DeleteCohortModal';
import UpdateCohortModal from './UpdateCohortModal';

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
      if (response.code === 200) {
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
      if (response.code === 200) {
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

  // Table columns
  const columns: ColumnsType<Cohort> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_, __, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: 'Mã khóa',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      render: (code: string) => (
        <Tag color="blue" className="font-semibold">
          {code}
        </Tag>
      ),
    },
    {
      title: 'Tên khóa',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Năm bắt đầu',
      dataIndex: 'start_year',
      key: 'start_year',
      width: 120,
      align: 'center',
    },
    {
      title: 'Năm kết thúc',
      dataIndex: 'end_year',
      key: 'end_year',
      width: 120,
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa khóa học"
            description="Bạn có chắc chắn muốn xóa khóa học này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
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
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateModalVisible(true)}
                >
                  Thêm mới
                </Button>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteMultiple}
                  disabled={selectedRowKeys.length === 0}
                >
                  Xóa nhiều ({selectedRowKeys.length})
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => fetchCohorts(pagination.current, pagination.pageSize, searchText)}
                  loading={loading}
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
                enterButton={<SearchOutlined />}
                onSearch={handleSearch}
                loading={loading}
              />
            </Col>
          </Row>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cohorts}
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
    </div>
  );
};

export default CohortCategory;
