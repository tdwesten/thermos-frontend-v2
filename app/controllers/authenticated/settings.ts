import Store from "@ember-data/store";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { BufferedChangeset } from "validated-changeset";

import { Changeset } from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import CurrentThermostatService from "../../services/current-thermostat";
import SessionService from "../../services/session";
import THERMOSTAT_VALIDATIONS from "../../validations/thermostat";

export default class AuthenticatedSettings extends Controller {
  @service declare session: SessionService;
  @service declare currentThermostat: CurrentThermostatService;
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked changeset: BufferedChangeset;
  @tracked isLoading: boolean = false;

  constructor() {
    super(...arguments);

    if (this.currentThermostat.get("thermostat")) {
      this.changeset = Changeset(
        this.currentThermostat.get("thermostat"),
        lookupValidator(THERMOSTAT_VALIDATIONS),
        THERMOSTAT_VALIDATIONS
      );
    } else {
      this.router.transitionTo("authenticated.login");
    }
  }

  @action
  handleSave(event: SubmitEvent) {
    event.preventDefault();

    this.isLoading = true;
    this.changeset.save().then(() => {
      this.isLoading = false;
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/settings": AuthenticatedSettings;
  }
}
