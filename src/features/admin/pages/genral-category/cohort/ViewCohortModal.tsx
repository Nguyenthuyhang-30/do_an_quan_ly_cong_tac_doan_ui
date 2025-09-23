import {
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Descriptions, Modal, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import type { Cohort } from '../../../../../types/general-category/cohort';

const { Title, Text } = Typography;

interface ViewCohortModalProps {
  visible: boolean;
  onCancel: () => void;
  cohort: Cohort | null;
}

const ViewCohortModal: React.FC<ViewCohortModalProps> = ({ visible, onCancel, cohort }) => {
  if (!cohort) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = () => {
    const duration = cohort.end_year - cohort.start_year;
    return duration > 0 ? `${duration} năm` : 'Chưa xác định';
  };

  const getStatusColor = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear < cohort.start_year) return 'blue';
    if (currentYear >= cohort.start_year && currentYear <= cohort.end_year) return 'green';
    return 'red';
  };

  const getStatusText = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear < cohort.start_year) return 'Sắp bắt đầu';
    if (currentYear >= cohort.start_year && currentYear <= cohort.end_year) return 'Đang diễn ra';
    return 'Đã kết thúc';
  };

  return (
    <Modal
      title={
        <Space align="center" size="middle">
          <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />
          <span>Chi tiết khóa học</span>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      className="view-cohort-modal"
      styles={{
        body: { padding: '24px' },
        header: { paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' },
      }}
    >
      <div className="cohort-details">
        <Card
          className="cohort-header-card"
          style={{
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
          }}
        >
          <Row align="middle" justify="space-between">
            <Col xs={24} sm={16}>
              <Space direction="vertical" size="small">
                <Title
                  level={3}
                  style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 600,
                  }}
                >
                  {cohort.name}
                </Title>
                <Space size="large">
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                    <TagOutlined /> {cohort.code}
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                    <ClockCircleOutlined /> {calculateDuration()}
                  </Text>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
              <Tag
                color={getStatusColor()}
                style={{
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  marginTop: '8px',
                }}
              >
                {getStatusText()}
              </Tag>
            </Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />
                  <span>Thông tin cơ bản</span>
                </Space>
              }
              size="small"
              className="info-card"
              style={{ height: '100%' }}
            >
              <Descriptions
                column={1}
                size="small"
                labelStyle={{ fontWeight: 600, color: '#666' }}
                contentStyle={{ color: '#333' }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <TagOutlined />
                      <span>Mã khóa học</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '16px', color: 'var(--primary-color)' }}>
                    {cohort.code}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <InfoCircleOutlined />
                      <span>Tên khóa học</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '16px' }}>
                    {cohort.name}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Năm bắt đầu</span>
                    </Space>
                  }
                >
                  <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {cohort.start_year}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Năm kết thúc</span>
                    </Space>
                  }
                >
                  <Tag color="purple" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {cohort.end_year}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <ClockCircleOutlined />
                      <span>Thời gian đào tạo</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '16px', color: 'var(--primary-color)' }}>
                    {calculateDuration()}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <UserOutlined style={{ color: 'var(--primary-color)' }} />
                  <span>Thông tin hệ thống</span>
                </Space>
              }
              size="small"
              className="info-card"
              style={{ height: '100%' }}
            >
              <Descriptions
                column={1}
                size="small"
                labelStyle={{ fontWeight: 600, color: '#666' }}
                contentStyle={{ color: '#333' }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <span style={{ fontSize: '12px' }}>🆔</span>
                      <span>ID</span>
                    </Space>
                  }
                >
                  <Text code style={{ fontSize: '14px' }}>
                    #{cohort.id}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <UserOutlined />
                      <span>Người tạo</span>
                    </Space>
                  }
                >
                  <Text>{cohort.created_by ? `User #${cohort.created_by}` : 'Không xác định'}</Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Ngày tạo</span>
                    </Space>
                  }
                >
                  <Text>{formatDate(cohort.created_at)}</Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Cập nhật lần cuối</span>
                    </Space>
                  }
                >
                  <Text>{formatDate(cohort.updated_at)}</Text>
                </Descriptions.Item>

                {cohort.modified_by && (
                  <Descriptions.Item
                    label={
                      <Space>
                        <UserOutlined />
                        <span>Người sửa đổi</span>
                      </Space>
                    }
                  >
                    <Text>User #{cohort.modified_by}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <Space>
              <ClockCircleOutlined style={{ color: 'var(--primary-color)' }} />
              <span>Timeline khóa học</span>
            </Space>
          }
          style={{ marginTop: '24px' }}
          className="timeline-card"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                {cohort.start_year}
              </div>
              <Text strong>Bắt đầu</Text>
            </div>

            <div
              style={{
                flex: 2,
                height: '4px',
                background: `linear-gradient(to right, var(--primary-color) 0%, ${
                  getStatusColor() === 'green' ? '#52c41a' : '#d9d9d9'
                } 100%)`,
                borderRadius: '2px',
                minWidth: '100px',
              }}
            />

            <div style={{ textAlign: 'center', flex: 1, minWidth: '120px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background:
                    getStatusColor() === 'red'
                      ? '#ff4d4f'
                      : getStatusColor() === 'green'
                      ? '#52c41a'
                      : '#1890ff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                {cohort.end_year}
              </div>
              <Text strong>Kết thúc</Text>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default ViewCohortModal;
