// src/features/admin/pages/activity/event/CreateEventPage.tsx
import { Button, Card, Form, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { EventFormValues } from './types';
import EventBasicInfoSection from './EventBasicInfoSection';
import EventTimeLocationSection from './EventTimeLocationSection';
import EventAdvancedSection from './EventAdvancedSection';
import ActivityService from '../../../../../services/api/activity.service';

const CreateEventPage: React.FC = () => {
  const [form] = Form.useForm<EventFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: EventFormValues) => {
    try {
      setLoading(true);
      // Generate code from name
      const code = 'ACT-' + Date.now();

      await ActivityService.create({
        code: code.trim(),
        name: values.name.trim(),
        description: values.description?.trim(),
        activityType: (values.type || 'khac') as
          | 'tinh-nguyen'
          | 'hoc-tap'
          | 'the-thao'
          | 'van-hoa'
          | 'thi-dua'
          | 'khac',
        startDate: values.timeRange?.[0],
        endDate: values.timeRange?.[1],
        location: values.location?.trim(),
        maxParticipants: values.expectedParticipants,
        status: 'planned',
      });
      message.success('Tạo sự kiện thành công!');
      navigate({ to: '/admin/activity-management' });
    } catch (error) {
      message.error('Không thể tạo hoạt động. Vui lòng thử lại.');
      console.error('Error creating activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card title="Tạo sự kiện / hoạt động mới">
        <Form<EventFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isRequiredCheckin: true }}
        >
          {/* Chia 3 section riêng */}
          <EventBasicInfoSection />
          <EventTimeLocationSection />
          <EventAdvancedSection />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                background:
                  'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                border: 'none',
                borderRadius: '10px',
                height: '40px',
                padding: '0 20px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
              }}
            >
              Lưu & tạo hoạt động
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEventPage;
