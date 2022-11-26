import Model, { attr, belongsTo } from "@ember-data/model";
import { service } from "@ember/service";
import { ProgramDays } from "../enums/program-days";
import CurrentThermostatService from "../services/current-thermostat";
import Thermostat from "./thermostat";

export default class Program extends Model {
  @service declare currentThermostat: CurrentThermostatService;

  @attr("string") declare name: string;
  @attr("temperature") declare targetTemperature: number;
  @attr("string") declare startTime: number;
  @attr("string") declare endTime: number;
  @attr("boolean") declare isActive: boolean;
  @attr("json") declare days: ProgramDays[];
  @belongsTo("thermostat", { async: false, inverse: null })
  declare thermostat: Thermostat;

  get isCurrentProgram() {
    return (
      this.id === this.currentThermostat?.thermostat?.currentProgram?.get("id")
    );
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    program: Program;
  }
}
