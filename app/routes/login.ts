import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import SessionService from "../services/session";

export default class Login extends Route {
  @service declare session: SessionService;
  beforeModel() {
    this.session.prohibitAuthentication("authenticated.dashboard");
  }
}
