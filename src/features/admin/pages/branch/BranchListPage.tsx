// Branch List Page
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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import BranchService from '../../../../services/api/branch.service';
import type { YouthUnionBranch, BranchStatistics } from '../../../../app-types/youth-union-branch';
import type { BasePaginatedResponse } from '../../../../base/models/basePaginated';

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

  useEffect(() => {
    fetchBranches();
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response: BasePaginatedResponse<YouthUnionBranch> = await BranchService.getList({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText,
      });

      setBranches(response.data.list);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pagination.totalItems,
      }));
    } catch (error) {
      message.error('Không thể tải danh sách chi đoàn');
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await BranchService.getBranchStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await BranchService.delete(id);
      message.success('Xóa chi đoàn thành công');
      fetchBranches();
      fetchStatistics();
    } catch (error) {
      message.error('Không thể xóa chi đoàn');
      console.error('Error deleting branch:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
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

  const columns = [
    {
      title: 'Mã chi đoàn',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: 'Tên chi đoàn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'establishedDate',
      key: 'establishedDate',
      width: 130,
      render: (date: string) => (date ? new Date(date).toLocaleDateString('vi-VN') : '-'),
    },
    {
      title: 'Bí thư',
      dataIndex: 'secretary',
      key: 'secretary',
      width: 150,
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
      width: 180,
      render: (_: unknown, record: YouthUnionBranch) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate({ to: `/admin/branch/${record.id}` })}
          >
            Xem
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/admin/branch/${record.id}/edit` })}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa chi đoàn này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <h2>Quản lý Chi đoàn</h2>
        </div>

        {statistics && (
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng số chi đoàn" value={statistics.totalBranches} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Chi đoàn hoạt động"
                  value={statistics.activeBranches}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Chi đoàn không hoạt động"
                  value={statistics.inactiveBranches}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng số đoàn viên" value={statistics.totalMembers} />
              </Card>
            </Col>
          </Row>
        )}

        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Search
            placeholder="Tìm kiếm chi đoàn..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 400 }}
            onSearch={handleSearch}
          />
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchBranches}>
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate({ to: '/admin/branch/create' })}
            >
              Thêm chi đoàn
            </Button>
          </Space>
        </Space>

        <Table
          columns={columns}
          dataSource={branches}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
}
