import ImageWithFallback from '@components/common/ImageWithFallback';
import '@features/home/pages/Home.css';
import { Carousel } from 'antd';

interface HeroSliderProps {
  images: string[];
}

const HeroSlider = ({ images }: HeroSliderProps) => {
  return (
    <div className="w-full">
      <Carousel autoplay autoplaySpeed={3000} effect="fade">
        {images.map((img, index) => (
          <div key={index}>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[760px]">
              <ImageWithFallback
                src={img}
                alt={`Slider ${index + 1}`}
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
