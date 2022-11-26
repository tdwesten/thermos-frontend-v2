import { action } from "@ember/object";
import Component from "@glimmer/component";

interface WidgetStatusArgs {}

export default class WidgetStatus extends Component<WidgetStatusArgs> {
  @action
  onDragStart(event: DragEvent) {
    console.log("drag start");
  }
}
