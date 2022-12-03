import Route from "@ember/routing/route";
import Transition from "@ember/routing/transition";
import { inject as service } from "@ember/service";
import SessionService from "../services/session";

export default class Aauthenticated extends Route {
  @service declare session: SessionService;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, "login");
  }
}
