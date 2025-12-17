import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import type { SwitchProps } from 'antd';
import './StyledSwitch.scss';

interface StyledSwitchProps extends Omit<SwitchProps, 'checkedChildren' | 'unCheckedChildren' | 'size'> {
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
  // Filter out props that are not compatible with HTMLInputElement
  const {
    size: _size,
    loading: _loading,
    ...inputProps
  } = restProps as any;

  return (
    <div className="styled-switch-wrapper">
      <label className={`checkbox-style-switch ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            const newChecked = e.target.checked;
            if (onChange) {
              // Ant Design Switch onChange expects (checked: boolean, event?: Event)
              // We create a synthetic event-like object
              onChange(newChecked, e.nativeEvent as any);
            }
          }}
          disabled={disabled}
          {...inputProps}
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

