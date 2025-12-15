import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PictureOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Empty,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { sliderBannerService } from '../../../services/api/slider-banner.service';
import type {
  SliderBanner,
  SliderBannerFormValues,
  SliderBannerStatistics,
} from '../../../types/slider-banner';
import { SliderFormModal } from './SliderFormModal';
import './SliderManagement.scss';

const { Search } = Input;

export const SliderManagement: React.FC = () => {
  const [sliders, setSliders] = useState<SliderBanner[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingSlider, setEditingSlider] = useState<SliderBanner | null>(null);
  const [searchText, setSearchText] = useState('');
  const [statistics, setStatistics] = useState<SliderBannerStatistics | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Load sliders
  const loadSliders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await sliderBannerService.getAll();
      setSliders(data);
    } catch (error) {
      message.error('Không thể tải danh sách slider!');
      console.error('Load sliders error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load statistics
  const loadStatistics = useCallback(async () => {
    try {
      const data = await sliderBannerService.getStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Load statistics error:', error);
    }
  }, []);

  useEffect(() => {
    loadSliders();
    loadStatistics();
  }, [loadSliders, loadStatistics]);

  // Handle create
  const handleCreate = () => {
    setModalMode('create');
    setEditingSlider(null);
    setModalOpen(true);
  };

  // Handle edit
  const handleEdit = (record: SliderBanner) => {
    setModalMode('edit');
    setEditingSlider(record);
    setModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (values: SliderBannerFormValues) => {
    try {
      if (modalMode === 'create') {
        await sliderBannerService.create(values);
        message.success('Tạo slider thành công!');
      } else if (editingSlider) {
        await sliderBannerService.update(editingSlider.id, values);
        message.success('Cập nhật slider thành công!');
      }
      setModalOpen(false);
      loadSliders();
      loadStatistics();
    } catch (error) {
      const err = error as Error;
      message.error(modalMode === 'create' ? 'Tạo slider thất bại!' : 'Cập nhật slider thất bại!');
      console.error('Submit error:', err);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await sliderBannerService.delete(id);
      message.success('Xóa slider thành công!');
      loadSliders();
      loadStatistics();
    } catch (error) {
      message.error('Xóa slider thất bại!');
      console.error('Delete error:', error);
    }
  };

  // Handle delete many
  const handleDeleteMany = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một slider để xóa!');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc muốn xóa ${selectedRowKeys.length} slider đã chọn?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: async () => {
        try {
          await sliderBannerService.deleteMany({
            ids: selectedRowKeys as number[],
          });
          message.success(`Đã xóa ${selectedRowKeys.length} slider!`);
          setSelectedRowKeys([]);
          loadSliders();
          loadStatistics();
        } catch (error) {
          message.error('Xóa slider thất bại!');
          console.error('Delete many error:', error);
        }
      },
    });
  };

  // Handle toggle active
  const handleToggleActive = async (record: SliderBanner) => {
    try {
      await sliderBannerService.update(record.id, {
        isActive: !record.isActive,
      });
      message.success(`${!record.isActive ? 'Đã kích hoạt' : 'Đã ẩn'} slider "${record.name}"!`);
      loadSliders();
      loadStatistics();
    } catch (error) {
      message.error('Cập nhật trạng thái thất bại!');
      console.error('Toggle active error:', error);
    }
  };

  // Handle preview image
  const handlePreviewImage = (imageUrl: string, name: string) => {
    Modal.info({
      title: `Xem trước: ${name}`,
      width: 1000,
      icon: null,
      content: (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: '100%',
              maxHeight: '600px',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </div>
      ),
      okText: 'Đóng',
    });
  };

  // Table columns
  const columns: ColumnsType<SliderBanner> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 140,
      render: (image: string, record) => (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Image
            src={image}
            alt={record.name}
            width={100}
            height={60}
            style={{
              objectFit: 'cover',
              borderRadius: '6px',
              border: '2px solid #f0f0f0',
            }}
            preview={false}
            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="
          />
          <Tooltip title="Xem ảnh toàn màn hình">
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
              className="preview-button"
              onClick={() => handlePreviewImage(image, record.name)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: 180,
      render: (code: string) => (
        <Tag color="geekblue" style={{ fontFamily: 'monospace' }}>
          {code}
        </Tag>
      ),
    },
    {
      title: 'Tên Slider',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (name: string) => (
        <Tooltip title={name}>
          <span style={{ fontWeight: 500 }}>{name}</span>
        </Tooltip>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes((value as string).toLowerCase()) ||
        record.code.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.order || 0) - (b.order || 0),
      render: (order: number) => (
        <Tag color="blue" style={{ fontSize: 14, fontWeight: 'bold' }}>
          #{order || 0}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 140,
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Ẩn', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive: boolean, record) => (
        <Tooltip title={isActive ? 'Nhấn để ẩn' : 'Nhấn để hiển thị'}>
          <Switch
            checked={isActive}
            onChange={() => handleToggleActive(record)}
            checkedChildren="Hiển thị"
            unCheckedChildren="Ẩn"
          />
        </Tooltip>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa slider">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Sửa
            </Button>
          </Tooltip>
          <Popconfirm
            title="Xác nhận xóa slider"
            description={`Bạn có chắc muốn xóa slider "${record.name}"?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa slider">
              <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="slider-management">
      {/* Statistics */}
      {statistics && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Tổng Slider"
                value={statistics.totalSliders}
                prefix={<PictureOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Đang hiển thị"
                value={statistics.activeSliders}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Đang ẩn"
                value={statistics.inactiveSliders}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Có hình ảnh"
                value={statistics.slidersWithImage}
                prefix={<CloudUploadOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Main Card */}
      <Card
        title={
          <Space>
            <PictureOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>Quản lý Slider Banner</span>
          </Space>
        }
        extra={
          <Space wrap>
            <Search
              placeholder="Tìm kiếm theo tên, mã..."
              allowClear
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 280 }}
              prefix={<SearchOutlined />}
              enterButton
            />
            <Tooltip title="Làm mới danh sách">
              <Button icon={<ReloadOutlined />} onClick={loadSliders} loading={loading}>
                Tải lại
              </Button>
            </Tooltip>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} size="middle">
              Thêm Slider
            </Button>
          </Space>
        }
      >
        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div
            style={{
              marginBottom: 16,
              padding: '12px 16px',
              backgroundColor: '#e6f7ff',
              borderRadius: 8,
              border: '1px solid #91d5ff',
            }}
          >
            <Space>
              <span style={{ fontWeight: 500, color: '#1890ff' }}>
                Đã chọn {selectedRowKeys.length} slider
              </span>
              <Button danger icon={<DeleteOutlined />} onClick={handleDeleteMany}>
                Xóa tất cả
              </Button>
              <Button onClick={() => setSelectedRowKeys([])}>Bỏ chọn</Button>
            </Space>
          </div>
        )}

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sliders}
          rowKey="id"
          loading={loading}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    Chưa có slider nào.{' '}
                    <Button type="link" onClick={handleCreate}>
                      Thêm slider đầu tiên
                    </Button>
                  </span>
                }
              />
            ),
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng cộng ${total} slider`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 1000 }}
          rowClassName={(record) => (!record.isActive ? 'slider-row-inactive' : '')}
        />
      </Card>

      {/* Form Modal */}
      <SliderFormModal
        open={modalOpen}
        mode={modalMode}
        initialValues={
          editingSlider
            ? {
                code: editingSlider.code,
                name: editingSlider.name,
                image: editingSlider.image,
                order: editingSlider.order,
                isActive: editingSlider.isActive,
              }
            : undefined
        }
        onSubmit={handleSubmit}
        onCancel={() => setModalOpen(false)}
        loading={loading}
      />
    </div>
  );
};

export default SliderManagement;
