import { PictureOutlined } from '@ant-design/icons';
import { Skeleton, Typography } from 'antd';
import { useState, useEffect } from 'react';

const { Text } = Typography;

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  showErrorMessage?: boolean;
}

const ImageWithFallback = ({
  src,
  alt,
  fallback = '/images/news/fallback.png',
  className = '',
  style = {},
  showErrorMessage = true,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      setLoading(true);
      setError(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Skeleton.Image
            active
            className="!w-full !h-full"
            style={{ width: '100%', height: '100%' }}
          />
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
        onError={handleError}
        onLoad={handleLoad}
        aria-label={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loading || error ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{
          ...style,
          display: 'block',
        }}
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithFallback;
