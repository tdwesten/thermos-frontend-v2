import RouterService from "@ember/routing/router-service";
import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import Store from "ember-data/store";
import Thermostat from "../models/thermostat";

export default class CurrentThermostatService extends Service {
  @service private declare session;
  @service private declare store: Store;
  @service private declare intl;
  @service private declare router: RouterService;

  @tracked public declare thermostat: Thermostat;

  async load() {
    const thermostatId = this.session.data.authenticated.thermostat_id;

    if (thermostatId) {
      const thermostat = await this.store.findRecord(
        "thermostat",
        thermostatId,
        {
          include: "current-program",
        }
      );
      this.thermostat = thermostat;
    }
  }
}
