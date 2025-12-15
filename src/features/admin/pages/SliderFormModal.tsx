import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, message, Alert, Space, Button, Card } from 'antd';
import { DeleteOutlined, CloudUploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FileUpload } from '../../../components/common';
import { UploadFolder } from '../../../types/upload';
import { ImageVersionPreference } from '../../../services/api/upload.service';
import type { SliderBannerFormValues } from '../../../types/slider-banner';
import type { UploadedFile } from '../../../types/upload';

interface SliderFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: SliderBannerFormValues;
  onSubmit: (values: SliderBannerFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const SliderFormModal: React.FC<SliderFormModalProps> = ({
  open,
  mode,
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm<SliderBannerFormValues>();
  const [imageUrl, setImageUrl] = useState<string>(initialValues?.image || '');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Reset image URL when initial values change or modal opens
  useEffect(() => {
    if (open) {
      setImageUrl(initialValues?.image || '');
      form.setFieldsValue(initialValues || { isActive: true, order: 0 });
    }
  }, [open, initialValues, form]);

  const handleUploadSuccess = (file: UploadedFile | UploadedFile[]) => {
    const uploadedFile = Array.isArray(file) ? file[0] : file;
    setImageUrl(uploadedFile.url);
    form.setFieldValue('image', uploadedFile.url);
    setUploadingImage(false);
    message.success('✅ Upload ảnh slider thành công!');
  };

  const handleUploadError = (error: Error) => {
    setUploadingImage(false);
    message.error(`❌ Upload thất bại: ${error.message}`);
  };

  const handleUploadStart = () => {
    setUploadingImage(true);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    form.setFieldValue('image', '');
    message.info('Đã xóa ảnh');
  };

  const validateImageUrl = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject('Vui lòng nhập URL hoặc upload hình ảnh!');
    }

    // Basic URL validation
    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
      return Promise.resolve();
    }

    return Promise.resolve();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl('');
    onCancel();
  };

  return (
    <Modal
      title={
        <Space>
          <CloudUploadOutlined />
          {mode === 'create' ? 'Tạo Slider Banner mới' : 'Chỉnh sửa Slider Banner'}
        </Space>
      }
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading || uploadingImage}
      okText={mode === 'create' ? 'Tạo mới' : 'Cập nhật'}
      cancelText="Hủy"
      width={800}
      destroyOnClose
      maskClosable={false}
    >
      <Alert
        message="Hướng dẫn upload ảnh slider"
        description={
          <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
            <li>Kích thước khuyến nghị: 1920x600px hoặc 1920x800px</li>
            <li>Định dạng: JPG, PNG, WEBP</li>
            <li>Dung lượng tối đa: 2MB (để tối ưu hiệu suất)</li>
            <li>Bạn có thể nhập URL hoặc upload từ máy tính</li>
          </ul>
        }
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || { isActive: true, order: 0 }}
      >
        <Form.Item
          label="Mã Slider"
          name="code"
          rules={[
            { required: true, message: 'Vui lòng nhập mã slider!' },
            {
              pattern: /^[A-Z0-9_]+$/,
              message: 'Mã chỉ chứa chữ HOA, số và dấu gạch dưới (_)',
            },
            {
              min: 3,
              max: 50,
              message: 'Mã phải có độ dài từ 3-50 ký tự',
            },
          ]}
          tooltip="Mã định danh duy nhất cho slider (VD: SLIDER_HOME_01)"
        >
          <Input
            placeholder="Ví dụ: SLIDER_WELCOME_2024"
            disabled={mode === 'edit'}
            style={{ textTransform: 'uppercase' }}
          />
        </Form.Item>

        <Form.Item
          label="Tên Slider"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên slider!' },
            {
              min: 3,
              max: 200,
              message: 'Tên phải có độ dài từ 3-200 ký tự',
            },
          ]}
          tooltip="Tên mô tả slider hiển thị trong quản lý"
        >
          <Input placeholder="Ví dụ: Banner chào mừng năm học mới 2024" />
        </Form.Item>

        <Form.Item
          label="Hình ảnh Slider"
          name="image"
          rules={[
            { required: true, message: 'Vui lòng upload hoặc nhập URL hình ảnh!' },
            { validator: validateImageUrl },
          ]}
        >
          <Card size="small" style={{ backgroundColor: '#fafafa' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Input URL */}
              <Input
                placeholder="Nhập URL hình ảnh từ nguồn khác (không bắt buộc)"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  form.setFieldValue('image', e.target.value);
                }}
                disabled={uploadingImage}
                addonBefore="URL"
              />

              {/* Upload File */}
              <div>
                <FileUpload
                  multiple={false}
                  folder={UploadFolder.SLIDERS}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  showUploadedList={false}
                  maxCount={1}
                  onUploadStart={handleUploadStart}
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                  disabled={uploadingImage}
                  imageVersionPreference={ImageVersionPreference.LARGE}
                  autoUpload={true}
                />
                {uploadingImage && (
                  <div style={{ marginTop: 8, color: '#1890ff' }}>
                    <span>⏳ Đang upload và xử lý ảnh...</span>
                  </div>
                )}
              </div>

              {/* Preview */}
              {imageUrl && (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>Xem trước:</span>
                    <Button
                      type="link"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                    >
                      Xóa ảnh
                    </Button>
                  </div>
                  <div
                    style={{
                      border: '2px dashed #d9d9d9',
                      borderRadius: 8,
                      padding: 8,
                      backgroundColor: '#fff',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="Preview"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        display: 'block',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+';
                        message.error('Không thể tải ảnh, vui lòng kiểm tra lại URL');
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                    💡 Hãy kiểm tra xem ảnh hiển thị đúng kích thước và chất lượng
                  </div>
                </div>
              )}
            </Space>
          </Card>
        </Form.Item>

        <Form.Item
          label="Thứ tự hiển thị"
          name="order"
          tooltip="Số càng nhỏ càng ưu tiên hiển thị trước (0 là cao nhất)"
          rules={[{ type: 'number', message: 'Vui lòng nhập số!' }]}
        >
          <InputNumber min={0} max={999} style={{ width: '100%' }} placeholder="0" precision={0} />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="isActive"
          valuePropName="checked"
          tooltip="Bật để hiển thị slider trên trang chủ"
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Ẩn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SliderFormModal;
