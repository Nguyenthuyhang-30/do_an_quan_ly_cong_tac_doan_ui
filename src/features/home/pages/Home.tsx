import BirthdayCard from '@components/common/home/BirthdayCard';
import HeroSlider from '@components/common/home/HeroSlider';
import SectionBCH from '@components/common/home/SectionBCH';
import SectionIntro from '@components/common/home/SectionIntro';
import SectionTinTuc from '@components/common/home/SectionTinTuc';
import { useEffect, useState } from 'react';
import { fakeNewsApi, type NewsItem } from '../../../api/fakeNewsApi';
import { sliderBannerService } from '../../../services/api/slider-banner.service';
import type { SliderBanner } from '../../../types/slider-banner';
import './Home.css';

const Home = () => {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState<SliderBanner[]>([]);
  const [slidersLoading, setSlidersLoading] = useState(true);

  // Fallback slider images nếu API không có data
  const fallbackSliderImages = [
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/z6444431580748_f1ab91bcffb9a7f6e76457adf30de109_1.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/cwbymy5sb21vpylncihd20220531082533_thump.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/6be2fx40npyas3zpk1tn20240617072237_thump.jpg',
  ];

  // Load sliders from API
  useEffect(() => {
    const loadSliders = async () => {
      try {
        setSlidersLoading(true);
        const data = await sliderBannerService.getHomeSliders({ limit: 5 });
        setSliders(data);
      } catch (error) {
        console.error('Failed to load sliders:', error);
        // Keep using fallback images on error
      } finally {
        setSlidersLoading(false);
      }
    };

    loadSliders();
  }, []);

  useEffect(() => {
    fakeNewsApi()
      .then((data) => setAllNews(data))
      .finally(() => setLoading(false));
  }, []);

  // Get slider images - use API data if available, otherwise use fallback
  const sliderImages =
    sliders.length > 0 ? sliders.map((slider) => slider.image) : fallbackSliderImages;

  return (
    <div className="w-full">
      <BirthdayCard />
      <HeroSlider images={sliderImages} />
      <SectionIntro />
      <SectionBCH />
      <SectionTinTuc allNews={allNews} loading={loading} />
    </div>
  );
};

export default Home;
