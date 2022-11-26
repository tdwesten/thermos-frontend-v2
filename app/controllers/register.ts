import Store from "@ember-data/store";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { Changeset } from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import SessionService from "../services/session";

import { BufferedChangeset } from "validated-changeset";
import ENV from "../config/environment";
import REGISTER_VALIDATIONS from "../validations/register";
import Thermostat from "../models/thermostat";

export default class RegisterController extends Controller {
  @service declare session: SessionService;
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked thermostat: Thermostat;
  @tracked changeset: BufferedChangeset;

  constructor() {
    super(...arguments);

    this.thermostat = this.store.createRecord("thermostat");

    this.changeset = Changeset(
      this.thermostat,
      lookupValidator(REGISTER_VALIDATIONS),
      REGISTER_VALIDATIONS
    );
  }

  @action
  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.changeset.execute();

    const url = ENV.APP.apiHost + "/auth/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.thermostat.name,
        email: this.thermostat.email,
        password: this.thermostat.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.session.authenticate("authenticator:token", {
            email: this.thermostat.email,
            password: this.thermostat.password,
          });
          this.changeset.rollback();
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  @action
  invalidateSession(): void {
    this.session.invalidate();
  }
}
