import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | authenticated/programs", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:authenticated/programs");
    assert.ok(route);
  });
});
