import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";
import CurrentThermostatService from "../../../services/current-thermostat";

export default class AuthenticatedProgramsCreate extends Route {
  @service declare store: Store;
  @service declare currentThermostat: CurrentThermostatService;

  model() {
    return this.store.createRecord("program", {
      thermostat: this.currentThermostat.thermostat,
    });
  }
}
