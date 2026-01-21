// Create Event Registration Page - Tạo phiếu đăng ký sự kiện
import { useState } from 'react';
import { Card, Steps, Button, Form, message, Space } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2LocationOrganizers from './steps/Step2LocationOrganizers';
import Step3Attachments from './steps/Step3Attachments';
import Step4Configuration from './steps/Step4Configuration';
import ActivityService from '../../../../../../services/api/activity.service';
import type { EventFormValues } from '../../../activity/event/types';

const { Step } = Steps;

export default function CreateEventRegistrationPage() {
  const [form] = Form.useForm<EventFormValues>();
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
      title: 'Địa điểm & Tổ chức',
      icon: <EnvironmentOutlined />,
      content: <Step2LocationOrganizers form={form} />,
    },
    {
      title: 'Đính kèm file',
      icon: <FileTextOutlined />,
      content: <Step3Attachments form={form} />,
    },
    {
      title: 'Cấu hình',
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
        return ['name', 'type', 'timeRange'];
      case 1:
        return ['location', 'targetType'];
      case 2:
        return [];
      case 3:
        return [];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    try {
      // Validate tất cả các field
      console.log('Validating fields...');
      await form.validateFields();
      console.log('Validation passed');
      
      setLoading(true);

      const values = form.getFieldsValue();
      console.log('Form values:', values);

      // Kiểm tra các field bắt buộc
      if (!values.name || !values.name.trim()) {
        message.error('Vui lòng nhập tên hoạt động');
        setLoading(false);
        return;
      }

      if (!values.timeRange || !values.timeRange[0] || !values.timeRange[1]) {
        message.error('Vui lòng chọn thời gian bắt đầu và kết thúc');
        setLoading(false);
        return;
      }

      const code = 'EVENT-' + Date.now();

      // Xử lý timeRange - có thể là moment object hoặc string
      let startDate: string;
      let endDate: string;
      
      if (values.timeRange && values.timeRange[0] && values.timeRange[1]) {
        // Nếu là moment object, convert sang ISO string
        if (typeof values.timeRange[0].toISOString === 'function') {
          startDate = values.timeRange[0].toISOString();
        } else {
          startDate = values.timeRange[0];
        }
        
        if (typeof values.timeRange[1].toISOString === 'function') {
          endDate = values.timeRange[1].toISOString();
        } else {
          endDate = values.timeRange[1];
        }
      } else {
        message.error('Vui lòng chọn thời gian bắt đầu và kết thúc');
        setLoading(false);
        return;
      }

      const activityData = {
        code: code.trim(),
        name: values.name.trim(),
        description: values.description?.trim() || '',
        activityType: (values.type || 'van-hoa') as
          | 'tinh-nguyen'
          | 'hoc-tap'
          | 'the-thao'
          | 'van-hoa'
          | 'thi-dua'
          | 'khac',
        startDate: startDate,
        endDate: endDate,
        location: values.location?.trim() || '',
        maxParticipants: values.expectedParticipants ? Number(values.expectedParticipants) : undefined,
        status: 'planned' as const,
        organizer: (values as any).organizer || undefined,
      };

      console.log('Sending activity data:', activityData);

      const result = await ActivityService.create(activityData);
      console.log('Activity created successfully:', result);

      message.success('Tạo phiếu đăng ký sự kiện thành công!');
      
      // Chuyển về trang Quản lý đăng ký hoạt động
      setTimeout(() => {
        navigate({ to: '/admin/activity-management/registration' });
      }, 1000);
    } catch (error: any) {
      console.error('Error creating event registration:', error);
      
      // Hiển thị lỗi chi tiết hơn
      let errorMessage = 'Không thể tạo phiếu đăng ký. Vui lòng kiểm tra lại thông tin và thử lại.';
      
      if (error?.errorFields && Array.isArray(error.errorFields)) {
        // Lỗi validation từ Ant Design
        const firstError = error.errorFields[0];
        if (firstError?.errors && firstError.errors.length > 0) {
          errorMessage = firstError.errors[0];
        }
        form.setFields(error.errorFields);
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--background-color)', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '24px', fontWeight: 600 }}>
            Tạo phiếu đăng ký sự kiện
          </h2>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            Điền thông tin để tạo phiếu đăng ký cho sự kiện mới
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
          initialValues={{ isRequiredCheckin: true }}
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
