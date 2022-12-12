import { action } from "@ember/object";
import Component from "@glimmer/component";
import Program from "../../models/program";

interface WeekdaysArgs {
  model: Program;
  onChange: (value: number[]) => void;
}

export default class Weekdays extends Component<WeekdaysArgs> {
  weekdays = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  inArray = (value: number, array: number[]) => {
    return array.includes(value);
  };

  @action
  handleCheckboxChange(weekday) {
    const value = this.args.model.days || [];

    if (value.includes(weekday.id)) {
      value.removeObject(weekday.id);
    } else {
      value.pushObject(weekday.id);
    }

    this.args.model.set("days", value);

    console.log(this.args.model.days);
  }
}
