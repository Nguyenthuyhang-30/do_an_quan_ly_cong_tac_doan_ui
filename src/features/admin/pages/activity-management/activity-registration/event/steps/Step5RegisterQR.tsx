// Step 5: Hoàn thành & QR đăng ký tham gia
import { Card, Alert, Typography, Space, Input, Button } from 'antd';
import { CheckCircleOutlined, LinkOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

const { Title, Text } = Typography;

interface Step5RegisterQRProps {
  activityId: number | null;
  qrUrl: string | null;
  loading: boolean;
}

export default function Step5RegisterQR({ activityId, qrUrl, loading }: Step5RegisterQRProps) {
  const handleCopy = () => {
    if (!qrUrl) return;
    navigator.clipboard
      .writeText(qrUrl)
      .then(() => {
        // Có thể thay alert bằng message nếu bạn muốn dùng antd
        // eslint-disable-next-line no-alert
        alert('Đã copy đường dẫn đăng ký vào clipboard');
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Không thể copy đường dẫn. Vui lòng copy thủ công.');
      });
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 16 }}>
        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
        Hoàn thành tạo phiếu đăng ký
      </Title>
      <Text type="secondary">
        Hệ thống đã tạo phiếu đăng ký cho hoạt động và sinh sẵn QR đăng ký để Đoàn viên quét tham
        gia.
      </Text>

      <div style={{ marginTop: 24 }}>
        {loading && (
          <Alert
            message="Đang sinh QR đăng ký..."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {!loading && (!activityId || !qrUrl) && (
          <Alert
            message="Chưa thể sinh QR đăng ký"
            description="Vui lòng kiểm tra lại kết quả tạo phiếu đăng ký hoặc thử lại sau."
            type="warning"
            showIcon
          />
        )}

        {!loading && activityId && qrUrl && (
          <Card
            style={{ marginTop: 8 }}
            title="QR đăng ký tham gia hoạt động"
            bodyStyle={{ textAlign: 'center' }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <QRCodeSVG value={qrUrl} size={240} level="H" includeMargin />
            </div>

            <div style={{ marginTop: 24 }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">Đường dẫn đăng ký:</Text>
                <Input
                  readOnly
                  value={qrUrl}
                  size="large"
                  suffix={<LinkOutlined />}
                  style={{ borderRadius: 8 }}
                />
                <Button type="primary" onClick={handleCopy}>
                  Copy đường dẫn
                </Button>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Đoàn viên chỉ cần quét QR này hoặc truy cập đường dẫn trên để đăng ký tham gia
                  hoạt động.
                </Text>
              </Space>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

