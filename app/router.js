import EmberRouter from "@ember/routing/router";
import config from "thermos/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("login");
  this.route("authenticated", function () {
    this.route("dashboard");
    this.route("settings");
    this.route("programs", function () {
      this.route("edit", { path: "/:program_id" });
      this.route("create");
    });
  });
  this.route("logout");
  this.route("register");
});
