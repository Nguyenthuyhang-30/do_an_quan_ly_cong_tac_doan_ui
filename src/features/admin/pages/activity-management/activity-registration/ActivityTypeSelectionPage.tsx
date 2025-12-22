// Activity Type Selection Page - Chọn loại hoạt động
import { Card, Row, Col, Tag } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import {
  TrophyOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import './ActivityTypeSelectionPage.scss';

interface ActivityTypeOption {
  key: 'event' | 'vote' | 'meeting' | 'volunteer';
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  color: string;
  bgColor: string;
}

const activityTypes: ActivityTypeOption[] = [
  {
    key: 'event',
    title: 'Sự kiện',
    description: 'Tạo và quản lý các sự kiện, hội nghị, buổi giao lưu, hoạt động văn hóa, thể thao của Đoàn',
    icon: <TrophyOutlined style={{ fontSize: '56px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />,
    gradient: 'from-blue-event',
    color: '#1E3A8A',
    bgColor: '#eff6ff',
    features: [
      'Quản lý thời gian và địa điểm',
      'Đăng ký tham gia tự động',
      'Điểm danh QR code',
      'Thống kê tham gia',
    ],
  },
  {
    key: 'vote',
    title: 'Biểu quyết',
    description: 'Tạo cuộc biểu quyết, bình chọn, khảo sát ý kiến đoàn viên với tính năng ẩn danh và công khai',
    icon: <GlobalOutlined style={{ fontSize: '56px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />,
    gradient: 'from-blue-vote',
    color: '#1E3A8A',
    bgColor: '#eff6ff',
    features: [
      'Biểu quyết ẩn danh/công khai',
      'Nhiều lựa chọn',
      'Thời gian kết thúc tự động',
      'Kết quả thời gian thực',
    ],
  },
  {
    key: 'meeting',
    title: 'Sinh hoạt',
    description: 'Tổ chức buổi sinh hoạt Chi đoàn, cuộc họp với chương trình chi tiết, điểm danh bắt buộc',
    icon: <UsergroupAddOutlined style={{ fontSize: '56px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />,
    gradient: 'from-blue-meeting',
    color: '#1E3A8A',
    bgColor: '#eff6ff',
    features: [
      'Chương trình sinh hoạt',
      'Điểm danh bắt buộc',
      'Hình thức trực tiếp/online',
      'Lưu trữ biên bản',
    ],
  },
  {
    key: 'volunteer',
    title: 'Tình nguyện',
    description: 'Tổ chức hoạt động tình nguyện, chiến dịch với quản lý vị trí công việc, yêu cầu sức khỏe',
    icon: <HeartOutlined style={{ fontSize: '56px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />,
    gradient: 'from-blue-volunteer',
    color: '#1E3A8A',
    bgColor: '#eff6ff',
    features: [
      'Quản lý vị trí tình nguyện',
      'Yêu cầu sức khỏe/tập huấn',
      'Giấy chứng nhận tự động',
      'Theo dõi số giờ tình nguyện',
    ],
  },
];

export default function ActivityTypeSelectionPage() {
  const navigate = useNavigate();

  const handleSelect = (type: ActivityTypeOption['key']) => {
    const routeMap: Record<ActivityTypeOption['key'], string> = {
      event: '/admin/activity-management/registration/create/event',
      vote: '/admin/activity-management/registration/create/vote',
      meeting: '/admin/activity-management/registration/create/meeting',
      volunteer: '/admin/activity-management/registration/create/volunteer',
    };
    navigate({ to: routeMap[type] });
  };

  return (
    <div className="activity-type-selection-page">
      <div className="selection-container">
        <div className="selection-header">
          <h1 className="selection-title">Tạo phiếu đăng ký mới</h1>
          <p className="selection-subtitle">Chọn loại hoạt động bạn muốn tạo</p>
        </div>

        <Row gutter={[24, 24]} className="selection-grid">
          {activityTypes.map((activity, index) => (
            <Col xs={24} sm={12} key={activity.key}>
              <Card
                hoverable
                className={`activity-type-card ${activity.gradient}`}
                onClick={() => handleSelect(activity.key)}
                style={{
                  borderRadius: '20px',
                  border: `2px solid ${activity.bgColor}`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  height: '100%',
                  background: '#ffffff',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                bodyStyle={{
                  padding: '0',
                }}
              >
                <div className="activity-card-content">
                  {/* Header với icon và title */}
                  <div
                    className="activity-card-header"
                    style={{
                      padding: '32px 32px 24px',
                      background: `linear-gradient(135deg, ${activity.bgColor} 0%, #ffffff 100%)`,
                      position: 'relative',
                    }}
                  >
                    <div
                      className="activity-icon-wrapper"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        className="activity-icon"
                        style={{
                          fontSize: '56px',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100px',
                          height: '100px',
                          borderRadius: '20px',
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                          boxShadow: `0 8px 24px ${activity.color}60, 0 4px 12px ${activity.color}40`,
                          flexShrink: 0,
                          position: 'relative',
                          overflow: 'hidden',
                          border: `2px solid rgba(255, 255, 255, 0.3)`,
                        }}
                      >
                        {/* Shine effect */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
                            transform: 'rotate(45deg)',
                            transition: 'transform 0.6s ease',
                          }}
                          className="icon-shine"
                        />
                        {/* Inner glow */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: '0',
                            borderRadius: '20px',
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                            pointerEvents: 'none',
                          }}
                        />
                        <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                          {activity.icon}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          className="activity-title"
                          style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            margin: '0 0 4px 0',
                            color: '#1e293b',
                            lineHeight: '1.2',
                          }}
                        >
                          {activity.title}
                        </h3>
                        <Tag
                          color={activity.color}
                          style={{
                            borderRadius: '6px',
                            padding: '2px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: 'none',
                          }}
                        >
                          Hoạt động Đoàn
                        </Tag>
                      </div>
                    </div>
                    <p
                      className="activity-description"
                      style={{
                        fontSize: '15px',
                        color: '#475569',
                        margin: 0,
                        lineHeight: '1.6',
                        fontWeight: 400,
                      }}
                    >
                      {activity.description}
                    </p>
                  </div>


                  {/* Hover overlay */}
                  <div
                    className="activity-card-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${activity.color}15 0%, transparent 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                      borderRadius: '20px',
                    }}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="selection-footer">
          <a
            onClick={() => navigate({ to: '/admin/activity-management/registration' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1890ff',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'none',
              marginTop: '32px',
            }}
          >
            <ArrowLeftOutlined />
            Quay lại đăng ký hoạt động
          </a>
        </div>
      </div>
    </div>
  );
}

