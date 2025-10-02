import '@features/home/pages/Home.css';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const SectionIntro = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-center mb-8">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl"
          >
            Giới thiệu về Đoàn Thanh Niên Khoa CNTT
          </Title>
        </div>
        <Paragraph className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
          Đoàn Thanh Niên Khoa Công nghệ Thông tin là tổ chức chính trị - xã hội của thanh niên Việt
          Nam, do Đảng Cộng sản Việt Nam sáng lập, lãnh đạo và rèn luyện, là đội dự bị tin cậy của
          Đảng. Đoàn Thanh Niên Khoa CNTT tập hợp đông đảo các bạn sinh viên có lý tưởng và khát
          vọng cống hiến, phấn đấu vì mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
          Với phương châm "Đoàn kết - Sáng tạo - Tình nguyện - Phát triển", Đoàn Thanh Niên Khoa
          CNTT không ngừng nỗ lực để trở thành môi trường rèn luyện, phát triển toàn diện cho mỗi
          đoàn viên, thanh niên.
        </Paragraph>
      </div>
    </section>
  );
};

export default SectionIntro;
