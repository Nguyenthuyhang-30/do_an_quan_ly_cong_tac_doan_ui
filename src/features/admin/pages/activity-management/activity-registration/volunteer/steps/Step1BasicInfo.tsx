// Step 1: Thông tin cơ bản - Tình nguyện
import { Col, Form, Input, Row, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import StyledSwitch from '../../../../../../../components/common/StyledSwitch';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface Step1BasicInfoProps {
  form: FormInstance;
}

export default function Step1BasicInfo({ form }: Step1BasicInfoProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Thông tin cơ bản
      </h3>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Tên hoạt động tình nguyện"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tên hoạt động' }]}
          >
            <Input
              size="large"
              placeholder="VD: Chiến dịch Mùa hè xanh tại xã A..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Chiến dịch / chương trình" name="campaignName">
            <Input
              size="large"
              placeholder="VD: Chiến dịch Mùa hè xanh 2025"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
          >
            <Input
              size="large"
              placeholder="VD: Xã X, Huyện Y, Tỉnh Z..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Thời gian diễn ra"
            name="timeRange"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%', borderRadius: '8px' }}
              size="large"
              placeholder={['Bắt đầu', 'Kết thúc']}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Ghi chú về thời gian" name="timeNote">
            <Input
              size="large"
              placeholder="VD: Tập trung lúc 6h45 tại cổng trường..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Số lượng TNV tối đa" name="maxVolunteers">
            <Input
              type="number"
              min={1}
              size="large"
              placeholder="Không giới hạn"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Người phụ trách" name="contactPerson">
            <Input
              size="large"
              placeholder="VD: Bí thư Nguyễn Văn A"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Số điện thoại liên hệ" name="contactPhone">
            <Input
              size="large"
              placeholder="VD: 09xx xxx xxx"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Yêu cầu sức khỏe tốt" name="requireHealthCheck" valuePropName="checked">
            <StyledSwitch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Yêu cầu tập huấn trước" name="requireTraining" valuePropName="checked">
            <StyledSwitch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Nội dung chi tiết" name="description">
            <TextArea
              rows={3}
              placeholder="Mô tả công việc tình nguyện, lịch trình sơ bộ, trang phục, lưu ý..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Quyền lợi / ghi nhận" name="benefits">
            <TextArea
              rows={2}
              placeholder="VD: Cộng điểm rèn luyện, Giấy chứng nhận, Hỗ trợ ăn trưa..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

