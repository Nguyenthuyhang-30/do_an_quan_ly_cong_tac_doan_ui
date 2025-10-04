import SectionLienHe from '@components/common/home/SectionLienHe';

const Footer = () => {
  return (
    <>
      <SectionLienHe />
      <footer
        className="w-full text-white py-2"
        style={{
          backgroundColor: '#1E3A8A',
          fontFamily:
            'Manrope, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div className="w-full text-right text-lg leading-relaxed pr-6">
          <p>Địa chỉ: 1 P. Xốm, Phú Lâm, Hà Đông, Hà Nội </p>
          <p>Bản quyền thuộc về Liên chi Đoàn Khoa Công nghệ thông tin </p>
          <p>Được sử dụng bởi Liên Chi Đoàn khoa công nghệ thông tin Trường Đại học Đại Nam</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
