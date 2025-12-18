// Cohort Selector Component
import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import cohortService from '../../services/api/cohort.service';
import type { CohortSelectOption } from '../../app-types/general-category/cohort';

interface CohortSelectorProps extends Omit<SelectProps, 'options'> {
  value?: number;
  onChange?: (value: number) => void;
}

export const CohortSelector: React.FC<CohortSelectorProps> = ({ value, onChange, ...props }) => {
  const [cohorts, setCohorts] = useState<CohortSelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async () => {
    try {
      setLoading(true);
      const response = await cohortService.getSelect();
      if (response.success && response.data) {
        setCohorts(response.data);
      }
    } catch (error) {
      console.error('Error fetching cohorts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      placeholder="Chọn khóa học"
      loading={loading}
      value={value}
      onChange={onChange}
      options={cohorts.map((cohort) => ({
        label: `${cohort.code} - ${cohort.name}`,
        value: cohort.id,
      }))}
      showSearch
      filterOption={(input, option) =>
        (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};
