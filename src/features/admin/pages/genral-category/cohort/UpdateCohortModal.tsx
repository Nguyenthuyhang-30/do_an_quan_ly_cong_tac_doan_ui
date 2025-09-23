import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import type { Cohort, UpdateCohortRequest } from '../../../../../types/general-category/cohort';
import cohortService from '../../../../../services/api/cohort.service';

interface UpdateCohortModalProps {
  visible: boolean;
  cohort: Cohort | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const UpdateCohortModal: React.FC<UpdateCohortModalProps> = ({
  visible,
  cohort,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (cohort && visible) {
      form.setFieldsValue({
        code: cohort.code,
        name: cohort.name,
        start_year: cohort.start_year,
        end_year: cohort.end_year,
      });
    }
  }, [cohort, visible, form]);

  const handleSubmit = async (values: UpdateCohortRequest) => {
    if (!cohort) return;

    try {
      setLoading(true);
      const response = await cohortService.update(cohort.id, {
        ...values,
        modified_by: 1,
      });

      if (response.success) {
        message.success('Cập nhật khóa học thành công');
        form.resetFields();
        onSuccess();
      } else {
        message.error(response.message || 'Lỗi khi cập nhật khóa học');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi cập nhật khóa học';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Cập nhật khóa học"
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={600}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Mã khóa"
          name="code"
          rules={[
            { required: true, message: 'Vui lòng nhập mã khóa!' },
            { min: 2, message: 'Mã khóa phải có ít nhất 2 ký tự!' },
            { max: 20, message: 'Mã khóa không được vượt quá 20 ký tự!' },
          ]}
        >
          <Input placeholder="Ví dụ: K47" />
        </Form.Item>

        <Form.Item
          label="Tên khóa học"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên khóa học!' },
            { min: 5, message: 'Tên khóa học phải có ít nhất 5 ký tự!' },
            { max: 100, message: 'Tên khóa học không được vượt quá 100 ký tự!' },
          ]}
        >
          <Input placeholder="Ví dụ: Khóa 47" />
        </Form.Item>

        <Form.Item
          label="Năm bắt đầu"
          name="start_year"
          rules={[
            { required: true, message: 'Vui lòng nhập năm bắt đầu!' },
            { type: 'number', min: 2000, message: 'Năm bắt đầu phải từ 2000!' },
            { type: 'number', max: 2050, message: 'Năm bắt đầu không được vượt quá 2050!' },
          ]}
        >
          <InputNumber placeholder="2024" style={{ width: '100%' }} min={2000} max={2050} />
        </Form.Item>

        <Form.Item
          label="Năm kết thúc"
          name="end_year"
          rules={[
            { required: true, message: 'Vui lòng nhập năm kết thúc!' },
            { type: 'number', min: 2000, message: 'Năm kết thúc phải từ 2000!' },
            { type: 'number', max: 2060, message: 'Năm kết thúc không được vượt quá 2060!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('start_year') < value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Năm kết thúc phải lớn hơn năm bắt đầu!'));
              },
            }),
          ]}
        >
          <InputNumber placeholder="2028" style={{ width: '100%' }} min={2000} max={2060} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCohortModal;
