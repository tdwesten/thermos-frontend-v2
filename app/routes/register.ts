import Route from "@ember/routing/route";
import { service } from "@ember/service";
import SessionService from "../services/session";

export default class Register extends Route {
  @service declare session: SessionService;
  beforeModel() {
    this.session.prohibitAuthentication("authenticated.dashboard");
  }
}
