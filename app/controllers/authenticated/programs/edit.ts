import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import Program from "../../../models/program";
import { inject as service } from "@ember/service";
import RouterService from "@ember/routing/router-service";
import { later } from "@ember/runloop";
export default class AuthenticatedProgramsProgram extends Controller {
  @service declare router: RouterService;

  declare model: Program;

  @tracked showSuccessMessage = false;

  @action
  onSubmit() {
    this.model.save().then(() => {
      this.showSuccessMessage = true;

      later(() => {
        this.showSuccessMessage = false;
      }, 3000);
    });
  }

  @action
  deleteProgram(program: Program) {
    program.destroyRecord();
    this.router.transitionTo("authenticated.programs");
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/programs/progam": AuthenticatedProgramsProgram;
  }
}
