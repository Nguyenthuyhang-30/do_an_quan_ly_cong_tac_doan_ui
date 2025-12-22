import React, { useEffect, useRef, useState } from 'react';
import {
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
  HeartOutlined,
  BookOutlined,
  StarOutlined,
} from '@ant-design/icons';
import ImageWithFallback from '@components/common/ImageWithFallback';
import './SectionDevelopmentJourney.scss';

// Component để hiển thị từng chữ một (cho tiêu đề)
interface AnimatedTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  speed = 30,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isVisible, text, delay, speed]);

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {isVisible && displayedText.length < text.length && (
        <span className="typing-cursor">|</span>
      )}
    </span>
  );
};

// Component để hiển thị nội dung từ dưới lên (fade up)
interface FadeUpTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const FadeUpText: React.FC<FadeUpTextProps> = ({
  text,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  return (
    <p
      ref={elementRef}
      className={`${className} ${isVisible ? 'fade-up-visible' : 'fade-up-hidden'}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {text}
    </p>
  );
};

interface JourneyItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  image?: string; // URL hình ảnh (optional)
}

// Component để hiển thị ảnh hoặc icon
interface JourneyImageProps {
  item: JourneyItem;
  size?: 'large' | 'normal';
}

const JourneyImage: React.FC<JourneyImageProps> = ({ item, size = 'normal' }) => {
  const imageClass = size === 'large' ? 'journey-logo-large' : 'journey-logo';
  const containerClass = size === 'large' ? 'journey-image-container-large' : 'journey-image-container';

  if (item.image) {
    return (
      <div className={containerClass}>
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="journey-image"
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

  // Fallback về icon nếu không có ảnh
  return (
    <div className={`${imageClass} ${item.gradient}`}>
      {item.icon}
    </div>
  );
};

const journeyItems: JourneyItem[] = [
  {
    id: 1,
    title: 'Đoàn Thanh niên',
    description:
      'Đoàn Thanh niên Cộng sản Hồ Chí Minh Đại học Đại Nam là tổ chức chính trị - xã hội của thanh niên, là đội dự bị tin cậy của Đảng Cộng sản Việt Nam. Tổ chức Đoàn tại trường luôn phát huy vai trò nòng cốt trong công tác giáo dục, rèn luyện và phát triển toàn diện cho sinh viên. Đoàn Thanh niên Đại học Đại Nam được thành lập và phát triển dưới sự lãnh đạo trực tiếp của Đảng ủy và Ban Giám hiệu nhà trường, luôn là cầu nối quan trọng giữa nhà trường và sinh viên.',
    icon: <TeamOutlined />,
    gradient: 'from-blue-500 to-blue-600',
    image: '/images/thiennguyen.jpg',
  },
  {
    id: 2,
    title: 'Xây dựng tổ chức Đoàn vững mạnh',
    description:
      'Đoàn Thanh niên Đại học Đại Nam không ngừng củng cố và phát triển tổ chức, xây dựng các chi đoàn vững mạnh, nâng cao chất lượng đoàn viên. Tổ chức Đoàn luôn chú trọng công tác phát triển đoàn viên mới, đào tạo cán bộ Đoàn có năng lực, phẩm chất đạo đức tốt. Các hoạt động sinh hoạt chi đoàn, đại hội chi đoàn, bầu cử cán bộ Đoàn được tổ chức thường xuyên, đảm bảo tính dân chủ, công khai, minh bạch.',
    icon: <RocketOutlined />,
    gradient: 'from-purple-500 to-purple-600',
    image: '/images/thiennguyen.jpg',
  },
  {
    id: 3,
    title: 'Giáo dục lý tưởng cách mạng',
    description:
      'Đoàn Thanh niên Đại học Đại Nam tích cực tổ chức các hoạt động giáo dục chính trị, tư tưởng, đạo đức, lối sống cho đoàn viên thanh niên. Thông qua các buổi sinh hoạt chính trị, học tập tư tưởng Hồ Chí Minh, các chương trình giáo dục truyền thống, Đoàn góp phần xây dựng thế hệ trẻ có lý tưởng cách mạng cao đẹp, có đạo đức trong sáng, có lối sống lành mạnh, có ý thức trách nhiệm với bản thân, gia đình và xã hội.',
    icon: <BookOutlined />,
    gradient: 'from-green-500 to-green-600',
    image: '/images/thiennguyen.jpg',
  },
  {
    id: 4,
    title: 'Phát triển kỹ năng và năng lực',
    description:
      'Đoàn Thanh niên Đại học Đại Nam tổ chức nhiều hoạt động phong phú nhằm phát triển kỹ năng mềm, năng lực chuyên môn cho sinh viên. Các chương trình như hội thi, cuộc thi, workshop, talkshow, câu lạc bộ học thuật... giúp sinh viên rèn luyện kỹ năng giao tiếp, làm việc nhóm, tư duy phản biện và khả năng lãnh đạo. Đoàn cũng tạo điều kiện để sinh viên tham gia các hoạt động nghiên cứu khoa học, khởi nghiệp, phát triển tài năng.',
    icon: <TrophyOutlined />,
    gradient: 'from-orange-500 to-orange-600',
    image: '/images/thiennguyen.jpg',
  },
  {
    id: 5,
    title: 'Hoạt động tình nguyện và xã hội',
    description:
      'Đoàn Thanh niên Đại học Đại Nam luôn tích cực tham gia các hoạt động tình nguyện, công tác xã hội, góp phần xây dựng cộng đồng. Các chương trình như hiến máu tình nguyện, tình nguyện mùa hè xanh, hỗ trợ người nghèo, bảo vệ môi trường... thể hiện tinh thần "Đâu cần thanh niên có, đâu khó có thanh niên". Thông qua các hoạt động này, đoàn viên thanh niên được rèn luyện tinh thần tương thân tương ái, ý thức trách nhiệm với cộng đồng, xã hội.',
    icon: <HeartOutlined />,
    gradient: 'from-red-500 to-red-600',
    image: '/images/thiennguyen.jpg',
  },
  {
    id: 6,
    title: 'Phát huy tính tích cực, chủ động, sáng tạo của đoàn viên thanh niên',
    description:
      'Đoàn Thanh niên Đại học Đại Nam khuyến khích và tạo môi trường để đoàn viên thanh niên phát huy tính tích cực, chủ động, sáng tạo trong học tập, nghiên cứu và hoạt động. Tổ chức Đoàn luôn tạo điều kiện để sinh viên đề xuất ý tưởng, thực hiện các dự án sáng tạo, khởi nghiệp, góp phần phát triển bản thân và xã hội. Đoàn cũng tổ chức các cuộc thi sáng tạo, hội thi tài năng, tạo sân chơi lành mạnh để sinh viên thể hiện năng lực, phát huy sở trường của mình.',
    icon: <StarOutlined />,
    gradient: 'from-yellow-500 to-yellow-600',
    image: '/images/thiennguyen.jpg',
  },
];

const SectionDevelopmentJourney = () => {
  return (
    <section className="development-journey-section">
      <div className="journey-container">
        <div className="journey-header">
          <h2 className="journey-title">HÀNH TRÌNH PHÁT TRIỂN CỦA ĐOÀN</h2>
          <h3 className="journey-subtitle">Đoàn Thanh niên Cộng sản Hồ Chí Minh - Đại học Đại Nam</h3>
        </div>

        <div className="journey-content">
          {/* Grid layout 2x2 cho 2 items đầu tiên - So le */}
          <div className="journey-grid-layout">
            {/* Top Left: Logo/Image */}
            <div className="journey-grid-cell journey-logo-cell">
              <JourneyImage item={journeyItems[0]} size="large" />
            </div>

            {/* Top Right: Text block 1 */}
            <div className="journey-grid-cell journey-text-cell journey-text-top">
              <h4 className="journey-item-title">
                <AnimatedText text={journeyItems[0].title} delay={200} speed={50} />
              </h4>
              <FadeUpText
                text={journeyItems[0].description}
                delay={800}
                className="journey-item-description"
              />
            </div>

            {/* Bottom Left: Text block 2 (so le - text bên trái) */}
            <div className="journey-grid-cell journey-text-cell journey-text-bottom">
              <h4 className="journey-item-title">
                <AnimatedText text={journeyItems[1].title} delay={400} speed={50} />
              </h4>
              <FadeUpText
                text={journeyItems[1].description}
                delay={1000}
                className="journey-item-description"
              />
            </div>

            {/* Bottom Right: Image/Icon (so le - ảnh bên phải) */}
            <div className="journey-grid-cell journey-image-cell">
              <JourneyImage item={journeyItems[1]} size="large" />
            </div>
          </div>

          {/* Các items còn lại - Grid layout 2x2 so le cho mỗi 2 items */}
          {journeyItems.slice(2).reduce((acc, item, index) => {
            if (index % 2 === 0) {
              const nextItem = journeyItems.slice(2)[index + 1];
              const isEvenGrid = (index / 2) % 2 === 0; // Grid chẵn hay lẻ
              
              acc.push(
                <div key={`grid-${index}`} className="journey-grid-layout">
                  {isEvenGrid ? (
                    // Layout so le: ảnh trái trên, text phải trên, text trái dưới, ảnh phải dưới
                    <>
                      {/* Top Left: Logo/Image */}
                      <div className="journey-grid-cell journey-logo-cell">
                        <JourneyImage item={item} size="large" />
                      </div>

                      {/* Top Right: Text block */}
                      <div className="journey-grid-cell journey-text-cell journey-text-top">
                        <h4 className="journey-item-title">
                          <AnimatedText
                            text={item.title}
                            delay={200 + index * 100}
                            speed={50}
                          />
                        </h4>
                        <FadeUpText
                          text={item.description}
                          delay={800 + index * 100}
                          className="journey-item-description"
                        />
                      </div>

                      {/* Bottom Left: Text block */}
                      {nextItem && (
                        <div className="journey-grid-cell journey-text-cell journey-text-bottom">
                          <h4 className="journey-item-title">
                            <AnimatedText
                              text={nextItem.title}
                              delay={400 + index * 100}
                              speed={50}
                            />
                          </h4>
                          <FadeUpText
                            text={nextItem.description}
                            delay={1000 + index * 100}
                            className="journey-item-description"
                          />
                        </div>
                      )}

                      {/* Bottom Right: Image/Icon */}
                      {nextItem && (
                        <div className="journey-grid-cell journey-image-cell">
                          <JourneyImage item={nextItem} size="large" />
                        </div>
                      )}
                    </>
                  ) : (
                    // Layout so le ngược: text trái trên, ảnh phải trên, ảnh trái dưới, text phải dưới
                    <>
                      {/* Top Left: Text block */}
                      <div className="journey-grid-cell journey-text-cell journey-text-top">
                        <h4 className="journey-item-title">
                          <AnimatedText
                            text={item.title}
                            delay={200 + index * 100}
                            speed={50}
                          />
                        </h4>
                        <FadeUpText
                          text={item.description}
                          delay={800 + index * 100}
                          className="journey-item-description"
                        />
                      </div>

                      {/* Top Right: Logo/Image */}
                      <div className="journey-grid-cell journey-logo-cell">
                        <JourneyImage item={item} size="large" />
                      </div>

                      {/* Bottom Left: Image/Icon */}
                      {nextItem && (
                        <div className="journey-grid-cell journey-image-cell">
                          <JourneyImage item={nextItem} size="large" />
                        </div>
                      )}

                      {/* Bottom Right: Text block */}
                      {nextItem && (
                        <div className="journey-grid-cell journey-text-cell journey-text-bottom">
                          <h4 className="journey-item-title">
                            <AnimatedText
                              text={nextItem.title}
                              delay={400 + index * 100}
                              speed={50}
                            />
                          </h4>
                          <FadeUpText
                            text={nextItem.description}
                            delay={1000 + index * 100}
                            className="journey-item-description"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>,
              );
            }
            return acc;
          }, [] as React.ReactNode[])}
        </div>
      </div>
    </section>
  );
};

export default SectionDevelopmentJourney;
