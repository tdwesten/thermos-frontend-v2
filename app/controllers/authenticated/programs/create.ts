import Controller from "@ember/controller";
import PROGRAM_VALIDATIONS from "../../../validations/progam";

export default class AuthenticatedProgramsCreate extends Controller {
  formValidations = PROGRAM_VALIDATIONS;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/programs/create": AuthenticatedProgramsCreate;
  }
}
