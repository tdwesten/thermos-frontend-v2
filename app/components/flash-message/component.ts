import Component from "@glimmer/component";

interface FlashMessageArgs {
  type: "success" | "error" | "warning" | "info";
}

export default class FlashMessage extends Component<FlashMessageArgs> {
  get type() {
    return this.args.type;
  }

  get icon() {
    switch (this.type) {
      case "success":
        return "check-circle";
      case "error":
        return "exclamation-circle";
      case "warning":
        return "exclamation-triangle";
      case "info":
        return "info-circle";
      default:
        return "info-circle";
    }
  }

  get classes() {
    switch (this.type) {
      case "success":
        return "bg-green-500 text-green-800";
      case "error":
        return "bg-red-500 text-red-800";
      case "warning":
        return "bg-yellow-500 text-black";
      default: // info
        return "bg-blue-500 text-blue-800";
    }
  }
}
