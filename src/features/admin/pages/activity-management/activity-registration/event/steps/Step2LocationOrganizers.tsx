// Step 2: Địa điểm & Tổ chức - Sự kiện
import { Col, Form, Input, Row, Radio, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import '../../steps/styles/RadioGroup.scss';

interface Step2LocationOrganizersProps {
  form: FormInstance;
}

export default function Step2LocationOrganizers({ form }: Step2LocationOrganizersProps) {
  const targetType = Form.useWatch('targetType', form);

  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Địa điểm và thành viên tổ chức
      </h3>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
          >
            <Input
              size="large"
              placeholder="VD: Hội trường A1, Phòng B204..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Ban tổ chức" name="organizer">
            <Input
              size="large"
              placeholder="VD: Ban Chấp hành Chi đoàn..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Đối tượng tham gia"
            name="targetType"
            rules={[{ required: true, message: 'Vui lòng chọn đối tượng' }]}
          >
            <Radio.Group className="activity-radio-group" defaultValue="all">
              <Radio value="all">Toàn bộ Đoàn viên khoa</Radio>
              <Radio value="branch">Theo chi đoàn</Radio>
              <Radio value="role">Theo vai trò</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        {targetType === 'branch' && (
          <Col span={12}>
            <Form.Item
              label="Chi đoàn áp dụng"
              name="targetBranches"
              rules={[
                {
                  required: targetType === 'branch',
                  message: 'Vui lòng chọn ít nhất một chi đoàn',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                size="large"
                placeholder="Chọn chi đoàn"
                style={{ borderRadius: '8px' }}
                options={[
                  { label: 'CNTT K14A', value: 'cntt-k14a' },
                  { label: 'CNTT K14B', value: 'cntt-k14b' },
                  { label: 'CNTT K15A', value: 'cntt-k15a' },
                  { label: 'CNTT K15B', value: 'cntt-k15b' },
                  { label: 'CNTT K16A', value: 'cntt-k16a' },
                ]}
              />
            </Form.Item>
          </Col>
        )}

        {targetType === 'role' && (
          <Col span={12}>
            <Form.Item
              label="Vai trò áp dụng"
              name="targetRoles"
              rules={[
                {
                  required: targetType === 'role',
                  message: 'Vui lòng chọn ít nhất một vai trò',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                size="large"
                placeholder="Chọn vai trò"
                style={{ borderRadius: '8px' }}
                options={[
                  { label: 'BCH Chi đoàn', value: 'bch' },
                  { label: 'Bí thư', value: 'secretary' },
                  { label: 'Đoàn viên', value: 'member' },
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </div>
  );
}

