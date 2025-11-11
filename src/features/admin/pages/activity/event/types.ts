// src/features/admin/pages/activity/event/types.ts

export interface EventFormValues {
  name: string;
  type: string;
  targetBranch: string;
  timeRange: [string, string]; // hoặc [Dayjs, Dayjs] nếu bạn dùng dayjs
  location: string;
  expectedParticipants?: number;
  description?: string;
  isRequiredCheckin: boolean;
  note?: string;
}
