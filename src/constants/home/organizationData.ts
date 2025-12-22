export const organizationData = {
  secretary: {
    id: 1,
    name: 'Lê Văn Phong',
    role: 'Bí thư',
    avatar: '/images/people/bt_lvp.JPG',
    quote: 'Xin chào!',
  },
  viceSecretaries: [
    {
      id: 2,
      name: 'Lê Tuấn Anh',
      role: 'Phó bí thư',
      avatar: '/images/people/pbt_lta.JPG',
      quote: 'Chừng nào bạn còn thua chứng tỏ bạn thua chưa đủ!',
      member: {
        id: 5,
        name: 'Nguyễn Thị Phương',
        role: 'Ủy viên',
        avatar: '/images/people/uv_ntp.JPG',
      },
    },
    {
      id: 3,
      name: 'Nguyễn Thái Khánh',
      role: 'Phó bí thư',
      avatar: '/images/people/pbt_ntk.JPG',
      member: {
        id: 6,
        name: 'Lê Thị Vân Anh',
        role: 'Ủy viên',
        avatar: '/images/people/uv_ltva.JPG',
      },
    },
    {
      id: 4,
      name: 'Trần Thị Thanh Nhàn',
      role: 'Phó bí thư',
      avatar: '/images/people/pbt_tttn.JPG',
      member: {
        id: 7,
        name: 'Nguyễn Thị Kim Hoa',
        role: 'Ủy viên',
        avatar: '/images/people/uv_ntkh.JPG',
      },
    },
  ],
};
