// validations/employee.js
import {
  validateFormat,
  validatePresence,
} from "ember-changeset-validations/validators";

type Validations = {
  [key: string]: CallableFunction[] | CallableFunction;
};

const LOGIN_VALIDATIONS: Validations = {
  email: [
    validatePresence({ presence: true, message: "validation.email" }),
    validateFormat({ type: "email", message: "validation.email" }),
  ],
  password: [
    validatePresence({ presence: true, message: "validation.required" }),
  ],
};

export default LOGIN_VALIDATIONS;
