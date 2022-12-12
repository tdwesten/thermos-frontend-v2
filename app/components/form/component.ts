import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import model from "@ember-data/model";
import {
  BufferedChangeset,
  Changeset,
  lookupValidator,
} from "validated-changeset";

type Validations = {
  [key: string]: CallableFunction[] | CallableFunction;
};

interface FormArgs {
  onSubmit: CallableFunction;
  validations: Validations;
  model: model;
  isLoading: boolean;
}

export default class Form extends Component<FormArgs> {
  @tracked public declare changeset: BufferedChangeset;
  @tracked public errors: any = [];
  @tracked public isValid = false;
  @tracked public isPristine = false;

  get isInvalid() {
    return !this.isValid || this.isPristine;
  }

  constructor(owner: unknown, args: FormArgs) {
    super(owner, args);

    this.createChangeset();
  }

  createChangeset() {
    this.changeset = Changeset(
      this.args.model,
      lookupValidator(this.args.validations),
      this.args.validations
    );

    this.changeset.on("afterValidation", () => {
      this.errors = this.changeset.error;
      this.isValid = this.changeset.isValid;
      this.isPristine = this.changeset.isPristine;
    });
  }

  @action
  updateComponent() {
    if (!this.args.validations) {
      throw new Error("Validations are required");
    }

    if (!this.args.model) {
      throw new Error("Model is required");
    }

    this.createChangeset();
  }

  @action
  submit(event: Event) {
    event.preventDefault();

    this.changeset.validate().then(() => {
      this.errors = this.changeset.error;

      if (this.changeset.isValid) {
        this.changeset.execute();
        this.args.onSubmit(event);
      }
    });
  }
}
