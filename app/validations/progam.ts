// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from "ember-changeset-validations/validators";

const PROGRAM_VALIDATIONS = {
  name: [validatePresence({ presence: true, message: "validation.not-empty" })],
  targetTemperature: [
    validatePresence({ presence: true, message: "validation.not-empty" }),
    validateFormat({ type: "number", message: "validation.number" }),
  ],
  startTime: [
    validatePresence({ presence: true, message: "validation.not-empty" }),
  ],
  endTime: [
    validatePresence({ presence: true, message: "validation.not-empty" }),
  ],
  days: [validatePresence({ presence: true, message: "validation.not-empty" })],
};

export default PROGRAM_VALIDATIONS;
