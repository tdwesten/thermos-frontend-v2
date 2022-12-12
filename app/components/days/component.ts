import Component from "@glimmer/component";
import { ProgramDays } from "../../enums/program-days";

interface DaysArgs {
  days: number[];
}

export default class Days extends Component<DaysArgs> {
  get days() {
    return this.args?.days?.map((day) => ProgramDays[day]);
  }
}
