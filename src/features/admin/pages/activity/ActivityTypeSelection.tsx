// Activity Type Selection Page
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card } from 'antd';
import {
  CalendarOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const ActivityTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  const activityTypes = [
    {
      key: 'event',
      title: 'Sự kiện',
      description: 'Tạo sự kiện, hội nghị, buổi giao lưu',
      icon: <CalendarOutlined className="text-4xl text-blue-500" />,
      path: '/admin/activity/event',
      color: 'border-blue-500 hover:bg-blue-50',
    },
    {
      key: 'vote',
      title: 'Biểu quyết',
      description: 'Tạo cuộc biểu quyết, khảo sát',
      icon: <CheckSquareOutlined className="text-4xl text-green-500" />,
      path: '/admin/activity/vote',
      color: 'border-green-500 hover:bg-green-50',
    },
    {
      key: 'meeting',
      title: 'Sinh hoạt',
      description: 'Tạo buổi sinh hoạt, cuộc họp',
      icon: <TeamOutlined className="text-4xl text-purple-500" />,
      path: '/admin/activity/meeting',
      color: 'border-purple-500 hover:bg-purple-50',
    },
    {
      key: 'volunteer',
      title: 'Tình nguyện',
      description: 'Tạo hoạt động tình nguyện, chiến dịch',
      icon: <HeartOutlined className="text-4xl text-red-500" />,
      path: '/admin/activity/volunteer',
      color: 'border-red-500 hover:bg-red-50',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tạo hoạt động mới</h1>
          <p className="text-gray-500">Chọn loại hoạt động bạn muốn tạo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activityTypes.map((type) => (
            <Card
              key={type.key}
              hoverable
              className={`border-2 transition-all duration-200 cursor-pointer ${type.color}`}
              onClick={() => navigate({ to: type.path })}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate({ to: '/admin/activity-management' })}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Quay lại danh sách hoạt động
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityTypeSelection;
