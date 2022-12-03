import Store from "@ember-data/store";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { Changeset } from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import { BufferedChangeset } from "validated-changeset";
import Thermostat from "../../models/thermostat";
import CurrentThermostatService from "../../services/current-thermostat";
import REGISTER_THEMOSTAT_VALIDATIONS from "../../validations/register-thermostat";

export default class RegisterThermostatController extends Controller {
  @service declare currentThermostat: CurrentThermostatService;
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked thermostat: Thermostat;
  @tracked changeset: BufferedChangeset;

  constructor(args: any) {
    super(...args);

    this.thermostat = this.store.createRecord("thermostat");

    this.changeset = Changeset(
      this.thermostat,
      lookupValidator(REGISTER_THEMOSTAT_VALIDATIONS),
      REGISTER_THEMOSTAT_VALIDATIONS
    );
  }

  @action
  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.changeset.execute();

    this.thermostat
      .save()
      .then((themostat) => {
        this.currentThermostat.user.thermostat = themostat;
        this.currentThermostat.user.save();
      })
      .then(() => {
        this.router.transitionTo("authenticated.settings");
      });
  }
}
