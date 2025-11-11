import React, { useEffect } from 'react';
import { Modal, Form, Input, message, DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { UpdateBranchRequest } from '../../../../../../types/youth-union-branch';
import { branchService } from '@services/api';
import { Branch } from '../types';
import { MemberSelector } from '../../../../../../components/common/MemberSelector';

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
        description: branch.description,
        establishedDate: branch.establishedDate ? dayjs(branch.establishedDate) : undefined,
        // Note: president_id và secretary_id sẽ cần fetch từ API nếu backend trả về
      });
    } else if (!visible) {
      // Reset form khi đóng modal
      form.resetFields();
    }
  }, [branch, visible, form]);

  const handleSubmit = async (
    values: UpdateBranchRequest & {
      president_id?: number;
      secretary_id?: number;
      establishedDate?: { format: (f: string) => string };
    },
  ) => {
    if (!branch) return;

    try {
      setLoading(true);

      const requestData: UpdateBranchRequest & { president_id?: number; secretary_id?: number } = {
        code: values.code?.trim() || branch.code,
        name: values.name?.trim() || branch.name,
        description: values.description?.trim(),
        establishedDate: values.establishedDate?.format('YYYY-MM-DD'),
        status: branch.status === 'active' ? 'active' : 'inactive',
      };

      // Thêm president_id và secretary_id nếu có
      if (values.president_id) {
        requestData.president_id = values.president_id;
      }
      if (values.secretary_id) {
        requestData.secretary_id = values.secretary_id;
      }

      await branchService.update(branch.id, requestData);

      message.success('Cập nhật chi đoàn thành công');
      form.resetFields();
      onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi cập nhật chi đoàn';
      message.error(errorMessage);
      console.error('Error updating branch:', error);
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

export default UpdateBranchModal;
