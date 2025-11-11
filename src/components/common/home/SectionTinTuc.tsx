import { useEffect, useState } from 'react';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import ImageWithFallback from '@components/common/ImageWithFallback';
import '@features/home/pages/Home.css';

const { Title, Text } = Typography;

export interface NewsData {
  id: number;
  title: string;
  image: string;
  time: string;
}

interface SectionTinTucProps {
  allNews: NewsData[];
  loading?: boolean;
}

const PAGE_SIZE = 8;

const SectionTinTuc: React.FC<SectionTinTucProps> = ({ allNews, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const total = allNews?.length ?? 0;
  const pageSize = PAGE_SIZE;

  // Mỗi lần data tin tức thay đổi -> quay lại trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [total]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentNews = allNews.slice(startIndex, startIndex + pageSize);

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center mb-12">
          <p className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl uppercase">
            Tin tức
          </p>
        </div>

        {/* Loading state */}
        {loading && <div className="text-center text-gray-500 py-10">Đang tải tin tức...</div>}

        {/* Không có tin */}
        {!loading && total === 0 && (
          <div className="text-center text-gray-400 py-10">Hiện chưa có tin tức nào.</div>
        )}

        {/* Grid tin tức */}
        {!loading && total > 0 && (
          <>
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
                total={total}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SectionTinTuc;
