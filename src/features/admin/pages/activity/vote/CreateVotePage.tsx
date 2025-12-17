// src/features/admin/pages/activity/vote/CreateVotePage.tsx
import React, { useState } from 'react';
import { Button, Card, Form, message } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import type { VoteFormValues } from './types';
import VoteBasicInfoSection from './VoteBasicInfoSection';
import VoteOptionsSection from './VoteOptionsSection';
import VoteTargetSection from './VoteTargetSection';
import ActivityService from '../../../../../services/api/activity.service';

const CreateVotePage: React.FC = () => {
  const [form] = Form.useForm<VoteFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: VoteFormValues) => {
    try {
      setLoading(true);
      const code = 'VOTE-' + Date.now();
      const now = new Date().toISOString();
      const deadline =
        values.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      await ActivityService.create({
        code: code.trim(),
        name: values.title.trim(),
        description: values.description?.trim(),
        activityType: 'thi-dua',
        startDate: now,
        endDate: deadline,
        status: 'planned',
      });

      message.success('Tạo biểu quyết thành công!');
      navigate({ to: '/admin/activity-management' });
    } catch (error) {
      message.error('Không thể tạo biểu quyết. Vui lòng thử lại.');
      console.error('Error creating vote:', error);
    } finally {
      setLoading(false);
    }
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
              Lưu & tạo biểu quyết
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateVotePage;
