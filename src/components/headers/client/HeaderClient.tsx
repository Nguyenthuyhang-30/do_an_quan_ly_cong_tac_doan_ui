import { Avatar, Typography } from 'antd';
import { FlagOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HeaderClient = () => {
  return (
    <header
      className="text-white shadow-xl sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{
        background:
          'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 50%, var(--secondary-color) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
              <StarOutlined
                className="text-lg"
                style={{
                  color: 'var(--accent-color)',
                  filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))',
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <Title
                level={2}
                className="text-lg sm:text-xl lg:text-xl font-bold tracking-tight text-white truncate"
                style={{ margin: 0, color: 'var(--text-white)' }}
              >
                Quản lý công tác Đoàn Thanh Niên
              </Title>

              <div className="flex items-center mt-1 space-x-2 text-xs">
                <span
                  className="inline-flex items-center px-2 py-1 rounded-full font-medium text-xs transition-all duration-300 hover:shadow-md"
                  style={{ backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)' }}
                >
                  <span className="mr-1">⭐</span>
                  <span className="hidden sm:inline">Đoàn TNCS HCM</span>
                  <span className="sm:hidden">Đoàn</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="text-right hidden lg:block">
              <div className="font-semibold text-sm">Lê Tuấn Anh</div>
              <Text
                className="text-xs text-white text-opacity-75"
                style={{ color: 'var(--text-white)' }}
              >
                Bí thư Đoàn khoa
              </Text>
            </div>

            <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105 cursor-pointer">
              <Avatar
                size="default"
                style={{ width: '32px', height: '32px' }}
                icon={<UserOutlined className="text-sm" />}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
