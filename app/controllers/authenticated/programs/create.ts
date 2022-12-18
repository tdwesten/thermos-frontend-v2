import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Program from "../../../models/program";
import NotificationsService, {
  NotificationType,
} from "../../../services/notifications";
import PROGRAM_VALIDATIONS from "../../../validations/progam";

export default class AuthenticatedProgramsCreate extends Controller {
  @service declare notifications: NotificationsService;
  formValidations = PROGRAM_VALIDATIONS;

  declare model: Program;

  @action
  onSubmit() {
    this.model.save().then(() => {
      this.notifications.add({
        id: "program-created",
        type: NotificationType.SUCCESS,
        message: "Program created successfully",
        route: "authenticated.programs.index",
        buttonTitle: "View Programs",
      });
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/programs/create": AuthenticatedProgramsCreate;
  }
}
