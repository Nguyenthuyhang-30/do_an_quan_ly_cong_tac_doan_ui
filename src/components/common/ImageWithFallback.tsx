import { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Skeleton, Typography } from 'antd';

const { Text } = Typography;

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  showErrorMessage?: boolean;
}

/**
 * Component hiển thị ảnh với khả năng fallback khi lỗi
 * - Hiển thị skeleton loading trong khi ảnh đang tải
 * - Tự động chuyển sang ảnh fallback nếu ảnh gốc lỗi
 * - Hiển thị thông báo lỗi nếu cả ảnh gốc và fallback đều lỗi
 */
const ImageWithFallback = ({
  src,
  alt,
  fallback = 'https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=No+Image',
  className = '',
  style = {},
  showErrorMessage = true,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallback) {
      // Thử load ảnh fallback
      setImgSrc(fallback);
      setLoading(true);
      setError(false);
    } else {
      // Cả ảnh gốc và fallback đều lỗi
      setError(true);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  return (
    <div className="relative w-full h-full">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      {error && showErrorMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <PictureOutlined className="text-4xl text-gray-400 mb-2" />
          <Text className="text-gray-400 text-sm">Không thể tải ảnh</Text>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        style={{ ...style, display: loading || error ? 'none' : 'block' }}
        onError={handleError}
        onLoad={handleLoad}
        aria-label={alt}
      />
    </div>
  );
};

export default ImageWithFallback;
