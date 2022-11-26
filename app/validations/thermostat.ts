// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from "ember-changeset-validations/validators";

const THERMOSTAT_VALIDATIONS = {
  name: [validatePresence({ presence: true, message: "validation.required" })],
};

export default THERMOSTAT_VALIDATIONS;
