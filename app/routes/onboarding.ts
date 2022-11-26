import Store from "@ember-data/store";
import Route from "@ember/routing/route";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import CurrentThermostatService from "../services/current-thermostat";

export default class Onboarding extends Route {
  @service declare store: Store;
  @service declare router: RouterService;
  @service declare currentThermostat: CurrentThermostatService;

  beforeModel() {
    this.router.transitionTo("register");
  }
}
