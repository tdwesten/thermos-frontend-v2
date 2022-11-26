import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import SessionService from "../services/session";

export default class Logout extends Route {
  @service declare session: SessionService;

  beforeModel() {
    this.session.invalidate();
  }
}
