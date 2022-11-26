import Controller from "@ember/controller";

export default class AuthenticatedProgramsCreate extends Controller {}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/programs/create": AuthenticatedProgramsCreate;
  }
}
