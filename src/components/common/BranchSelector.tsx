// Branch Selector Component
import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import BranchService from '../../services/api/branch.service';
import { BranchSelectOption } from '../../types/youth-union-branch';

interface BranchSelectorProps extends Omit<SelectProps, 'options'> {
  value?: number;
  onChange?: (value: number) => void;
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({ value, onChange, ...props }) => {
  const [branches, setBranches] = useState<BranchSelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await BranchService.getSelect();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      placeholder="Chọn chi đoàn"
      loading={loading}
      value={value}
      onChange={onChange}
      options={branches.map((branch) => ({
        label: `${branch.code} - ${branch.name}`,
        value: branch.id,
      }))}
      showSearch
      filterOption={(input, option) =>
        (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};
