export interface NewsItem {
  id: number;
  title: string;
  image: string;
  time: string;
  summary: string;
  category: string;
  author: string;
}

export const fakeNewsApi = async (): Promise<NewsItem[]> => {
  await new Promise((r) => setTimeout(r, 400));

  const base: NewsItem[] = [
    {
      id: 1,
      title: 'Khai mạc Chiến dịch Mùa hè xanh 2025 – Sức trẻ Đại Nam ra quân!',
      image: '/images/news/news1.jpg', // Thay thế link ảnh
      time: '1 ngày trước',
      summary:
        'Hơn 300 đoàn viên khoa CNTT tham gia lễ ra quân Chiến dịch Mùa hè xanh 2025 với tinh thần nhiệt huyết, lan tỏa tinh thần tình nguyện vì cộng đồng.',
      category: 'Hoạt động tình nguyện',
      author: 'Ban Truyền thông LCĐ CNTT',
    },
    {
      id: 2,
      title: 'Tọa đàm: Thanh niên và Chuyển đổi số trong kỷ nguyên AI',
      image: '/images/news/news2.jpg', // Thay thế link ảnh
      time: '2 ngày trước',
      summary:
        'Buổi tọa đàm thu hút hơn 200 sinh viên tham dự, cùng thảo luận về vai trò của AI và chuyển đổi số trong giáo dục và cuộc sống hiện đại.',
      category: 'Chuyển đổi số',
      author: 'BCH LCĐ CNTT',
    },
    {
      id: 3,
      title: 'Đại hội Liên Chi Đoàn Khoa CNTT nhiệm kỳ 2024 – 2026',
      image: '/images/news/news3.jpg', // Thay thế link ảnh
      time: '3 ngày trước',
      summary:
        'Đại hội đã bầu ra Ban Chấp hành mới gồm 15 đồng chí, tiếp tục sứ mệnh dẫn dắt phong trào Đoàn khoa CNTT ngày càng vững mạnh.',
      category: 'Tổ chức Đoàn',
      author: 'LCĐ CNTT',
    },
    {
      id: 4,
      title: 'Sinh viên CNTT đạt giải Nhì cuộc thi “Sinh viên với khởi nghiệp số”',
      image: '/images/news/news4.jpg', // Thay thế link ảnh
      time: '4 ngày trước',
      summary:
        'Dự án “AI4Students” của nhóm sinh viên CNTT Đại Nam giành giải Nhì cuộc thi khởi nghiệp toàn quốc 2025.',
      category: 'Khởi nghiệp - Sáng tạo',
      author: 'Phòng Công tác Sinh viên',
    },
    {
      id: 5,
      title: 'Ngày hội Hiến máu nhân đạo “Giọt hồng Đại Nam 2025”',
      image: '/images/news/news5.jpg', // Thay thế link ảnh
      time: '5 ngày trước',
      summary:
        'Hơn 500 đơn vị máu được quyên góp trong ngày hội, thể hiện tinh thần nhân ái và trách nhiệm xã hội của tuổi trẻ Đại Nam.',
      category: 'Tình nguyện',
      author: 'Đoàn Trường Đại Nam',
    },
    {
      id: 6,
      title: 'Lớp cảm tình Đoàn – Bồi dưỡng lý tưởng cách mạng cho sinh viên',
      image: '/images/news/news6.jpg', // Thay thế link ảnh
      time: '6 ngày trước',
      summary:
        'Chương trình giúp hơn 120 sinh viên hiểu rõ hơn về lịch sử Đoàn TNCS Hồ Chí Minh và định hướng phấn đấu trở thành đoàn viên ưu tú.',
      category: 'Giáo dục chính trị',
      author: 'Ban Tổ chức Đoàn Trường',
    },
    {
      id: 7,
      title: 'Cuộc thi “Thiết kế Poster An toàn mạng” thu hút đông đảo sinh viên',
      image: '/images/news/news7.jpg', // Thay thế link ảnh
      time: '7 ngày trước',
      summary:
        'Sinh viên thể hiện hiểu biết về bảo mật thông tin và kỹ năng truyền thông qua những thiết kế sáng tạo và ý nghĩa.',
      category: 'Cuộc thi học thuật',
      author: 'LCĐ CNTT',
    },
    {
      id: 8,
      title: 'Giao lưu thể thao “Kết nối đoàn viên – Lan tỏa năng lượng tích cực”',
      image: '/images/news/news8.jpg', // Thay thế link ảnh
      time: '8 ngày trước',
      summary:
        'Giải bóng đá và kéo co giao hữu giữa các chi đoàn đã tạo nên bầu không khí sôi nổi, tăng tinh thần đoàn kết trong sinh viên.',
      category: 'Thể thao & văn nghệ',
      author: 'Đoàn Khoa CNTT',
    },
  ];

  // sinh thêm 8 tin “trang 2”
  const more = Array.from({ length: 8 }, (_, idx) => ({
    ...base[idx % base.length],
    id: base.length + idx + 1,
    title: [
      'Ngày hội Việc làm Công nghệ thông tin 2025 – Cầu nối giữa sinh viên và doanh nghiệp',
      'Workshop “Kỹ năng phỏng vấn và viết CV công nghệ”',
      'Đêm nhạc Sinh viên Đại Nam – Giai điệu tuổi trẻ',
      'Sinh viên CNTT tình nguyện hỗ trợ thi tốt nghiệp THPT 2025',
      'Ra mắt Câu lạc bộ An toàn thông tin DNU-SEC',
      'Hội thao chào mừng 26/3 – Khỏe để học tập và cống hiến',
      'Đoàn viên DNU tham gia Dự án “Trồng cây xanh vì môi trường”',
      'Lễ kỷ niệm 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931–2025)',
    ][idx],
    image: [
      '/images/news/news9.jpg',
      '/images/news/news10.jpg',
      '/images/news/news11.jpg',
      '/images/news/news12.jpg',
      '/images/news/news13.jpg',
      '/images/news/news14.jpg',
      '/images/news/news15.jpg',
      '/images/news/news16.jpg',
    ][idx],
    time: `${idx + 9} ngày trước`,
    summary: [
      'Ngày hội thu hút 30 doanh nghiệp CNTT cùng 500 sinh viên tham gia tìm hiểu cơ hội nghề nghiệp.',
      'Buổi workshop giúp sinh viên chuẩn bị hành trang phỏng vấn, với sự chia sẻ từ các chuyên gia nhân sự FPT.',
      'Đêm nhạc hội tụ hơn 100 tiết mục do sinh viên tự dàn dựng, lan tỏa năng lượng tuổi trẻ.',
      '40 bạn sinh viên Đại Nam tham gia hỗ trợ coi thi, hướng dẫn thí sinh tại các điểm thi Hà Nội.',
      'CLB DNU-SEC ra mắt nhằm nâng cao nhận thức về an toàn mạng cho sinh viên CNTT.',
      'Giải chạy, cầu lông và bóng đá chào mừng 26/3 thu hút đông đảo đoàn viên tham gia.',
      'Dự án “Trồng cây xanh vì môi trường” đạt 500 cây tại khuôn viên trường và địa bàn quận Hà Đông.',
      'Buổi lễ kỷ niệm diễn ra long trọng, ôn lại truyền thống vẻ vang của tổ chức Đoàn qua 94 năm.',
    ][idx],
    category: 'Hoạt động Đoàn',
    author: 'LCĐ Khoa CNTT',
  }));

  return [...base, ...more];
};
