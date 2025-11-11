// Activity Types

export type ActivityType = 'tinh-nguyen' | 'hoc-tap' | 'the-thao' | 'van-hoa' | 'thi-dua' | 'khac';

export type ActivityStatus = 'planned' | 'ongoing' | 'completed' | 'cancelled';

export type AttendanceStatus = 'registered' | 'attended' | 'absent' | 'late';

export interface Activity {
  id: number;
  code: string;
  name: string;
  description?: string;
  activityType?: ActivityType;
  startDate?: string;
  endDate?: string;
  location?: string;
  organizer?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  status?: ActivityStatus;
  images?: string[];
  documents?: string[];
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateActivityRequest {
  code: string;
  name: string;
  description?: string;
  activityType?: ActivityType;
  startDate?: string;
  endDate?: string;
  location?: string;
  organizer?: string;
  maxParticipants?: number;
  status?: ActivityStatus;
}

export type UpdateActivityRequest = Partial<CreateActivityRequest>;

export interface ActivityListParams {
  page?: number;
  limit?: number;
  search?: string;
  activityType?: ActivityType;
  status?: ActivityStatus;
  dateFrom?: string;
  dateTo?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ActivitySelectOption {
  id: number;
  code: string;
  name: string;
}

export interface ActivityRegistrationRequest {
  memberId: number;
}

export interface ActivityParticipant {
  id: number;
  activityId: number;
  memberId: number;
  registeredAt: string;
  attendanceStatus?: AttendanceStatus;
  attendedAt?: string;
  notes?: string;
  member?: {
    id: number;
    code: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
  };
}

export interface UpdateAttendanceRequest {
  memberId: number;
  status: AttendanceStatus;
}

export interface ActivityStatistics {
  totalActivities: number;
  plannedActivities: number;
  ongoingActivities: number;
  completedActivities: number;
  cancelledActivities: number;
  activitiesByType: Array<{
    activityType: ActivityType;
    count: number;
  }>;
  totalParticipants: number;
  upcomingActivities: Activity[];
}
