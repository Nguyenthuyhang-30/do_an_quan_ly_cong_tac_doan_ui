import '@features/home/pages/Home.css';
import { Typography } from 'antd';

const { Title } = Typography;

interface Member {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

const organizationData = {
  secretary: {
    id: 1,
    name: 'Lê Văn Phong',
    role: 'Bí thư',
    avatar: '/images/people/bt_lvp.JPG',
  },
  viceSecretaries: [
    {
      id: 2,
      name: 'Lê Tuấn Anh',
      role: 'Phó bí thư',
      avatar: '/images/people/pbt_lta.JPG',
      member: {
        id: 5,
        name: 'Nguyễn Thị Phương',
        role: 'Ủy viên',
        avatar: 'https://i.pravatar.cc/150?img=5',
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
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
    },
    {
      id: 4,
      name: 'Trần Thị Thanh Nhàn',
      role: 'Phó bí thư',
      avatar: '/images/people/pbt_tttn.JPG',
      member: {
        id: 7,
        name: 'Đinh Trọng Quỳnh',
        role: 'Ủy viên',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
    },
  ],
};

const PersonCard = ({ member }: { member: Member }) => {
  return (
    <div className="flex flex-col items-center group transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-full w-24 h-24 lg:w-28 lg:h-28 border-4 border-blue-500 shadow-lg">
        <img
          src={member.avatar || 'https://i.pravatar.cc/150?img=0'}
          alt={member.name}
          className="w-full h-full object-cover object-top-right transition-transform duration-300 group-hover:scale-100"
        />
      </div>

      <div className="mt-3 text-center px-2">
        <p className="font-bold text-blue-900 text-sm md:text-base whitespace-nowrap">
          {member.role}
        </p>
        <p className="text-gray-700 text-xs md:text-sm mt-1 whitespace-nowrap">{member.name}</p>
      </div>
    </div>
  );
};

const SectionBCH = () => {
  return (
    <section className="py-6 sm:py-10 md:py-14 lg:py-16 px-2 sm:px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <Title
            level={2}
            className="section-title text-center text-blue-900 font-bold text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl px-2 sm:px-4"
          >
            BAN CHẤP HÀNH LIÊN CHI ĐOÀN KHOA CÔNG NGHỆ THÔNG TIN
          </Title>
        </div>

        <div className="w-full flex justify-center">
          <style>
            {`
              .org-chart-container {
                width: 100%;
                max-width: 900px;
                display: flex;
                justify-content: center;
                overflow: hidden;
              }
              
              .org-chart-wrapper {
                width: 800px;
                transform-origin: top center;
                transition: transform 0.3s ease;
              }
              
              @media (max-width: 900px) {
                .org-chart-container {
                  height: calc(550px * 0.88);
                }
                .org-chart-wrapper {
                  transform: scale(0.88);
                }
              }
              
              @media (max-width: 768px) {
                .org-chart-container {
                  height: calc(550px * 0.7);
                }
                .org-chart-wrapper {
                  transform: scale(0.7);
                }
              }
              
              @media (max-width: 640px) {
                .org-chart-container {
                  height: calc(550px * 0.55);
                }
                .org-chart-wrapper {
                  transform: scale(0.55);
                }
              }
              
              @media (max-width: 480px) {
                .org-chart-container {
                  height: calc(550px * 0.45);
                }
                .org-chart-wrapper {
                  transform: scale(0.45);
                }
              }
              
              @media (max-width: 400px) {
                .org-chart-container {
                  height: calc(550px * 0.38);
                }
                .org-chart-wrapper {
                  transform: scale(0.38);
                }
              }
              
              @media (max-width: 360px) {
                .org-chart-container {
                  height: calc(550px * 0.35);
                }
                .org-chart-wrapper {
                  transform: scale(0.35);
                }
              }
            `}
          </style>

          <div className="org-chart-container">
            <div className="org-chart-wrapper">
              <div
                className="org-chart relative"
                style={{ width: '800px', minHeight: 'fit-content' }}
              >
                <div className="flex justify-center mb-12 relative z-10">
                  <PersonCard member={organizationData.secretary} />
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-10 mb-12 px-6">
                  {organizationData.viceSecretaries.map((viceSecretary) => (
                    <div key={viceSecretary.id} className="flex justify-center">
                      <PersonCard member={viceSecretary} />
                    </div>
                  ))}
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-10 px-6">
                  {organizationData.viceSecretaries.map((viceSecretary) => (
                    <div key={`member-${viceSecretary.member.id}`} className="flex justify-center">
                      <PersonCard member={viceSecretary.member} />
                    </div>
                  ))}
                </div>

                {/* <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                  style={{ minHeight: 'fit-content' }}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 800 550"
                >
                  <line
                    x1="400"
                    y1="140"
                    x2="400"
                    y2="200"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="133"
                    y1="170"
                    x2="667"
                    y2="170"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="133"
                    y1="170"
                    x2="133"
                    y2="250"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="400"
                    y1="170"
                    x2="400"
                    y2="250"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="667"
                    y1="170"
                    x2="667"
                    y2="250"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="133"
                    y1="380"
                    x2="133"
                    y2="440"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="400"
                    y1="380"
                    x2="400"
                    y2="440"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="667"
                    y1="380"
                    x2="667"
                    y2="440"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBCH;
