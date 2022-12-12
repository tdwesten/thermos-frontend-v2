import { helper } from "@ember/component/helper";

export function contains(params: any /*, hash*/) {
  const [array, value] = params;

  if (!array) {
    return false;
  }

  return array.includes(value);
}

export default helper(contains);
