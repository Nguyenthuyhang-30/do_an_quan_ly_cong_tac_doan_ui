import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Space, message, Alert } from 'antd';
import { QrcodeOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Html5Qrcode } from 'html5-qrcode';

interface QRCodeScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  visible,
  onClose,
  onScanSuccess,
}) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerContainerId = 'qr-scanner-container';

  useEffect(() => {
    if (visible && !scannerRef.current) {
      startScanning();
    } else if (!visible && scannerRef.current) {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [visible]);

  const startScanning = async () => {
    try {
      setError(null);
      setScanning(true);

      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' }, // Sử dụng camera sau
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Quét thành công
          handleScanSuccess(decodedText);
        },
        () => {
          // Bỏ qua lỗi quét liên tục
        },
      );
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      setError('Không thể khởi động camera. Vui lòng kiểm tra quyền truy cập camera.');
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      setScanning(false);
    }
  };

  const handleScanSuccess = (data: string) => {
    stopScanning();
    message.success('Quét QR code thành công!');
    onScanSuccess(data);
    onClose();
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <QrcodeOutlined />
          <span>Quét QR Code điểm danh</span>
        </Space>
      }
      open={visible}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose} icon={<CloseOutlined />}>
          Đóng
        </Button>,
      ]}
      width={500}
      centered
      destroyOnClose
    >
      <div style={{ textAlign: 'center' }}>
        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}

        <div
          id={scannerContainerId}
          style={{
            width: '100%',
            minHeight: '300px',
            margin: '0 auto',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}
        />

        {scanning && (
          <div style={{ marginTop: '16px' }}>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <span style={{ color: '#666' }}>Đang quét QR code...</span>
            </Space>
          </div>
        )}

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#999' }}>
          <p>Hướng camera về phía QR code để quét</p>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeScanner;
