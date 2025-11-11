// src/features/admin/pages/activity/event/CreateEventPage.tsx
import { Button, Card, Form } from 'antd';
import type { EventFormValues } from './types';
import EventBasicInfoSection from './EventBasicInfoSection';
import EventTimeLocationSection from './EventTimeLocationSection';
import EventAdvancedSection from './EventAdvancedSection';
const CreateEventPage: React.FC = () => {
  const [form] = Form.useForm<EventFormValues>();

  const handleSubmit = (values: EventFormValues) => {
    console.log('Event form submit:', values);
    // TODO: call API tạo event
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
            <Button type="primary" htmlType="submit">
              Lưu & tạo hoạt động
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEventPage;
