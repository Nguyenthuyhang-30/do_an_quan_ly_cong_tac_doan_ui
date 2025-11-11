import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { branchService } from '@services/api';
import type { CreateBranchRequest } from '../../../../../../types/youth-union-branch';

interface CreateBranchModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateBranchModal: React.FC<CreateBranchModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: CreateBranchRequest) => {
    try {
      setLoading(true);
      await branchService.create({
        ...values,
        status: 'active',
      });

      message.success('Tạo chi đoàn thành công');
      form.resetFields();
      onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi tạo chi đoàn';
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

        <Form.Item label="Bí thư" name="secretary">
          <Input placeholder="Tên Bí thư chi đoàn" />
        </Form.Item>

        <Form.Item label="Phó Bí thư" name="viceSecretary">
          <Input placeholder="Tên Phó Bí thư chi đoàn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBranchModal;
