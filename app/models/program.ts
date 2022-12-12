import Model, { attr, belongsTo } from "@ember-data/model";
import { ProgramDays } from "../enums/program-days";
import Thermostat from "./thermostat";

export default class Program extends Model {
  @attr("string") declare name: string;
  @attr("temperature") declare targetTemperature: number;
  @attr("string") declare startTime: number;
  @attr("string") declare endTime: number;
  @attr("boolean") declare isActive: boolean;
  @attr() declare days: ProgramDays[];
  @belongsTo("thermostat", { async: true, inverse: null })
  declare thermostat: Thermostat;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    program: Program;
  }
}
