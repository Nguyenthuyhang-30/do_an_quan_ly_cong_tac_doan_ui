// Create Meeting Registration Page - Tạo phiếu đăng ký sinh hoạt
import { useState } from 'react';
import { Card, Steps, Button, Form, message, Space } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2LocationOrganizers from './steps/Step2LocationOrganizers';
import Step3Target from './steps/Step2Target';
import Step4Agenda from './steps/Step3Agenda';
import Step5Attachments from './steps/Step4Attachments';
import ActivityService from '../../../../../../services/api/activity.service';
import type { MeetingFormValues } from '../../../activity/meeting/types';

const { Step } = Steps;

export default function CreateMeetingRegistrationPage() {
  const [form] = Form.useForm<MeetingFormValues>();
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
      title: 'Đối tượng tham gia',
      icon: <UsergroupAddOutlined />,
      content: <Step3Target form={form} />,
    },
    {
      title: 'Chương trình sinh hoạt',
      icon: <CalendarOutlined />,
      content: <Step4Agenda form={form} />,
    },
    {
      title: 'Đính kèm file',
      icon: <PaperClipOutlined />,
      content: <Step5Attachments form={form} />,
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
        return ['title', 'branch', 'dateTime'];
      case 1:
        return ['location'];
      case 2:
        return ['targetType'];
      case 3:
        return [];
      case 4:
        return [];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate tất cả các field
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

      if (!values.dateTime) {
        message.error('Vui lòng chọn thời gian');
        setLoading(false);
        return;
      }

      const code = 'MEETING-' + Date.now();
      const startDate = values.dateTime ? new Date(values.dateTime).toISOString() : new Date().toISOString();
      const endDate = new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000).toISOString();

      const activityData = {
        code: code.trim(),
        name: values.title.trim(),
        description: values.note?.trim() || '',
        activityType: 'hoc-tap' as const,
        startDate: startDate,
        endDate: endDate,
        status: 'planned' as const,
        location: values.location?.trim() || '',
      };

      console.log('Sending activity data:', activityData);

      const result = await ActivityService.create(activityData);
      console.log('Activity created successfully:', result);

      message.success('Tạo phiếu đăng ký sinh hoạt thành công!');
      
      // Chuyển về trang Quản lý đăng ký hoạt động
      setTimeout(() => {
        navigate({ to: '/admin/activity-management/registration' });
      }, 1000);
    } catch (error: any) {
      console.error('Error creating meeting registration:', error);
      
      // Hiển thị lỗi chi tiết hơn
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || 'Không thể tạo phiếu đăng ký. Vui lòng kiểm tra lại thông tin và thử lại.';
      
      message.error(errorMessage);
      
      // Nếu là lỗi validation, highlight các field bị lỗi
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
            Tạo phiếu đăng ký sinh hoạt
          </h2>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            Điền thông tin để tạo phiếu đăng ký cho buổi sinh hoạt mới
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
