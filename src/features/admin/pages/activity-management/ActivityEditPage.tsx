// Activity Edit Page - Chỉnh sửa hoạt động
import { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  message,
  DatePicker,
  InputNumber,
  Select,
  Spin,
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from '@tanstack/react-router';
import ActivityService from '../../../../services/api/activity.service';
import type { UpdateActivityRequest } from '../../../../types/activity';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function ActivityEditPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/activity-management/$id/edit' });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (id) {
      fetchActivityDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      setFetching(true);
      const activity = await ActivityService.getById(Number(id));

      // Pre-fill form với data hiện tại
      form.setFieldsValue({
        code: activity.code,
        name: activity.name,
        description: activity.description,
        activityType: activity.activityType,
        timeRange:
          activity.startDate && activity.endDate
            ? [dayjs(activity.startDate), dayjs(activity.endDate)]
            : undefined,
        location: activity.location,
        maxParticipants: activity.maxParticipants,
        status: activity.status,
      });
    } catch (error) {
      message.error('Không thể tải thông tin hoạt động');
      console.error('Error fetching activity:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (
    values: UpdateActivityRequest & {
      timeRange?: [dayjs.Dayjs, dayjs.Dayjs];
    },
  ) => {
    try {
      setLoading(true);

      const requestData: UpdateActivityRequest = {
        code: values.code?.trim(),
        name: values.name?.trim(),
        description: values.description?.trim(),
        activityType: values.activityType,
        startDate: values.timeRange?.[0]?.toISOString(),
        endDate: values.timeRange?.[1]?.toISOString(),
        location: values.location?.trim(),
        maxParticipants: values.maxParticipants,
        status: values.status,
      };

      await ActivityService.update(Number(id), requestData);

      message.success('Cập nhật hoạt động thành công');
      navigate({ to: `/admin/activity-management/${id}` });
    } catch (error) {
      message.error('Không thể cập nhật hoạt động');
      console.error('Error updating activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate({ to: `/admin/activity-management/${id}` })}
          >
            Quay lại
          </Button>
        </Space>
      </div>

      {/* Form */}
      <Card title="Chỉnh sửa hoạt động">
        <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
          <Form.Item
            label="Mã hoạt động"
            name="code"
            rules={[
              { required: true, message: 'Vui lòng nhập mã hoạt động!' },
              { min: 3, message: 'Mã hoạt động phải có ít nhất 3 ký tự!' },
            ]}
          >
            <Input placeholder="VD: ACT-001" />
          </Form.Item>

          <Form.Item
            label="Tên hoạt động"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên hoạt động!' },
              { min: 5, message: 'Tên hoạt động phải có ít nhất 5 ký tự!' },
            ]}
          >
            <Input placeholder="VD: Hội thảo kỹ năng mềm 2024" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} placeholder="Mô tả chi tiết về hoạt động" />
          </Form.Item>

          <Form.Item
            label="Loại hoạt động"
            name="activityType"
            rules={[{ required: true, message: 'Vui lòng chọn loại hoạt động!' }]}
          >
            <Select placeholder="Chọn loại hoạt động">
              <Select.Option value="tinh-nguyen">Tình nguyện</Select.Option>
              <Select.Option value="hoc-tap">Học tập</Select.Option>
              <Select.Option value="the-thao">Thể thao</Select.Option>
              <Select.Option value="van-hoa">Văn hóa</Select.Option>
              <Select.Option value="thi-dua">Thi đua</Select.Option>
              <Select.Option value="khac">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Thời gian"
            name="timeRange"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
          >
            <RangePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%' }}
              placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
            />
          </Form.Item>

          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
          >
            <Input placeholder="VD: Hội trường A - Tầng 3" />
          </Form.Item>

          <Form.Item label="Số lượng tham gia tối đa" name="maxParticipants">
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="Để trống nếu không giới hạn"
            />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="planned">Dự kiến</Select.Option>
              <Select.Option value="ongoing">Đang diễn ra</Select.Option>
              <Select.Option value="completed">Đã hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                Lưu thay đổi
              </Button>
              <Button onClick={() => navigate({ to: `/admin/activity-management/${id}` })}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
