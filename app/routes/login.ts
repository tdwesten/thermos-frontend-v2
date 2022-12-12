import Store from "@ember-data/store";
import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class Login extends Route {
  @service declare store: Store;

  model() {
    return {
      email: "",
      password: "",
    };
  }
}
