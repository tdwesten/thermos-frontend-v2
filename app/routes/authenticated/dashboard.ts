import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import CurrentThermostatService from "../../services/current-thermostat";

export default class AuthenticatedDashboard extends Route {
  @service declare currentThermostat: CurrentThermostatService;

  model() {
    return this.currentThermostat.thermostat;
  }
}
