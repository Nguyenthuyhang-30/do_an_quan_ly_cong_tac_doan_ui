import HeroSlider from '@components/common/home/HeroSlider';
import SectionBCH from '@components/common/home/SectionBCH';
import SectionCanBoChiDoan from '@components/common/home/SectionCanBoChiDoan';
import SectionIntro from '@components/common/home/SectionIntro';
import SectionTinTuc from '@components/common/home/SectionTinTuc';
import './Home.css';
import SectionLienHe from '@components/common/home/SectionLienHe';

const Home = () => {
  const sliderImages = [
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/z6444431580748_f1ab91bcffb9a7f6e76457adf30de109_1.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/cwbymy5sb21vpylncihd20220531082533_thump.jpg',
    'https://atm273446-s3user.vcos.cloudstorage.com.vn/dhdainam/asset/images/majors/6be2fx40npyas3zpk1tn20240617072237_thump.jpg',
  ];

  const executiveBoard = [
    { key: 1, stt: 1, name: 'Nguyễn Văn A', role: 'Bí thư' },
    { key: 2, stt: 2, name: 'Trần Thị B', role: 'Phó Bí thư' },
    { key: 3, stt: 3, name: 'Lê Văn C', role: 'Ủy viên' },
    { key: 4, stt: 4, name: 'Phạm Thị D', role: 'Ủy viên' },
    { key: 5, stt: 5, name: 'Hoàng Văn E', role: 'Ủy viên' },
  ];

  const branchOfficers = [
    { key: 1, stt: 1, class: 'CNTT K15A', name: 'Nguyễn Văn F', role: 'Bí thư' },
    { key: 2, stt: 2, class: 'CNTT K15B', name: 'Trần Thị G', role: 'Phó Bí thư' },
    { key: 3, stt: 3, class: 'CNTT K16A', name: 'Lê Văn H', role: 'Bí thư' },
    { key: 4, stt: 4, class: 'CNTT K16B', name: 'Phạm Thị I', role: 'Phó Bí thư' },
    { key: 5, stt: 5, class: 'CNTT K17A', name: 'Hoàng Văn J', role: 'Bí thư' },
    { key: 6, stt: 6, class: 'CNTT K17B', name: 'Vũ Thị K', role: 'Ủy viên' },
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
      <SectionBCH data={executiveBoard} />
      <SectionCanBoChiDoan data={branchOfficers} />
      <SectionTinTuc allNews={allNews} />
      <SectionLienHe />
    </div>
  );
};

export default Home;
