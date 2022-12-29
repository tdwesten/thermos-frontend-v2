import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import Program from "./program";
import { memberAction, serializeAndPush } from "ember-api-actions";
import { Mode } from "../enums/mode";

export default class Thermostat extends Model {
  @attr("string") declare name: string;
  @attr("temperature") declare currentTemperature: number;
  @attr("temperature") declare targetTemperature: number;
  @attr("temperature") declare minTemperature: number;
  @attr("date") declare updatedAt: Date;
  @attr("boolean") declare isHeating: boolean;
  @attr("boolean") declare isActive: boolean;
  @attr("string") declare mode: string;
  @attr("string") declare token: string;

  @belongsTo("program", { async: true, inverse: null })
  declare currentProgram: Program;

  @hasMany("program", { async: true, inverse: null })
  declare programs: Program;

  get isProgramMode(): boolean {
    return this.mode === Mode.Program;
  }

  get isManualMode(): boolean {
    return this.mode === Mode.Manual;
  }

  get isDefaultMode(): boolean {
    return this.mode === Mode.Default;
  }

  get isOffMode(): boolean {
    return this.mode === Mode.Off;
  }

  reset = memberAction({
    path: "-actions/reset",
    type: "post",
    after: serializeAndPush,
  });

  increaseTemperature = memberAction({
    path: "-actions/increase-temperature",
    type: "post",
    after: serializeAndPush,
  });

  decreaseTemperature = memberAction({
    path: "-actions/decrease-temperature",
    type: "post",
    after: serializeAndPush,
  });
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    thermostat: Thermostat;
  }
}
