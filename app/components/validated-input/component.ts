import { action } from "@ember/object";
import Component from "@glimmer/component";
import { BufferedChangeset } from "validated-changeset";
import { tracked } from "@glimmer/tracking";

interface ValidatedInputArgs {
  changeset: BufferedChangeset;
  id: string;
  type: "text" | "textarea" | "password" | "email" | "checkbox" | "number";
  valuePath: string;
}

type ValidationErr = {
  key: string;
  value: string;
  validation: string;
};

type Error = {
  key: string;
  value: any;
  validation: ValidationErr[];
};

export default class ValidatedInput extends Component<ValidatedInputArgs> {
  @tracked hasBlurred = false;
  @tracked errors: Error[] = [];

  constructor(owner: unknown, args: ValidatedInputArgs) {
    super(owner, args);

    this.args.changeset.on("afterValidation", () => {
      this.errors = this.args.changeset.errors.filter(
        (error) => error.key === this.args.valuePath
      ) as unknown as Error[];
    });
  }

  get errorMessage() {
    return this.errors.length > 0 ? this.errors[0]?.validation[0] : undefined;
  }

  get hasError() {
    return this.errors.length > 0 && this.hasBlurred;
  }

  get borderClasses() {
    return this.hasError
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500";
  }

  get isTextarea() {
    return this.args.type === "textarea";
  }

  get isCheckbox() {
    return this.args.type === "checkbox";
  }

  @action
  handleOnBlur(event: Event) {
    this.hasBlurred = true;
  }
}
