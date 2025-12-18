// Branch Create/Edit Form Page
import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useNavigate, useParams } from '@tanstack/react-router';
import BranchService from '../../../../services/api/branch.service';
import type {
  YouthUnionBranch,
  CreateBranchRequest,
  UpdateBranchRequest,
} from '../../../../app-types/youth-union-branch';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface BranchFormPageProps {
  mode: 'create' | 'edit';
}

export default function BranchFormPage({ mode }: BranchFormPageProps) {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchBranch(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  const fetchBranch = async (branchId: number) => {
    try {
      setLoading(true);
      const branch: YouthUnionBranch = await BranchService.getById(branchId);
      form.setFieldsValue({
        ...branch,
        establishedDate: branch.establishedDate ? dayjs(branch.establishedDate) : null,
      });
    } catch (error) {
      message.error('Không thể tải thông tin chi đoàn');
      console.error('Error fetching branch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreateBranchRequest | UpdateBranchRequest) => {
    try {
      setSubmitting(true);
      const data = {
        ...values,
        establishedDate: values.establishedDate
          ? dayjs(values.establishedDate).format('YYYY-MM-DD')
          : undefined,
      };

      if (mode === 'create') {
        await BranchService.create(data as CreateBranchRequest);
        message.success('Tạo chi đoàn thành công');
      } else {
        await BranchService.update(Number(id), data as UpdateBranchRequest);
        message.success('Cập nhật chi đoàn thành công');
      }

      navigate({ to: '/admin/branch' });
    } catch (error) {
      message.error(mode === 'create' ? 'Không thể tạo chi đoàn' : 'Không thể cập nhật chi đoàn');
      console.error('Error submitting branch:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={mode === 'create' ? 'Thêm chi đoàn mới' : 'Chỉnh sửa chi đoàn'}
        loading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="code"
            label="Mã chi đoàn"
            rules={[{ required: true, message: 'Vui lòng nhập mã chi đoàn' }]}
          >
            <Input placeholder="Ví dụ: CD001" disabled={mode === 'edit'} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên chi đoàn"
            rules={[{ required: true, message: 'Vui lòng nhập tên chi đoàn' }]}
          >
            <Input placeholder="Nhập tên chi đoàn" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={4} placeholder="Nhập mô tả chi đoàn" />
          </Form.Item>

          <Form.Item name="establishedDate" label="Ngày thành lập">
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item name="secretary" label="Bí thư">
            <Input placeholder="Nhập tên bí thư" />
          </Form.Item>

          <Form.Item name="viceSecretary" label="Phó bí thư">
            <Input placeholder="Nhập tên phó bí thư" />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select>
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {mode === 'create' ? 'Tạo chi đoàn' : 'Cập nhật'}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate({ to: '/admin/branch' })}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
