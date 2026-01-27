import { BaseService } from './base.service';
import { BasePaginatedResponse } from '@base/models/basePaginated';
import {
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
  ActivityRegistrationRequest,
  ActivityParticipant,
  UpdateAttendanceRequest,
  ActivityStatistics,
  ActivityAttendanceStatistics,
  ActivityListParams,
  ActivitySelectOption,
} from '../../app-types/activity';

/**
 * Activity Service
 */
class ActivityService extends BaseService<Activity, CreateActivityRequest, UpdateActivityRequest> {
  constructor() {
    super('activity');
  }

  /**
   * Get activities for dropdown/select
   */
  async getSelect(): Promise<ActivitySelectOption[]> {
    const response = await this.http.get<ActivitySelectOption[]>('/activity/get-select');
    return response.data;
  }

  /**
   * Get upcoming activities
   */
  async getUpcoming(params?: { limit?: number }): Promise<Activity[]> {
    const response = await this.http.get<Activity[]>(
      '/activity/upcoming',
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Get past activities
   */
  async getPast(params?: ActivityListParams): Promise<BasePaginatedResponse<Activity>> {
    return this.http.getPaginated<Activity>(
      '/activity/past',
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get activities by date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Activity[]> {
    const response = await this.http.get<Activity[]>('/activity/date-range', {
      startDate,
      endDate,
    });
    return response.data;
  }

  /**
   * Register member for activity
   */
  async registerMember(
    activityId: number,
    data: ActivityRegistrationRequest,
  ): Promise<ActivityParticipant> {
    const response = await this.http.post<ActivityParticipant>(
      `/activity/${activityId}/register`,
      data as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Cancel registration
   */
  async cancelRegistration(activityId: number, memberId: number): Promise<void> {
    await this.http.delete(`/activity/${activityId}/cancel/${memberId}`);
  }

  /**
   * Get activity participants
   */
  async getParticipants(
    activityId: number,
    params?: ActivityListParams,
  ): Promise<ActivityParticipant[]> {
    const response = await this.http.get<ActivityParticipant[]>(
      `/activity/${activityId}/participants`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
    return response.data;
  }

  /**
   * Update attendance status
   */
  async updateAttendance(activityId: number, data: UpdateAttendanceRequest): Promise<void> {
    await this.http.put<void>(
      `/activity/${activityId}/attendance`,
      data as unknown as Record<string, unknown>,
    );
  }

  /**
   * Get activity statistics
   */
  async getActivityStatistics(): Promise<ActivityStatistics> {
    const response = await this.http.get<ActivityStatistics>('/activity/statistics');
    return response.data;
  }

  /**
   * Check-in member for activity
   */
  async checkInMember(activityId: number, memberId: number): Promise<void> {
    await this.http.post<void>(`/activity/${activityId}/check-in/${memberId}`);
  }

  /**
   * Check-out member from activity
   */
  async checkOutMember(activityId: number, memberId: number): Promise<void> {
    await this.http.post<void>(`/activity/${activityId}/check-out/${memberId}`);
  }

  /**
   * Update attendance status for a member
   */
  async updateAttendanceStatus(
    activityId: number,
    memberId: number,
    status: number,
  ): Promise<void> {
    await this.http.put<void>(`/activity/${activityId}/attendance/${memberId}`, {
      status,
    } as unknown as Record<string, unknown>);
  }

  /**
   * Bulk check-in multiple members
   */
  async bulkCheckIn(activityId: number, memberIds: number[]): Promise<void> {
    await this.http.post<void>(`/activity/${activityId}/bulk-check-in`, {
      memberIds,
    } as unknown as Record<string, unknown>);
  }

  /**
   * Get activity attendance statistics
   */
  async getActivityAttendanceStatistics(activityId: number): Promise<ActivityAttendanceStatistics> {
    const response = await this.http.get<ActivityAttendanceStatistics>(
      `/activity/${activityId}/statistics`,
    );
    return response.data;
  }

  /**
   * Unregister member from activity
   */
  async unregisterMember(activityId: number, memberId: number): Promise<void> {
    await this.http.delete(`/activity/${activityId}/unregister/${memberId}`);
  }

  /**
   * Get registered members for activity with pagination
   */
  async getRegisteredMembers(
    activityId: number,
    params?: ActivityListParams,
  ): Promise<BasePaginatedResponse<ActivityParticipant>> {
    return this.http.getPaginated<ActivityParticipant>(
      `/activity/${activityId}/members`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Get member's registered activities
   */
  async getMemberActivities(
    memberId: number,
    params?: ActivityListParams,
  ): Promise<BasePaginatedResponse<Activity>> {
    return this.http.getPaginated<Activity>(
      `/activity/member/${memberId}/activities`,
      params as Record<string, string | number | boolean | null | undefined>,
    );
  }

  /**
   * Generate QR code token for activity
   * Có 2 loại token: 'register' (đăng ký tham gia) và 'attendance' (điểm danh)
   */
  async generateQRCodeToken(
    activityId: number,
    type: 'register' | 'attendance',
  ): Promise<{ token: string; expiresAt: string }> {
    const response = await this.http.post<{ token: string; expiresAt: string }>(
      `/activity/${activityId}/qr-token`,
      {
        type,
      } as unknown as Record<string, unknown>,
    );
    return response.data;
  }

  /**
   * Đăng ký tham gia qua QR code
   */
  async registerViaQR(activityId: number, qrToken: string): Promise<void> {
    await this.http.post<void>(`/activity/${activityId}/qr-register`, {
      token: qrToken,
    } as unknown as Record<string, unknown>);
  }

  /**
   * Check-in (điểm danh) qua QR code
   */
  async checkInViaQR(activityId: number, qrToken: string): Promise<void> {
    await this.http.post<void>(`/activity/${activityId}/qr-check-in`, {
      token: qrToken,
    } as unknown as Record<string, unknown>);
  }
}

export default new ActivityService();
