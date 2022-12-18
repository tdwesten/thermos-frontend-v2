import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import NotificationsService from "../../services/notifications";

interface NotificationsArgs {}

export default class Notifications extends Component<NotificationsArgs> {
  @service declare notifications: NotificationsService;

  get notificationsList() {
    return this.notifications.getNotifications;
  }
}
