import Application from "@ember/application";

import Program from "../models/program";
import Thermostat from "../models/thermostat";

export function initialize(application: Application): void {
  application.register("object:model", Thermostat);
  application.register("object:model", Program);
}

export default {
  initialize,
};
