import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import Program from "../../../models/program";
import NotificationsService, {
  NotificationType,
} from "../../../services/notifications";
export default class AuthenticatedProgramsProgram extends Controller {
  @service declare router: RouterService;
  @service declare notifications: NotificationsService;

  declare model: Program;

  @tracked showSuccessMessage = false;

  @action
  onSubmit() {
    this.model.save().then(() => {
      this.notifications.add({
        id: "program-update",
        type: NotificationType.SUCCESS,
        message: "Program updated",
        route: "authenticated.programs.index",
        buttonTitle: "View programs",
      });
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
