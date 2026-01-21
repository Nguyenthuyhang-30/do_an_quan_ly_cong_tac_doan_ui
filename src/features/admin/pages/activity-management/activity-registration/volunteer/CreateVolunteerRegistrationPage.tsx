// Create Volunteer Registration Page - Tạo phiếu đăng ký tình nguyện
import { useState } from 'react';
import { Card, Steps, Button, Form, message, Space } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Target from './steps/Step2Target';
import Step3Slots from './steps/Step3Slots';
import Step4Attachments from './steps/Step4Attachments';
import ActivityService from '../../../../../../services/api/activity.service';
import type { VolunteerFormValues } from '../../../activity/volunteer/types';

const { Step } = Steps;

export default function CreateVolunteerRegistrationPage() {
  const [form] = Form.useForm<VolunteerFormValues>();
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
      title: 'Vị trí tình nguyện',
      icon: <TeamOutlined />,
      content: <Step3Slots form={form} />,
    },
    {
      title: 'Đính kèm file',
      icon: <PaperClipOutlined />,
      content: <Step4Attachments form={form} />,
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
        return ['title', 'location', 'timeRange'];
      case 1:
        return ['targetType'];
      case 2:
        return ['slots'];
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

      const values = form.getFieldsValue();
      console.log('Form values:', values);

      // Kiểm tra các field bắt buộc
      if (!values.title || !values.title.trim()) {
        message.error('Vui lòng nhập tên hoạt động');
        setLoading(false);
        return;
      }

      const code = 'VOLUNTEER-' + Date.now();

      const activityData = {
        code: code.trim(),
        name: values.title.trim(),
        description: values.description?.trim() || '',
        activityType: 'tinh-nguyen' as const,
        startDate: values.timeRange?.[0] || new Date().toISOString(),
        endDate:
          values.timeRange?.[1] || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'planned' as const,
        location: values.location?.trim() || '',
      };

      console.log('Sending activity data:', activityData);

      const result = await ActivityService.create(activityData);
      console.log('Activity created successfully:', result);

      message.success('Tạo phiếu đăng ký tình nguyện thành công!');
      
      // Chuyển về trang Quản lý đăng ký hoạt động
      setTimeout(() => {
        navigate({ to: '/admin/activity-management/registration' });
      }, 1000);
    } catch (error: any) {
      console.error('Error creating volunteer registration:', error);
      
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || 'Không thể tạo phiếu đăng ký. Vui lòng kiểm tra lại thông tin và thử lại.';
      
      message.error(errorMessage);
      
      if (error?.errorFields) {
        form.setFields(error.errorFields);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--background-color)', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '24px', fontWeight: 600 }}>
            Tạo phiếu đăng ký tình nguyện
          </h2>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            Điền thông tin để tạo phiếu đăng ký cho hoạt động tình nguyện mới
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
            requireHealthCheck: false,
            requireTraining: true,
            targetType: 'branch',
            slots: [
              { id: 1, title: 'Hậu cần' },
              { id: 2, title: 'Truyền thông' },
            ],
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
