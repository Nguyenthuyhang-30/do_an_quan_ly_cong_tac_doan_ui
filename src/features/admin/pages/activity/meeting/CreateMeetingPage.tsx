// src/features/admin/pages/activity/meeting/CreateMeetingPage.tsx
import React, { useState } from 'react';
import { Button, Card, Form, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import type { MeetingFormValues } from './types';
import MeetingBasicInfoSection from './MeetingBasicInfoSection';
import MeetingAgendaSection from './MeetingAgendaSection';
import MeetingTargetSection from './MeetingTargetSection';
import ActivityService from '../../../../../services/api/activity.service';

const CreateMeetingPage: React.FC = () => {
  const [form] = Form.useForm<MeetingFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: MeetingFormValues) => {
    try {
      setLoading(true);
      const code = 'MEETING-' + Date.now();
      const startDate = values.dateTime || new Date().toISOString();
      const endDate = new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2 hours

      await ActivityService.create({
        code: code.trim(),
        name: values.title.trim(),
        description: values.note?.trim(),
        activityType: 'hoc-tap',
        startDate: startDate,
        endDate: endDate,
        status: 'planned',
        location: values.location?.trim(),
      });

      message.success('Tạo sinh hoạt thành công!');
      navigate({ to: '/admin/activity-management' });
    } catch (error) {
      message.error('Không thể tạo sinh hoạt. Vui lòng thử lại.');
      console.error('Error creating meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card title="Tạo buổi sinh hoạt Chi đoàn / Liên chi">
        <Form<MeetingFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            meetingType: 'offline',
            agenda: [
              { id: 1, title: 'Ổn định tổ chức' },
              { id: 2, title: 'Triển khai nội dung chính' },
            ],
            targetType: 'branch',
            isRequiredAttendance: true,
            allowQrCheckin: true,
          }}
        >
          <MeetingBasicInfoSection />
          <MeetingAgendaSection />
          <MeetingTargetSection />

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
              Lưu & tạo buổi sinh hoạt
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateMeetingPage;
