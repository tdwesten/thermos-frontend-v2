import Controller from "@ember/controller";

export default class AuthenticatedProgramsProgram extends Controller {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/programs/progam": AuthenticatedProgramsProgram;
  }
}
