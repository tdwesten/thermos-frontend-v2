import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | authenticated/programs/progam", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let route = this.owner.lookup("route:authenticated/programs/progam");
    assert.ok(route);
  });
});
