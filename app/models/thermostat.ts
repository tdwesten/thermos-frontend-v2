import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import Program from "./program";
import { memberAction, serializeAndPush } from "ember-api-actions";

export default class Thermostat extends Model {
  @attr("string") declare name: string;
  @attr("temperature") declare currentTemperature: number;
  @attr("temperature") declare targetTemperature: number;
  @attr("temperature") declare minTemperature: number;
  @attr("date") declare updatedAt: Date;

  @belongsTo("program", { async: true, inverse: null })
  declare currentProgram: Program;

  @hasMany("program", { async: true, inverse: null })
  declare programs: Program;

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
