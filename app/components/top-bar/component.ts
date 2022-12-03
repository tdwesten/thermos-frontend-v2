import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import CurrentThermostatService from "../../services/current-thermostat";
import { tracked } from "@glimmer/tracking";
import SessionService from "../../services/session";
import IntlService from "ember-intl/services/intl";
import RouterService from "@ember/routing/router-service";

interface TopBarArgs {}

type MenuItem = {
  title: string;
  route: string;
  icon: string;
};

export default class TopBar extends Component<TopBarArgs> {
  @service declare currentThermostat: CurrentThermostatService;
  @service declare session: SessionService;
  @service declare intl: IntlService;
  @service declare router: RouterService;

  @tracked showMenu = false;

  public menuItems: MenuItem[] = [];

  constructor(owner: unknown, args: TopBarArgs) {
    super(owner, args);

    this.menuItems = [
      {
        title: this.intl.t("top-bar.menu.dashboard"),
        icon: "dashboard",
        route: "authenticated.dashboard",
      },
      {
        title: this.intl.t("top-bar.menu.programs"),
        icon: "event_note",
        route: "authenticated.programs",
      },
      {
        title: this.intl.t("top-bar.menu.settings"),
        icon: "settings",
        route: "authenticated.settings",
      },
      {
        title: this.intl.t("top-bar.menu.logout"),
        icon: "logout",
        route: "logout",
      },
    ];
  }

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  get title() {
    return this.currentThermostat.thermostat?.name || this.intl.t("app.name");
  }

  @action
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
