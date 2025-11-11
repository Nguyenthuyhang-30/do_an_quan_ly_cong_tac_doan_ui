// src/features/admin/pages/activity/create-activity/types.ts

// --- Event ---
export interface EventFormValues {
  name: string;
  type: string;
  targetBranch: string;
  timeRange: [string, string] | [any, any]; // tuỳ bạn dùng dayjs hay string
  location: string;
  expectedParticipants?: number;
  description?: string;
  isRequiredCheckin: boolean;
  note?: string;
}

// --- Vote ---
export interface VoteOption {
  id: string | number;
  label: string;
}

export interface VoteFormValues {
  title: string;
  description?: string;
  isAnonymous: boolean;
  allowMultiple: boolean;
  deadline?: string | any;
  minChoice?: number;
  maxChoice?: number;
  options: VoteOption[];
  targetType: 'all' | 'branch' | 'role';
  targetBranches?: string[];
  targetRoles?: string[];
}
