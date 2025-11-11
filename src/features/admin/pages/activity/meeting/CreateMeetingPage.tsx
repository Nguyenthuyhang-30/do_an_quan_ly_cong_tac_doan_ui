// src/features/admin/pages/activity/create-activity/CreateMeetingPage.tsx
import React from 'react';
import { Button, Card, Form, message } from 'antd';
import type { MeetingFormValues } from './types';
import MeetingBasicInfoSection from './MeetingBasicInfoSection';
import MeetingAgendaSection from './MeetingAgendaSection';
import MeetingTargetSection from './MeetingTargetSection';

const CreateMeetingPage: React.FC = () => {
  const [form] = Form.useForm<MeetingFormValues>();

  const handleSubmit = (values: MeetingFormValues) => {
    console.log('Meeting form submit:', values);
    // TODO: call API tạo sinh hoạt
    message.success('Đã lưu buổi sinh hoạt (demo)');
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
            <Button type="primary" htmlType="submit">
              Lưu & tạo sinh hoạt
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateMeetingPage;
