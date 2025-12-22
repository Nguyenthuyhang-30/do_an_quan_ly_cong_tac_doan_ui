// src/pages/user-account/types.ts
export type UserStatus = 'active' | 'locked';

export interface UserAccount {
  id: number;
  fullName: string;
  email: string;
  studentCode?: string; // Phone number
  role?: 'admin' | 'secretary' | 'member'; // Made optional since role management was removed
  roleId?: number;
  branch: string; // Chi đoàn (có thể lấy từ member data)
  status: UserStatus;
  lastLoginAt?: string;
  createdAt?: string;
}
