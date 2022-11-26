// validations/employee.js
import { validatePresence } from "ember-changeset-validations/validators";
import validateBelongsToNotEmpty from "../validators/belongsto-validator";

const REGISTER_THEMOSTAT_VALIDATIONS = {
  name: [
    validatePresence({ presence: true, message: "validation.first_name" }),
  ],
};

export default REGISTER_THEMOSTAT_VALIDATIONS;
