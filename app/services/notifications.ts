import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  route: string;
  buttonTitle: string;
  createdAt?: Date;
};

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export default class NotificationsService extends Service {
  @tracked public notifications: Notification[] = [];

  constructor() {
    super(...arguments);

    setInterval(() => {
      this.checkForExpiredNotifications();
    }, 1000);
  }

  get getNotifications() {
    return this.notifications;
  }

  checkForExpiredNotifications() {
    const now = new Date();

    if (!this.notifications || this.notifications.length === 0) {
      return;
    }

    this.notifications.forEach((notification) => {
      if (notification.createdAt) {
        const diff = now.getTime() - notification.createdAt.getTime();

        if (diff > 10000) {
          this.delete(notification);
        }
      }
    });
  }

  add(notification: Notification) {
    notification.createdAt = new Date();

    this.notifications.push(notification);
  }

  delete(notification: Notification) {
    const index = this.notifications.indexOf(notification);

    this.notifications.splice(index, 1);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    notifications: NotificationsService;
  }
}
