// Member Transfer Types

export type TransferStatus = 'pending' | 'approved' | 'rejected';

export interface MemberTransfer {
  id: number;
  memberId: number;
  fromBranchId: number;
  toBranchId: number;
  reason?: string;
  transferDate?: string;
  status?: TransferStatus;
  requestedBy?: number;
  approvedBy?: number;
  rejectedBy?: number;
  approvedAt?: string;
  rejectedAt?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  member?: {
    id: number;
    code: string;
    fullName: string;
    email: string;
  };
  fromBranch?: {
    id: number;
    code: string;
    name: string;
  };
  toBranch?: {
    id: number;
    code: string;
    name: string;
  };
}

export interface CreateTransferRequest {
  memberId: number;
  fromBranchId: number;
  toBranchId: number;
  reason?: string;
  transferDate?: string;
  requestedBy?: number;
}

export interface ApproveTransferRequest {
  approvedBy: number;
  notes?: string;
}

export interface RejectTransferRequest {
  rejectedBy: number;
  reason?: string;
}

export interface TransferListParams {
  page?: number;
  limit?: number;
  memberId?: number;
  fromBranchId?: number;
  toBranchId?: number;
  status?: TransferStatus;
  [key: string]: string | number | boolean | undefined;
}

export interface TransferStatistics {
  totalTransfers: number;
  pendingTransfers: number;
  approvedTransfers: number;
  rejectedTransfers: number;
  transfersByBranch: Array<{
    branchId: number;
    branchName: string;
    transfersIn: number;
    transfersOut: number;
  }>;
}
