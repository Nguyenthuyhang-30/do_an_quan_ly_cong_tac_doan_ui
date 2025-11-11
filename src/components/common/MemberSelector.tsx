// Member Selector Component
import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import MemberService from '../../services/api/member.service';
import { MemberSelectOption } from '../../types/youth-union-member';

interface MemberSelectorProps extends Omit<SelectProps, 'options'> {
  value?: number;
  onChange?: (value: number) => void;
  branchId?: number;
}

export const MemberSelector: React.FC<MemberSelectorProps> = ({
  value,
  onChange,
  branchId,
  ...props
}) => {
  const [members, setMembers] = useState<MemberSelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [branchId]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await MemberService.getSelect();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      placeholder="Chọn đoàn viên"
      loading={loading}
      value={value}
      onChange={onChange}
      options={members.map((member) => ({
        label: `${member.code} - ${member.full_name}`,
        value: member.id,
      }))}
      showSearch
      filterOption={(input, option) =>
        (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};
