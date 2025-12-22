// Create Vote Registration Page - Tạo phiếu đăng ký biểu quyết
import { useState } from 'react';
import { Card, Steps, Button, Form, message, Space } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Target from './steps/Step2Target';
import Step3Options from './steps/Step3Options';
import Step4Configuration from './steps/Step4Configuration';
import ActivityService from '../../../../../../services/api/activity.service';
import type { VoteFormValues } from '../../../activity/vote/types';

const { Step } = Steps;

export default function CreateVoteRegistrationPage() {
  const [form] = Form.useForm<VoteFormValues>();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Thông tin cơ bản',
      icon: <FileTextOutlined />,
      content: <Step1BasicInfo form={form} />,
    },
    {
      title: 'Đối tượng tham gia',
      icon: <UsergroupAddOutlined />,
      content: <Step2Target form={form} />,
    },
    {
      title: 'Lựa chọn',
      icon: <UnorderedListOutlined />,
      content: <Step3Options form={form} />,
    },
    {
      title: 'Xác nhận',
      icon: <SettingOutlined />,
      content: <Step4Configuration form={form} />,
    },
  ];

  const next = async () => {
    try {
      const fieldsToValidate = getFieldsForStep(currentStep);
      await form.validateFields(fieldsToValidate);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0:
        return ['title'];
      case 1:
        return ['targetType'];
      case 2:
        return ['options'];
      case 3:
        return [];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      const code = 'VOTE-' + Date.now();
      const now = new Date().toISOString();
      const deadline =
        form.getFieldValue('deadline') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const values = form.getFieldsValue();

      await ActivityService.create({
        code: code.trim(),
        name: values.title.trim(),
        description: values.description?.trim(),
        activityType: 'thi-dua',
        startDate: now,
        endDate: deadline,
        status: 'planned',
      });

      message.success('Tạo phiếu đăng ký biểu quyết thành công!');
      navigate({ to: '/admin/activity-management/registration' });
    } catch (error) {
      message.error('Không thể tạo phiếu đăng ký. Vui lòng thử lại.');
      console.error('Error creating vote registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--background-color)', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '24px', fontWeight: 600 }}>
            Tạo phiếu đăng ký biểu quyết
          </h2>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            Điền thông tin để tạo phiếu đăng ký cho biểu quyết mới
          </p>
        </div>

        <Steps current={currentStep} style={{ marginBottom: '40px' }}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isAnonymous: true,
            allowMultiple: false,
            options: [
              { label: 'Đồng ý' },
              { label: 'Không đồng ý' },
            ],
            targetType: 'all',
          }}
        >
          <div style={{ minHeight: '400px', marginBottom: '32px' }}>
            {steps[currentStep].content}
          </div>
        </Form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={prev} size="large" style={{ borderRadius: '8px' }}>
                Quay lại
              </Button>
            )}
            <Button
              onClick={() => navigate({ to: '/admin/activity-management/registration' })}
              size="large"
              style={{ borderRadius: '8px' }}
            >
              Hủy
            </Button>
          </Space>
          <Space>
            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={next}
                size="large"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '40px',
                  padding: '0 24px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
                }}
              >
                Tiếp theo
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                size="large"
                icon={<CheckCircleOutlined />}
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '40px',
                  padding: '0 24px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
                }}
              >
                Hoàn thành
              </Button>
            )}
          </Space>
        </div>
      </Card>
    </div>
  );
}
