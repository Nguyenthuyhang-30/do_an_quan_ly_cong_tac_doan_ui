// src/features/admin/pages/activity/volunteer/CreateVolunteerPage.tsx
import React, { useState } from 'react';
import { Button, Card, Form, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import type { VolunteerFormValues } from './types';
import VolunteerBasicInfoSection from './VolunteerBasicInfoSection';
import VolunteerSlotsSection from './VolunteerSlotsSection';
import VolunteerTargetSection from './VolunteerTargetSection';
import ActivityService from '../../../../../services/api/activity.service';

const CreateVolunteerPage: React.FC = () => {
  const [form] = Form.useForm<VolunteerFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: VolunteerFormValues) => {
    try {
      setLoading(true);
      const code = 'VOLUNTEER-' + Date.now();

      await ActivityService.create({
        code: code.trim(),
        name: values.title.trim(),
        description: values.description?.trim(),
        activityType: 'tinh-nguyen',
        startDate: values.timeRange?.[0] || new Date().toISOString(),
        endDate:
          values.timeRange?.[1] || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'planned',
        location: values.location?.trim(),
      });

      message.success('Tạo hoạt động tình nguyện thành công!');
      navigate({ to: '/admin/activity-management' });
    } catch (error) {
      message.error('Không thể tạo hoạt động tình nguyện. Vui lòng thử lại.');
      console.error('Error creating volunteer activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card title="Tạo hoạt động tình nguyện / chiến dịch mới">
        <Form<VolunteerFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            requireHealthCheck: false,
            requireTraining: true,
            targetType: 'branch',
            slots: [
              { id: 1, title: 'Hậu cần' },
              { id: 2, title: 'Truyền thông' },
            ],
          }}
        >
          <VolunteerBasicInfoSection />
          <VolunteerSlotsSection />
          <VolunteerTargetSection />

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

export default CreateVolunteerPage;
