import { Button, Card, Badge, Typography, Row, Col, Tag } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  BellOutlined,
  RightOutlined,
  UserOutlined,
  TrophyOutlined,
  HeartOutlined,
  StarOutlined,
  ThunderboltOutlined,
  RocketOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  // Data mẫu cho thông báo/tin tức
  const newsData = [
    {
      id: 1,
      title: 'Thông báo tổ chức Đại hội Đoàn khoa CNTT lần thứ X',
      summary:
        'Đại hội Đoàn khoa CNTT nhiệm kỳ 2024-2026 sẽ được tổ chức vào ngày 15/12/2024 tại hội trường A1.',
      time: '2 giờ trước',
      type: 'important',
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      id: 2,
      title: "Chương trình tình nguyện 'Mùa đông ấm áp'",
      summary:
        'Đăng ký tham gia hoạt động tình nguyện dành cho trẻ em vùng cao, bắt đầu từ ngày 20/12/2024.',
      time: '5 giờ trước',
      type: 'volunteer',
      icon: <HeartOutlined />,
      color: '#f5222d',
    },
    {
      id: 3,
      title: "Cuộc thi 'Sinh viên 5 tốt' cấp trường",
      summary: "Hạn nộp hồ sơ dự thi 'Sinh viên 5 tốt' là ngày 30/11/2024. Đừng bỏ lỡ cơ hội!",
      time: '1 ngày trước',
      type: 'competition',
      icon: <TrophyOutlined />,
      color: '#faad14',
    },
    {
      id: 4,
      title: 'Lễ kỷ niệm 93 năm thành lập Đoàn TNCS HCM',
      summary:
        'Chương trình văn nghệ chào mừng kỷ niệm 93 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3).',
      time: '2 ngày trước',
      type: 'event',
      icon: <StarOutlined />,
      color: '#722ed1',
    },
  ];

  const getTypeBadge = (type: string) => {
    const badges = {
      important: { text: 'Quan trọng', color: '#1890ff' },
      volunteer: { text: 'Tình nguyện', color: '#f5222d' },
      competition: { text: 'Cuộc thi', color: '#faad14' },
      event: { text: 'Sự kiện', color: '#722ed1' },
    };
    return badges[type as keyof typeof badges] || { text: 'Thông báo', color: '#1890ff' };
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh',
      }}
    >
      {/* Hero Section với illustration */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: 'var(--background-color)',
          paddingTop: '60px',
          paddingBottom: '80px',
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-10 left-10 w-16 h-16 border-2 border-primary rounded-full animate-pulse"
            style={{ borderColor: 'var(--primary-color)' }}
          ></div>
          <div
            className="absolute top-20 right-20 w-12 h-12 border-2 border-secondary rounded-lg rotate-45"
            style={{ borderColor: 'var(--secondary-color)' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-8 h-8 border-2 border-accent rounded-full"
            style={{ borderColor: 'var(--accent-color)' }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-20 h-20 border-2 border-primary rounded-lg rotate-12"
            style={{ borderColor: 'var(--primary-color)' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-secondary rounded-full opacity-30"
            style={{ borderColor: 'var(--secondary-color)' }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Logo/Icon chính */}
            <div className="flex justify-center mb-6">
              <div
                className="p-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                  boxShadow: '0 8px 30px rgba(21, 26, 166, 0.3)',
                }}
              >
                <StarOutlined
                  style={{
                    fontSize: '40px',
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                />
              </div>
            </div>

            {/* Tiêu đề chính */}
            <Title
              level={1}
              className="mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 'bold',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: 'var(--text-primary)',
              }}
            >
              Quản lý công tác Đoàn Thanh Niên
            </Title>

            {/* Mô tả */}
            <Paragraph
              className="mb-6 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
              }}
            >
              "Đoàn kết - Sáng tạo - Tình nguyện - Phát triển"
              <br />
              <span className="text-sm opacity-80">
                Hệ thống quản lý hiện đại cho các hoạt động Đoàn Thanh Niên Khoa Công nghệ Thông tin
              </span>
            </Paragraph>

            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                color: 'white',
                boxShadow: '0 4px 12px rgba(21, 26, 166, 0.3)',
              }}
            >
              <StarOutlined className="mr-2" />
              Đoàn TNCS Hồ Chí Minh - Khoa CNTT
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons Section */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <Row gutter={[24, 24]} justify="center" className="mb-12">
          {/* Button 1: Theo dõi hoạt động Đoàn */}
          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <Card
              className="main-action-card group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0"
              style={{
                backgroundColor: 'var(--card-background)',
                borderRadius: '20px',
                overflow: 'hidden',
                minHeight: '260px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              bodyStyle={{ padding: '32px 24px' }}
              hoverable
            >
              <div className="text-center">
                {/* Icon với gradient */}
                <div
                  className="inline-flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background:
                      'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                    boxShadow: '0 8px 25px rgba(21, 26, 166, 0.25)',
                  }}
                >
                  <CalendarOutlined style={{ fontSize: '36px', color: 'white' }} />
                </div>

                {/* Tiêu đề */}
                <Title
                  level={3}
                  style={{
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  }}
                >
                  Theo dõi hoạt động Đoàn
                </Title>

                {/* Mô tả */}
                <Paragraph
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                  }}
                >
                  Quản lý và theo dõi các hoạt động, sự kiện của Đoàn. Xem lịch trình và báo cáo
                  tiến độ.
                </Paragraph>

                {/* Button */}
                <Button
                  type="primary"
                  size="large"
                  icon={<RightOutlined />}
                  className="group-hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    height: '48px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    width: '100%',
                    fontSize: '16px',
                  }}
                >
                  Xem hoạt động
                </Button>
              </div>
            </Card>
          </Col>

          {/* Button 2: Quản lý liên chi đoàn */}
          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <Card
              className="main-action-card group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0"
              style={{
                backgroundColor: 'var(--card-background)',
                borderRadius: '20px',
                overflow: 'hidden',
                minHeight: '260px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              bodyStyle={{ padding: '32px 24px' }}
              hoverable
            >
              <div className="text-center">
                {/* Icon với gradient */}
                <div
                  className="inline-flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, var(--secondary-color), #ff4444)',
                    boxShadow: '0 8px 25px rgba(255, 0, 0, 0.25)',
                  }}
                >
                  <TeamOutlined style={{ fontSize: '36px', color: 'white' }} />
                </div>

                {/* Tiêu đề */}
                <Title
                  level={3}
                  style={{
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    fontWeight: 'bold',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  }}
                >
                  Quản lý liên chi đoàn khoa CNTT
                </Title>

                {/* Mô tả */}
                <Paragraph
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                  }}
                >
                  Quản lý thông tin các liên chi đoàn, theo dõi thành viên và đánh giá hiệu quả hoạt
                  động.
                </Paragraph>

                {/* Button */}
                <Button
                  type="primary"
                  size="large"
                  icon={<RightOutlined />}
                  className="group-hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    borderColor: 'var(--secondary-color)',
                    height: '48px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    width: '100%',
                    fontSize: '16px',
                  }}
                >
                  Quản lý chi đoàn
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-6 mb-16">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={12} sm={6} md={6} lg={6}>
            <Card
              className="text-center border-0"
              style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <UserOutlined
                style={{ fontSize: '28px', color: 'var(--primary-color)', marginBottom: '8px' }}
              />
              <Title
                level={4}
                style={{ color: 'var(--primary-color)', margin: '4px 0', fontSize: '1.5rem' }}
              >
                1,247
              </Title>
              <Text style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Thành viên</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Card
              className="text-center border-0"
              style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <CalendarOutlined
                style={{ fontSize: '28px', color: 'var(--secondary-color)', marginBottom: '8px' }}
              />
              <Title
                level={4}
                style={{ color: 'var(--secondary-color)', margin: '4px 0', fontSize: '1.5rem' }}
              >
                15
              </Title>
              <Text style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Hoạt động/tháng
              </Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Card
              className="text-center border-0"
              style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <TeamOutlined
                style={{ fontSize: '28px', color: 'var(--accent-color)', marginBottom: '8px' }}
              />
              <Title
                level={4}
                style={{ color: 'var(--accent-color)', margin: '4px 0', fontSize: '1.5rem' }}
              >
                8
              </Title>
              <Text style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Liên chi đoàn
              </Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Card
              className="text-center border-0"
              style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <TrophyOutlined style={{ fontSize: '28px', color: '#52c41a', marginBottom: '8px' }} />
              <Title level={4} style={{ color: '#52c41a', margin: '4px 0', fontSize: '1.5rem' }}>
                89
              </Title>
              <Text style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Đoàn viên xuất sắc
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* News & Notifications Section */}
      <div className="container mx-auto px-6 mb-16">
        {/* Header của section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(21, 26, 166, 0.1)' }}>
              <BellOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
            </div>
          </div>
          <Title
            level={2}
            style={{
              color: 'var(--text-primary)',
              marginBottom: '8px',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            }}
          >
            Thông báo & Tin tức mới nhất
          </Title>
          <Text style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Cập nhật thông tin hoạt động và tin tức quan trọng của Đoàn
          </Text>
        </div>

        {/* Cards tin tức */}
        <Row gutter={[24, 24]}>
          {newsData?.map((news) => {
            const badge = getTypeBadge(news.type);
            return (
              <Col xs={24} sm={12} md={12} lg={6} key={news.id}>
                <Card
                  className="news-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    borderRadius: '16px',
                    height: '100%',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                  bodyStyle={{ padding: '18px' }} // slightly tighter
                  hoverable
                >
                  {/* Header của card */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        borderRadius: '12px',
                        backgroundColor: `${badge.color}15`,
                        color: badge.color,
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.02)',
                      }}
                    >
                      {news.icon}
                    </div>

                    {/* custom badge to ensure vertical centering */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${badge.color}15`,
                        color: badge.color,
                        padding: '6px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: 'none',
                        height: '32px',
                        lineHeight: '1',
                      }}
                      aria-label={badge.text}
                    >
                      {badge.text}
                    </div>
                  </div>

                  {/* Tiêu đề */}
                  <Title
                    level={5}
                    style={{
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      lineHeight: '1.3',
                      fontSize: '14px',
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      minHeight: '40px',
                    }}
                  >
                    {news.title}
                  </Title>

                  {/* Nội dung */}
                  <Paragraph
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '13px',
                      marginBottom: '12px',
                      lineHeight: '1.45',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {news.summary}
                  </Paragraph>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <Text style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                      {news.time}
                    </Text>
                    <Button
                      type="text"
                      size="small"
                      icon={<RightOutlined />}
                      style={{ color: badge.color, fontSize: '12px', padding: '4px 8px' }}
                    >
                      Xem
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Button xem tất cả */}
        <div className="text-center mt-8">
          <Button
            size="large"
            icon={<BellOutlined />}
            style={{
              borderColor: 'var(--primary-color)',
              color: 'var(--primary-color)',
              height: '48px',
              borderRadius: '12px',
              fontWeight: '600',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            Xem tất cả thông báo
          </Button>
        </div>
      </div>

      {/* Motivation Footer Banner */}
      <div className="container mx-auto px-6 mb-8">
        <div
          className="text-center p-8 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #ffa940 100%)',
            color: 'var(--primary-color)',
          }}
        >
          <div className="relative z-10">
            <RocketOutlined style={{ fontSize: '36px', marginBottom: '12px' }} />
            <Title
              level={3}
              style={{
                color: 'var(--primary-color)',
                marginBottom: '8px',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              }}
            >
              Cùng nhau xây dựng tương lai tươi sáng!
            </Title>
            <Paragraph
              style={{ fontSize: '14px', color: 'var(--primary-color)', opacity: 0.8, margin: 0 }}
            >
              "Tuổi trẻ Việt Nam thể hiện khát vọng cống hiến và ý chí vươn lên mạnh mẽ"
            </Paragraph>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-2 left-2 opacity-20">
            <ThunderboltOutlined style={{ fontSize: '16px' }} />
          </div>
          <div className="absolute bottom-2 right-2 opacity-20">
            <StarOutlined style={{ fontSize: '18px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
