import HeroSlider from '@components/common/home/HeroSlider';
import SectionBCH from '@components/common/home/SectionBCH';
import SectionIntro from '@components/common/home/SectionIntro';
import SectionLienHe from '@components/common/home/SectionLienHe';
import SectionTinTuc from '@components/common/home/SectionTinTuc';
import './Home.css';

const Home = () => {
  const sliderImages = [
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/z6444431580748_f1ab91bcffb9a7f6e76457adf30de109_1.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/cwbymy5sb21vpylncihd20220531082533_thump.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/6be2fx40npyas3zpk1tn20240617072237_thump.jpg',
  ];

  const allNews = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    title: `Tin tức số ${
      i + 1
    }: Hoạt động Đoàn thanh niên Khoa Công nghệ thông tin năm 2024 - Chương trình phong phú và ý nghĩa`,
    image: `https://via.placeholder.com/300x200/073B7A/FFFFFF?text=News+${i + 1}`,
    time: `${i + 1} ngày trước`,
  }));

  return (
    <div className="w-full">
      <HeroSlider images={sliderImages} />
      <SectionIntro />
      <SectionBCH />
      {/* <SectionCanBoChiDoan data={branchOfficers} /> */}
      <SectionTinTuc allNews={allNews} />
    </div>
  );
};

export default Home;
