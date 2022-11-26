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
  @tracked credentials = {
    email: "",
    password: "",
  };

  @tracked changeset = Changeset(
    this.credentials,
    lookupValidator(LOGINVALIDATIONS),
    LOGINVALIDATIONS
  );

  @action
  handleLogin(event: SubmitEvent): void {
    event.preventDefault();

    this.changeset.execute();

    this.session
      .authenticate("authenticator:jwt", {
        email: this.credentials.email,
        password: this.credentials.password,
      })
      .then(() => {
        this.changeset.rollback();
        this.changeset.set("email", "");
        this.changeset.set("password", "");

        this.router.transitionTo("authenticated.dashboard");
      })
      .catch((error) => {
        console.log(error);

        this.changeset.set("email", "");
        this.changeset.set("password", "");
        this.changeset.set("errors", error.errors);
      });
  }

  @action
  invalidateSession(): void {
    this.session.invalidate();
  }
}
