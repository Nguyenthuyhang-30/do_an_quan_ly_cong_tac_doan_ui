// src/pages/settings/notification/AutoSendToggle.tsx
import React from 'react';

interface Props {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

const AutoSendToggle: React.FC<Props> = ({ enabled, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">⚙️ Gửi tự động</h2>
      <p className="text-sm text-gray-500 mb-4">
        Khi bật, hệ thống sẽ tự động gửi thông báo khi có hoạt động hoặc tin tức mới.
      </p>

      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer">
        <span className="text-gray-700">Gửi tự động khi có hoạt động mới</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 accent-blue-600"
        />
      </div>
    </div>
  );
};
export default AutoSendToggle;
