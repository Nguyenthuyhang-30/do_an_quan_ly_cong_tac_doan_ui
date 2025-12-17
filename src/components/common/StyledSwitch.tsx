import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import type { SwitchProps } from 'antd';
import './StyledSwitch.scss';

interface StyledSwitchProps extends Omit<SwitchProps, 'checkedChildren' | 'unCheckedChildren'> {
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

const StyledSwitch: React.FC<StyledSwitchProps> = ({
  checked,
  onChange,
  checkedChildren,
  unCheckedChildren,
  disabled,
  ...restProps
}) => {
  return (
    <div className="styled-switch-wrapper">
      <label className={`checkbox-style-switch ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          {...restProps}
        />
        <span className="checkbox-custom">
          {checked && <CheckOutlined className="check-icon" />}
        </span>
        {(checkedChildren || unCheckedChildren) && (
          <span className="checkbox-label">
            {checked ? checkedChildren : unCheckedChildren}
          </span>
        )}
      </label>
    </div>
  );
};

export default StyledSwitch;

