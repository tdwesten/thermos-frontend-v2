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

  get isInvalid() {
    return this.isValid === this.changeset.isInvalid || false;
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
      this.isValid = this.changeset.isValid;
      this.errors = this.changeset.error;

      this.changeset.execute();

      if (this.changeset.isValid) {
        this.args.onSubmit(event);
      }
    });
  }
}
