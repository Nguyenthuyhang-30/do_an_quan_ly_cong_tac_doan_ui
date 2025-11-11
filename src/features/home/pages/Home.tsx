import HeroSlider from '@components/common/home/HeroSlider';
import SectionBCH from '@components/common/home/SectionBCH';
import SectionIntro from '@components/common/home/SectionIntro';
import SectionLienHe from '@components/common/home/SectionLienHe';
import SectionTinTuc from '@components/common/home/SectionTinTuc';
import BirthdayCard from '@components/common/home/BirthdayCard';
import './Home.css';
import { useEffect, useState } from 'react';
import { fakeNewsApi, type NewsItem } from '../../../api/fakeNewsApi';

const Home = () => {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderImages = [
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/z6444431580748_f1ab91bcffb9a7f6e76457adf30de109_1.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/cwbymy5sb21vpylncihd20220531082533_thump.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/6be2fx40npyas3zpk1tn20240617072237_thump.jpg',
  ];

  useEffect(() => {
    fakeNewsApi()
      .then((data) => setAllNews(data))
      .finally(() => setLoading(false));
  }, []);

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
