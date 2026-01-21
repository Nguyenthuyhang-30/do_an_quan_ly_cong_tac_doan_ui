import React from 'react';
import { Modal, Button, Space, message } from 'antd';
import { QrcodeOutlined, DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  activityId: number;
  activityName: string;
  visible: boolean;
  onClose: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  activityId,
  activityName,
  visible,
  onClose,
}) => {
  // Base URL để tạo QR. Ưu tiên dùng domain/IP cấu hình qua ENV để các thiết bị khác truy cập được.
  // Ví dụ: VITE_PUBLIC_BASE_URL="http://192.168.1.10:5173"
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || window.location.origin;

  // Tạo QR code data - có thể là URL hoặc token
  const qrData = `${baseUrl}/check-in/qr?activityId=${activityId}&token=${Date.now()}`;

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-Code-${activityName}-${activityId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      message.success('Đã tải xuống QR code');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      title={
        <Space>
          <QrcodeOutlined />
          <span>QR Code điểm danh - {activityName}</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="download" icon={<DownloadOutlined />} onClick={handleDownload}>
          Tải xuống
        </Button>,
        <Button key="print" icon={<PrinterOutlined />} onClick={handlePrint}>
          In
        </Button>,
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={500}
      centered
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <QRCodeSVG
            id="qr-code-svg"
            value={qrData}
            size={300}
            level="H"
            includeMargin={true}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            Quét mã QR này để điểm danh
          </p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Mã hoạt động: <strong>{activityId}</strong>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeGenerator;
