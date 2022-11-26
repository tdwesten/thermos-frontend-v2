import SimpleAuthSessionService from "ember-simple-auth/services/session";
import { inject as service } from "@ember/service";
import CurrentThermostatService from "./current-thermostat";
export default class SessionService extends SimpleAuthSessionService {
  @service private declare router;
  @service private declare currentThermostat: CurrentThermostatService;

  handleAuthentication() {
    this.loadCurrentThermostat().then(() => {
      this.router.transitionTo("index");
    });
  }

  handleInvalidation() {
    this.router.transitionTo("login");

    this.session.invalidate();
  }

  /**
   * Loads the current authenticated user
   *
   * @void
   */
  async loadCurrentThermostat() {
    try {
      const user = await this.currentThermostat.load();
      return user;
    } catch (err) {
      console.error(err);
      await this.session.invalidate();
    }
  }
}
