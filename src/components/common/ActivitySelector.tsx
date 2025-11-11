// Activity Selector Component
import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import ActivityService from '../../services/api/activity.service';
import { ActivitySelectOption } from '../../types/activity';

interface ActivitySelectorProps extends Omit<SelectProps, 'options'> {
  value?: number;
  onChange?: (value: number) => void;
}

export const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [activities, setActivities] = useState<ActivitySelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await ActivityService.getSelect();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      placeholder="Chọn hoạt động"
      loading={loading}
      value={value}
      onChange={onChange}
      options={activities.map((activity) => ({
        label: `${activity.code} - ${activity.name}`,
        value: activity.id,
      }))}
      showSearch
      filterOption={(input, option) =>
        (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};
