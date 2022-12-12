import Controller from "@ember/controller";
import RouterService from "@ember/routing/router-service";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import CurrentThermostatService from "../../services/current-thermostat";

export default class AuthenticatedDashboardController extends Controller {
  @tracked isWindowActive = true;
  @tracked isActiveRoute = false;
  @service declare currentThermostat: CurrentThermostatService;
  @service declare router: RouterService;

  constructor() {
    super(...arguments);

    window.addEventListener("focus", () => {
      this.isWindowActive = true;
    });

    window.addEventListener("blur", () => {
      this.isWindowActive = false;
    });

    this.updateThermostat();

    this.router.on("routeDidChange", (transition) => {
      this.isActiveRoute = transition.to.name === "authenticated.dashboard";
    });
  }

  updateThermostat() {
    if (
      this.isWindowActive &&
      this.isActiveRoute &&
      this.currentThermostat.thermostat
    ) {
      this.currentThermostat.thermostat.reload();
    }

    setTimeout(() => this.updateThermostat(), 5000);
  }
}
