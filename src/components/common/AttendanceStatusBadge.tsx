// Attendance Status Badge Component
import { Tag } from 'antd';
import { AttendanceStatus } from '../../app-types/activity';

interface AttendanceStatusBadgeProps {
  status?: AttendanceStatus;
}

export const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status?: AttendanceStatus) => {
    switch (status) {
      case 'registered':
        return { color: 'blue', text: 'Đã đăng ký' };
      case 'attended':
        return { color: 'green', text: 'Có mặt' };
      case 'absent':
        return { color: 'red', text: 'Vắng mặt' };
      case 'late':
        return { color: 'orange', text: 'Đi trễ' };
      default:
        return { color: 'default', text: 'Chưa xác định' };
    }
  };

  const config = getStatusConfig(status);

  return <Tag color={config.color}>{config.text}</Tag>;
};
