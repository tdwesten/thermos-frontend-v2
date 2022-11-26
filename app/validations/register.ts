// validations/employee.js
import {
  validateConfirmation,
  validateFormat,
  validatePresence,
} from "ember-changeset-validations/validators";
import validatePasswordStrength from "../validators/password-validator";

const REGISTER_VALIDATIONS = {
  name: [
    validatePresence({ presence: true, message: "validation.first_name" }),
  ],
  email: [
    validatePresence({ presence: true, message: "validation.email" }),
    validateFormat({ type: "email", message: "validation.email" }),
  ],
  password: [validatePasswordStrength()],
  password_confirmation: [
    validateConfirmation({
      on: "password",
      message: "validation.password_confirmation",
    }),
  ],
};

export default REGISTER_VALIDATIONS;
