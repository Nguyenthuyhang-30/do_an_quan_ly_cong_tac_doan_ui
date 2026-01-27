// QR Code Register Page - Trang quét QR code để ĐĂNG KÝ tham gia hoạt động
import { useState, useEffect } from 'react';
import { Card, Button, Space, message, Typography, Alert } from 'antd';
import { QrcodeOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import QRCodeScanner from '../../../components/common/QRCodeScanner';
import ActivityService from '../../../services/api/activity.service';

const { Title, Text } = Typography;

export default function QRRegisterPage() {
  const navigate = useNavigate();
  const [scannerVisible, setScannerVisible] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Parse URL params nếu có sẵn activityId & token (trường hợp mở link trực tiếp từ QR)
  const searchParams = new URLSearchParams(window.location.search);
  const activityIdParam = searchParams.get('activityId');
  const tokenParam = searchParams.get('token');

  useEffect(() => {
    if (activityIdParam && tokenParam) {
      handleQRRegister(activityIdParam, tokenParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityIdParam, tokenParam]);

  const handleScanSuccess = async (data: string) => {
    try {
      // Format mong muốn: /dang-ky/qr?activityId=123&token=abc[&type=register]
      const url = new URL(data, window.location.origin);
      const activityId = url.searchParams.get('activityId');
      const token = url.searchParams.get('token');

      if (!activityId || !token) {
        message.error('QR code không hợp lệ');
        return;
      }

      await handleQRRegister(activityId, token);
    } catch (error) {
      message.error('Không thể xử lý QR code');
      // eslint-disable-next-line no-console
      console.error('Error processing QR register QR code:', error);
    }
  };

  const handleQRRegister = async (activityId: string, token: string) => {
    try {
      setRegistering(true);
      await ActivityService.registerViaQR(Number(activityId), token);
      message.success('Đăng ký tham gia hoạt động thành công!');

      // Sau khi đăng ký xong, điều hướng về trang tra cứu hoạt động
      setTimeout(() => {
        navigate({ to: '/tra-cuu-hoat-dong' });
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        'Không thể đăng ký tham gia hoạt động. Vui lòng thử lại.';
      message.error(errorMessage);
      // eslint-disable-next-line no-console
      console.error('Error registering via QR:', error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>
              <QrcodeOutlined /> Đăng ký tham gia bằng QR Code
            </Title>
            <Text type="secondary">
              Quét mã QR do Ban tổ chức cung cấp để đăng ký tham gia hoạt động
            </Text>
          </div>

          {registering && (
            <Alert
              message="Đang xử lý đăng ký..."
              type="info"
              icon={<CheckCircleOutlined />}
              showIcon
            />
          )}

          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Button
              type="primary"
              size="large"
              icon={<QrcodeOutlined />}
              onClick={() => setScannerVisible(true)}
              disabled={registering}
              style={{ height: '60px', fontSize: '18px', padding: '0 40px' }}
            >
              Quét QR Code để đăng ký
            </Button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate({ to: '/tra-cuu-hoat-dong' })}
            >
              Quay lại tra cứu hoạt động
            </Button>
          </div>
        </Space>
      </Card>

      {/* QR Code Scanner Modal */}
      <QRCodeScanner
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}

