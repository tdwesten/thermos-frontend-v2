import Route from "@ember/routing/route";
import RouterService from "@ember/routing/router-service";
import Transition from "@ember/routing/transition";
import { inject as service } from "@ember/service";
import IntlService from "ember-intl/services/intl";
import CurrentThermostatService from "../services/current-thermostat";
import HeartbeatService from "../services/heartbeat";

export default class ApplicationRoute extends Route {
  @service private declare session;
  @service private declare router: RouterService;
  @service private declare currentThermostat: CurrentThermostatService;
  @service private declare intl: IntlService;
  @service private declare heartbeat: HeartbeatService;

  async beforeModel(transition: Transition) {
    await this.session.setup();

    this.intl.setLocale(["nl-nl"]);

    return this._loadcurrentThermostat();
  }

  async _loadcurrentThermostat() {
    try {
      await this.currentThermostat.load();
    } catch (err) {
      await this.session.invalidate();
    }
  }
}
