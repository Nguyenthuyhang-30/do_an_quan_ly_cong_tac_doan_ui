import ImageWithFallback from '@components/common/ImageWithFallback';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import { useState } from 'react';
import '@features/home/pages/Home.css';

const { Title, Text } = Typography;

interface NewsData {
  id: number;
  title: string;
  image: string;
  time: string;
}

interface SectionTinTucProps {
  allNews: NewsData[];
}

const SectionTinTuc = ({ allNews }: SectionTinTucProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNews = allNews.slice(startIndex, endIndex);

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center mb-12">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl uppercase"
          >
            Tin tức
          </Title>
        </div>
        <Row gutter={[24, 24]}>
          {currentNews.map((news) => (
            <Col xs={24} sm={12} md={12} lg={6} key={news.id}>
              <Card
                hoverable
                cover={
                  <div className="h-[200px] overflow-hidden">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                }
                className="h-full shadow-md news-card-hover"
              >
                <Title
                  level={5}
                  className="mb-2"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '48px',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                  aria-label={news.title}
                >
                  {news.title}
                </Title>
                <Text type="secondary" className="text-sm">
                  {news.time}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={allNews.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionTinTuc;
