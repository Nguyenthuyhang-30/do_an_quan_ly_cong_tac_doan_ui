// src/features/admin/pages/activity/create-activity/types.ts

// ...

// --- Volunteer (Tình nguyện) ---
export interface VolunteerSlot {
  id: string | number;
  title: string; // Nhóm công việc, vị trí
  quantity?: number; // Số lượng cần
  note?: string; // Ghi chú
}

export interface VolunteerFormValues {
  title: string; // Tên hoạt động
  campaignName?: string; // Chiến dịch / chương trình
  location: string; // Địa điểm
  timeRange?: [any, any]; // Khoảng thời gian (RangePicker)
  timeNote?: string; // Ghi chú thêm về thời gian

  maxVolunteers?: number; // Số lượng TNV tối đa
  contactPerson?: string; // Người phụ trách
  contactPhone?: string; // SĐT liên hệ

  requireHealthCheck: boolean; // Yêu cầu sức khoẻ
  requireTraining: boolean; // Yêu cầu tập huấn trước

  description?: string; // Nội dung chi tiết
  benefits?: string; // Quyền lợi (Giấy chứng nhận, điểm RL, ...)

  slots: VolunteerSlot[]; // Danh sách vị trí / nhóm công việc

  targetType: 'all' | 'branch' | 'role';
  targetBranches?: string[];
  targetRoles?: string[];
}
