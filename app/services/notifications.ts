import Service from "@ember/service";
import { trackedNested } from "ember-tracked-nested";
import { action } from "@ember/object";

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  route: string;
  buttonTitle: string;
  createdAt?: string;
};

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export default class NotificationsService extends Service {
  @trackedNested public notifications: Notification[] = [];

  constructor() {
    super(...arguments);

    setInterval(() => {
      this.checkForExpiredNotifications();
    }, 1000);
  }

  get getNotifications() {
    return this.notifications;
  }

  @action
  checkForExpiredNotifications() {
    const now = new Date();

    if (!this.notifications || this.notifications.length === 0) {
      return;
    }

    this.notifications.forEach((notification) => {
      if (notification.createdAt) {
        const diff = now.getTime() - new Date(notification.createdAt).getTime();

        if (diff > 10000) {
          this.delete(notification);
        }
      }
    });
  }

  add(notification: Notification) {
    const now = new Date();
    notification.createdAt = now.toJSON();

    this.deleteDuplicate(notification);

    this.notifications.push(notification);
  }

  deleteDuplicate(notification: Notification) {
    const duplicate = this.notifications.find((n) => n.id === notification.id);

    if (duplicate) {
      this.delete(duplicate);
    }
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
