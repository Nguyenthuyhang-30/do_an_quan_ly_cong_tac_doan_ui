// Youth Union Member Types

export type MemberStatus = 'active' | 'inactive' | 'graduated' | 'transferred';
export type Gender = 'male' | 'female' | 'other';

export interface YouthUnionMember {
  id: number;
  code: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  identityCard?: string;
  placeOfBirth?: string;
  ethnicity?: string;
  religion?: string;
  joinDate?: string;
  status?: MemberStatus;
  branchId: number;
  cohortId: number;
  avatar?: string;
  studentId?: string;
  class?: string;
  faculty?: string;
  major?: string;
  createdAt?: string;
  updatedAt?: string;
  branch?: {
    id: number;
    name: string;
    code?: string;
  };
  cohort?: {
    id: number;
    name: string;
    code?: string;
  };
}

export interface CreateMemberRequest {
  code: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  identityCard?: string;
  placeOfBirth?: string;
  ethnicity?: string;
  religion?: string;
  joinDate?: string;
  branchId: number;
  cohortId: number;
  studentId?: string;
  class?: string;
  faculty?: string;
  major?: string;
}

export type UpdateMemberRequest = Partial<CreateMemberRequest>;

export interface UpdateMemberStatusRequest {
  status: MemberStatus;
}

export interface MemberListParams {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: number;
  cohortId?: number;
  status?: MemberStatus;
  gender?: Gender;
  roleId?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface MemberSelectOption {
  id: number;
  code: string;
  full_name: string;
  email: string;
}

export interface MemberStatistics {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  graduatedMembers: number;
  membersByBranch: Array<{
    branchId: number;
    branchName: string;
    count: number;
  }>;
  membersByCohort: Array<{
    cohortId: number;
    cohortName: string;
    count: number;
  }>;
  membersByGender: {
    male: number;
    female: number;
    other?: number;
  };
}
