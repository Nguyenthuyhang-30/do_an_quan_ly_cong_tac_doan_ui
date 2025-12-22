// Step 1: Thông tin cơ bản - Sinh hoạt
import { Col, Form, Input, Row, DatePicker, Radio } from 'antd';
import type { FormInstance } from 'antd/es/form';
import StyledSwitch from '../../../../../../../components/common/StyledSwitch';
import '../../steps/styles/RadioGroup.scss';

const { TextArea } = Input;

interface Step1BasicInfoProps {
  form: FormInstance;
}

export default function Step1BasicInfo({ form: _form }: Step1BasicInfoProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Thông tin cơ bản
      </h3>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Chủ đề buổi sinh hoạt"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
          >
            <Input
              size="large"
              placeholder="Ví dụ: Sinh hoạt Chi đoàn tháng 11, Tổng kết học kỳ..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Chi đoàn / đơn vị tổ chức"
            name="branch"
            rules={[{ required: true, message: 'Vui lòng nhập chi đoàn' }]}
          >
            <Input
              size="large"
              placeholder="VD: CNTT K14A"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Thời gian diễn ra"
            name="dateTime"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%', borderRadius: '8px' }}
              size="large"
              placeholder="Chọn ngày giờ"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Hình thức sinh hoạt" name="meetingType">
            <Radio.Group className="activity-radio-group" defaultValue="offline">
              <Radio value="offline">Trực tiếp</Radio>
              <Radio value="online">Online</Radio>
              <Radio value="hybrid">Kết hợp</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Bắt buộc điểm danh" name="isRequiredAttendance" valuePropName="checked">
            <StyledSwitch checkedChildren="Bắt buộc" unCheckedChildren="Không bắt buộc" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Cho phép check-in bằng QR" name="allowQrCheckin" valuePropName="checked">
            <StyledSwitch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Ghi chú / nội dung chi tiết" name="note">
            <TextArea
              rows={3}
              placeholder="Thêm ghi chú về chuẩn bị, trang phục, tài liệu mang theo..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

