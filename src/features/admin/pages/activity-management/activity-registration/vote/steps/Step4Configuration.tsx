// Step 4: Cấu hình - Biểu quyết (có thể để trống hoặc thêm các cấu hình khác)
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface Step4ConfigurationProps {
  form: FormInstance;
}

export default function Step4Configuration({ form: _form }: Step4ConfigurationProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Xác nhận thông tin
      </h3>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Vui lòng kiểm tra lại thông tin trước khi hoàn tất tạo phiếu đăng ký biểu quyết.
      </p>
    </div>
  );
}

