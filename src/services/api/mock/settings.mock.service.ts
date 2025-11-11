/**
 * Mock Service cho Settings
 * Fake API để demo các chức năng cài đặt khi chưa có backend
 */

export interface GeneralSettings {
  organizationName: string;
  shortName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  language: string;
  timezone: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  apiUrl: string;
  apiTimeout: number;
  maxUploadSize: number;
  allowedFileTypes: string[];
  enabledModules: {
    members: boolean;
    activities: boolean;
    reports: boolean;
    notifications: boolean;
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecialChar: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  ipWhitelist: string[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  emailHost: string;
  emailPort: number;
  emailUsername: string;
  emailPassword: string;
  smsProvider: string;
  smsApiKey: string;
  autoSendActivity: boolean;
  autoSendReminder: boolean;
  templates: {
    activityCreated: string;
    activityReminder: string;
    memberRegistered: string;
  };
}

class SettingsMockService {
  private delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

  // Mock data storage
  private generalSettings: GeneralSettings = {
    organizationName: 'Đoàn Trường Đại học Đồng Nai',
    shortName: 'Đoàn ĐHĐN',
    email: 'doan@dnpu.edu.vn',
    phone: '0251 3872 123',
    address: '24 Nguyễn Văn Linh, TP. Biên Hòa, Đồng Nai',
    website: 'https://doan.dnpu.edu.vn',
    logo: '/logos/logo.png',
    favicon: '/logos/favicon.ico',
    primaryColor: '#1890ff',
    secondaryColor: '#52c41a',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
  };

  private systemSettings: SystemSettings = {
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    apiUrl: 'https://api.example.com',
    apiTimeout: 30000,
    maxUploadSize: 5,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
    enabledModules: {
      members: true,
      activities: true,
      reports: true,
      notifications: true,
    },
  };

  private securitySettings: SecuritySettings = {
    twoFactorEnabled: false,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSpecialChar: false,
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    lockoutDuration: 900,
    ipWhitelist: [],
  };

  private notificationSettings: NotificationSettings = {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    emailHost: 'smtp.gmail.com',
    emailPort: 587,
    emailUsername: 'noreply@dnpu.edu.vn',
    emailPassword: '********',
    smsProvider: 'Twilio',
    smsApiKey: '********',
    autoSendActivity: true,
    autoSendReminder: true,
    templates: {
      activityCreated: 'Hoạt động mới: {{title}} - {{date}}',
      activityReminder: 'Nhắc nhở: {{title}} sẽ diễn ra vào {{date}}',
      memberRegistered: 'Chào mừng {{name}} đã gia nhập Đoàn!',
    },
  };

  // ========== GENERAL SETTINGS ==========
  async getGeneralSettings(): Promise<GeneralSettings> {
    await this.delay();
    return { ...this.generalSettings };
  }

  async updateGeneralSettings(settings: Partial<GeneralSettings>): Promise<GeneralSettings> {
    await this.delay();
    this.generalSettings = { ...this.generalSettings, ...settings };
    return { ...this.generalSettings };
  }

  async uploadLogo(file: File): Promise<{ url: string }> {
    await this.delay(1200);
    const url = URL.createObjectURL(file);
    this.generalSettings.logo = url;
    return { url };
  }

  async uploadFavicon(file: File): Promise<{ url: string }> {
    await this.delay(1200);
    const url = URL.createObjectURL(file);
    this.generalSettings.favicon = url;
    return { url };
  }

  // ========== SYSTEM SETTINGS ==========
  async getSystemSettings(): Promise<SystemSettings> {
    await this.delay();
    return { ...this.systemSettings };
  }

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    await this.delay();
    this.systemSettings = { ...this.systemSettings, ...settings };
    return { ...this.systemSettings };
  }

  async testApiConnection(apiUrl: string): Promise<{ success: boolean; message: string }> {
    await this.delay(1500);
    console.log('Testing API connection to:', apiUrl);
    const success = Math.random() > 0.3; // 70% success rate
    return {
      success,
      message: success ? 'Kết nối API thành công!' : 'Không thể kết nối đến API',
    };
  }

  // ========== SECURITY SETTINGS ==========
  async getSecuritySettings(): Promise<SecuritySettings> {
    await this.delay();
    return { ...this.securitySettings };
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    await this.delay();
    this.securitySettings = { ...this.securitySettings, ...settings };
    return { ...this.securitySettings };
  }

  async getAccessLogs(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Array<{
      id: string;
      username: string;
      action: string;
      ip: string;
      timestamp: string;
      status: string;
    }>;
    total: number;
    page: number;
    limit: number;
  }> {
    await this.delay();
    const logs = Array.from({ length: 50 }, (_, i) => ({
      id: `log-${i + 1}`,
      username: `user${(i % 10) + 1}`,
      action: ['login', 'logout', 'update_profile', 'view_report'][i % 4],
      ip: `192.168.1.${(i % 255) + 1}`,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      status: i % 5 === 0 ? 'failed' : 'success',
    }));

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: logs.slice(start, end),
      total: logs.length,
      page,
      limit,
    };
  }

  // ========== NOTIFICATION SETTINGS ==========
  async getNotificationSettings(): Promise<NotificationSettings> {
    await this.delay();
    return { ...this.notificationSettings };
  }

  async updateNotificationSettings(
    settings: Partial<NotificationSettings>,
  ): Promise<NotificationSettings> {
    await this.delay();
    this.notificationSettings = { ...this.notificationSettings, ...settings };
    return { ...this.notificationSettings };
  }

  async testEmailConnection(config: {
    host: string;
    port: number;
    username: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> {
    await this.delay(1500);
    console.log('Testing email connection with config:', config);
    const success = Math.random() > 0.2; // 80% success rate
    return {
      success,
      message: success ? 'Kết nối email thành công!' : 'Không thể kết nối đến máy chủ email',
    };
  }

  async sendTestEmail(to: string, subject: string, body: string): Promise<{ success: boolean }> {
    await this.delay(1200);
    console.log('Sending test email:', { to, subject, body });
    return { success: true };
  }

  async sendTestSms(to: string, message: string): Promise<{ success: boolean }> {
    await this.delay(1200);
    console.log('Sending test SMS:', { to, message });
    return { success: true };
  }

  async sendTestPushNotification(
    userId: string,
    title: string,
    body: string,
  ): Promise<{ success: boolean }> {
    await this.delay(1000);
    console.log('Sending test push notification:', { userId, title, body });
    return { success: true };
  }
}

export const settingsMockService = new SettingsMockService();
