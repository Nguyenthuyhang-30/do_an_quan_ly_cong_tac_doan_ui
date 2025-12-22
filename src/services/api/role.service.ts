import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  MemberRole,
  Role,
  AssignRoleRequest,
  AssignMultipleRolesRequest,
  EndRoleRequest,
  RoleStatistics,
} from '../../app-types/member-role';

/**
 * Member Role Service
 */
class RoleService extends BaseService<MemberRole, AssignRoleRequest, Partial<AssignRoleRequest>> {
  constructor() {
    super('role');
  }

  /**
   * Assign role to member
   */
  async assignRole(data: AssignRoleRequest): Promise<MemberRole> {
    const response = await this.http.post<MemberRole>(
      '/role/assign',
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Assign multiple roles to member
   */
  async assignMultipleRoles(data: AssignMultipleRolesRequest): Promise<MemberRole[]> {
    const response = await this.http.post<MemberRole[]>(
      '/role/assign-multiple',
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get member's active roles
   */
  async getMemberActiveRoles(memberId: number): Promise<MemberRole[]> {
    const response = await this.http.get<MemberRole[]>(`/role/member/${memberId}/active`);
    return response.data;
  }

  /**
   * Get member's role history
   */
  async getMemberRoleHistory(
    memberId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberRole>> {
    return this.http.getPaginated<MemberRole>(
      `/role/member/${memberId}/history`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get member's all roles
   */
  async getMemberRoles(
    memberId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberRole>> {
    return this.http.getPaginated<MemberRole>(
      `/role/member/${memberId}`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get members by role
   */
  async getMembersByRole(
    roleId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberRole>> {
    return this.http.getPaginated<MemberRole>(
      `/role/${roleId}/members`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get active members by role
   */
  async getActiveMembersByRole(
    roleId: number,
    params?: { page?: number; limit?: number },
  ): Promise<BasePaginatedResponse<MemberRole>> {
    return this.http.getPaginated<MemberRole>(
      `/role/${roleId}/members/active`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get role statistics
   */
  async getRoleStatistics(): Promise<RoleStatistics> {
    const response = await this.http.get<RoleStatistics>('/role/statistics');
    return response.data;
  }

  /**
   * End role assignment
   */
  async endRole(id: number, data: EndRoleRequest): Promise<MemberRole> {
    const response = await this.http.put<MemberRole>(
      `/role/${id}/end`,
      data as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Get all available roles
   */
  async getAllRoles(): Promise<Role[]> {
    const response = await this.http.get<Role[]>('/role/get-all');
    return response.data;
  }
}

export default new RoleService();
