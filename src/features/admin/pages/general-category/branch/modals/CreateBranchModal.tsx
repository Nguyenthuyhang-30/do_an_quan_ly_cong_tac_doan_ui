import { Form, Input, message, Modal, DatePicker } from 'antd';
import React from 'react';
import { branchService } from '@services/api';
import type { CreateBranchRequest } from '../../../../../../app-types/youth-union-branch';
import { MemberSelector } from '../../../../../../components/common/MemberSelector';

interface CreateBranchModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateBranchModal: React.FC<CreateBranchModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  // Reset form khi đóng modal
  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleSubmit = async (
    values: CreateBranchRequest & {
      president_id?: number;
      secretary_id?: number;
      establishedDate?: { format: (f: string) => string };
    },
  ) => {
    try {
      setLoading(true);

      // Format data theo API yêu cầu
      const requestData: CreateBranchRequest & { president_id?: number; secretary_id?: number } = {
        code: values.code.trim(),
        name: values.name.trim(),
        description: values.description?.trim(),
        establishedDate: values.establishedDate?.format('YYYY-MM-DD'),
        status: 'active',
      };

      // Thêm president_id và secretary_id nếu có
      if (values.president_id) {
        requestData.president_id = values.president_id;
      }
      if (values.secretary_id) {
        requestData.secretary_id = values.secretary_id;
      }

      await branchService.create(requestData);

      message.success('Tạo chi đoàn thành công');
      form.resetFields();
      onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi tạo chi đoàn';
      message.error(errorMessage);
      console.error('Error creating branch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      form.resetFields();
      onCancel();
    }
  };

  return (
    <Modal
      title="Thêm mới chi đoàn"
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={600}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Mã chi đoàn"
          name="code"
          rules={[
            { required: true, message: 'Vui lòng nhập mã chi đoàn!' },
            { min: 2, message: 'Mã chi đoàn phải có ít nhất 2 ký tự!' },
            { max: 20, message: 'Mã chi đoàn không được vượt quá 20 ký tự!' },
          ]}
        >
          <Input placeholder="Ví dụ: CD001" />
        </Form.Item>

        <Form.Item
          label="Tên chi đoàn"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên chi đoàn!' },
            { min: 5, message: 'Tên chi đoàn phải có ít nhất 5 ký tự!' },
            { max: 100, message: 'Tên chi đoàn không được vượt quá 100 ký tự!' },
          ]}
        >
          <Input placeholder="Ví dụ: Chi đoàn Công nghệ Thông tin" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} placeholder="Mô tả về chi đoàn" />
        </Form.Item>

        <Form.Item label="Ngày thành lập" name="establishedDate">
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Chọn ngày thành lập"
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <Form.Item
          label="Chủ tịch chi đoàn"
          name="president_id"
          tooltip="Chọn đoàn viên làm Chủ tịch chi đoàn"
        >
          <MemberSelector placeholder="Chọn Chủ tịch chi đoàn" allowClear />
        </Form.Item>

        <Form.Item
          label="Bí thư chi đoàn"
          name="secretary_id"
          tooltip="Chọn đoàn viên làm Bí thư chi đoàn"
        >
          <MemberSelector placeholder="Chọn Bí thư chi đoàn" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBranchModal;
