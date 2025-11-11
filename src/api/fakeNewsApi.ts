// src/api/fakeNewsApi.ts
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
      image:
        'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/580052522_1267561942065527_3515977699671117202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFCKOlBx7OlIyi7tncAp8F8QGvE2HTPpj1Aa8TYdM-mPZK1e4ntsoq7UYI68j9EEK_vPV2huglpzdfAltEDtrTG&_nc_ohc=kuXFvmVTJ-QQ7kNvwGuXfLB&_nc_oc=AdnyXjb1Z6-U3U7IzSjHRXoTnd_3iDt9_n2lWN_QkrylMecY9OnXlhIGWOl3GhT-aS0&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=51cmBtBHAozBKS-TkeZkqg&oh=00_Afg064olAdm6u5cBby0M-iPSROiIRNmdjY5RyZrT2nX9aQ&oe=6918F8CF',
      time: '1 ngày trước',
      summary:
        'Hơn 300 đoàn viên khoa CNTT tham gia lễ ra quân Chiến dịch Mùa hè xanh 2025 với tinh thần nhiệt huyết, lan tỏa tinh thần tình nguyện vì cộng đồng.',
      category: 'Hoạt động tình nguyện',
      author: 'Ban Truyền thông LCĐ CNTT',
    },
    {
      id: 2,
      title: 'Tọa đàm: Thanh niên và Chuyển đổi số trong kỷ nguyên AI',
      image:
        'https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/576438892_1263901355764919_5618202268933459441_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFtHgD0a2QO2a_l_8FYqsod8d6YQGkpCpTx3phAaSkKlPQsLz2mfbuaEhy-m4TxFug84acYWSR4zvOup3v7Hld2&_nc_ohc=1obSEaKGwUAQ7kNvwEXLAJr&_nc_oc=AdlhjN67uwzkJhAKwHXnFXLFthnQkUv_JX295z4Hdv0iO4zlNP8wj8gxHnW8FEiE6oA&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=a9gjlxy4DtPrmIxUgcNSuA&oh=00_AfiohZtwpaUrWVFTNrxOs_XPHoUV_3lt49mSzi0DInNhAw&oe=6918EAAB',
      time: '2 ngày trước',
      summary:
        'Buổi tọa đàm thu hút hơn 200 sinh viên tham dự, cùng thảo luận về vai trò của AI và chuyển đổi số trong giáo dục và cuộc sống hiện đại.',
      category: 'Chuyển đổi số',
      author: 'BCH LCĐ CNTT',
    },
    {
      id: 3,
      title: 'Đại hội Liên Chi Đoàn Khoa CNTT nhiệm kỳ 2024 – 2026',
      image:
        'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/555638148_1225888656232856_7179764564144775687_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFILAlvJlyz7f-XyyQ4EgYMnHiJzSqV3RSceInNKpXdFB8BIgCk36PWFiI5x_zscQ_275w-rFt_PdDspNeorfHg&_nc_ohc=t3Wd0UFbq4MQ7kNvwFVnuNP&_nc_oc=AdmQ05oQMfcScPS-JQ9guGv6W2Pb9RtCUxnE-R9LJeqZbfukXb4oUlO8QYF-Xta5o-Q&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=-YXfwCahAX1r2dNzHDBVKg&oh=00_AfjQKZeYcSVWA0Qx2SGxpb_3gcFMjfs2rOocS1kT6TOB_g&oe=6918D57A',
      time: '3 ngày trước',
      summary:
        'Đại hội đã bầu ra Ban Chấp hành mới gồm 15 đồng chí, tiếp tục sứ mệnh dẫn dắt phong trào Đoàn khoa CNTT ngày càng vững mạnh.',
      category: 'Tổ chức Đoàn',
      author: 'LCĐ CNTT',
    },
    {
      id: 4,
      title: 'Sinh viên CNTT đạt giải Nhì cuộc thi “Sinh viên với khởi nghiệp số”',
      image:
        'https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/571304772_1254240040064384_7429635654155292144_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEXymS0-MHppq-dJY6y0UbidNYsq8DVsxp01iyrwNWzGnpUVJEdhfXyskoqG0bmwSXZ6elFixYZvdipFLDtSSCp&_nc_ohc=mjGevyVoXRwQ7kNvwHS24tD&_nc_oc=Adm9t9tb4DCFEqHLli44LerY5Zc1fREe3A53PxfhhJzWu0RTj0okm8OnffiDU7o_vJg&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=9Yp1HyEcYB5x-H4u-x2-FA&oh=00_AfiwbMjksEM3U7rNT9icc0iInzI8ebduIPpoJrFSZyqdFw&oe=6918E3E3',
      time: '4 ngày trước',
      summary:
        'Dự án “AI4Students” của nhóm sinh viên CNTT Đại Nam giành giải Nhì cuộc thi khởi nghiệp toàn quốc 2025.',
      category: 'Khởi nghiệp - Sáng tạo',
      author: 'Phòng Công tác Sinh viên',
    },
    {
      id: 5,
      title: 'Ngày hội Hiến máu nhân đạo “Giọt hồng Đại Nam 2025”',
      image:
        'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/559146792_1236893271799061_1211861972134518493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH1i_AUoMImZDLB0wC2k8GFuoJm0TYGuf26gmbRNga5_atuY09UVPByAgbBBDkRJ9xrI9m62hzbv114w62fQOGa&_nc_ohc=87C31CuD-VsQ7kNvwGlZpH6&_nc_oc=AdkxKTuS2dx2jbrSxClnIq6pu6I4uhqMw3BMVIv_bpeK6aK9udgCCNs4Cd_wH9oMnxk&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=y4uoWEuCyogmAdawPgn9yA&oh=00_AfjU80Xn93nLoX1cWD4HelYKLVmrb81mENjMKORQshLK-g&oe=6918D9B3',
      time: '5 ngày trước',
      summary:
        'Hơn 500 đơn vị máu được quyên góp trong ngày hội, thể hiện tinh thần nhân ái và trách nhiệm xã hội của tuổi trẻ Đại Nam.',
      category: 'Tình nguyện',
      author: 'Đoàn Trường Đại Nam',
    },
    {
      id: 6,
      title: 'Lớp cảm tình Đoàn – Bồi dưỡng lý tưởng cách mạng cho sinh viên',
      image:
        'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/557730323_1235969371891451_6055908503586743134_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGPVzsBJq7INRLktte0WsmMmUXDq1T8IyOZRcOrVPwjI8JcgNEbd0ctk-yxR1QIf_aY1u06Awa5zWJ3D3Sk2Dq9&_nc_ohc=THL7CD2srHEQ7kNvwHGUQca&_nc_oc=AdmF8OIR5Q0A5gLTxGkegqSmhlCew1Ne8eCw9rn0zf-uGT2uD37XKCwRlH_rKGZu5BI&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=r0l045G4JlULIN4LS0PV1A&oh=00_AfguuwbY_WbOeNJdyC4-zN5SMV1y_rPEcYkSENgBKg-3FA&oe=6918E272',
      time: '6 ngày trước',
      summary:
        'Chương trình giúp hơn 120 sinh viên hiểu rõ hơn về lịch sử Đoàn TNCS Hồ Chí Minh và định hướng phấn đấu trở thành đoàn viên ưu tú.',
      category: 'Giáo dục chính trị',
      author: 'Ban Tổ chức Đoàn Trường',
    },
    {
      id: 7,
      title: 'Cuộc thi “Thiết kế Poster An toàn mạng” thu hút đông đảo sinh viên',
      image:
        'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/555631666_1227111249443930_7728343643071876540_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGH9rwWJYedFNzjBJMUKPKk91i2JJ20JEv3WLYknbQkS4jPbGW7O9m7FUA2vZFsvsg-DKUVRDaYiLbgH4OFi8_O&_nc_ohc=Z7_F0P675FMQ7kNvwF8YbXX&_nc_oc=AdkNu9Aa4LpyXgg6sj60tQ4rs9pGqr4eZYZaon5Upm6dYjOZAQPjbjsW5NZE8wmoNJs&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=5m8CBseuimbPIUjTyKiiPw&oh=00_AfgieaoEMU_hyjM9cAD58lqjLsXD9qG78KF4svN1GrltJA&oe=6918D063',
      time: '7 ngày trước',
      summary:
        'Sinh viên thể hiện hiểu biết về bảo mật thông tin và kỹ năng truyền thông qua những thiết kế sáng tạo và ý nghĩa.',
      category: 'Cuộc thi học thuật',
      author: 'LCĐ CNTT',
    },
    {
      id: 8,
      title: 'Giao lưu thể thao “Kết nối đoàn viên – Lan tỏa năng lượng tích cực”',
      image:
        'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/554906749_1226667962821592_6399463567374962157_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE_hx8UCLa016pGJmJxNbbqgrakcxajhUmCtqRzFqOFSZZ7tH1kDRa3ddMOtrfNSGgFSIl2zjPZ8Q3WpHaJukoc&_nc_ohc=BAAyLDAQQlkQ7kNvwHND_JX&_nc_oc=AdlkWI2jEg1RP04uDyxW2N6gfcCQLEf_PImHU6J_BNdqOJ_BZRExKsJKm63_BGURVic&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=fVyrb_NNt-35IKstoIHcRw&oh=00_AfgHfDGjByJc6cHy_82t3sKVfOyx0KST3nFw0Efj0zo0ag&oe=6918DFF4',
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
      'https://cdnphoto.dantri.com.vn/x7iyAok5vKzWzADpDi8l3UAgsh0=/thumb_w/1020/2024/03/26/ngay-hoi-viec-lam-2024-1711433412680.jpeg',
      'https://vnn-imgs-f.vgcloud.vn/2022/09/29/15/ky-nang-phong-van-viet-cv.jpg',
      'https://cdn.tuoitre.vn/47158475281733632/2024/3/22/dem-nhac-sinh-vien-2024-17110939183011619429271.jpg',
      'https://nhandan.vn/fileadmin/user_upload/2023/06/28/1-tinhnguyen-1687945413620.jpeg',
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2024/4/14/1375659/CLB-An-Toan-Thong-Tin.jpg',
      'https://baoninhthuan.com.vn/Upload/2024/3/26/26-3-hoi-thao-26-3.jpg',
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/9/19/1225573/Trong-Cay-Xanh-1.jpg',
      'https://cdnmedia.baotintuc.vn/Upload/2025/3/26/26-3-doan-tn.jpg',
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
