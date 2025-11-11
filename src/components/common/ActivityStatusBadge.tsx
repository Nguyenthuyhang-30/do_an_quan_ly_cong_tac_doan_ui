// Activity Status Badge Component
import { Tag } from 'antd';
import { ActivityStatus } from '../../types/activity';

interface ActivityStatusBadgeProps {
  status?: ActivityStatus;
}

export const ActivityStatusBadge: React.FC<ActivityStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status?: ActivityStatus) => {
    switch (status) {
      case 'planned':
        return { color: 'blue', text: 'Đã lên kế hoạch' };
      case 'ongoing':
        return { color: 'green', text: 'Đang diễn ra' };
      case 'completed':
        return { color: 'default', text: 'Đã hoàn thành' };
      case 'cancelled':
        return { color: 'red', text: 'Đã hủy' };
      default:
        return { color: 'default', text: 'Không xác định' };
    }
  };

  const config = getStatusConfig(status);

  return <Tag color={config.color}>{config.text}</Tag>;
};
