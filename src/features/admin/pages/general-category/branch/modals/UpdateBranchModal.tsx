import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { UpdateBranchRequest } from '../../../../../../types/youth-union-branch';
import { branchService } from '@services/api';
import { Branch } from '../types';

interface UpdateBranchModalProps {
  visible: boolean;
  branch: Branch | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const UpdateBranchModal: React.FC<UpdateBranchModalProps> = ({
  visible,
  branch,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (branch && visible) {
      form.setFieldsValue({
        code: branch.code,
        name: branch.name,
        secretary: branch.secretary,
      });
    }
  }, [branch, visible, form]);

  const handleSubmit = async (values: UpdateBranchRequest) => {
    if (!branch) return;

    try {
      setLoading(true);
      await branchService.update(branch.id, {
        ...values,
        status: branch.status === 'active' ? 'active' : 'inactive',
      });

      message.success('Cập nhật chi đoàn thành công');
      form.resetFields();
      onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi cập nhật chi đoàn';
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
      title="Cập nhật chi đoàn"
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

export default UpdateBranchModal;
