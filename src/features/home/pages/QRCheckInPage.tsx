// QR Code Check-in Page - Trang quét QR code để điểm danh
import { useState, useEffect } from 'react';
import { Card, Button, Space, message, Typography, Alert } from 'antd';
import { QrcodeOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import QRCodeScanner from '../../../components/common/QRCodeScanner';
import ActivityService from '../../../services/api/activity.service';

const { Title, Text } = Typography;

export default function QRCheckInPage() {
  const navigate = useNavigate();
  const [scannerVisible, setScannerVisible] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  // Parse URL params nếu có
  const searchParams = new URLSearchParams(window.location.search);
  const activityIdParam = searchParams.get('activityId');
  const tokenParam = searchParams.get('token');

  useEffect(() => {
    // Nếu có activityId và token trong URL, tự động check-in
    if (activityIdParam && tokenParam) {
      handleQRCheckIn(activityIdParam, tokenParam);
    }
  }, [activityIdParam, tokenParam]);

  const handleScanSuccess = async (data: string) => {
    try {
      // Parse QR code data
      // Format: /check-in/qr?activityId=123&token=abc
      const url = new URL(data, window.location.origin);
      const activityId = url.searchParams.get('activityId');
      const token = url.searchParams.get('token');

      if (!activityId || !token) {
        message.error('QR code không hợp lệ');
        return;
      }

      await handleQRCheckIn(activityId, token);
    } catch (error) {
      message.error('Không thể xử lý QR code');
      console.error('Error processing QR code:', error);
    }
  };

  const handleQRCheckIn = async (activityId: string, token: string) => {
    try {
      setCheckingIn(true);
      // memberId sẽ được lấy từ token hoặc session trên backend
      await ActivityService.checkInViaQR(Number(activityId), token);
      message.success('Điểm danh thành công!');
      
      // Redirect về trang tra cứu hoạt động sau 2 giây
      setTimeout(() => {
        navigate({ to: '/tra-cuu-hoat-dong' });
      }, 2000);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Không thể điểm danh. Vui lòng thử lại.';
      message.error(errorMessage);
      console.error('Error checking in via QR:', error);
    } finally {
      setCheckingIn(false);
    }
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>
              <QrcodeOutlined /> Điểm danh bằng QR Code
            </Title>
            <Text type="secondary">
              Quét mã QR code từ admin để điểm danh tham gia hoạt động
            </Text>
          </div>

          {checkingIn && (
            <Alert
              message="Đang xử lý điểm danh..."
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
              disabled={checkingIn}
              style={{ height: '60px', fontSize: '18px', padding: '0 40px' }}
            >
              Quét QR Code
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
