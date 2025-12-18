// Youth Union Branch Types

export type BranchStatus = 'active' | 'inactive';

export interface YouthUnionBranch {
  id: number;
  code: string;
  name: string;
  description?: string;
  establishedDate?: string;
  status?: BranchStatus;
  secretary?: string;
  viceSecretary?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBranchRequest {
  code: string;
  name: string;
  description?: string;
  establishedDate?: string;
  status?: BranchStatus;
  secretary?: string;
  viceSecretary?: string;
}

export type UpdateBranchRequest = Partial<CreateBranchRequest>;

export interface BranchListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: BranchStatus;
  [key: string]: string | number | boolean | undefined;
}

export interface BranchSelectOption {
  id: number;
  code: string;
  name: string;
}

export interface BranchStatistics {
  totalBranches: number;
  activeBranches: number;
  inactiveBranches: number;
  totalMembers: number;
  membersByBranch: Array<{
    branchId: number;
    branchName: string;
    memberCount: number;
  }>;
}
