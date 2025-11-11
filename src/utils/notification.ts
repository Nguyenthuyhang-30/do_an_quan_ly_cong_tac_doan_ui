import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationConfig {
  message: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacement;
}

class NotificationService {
  private defaultDuration = 4;
  private defaultPlacement: NotificationPlacement = 'topRight';

  /**
   * Show success notification
   */
  success(config: NotificationConfig) {
    notification.success({
      message: config.message,
      description: config.description,
      duration: config.duration ?? this.defaultDuration,
      placement: config.placement ?? this.defaultPlacement,
    });
  }

  /**
   * Show error notification
   */
  error(config: NotificationConfig) {
    notification.error({
      message: config.message,
      description: config.description,
      duration: config.duration ?? this.defaultDuration,
      placement: config.placement ?? this.defaultPlacement,
    });
  }

  /**
   * Show info notification
   */
  info(config: NotificationConfig) {
    notification.info({
      message: config.message,
      description: config.description,
      duration: config.duration ?? this.defaultDuration,
      placement: config.placement ?? this.defaultPlacement,
    });
  }

  /**
   * Show warning notification
   */
  warning(config: NotificationConfig) {
    notification.warning({
      message: config.message,
      description: config.description,
      duration: config.duration ?? this.defaultDuration,
      placement: config.placement ?? this.defaultPlacement,
    });
  }

  /**
   * Generic notification
   */
  show(type: NotificationType, config: NotificationConfig) {
    notification[type]({
      message: config.message,
      description: config.description,
      duration: config.duration ?? this.defaultDuration,
      placement: config.placement ?? this.defaultPlacement,
    });
  }

  /**
   * Close all notifications
   */
  destroy() {
    notification.destroy();
  }
}

export const notificationService = new NotificationService();
export default notificationService;
