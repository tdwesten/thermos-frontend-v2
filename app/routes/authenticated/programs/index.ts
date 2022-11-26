import Store from "@ember-data/store";
import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class AuthenticatedProgramsIndex extends Route {
  @service declare store: Store;

  model() {
    return this.store.findAll("program");
  }
}
