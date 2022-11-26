import Store from "@ember-data/store";
import Route from "@ember/routing/route";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import CurrentThermostatService from "../../services/current-thermostat";
import SessionService from "../../services/session";

export default class OnboardingRegisterUser extends Route {
  @service declare store: Store;
  @service declare session: SessionService;
  @service declare router: RouterService;
  @service declare currentThermostat: CurrentThermostatService;

  beforeModel() {
    this.session.prohibitAuthentication("authenticated.dashboard");
  }

  model() {
    return this.store.createRecord("user");
  }
}
