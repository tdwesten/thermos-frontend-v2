import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import CurrentThermostatService from "../../services/current-thermostat";

export default class AuthenticatedSettings extends Route {
  @service declare currentThermostat: CurrentThermostatService;

  model() {
    return this.currentThermostat.get("thermostat");
  }
}
