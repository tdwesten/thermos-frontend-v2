import Route from "@ember/routing/route";
import { service } from "@ember/service";
import Store from "@ember-data/store";

export default class AuthenticatedProgramsProgram extends Route {
  @service declare store: Store;

  model(params: { program_id: string }) {
    return this.store.findRecord("program", params.program_id, {
      include: "thermostat",
    });
  }
}
