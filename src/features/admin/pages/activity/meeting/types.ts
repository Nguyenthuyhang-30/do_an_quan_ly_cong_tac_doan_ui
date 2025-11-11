// src/features/admin/pages/activity/create-activity/types.ts

// ... EventFormValues, VoteFormValues ở trên

// --- Meeting (Sinh hoạt) ---
export interface MeetingAgendaItem {
  id: string | number;
  title: string;
  presenter?: string;
  time?: string; // ví dụ "19:30 - 19:45"
}

export interface MeetingFormValues {
  title: string;
  meetingType: 'offline' | 'online' | 'hybrid';
  branch?: string;
  dateTime?: any; // Dayjs | string tuỳ bạn dùng
  location?: string;
  room?: string;
  onlineLink?: string;

  agenda: MeetingAgendaItem[];

  targetType: 'all' | 'branch' | 'role';
  targetBranches?: string[];
  targetRoles?: string[];

  isRequiredAttendance: boolean;
  allowQrCheckin: boolean;
  note?: string;
}
