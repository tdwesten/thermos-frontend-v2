import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import IntlService from "ember-intl/services/intl";
import CurrentThermostatService from "../../../services/current-thermostat";

interface WidgetActionButtonsArgs {}

export default class WidgetActionButtons extends Component<WidgetActionButtonsArgs> {
  @service declare intl: IntlService;
  @service declare currentThermostat: CurrentThermostatService;

  actions = [
    {
      name: "widget.actionButtons.automatic",
      icon: "thermostat_auto",
      onClick: () => {
        this.currentThermostat.thermostat?.reset("reset");
      },
    },
    {
      name: "widget.actionButtons.bedtime",
      icon: "keyboard_arrow_down",
      onClick: () => {
        this.currentThermostat.thermostat?.decreaseTemperature("decrease");
      },
      class: "text-blue-500",
    },
    {
      name: "widget.actionButtons.bedtime",
      icon: "keyboard_arrow_up",
      onClick: () => {
        this.currentThermostat.thermostat?.increaseTemperature("increase");
      },
      class: "text-red-500",
    },
  ];

  resetThermostat() {
    this.currentThermostat.thermostat?.reset("reset");
  }

  increaseTemperature() {
    this.currentThermostat.thermostat?.increaseTemperature("increase");
  }

  decreaseTemperature() {
    this.currentThermostat.thermostat?.decreaseTemperature("decrease");
  }
}
