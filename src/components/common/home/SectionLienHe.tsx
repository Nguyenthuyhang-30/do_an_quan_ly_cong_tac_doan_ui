import {
  EnvironmentOutlined,
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { useState } from 'react';
import '@features/home/pages/Home.css';

const { Title, Text } = Typography;

const SectionLienHe = () => {
  const [mapError, setMapError] = useState(false);

  return (
    <section className="py-12 px-6 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-12">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl uppercase"
          >
            Liên hệ
          </Title>
        </div>
        <Row gutter={[48, 32]}>
          <Col xs={24} md={16}>
            <div className="h-[200px] relative rounded-lg overflow-hidden shadow-md">
              {!mapError ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.120482672094!2d105.75521357596824!3d20.947676190557228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452eaa9c461c3%3A0x2a3e1c421f299adc!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkOG6oWkgTmFt!5e0!3m2!1svi!2s!4v1759392833432!5m2!1svi!2s"
                  //width="100%"
                  //height="100%"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Google Map - Trường Đại học Đại Nam"
                  aria-label="Bản đồ vị trí Trường Đại học Đại Nam"
                  onError={() => setMapError(true)}
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <EnvironmentOutlined className="text-6xl text-gray-400 mb-4" />
                  <Text className="text-gray-500 text-lg">Không thể tải bản đồ</Text>
                  <Text className="text-gray-400 text-sm mt-2">
                    Vui lòng thử lại sau hoặc kiểm tra kết nối mạng
                  </Text>
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex flex-col justify-center h-full space-y-6">
              <Title level={4} className="mb-4 text-blue-900 font-bold">
                Kết nối với chúng tôi
              </Title>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <FacebookOutlined className="social-icon text-4xl text-blue-600 group-hover:text-blue-700" />
                <Text className="text-base md:text-lg">Facebook: Đoàn TNCS HCM Khoa CNTT</Text>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <YoutubeOutlined className="social-icon text-4xl text-red-600 group-hover:text-red-700" />
                <Text className="text-base md:text-lg">YouTube: Đoàn Khoa CNTT</Text>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <PhoneOutlined className="social-icon text-4xl text-green-500 group-hover:text-green-600" />
                <Text className="text-base md:text-lg">Zalo: 0123456789</Text>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <MailOutlined className="social-icon text-4xl text-orange-500 group-hover:text-orange-600" />
                <Text className="text-base md:text-lg">Email: doan.cntt@dnu.edu.vn</Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SectionLienHe;
