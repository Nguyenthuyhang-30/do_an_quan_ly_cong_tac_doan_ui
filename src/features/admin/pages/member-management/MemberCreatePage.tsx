// Member Create Form Page - Thêm đoàn viên mới
import { useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, message, Space, Row, Col } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import MemberService from '../../../../services/api/member.service';
import { BranchSelector } from '../../../../components/common/BranchSelector';
import { CohortSelector } from '../../../../components/common/CohortSelector';
import type { CreateMemberRequest } from '../../../../app-types/youth-union-member';

const { TextArea } = Input;

export default function MemberCreatePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateMemberRequest>();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);

      const payload: CreateMemberRequest = {
        code: values.code.trim(),
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
          : undefined,
        gender: values.gender,
        address: values.address,
        identityCard: values.identityCard,
        placeOfBirth: values.placeOfBirth,
        ethnicity: values.ethnicity,
        religion: values.religion,
        joinDate: values.joinDate ? dayjs(values.joinDate).format('YYYY-MM-DD') : undefined,
        branchId: values.branchId,
        cohortId: values.cohortId,
        studentId: values.studentId,
        class: values.class,
        faculty: values.faculty,
        major: values.major,
      };

      await MemberService.create(payload);
      message.success('Thêm đoàn viên thành công');
      navigate({ to: '/admin/member-management' });
    } catch (error) {
      message.error('Không thể thêm đoàn viên. Vui lòng kiểm tra lại thông tin.');
      console.error('Error creating member:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Thêm đoàn viên mới"
        extra={
          <Button onClick={() => navigate({ to: '/admin/member-management' })}>Quay lại</Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ gender: 'male' }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Mã ĐV"
                name="code"
                rules={[{ required: true, message: 'Vui lòng nhập mã Đoàn viên' }]}
              >
                <Input placeholder="VD: DV001" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="MSSV"
                name="studentId"
              >
                <Input placeholder="Nhập MSSV" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ngày sinh" name="dateOfBirth">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Giới tính" name="gender">
                <Select
                  options={[
                    { label: 'Nam', value: 'male' },
                    { label: 'Nữ', value: 'female' },
                    { label: 'Khác', value: 'other' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Chi đoàn"
                name="branchId"
                rules={[{ required: true, message: 'Vui lòng chọn chi đoàn' }]}
              >
                <BranchSelector onChange={(value) => form.setFieldsValue({ branchId: value })} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Khóa"
                name="cohortId"
                rules={[{ required: true, message: 'Vui lòng chọn khóa' }]}
              >
                <CohortSelector onChange={(value) => form.setFieldsValue({ cohortId: value })} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Lớp" name="class">
                <Input placeholder="Nhập lớp" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Khoa" name="faculty">
                <Input placeholder="Nhập khoa" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ngành" name="major">
                <Input placeholder="Nhập ngành" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Địa chỉ" name="address">
                <TextArea rows={2} placeholder="Địa chỉ liên lạc" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ghi chú" name="note">
                <TextArea rows={2} placeholder="Ghi chú thêm (không bắt buộc)" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button onClick={() => navigate({ to: '/admin/member-management' })}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Lưu đoàn viên
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}