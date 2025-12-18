import ImageWithFallback from '@components/common/ImageWithFallback';
import '@features/home/pages/Home.css';
import { SliderBanner } from '@types/slider-banner';
import { Carousel } from 'antd';

interface HeroSliderProps {
  sliders: SliderBanner[];
}

const HeroSlider = ({ sliders }: HeroSliderProps) => {
  return (
    <div className="w-full">
      <Carousel autoplay autoplaySpeed={3000} effect="fade">
        {sliders?.map((slr, index) => (
          <div key={index}>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[760px]">
              <ImageWithFallback
                src={slr?.image}
                alt={`${slr?.name}`}
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
