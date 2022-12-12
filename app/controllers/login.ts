import Store from "@ember-data/store";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { Changeset } from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import SessionService from "../services/session";
import LOGINVALIDATIONS from "../validations/login";

export default class LoginController extends Controller {
  @service declare session: SessionService;
  @service declare store: Store;
  @service declare router: RouterService;

  formValidations = LOGINVALIDATIONS;

  @action
  handleLogin(event: SubmitEvent): void {
    event.preventDefault();

    this.session
      .authenticate("authenticator:jwt", {
        email: this.model.email,
        password: this.model.password,
      })
      .then(() => {
        this.router.transitionTo("authenticated.dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  @action
  invalidateSession(): void {
    this.session.invalidate();
  }
}
