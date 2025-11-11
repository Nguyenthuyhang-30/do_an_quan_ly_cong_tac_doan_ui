/**
 * Mock Service cho Dashboard
 * Fake API để demo các chức năng dashboard khi chưa có backend
 */

export interface DashboardStats {
  members: number;
  branches: number;
  activities: number;
  participation: number;
}

export interface ActivityData {
  month: string;
  count: number;
}

export interface ScoreData {
  semester: string;
  avg: number;
}

export interface TypeData {
  name: string;
  value: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

class DashboardMockService {
  private delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

  // GET: Lấy thống kê tổng quan
  async getStats(): Promise<DashboardStats> {
    await this.delay();
    return {
      members: 482,
      branches: 12,
      activities: 18,
      participation: 86,
    };
  }

  // GET: Lấy dữ liệu hoạt động theo tháng
  async getActivityData(): Promise<ActivityData[]> {
    await this.delay();
    return [
      { month: 'T1', count: 4 },
      { month: 'T2', count: 5 },
      { month: 'T3', count: 8 },
      { month: 'T4', count: 6 },
      { month: 'T5', count: 9 },
      { month: 'T6', count: 7 },
      { month: 'T7', count: 10 },
      { month: 'T8', count: 6 },
      { month: 'T9', count: 12 },
      { month: 'T10', count: 9 },
      { month: 'T11', count: 11 },
      { month: 'T12', count: 8 },
    ];
  }

  // GET: Lấy điểm rèn luyện theo học kỳ
  async getScoreData(): Promise<ScoreData[]> {
    await this.delay();
    return [
      { semester: 'HK1', avg: 78 },
      { semester: 'HK2', avg: 82 },
      { semester: 'HK3', avg: 84 },
      { semester: 'HK4', avg: 80 },
    ];
  }

  // GET: Lấy phân loại đoàn viên
  async getTypeData(): Promise<TypeData[]> {
    await this.delay();
    return [
      { name: 'Xuất sắc', value: 145 },
      { name: 'Khá', value: 200 },
      { name: 'Trung bình', value: 120 },
      { name: 'Yếu', value: 17 },
    ];
  }

  // GET: Lấy danh sách hoạt động sắp tới
  async getUpcomingEvents(): Promise<UpcomingEvent[]> {
    await this.delay();
    return [
      {
        id: '1',
        title: 'Chiến dịch Mùa hè xanh',
        date: '2025-11-15',
        location: 'Khu phố 3 - ĐBP',
        status: 'confirmed',
      },
      {
        id: '2',
        title: 'Hiến máu nhân đạo',
        date: '2025-11-25',
        location: 'Hội trường A1',
        status: 'confirmed',
      },
      {
        id: '3',
        title: 'Tọa đàm Thanh niên và CĐS',
        date: '2025-12-10',
        location: 'Phòng SmartLab',
        status: 'pending',
      },
      {
        id: '4',
        title: 'Hoạt động tình nguyện',
        date: '2025-12-20',
        location: 'Làng SOS',
        status: 'pending',
      },
    ];
  }

  // GET: Lấy thống kê theo chi đoàn
  async getBranchStats(filters: { year: string; semester: string; branch: string }): Promise<
    Array<{
      year: string;
      semester: string;
      branch: string;
      avgPoint: number;
      participation: number;
      activities: number;
    }>
  > {
    await this.delay();
    const allData = [
      {
        year: '2025',
        semester: 'HK1',
        branch: 'CTK14A',
        avgPoint: 84,
        participation: 88,
        activities: 12,
      },
      {
        year: '2025',
        semester: 'HK1',
        branch: 'CTK14B',
        avgPoint: 79,
        participation: 82,
        activities: 10,
      },
      {
        year: '2025',
        semester: 'HK1',
        branch: 'CTK15A',
        avgPoint: 81,
        participation: 90,
        activities: 13,
      },
      {
        year: '2025',
        semester: 'HK1',
        branch: 'CTK15B',
        avgPoint: 76,
        participation: 74,
        activities: 9,
      },
      {
        year: '2025',
        semester: 'HK2',
        branch: 'CTK14A',
        avgPoint: 86,
        participation: 91,
        activities: 14,
      },
      {
        year: '2025',
        semester: 'HK2',
        branch: 'CTK14B',
        avgPoint: 80,
        participation: 84,
        activities: 11,
      },
      {
        year: '2025',
        semester: 'HK2',
        branch: 'CTK15A',
        avgPoint: 83,
        participation: 92,
        activities: 15,
      },
      {
        year: '2025',
        semester: 'HK2',
        branch: 'CTK15B',
        avgPoint: 78,
        participation: 79,
        activities: 10,
      },
    ];

    return allData.filter((item) => {
      const matchYear = item.year === filters.year;
      const matchSem = item.semester === filters.semester;
      const matchBranch = filters.branch === 'all' ? true : item.branch === filters.branch;
      return matchYear && matchSem && matchBranch;
    });
  }

  // GET: Lấy top đoàn viên
  async getTopMembers(): Promise<
    Array<{ name: string; branch: string; activities: number; point: number }>
  > {
    await this.delay();
    return [
      { name: 'Nguyễn Văn A', branch: 'CTK14A', activities: 18, point: 95 },
      { name: 'Trần Thị B', branch: 'CTK15A', activities: 16, point: 93 },
      { name: 'Lê Văn C', branch: 'CTK14B', activities: 15, point: 91 },
      { name: 'Phạm Thị D', branch: 'CTK15B', activities: 14, point: 90 },
      { name: 'Đỗ Văn E', branch: 'CTK14A', activities: 13, point: 89 },
    ];
  }

  // POST: Export báo cáo (giả lập)
  async exportReport(
    type: 'excel' | 'pdf',
    filters: Record<string, unknown>,
  ): Promise<{ success: boolean; url: string }> {
    await this.delay(1500);
    console.log('Exporting report:', type, filters);
    return {
      success: true,
      url: `/mock-reports/${type}-${Date.now()}.${type === 'excel' ? 'xlsx' : 'pdf'}`,
    };
  }
}

export const dashboardMockService = new DashboardMockService();
