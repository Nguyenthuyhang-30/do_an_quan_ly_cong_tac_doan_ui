import {
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Descriptions, Modal, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import type { Cohort } from '../../../../../app-types/general-category/cohort';
import './ViewCohortModal.scss';

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
          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 600 }}>Chi tiết khóa học</span>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      centered
      className="view-cohort-modal"
      styles={{
        body: { padding: '32px', backgroundColor: '#f8f9fa' },
        header: {
          paddingBottom: '20px',
          borderBottom: '2px solid #e8e8e8',
          backgroundColor: '#ffffff',
        },
      }}
    >
      <div className="cohort-details">
        <Card
          className="cohort-header-card"
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
                  {cohort.name}
                </Title>
                <Space size="large" wrap>
                  <Text
                    style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500 }}
                  >
                    <TagOutlined style={{ marginRight: '6px' }} /> {cohort.code}
                  </Text>
                  <Text
                    style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: 500 }}
                  >
                    <ClockCircleOutlined style={{ marginRight: '6px' }} /> {calculateDuration()}
                  </Text>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
              <Tag
                color={getStatusColor()}
                style={{
                  fontSize: '15px',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
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
                  <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Thông tin cơ bản</span>
                </Space>
              }
              size="small"
              className="info-card"
              style={{
                height: '100%',
                borderRadius: '12px',
                border: '1px solid #e8e8e8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: '10px 18px' }}
              headStyle={{
                borderBottom: '2px solid #f0f0f0',
                backgroundColor: '#fafafa',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Descriptions
                column={1}
                size="middle"
                labelStyle={{ fontWeight: 600, color: '#595959', fontSize: '14px' }}
                contentStyle={{ color: '#262626', fontSize: '14px' }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <TagOutlined />
                      <span>Mã khóa</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '15px', color: 'blue', fontWeight: 600 }}>
                    {cohort.code}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <InfoCircleOutlined />
                      <span>Tên khóa</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '15px', color: '#262626' }}>
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
                  <Text strong style={{ fontSize: '15px', color: 'blue' }}>
                    {cohort.start_year}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Năm kết thúc</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '15px', color: 'purple' }}>
                    {cohort.end_year}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <ClockCircleOutlined />
                      <span>Thời gian đào tạo</span>
                    </Space>
                  }
                >
                  <Text strong style={{ fontSize: '15px', color: '#1890ff' }}>
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
                  <UserOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Thông tin hệ thống</span>
                </Space>
              }
              size="small"
              className="info-card"
              style={{
                height: '100%',
                borderRadius: '12px',
                border: '1px solid #e8e8e8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
              }}
              bodyStyle={{ padding: '10px 18px' }}
              headStyle={{
                borderBottom: '2px solid #f0f0f0',
                backgroundColor: '#fafafa',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Descriptions
                column={1}
                size="middle"
                labelStyle={{ fontWeight: 600, color: '#595959', fontSize: '14px' }}
                contentStyle={{ color: '#262626', fontSize: '14px' }}
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <span style={{ fontSize: '14px' }}>🆔</span>
                      <span>ID</span>
                    </Space>
                  }
                >
                  <Text style={{ fontSize: '14px', fontFamily: 'monospace' }}>#{cohort.id}</Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <UserOutlined />
                      <span>Người tạo</span>
                    </Space>
                  }
                >
                  <Text style={{ fontSize: '14px' }}>
                    {cohort.created_by ? `User #${cohort.created_by}` : 'Không xác định'}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Ngày tạo</span>
                    </Space>
                  }
                >
                  <Text style={{ fontSize: '14px', color: '#595959' }}>
                    {formatDate(cohort.created_at)}
                  </Text>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      <span>Cập nhật lần cuối</span>
                    </Space>
                  }
                >
                  <Text style={{ fontSize: '14px', color: '#595959' }}>
                    {formatDate(cohort.modified_at)}
                  </Text>
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
                    <Text style={{ fontSize: '14px' }}>User #{cohort.modified_by}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <Space>
              <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
              <span style={{ fontSize: '16px', fontWeight: 600 }}>Timeline khóa học</span>
            </Space>
          }
          style={{
            marginTop: '28px',
            borderRadius: '12px',
            border: '1px solid #e8e8e8',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          bodyStyle={{ padding: '32px' }}
          headStyle={{
            borderBottom: '2px solid #f0f0f0',
            backgroundColor: '#fafafa',
            borderRadius: '12px 12px 0 0',
          }}
          className="timeline-card"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '32px 24px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e3e7f0 100%)',
              borderRadius: '12px',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ textAlign: 'center', flex: 1, minWidth: '140px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '24px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                  border: '3px solid white',
                }}
              >
                {cohort.start_year}
              </div>
              <Text strong style={{ fontSize: '15px', color: '#262626' }}>
                Bắt đầu
              </Text>
            </div>

            <div
              style={{
                flex: 2,
                height: '6px',
                background: `linear-gradient(to right, #1890ff 0%, ${
                  getStatusColor() === 'green'
                    ? '#52c41a'
                    : getStatusColor() === 'red'
                    ? '#ff4d4f'
                    : '#d9d9d9'
                } 100%)`,
                borderRadius: '3px',
                minWidth: '120px',
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  border: '2px solid #e8e8e8',
                }}
              >
                <Text strong style={{ fontSize: '13px', color: '#595959' }}>
                  {calculateDuration()}
                </Text>
              </div>
            </div>

            <div style={{ textAlign: 'center', flex: 1, minWidth: '140px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background:
                    getStatusColor() === 'red'
                      ? 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)'
                      : getStatusColor() === 'green'
                      ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
                      : 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '24px',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px ${
                    getStatusColor() === 'red'
                      ? 'rgba(255, 77, 79, 0.3)'
                      : getStatusColor() === 'green'
                      ? 'rgba(82, 196, 26, 0.3)'
                      : 'rgba(24, 144, 255, 0.3)'
                  }`,
                  border: '3px solid white',
                }}
              >
                {cohort.end_year}
              </div>
              <Text strong style={{ fontSize: '15px', color: '#262626' }}>
                Kết thúc
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default ViewCohortModal;
