import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Modal, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import { Branch } from '../types';

const { Title } = Typography;

interface ViewBranchModalProps {
  visible: boolean;
  onCancel: () => void;
  branch: Branch | null;
}

const ViewBranchModal: React.FC<ViewBranchModalProps> = ({ visible, onCancel, branch }) => {
  if (!branch) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Chưa có thông tin';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = () => {
    return branch.status === 'active' ? 'green' : 'red';
  };

  const getStatusText = () => {
    return branch.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động';
  };

  return (
    <Modal
      title={
        <Space align="center" size="middle">
          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Chi tiết chi đoàn</span>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      centered
      styles={{
        body: { padding: '32px', backgroundColor: '#f8f9fa' },
        header: {
          paddingBottom: '20px',
          borderBottom: '2px solid #e8e8e8',
          backgroundColor: '#ffffff',
        },
      }}
    >
      <div className="branch-details">
        <Card
          style={{
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
            overflow: 'hidden',
          }}
          bodyStyle={{ padding: '28px' }}
        >
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col xs={24} sm={16}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Title
                  level={3}
                  style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {branch.name}
                </Title>
                <Tag
                  color="blue"
                  style={{
                    fontSize: '14px',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {branch.code}
                </Tag>
              </Space>
            </Col>
            <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
              <Tag
                color={getStatusColor()}
                style={{
                  fontSize: '16px',
                  padding: '8px 24px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {getStatusText()}
              </Tag>
            </Col>
          </Row>
        </Card>

        <Card
          title={<span style={{ fontSize: '16px', fontWeight: 600 }}>Thông tin chi tiết</span>}
          style={{
            marginBottom: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <Descriptions bordered column={1} labelStyle={{ fontWeight: 600, width: '30%' }}>
            <Descriptions.Item label="Mã chi đoàn">
              <Tag color="blue">{branch.code}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tên chi đoàn">{branch.name}</Descriptions.Item>
            <Descriptions.Item label="Bí thư">
              {branch.secretary || 'Chưa có thông tin'}
            </Descriptions.Item>
            <Descriptions.Item label="Số đoàn viên">{branch.members} đoàn viên</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor()}>{getStatusText()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{formatDate(branch.createdAt)}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Modal>
  );
};

export default ViewBranchModal;
