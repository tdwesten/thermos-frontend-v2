import Store from "@ember-data/store";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import RouterService from "@ember/routing/router-service";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { BufferedChangeset } from "validated-changeset";

import { Changeset } from "ember-changeset";
import lookupValidator from "ember-changeset-validations";
import CurrentThermostatService from "../../services/current-thermostat";
import NotificationsService, {
  NotificationType,
} from "../../services/notifications";
import SessionService from "../../services/session";
import THERMOSTAT_VALIDATIONS from "../../validations/thermostat";
import IntlService from "ember-intl/services/intl";

export default class AuthenticatedSettings extends Controller {
  @service declare session: SessionService;
  @service declare currentThermostat: CurrentThermostatService;
  @service declare store: Store;
  @service declare router: RouterService;
  @service declare notifications: NotificationsService;
  @service declare intl: IntlService;

  @tracked declare changeset: BufferedChangeset;
  @tracked isLoading = false;

  formValidations = THERMOSTAT_VALIDATIONS;

  constructor() {
    super(...arguments);

    if (this.currentThermostat.get("thermostat")) {
      this.changeset = Changeset(
        this.currentThermostat.get("thermostat"),
        lookupValidator(THERMOSTAT_VALIDATIONS),
        THERMOSTAT_VALIDATIONS
      );
    } else {
      this.router.transitionTo("login");
    }
  }

  @action
  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.isLoading = true;
    this.changeset.save().then(() => {
      this.isLoading = false;

      this.notifications.add({
        id: "program-created",
        type: NotificationType.SUCCESS,
        message: this.intl.t("settings.successfully_updated"),
        route: "authenticated.dashboard",
        buttonTitle: this.intl.t("settings.view_dashboard"),
      });
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    "authenticated/settings": AuthenticatedSettings;
  }
}
