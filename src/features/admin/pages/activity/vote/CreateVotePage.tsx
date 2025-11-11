// src/features/admin/pages/activity/create-activity/CreateVotePage.tsx
import React from 'react';
import { Button, Card, Form, message } from 'antd';
import type { VoteFormValues } from './types';
import VoteBasicInfoSection from './VoteBasicInfoSection';
import VoteOptionsSection from './VoteOptionsSection';
import VoteTargetSection from './VoteTargetSection';

const CreateVotePage: React.FC = () => {
  const [form] = Form.useForm<VoteFormValues>();

  const handleSubmit = (values: VoteFormValues) => {
    console.log('Vote form submit:', values);
    // TODO: gọi API tạo vote
    message.success('Đã lưu biểu quyết (demo)');
  };

  return (
    <div className="p-4">
      <Card title="Tạo biểu quyết / bình chọn mới">
        <Form<VoteFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            isAnonymous: true,
            allowMultiple: false,
            options: [
              { id: 1, label: 'Đồng ý' },
              { id: 2, label: 'Không đồng ý' },
            ],
            targetType: 'all',
          }}
        >
          <VoteBasicInfoSection />
          <VoteOptionsSection />
          <VoteTargetSection />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu & tạo biểu quyết
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateVotePage;
