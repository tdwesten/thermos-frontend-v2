import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import IntlService from "ember-intl/services/intl";
import { Mode } from "../../../enums/mode";
import Thermostat from "../../../models/thermostat";

interface WidgetStatusArgs {
  unit: string;
  thermostat: Thermostat;
}

interface ICurrentState {
  message: string;
  icon: string;
}

export default class WidgetStatus extends Component<WidgetStatusArgs> {
  @service declare intl: IntlService;

  get currentState(): ICurrentState {
    let icon = "mode_standby";
    let message = "widget.status.default";

    if (this.args.thermostat.mode === Mode.Off) {
      icon = "power";
      message = "widget.status.off";
    }

    if (this.args.thermostat.mode === Mode.Program) {
      icon = "schedule";
      message = "widget.status.program";
    }

    if (this.args.thermostat.mode === Mode.Manual) {
      icon = "back_hand";
      message = "widget.status.manual";
    }

    if (this.args.thermostat.isHeating) {
      message = message + ".heating";
    }

    return {
      icon: icon,
      message: this.intl.t(message, {
        targetTemperature: this.targetTemperature,
        program: this.args.thermostat?.currentProgram.get("name"),
      }),
    };
  }

  get targetTemperature(): number {
    return this.args.thermostat.targetTemperature;
  }

  get currentTemperature(): number {
    return this.args.thermostat?.currentTemperature;
  }

  get isHeating(): boolean {
    return this.args.thermostat.isHeating;
  }
}
